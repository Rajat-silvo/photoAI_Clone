"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { SelectModel } from "./Models";
import toast from "react-hot-toast";

export function GenerateImage() {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState<string>();
  const [isGenerating, setIsGenerating] = useState(false);

  const { getToken } = useAuth();

  const handleGenerate = async () => {
    if (!prompt || !selectedModel) return;

    setIsGenerating(true);
    try {
      const token = await getToken();
      await axios.post(
        `${BACKEND_URL}/ai/generate`,
        {
          prompt,
          modelId: selectedModel,
          num: 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Image generation started!");
      setPrompt("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-[60vh] flex items-center justify-center">
      <div>
        <SelectModel
          setSelectedModel={setSelectedModel}
          selectedModel={selectedModel}
        />
        <div className="flex justify-center">
          <Textarea
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate"
            className="py-4 px-4 w-2xl border border-red-100 hover:border-red-400 focus:border-red-400 outline-none"
          ></Textarea>
        </div>
        <div className="flex justify-center pt-5">
          <Button
            // onClick={async () => {
            //   const token = await getToken();
            //   await axios.post(
            //     `${BACKEND_URL}/ai/generate`,
            //     {
            //       prompt,
            //       modelId: selectedModel,
            //       num: 1,
            //     },
            //     {
            //       headers: {
            //         Authorization: `Bearer ${token}`,
            //       },
            //     }
            //   );
            //   ///alert Here
            // }}
            onClick={handleGenerate}
            disabled={isGenerating || !prompt || !selectedModel}
            variant={"secondary"}
            className="px-4 py-4"
          >
            Generate Image
          </Button>
        </div>
      </div>
    </div>
  );
}
