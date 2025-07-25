import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function Appbar() {
  return (
    <div className="flex items-center justify-between p-4 bg-white-800 text-black-800 shadow-md">
      <div className="text-xl">PhotoAI</div>
      <div>
        <SignedOut>
          <Button variant={"ghost"} className="mr-4">
            <SignInButton />
          </Button>
          <SignUpButton>
            <button
              type="button"
              className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer"
            >
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
