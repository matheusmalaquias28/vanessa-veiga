"use client";

import Image from "next/image";
import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

/** Título que sobe linha a linha, com máscara, ao entrar na tela. */
export function SplitReveal({
  as: Tag = "h2",
  children,
  className,
  delay = 0,
  immediate = false,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  /** anima ao montar, sem esperar o scroll (topo de página) */
  immediate?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
      gsap.from(split.lines, {
        yPercent: 105,
        duration: 1.2,
        stagger: 0.09,
        ease: "cine",
        delay: immediate ? 0.55 + delay : delay,
        scrollTrigger: immediate ? undefined : { trigger: el, start: "top 88%", once: true },
      });
      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/** Texto que acende palavra por palavra conforme o scroll. */
export function ScrubWords({ children, className, as: Tag = "p" }: { children: string; className?: string; as?: ElementType }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const split = SplitText.create(ref.current!, { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
      return () => split.revert();
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/** Bloco que sobe suavemente ao entrar na tela. */
export function FadeUp({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current, {
        y: 40,
        autoAlpha: 0,
        duration: 1.2,
        ease: "cine",
        delay: immediate ? 0.6 + delay : delay,
        scrollTrigger: immediate ? undefined : { trigger: ref.current, start: "top 90%", once: true },
      });
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

type RevealFrom = "left" | "right" | "bottom" | "diagonal";

const clipFrom: Record<RevealFrom, string> = {
  left: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
  right: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
  bottom: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  diagonal: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
};

/**
 * Imagem com revelação geométrica (corte em diagonal, como uma dobra)
 * e parallax leve dentro da moldura.
 */
export function RevealImage({
  src,
  alt,
  className,
  imgClassName = "",
  sizes = "100vw",
  from = "diagonal",
  parallax = 10,
  priority,
  immediate = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  from?: RevealFrom;
  parallax?: number;
  priority?: boolean;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      const img = el.querySelector(".ri-img");
      const tl = gsap.timeline({
        delay: immediate ? 0.5 : 0,
        scrollTrigger: immediate ? undefined : { trigger: el, start: "top 85%", once: true },
      });
      if (from === "diagonal") {
        tl.fromTo(
          el,
          { clipPath: clipFrom.diagonal },
          {
            keyframes: [
              { clipPath: "polygon(0% 0%, 100% 0%, 0% 100%, 0% 100%)", duration: 0.7, ease: "power2.in" },
              { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.9, ease: "cine" },
            ],
          },
        );
      } else {
        tl.fromTo(el, { clipPath: clipFrom[from] }, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.4, ease: "fold" });
      }
      tl.from(img, { scale: 1.25, duration: 1.8, ease: "cine" }, 0);

      if (parallax) {
        gsap.fromTo(
          el.querySelector(".ri-par"),
          { yPercent: -parallax / 2 },
          { yPercent: parallax / 2, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      }
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <div className="ri-par absolute -inset-y-[8%] inset-x-0">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`ri-img object-cover ${imgClassName}`} />
      </div>
    </div>
  );
}
