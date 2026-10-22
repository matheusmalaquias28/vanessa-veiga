"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { process } from "@/lib/content";

/** Etapas do trabalho; no desktop uma imagem acompanha o cursor. */
export function ProcessList() {
  const root = useRef<HTMLDivElement>(null);
  const follow = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      gsap.set(follow.current, { xPercent: -50, yPercent: -50, scale: 0.6, autoAlpha: 0 });
      gsap.from(".pc-row", {
        y: 50,
        autoAlpha: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: "cine",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
    },
    { scope: root },
  );

  const move = (e: React.MouseEvent) => {
    const r = root.current!.getBoundingClientRect();
    gsap.to(follow.current, { x: e.clientX - r.left, y: e.clientY - r.top, duration: 0.7, ease: "power3.out" });
  };

  const show = (i: number | null) => {
    setActive(i);
    gsap.to(follow.current, { autoAlpha: i === null ? 0 : 1, scale: i === null ? 0.6 : 1, duration: 0.5, ease: "power3.out" });
  };

  return (
    <div ref={root} className="relative" onMouseMove={move} onMouseLeave={() => show(null)}>
      <ol className="border-t border-paper/15">
        {process.map((step, i) => (
          <li
            key={step.n}
            onMouseEnter={() => show(i)}
            className="pc-row group grid gap-4 border-b border-paper/15 py-8 md:grid-cols-12 md:items-baseline md:py-10"
          >
            <span className="text-sm font-light text-stone md:col-span-1">{step.n}</span>
            <h3
              className={`display text-[clamp(2rem,4.6vw,4.75rem)] transition-[color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-3 md:col-span-6 ${
                active === null || active === i ? "text-paper" : "text-paper/30"
              }`}
            >
              {step.title}
            </h3>
            <p className="max-w-[42ch] font-extralight leading-relaxed text-paper/70 md:col-span-5">{step.text}</p>
          </li>
        ))}
      </ol>

      <div ref={follow} className="pointer-events-none absolute left-0 top-0 z-10 hidden aspect-[3/4] w-[18vw] overflow-hidden lg:block">
        {process.map((step, i) => (
          <Image
            key={step.n}
            src={step.image}
            alt=""
            fill
            sizes="18vw"
            className={`object-cover grayscale transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
    </div>
  );
}
