"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { Tsuru } from "../brand";
import { getLenis } from "./SmoothScroll";

export type LinkEventDetail = { samePage: boolean };

/**
 * Corte geométrico entre páginas: dois triângulos se encontram na diagonal,
 * a rota troca por baixo e eles se separam de novo. Intercepta qualquer <a>
 * interno, então os <Link> do site não precisam de wrapper.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const covering = useRef(false);

  useEffect(() => {
    const el = root.current!;
    const q = gsap.utils.selector(el);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.dataset.noTransition !== undefined) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;

      const samePage = url.pathname === location.pathname;
      window.dispatchEvent(new CustomEvent<LinkEventDetail>("vv:link", { detail: { samePage } }));

      if (samePage) {
        if (url.hash) return;
        e.preventDefault();
        getLenis()?.scrollTo(0, { duration: 1.4 });
        return;
      }

      e.preventDefault();
      if (covering.current) return;
      covering.current = true;
      getLenis()?.stop();

      gsap
        .timeline({ defaults: { ease: "fold" } })
        .set(el, { visibility: "visible" })
        .fromTo(q(".pt-a"), { xPercent: -100, yPercent: -100 }, { xPercent: 0, yPercent: 0, duration: 0.6 }, 0)
        .fromTo(q(".pt-b"), { xPercent: 100, yPercent: 100 }, { xPercent: 0, yPercent: 0, duration: 0.6 }, 0)
        .fromTo(q(".pt-mark"), { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "cine" }, 0.35)
        .add(() => router.push(url.pathname + url.search + url.hash));
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
    if (!covering.current) return;
    const el = root.current!;
    const q = gsap.utils.selector(el);
    const id = requestAnimationFrame(() => {
      gsap
        .timeline({
          defaults: { ease: "fold" },
          onComplete: () => {
            covering.current = false;
            gsap.set(el, { visibility: "hidden" });
          },
        })
        .to(q(".pt-mark"), { autoAlpha: 0, scale: 1.1, duration: 0.3, ease: "power2.in" }, 0.05)
        .to(q(".pt-a"), { xPercent: -100, yPercent: -100, duration: 0.75 }, 0.15)
        .to(q(".pt-b"), { xPercent: 100, yPercent: 100, duration: 0.75 }, 0.15)
        .add(() => getLenis()?.start(), 0.3);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <div ref={root} className="pointer-events-none invisible fixed inset-0 z-[90]" aria-hidden>
      <div className="pt-a absolute -inset-px bg-ink [clip-path:polygon(0_0,100%_0,0_100%)]" />
      <div className="pt-b absolute -inset-px bg-ink [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
      <div className="pt-mark absolute inset-0 grid place-items-center">
        <Tsuru className="h-16 w-auto" ink="var(--color-paper)" />
      </div>
    </div>
  );
}
