import type { Metadata } from "next";
import Image from "next/image";
import { Tsuru } from "@/components/brand";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { FadeUp, SplitReveal } from "@/components/ui/motion";
import { books, type Book } from "@/lib/content";

export const metadata: Metadata = { title: { absolute: "Livros e Publicações — Vanessa Veiga" } };

/** Capa: a oficial quando houver; senão, um volume tipográfico provisório. */
function Cover({ book }: { book: Book }) {
  if (book.cover) {
    return (
      <div className="relative aspect-[3/4] w-[62%] shadow-[22px_28px_48px_-14px_rgba(20,20,20,0.5)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 group-hover:rotate-[-1.5deg]">
        <Image src={book.cover} alt={`Capa de ${book.title}`} fill sizes="(min-width: 640px) 30vw, 62vw" className="object-cover" />
      </div>
    );
  }
  const [, subtitle] = book.title.match(/^111 (.*?)( \(|$)/) ?? [];
  return (
    <div
      className="relative aspect-[2/3] w-[56%] text-paper shadow-[22px_28px_48px_-14px_rgba(20,20,20,0.5)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 group-hover:rotate-[-1.5deg]"
      style={{ background: book.tone }}
    >
      <span className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/45 to-transparent" />
      <div className="flex h-full flex-col justify-between p-[9%]">
        <Tsuru className="h-[9%] w-auto self-start" ink="var(--color-paper)" />
        <div>
          <p className="display text-[clamp(3rem,7vw,6.5rem)] leading-[0.8]">111</p>
          <p className="mt-3 text-[clamp(0.75rem,1.1vw,1rem)] font-semibold leading-tight">{subtitle}</p>
          <p className="mt-4 text-[0.625rem] font-light uppercase tracking-[0.2em] text-paper/60">Vanessa Veiga</p>
        </div>
      </div>
    </div>
  );
}

export default function LivrosPage() {
  return (
    <section data-theme="light" className="bg-paper px-5 pb-32 pt-40 text-ink md:px-10 md:pb-44 md:pt-52">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <SplitReveal as="h1" immediate className="display max-w-[13ch] text-[clamp(3rem,8vw,9.5rem)] lg:col-span-8">
          Histórias também vivem nas <span className="serif-accent text-crimson">páginas.</span>
        </SplitReveal>
        <FadeUp immediate delay={0.2} className="lg:col-span-4">
          <p className="body-lg text-ink/70">
            Um espaço dedicado aos livros e às publicações que fazem parte da trajetória de Vanessa Veiga.
          </p>
        </FadeUp>
      </div>

      <div className="mt-24 grid gap-x-8 gap-y-24 sm:grid-cols-2 lg:mt-36 lg:gap-x-12">
        {books.map((b, i) => {
          const meta = [b.year, b.role].filter(Boolean).join(" · ");
          const card = (
            <article className="group">
              <div className="grid aspect-[4/5] place-items-center bg-paper-deep">
                <Cover book={b} />
              </div>
              {meta && <p className="eyebrow mt-8 text-stone-deep">{meta}</p>}
              <h2 className={`${meta ? "mt-2" : "mt-8"} max-w-[24ch] text-[clamp(1.5rem,2.4vw,2.25rem)] font-semibold leading-[1.1] tracking-tight`}>
                {b.title}
              </h2>
              <p className="mt-5 max-w-[52ch] font-extralight leading-relaxed text-ink/70 md:text-lg">{b.description}</p>
              {b.link && (
                <span className="cta-line mt-8">
                  Conhecer a obra <span className="cta-rule" aria-hidden />
                </span>
              )}
            </article>
          );
          return (
            <FadeUp key={b.title} delay={i * 0.12} className={i % 2 === 1 ? "sm:mt-28" : ""}>
              {b.link ? (
                <a href={b.link} target="_blank" rel="noreferrer" className="block">
                  {card}
                </a>
              ) : (
                card
              )}
            </FadeUp>
          );
        })}
      </div>

      <div className="mt-28 flex flex-col items-start justify-between gap-8 border-t border-ink/15 pt-10 md:flex-row md:items-center">
        <p className="max-w-[48ch] font-extralight text-ink/70">Para saber mais sobre os livros, entre em contato.</p>
        <ArrowLink href="/contato">Falar com Vanessa</ArrowLink>
      </div>
    </section>
  );
}
