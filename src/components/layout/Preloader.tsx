"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { intro } from "@/lib/intro";
import { TSURU_VIEWBOX, fullNamePaths, FULL_NAME_VIEWBOX, tsuruPaths } from "../brand-paths";

/*
 * Origami: uma folha quadrada (em pé, como um losango) é dobrada duas vezes
 * ao meio, vira a "base do pássaro" e se abre no tsuru da logo.
 * A folha é dividida em 8 triângulos a partir do centro; cada dobra é um
 * espelhamento real (scale -1 sobre o vinco), e no fim cada triângulo
 * faz morph para uma das peças do tsuru.
 */

type Pt = [number, number];
const C: Pt = [1021, 666];
const R = 290;

const ring = (r: number, rx = r): Pt[] => [
  [C[0], C[1] - r],
  [C[0] + rx / 2, C[1] - r / 2],
  [C[0] + rx, C[1]],
  [C[0] + rx / 2, C[1] + r / 2],
  [C[0], C[1] + r],
  [C[0] - rx / 2, C[1] + r / 2],
  [C[0] - rx, C[1]],
  [C[0] - rx / 2, C[1] - r / 2],
];

const tri = (pts: Pt[], i: number): Pt[] => [C, pts[i], pts[(i + 1) % 8]];
const toD = (pts: Pt[]) => `M${pts.map((p) => p.join(" ")).join(" L")} Z`;

const sheet = ring(R);
const kite = ring(255, 78);
const pieces = Array.from({ length: 8 }, (_, i) => tri(sheet, i));

// peças na metade de cima (dobra 1) e na metade esquerda (dobra 2)
const TOP = new Set([0, 1, 6, 7]);
const LEFT = new Set([4, 5, 6, 7]);
// ordem de pintura: quem dobra por cima vem depois
const ORDER = [2, 3, 0, 1, 4, 5, 6, 7];
// peça do tsuru que cada triângulo vira
const TARGET = [0, 0, 1, 2, 3, 4, 5, 6];

const mirrorY = (p: Pt): Pt => [p[0], 2 * C[1] - p[1]];
const mirrorX = (p: Pt): Pt => [2 * C[0] - p[0], p[1]];
const folded = pieces.map((pts, i) =>
  pts.map((p) => {
    let q = TOP.has(i) ? mirrorY(p) : p;
    if (LEFT.has(i)) q = mirrorX(q);
    return q;
  }),
);

