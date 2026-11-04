import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { FadeUp, RevealImage, SplitReveal } from "@/components/ui/motion";
import { byCategory, categories, getProject, projects } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/projetos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title} · ${categories[p.category].label}`,
    description: p.description ?? `${p.title}, trabalho de direção de elenco de Vanessa Veiga.`,
  };
}

export default async function ProjectPage({ params }: PageProps<"/projetos/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const cat = categories[p.category];
  const siblings = byCategory(p.category);
  const idx = siblings.findIndex((s) => s.slug === p.slug);
  const next = siblings[(idx + 1) % siblings.length];
  const related = siblings.filter((s) => s.slug !== p.slug && s.slug !== next.slug).slice(0, 3);

  const sheet = [
    ["Categoria", [cat.label, p.format].filter(Boolean).join(" / ")],
    ["Ano", p.year],
    ["Produção", p.production],
    ["Plataforma", p.platform],
    ["Direção", p.direction],
    ["Elenco", p.cast],
    ["Função", "Direção de elenco"],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <>
      <section data-theme="dark" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-paper">
        <RevealImage src={p.image} alt={p.title} priority immediate parallax={16} className="!absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/30" />
        <div className="relative px-5 pb-12 pt-40 md:px-10 md:pb-16">
          <FadeUp immediate>
            <p className="eyebrow mb-6 text-paper/70">
              <Link href={cat.href} className="hover:text-crimson">
                {cat.label}
              </Link>
              {p.format ? ` / ${p.format}` : ""}
              {p.status === "em-desenvolvimento" ? " · Em desenvolvimento" : ""}
            </p>
          </FadeUp>
          <SplitReveal as="h1" immediate className="display max-w-[16ch] text-[clamp(3rem,9vw,10.5rem)]">
            {p.title}
          </SplitReveal>
        </div>
      </section>

      <section data-theme="light" className="bg-canvas px-5 py-24 text-ink md:px-10 md:py-36">
        <div className="grid gap-16 lg:grid-cols-12">
          <FadeUp className="lg:col-span-5">
            <p className="eyebrow mb-8 text-stone-deep">Ficha técnica</p>
            <dl className="divide-y divide-ink/10 border-y border-ink/10">
              {sheet.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[8rem_1fr] gap-4 py-4 text-sm">
                  <dt className="font-medium">{k}</dt>
                  <dd className="font-light text-ink/75">{v}</dd>
                </div>
              ))}
            </dl>
            {p.trailer && (
              <div className="mt-10">
                <ArrowLink href={p.trailer}>Ver trailer</ArrowLink>
              </div>
            )}
          </FadeUp>
          <div className="lg:col-span-6 lg:col-start-7">
            <SplitReveal className="display text-[clamp(2rem,3.6vw,3.75rem)]">
              {p.description ?? cat.tagline}
            </SplitReveal>
            <FadeUp className="mt-10">
              <p className="body-lg text-ink/65">
                Informações complementares, galeria, trailer e imprensa serão publicados assim que o material oficial for
                disponibilizado.
              </p>
            </FadeUp>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-32">
            <div className="mb-10 flex items-end justify-between border-t border-ink/15 pt-6">
              <h2 className="display text-[clamp(1.75rem,3vw,3rem)]">Mais em {cat.label.toLowerCase()}</h2>
              <ArrowLink href={cat.href}>Ver todos</ArrowLink>
            </div>
            <div className="grid gap-x-5 gap-y-12 sm:grid-cols-3">
              {related.map((r) => (
                <ProjectCard key={r.slug} project={r} showCategory={false} aspect="aspect-[4/5]" />
              ))}
            </div>
          </div>
        )}
      </section>

      <Link href={`/projetos/${next.slug}`} data-theme="dark" className="group relative block h-[60svh] overflow-hidden bg-ink text-paper">
        <RevealImage src={next.image} alt="" parallax={0} className="!absolute inset-0" imgClassName="opacity-50 transition-opacity duration-700 group-hover:opacity-70" />
        <div className="absolute inset-0 flex flex-col justify-end px-5 pb-12 md:px-10 md:pb-16">
          <p className="eyebrow mb-4 text-paper/70">Próximo projeto</p>
          <p className="display max-w-[18ch] text-[clamp(2.5rem,7vw,7.5rem)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-4">
            {next.title}
          </p>
        </div>
      </Link>
    </>
  );
}
