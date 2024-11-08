import { AccordionDemo } from "@/components/global/accodians";
import Footer1 from "@/components/global/footer";
import GradientText from "@/components/global/gradient-text";
import PricingTable from "@/components/global/pricing-cards";
import { FeaturesSectionDemo } from "@/app/(landingpage)/_components/features";
import Hero from "@/app/(landingpage)/_components/hero";
import { Button } from "@/components/ui/button";
import { BadgePlus, LogOut, Menu, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-36 p-2 md:px-10 mt-40">
      <Hero />
      <FeaturesSectionDemo />
      <AccordionDemo />
      <PricingTable/>
      <Footer1 />
    </main>
  );
}
