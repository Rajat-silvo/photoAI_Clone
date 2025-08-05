"use client";
import { useState } from "react";
import { SelectModel } from "@/components/ui/Models";
import { PackCard, TPack } from "@/components/ui/PackCard";

export function PacksClient({ packs }: { packs: TPack[] }) {
  const [selectedModelId, setSelectedModelId] = useState<string>();
  return (
    <>
      <div className="flex flex-col gap-4">
        <SelectModel
          setSelectedModel={setSelectedModelId}
          selectedModel={selectedModelId}
        />
      </div>
      <div className=" text-2xl pb-2 max-w-4xl">Select Pack</div>
      <div className="grid md:grid-cols-3 gap-4 p-4 grids-cols-1">
        {packs.map((p) => (
          <PackCard key={p.id} selectedModelId={selectedModelId!} {...p} />
        ))}
      </div>
    </>
  );
}
