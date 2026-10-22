"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { byCategory, categories, categoryOrder } from "@/lib/content";
import { SplitReveal, FadeUp } from "../ui/motion";
import { VideoReveal } from "./VideoReveal";

/**
 * Seção fixa no scroll (referência realevate.agency): as quatro áreas entram
 * uma sobre a outra em tela cheia e, no fim, se recolhem num grid 2x2.
 */
export function AreasPinned() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const cards = q<HTMLElement>(".ar-card");
      const stage = q(".ar-stage")[0];
      const mm = gsap.matchMedia();

      mm.add(
        { desktop: "(min-width: 1024px)", mobile: "(max-width: 1023.98px)" },
        (ctx) => {
          // o movimento aqui é guiado pelo próprio scroll, então vale também com reduced motion
          const { desktop } = ctx.conditions as { desktop: boolean };

          gsap.set(cards.slice(1), { yPercent: 100 });
          gsap.set(cards, { transformOrigin: "50% 0%" });

          const steps = cards.length - 1 + (desktop ? 1.2 : 0);
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: () => `+=${window.innerHeight * steps}`,
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              snap: desktop
                ? { snapTo: "labelsDirectional", duration: { min: 0.25, max: 0.7 }, delay: 0.08, ease: "power2.inOut" }
                : undefined,
            },
          });

          tl.addLabel("a0");
          cards.forEach((card, i) => {
            if (i === 0) return;
            tl.to(card, { yPercent: 0, duration: 1, ease: "power2.inOut" }, `a${i - 1}`)
              .to(cards[i - 1], { scale: 0.9, yPercent: -3, duration: 1, ease: "power2.inOut" }, "<")
              .to(cards[i - 1].querySelector(".ar-dim"), { opacity: 0.55, duration: 1 }, "<")
              .fromTo(card.querySelector(".ar-img img"), { scale: 1.3 }, { scale: 1, duration: 1 }, "<")
              .addLabel(`a${i}`);
          });

          if (desktop) {
            // grid final: escala uniforme, abaixo do cabeçalho
            const cell = () => {
              const vw = window.innerWidth;
              const vh = window.innerHeight;
              const g = 16;
              const top = 96;
              const s = Math.min((vw - 3 * g) / (2 * vw), (vh - top - 2 * g) / (2 * vh));
              const x0 = (vw - (2 * s * vw + g)) / 2;
              return { vw, vh, g, top, s, x0 };
            };
            const last = cards.length - 1;
            const toGrid = (i: number) => ({
              x: () => {
                const c = cell();
                return c.x0 + (i % 2) * (c.s * c.vw + c.g);
              },
              y: () => {
                const c = cell();
                return c.top + Math.floor(i / 2) * (c.s * c.vh + c.g);
              },
              scale: () => cell().s,
              yPercent: 0,
              transformOrigin: "0% 0%",
            });

            tl.set(cards.slice(0, last), { transformOrigin: "0% 0%" }, `a${last}+=0.15`)
              .to(cards.slice(0, last).map((c) => c.querySelector(".ar-dim")), { opacity: 0, duration: 0.01 }, "<");
            cards.slice(0, last).forEach((c, i) => tl.set(c, toGrid(i), "<"));
            tl.set(cards[last], { transformOrigin: "0% 0%" }, "<")
              .to(cards[last], { ...toGrid(last), duration: 1, ease: "power3.inOut" }, "<")
              .to(q(".ar-stage-bg"), { opacity: 1, duration: 0.6 }, "<")
              .addLabel("grid")
              .to({}, { duration: 0.2 });
          }
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} data-theme="light" className="relative bg-paper text-ink">
      <div className="flex flex-col items-center px-5 pb-20 pt-28 text-center md:px-10 md:pb-28 md:pt-40">
        <p className="eyebrow mb-10 text-stone-deep">02 — Áreas de atuação</p>
        <SplitReveal className="display mx-auto max-w-[16ch] text-balance text-[clamp(2.25rem,6.4vw,7.5rem)]">
          Histórias contadas em diferentes <span className="serif-accent">palcos e telas.</span>
        </SplitReveal>
        <FadeUp className="mx-auto mt-10 max-w-[44ch]">
          <p className="body-lg text-ink/70">
            Do cinema ao teatro, da televisão às plataformas de streaming. Uma trajetória construída por diferentes
            narrativas, personagens e encontros.
          </p>
        </FadeUp>
      </div>

      <VideoReveal />

      <div data-theme="dark" className="ar-stage relative h-[100svh] overflow-hidden">
        <div className="ar-stage-bg absolute inset-0 bg-ink opacity-0" />
        {categoryOrder.map((c, i) => {
          const cat = categories[c];
          const dark = cat.ink === "light";
          const count = byCategory(c).length;
          return (
            <Link
              key={c}
              href={cat.href}
              data-theme={dark ? "dark" : "light"}
              className="ar-card group absolute inset-0 flex flex-col overflow-hidden will-change-transform"
              style={{ background: cat.tone, color: dark ? "var(--color-paper)" : "var(--color-ink)", zIndex: i + 1 }}
            >
              <div className="flex flex-col items-center px-5 pb-6 pt-24 text-center md:px-10 md:pb-8 md:pt-28">
                <p className="eyebrow mb-4 opacity-60">
                  0{i + 1} / 04 · {count} produções
                </p>
                <h3 className="display text-[clamp(4rem,12vw,13rem)] leading-[0.8]">{cat.label}</h3>
                <div className="mt-6 flex flex-col items-center gap-5 lg:flex-row lg:gap-10">
                  <p className="body-lg max-w-[30ch] opacity-80">{cat.tagline}</p>
                  <span className="cta-line">
                    {cat.cta}
                    <span className="cta-rule" aria-hidden />
                  </span>
                </div>
              </div>
              <div
                className="ar-img relative mx-5 mb-5 flex-1 overflow-hidden md:mx-10 md:mb-10"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 5% 100%, 0 86%)" }}
              >
                <Image
                  src={cat.image}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="ar-dim pointer-events-none absolute inset-0 bg-ink opacity-0" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
