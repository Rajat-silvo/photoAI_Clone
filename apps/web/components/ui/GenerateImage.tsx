"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { SelectModel } from "./Models";

export function GenerateImage() {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState<string>();

  const { getToken } = useAuth();

  return (
    <div className="h-[60vh] flex items-center justify-center">
      <div>
        <SelectModel setSelectedModel={setSelectedModel} />
        <div className="flex justify-center">
          <Textarea
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate"
            className="py-4 px-4 w-2xl border border-red-100 hover:border-red-400 focus:border-red-400 outline-none"
          ></Textarea>
        </div>
        <div className="flex justify-center pt-5">
          <Button
            onClick={async () => {
              const token = await getToken();
              await axios.post(
                `${BACKEND_URL}/ai/generate`,
                {
                  prompt,
                  modelId: selectedModel,
                  num: 1,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              ///alert Here
            }}
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
