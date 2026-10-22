import Image from "next/image";
import Link from "next/link";
import { categories, type Project } from "@/lib/content";

export function ProjectCard({
  project: p,
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  showCategory = true,
  className = "",
  poster = false,
}: {
  project: Project;
  aspect?: string;
  sizes?: string;
  showCategory?: boolean;
  className?: string;
  /** Usa o pôster oficial (3:4) quando a produção tiver um */
  poster?: boolean;
}) {
  const usePoster = poster && !!p.heroPoster;
  const meta = [showCategory ? categories[p.category].label : p.format, p.year].filter(Boolean).join(" · ");
  return (
    <Link href={`/projetos/${p.slug}`} className={`group block ${className}`}>
      <div className={`relative overflow-hidden bg-ink-soft ${usePoster ? "aspect-[3/4]" : aspect}`}>
        <Image
          src={usePoster ? p.heroPoster! : p.image}
          alt={p.title}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
        />
        <span className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/20" />
        {/* canto dobrado que aparece no hover */}
        <span className="absolute bottom-0 right-0 grid size-14 translate-x-full translate-y-full place-items-center bg-paper text-ink transition-transform duration-500 ease-[var(--ease-out-expo)] [clip-path:polygon(100%_0,100%_100%,0_100%)] group-hover:translate-x-0 group-hover:translate-y-0">
          <svg viewBox="0 0 16 16" className="ml-5 mt-5 size-3.5" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M3 13 13 3M6 3h7v7" />
          </svg>
        </span>
        {p.status === "em-desenvolvimento" && (
          <span className="eyebrow absolute left-3 top-3 bg-paper/90 px-2 py-1 text-[0.5625rem] text-ink">Em desenvolvimento</span>
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold leading-tight tracking-tight md:text-xl">{p.title}</h3>
        {meta && <p className="shrink-0 text-xs font-light opacity-60">{meta}</p>}
      </div>
    </Link>
  );
}
