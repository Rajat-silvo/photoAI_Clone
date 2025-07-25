import express, { response } from "express";
import { TrainModel, GenerateImage, GenerateImageFromPack } from "common/types";
import { prismaClient } from "db"; // Importing the Prisma client
import { S3Client } from "bun";
import { FalAIModel } from "./models/FalAIModel";
import cors from "cors";
import { authMiddleware } from "./middleware";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

//const USER_ID = "user-id-placeholder"; // Replace with actual user ID logic, when you make authMiddleware

const falAIModel = new FalAIModel();

app.get("/pre-sign", async (req, res) => {
  const key = `models/${Date.now()}_${Math.random()}.zip`;
  const url = S3Client.presign(key, {
    method: "PUT", //this caused 20 minutes of debugging
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    endpoint: process.env.ENDPOINT,
    bucket: process.env.BUCKET_NAME,
    expiresIn: 60 * 5, // URL expires in 5 minutes
    type: "application/zip",
  });
  res.json({
    url,
    key,
  });
});

app.post("/ai/training", authMiddleware, async (req, res) => {
  const parsedBody = TrainModel.safeParse(req.body);
  console.log(req.userId);

  if (!parsedBody.success) {
    res.status(411).json({
      message: "Incorrect Input",
    });
    return;
  }

  const { request_id, response_url } = await falAIModel.trainModel(
    parsedBody.data.zipUrl,
    parsedBody.data.name
  );

  const data = await prismaClient.model.create({
    data: {
      name: parsedBody.data.name,
      type: parsedBody.data.type,
      age: parsedBody.data.age,
      ethnicity: parsedBody.data.ethnicity,
      eyeColor: parsedBody.data.eyeColor,
      bald: parsedBody.data.bald,
      userId: req.userId!, //'!' assumes it exists and in not undefined
      zipUrl: parsedBody.data.zipUrl, // zipUrl is provided in the request using JSZip
      falAiRequestId: request_id,
    },
  });

  res.json({
    modelId: data.id,
  });
});

app.post("/ai/generate", authMiddleware, async (req, res) => {
  const parsedBody = GenerateImage.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(411).json({
      message: "Incorrect Input",
    });
    return;
  }

  const model = await prismaClient.model.findUnique({
    where: {
      id: parsedBody.data.modelId,
    },
  });

  if (!model || !model.tensorPath) {
    res.status(411).json({
      message: "Model not found",
    });
    return;
  }

  // Generate image using FAL AI
  const { request_id, response_url } = await falAIModel.generateImage(
    parsedBody.data.prompt,
    model?.tensorPath
  );

  const data = await prismaClient.outputImages.create({
    data: {
      modelId: parsedBody.data.modelId,
      prompt: parsedBody.data.prompt,
      imageUrl: "", // Placeholder for image URL
      userId: req.userId!, //'!' assumes it exists and in not undefined
      // would have to add status field too, which will be updated by fal.ai
      falAiRequestId: request_id, // Store the request ID for tracking
    },
  });

  res.json({
    imageId: data.id,
  });
});

app.post("/pack/generate", authMiddleware, async (req, res) => {
  const parsedBody = GenerateImageFromPack.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(411).json({
      message: "Incorrect Input",
    });
    return;
  }

  // Fetch prompts associated with the pack using packId
  const prompts = await prismaClient.packPrompts.findMany({
    where: {
      packId: parsedBody.data.packId,
    },
  });

  let requestIds: { request_id: string }[] = await Promise.all(
    prompts.map((prompt) =>
      falAIModel.generateImage(prompt.prompt, parsedBody.data.modelId)
    )
  );

  const images = await prismaClient.outputImages.createManyAndReturn({
    data: prompts.map((prompt, index) => ({
      modelId: parsedBody.data.modelId,
      prompt: prompt.prompt,
      imageURL: "", // Placeholder for image URL
      userId: req.userId!, //'!' assumes it exists and in not undefined
      falAiRequestId: requestIds[index]!.request_id,
      //falAiRequestId: requestIds[index]?.request_id ?? "unknown-request-id",
    })),
  });

  res.json({
    image: images.map((images) => images.id),
  });
});

app.get("/pack/bulk", async (req, res) => {
  const packs = await prismaClient.packs.findMany({});
  res.json({ packs });
});

app.get("/image/bulk", authMiddleware, async (req, res) => {
  const ids = req.query.ids as string[]; // string[] is used otherwise in id: { in: ids} 'in' complains about type mismatch
  //const ids = (req.query.ids as string)?.split(",") || []; // Convert ids to an array
  const limit = (req.query.limit as string) ?? "10"; // Default limit to 10 if not provided
  const offset = (req.query.offset as string) ?? "0"; // Default offset to 0 if not provided

  console.log(ids);

  const imageData = await prismaClient.outputImages.findMany({
    where: {
      id: { in: ids },
      userId: req.userId!, // '!' assumes it exists and in not undefined
    },
    take: parseInt(limit),
    skip: parseInt(offset),
  });
  res.json({ images: imageData });
});

app.post("/fal-ai/webhook/train", async (req, res) => {
  //Update the status of the image in the database
  const request_id = req.body.request_id;
  await prismaClient.model.updateMany({
    //updateMany, coz update is used to update a single record
    where: { falAiRequestId: request_id },
    data: {
      trainingStatus: "Generated",
      tensorPath: req.body.tensor_Path,
    },
  });
  res.json({ message: "Webhook received successfully" });
});

app.post("/fal-ai/webhook/image", async (req, res) => {
  //Update the status of the image in the database
  const request_id = req.body.request_id;
  await prismaClient.outputImages.updateMany({
    //updateMany, coz 'update' is used to update a single record and will give an error at 'where'
    where: { falAiRequestId: request_id },
    data: {
      status: "Generated",
      imageUrl: req.body.image_url,
    },
  });
  res.json({ message: "Webhook received successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
