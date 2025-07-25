"use client";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <div className="max-w-5xl">
        <br />
        <br />
        <h1 className="text-4xl p-2 text-center ">Welcome to PhotoAI</h1>
        <p className="text-7xl text-center p-2 font-bold pb-4">
          Generate Images for yourself and your family
        </p>
        <br />
        <br />
        <Carousel
          plugins={[
            Autoplay({
              delay: 3500,
            }),
          ]}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <img
                src="https://cdn.dribbble.com/userupload/29421930/file/original-57e8bed3bcd878be405419a3c9905516.jpg?format=webp&resize=400x300&vertical=center"
                alt="1"
              />
            </CarouselItem>
            <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <img
                src="https://cdn.dribbble.com/userupload/28508468/file/original-1337290ded3efe937873bbeaec533042.jpg?format=webp&resize=400x300&vertical=center"
                alt="2"
              />
            </CarouselItem>
            <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <img
                src="https://cdn.dribbble.com/userupload/18316354/file/original-c92e853d822351c5906e880d3e4fb2bd.jpg?format=webp&resize=400x300&vertical=center"
                alt="3"
              />
            </CarouselItem>
            <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <img
                src="https://cdn.dribbble.com/userupload/18788132/file/original-f6c01cc687c499874b2ee6beb9994e18.jpg?format=webp&resize=400x300&vertical=center"
                alt="4"
              />
            </CarouselItem>
            <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <img
                src="https://cdn.dribbble.com/userupload/43917998/file/original-ce60ffa8236a789b639310f3c257a5e1.jpg?crop=0x349-1448x1435&format=webp&resize=640x480&vertical=center"
                alt="5"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <br />
        <div className="flex justify-center">
          <SignedIn>
            <Button
              onClick={() => {
                router.push("/dashboard");
              }}
              className="mt-4 px-8 py-2"
              size={"lg"}
              variant={"secondary"}
            >
              Dashboard
            </Button>
          </SignedIn>
          <SignedOut>
            <Button
              className="mt-4 px-8 py-2"
              size={"lg"}
              variant={"secondary"}
            >
              <SignInButton />
            </Button>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import Autoplay from "embla-carousel-autoplay";
// import Image from "next/image";

// export function Hero() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
//       {/* Main content container */}
//       <div className="container mx-auto px-4 py-16">
//         <div className="flex flex-col items-center justify-center text-center space-y-8">
//           {/* Hero text section */}
//           <div className="space-y-6 max-w-5xl">
//             <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200">
//               <span className="text-sm font-medium text-purple-700">
//                 🎭 Train Your Personal AI Model
//               </span>
//             </div>

//             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent leading-tight">
//               Put Your Face in
//               <br />
//               <span className="text-4xl md:text-5xl lg:text-6xl">
//                 Any Image You Dream
//               </span>
//             </h1>

//             <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
//               Upload your photos, train your personal AI model, and generate
//               stunning images of yourself in any scenario - from professional
//               headshots to fantasy adventures
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
//               <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl">
//                 Start Training Your Model
//               </button>
//               <button className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-full border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200">
//                 Browse Packs
//               </button>
//             </div>
//           </div>

//           {/* How it works section */}
//           <div className="w-full max-w-6xl mt-16">
//             <div className="mb-12">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">
//                 How It Works
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
//                 <div className="text-center">
//                   <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <span className="text-white text-2xl">📸</span>
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                     1. Upload Your Photos
//                   </h3>
//                   <p className="text-gray-600">
//                     Upload 10-20 photos of yourself to train your personal AI
//                     model
//                   </p>
//                 </div>

//                 <div className="text-center">
//                   <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <span className="text-white text-2xl">🤖</span>
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                     2. AI Training
//                   </h3>
//                   <p className="text-gray-600">
//                     Our AI learns your unique features and facial
//                     characteristics
//                   </p>
//                 </div>

//                 <div className="text-center">
//                   <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <span className="text-white text-2xl">✨</span>
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                     3. Generate Images
//                   </h3>
//                   <p className="text-gray-600">
//                     Create unlimited images with prompts or choose from themed
//                     packs
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Carousel section - showing example generations */}
//           <div className="w-full max-w-6xl mt-16">
//             <div className="mb-8">
//               <h2 className="text-3xl font-bold text-gray-800 mb-2">
//                 See Yourself in Any Scene
//               </h2>
//               <p className="text-gray-600 text-lg">
//                 Real examples of AI-generated images with user faces
//               </p>
//             </div>

