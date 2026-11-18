import type { Metadata } from "next";
import { AreasPinned } from "@/components/home/AreasPinned";
import { Hero } from "@/components/home/Hero";
import { Signature } from "@/components/home/Signature";
import { Trajectory } from "@/components/home/Trajectory";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Hero />
      <AreasPinned />
      <Trajectory />
      <Signature />
    </>
  );
}
