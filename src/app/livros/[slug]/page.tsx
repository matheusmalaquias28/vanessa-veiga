import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCover } from "@/components/books/BookCover";
import { Stars } from "@/components/books/Stars";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { FadeUp } from "@/components/ui/motion";
import { bookRating, books, getBook } from "@/lib/content";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/livros/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const b = getBook(slug);
  if (!b) return {};
  return { title: { absolute: `${b.title} — Vanessa Veiga` }, description: b.description };
}

const fmtDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
const fmtRating = (n: number) => n.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export default async function BookPage({ params }: PageProps<"/livros/[slug]">) {
  const { slug } = await params;
  const b = getBook(slug);
  if (!b) notFound();

  const rating = bookRating(b);
  const written = (b.reviews ?? []).filter((r) => r.text && !r.hideText);
  const others = books.filter((o) => o.slug !== b.slug);
  const buyHref = b.buyUrl ?? "/contato";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: b.title,
    description: b.description,
    author: { "@type": "Person", name: "Vanessa Veiga" },
    ...(b.format === "E-book" ? { bookFormat: "https://schema.org/EBook" } : {}),
    ...(b.format === "Capa dura" ? { bookFormat: "https://schema.org/Hardcover" } : {}),
    ...(b.publisher ? { publisher: { "@type": "Organization", name: b.publisher } } : {}),
    ...(b.published ? { datePublished: b.published } : {}),
    ...(b.language === "Português" ? { inLanguage: "pt" } : {}),
    ...(b.pages ? { numberOfPages: b.pages } : {}),
    ...(b.isbn13 ? { isbn: b.isbn13.replace(/-/g, "") } : {}),
    ...(rating
      ? { aggregateRating: { "@type": "AggregateRating", ratingValue: rating.average, reviewCount: rating.count, bestRating: 5 } }
      : {}),
  };

  return (
    <section data-theme="light" className="bg-canvas px-5 pb-32 pt-32 text-ink md:px-10 md:pb-44 md:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Navegação estrutural" className="eyebrow mb-10 text-stone-deep md:mb-14">
        <Link href="/livros" className="transition-colors hover:text-crimson">
          Livros
        </Link>
        <span className="mx-3 text-ink/30">/</span>
        <span className="text-ink/60">{b.format ?? "Livro"}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Foto do produto */}
        <FadeUp immediate className="lg:col-span-6">
          <BookCover book={b} priority hover={false} className="lg:sticky lg:top-28" sizes="(min-width: 1024px) 50vw, 100vw" />
        </FadeUp>

        {/* Informações */}
        <FadeUp immediate delay={0.12} className="flex flex-col lg:col-span-6 lg:pt-6">
          <p className="eyebrow text-stone-deep">Vanessa Veiga</p>
          <h1 className="mt-4 text-[clamp(2rem,3.6vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">{b.title}</h1>

          {rating ? (
            <a href="#avaliacoes" className="group mt-6 inline-flex items-center gap-3 self-start text-sm">
              <Stars value={rating.average} className="h-5" />
              <span className="font-medium">{fmtRating(rating.average)}</span>
              <span className="font-light text-ink/60 underline-offset-4 group-hover:underline">
                {rating.count} {rating.count === 1 ? "avaliação" : "avaliações"}
              </span>
            </a>
          ) : (
            <p className="mt-6 text-sm font-light text-ink/50">Ainda sem avaliações</p>
          )}

          <div className="body-lg mt-8 max-w-[52ch] space-y-5 text-ink/70">
            {(b.about ?? b.description).split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-10 border-t border-ink/15 pt-8">
            {b.price && <p className="mb-5 text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold tracking-tight">{b.price}</p>}
            <a
              href={buyHref}
              {...(b.buyUrl ? { target: "_blank", rel: "noreferrer" } : {})}
              className="flex w-full items-center justify-center gap-3 bg-ink px-8 py-5 text-sm font-medium uppercase tracking-[0.2em] text-paper transition-colors duration-300 hover:bg-crimson sm:w-auto sm:self-start"
            >
              {b.buyUrl ? "Comprar agora" : "Quero comprar"}
              <span aria-hidden>→</span>
            </a>
            {!b.buyUrl && <p className="mt-4 text-sm font-light text-ink/55">Fale com a equipe para adquirir o seu exemplar.</p>}
          </div>

          <dl className="mt-12 divide-y divide-ink/10 border-y border-ink/10 text-sm">
            {[
              ["Autora", "Vanessa Veiga"],
              ["Formato", b.format],
              ["Conteúdo", b.contents],
              ["Editora", b.publisher],
              ["Edição", b.edition],
              ["Publicação", b.published && fmtDate(b.published)],
              ["Idioma", b.language],
              ["Páginas", b.pages && `${b.pages} páginas`],
              ["ISBN-10", b.isbn10],
              ["ISBN-13", b.isbn13],
              ["Peso", b.weight],
              ["Dimensões", b.dimensions],
            ]
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k} className="grid grid-cols-[8rem_1fr] gap-4 py-4">
                  <dt className="font-medium">{k}</dt>
                  <dd className="font-light text-ink/75">{v}</dd>
                </div>
              ))}
          </dl>
        </FadeUp>
      </div>

      {rating && (
        <div id="avaliacoes" className="mt-32 scroll-mt-28 border-t border-ink/15 pt-10 md:mt-44">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-6 text-stone-deep">Avaliações</p>
              <p className="display text-[clamp(4rem,8vw,7rem)]">{fmtRating(rating.average)}</p>
              <div className="mt-4">
                <Stars value={rating.average} className="h-6" />
              </div>
              <p className="mt-3 text-sm font-light text-ink/60">
                Média de {rating.count} {rating.count === 1 ? "avaliação" : "avaliações"} de leitores
              </p>
            </div>

            <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-8">
              {written.map((r, i) => (
                <li key={i} className="border-t border-ink/10 pt-6">
                  <Stars value={r.rating} className="h-3.5" />
                  {r.title && <p className="mt-4 font-semibold leading-snug">{r.title}</p>}
                  <blockquote className={`${r.title ? "mt-2" : "mt-4"} font-light leading-relaxed text-ink/80`}>“{r.text}”</blockquote>
                  <p className="mt-5 text-sm">
                    <span className="font-medium">{r.name ?? "Avaliação anônima"}</span>
                    <span className="mx-2 text-ink/30">·</span>
                    <time dateTime={r.date} className="font-light text-ink/50">
                      {fmtDate(r.date)}
                    </time>
                  </p>
                  {(r.source || r.verified) && (
                    <p className="mt-1 text-xs font-light text-ink/45">
                      {[r.verified && "Compra verificada", r.source && `via ${r.source}`].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {others.length > 0 && (
        <div className="mt-32 border-t border-ink/15 pt-10 md:mt-44">
          <div className="mb-12 flex items-end justify-between gap-6">
            <h2 className="display text-[clamp(1.75rem,3vw,3rem)]">Mais livros</h2>
            <ArrowLink href="/livros">Ver todos</ArrowLink>
          </div>
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2">
            {others.map((o) => (
              <Link key={o.slug} href={`/livros/${o.slug}`} className="group grid grid-cols-[38%_1fr] items-center gap-6 md:gap-10">
                <BookCover book={o} sizes="20vw" />
                <div>
                  <p className="text-[clamp(1.125rem,1.6vw,1.5rem)] font-semibold leading-tight tracking-tight">{o.title}</p>
                  <span className="cta-line mt-6">
                    Ver livro <span className="cta-rule" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
