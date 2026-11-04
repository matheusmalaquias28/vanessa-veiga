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

  const command = (func: string, args: unknown[] = []) =>
    iframe.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args, id: 1, channel: "widget" }),
      "*",
    );

  const hideCaptions = () => {
    command("unloadModule", ["captions"]);
    command("unloadModule", ["cc"]);
    command("setOption", ["captions", "track", {}]);
  };

  // O YouTube ignora cc_load_policy=0 quando o visitante tem legendas ligadas
  // na conta, e recarrega o módulo a cada volta do loop. Escuta os eventos do
  // player e descarrega as legendas sempre que elas reaparecem.
  useEffect(() => {
    if (!load) return;
    const onMessage = (e: MessageEvent) => {
      if (e.source !== iframe.current?.contentWindow || typeof e.data !== "string") return;
      try {
        const data = JSON.parse(e.data);
        const opts: string[] | undefined = data?.info?.options;
        if (opts?.some((o) => o === "captions" || o === "cc")) hideCaptions();
        if (data?.event === "onStateChange" || data?.event === "onReady") hideCaptions();
      } catch {}
    };
    window.addEventListener("message", onMessage);
    // handshake: pede ao player que envie seus eventos
    const id = window.setInterval(() => {
      iframe.current?.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: 1, channel: "widget" }), "*");
      hideCaptions();
    }, 1500);
    return () => {
      window.removeEventListener("message", onMessage);
      window.clearInterval(id);
    };
  }, [load]);

  const toggleSound = () => {
    const next = !muted;
    command(next ? "mute" : "unMute");
    hideCaptions();
    setMuted(next);
  };

  return (
    <div ref={root} data-theme="light" className="relative h-[100svh] overflow-hidden bg-canvas">
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
              onLoad={() => {
                hideCaptions();
                setTimeout(() => setPlaying(true), 900);
              }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[max(100svh,56.25vw)] w-[max(100vw,177.78svh)] -translate-x-1/2 -translate-y-1/2 border-0"
            />
          )}
        </div>

        <div className="vr-ui pointer-events-none invisible absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/70 to-transparent px-5 pb-6 pt-24 text-paper md:px-10 md:pb-10">
          <p className="eyebrow text-paper/80">Demo reel</p>
          <button
            type="button"
            onClick={toggleSound}
            className={`pointer-events-auto group relative isolate flex items-center gap-3 rounded-full px-6 py-3.5 text-xs font-medium uppercase tracking-[0.18em] shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-[background-color,color,transform] duration-300 hover:scale-[1.04] md:px-7 md:py-4 md:text-sm ${
              muted ? "bg-crimson text-paper hover:bg-paper hover:text-ink" : "bg-paper text-ink hover:bg-crimson hover:text-paper"
            }`}
            aria-label={muted ? "Ativar som do vídeo" : "Desativar som do vídeo"}
          >
            <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" />
              {muted ? (
                <path d="m16 9 5 6m0-6-5 6" />
              ) : (
                <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
              )}
            </svg>
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
