"use client";
import { useState } from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

export function Appbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const smoothScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false); // Close menu after navigation
    }
  };

  // Inside the component:
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-xl border-b border-gray-800/50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight text-white">
          Photo
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AI
          </span>
        </div>

        {/* Desktop Nav */}
        {!isDashboard && (
          <nav className="hidden md:flex items-center gap-8">
            <button
              type="button"
              onClick={() => smoothScroll("features")}
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-200 group-hover:w-full"></span>
            </button>
            <button
              type="button"
              onClick={() => smoothScroll("pricing")}
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium relative group"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-200 group-hover:w-full"></span>
            </button>
            <button
              type="button"
              onClick={() => smoothScroll("about")}
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-200 group-hover:w-full"></span>
            </button>
          </nav>
        )}

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <SignedOut>
            <SignInButton>
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
              >
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
              >
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-10 h-10 ring-2 ring-blue-500/20 hover:ring-blue-500/40 transition-all duration-200",
                },
              }}
            />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white hover:text-white hover:bg-white/10 p-2"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </Button>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl">
          {/* Close button in top right */}
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:text-white hover:bg-white/10 p-2"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Menu content centered */}
          <div className="flex flex-col items-center justify-center min-h-screen space-y-8 px-4 bg-black/70">
            {!isDashboard && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    smoothScroll("features");
                    setIsMenuOpen(false);
                  }}
                  className="text-2xl font-medium text-white hover:text-blue-400 transition-colors duration-200"
                >
                  Features
                </button>
                <button
                  type="button"
                  onClick={() => {
                    smoothScroll("pricing");
                    setIsMenuOpen(false);
                  }}
                  className="text-2xl font-medium text-white hover:text-blue-400 transition-colors duration-200"
                >
                  Pricing
                </button>
                <button
                  type="button"
                  onClick={() => {
                    smoothScroll("about");
                    setIsMenuOpen(false);
                  }}
                  className="text-2xl font-medium text-white hover:text-blue-400 transition-colors duration-200"
                >
                  About
                </button>
              </>
            )}

            <div className="pt-8 space-y-4 flex flex-col items-center">
              <SignedOut>
                <SignInButton>
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
                  >
                    Sign Up
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-12 h-12",
                    },
                  }}
                />
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/// Change -2
// "use client";
// import {
//   SignInButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";

// export function Appbar() {
//   const smoothScroll = (id: string) => {
//     const section = document.getElementById(id);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-xl border-b border-gray-800/50 shadow-lg">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
//         {/* Logo */}
//         <div className="text-2xl font-bold tracking-tight text-white">
//           Photo
//           <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//             AI
//           </span>
//         </div>

//         {/* Nav Links */}
//         <nav className="hidden md:flex items-center gap-8">
//           <button
//             onClick={() => smoothScroll("features")}
//             className="text-gray-300 hover:text-white transition-colors duration-200 font-medium relative group"
//           >
//             Features
//             <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-200 group-hover:w-full"></span>
//           </button>
//           <button
//             onClick={() => smoothScroll("pricing")}
//             className="text-gray-300 hover:text-white transition-colors duration-200 font-medium relative group"
//           >
//             Pricing
//             <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-200 group-hover:w-full"></span>
//           </button>
//           <button
//             onClick={() => smoothScroll("about")}
//             className="text-gray-300 hover:text-white transition-colors duration-200 font-medium relative group"
//           >
//             About
//             <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-200 group-hover:w-full"></span>
//           </button>
//         </nav>

//         {/* Auth Buttons */}
//         <div className="flex items-center gap-3">
//           <SignedOut>
//             <SignInButton>
//               <Button
//                 variant="ghost"
//                 className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
//               >
//                 Sign In
//               </Button>
//             </SignInButton>
//             <SignUpButton>
//               {/* <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-full px-6 py-2 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
//                 Get Started
//               </Button> */}
//               <Button
//                 variant="ghost"
//                 className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
//               >
//                 Sign Up
//               </Button>
//             </SignUpButton>
//           </SignedOut>
//           <SignedIn>
//             <UserButton
//               appearance={{
//                 elements: {
//                   avatarBox:
//                     "w-10 h-10 ring-2 ring-blue-500/20 hover:ring-blue-500/40 transition-all duration-200",
//                 },
//               }}
//             />
//           </SignedIn>
//         </div>

//         {/* Mobile Menu Button */}
//         <Button className="md:hidden text-gray-300 hover:text-white transition-colors duration-200">
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </Button>
//       </div>
//     </header>
//   );
// }

/// Change -1
// "use client";
// import {
//   SignInButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";

// export function Appbar() {
//   // Smooth scroll to Pricing
//   const scrollToPricing = () => {
//     const section = document.getElementById("pricing");
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-xl border-b border-gray-800/50 shadow-lg">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
//         {/* Logo */}
//         <div className="text-2xl font-bold tracking-tight text-white">
//           Photo
//           <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//             AI
//           </span>
//         </div>

//         {/* Nav Links - Centered */}
//         <nav className="hidden md:flex items-center gap-8">
//           <a
//             href="#features"
//             className="text-gray-300 hover:text-white transition-colors duration-200 font-medium relative group"
//           >
//             Features
//             <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-200 group-hover:w-full"></span>
//           </a>
//           <button
//             onClick={scrollToPricing}
//             className="text-gray-300 hover:text-white transition-colors duration-200 font-medium relative group"
//           >
//             Pricing
//             <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-200 group-hover:w-full"></span>
//           </button>
//           <a
//             href="#about"
//             className="text-gray-300 hover:text-white transition-colors duration-200 font-medium relative group"
//           >
//             About
//             <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-200 group-hover:w-full"></span>
//           </a>
//         </nav>

//         {/* Auth Buttons */}
//         <div className="flex items-center gap-3">
//           <SignedOut>
//             <SignInButton>
//               <Button
//                 variant="ghost"
//                 className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
//               >
//                 Sign In
//               </Button>
//             </SignInButton>
//             <SignUpButton>
//               <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-full px-6 py-2 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
//                 Get Started
//               </Button>
//             </SignUpButton>
//           </SignedOut>
//           <SignedIn>
//             <UserButton
//               appearance={{
//                 elements: {
//                   avatarBox:
//                     "w-10 h-10 ring-2 ring-blue-500/20 hover:ring-blue-500/40 transition-all duration-200",
//                 },
//               }}
//             />
//           </SignedIn>
//         </div>

//         {/* Mobile Menu Button */}
//         <Button className="md:hidden text-gray-300 hover:text-white transition-colors duration-200">
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </Button>
//       </div>
//     </header>
//   );
// }

/// Original
// import {
//   SignInButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";

// export function Appbar() {
//   return (
//     <div className="flex items-center justify-between p-4 bg-white-800 text-black-800 shadow-md">
//       <div className="text-xl">PhotoAI</div>
//       <div>
//         <SignedOut>
//           <Button variant={"ghost"} className="mr-4">
//             <SignInButton />
//           </Button>
//           <SignUpButton>
//             <button
//               type="button"
//               className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer"
//             >
//               Sign Up
//             </button>
//           </SignUpButton>
//         </SignedOut>
//         <SignedIn>
//           <UserButton />
//         </SignedIn>
//       </div>
//     </div>
//   );
// }
