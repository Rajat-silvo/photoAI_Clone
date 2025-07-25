export interface TPack {
  //details of a pack that will be shown to the users - Name, Demo Image(thumbnail), Description
  name: string;
  imageUrl1: string;
  imageUrl2: string;
  description: string;
}

export function PackCard(props: TPack) {
  return (
    <div className="border rounded-xl hover:border-red-400 p-2 cursor-pointer">
      <div className="flex p-4 gap-4">
        <img
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
        />
      </div>

      <div className="px-3 text-xl font-bold pb-2">{props.name}</div>

      <div className="px-3 pb-2 text-sm">{props.description}</div>
    </div>
  );
}
