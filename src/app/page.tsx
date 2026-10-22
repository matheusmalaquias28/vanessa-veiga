import { AreasPinned } from "@/components/home/AreasPinned";
import { Hero } from "@/components/home/Hero";
import { Signature } from "@/components/home/Signature";
import { Trajectory } from "@/components/home/Trajectory";

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
