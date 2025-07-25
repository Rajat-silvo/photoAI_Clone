import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function GenerateImage() {
  return (
    <div className="h-[60vh] flex items-center justify-center">
      <div>
        <Textarea
          placeholder="  Enter prompt"
          className="py-4 px-2 w-2xl border border-red-200 hover:border-red-400 focus:border-red-400 outline-none"
        ></Textarea>
        <div className="flex justify-center pt-5">
          <Button variant={"secondary"} className="px-4 py-4">
            Generate Image
          </Button>
        </div>
      </div>
    </div>
  );
}
