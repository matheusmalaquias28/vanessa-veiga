"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { categories, categoryOrder, contact, nav, portraits, projects } from "@/lib/content";
import { Logo, Tsuru } from "../brand";
import { intro } from "@/lib/intro";
import { getLenis } from "./SmoothScroll";
import type { LinkEventDetail } from "./PageTransition";

const menuImages = [
  portraits.hero,
  portraits.about,
  categories.teatro.image,
  projects.find((p) => p.slug === "segundo-sol")!.image,
  portraits.contact,
];

/** Cabeçalho fixo + menu em tela cheia */
export function Chrome() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [active, setActive] = useState(0);
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  // contraste do cabeçalho: lê o data-theme da seção que está por baixo dele
  useEffect(() => {
    let raf = 0;
    const probe = () => {
      raf = 0;
      const h = header.current;
      if (!h) return;
      const stack = document.elementsFromPoint(24, 40);
      const under = stack.find((n) => !h.contains(n) && !menu.current?.contains(n));
      const t = under?.closest<HTMLElement>("[data-theme]")?.dataset.theme;
      setTheme(t === "light" ? "light" : "dark");
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(probe);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const t = setTimeout(schedule, 900);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  useGSAP(
    () => {
      const q = gsap.utils.selector(menu);
      gsap.set(menu.current, { visibility: "hidden" });
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "fold" } })
        .set(menu.current, { visibility: "visible", immediateRender: false })
        // a folha abre em duas abas: primeiro o triângulo de cima, depois o resto
        .fromTo(
          q(".mn-bg"),
          { clipPath: "polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)" },
          {
            keyframes: [
              { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%)", duration: 0.55 },
              { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.5 },
            ],
          },
        )
        .fromTo(q(".mn-img"), { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1 }, 0.45)
        .fromTo(q(".mn-link"), { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.06, ease: "cine" }, 0.55)
        .fromTo(q(".mn-num"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, stagger: 0.06 }, 0.8)
        .fromTo(q(".mn-foot"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "cine" }, 0.8);
    },
    { scope: menu },
  );

  const mounted = useRef(false);
  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (open) {
      getLenis()?.stop();
      t.timeScale(1).play();
    } else {
      t.timeScale(1.6).reverse();
      if (intro.isReady()) getLenis()?.start();
    }
  }, [open]);

  // links do menu: mesma página fecha animando; outra página fecha por baixo do corte
  useEffect(() => {
    const onLink = (e: Event) => {
      const { samePage } = (e as CustomEvent<LinkEventDetail>).detail;
      if (samePage) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("vv:link", onLink);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("vv:link", onLink);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // troca de rota fecha o menu na hora (por baixo do corte da transição)
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    tl.current?.pause(0);
    gsap.set(menu.current, { visibility: "hidden" });
  }, [pathname]);

  const light = theme === "light" && !open;

  return (
    <>
      <header
        ref={header}
        className={`pointer-events-none fixed inset-x-0 top-0 z-[80] transition-colors duration-500 ${light ? "text-ink" : "text-paper"}`}
      >
        <div className="flex items-center px-5 py-5 md:px-10 md:py-7">
          <Link href="/" aria-label="Vanessa Veiga, início" className="pointer-events-auto">
            <Logo />
          </Link>
        </div>
      </header>

      {/* controles com blend difference: invertem sozinhos sobre fotos e fundos claros */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[81] text-paper mix-blend-difference">
        <div className="flex h-[72px] items-center justify-end gap-[clamp(2rem,8vw,9rem)] px-5 md:h-[92px] md:px-10">
          <nav className="pointer-events-auto hidden items-center gap-9 lg:flex" aria-label="Atalhos">
            {categoryOrder.map((c) => (
              <Link key={c} href={categories[c].href} className="group relative text-[0.8125rem] font-normal">
                {categories[c].label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu"
            className="group pointer-events-auto relative flex items-center gap-4 text-[0.8125rem] font-medium uppercase tracking-[0.18em]"
          >
            <span className="relative block h-4 overflow-hidden">
              <span className={`block transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? "-translate-y-full" : ""}`}>
                Menu
              </span>
              <span
                className={`absolute left-0 top-full block transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? "-translate-y-full" : ""}`}
              >
                Fechar
              </span>
            </span>
            <span className="relative block h-3 w-8">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? "translate-y-1.5 rotate-[30deg]" : "group-hover:scale-x-75"} origin-center`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? "-translate-y-1.5 -rotate-[30deg]" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div ref={menu} id="menu" className={`fixed inset-0 z-[70] text-paper ${open ? "" : "pointer-events-none"}`} aria-hidden={!open} data-lenis-prevent>
        <div className="mn-bg absolute inset-0 bg-ink" />
        <div className="relative grid h-full grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
          <div className="flex flex-col justify-between px-5 pb-8 pt-28 md:px-10 md:pt-36">
            <ul className="space-y-1">
              {nav.map((item, i) => {
                const current = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li key={item.href} className="overflow-hidden">
                    <Link
                      href={item.href}
                      tabIndex={open ? 0 : -1}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className="mn-link group flex items-baseline gap-5"
                    >
                      <span className="mn-num w-8 text-xs font-normal text-stone tabular-nums">0{i + 1}</span>
                      <span
                        className={`display text-[clamp(2.75rem,min(9vw,12.5vh),8rem)] transition-[color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-3 ${
                          current ? "text-crimson" : active === i ? "text-paper" : "text-paper/45"
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 grid gap-8 text-sm sm:grid-cols-2">
              <div className="mn-foot">
                <p className="eyebrow mb-3 text-stone">Áreas</p>
                <p className="flex flex-wrap gap-x-4 gap-y-1 font-light">
                  {categoryOrder.map((c) => (
                    <Link key={c} href={categories[c].href} tabIndex={open ? 0 : -1} className="hover:text-crimson">
                      {categories[c].label}
                    </Link>
                  ))}
                </p>
              </div>
              <div className="mn-foot">
                <p className="eyebrow mb-3 text-stone">Contato</p>
                <a href={`mailto:${contact.email}`} tabIndex={open ? 0 : -1} className="block font-light hover:text-crimson">
                  {contact.email}
                </a>
                <a href={contact.phoneHref} tabIndex={open ? 0 : -1} className="block font-light hover:text-crimson">
                  {contact.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="mn-img relative hidden overflow-hidden lg:block">
            {menuImages.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt=""
                fill
                sizes="45vw"
                className={`object-cover grayscale transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out-expo)] ${i === 0 ? "object-[68%_50%]" : ""} ${
                  active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/10 to-transparent" />
            <Tsuru className="absolute bottom-10 right-10 h-14 w-auto opacity-90" ink="var(--color-paper)" />
          </div>
        </div>
      </div>
    </>
  );
}
