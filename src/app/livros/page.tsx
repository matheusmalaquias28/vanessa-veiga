import type { Metadata } from "next";
import Link from "next/link";
import { BookCover } from "@/components/books/BookCover";
import { Stars } from "@/components/books/Stars";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { FadeUp, SplitReveal } from "@/components/ui/motion";
import { bookRating, books } from "@/lib/content";

export const metadata: Metadata = { title: { absolute: "Livros e Publicações — Vanessa Veiga" } };

export default function LivrosPage() {
  return (
    <section data-theme="light" className="bg-canvas px-5 pb-32 pt-40 text-ink md:px-10 md:pb-44 md:pt-52">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <SplitReveal as="h1" immediate className="display max-w-[13ch] text-[clamp(3rem,8vw,9.5rem)] lg:col-span-8">
          Meus textos, suas <span className="serif-accent text-crimson">cenas.</span>
        </SplitReveal>
        <FadeUp immediate delay={0.2} className="lg:col-span-4">
          <p className="body-lg text-ink/70">
            Monólogos para desenvolver a própria voz.
          </p>
        </FadeUp>
      </div>

      <div className="mt-24 grid gap-x-8 gap-y-24 sm:grid-cols-2 lg:mt-36 lg:grid-cols-3 lg:gap-x-10">
        {books.map((b, i) => {
          const meta = [b.year, b.role].filter(Boolean).join(" · ");
          const rating = bookRating(b);
          return (
            <FadeUp key={b.slug} delay={i * 0.12} className={i % 2 === 1 ? "sm:mt-28 lg:mt-0" : ""}>
              <Link href={`/livros/${b.slug}`} className="group block">
                <BookCover book={b} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" />
                {meta && <p className="eyebrow mt-8 text-stone-deep">{meta}</p>}
                <h2 className={`${meta ? "mt-2" : "mt-8"} max-w-[24ch] text-[clamp(1.375rem,1.8vw,1.75rem)] font-semibold leading-[1.1] tracking-tight`}>
                  {b.title}
                </h2>
                {rating && (
                  <p className="mt-4 flex items-center gap-2 text-sm font-light text-ink/60">
                    <Stars value={rating.average} className="h-3.5" />
                    {rating.count} avaliações
                  </p>
                )}
                <p className="mt-5 max-w-[52ch] font-extralight leading-relaxed text-ink/70 md:text-lg lg:text-base">{b.description}</p>
                <span className="cta-line mt-8">
                  Ver livro <span className="cta-rule" aria-hidden />
                </span>
              </Link>
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
