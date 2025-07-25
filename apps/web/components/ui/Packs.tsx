import { BACKEND_URL } from "@/app/config";
import { PackCard, TPack } from "@/components/ui/PackCard";
import axios from "axios";

async function getPacks(): Promise<TPack[]> {
  const res = await axios.get(`${BACKEND_URL}/pack/bulk`);
  return res.data.packs ?? [];
}

export async function Packs() {
  const packs = await getPacks();
  return (
    // <div className="flex gap-8">
    <div className="grid md:grid-cols-3 gap-4 p-4 grids-cols-1">
      {packs.map((p) => (
        <PackCard {...p} />
      ))}
    </div>
  );
}
