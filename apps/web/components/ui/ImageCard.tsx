import { Skeleton } from "./skeleton";

export interface TImage {
  id: string;
  status: string;
  imageUrl: string;
}

export function ImageCard(props: TImage) {
  return (
    // <div className="border rounded-xl hover:border-red-500 max-w-[250px] p-2 cursor-pointer">
    <div className="border rounded-xl hover:border-red-400 p-2 cursor-pointer">
      <div className="flex p-4 gap-4">
        {props.status === "Generated" ? (
          <img src={props.imageUrl} alt="Image" className="rounded" />
        ) : (
          <Skeleton className="rounded w-full h-40 w-300" />
        )}
      </div>
    </div>
  );
}

export function ImageCardSkeleton() {
  return (
    <div className="border rounded-xl hover:border-red-400 p-2 cursor-pointer">
      <div className="flex p-4 gap-4">
        <Skeleton className="rounded h-[300px] w-[400px]" />
      </div>
    </div>
  );
}
