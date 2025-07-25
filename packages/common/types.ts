import { z } from "zod";

// // Split enums into separate schemas
// export const TypeEnum = z.enum(["Man", "Woman", "Other"]);
// export const EthnicityEnum = z.enum([
//   "White",
//   "Black",
//   "Asian_American",
//   "East_Asian",
//   "South_East_Asian",
//   "South_Asian",
//   "Middle_Eastern",
//   "Pacific",
//   "Hispanic",
// ]);
// export const EyeColorEnum = z.enum([
//   "Black",
//   "Brown",
//   "Blue",
//   "Green",
//   "Hazel",
//   "Gray",
// ]);

// export const TrainModel = z.object({
//   name: z.string(),
//   type: TypeEnum,
//   age: z.number().int().min(0).max(120),
//   ethnicity: EthnicityEnum,
//   eyeColor: EyeColorEnum,
//   bald: z.boolean(),
//   zipUrl: z.string(),
// });

// export const GenerateImage = z.object({
//   prompt: z.string(),
//   modelId: z.string(),
//   num: z.number().int().min(1).max(10),
// });

// export const GenerateImageFromPack = z.object({
//   prompt: z.string(),
//   modelId: z.string(),
//   packId: z.string(),
// });

//original
export const TrainModel = z.object({
  name: z.string(),
  type: z.enum(["Man", "Woman", "Other"]),
  age: z.number().int().min(0).max(120),
  ethnicity: z.enum([
    "White",
    "Black",
    "Asian_American",
    "East_Asian",
    "South_East_Asian",
    "South_Asian",
    "Middle_Eastern",
    "Pacific",
    "Hispanic",
  ]),
  eyeColor: z.enum(["Black", "Brown", "Blue", "Green", "Hazel", "Gray"]),
  bald: z.boolean(),
  zipUrl: z.string(), //instead of images: z.array(z.string()),
  //No userId, coz clerk handles that
});

export const GenerateImage = z.object({
  prompt: z.string(),
  modelId: z.string(),
  num: z.number().int().min(1).max(10),
});

export const GenerateImageFromPack = z.object({
  prompt: z.string(),
  modelId: z.string(),
  packId: z.string(),
});
