import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";

export interface TPack {
  //details of a pack that will be shown to the users - Name, Demo Image(thumbnail), Description
  id: string;
  name: string;
  imageUrl1: string;
  imageUrl2: string;
  description: string;
}

export function PackCard(props: TPack & { selectedModelId: string }) {
  const { getToken } = useAuth();
  return (
    <div
      className="border rounded-xl hover:border-red-400 border-2 p-2 cursor-pointer"
      onClick={async () => {
        const token = await getToken();
        await axios.post(
          `${BACKEND_URL}/pack/generate`,
          {
            packId: props.id,
            modelId: props.selectedModelId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }}
    >
      <div className="flex p-4 gap-4">
        {/* <img
          src={props.imageUrl1}
          alt="Pack1"
          width="50%"
          className="rounded"
        />
        <img
          src={props.imageUrl2}
          alt="Pack2"
          width="50%"
          className="rounded"
        /> */}
        <Image
          src={props.imageUrl1}
          alt="Pack1"
          width={100}
          height={200}
          className="rounded w-1/2"
        />
        <Image
          src={props.imageUrl2}
          alt="Pack2"
          width={100}
          height={200}
          className="rounded w-1/2"
        />
      </div>

      <div className="px-3 text-xl font-bold pb-2">{props.name}</div>

      <div className="px-3 pb-2 text-sm">{props.description}</div>
    </div>
  );
}
