/// Change -2
"use client";

import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Upload, Wand2, Download } from "lucide-react";

// Carousel + Packs data
const heroImages = [
  {
    src: "https://cdn.dribbble.com/userupload/43208206/file/original-f0e2a2eec8cdb484b598794c5ddd772b.jpg?resize=1024x1024&vertical=center",
    title: "Abstract Art Pack",
    desc: "Abstract and surreal art styles",
  },
  {
    src: "https://cdn.dribbble.com/userupload/43917998/file/original-ce60ffa8236a789b639310f3c257a5e1.jpg?crop=0x349-1448x1435&format=webp&resize=640x480&vertical=center",
    title: "Fantasy Pack",
    desc: "Magical themed portraits",
  },
  {
    src: "https://cdn.dribbble.com/userupload/43217904/file/original-2feb9bf83d417eed1caf9114dc1fdf12.png?crop=0x0-896x672&format=webp&resize=400x300&vertical=center",
    title: "Millionaire Pack",
    desc: "Luxury lifestyle images",
  },
  {
    src: "https://cdn.dribbble.com/userupload/14545628/file/original-1de426188f8b0fd5107d499185ad7646.jpeg?crop=85x154-1428x1161&format=webp&resize=400x300&vertical=center",
    title: "Valentine's Day Pack",
    desc: "Romantic couple portraits",
  },
  {
    src: "https://cdn.dribbble.com/userupload/42723544/file/original-af0f0f1b93c353a66888e5e330543b5c.jpg?crop=0x1076-2160x2696&format=webp&resize=400x300&vertical=center",
    title: "Retro Pack",
    desc: "Vintage photo styles",
  },
  {
    src: "https://cdn.dribbble.com/userupload/43323352/file/still-09d137c1d9ebb933f8b58be08d0bacaf.png?format=webp&resize=400x300&vertical=center",
    title: "Travel Explorer Pack",
    desc: "Epic travel destinations",
  },
];

// Dynamic pricing plans
const pricingPlans = [
  {
    name: "Starter",
    price: "$8",
    features: [
      "Train Models for 2 people",
      "15 Images per person",
      "Standard Packs",
      "HD Quality",
    ],
  },
  {
    name: "Pro",
    price: "$20",
    features: [
      "Train Models for 5 people",
      "30 Images per person",
      "Premium Packs",
      "HD Quality",
      "Priority Processing",
    ],
  },
  {
    name: "Studio",
    price: "$75",
    features: [
      "Train Models for 15 people",
      "100 Images per person",
      "All Packs",
      "4K Quality",
      "Priority Support",
      "Commercial License",
    ],
  },
];

export function Hero() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      {/* Soft background glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />
      {/* HERO HEADER */}
      <div className="flex flex-col items-center px-4 py-12 md:py-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Welcome to <span className="text-primary">PhotoAI</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground">
            Create stunning AI-generated images of yourself and your loved ones
            — in any style or theme.
          </p>
          {/* <h1 className="text-3xl p-2 text-center ">Welcome to PhotoAI</h1>
          <p className="text-6xl text-center p-2 font-bold pb-4">
            Generate Images for yourself and your family
          </p> */}
        </motion.div>

        {/* CAROUSEL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full max-w-5xl mt-10"
        >
          <Carousel
            plugins={[
              Autoplay({
                delay: 3500,
              }),
            ]}
          >
            <CarouselContent>
              {heroImages.map((img, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="relative aspect-square group rounded-xl overflow-hidden shadow-lg border-3 hover:border-red-500 p-1 cursor-pointer transition-colors duration-300">
                    <Image
                      src={img.src}
                      alt={img.title}
                      fill
                      sizes="(max-width: 768px) 100vw,
                      (max-width: 1200px) 50vw,
                      33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-lg"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Text Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm font-medium">{img.title}</p>
                      <p className="text-xs opacity-80">{img.desc}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 flex gap-4"
        >
          <SignedIn>
            <Button
              onClick={() => router.push("/dashboard")}
              size="lg"
              className="px-8 py-3 shadow-md"
            >
              Go to Dashboard
            </Button>
          </SignedIn>
          <SignedOut>
            {/* <SignInButton>
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-3 shadow-md"
              >
                Sign In
              </Button>
            </SignInButton> */}
            <SignUpButton>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-full px-6 py-2 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                Get Started
              </Button>
            </SignUpButton>
          </SignedOut>
        </motion.div>
      </div>

      {/* HOW IT WORKS */}
      <section id="features" className="py-38 w-full max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: <Upload size={40} className="mx-auto text-primary" />,
              title: "Upload Your Photos",
              desc: "Provide clear images of yourself to train your AI model.",
            },
            {
              icon: <Wand2 size={40} className="mx-auto text-primary" />,
              title: "AI Model Training",
              desc: "Our system learns your features and style preferences.",
            },
            {
              icon: <Download size={40} className="mx-auto text-primary" />,
              title: "Generate & Download",
              desc: "Create themed images instantly and save them in HD.",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-6 rounded-xl border-3 hover:border-red-400 cursor-pointer shadow-sm hover:shadow-md transition"
            >
              {step.icon}
              <h3 className="text-lg font-semibold mt-4">{step.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* POPULAR PACKS */}
      <section className="py-20 w-full max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Packs</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {heroImages.map((pack, i) => (
            <div
              key={i}
              className="relative group aspect-square rounded-xl overflow-hidden shadow-lg border-3 hover:border-red-400 p-1 cursor-pointer transition-colors duration-300"
            >
              <Image
                src={pack.src}
                alt={pack.title}
                fill
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw, 
                33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-semibold">{pack.title}</h4>
                <p className="text-xs opacity-80">{pack.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING (Dynamic) */}
      <section id="pricing" className="py-40 w-full max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, i) => (
            <div
              key={i}
              className="border-3 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-red-400 cursor-pointer transition"
            >
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="text-3xl font-bold mt-2">{plan.price}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-primary" /> {f}
                  </li>
                ))}
              </ul>
              <Button className="mt-6 w-full">Get Started</Button>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="py-30 w-full max-w-6xl px-4 border-t border-gray-800/50"
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          About PhotoAI 🔎
        </h2>
        <p className="text-center text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          PhotoAI is an AI-powered platform that transforms your photos into
          stunning, themed portraits in just a few clicks. From fantasy worlds
          to luxury lifestyles, our state-of-the-art AI model is trained to
          capture your unique style and personality. Whether you are looking for
          professional headshots, creative social media posts, or unforgettable
          keepsakes, PhotoAI delivers premium-quality results — instantly.
        </p>
      </section>
    </div>
  );
}

