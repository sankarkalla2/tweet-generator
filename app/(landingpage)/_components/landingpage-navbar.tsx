import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { auth, signOut } from "@/auth";
import { signOutUser } from "@/actions/user";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import Loader from "../../../components/global/loader";
import { useRouter } from "next/navigation";

const LandingPageNavbar = async () => {
  const session = await auth();

  return (
    <div className="fixed w-full top-4 px-4 z-50">
      <div className="flex items-center justify-between lg:mx-20 mx-auto bg-black/50 backdrop-blur-sm rounded-2xl p-4 shadow-lg bg-gradient-to-r from-[#171717] to-[#171717]/50 mb-40">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-2xl font-bold text-white">TICCO.st</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-white hover:text-purple-400 transition">
            Home
          </a>
          <a href="#" className="text-white hover:text-purple-400 transition">
            All Pages
          </a>
          <a href="#" className="text-white hover:text-purple-400 transition">
            Pages
          </a>
          <a href="#" className="text-white hover:text-purple-400 transition">
            About
          </a>
          <a href="#" className="text-white hover:text-purple-400 transition">
            Testimonial Examples
          </a>
        </div>

        {/* Submit Button */}
        <div className="flex items-center gap-x-3">
          {session?.user ? (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button
                type="submit"
                className="bg-[#171717] text-white px-10 rounded-2xl py-5 text-base"
              >
                Logout
              </Button>
            </form>
          ) : (
            <Button className="bg-[#171717] text-white px-10 rounded-2xl py-5 text-base">
              <Link href="/sign-in">Login</Link>
            </Button>
          )}
          <Button
            className=" px-10 rounded-2xl py-5 text-base"
            variant={"outline"}
          >
            Getting Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPageNavbar;
