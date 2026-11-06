"use client";

import Image, { getImageProps } from "next/image";
import { useRef, useState } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useIntroReady } from "@/lib/intro";
import { categories, heroReel, portraits, type Project } from "@/lib/content";
import { ArrowLink } from "../ui/ArrowLink";

const HIDDEN = "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)";
const HIDDEN_BR = "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)";
const FULL = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
// retrato final: borda esquerda cortada na diagonal, como uma dobra
const PORTRAIT_DESKTOP = "polygon(44% 0%, 100% 0%, 100% 100%, 30% 100%)";

/**
 * Fundo de cada quadro da montagem. Com pôster, usa <picture>: o celular baixa
 * só o pôster vertical e o desktop só a imagem larga.
 */
function FrameImage({ p, eager }: { p: Project; eager: boolean }) {
  const loading = eager ? "eager" : "lazy";
  const fetchPriority = eager ? "high" : "auto";
  const wide = p.heroImage ?? p.image;

  if (!p.heroPoster) {
    return (
      <Image
        src={wide}
        alt={p.heroImage ? `Banner de ${p.title}` : ""}
        fill
        loading={loading}
        fetchPriority={fetchPriority}
        sizes="100vw"
        quality={p.heroImage ? 85 : undefined}
        className={`object-cover ${p.heroFocus ?? ""}`}
      />
    );
  }

  const common = { alt: `Banner de ${p.title}`, fill: true, quality: 85, loading, fetchPriority } as const;
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: wide, sizes: "100vw" });
  // o pôster 3:4 cobre a tela em pé, então fica bem mais largo que a viewport
  const { props: mobile } = getImageProps({ ...common, src: p.heroPoster, sizes: "170vw" });

  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={desktop} sizes="100vw" />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...mobile} className={`object-cover ${p.heroFocus ?? ""}`} />
    </picture>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const ready = useIntroReady();
  const [inset, setInset] = useState(0);

  useGSAP(
    () => {
      if (!ready) return;
      const q = gsap.utils.selector(root);
      const frames = q(".hr-frame");
      const split = SplitText.create(q(".hr-title"), { type: "lines,words", mask: "lines", linesClass: "split-line" });
      const mm = gsap.matchMedia();

      // só começa a montagem com as fotos decodificadas, para nenhum corte abrir vazio
      const imgs = q<HTMLImageElement>(".hr-frame img, .hr-portrait img");
      const imagesReady = Promise.race([
        Promise.all(imgs.map((img) => img.decode().catch(() => undefined))),
        new Promise((resolve) => setTimeout(resolve, 2500)),
      ]);

      mm.add({ desktop: "(min-width: 1024px)", mobile: "(max-width: 1023.98px)", reduce: "(prefers-reduced-motion: reduce)" }, (ctx) => {
        const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean };
        const tl = gsap.timeline({ defaults: { ease: "fold" }, paused: true });

        // tempos absolutos: posições relativas ("<", ">") aqui se encadeiam no
        // contador e fariam todas as produções entrarem ao mesmo tempo
        const STEP = 0.5;
        const portraitAt = reduce ? 0 : (frames.length - 1) * STEP + 0.65;
        const settleAt = portraitAt + (reduce ? 0 : 1.15);

        if (!reduce) {
          // montagem: cada produção entra com um corte triangular, alternando o canto
          frames.forEach((frame, i) => {
            const fromTL = i % 2 === 0;
            const at = i * STEP;
            tl.fromTo(frame, { clipPath: fromTL ? HIDDEN : HIDDEN_BR }, {
              keyframes: [
                {
                  clipPath: fromTL
                    ? "polygon(0% 0%, 100% 0%, 0% 100%, 0% 100%)"
                    : "polygon(100% 0%, 100% 0%, 100% 100%, 0% 100%)",
                  duration: 0.38,
                  ease: "power2.in",
                },
                { clipPath: FULL, duration: 0.42, ease: "power3.out" },
              ],
            }, at)
              .fromTo(frame.querySelector("img"), { scale: 1.35 }, { scale: 1.08, duration: 1.3, ease: "cine" }, at)
              .fromTo(frame.querySelectorAll(".hr-label > *"), { yPercent: 110 }, { yPercent: 0, duration: 0.6, stagger: 0.05, ease: "cine" }, at + 0.2)
              .set(q(".hr-count"), { textContent: String(i + 1).padStart(2, "0") }, at + 0.2);
          });
        } else {
          gsap.set(frames, { clipPath: FULL });
        }

        // o retrato da Vanessa fecha a montagem e recua para o lado direito
        tl.fromTo(q(".hr-portrait"), { clipPath: HIDDEN }, { clipPath: FULL, duration: reduce ? 0.01 : 0.9 }, portraitAt)
          .fromTo(q(".hr-portrait img"), { scale: 1.3 }, { scale: 1, duration: reduce ? 0.01 : 2.2, ease: "cine" }, portraitAt)
          .set([...frames, ...q(".hr-reelui")], { autoAlpha: 0 }, portraitAt + (reduce ? 0.01 : 0.95))
          .to(q(".hr-portrait"), { clipPath: desktop ? PORTRAIT_DESKTOP : FULL, duration: reduce ? 0.01 : 1.3 }, settleAt)
          .to(q(".hr-pmove"), { left: desktop ? "30%" : "0%", duration: reduce ? 0.01 : 1.3 }, settleAt)
          .to(q(".hr-shade"), { autoAlpha: 1, duration: 1 }, settleAt)
          .set(q(".hr-copy"), { autoAlpha: 1 }, settleAt + 0.25)
          .from(split.lines, { yPercent: 140, duration: 1.3, stagger: 0.1, ease: "cine" }, settleAt + 0.25)
          .from(q(".hr-fade"), { autoAlpha: 0, y: 24, duration: 1.1, stagger: 0.1, ease: "cine" }, settleAt + 0.6)
          .fromTo(q(".hr-inset"), { clipPath: HIDDEN_BR }, { clipPath: FULL, duration: 1.1 }, settleAt + 0.8)
          .add(() => root.current?.setAttribute("data-intro", "done"));

        let alive = true;
        // ritmo geral da entrada: < 1 desacelera tudo mantendo as proporções
        if (!reduce) tl.timeScale(0.8);

        imagesReady.then(() => {
          if (alive) tl.play();
        });

        // saída no scroll: o retrato afunda e o texto sobe
        gsap.to(q(".hr-portrait img"), {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(q(".hr-copy"), {
          yPercent: -18,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });

        return () => {
          alive = false;
        };
      });

      return () => {
        mm.revert();
        split.revert();
      };
    },
    { scope: root, dependencies: [ready] },
  );

  // troca sutil de produções no recorte menor
  useGSAP(
    () => {
      if (!ready) return;
      const loop = gsap.delayedCall(5.5, function tick() {
        setInset((n) => (n + 1) % heroReel.length);
        loop.restart(true);
      });
      return () => loop.kill();
    },
    { dependencies: [ready] },
  );

  const current = heroReel[inset];

  return (
    <section ref={root} data-theme="dark" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-paper">
      {/* montagem */}
      {heroReel.map((p, i) => (
        <div key={p.slug} className="hr-frame absolute inset-0" style={{ clipPath: HIDDEN, zIndex: i + 1 }}>
          <FrameImage p={p} eager={i < 2} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/30" />
          <div className="hr-label absolute bottom-[12vh] left-5 overflow-hidden md:left-10">
            <p className="eyebrow mb-3 block text-paper/70">
              {categories[p.category].label} {p.year ? `· ${p.year}` : ""}
            </p>
            <p className="display block pb-[0.18em] text-[clamp(3rem,10vw,11rem)]">{p.title.split(":")[0]}</p>
          </div>
        </div>
      ))}

      <div className="hr-reelui pointer-events-none absolute right-5 top-28 z-20 flex items-baseline gap-2 text-paper md:right-10 md:top-32">
        <span className="hr-count display text-5xl tabular-nums">00</span>
        <span className="text-xs font-light text-paper/60">/ {String(heroReel.length).padStart(2, "0")}</span>
      </div>

      {/* retrato */}
      <div className="hr-portrait absolute inset-0 z-30" style={{ clipPath: HIDDEN }}>
        <div className="hr-pmove absolute inset-0">
          <Image
            src={portraits.hero}
            alt="Retrato de Vanessa Veiga"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[82%_50%] lg:object-[50%_30%] grayscale"
          />
        </div>
        <div className="hr-shade invisible absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10 lg:bg-gradient-to-r lg:from-ink/50 lg:via-transparent lg:to-transparent" />
      </div>

      {/* recorte com troca de produções */}
      <div
        className="hr-inset absolute bottom-14 right-10 z-40 hidden aspect-[3/4] w-[12vw] lg:block"
        style={{ clipPath: HIDDEN_BR }}
      >
        {heroReel.map((p, i) => (
          <Image
            key={p.slug}
            src={p.heroInsetImage ?? p.heroImage ?? p.image}
            alt=""
            fill
            sizes="12vw"
            className={`object-cover transition-[opacity,transform] duration-[1400ms] ease-[var(--ease-out-expo)] ${
              i === inset ? "scale-100 opacity-100" : "scale-110 opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-3">
          <p className="text-[0.6875rem] font-medium leading-tight">{current.title.split(":")[0]}</p>
          <p className="text-[0.625rem] font-light text-paper/70">
            {categories[current.category].label}
            {current.year ? ` · ${current.year}` : ""}
          </p>
        </div>
      </div>

      {/* texto */}
      <div className="hr-copy invisible absolute inset-x-0 bottom-0 z-40 px-5 pb-10 md:px-10 md:pb-14">
        <p className="hr-fade eyebrow mb-6 text-paper/70">Vanessa Veiga — Direção de Elenco</p>
        <h1 className="hr-title display max-w-[11ch] text-[clamp(3.25rem,8.6vw,10.5rem)]">
          Toda história começa com um <span className="serif-accent text-crimson">encontro.</span>
        </h1>
        <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:max-w-[30%]">
          <p className="hr-fade body-lg text-paper/80">
            Desde 1996, conectando talentos, personagens e histórias que ganham vida no cinema, na televisão, no
            streaming e no teatro.
          </p>
          <div className="hr-fade">
            <ArrowLink href="/projetos">Explorar projetos</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