///Change -1
// "use client";

// import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import Image from "next/image";
// import Autoplay from "embla-carousel-autoplay";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";

// const heroImages = [
//   "https://cdn.dribbble.com/userupload/29421930/file/original-57e8bed3bcd878be405419a3c9905516.jpg?format=webp&resize=400x300&vertical=center",
//   "https://cdn.dribbble.com/userupload/28508468/file/original-1337290ded3efe937873bbeaec533042.jpg?format=webp&resize=400x300&vertical=center",
//   "https://cdn.dribbble.com/userupload/18316354/file/original-c92e853d822351c5906e880d3e4fb2bd.jpg?format=webp&resize=400x300&vertical=center",
//   "https://cdn.dribbble.com/userupload/18788132/file/original-f6c01cc687c499874b2ee6beb9994e18.jpg?format=webp&resize=400x300&vertical=center",
//   "https://cdn.dribbble.com/userupload/43917998/file/original-ce60ffa8236a789b639310f3c257a5e1.jpg?crop=0x349-1448x1435&format=webp&resize=640x480&vertical=center",
// ];

// export function Hero() {
//   const router = useRouter();

//   return (
//     <div className="flex flex-col items-center px-4 py-8 md:py-12 bg-gradient-to-b from-background via-muted/30 to-background">
//       {/* Title */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-3xl text-center"
//       >
//         <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
//           Welcome to <span className="text-primary">PhotoAI</span>
//         </h1>
//         <p className="mt-4 text-lg md:text-xl text-muted-foreground">
//           Create stunning AI-generated images of yourself and your loved ones —
//           in any style or theme.
//         </p>
//       </motion.div>

//       {/* Carousel */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 0.3, duration: 0.5 }}
//         className="w-full max-w-5xl mt-10"
//       >
//         <Carousel
//           plugins={[
//             Autoplay({
//               delay: 3500,
//             }),
//           ]}
//         >
//           <CarouselContent>
//             {heroImages.map((src, index) => (
//               <CarouselItem
//                 key={index}
//                 className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
//               >
//                 <div className="relative aspect-square group rounded-lg overflow-hidden shadow-lg">
//                   <Image
//                     src={src}
//                     alt={`Image ${index + 1}`}
//                     fill
//                     className="object-cover transition-transform duration-500 group-hover:scale-105"
//                   />
//                 </div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <CarouselPrevious className="hidden md:flex" />
//           <CarouselNext className="hidden md:flex" />
//         </Carousel>
//       </motion.div>

//       {/* Buttons */}
//       <motion.div
//         initial={{ opacity: 0, y: 15 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5, duration: 0.5 }}
//         className="mt-8 flex gap-4"
//       >
//         <SignedIn>
//           <Button
//             onClick={() => router.push("/dashboard")}
//             size="lg"
//             className="px-8 py-3 shadow-md"
//           >
//             Go to Dashboard
//           </Button>
//         </SignedIn>
//         <SignedOut>
//           <SignInButton>
//             <Button
//               size="lg"
//               variant="secondary"
//               className="px-8 py-3 shadow-md"
//             >
//               Sign In to Get Started
//             </Button>
//           </SignInButton>
//         </SignedOut>
//       </motion.div>
//     </div>
//   );
// }