const FRONT = "#f3f0e9";
const BACK = "#d9d1c3";
const SHADE = "#a39a8a";

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const seen = (() => {
        try {
          return localStorage.getItem("vv-intro") === "1";
        } catch {
          return false;
        }
      })();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (seen) {
        el.style.display = "none";
        intro.done();
        return;
      }

      document.documentElement.classList.add("is-loading");
      const q = gsap.utils.selector(el);
      const finish = () => {
        try {
          localStorage.setItem("vv-intro", "1");
        } catch {}
        document.documentElement.classList.remove("is-loading");
        el.style.display = "none";
      };

      const paths = q<SVGPathElement>(".piece");
      const foldY = q(".fold-y");
      const foldX = q(".fold-x");

      if (reduce) {
        gsap.to(el, { autoAlpha: 0, duration: 0.6, delay: 0.4, onStart: () => intro.done(), onComplete: finish });
        return;
      }

      gsap.set(".pl-sheet", { transformOrigin: "50% 50%" });
      const tl = gsap.timeline({ defaults: { ease: "fold" } });

      // a folha cai sobre a mesa
      tl.fromTo(q(".pl-sheet"), { scale: 0.6, rotate: -18, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 1.1, ease: "cine" })
        .fromTo(q(".pl-caption"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "cine" }, 0.3)

        // vinco horizontal e primeira dobra (de cima para baixo)
        .fromTo(q(".crease-h"), { strokeDashoffset: 600 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut" }, "-=0.2")
        .to(
          foldY.filter((g) => TOP.has(Number(g.getAttribute("data-i")))),
          { scaleY: -1, svgOrigin: `${C[0]} ${C[1]}`, duration: 0.85 },
          ">-0.05",
        )
        .to(
          paths.filter((p) => TOP.has(Number(p.dataset.i))),
          { keyframes: [{ fill: SHADE, duration: 0.42, ease: "power2.in" }, { fill: BACK, duration: 0.43, ease: "power2.out" }] },
          "<",
        )
        .to(q(".crease-h"), { autoAlpha: 0, duration: 0.2 }, "<0.4")

        // vinco vertical e segunda dobra (da esquerda para a direita)
        .fromTo(q(".crease-v"), { strokeDashoffset: 600 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.inOut" }, "+=0.05")
        .to(
          foldX.filter((g) => LEFT.has(Number(g.getAttribute("data-i")))),
          { scaleX: -1, svgOrigin: `${C[0]} ${C[1]}`, duration: 0.8 },
          ">-0.05",
        )
        .to(
          paths.filter((p) => LEFT.has(Number(p.dataset.i))),
          { keyframes: [{ fill: SHADE, duration: 0.4, ease: "power2.in" }, { fill: FRONT, duration: 0.4, ease: "power2.out" }] },
          "<",
        )
        .to(q(".crease-v"), { autoAlpha: 0, duration: 0.2 }, "<0.4")

        // achata as transformações nas coordenadas reais e vira a base do pássaro
        .add(() => {
          gsap.set([...foldY, ...foldX], { clearProps: "transform" });
          foldY.forEach((g) => g.removeAttribute("transform"));
          foldX.forEach((g) => g.removeAttribute("transform"));
          paths.forEach((p) => p.setAttribute("d", toD(folded[Number(p.dataset.i)])));
        })
        .addLabel("kite");
      paths.forEach((p, n) => {
        const i = Number(p.dataset.i);
        tl.to(p, { morphSVG: toD(tri(kite, i)), fill: i % 2 ? BACK : FRONT, duration: 0.9 }, `kite+=${n * 0.03}`);
      });

      // o pássaro se abre
      tl.addLabel("bird", "+=0.05");
      paths.forEach((p, n) => {
        const target = tsuruPaths[TARGET[Number(p.dataset.i)]];
        tl.to(
          p,
          { morphSVG: target.d, fill: target.tone === "accent" ? "#e6003d" : FRONT, duration: 1.15, ease: "expo.inOut" },
          `bird+=${(paths.length - 1 - n) * 0.05}`,
        );
      });

      tl.to(q(".pl-sheet"), { scale: 0.86, y: -40, duration: 1.2, ease: "expo.inOut" }, "bird")
        .fromTo(q(".pl-letter"), { yPercent: 120, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.7, stagger: 0.035, ease: "cine" }, "-=0.45")
        .to(q(".pl-caption"), { autoAlpha: 0, duration: 0.3 }, "<")
        .fromTo(q(".pl-role"), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "cine" }, "-=0.3")

        // saída: a tela é cortada na diagonal e as duas metades se afastam
        .to(q(".pl-stage"), { autoAlpha: 0, scale: 0.96, duration: 0.5, ease: "power2.in" }, "+=0.55")
        .add(() => intro.done(), "-=0.1")
        .to(q(".pl-half-a"), { xPercent: -100, yPercent: -100, duration: 1.1 }, "<")
        .to(q(".pl-half-b"), { xPercent: 100, yPercent: 100, duration: 1.1 }, "<")
        .add(finish);

      const skip = () => {
        if (tl.progress() < 0.9) tl.progress(0.88);
      };
      el.addEventListener("click", skip);
      return () => el.removeEventListener("click", skip);
    },
    { scope: root },
  );

  return (
    <div ref={root} className="preloader fixed inset-0 z-[100] cursor-pointer select-none" aria-hidden>
      <div className="pl-half-a absolute inset-0 bg-ink [clip-path:polygon(0_0,100%_0,0_100%)] [margin:-1px]" />
      <div className="pl-half-b absolute inset-0 bg-ink [clip-path:polygon(100%_0,100%_100%,0_100%)] [margin:-1px]" />

      <div className="pl-stage absolute inset-0 flex flex-col items-center justify-center">
        <svg viewBox={TSURU_VIEWBOX} className="pl-sheet invisible h-[46vmin] w-auto overflow-visible">
          <defs>
            <filter id="pl-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="14" stdDeviation="18" floodColor="#000" floodOpacity="0.45" />
            </filter>
          </defs>
          <g filter="url(#pl-shadow)">
            {ORDER.map((i) => (
              <g key={i} className="fold-x" data-i={i}>
                <g className="fold-y" data-i={i}>
                  <path
                    className="piece"
                    data-i={i}
                    d={toD(pieces[i])}
                    fill={FRONT}
                    stroke="rgba(20,20,20,0.12)"
                    strokeWidth={1.2}
                    strokeLinejoin="round"
                  />
                </g>
              </g>
            ))}
          </g>
          <line
            className="crease-h"
            x1={C[0] - R - 30}
            x2={C[0] + R + 30}
            y1={C[1]}
            y2={C[1]}
            stroke="#e6003d"
            strokeWidth={2}
            strokeDasharray="600"
            strokeDashoffset="600"
          />
          <line
            className="crease-v"
            x1={C[0]}
            x2={C[0]}
            y1={C[1] - 30}
            y2={C[1] + R + 30}
            stroke="#e6003d"
            strokeWidth={2}
            strokeDasharray="600"
            strokeDashoffset="600"
          />
        </svg>

        <div className="mt-2 flex h-[3.2vmin] min-h-4 items-center overflow-hidden text-paper">
          <svg viewBox={FULL_NAME_VIEWBOX} className="h-full w-auto overflow-visible">
            {fullNamePaths.map((d, i) => (
              <path key={i} className="pl-letter invisible" d={d} fill="currentColor" />
            ))}
          </svg>
        </div>
        <p className="pl-role eyebrow invisible mt-5 text-stone">Direção de Elenco · desde 1996</p>
      </div>

      <p className="pl-caption eyebrow invisible absolute bottom-8 left-1/2 -translate-x-1/2 text-stone/70">
        Toda história começa com uma dobra
      </p>
    </div>
  );
}
