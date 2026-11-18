import Image from "next/image";
import { Tsuru } from "@/components/brand";
import type { Book } from "@/lib/content";

/**
 * Painel 4:5 com a capa do livro. A capa oficial é um mockup que já traz fundo e sombra,
 * então ocupa o painel inteiro; sem ela, mostra um volume tipográfico provisório.
 * Use `group` num ancestral para ativar o hover.
 */
export function BookCover({
  book,
  className = "",
  sizes = "(min-width: 640px) 45vw, 100vw",
  priority = false,
  hover = true,
}: {
  book: Book;
  className?: string;
  sizes?: string;
  priority?: boolean;
  hover?: boolean;
}) {
  const motion = hover ? "transition-transform duration-700 ease-[var(--ease-out-expo)]" : "";

  if (book.cover) {
    return (
      <div className={`relative aspect-[4/5] overflow-hidden bg-[#ebebeb] ${className}`}>
        <Image
          src={book.cover}
          alt={`Capa de ${book.title}`}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${motion} ${hover ? "group-hover:scale-[1.03]" : ""}`}
        />
      </div>
    );
  }

  const [, subtitle] = book.title.match(/^\d+ (.*?)( \(|$)/) ?? [];
  return (
    <div className={`grid aspect-[4/5] place-items-center bg-paper-deep ${className}`}>
      <div
        className={`relative aspect-[2/3] w-[56%] text-paper shadow-[22px_28px_48px_-14px_rgba(20,20,20,0.5)] ${motion} ${hover ? "group-hover:-translate-y-2 group-hover:rotate-[-1.5deg]" : ""}`}
        style={{ background: book.tone }}
      >
        <span className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/45 to-transparent" />
        <div className="flex h-full flex-col justify-between p-[9%]">
          <Tsuru className="h-[9%] w-auto self-start" />
          <div>
            <p className="display text-[clamp(3rem,7vw,6.5rem)] leading-[0.8]">{book.title.match(/^\d+/)?.[0]}</p>
            <p className="mt-3 text-[clamp(0.75rem,1.1vw,1rem)] font-semibold leading-tight">{subtitle}</p>
            <p className="mt-4 text-[0.625rem] font-light uppercase tracking-[0.2em] text-paper/60">Vanessa Veiga</p>
          </div>
        </div>
      </div>
    </div>
  );
}