/// Original
// "use client";
// import {
//   SignInButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import Image from "next/image";
// import Autoplay from "embla-carousel-autoplay";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// export function Hero() {
//   const router = useRouter();
//   return (
//     <div className="flex justify-center">
//       <div className="max-w-5xl">
//         {/* <br /> */}
//         {/* <br /> */}
//         <h1 className="text-3xl p-2 text-center ">Welcome to PhotoAI</h1>
//         <p className="text-6xl text-center p-2 font-bold pb-4">
//           Generate Images for yourself and your family
//         </p>
//         {/* <br /> */}
//         <br />
//         <Carousel
//           plugins={[
//             Autoplay({
//               delay: 3500,
//             }),
//           ]}
//         >
//           <CarouselContent className="-ml-2 md:-ml-4">
//             <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
//               {/* <img
//                 src="https://cdn.dribbble.com/userupload/29421930/file/original-57e8bed3bcd878be405419a3c9905516.jpg?format=webp&resize=400x300&vertical=center"
//                 alt="1"
//               /> */}
//               <div className="relative aspect-square group">
//                 <Image
//                   src="https://cdn.dribbble.com/userupload/29421930/file/original-57e8bed3bcd878be405419a3c9905516.jpg?format=webp&resize=400x300&vertical=center"
//                   alt="1"
//                   fill
//                   className="object-cover transition-transform duration-300 group-hover:scale-105 rounded"
//                 />
//               </div>
//             </CarouselItem>
//             <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
//               {/* <img
//                 src="https://cdn.dribbble.com/userupload/28508468/file/original-1337290ded3efe937873bbeaec533042.jpg?format=webp&resize=400x300&vertical=center"
//                 alt="2"
//               /> */}
//               <div className="relative aspect-square group">
//                 <Image
//                   src="https://cdn.dribbble.com/userupload/28508468/file/original-1337290ded3efe937873bbeaec533042.jpg?format=webp&resize=400x300&vertical=center"
//                   alt="2"
//                   fill
//                   className="object-cover transition-transform duration-300 group-hover:scale-105 rounded"
//                 />
//               </div>
//             </CarouselItem>
//             <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
//               {/* <img
//                 src="https://cdn.dribbble.com/userupload/18316354/file/original-c92e853d822351c5906e880d3e4fb2bd.jpg?format=webp&resize=400x300&vertical=center"
//                 alt="3"
//               /> */}
//               <div className="relative aspect-square group">
//                 <Image
//                   src="https://cdn.dribbble.com/userupload/18316354/file/original-c92e853d822351c5906e880d3e4fb2bd.jpg?format=webp&resize=400x300&vertical=center"
//                   alt="3"
//                   fill
//                   className="object-cover transition-transform duration-300 group-hover:scale-105 rounded"
//                 />
//               </div>
//             </CarouselItem>
//             <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
//               {/* <img
//                 src="https://cdn.dribbble.com/userupload/18788132/file/original-f6c01cc687c499874b2ee6beb9994e18.jpg?format=webp&resize=400x300&vertical=center"
//                 alt="4"
//               /> */}
//               <div className="relative aspect-square group">
//                 <Image
//                   src="https://cdn.dribbble.com/userupload/18788132/file/original-f6c01cc687c499874b2ee6beb9994e18.jpg?format=webp&resize=400x300&vertical=center"
//                   alt="4"
//                   fill
//                   className="object-cover transition-transform duration-300 group-hover:scale-105 rounded"
//                 />
//               </div>
//             </CarouselItem>
//             <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
//               {/* <img
//                 src="https://cdn.dribbble.com/userupload/43917998/file/original-ce60ffa8236a789b639310f3c257a5e1.jpg?crop=0x349-1448x1435&format=webp&resize=640x480&vertical=center"
//                 alt="5"
//               /> */}
//               <div className="relative aspect-square group">
//                 <Image
//                   src="https://cdn.dribbble.com/userupload/43917998/file/original-ce60ffa8236a789b639310f3c257a5e1.jpg?crop=0x349-1448x1435&format=webp&resize=640x480&vertical=center"
//                   alt="5"
//                   fill
//                   className="object-cover transition-transform duration-300 group-hover:scale-105 rounded"
//                 />
//               </div>
//             </CarouselItem>
//           </CarouselContent>
//           <CarouselPrevious />
//           <CarouselNext />
//         </Carousel>
//         <br />
//         <div className="flex justify-center">
//           <SignedIn>
//             <Button
//               onClick={() => {
//                 router.push("/dashboard");
//               }}
//               className="mt-4 px-8 py-2"
//               size={"lg"}
//               variant={"secondary"}
//             >
//               Dashboard
//             </Button>
//           </SignedIn>
//           <SignedOut>
//             <Button
//               className="mt-4 px-8 py-2"
//               size={"lg"}
//               variant={"secondary"}
//             >
//               <SignInButton />
//             </Button>
//           </SignedOut>
//         </div>
//       </div>
//     </div>
//   );
// }

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
