"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { categories, projects, type Project } from "@/lib/content";
import { SplitReveal } from "../ui/motion";

const rowA = projects.filter((_, i) => i % 2 === 0).slice(0, 9);
const rowB = projects.filter((_, i) => i % 2 === 1).slice(0, 9);

function Still({ p, tall }: { p: Project; tall?: boolean }) {
  return (
    <Link
      href={`/projetos/${p.slug}`}
      className={`group relative block shrink-0 overflow-hidden bg-ink-soft ${tall ? "aspect-[4/5] h-[34vh] md:h-[46vh]" : "aspect-[16/10] h-[26vh] md:h-[36vh]"}`}
    >
      <Image
        src={p.image}
        alt={p.title}
        fill
        sizes="(min-width: 768px) 40vw, 70vw"
        className="object-cover grayscale-[60%] transition-[transform,filter] duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:grayscale-0"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent opacity-80" />
      <span className="absolute bottom-3 left-4 right-4 translate-y-1 text-paper transition-transform duration-500 group-hover:translate-y-0">
        <span className="block text-sm font-medium leading-tight">{p.title.split(":")[0]}</span>
        <span className="block text-[0.6875rem] font-light text-paper/70">
          {categories[p.category].label}
          {p.year ? ` · ${p.year}` : ""}
        </span>
      </span>
    </Link>
  );
}

/** Faixa de stills que corre nos dois sentidos conforme o scroll. */
export function Trajectory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const st = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 };
      gsap.fromTo(q(".tr-a"), { xPercent: 0 }, { xPercent: -38, ease: "none", scrollTrigger: st });
      gsap.fromTo(q(".tr-b"), { xPercent: -38 }, { xPercent: 0, ease: "none", scrollTrigger: st });
      gsap.fromTo(q(".tr-year"), { xPercent: 12 }, { xPercent: -12, ease: "none", scrollTrigger: st });
    },
    { scope: root },
  );

  return (
    <section ref={root} data-theme="dark" className="relative overflow-hidden bg-ink py-28 text-paper md:py-40">
      <div className="mb-14 grid gap-8 px-5 md:mb-20 md:px-10 lg:grid-cols-12">
        <p className="eyebrow text-stone lg:col-span-3">Desde 1996</p>
        <SplitReveal className="display max-w-[18ch] text-[clamp(2.5rem,5.2vw,5.75rem)] lg:col-span-9">
          Uma trajetória construída através de <span className="serif-accent text-crimson">personagens.</span>
        </SplitReveal>
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="tr-a flex w-max items-end gap-4 pl-5 md:gap-6 md:pl-10">
          {rowA.map((p, i) => (
            <Still key={p.slug} p={p} tall={i % 3 === 1} />
          ))}
        </div>
        <div className="tr-b flex w-max items-start gap-4 pl-5 md:gap-6 md:pl-10">
          {rowB.map((p, i) => (
            <Still key={p.slug} p={p} tall={i % 3 === 0} />
          ))}
        </div>
      </div>

      <div className="pointer-events-none mt-16 overflow-hidden md:mt-24" aria-hidden>
        <p className="tr-year display whitespace-nowrap text-[28vw] leading-[0.75] text-paper/[0.06]">
          1996 — 2026
        </p>
      </div>
    </section>
  );
}
