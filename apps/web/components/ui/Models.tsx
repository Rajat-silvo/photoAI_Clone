"use client";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface TModel {
  id: string;
  thumbnail: string;
  name: string;
}

export function SelectModel({
  setSelectedModel,
  selectedModel,
}: {
  setSelectedModel: (model: string) => void;
  selectedModel?: string;
}) {
  const { getToken } = useAuth();
  const [models, setModels] = useState<TModel[]>([]);
  const [modelLoading, setModelLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      const response = await axios.get(`${BACKEND_URL}/models`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setModels(response.data.models);
      setSelectedModel(response.data.models[0]?.id);
      setModelLoading(false);
    })();
  }, []);

  return (
    <>
      <div className=" text-2xl pb-2 max-w-4xl">Select Model</div>
      <div className="max-w-2xl">
        <div className="grid grid-cols-4 gap-2 p-5">
          {models.map((model) => (
            <div
              className={`${selectedModel === model.id ? "border border-red-400" : "border border-gray-700"} cursor-pointer rounded p-2 w-full`}
              onClick={() => {
                setSelectedModel(model.id);
              }}
            >
              <div className="flex justify-between flex-col h-full">
                <div>
                  <img
                    src={model.thumbnail}
                    alt="Model Thumbnail"
                    className="rounded"
                  />
                </div>
                <div className="pt-6">{model.name}</div>
              </div>
            </div>
          ))}
        </div>
        {modelLoading && (
          <div className="grid grid-cols-4 gap-2 p-4">
            <Skeleton className="h-[200px] w-full rounded" />
            <Skeleton className="h-[200px] w-full rounded" />
            <Skeleton className="h-[200px] w-full rounded" />
            <Skeleton className="h-[200px] w-full rounded" />
          </div>
        )}
      </div>
    </>
  );
}
