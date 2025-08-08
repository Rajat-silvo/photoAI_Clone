"use client";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";
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
              key={model.id}
              className={`${selectedModel === model.id ? "border-red-400" : ""} cursor-pointer border rounded p-2 w-full`}
              onClick={() => {
                setSelectedModel(model.id);
              }}
            >
              <div className="flex justify-between flex-col h-full">
                <div className="relative aspect-square">
                  {/* <img
                    src={model.thumbnail}
                    alt="Model Thumbnail"
                    className="rounded"
                  /> */}
                  <Image
                    src={model.thumbnail}
                    alt={`Thumbnail for ${model.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105 rounded"
                  />
                </div>
                {/* <div className="pt-6">{model.name}</div> */}
                <div className="pt-4 sm:pt-6">
                  <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100 truncate sm:line-clamp-2 leading-tight">
                    {model.name}
                  </p>
                </div>
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
