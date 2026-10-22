"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { intro } from "@/lib/intro";

let instance: Lenis | null = null;
export const getLenis = () => instance;

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({ lerp: reduce ? 1 : 0.095, wheelMultiplier: 0.95 });
    instance = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    if (!intro.isReady()) lenis.stop();
    const unsub = intro.subscribe(() => lenis.start());

    return () => {
      unsub();
      gsap.ticker.remove(tick);
      lenis.destroy();
      instance = null;
    };
  }, []);

  // cada página nova começa do topo e recalcula as posições dos gatilhos
  useEffect(() => {
    instance?.scrollTo(0, { immediate: true, force: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
