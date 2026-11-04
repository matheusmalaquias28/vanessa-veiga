import Image from "next/image";
import Link from "next/link";
import { byCategory, categories, categoryOrder, getProject, type Category, type Project } from "@/lib/content";
import { ArrowLink } from "../ui/ArrowLink";
import { FadeUp, RevealImage, SplitReveal } from "../ui/motion";
import { ProjectCard } from "./ProjectCard";

export type AreaConfig = {
  category: Category;
  headline: React.ReactNode;
  text: string;
  subtext?: string;
  /** Imagem de capa da abertura; sem ela, usa a do primeiro destaque */
  cover?: string;
  /** slugs em destaque, na ordem */
  featured: string[];
  /** destaque horizontal largo (Beleza Fatal no streaming, Clube da Esquina no teatro) */
  wide?: string;
  closing?: { title: string; cta: string; href: string };
  dark?: boolean;
};

function Meta({ p }: { p: Project }) {
  const rows = [
    ["Ano", p.year],
    ["Formato", p.format],
    ["Produção", p.production],
    ["Plataforma", p.platform],
    ["Direção", p.direction],
  ].filter(([, v]) => v) as [string, string][];
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt className="eyebrow mb-1 text-[0.5625rem] opacity-50">{k}</dt>
          <dd className="font-light">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function AreaPage({ config }: { config: AreaConfig }) {
  const cat = categories[config.category];
  const all = byCategory(config.category);
  const featured = config.featured.map((s) => getProject(s)!).filter(Boolean);
  const wide = config.wide ? getProject(config.wide) : undefined;
  const lead = wide ?? featured[0];
  const rest = all.filter((p) => !config.featured.includes(p.slug) && p.slug !== config.wide);
  const next = categories[categoryOrder[(categoryOrder.indexOf(config.category) + 1) % categoryOrder.length]];
  const dark = config.dark;

  const groups =
    config.category === "tv"
      ? [
          { title: "Dramaturgia", items: rest.filter((p) => p.tvGroup === "dramaturgia") },
          { title: "Programas & Especiais", items: rest.filter((p) => p.tvGroup === "programas") },
        ]
      : [{ title: "Demais produções", items: rest }];

  return (
    <div className={dark ? "bg-ink text-paper" : "bg-canvas text-ink"}>
      {/* abertura */}
      <section data-theme="dark" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-paper">
        <RevealImage src={config.cover ?? lead.image} alt="" priority immediate parallax={14} className="!absolute inset-0" imgClassName="opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
        <div className="relative grid gap-10 px-5 pb-12 pt-40 md:px-10 md:pb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <FadeUp immediate>
              <p className="eyebrow mb-6 text-paper/70">
                <Link href="/projetos" className="hover:text-crimson">
                  Projetos
                </Link>{" "}
                / {cat.label} · {all.length} produções
              </p>
            </FadeUp>
            <SplitReveal as="h1" immediate className="display max-w-[14ch] text-[clamp(3rem,8vw,9.5rem)]">
              {config.headline}
            </SplitReveal>
          </div>
          <FadeUp immediate delay={0.2} className="lg:col-span-4">
            <p className="body-lg text-paper/80">{config.text}</p>
            {config.subtext && <p className="mt-4 text-sm font-light text-paper/55">{config.subtext}</p>}
          </FadeUp>
        </div>
      </section>

      {/* destaque horizontal */}
      {wide && (
        <section data-theme={dark ? "dark" : "light"} className="px-5 pt-24 md:px-10 md:pt-36">
          <Link href={`/projetos/${wide.slug}`} className="group block">
            <RevealImage src={wide.image} alt={wide.title} className="aspect-[4/5] md:aspect-[21/9]" from="left" />
            <div className="mt-8 grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="eyebrow mb-4 opacity-60">Em destaque</p>
                <h2 className="display text-[clamp(2.5rem,5.5vw,6rem)] transition-colors group-hover:text-crimson">{wide.title}</h2>
              </div>
              <div className="space-y-8 lg:col-span-5">
                {wide.description && <p className="body-lg opacity-75">{wide.description}</p>}
                <Meta p={wide} />
                <span className="cta-line">
                  Ver projeto <span className="cta-rule" aria-hidden />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* destaques alternados */}
      <section data-theme={dark ? "dark" : "light"} className="space-y-24 px-5 py-24 md:space-y-40 md:px-10 md:py-36">
        {featured
          .filter((p) => p.slug !== config.wide)
          .map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={p.slug} className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
                <Link
                  href={`/projetos/${p.slug}`}
                  className={`group block lg:col-span-7 ${flip ? "lg:order-2 lg:col-start-6" : ""}`}
                  aria-label={p.title}
                >
                  <RevealImage
                    src={p.image}
                    alt={p.title}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    from={flip ? "right" : "left"}
                    className="aspect-[4/5] md:aspect-[16/11]"
                    imgClassName="transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  />
                </Link>
                <FadeUp className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                  <p className="eyebrow mb-5 opacity-50">0{i + 1}</p>
                  <h2 className="display text-[clamp(2.25rem,4.4vw,4.75rem)]">{p.title}</h2>
                  {p.description && <p className="body-lg mt-6 max-w-[40ch] opacity-75">{p.description}</p>}
                  <div className="mt-8">
                    <Meta p={p} />
                  </div>
                  <div className="mt-10">
                    <ArrowLink href={`/projetos/${p.slug}`}>Ver projeto</ArrowLink>
                  </div>
                </FadeUp>
              </article>
            );
          })}
      </section>

      {/* galeria */}
      {groups.map(
        (g) =>
          g.items.length > 0 && (
            <section key={g.title} data-theme={dark ? "dark" : "light"} className="px-5 pb-24 md:px-10 md:pb-36">
              <div className={`mb-10 flex items-end justify-between border-t pt-6 md:mb-14 ${dark ? "border-paper/15" : "border-ink/15"}`}>
                <h2 className="display text-[clamp(1.75rem,3vw,3rem)]">{g.title}</h2>
                <p className="text-xs font-light opacity-50">{g.items.length} produções</p>
              </div>
              <div className="grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
                {g.items.map((p, i) => (
                  <FadeUp key={p.slug} delay={(i % 4) * 0.06}>
                    <ProjectCard project={p} showCategory={false} aspect={i % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/5]"} />
                  </FadeUp>
                ))}
              </div>
            </section>
          ),
      )}

      {/* fechamento */}
      {config.closing && (
        <section data-theme={dark ? "dark" : "light"} className="px-5 pb-24 md:px-10 md:pb-36">
          <div className={`grid gap-10 border-t pt-16 lg:grid-cols-12 ${dark ? "border-paper/15" : "border-ink/15"}`}>
            <SplitReveal className="display text-[clamp(2.25rem,5vw,5.5rem)] lg:col-span-8">{config.closing.title}</SplitReveal>
            <div className="flex items-end lg:col-span-4 lg:justify-end">
              <ArrowLink href={config.closing.href}>{config.closing.cta}</ArrowLink>
            </div>
          </div>
        </section>
      )}

      {/* próxima área */}
      <Link href={next.href} data-theme="dark" className="group relative block h-[70svh] overflow-hidden bg-ink text-paper">
        <Image
          src={next.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-50 transition-[transform,opacity] duration-[1600ms] ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:opacity-70"
        />
        <div className="absolute inset-0 flex flex-col justify-end px-5 pb-12 md:px-10 md:pb-16">
          <p className="eyebrow mb-4 text-paper/70">Próxima área</p>
          <p className="display flex items-end gap-6 text-[clamp(3.5rem,12vw,13rem)] leading-[0.8]">
            {next.label}
            <span className="mb-[2vw] hidden h-px w-24 bg-paper transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover:w-48 md:block" />
          </p>
        </div>
      </Link>
    </div>
  );
}
