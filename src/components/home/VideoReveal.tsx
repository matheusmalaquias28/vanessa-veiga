"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const VIDEO_ID = "PzDDxW4KOZs";
// mudo é obrigatório para o autoplay; loop precisa da playlist com o próprio vídeo
const EMBED = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&rel=0&playsinline=1&modestbranding=1&iv_load_policy=3&disablekb=1&cc_load_policy=0&enablejsapi=1`;

/**
 * Demo reel da Vanessa: começa como uma janela pequena no centro e, com o
 * scroll fixado, abre até ocupar a tela inteira. O iframe só é criado quando
 * a seção se aproxima da tela.
 */
export function VideoReveal() {
  const root = useRef<HTMLDivElement>(null);
  const iframe = useRef<HTMLIFrameElement>(null);
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // lazyload: monta o player só perto da viewport
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add({ desktop: "(min-width: 1024px)", mobile: "(max-width: 1023.98px)" }, (ctx) => {
        const { desktop } = ctx.conditions as { desktop: boolean };
        const start = desktop ? "inset(24% 30% 24% 30%)" : "inset(34% 8% 34% 8%)";
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=120%",
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(q(".vr-frame"), { clipPath: start }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut" })
          .fromTo(q(".vr-media"), { scale: 1.25 }, { scale: 1, ease: "power2.inOut" }, 0)
          .fromTo(q(".vr-ui"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 0.75);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const toggleSound = () => {
    const next = !muted;
    iframe.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: next ? "mute" : "unMute", args: [] }),
      "*",
    );
    setMuted(next);
  };

  return (
    <div ref={root} data-theme="light" className="relative h-[100svh] overflow-hidden bg-paper">
      <div data-theme="dark" className="vr-frame absolute inset-0 bg-ink" style={{ clipPath: "inset(30% 25% 30% 25%)" }}>
        <div className="vr-media absolute inset-0">
          <Image
            src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
            alt="Vanessa Veiga, demo reel"
            fill
            sizes="100vw"
            className={`object-cover transition-opacity duration-1000 ${playing ? "opacity-0" : "opacity-100"}`}
          />
          {load && (
            // cobre a tela em 16:9 sem faixas pretas; pointer-events-none mantém o scroll suave
            <iframe
              ref={iframe}
              src={EMBED}
              title="Vanessa Veiga, demo reel"
              allow="autoplay; encrypted-media; picture-in-picture"
              onLoad={() => setTimeout(() => setPlaying(true), 900)}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[max(100svh,56.25vw)] w-[max(100vw,177.78svh)] -translate-x-1/2 -translate-y-1/2 border-0"
            />
          )}
        </div>

        <div className="vr-ui pointer-events-none invisible absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/70 to-transparent px-5 pb-6 pt-24 text-paper md:px-10 md:pb-10">
          <p className="eyebrow text-paper/80">Demo reel</p>
          <button
            type="button"
            onClick={toggleSound}
            className="pointer-events-auto cta-line"
            aria-label={muted ? "Ativar som do vídeo" : "Desativar som do vídeo"}
          >
            {muted ? "Ativar som" : "Desativar som"}
            <span className="relative flex h-3 items-end gap-[3px]" aria-hidden>
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`block w-[2px] bg-current ${muted ? "h-[2px]" : "animate-pulse"}`}
                  style={muted ? undefined : { height: `${[8, 12, 6, 10][i]}px`, animationDelay: `${i * 120}ms` }}
                />
              ))}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