//             <div className="relative">
//               <Carousel
//                 className="w-full"
//                 plugins={[
//                   Autoplay({
//                     delay: 4000,
//                   }),
//                 ]}
//               >
//                 <CarouselContent className="-ml-2 md:-ml-4">
//                   <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
//                     <div className="relative group">
//                       <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
//                         <img
//                           src="https://cdn.dribbble.com/userupload/29421930/file/original-57e8bed3bcd878be405419a3c9905516.jpg?format=webp&resize=400x300&vertical=center"
//                           alt="Fantasy Adventure Generated"
//                           className="w-full h-72 object-cover"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                         <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                           <p className="text-sm font-medium">
//                             Fantasy Adventure Pack
//                           </p>
//                           <p className="text-xs opacity-80">
//                             Generated with user's face
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </CarouselItem>

//                   <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
//                     <div className="relative group">
//                       <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
//                         <img
//                           src="https://cdn.dribbble.com/userupload/28508468/file/original-1337290ded3efe937873bbeaec533042.jpg?format=webp&resize=400x300&vertical=center"
//                           alt="Professional Portrait Generated"
//                           className="w-full h-72 object-cover"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                         <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                           <p className="text-sm font-medium">
//                             Professional Pack
//                           </p>
//                           <p className="text-xs opacity-80">
//                             Perfect for LinkedIn & resumes
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </CarouselItem>

//                   <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
//                     <div className="relative group">
//                       <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
//                         <img
//                           src="https://cdn.dribbble.com/userupload/18316354/file/original-c92e853d822351c5906e880d3e4fb2bd.jpg?format=webp&resize=400x300&vertical=center"
//                           alt="Millionaire Lifestyle Generated"
//                           className="w-full h-72 object-cover"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                         <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                           <p className="text-sm font-medium">
//                             Millionaire Pack
//                           </p>
//                           <p className="text-xs opacity-80">
//                             Luxury lifestyle images
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </CarouselItem>

//                   <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
//                     <div className="relative group">
//                       <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
//                         <img
//                           src="https://cdn.dribbble.com/userupload/18788132/file/original-f6c01cc687c499874b2ee6beb9994e18.jpg?format=webp&resize=400x300&vertical=center"
//                           alt="Millionaire Lifestyle Generated"
//                           className="w-full h-72 object-cover"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                         <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                           <p className="text-sm font-medium">Anime Pack</p>
//                           <p className="text-xs opacity-80">
//                             Stunning anime-style images
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </CarouselItem>
//                   <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
//                     <div className="relative group">
//                       <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
//                         <img
//                           src="https://cdn.dribbble.com/userupload/43917998/file/original-ce60ffa8236a789b639310f3c257a5e1.jpg?crop=0x349-1448x1435&format=webp&resize=640x480&vertical=center"
//                           alt="Millionaire Lifestyle Generated"
//                           className="w-full h-72 object-cover"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                         <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                           <p className="text-sm font-medium">NFT Pack</p>
//                           <p className="text-xs opacity-80">NFT-like images</p>
//                         </div>
//                       </div>
//                     </div>
//                   </CarouselItem>
//                 </CarouselContent>

//                 <CarouselPrevious className="hidden md:flex -left-12 w-12 h-12 bg-white/90 border-2 border-gray-200 hover:bg-white hover:border-purple-300 shadow-lg" />
//                 <CarouselNext className="hidden md:flex -right-12 w-12 h-12 bg-white/90 border-2 border-gray-200 hover:bg-white hover:border-purple-300 shadow-lg" />
//               </Carousel>
//             </div>
//           </div>

//           {/* Popular Packs section */}
//           <div className="w-full max-w-5xl mt-20">
//             <div className="mb-8">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">
//                 Popular Theme Packs
//               </h2>
//               <p className="text-gray-600 text-lg">
//                 Each pack contains 10 professionally crafted prompts
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <div className="bg-gradient-to-br from-pink-100 to-red-100 p-6 rounded-2xl border border-pink-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
//                 <div className="text-3xl mb-3">💕</div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                   Valentine's Day
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-3">
//                   Romantic scenes and date settings
//                 </p>
//                 <span className="text-xs bg-pink-200 text-pink-800 px-2 py-1 rounded-full">
//                   10 images
//                 </span>
//               </div>

//               <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-6 rounded-2xl border border-yellow-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
//                 <div className="text-3xl mb-3">💰</div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                   Millionaire
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-3">
//                   Luxury lifestyle and wealth
//                 </p>
//                 <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
//                   10 images
//                 </span>
//               </div>

//               <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
//                 <div className="text-3xl mb-3">💼</div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                   Professional
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-3">
//                   Business and corporate looks
//                 </p>
//                 <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
//                   10 images
//                 </span>
//               </div>

//               <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
//                 <div className="text-3xl mb-3">🏖️</div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                   Travel
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-3">
//                   Exotic locations and adventures
//                 </p>
//                 <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
//                   10 images
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
