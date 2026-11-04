"use client";

import { useRef, useState } from "react";
import { Flip, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { categories, categoryOrder, projects, type Category } from "@/lib/content";
import { ProjectCard } from "./ProjectCard";

type Filter = "todos" | Category;

const filters: { id: Filter; label: string }[] = [
  { id: "todos", label: "Todos" },
  ...categoryOrder.map((c) => ({ id: c as Filter, label: c === "tv" ? "TV" : categories[c].label })),
];

// destaques primeiro, depois a ordem do acervo
const ordered = [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

export function ProjectIndex() {
  const [filter, setFilter] = useState<Filter>("todos");
  const grid = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState>(null);

  const change = (f: Filter) => {
    if (f === filter) return;
    flipState.current = Flip.getState(grid.current!.querySelectorAll(".pi-item"));
    setFilter(f);
  };

  useGSAP(
    () => {
      const state = flipState.current;
      if (!state) {
        gsap.from(".pi-item", { y: 60, autoAlpha: 0, duration: 1.1, stagger: 0.04, ease: "cine", delay: 0.4 });
        return;
      }
      flipState.current = null;
      Flip.from(state, {
        duration: 0.8,
        ease: "fold",
        stagger: 0.02,
        absolute: true,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.7, ease: "cine", delay: 0.2 }),
        onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.92, duration: 0.4 }),
        onComplete: () => ScrollTrigger.refresh(),
      });
    },
    { scope: grid, dependencies: [filter] },
  );

  const visible = (c: Category) => filter === "todos" || filter === c;
  const count = filter === "todos" ? projects.length : projects.filter((p) => p.category === filter).length;

  return (
    <div>
      <div className="sticky top-0 z-20 -mx-5 mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 bg-canvas/90 px-5 pb-4 pt-24 backdrop-blur-md md:-mx-10 md:px-10 md:pt-28">
        <div role="tablist" aria-label="Filtrar por área" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => change(f.id)}
              className={`rounded-full border px-5 py-2 text-[0.8125rem] transition-colors duration-300 ${
                filter === f.id ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="text-xs font-light text-ink/60 tabular-nums">{count} produções</p>
      </div>

      <div ref={grid} className="grid grid-cols-1 gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {ordered.map((p, i) =>
          visible(p.category) ? (
            <div key={p.slug} data-flip-id={p.slug} className={`pi-item ${i % 3 === 1 ? "lg:mt-24" : ""}`}>
              <ProjectCard project={p} poster aspect={p.featured ? "aspect-[4/5]" : "aspect-[1/1]"} />
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}
