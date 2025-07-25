import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GenerateImage } from "@/components/ui/GenerateImage";
import Train from "@/components/ui/Train";
import { Packs } from "@/components/ui/Packs";
import { Gallery } from "@/components/ui/Gallery";

export default function Dashboard() {
  return (
    <div className="flex justify-center">
      <div className="max-w-6xl">
        <div className="flex justify-center">
          <Tabs defaultValue="gallery">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="generate">Generate a Image</TabsTrigger>
                <TabsTrigger value="train">Train a Model</TabsTrigger>
                <TabsTrigger value="packs">Packs</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="generate">
              <GenerateImage />
            </TabsContent>
            <TabsContent value="train">
              <Train />
            </TabsContent>
            <TabsContent value="packs">
              <Packs />
            </TabsContent>
            <TabsContent value="gallery">
              <Gallery />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
