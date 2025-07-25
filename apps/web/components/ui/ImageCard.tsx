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
        <img src={props.imageUrl} alt="Image" className="rounded" />
      </div>
    </div>
  );
}
