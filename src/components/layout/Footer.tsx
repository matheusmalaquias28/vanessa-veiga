import Image from "next/image";
import Link from "next/link";
import { categories, categoryOrder, contact, nav } from "@/lib/content";
import { NameMark, Tsuru } from "../brand";
import { ArrowLink } from "../ui/ArrowLink";

export function Footer() {
  return (
    <footer data-theme="dark" className="relative overflow-hidden bg-ink text-paper">
      <div className="fold-lines pointer-events-none absolute inset-0 text-paper" aria-hidden />

      <div className="relative px-5 pt-28 md:px-10 md:pt-40">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <h2 className="display max-w-[14ch] text-[clamp(2.75rem,6.5vw,6.5rem)]">
            Vamos dar vida a uma nova <span className="serif-accent text-crimson">história?</span>
          </h2>
          <ArrowLink href="/contato" className="shrink-0 text-paper">
            Entrar em contato
          </ArrowLink>
        </div>

        <div className="mt-24 grid gap-12 border-t border-paper/15 pt-12 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Tsuru className="h-12 w-auto" ink="var(--color-paper)" />
            <p className="mt-6 max-w-[26ch] font-extralight leading-relaxed text-paper/70">
              Vanessa Veiga, Direção de Elenco. Conectando talentos, personagens e histórias desde 1996.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-5 text-stone">Menu</p>
            <ul className="space-y-2 font-light">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="transition-colors hover:text-crimson">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-5 text-stone">Áreas</p>
            <ul className="space-y-2 font-light">
              {categoryOrder.map((c) => (
                <li key={c}>
                  <Link href={categories[c].href} className="transition-colors hover:text-crimson">
                    {categories[c].label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-5 text-stone">Contato</p>
            <a href={`mailto:${contact.email}`} className="block font-light transition-colors hover:text-crimson">
              {contact.email}
            </a>
            <a href={contact.phoneHref} className="mt-2 block font-light transition-colors hover:text-crimson">
              {contact.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="relative mt-24 px-5 md:px-10">
        <NameMark className="w-full text-paper" />
      </div>

      <div className="relative flex flex-col gap-4 px-5 pb-8 pt-8 text-xs font-light text-stone md:flex-row md:items-center md:justify-between md:px-10">
        <p>Cinema · Streaming · Teatro · Televisão</p>
        <p>© 2026 Vanessa Veiga. Todos os direitos reservados.</p>
        <a
          href="https://www.energymidia.com.br"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2.5 transition-colors hover:text-paper"
        >
          Desenvolvido por
          <Image
            src="/images/energy-midia.svg"
            alt="Energy Mídia"
            width={829}
            height={311}
            className="h-6 w-auto opacity-80 transition-opacity duration-300 group-hover:opacity-100"
          />
        </a>
      </div>
    </footer>
  );
}
