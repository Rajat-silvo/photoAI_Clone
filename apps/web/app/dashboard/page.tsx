import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GenerateImage } from "@/components/ui/GenerateImage";
import Train from "@/components/ui/Train";
import { Packs } from "@/components/ui/Packs";
import { Gallery } from "@/components/ui/Gallery";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="min-h-screen w-full p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <Tabs defaultValue="gallery" className="w-full">
          {/* Responsive tabs list */}
          <div className="mb-6 flex justify-center">
            <TabsList className="grid w-full max-w-2xl grid-cols-2 gap-1 md:grid-cols-4 md:gap-0">
              <TabsTrigger
                value="gallery"
                className="flex items-center justify-center gap-1 text-xs sm:text-sm md:gap-2"
              >
                <span>📸</span>
                <span>Camera</span>
              </TabsTrigger>
              <TabsTrigger
                value="generate"
                className="flex items-center justify-center gap-1 text-xs sm:text-sm md:gap-2"
              >
                <span>🎨</span>
                <span>Generate</span>
              </TabsTrigger>
              <TabsTrigger
                value="train"
                className="flex items-center justify-center gap-1 text-xs sm:text-sm md:gap-2"
              >
                <span>⚙️</span>
                <span>Train</span>
              </TabsTrigger>
              <TabsTrigger
                value="packs"
                className="flex items-center justify-center gap-1 text-xs sm:text-sm md:gap-2"
              >
                <span>🎁</span>
                <span>Packs</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab contents with responsive containers */}
          <div className="w-full">
            <TabsContent value="generate" className="mt-0 w-full">
              <div className="w-full">
                <GenerateImage />
              </div>
            </TabsContent>

            <TabsContent value="train" className="mt-0 w-full">
              <div className="w-full">
                <Train />
              </div>
            </TabsContent>

            <TabsContent value="packs" className="mt-0 w-full">
              <div className="w-full">
                <Packs />
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="mt-0 w-full">
              <div className="w-full">
                <Gallery />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

///Original
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { GenerateImage } from "@/components/ui/GenerateImage";
// import Train from "@/components/ui/Train";
// import { Packs } from "@/components/ui/Packs";
// import { Gallery } from "@/components/ui/Gallery";

// export default function Dashboard() {
//   return (
//     <div className="flex justify-center">
//       <div className="max-w-6xl">
//         <div className="flex justify-center">
//           <Tabs defaultValue="gallery">
//             <div className="flex justify-center">
//               <TabsList>
//                 <TabsTrigger value="gallery">📸 Camera</TabsTrigger>
//                 <TabsTrigger value="generate">🎨 Generate a Image</TabsTrigger>
//                 <TabsTrigger value="train">⚙️ Train a Model</TabsTrigger>
//                 <TabsTrigger value="packs">🎁 Packs</TabsTrigger>
//               </TabsList>
//             </div>
//             <TabsContent value="generate">
//               <GenerateImage />
//             </TabsContent>
//             <TabsContent value="train">
//               <Train />
//             </TabsContent>
//             <TabsContent value="packs">
//               <Packs />
//             </TabsContent>
//             <TabsContent value="gallery">
//               <Gallery />
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// }
