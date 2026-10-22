import type { Metadata } from "next";
import { Tsuru } from "@/components/brand";
import { FadeUp, RevealImage, SplitReveal } from "@/components/ui/motion";
import { contact, portraits } from "@/lib/content";

export const metadata: Metadata = { title: { absolute: "Contato — Vanessa Veiga" } };

function BigLink({ href, label, value }: { href: string; label: string; value: string }) {
  return (
    <a href={href} className="group block border-t border-paper/15 py-8 md:py-10">
      <span className="eyebrow mb-3 block text-stone">{label}</span>
      <span className="flex items-center justify-between gap-6">
        <span className="display break-all text-[clamp(1.75rem,4.4vw,4.75rem)] transition-colors duration-500 group-hover:text-crimson">
          {value}
        </span>
        <svg
          viewBox="0 0 24 24"
          className="size-8 shrink-0 -rotate-45 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-0 md:size-12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M3 12h18M14 5l7 7-7 7" />
        </svg>
      </span>
    </a>
  );
}

export default function ContatoPage() {
  return (
    <section data-theme="dark" className="relative min-h-[100svh] overflow-hidden bg-ink px-5 pb-24 pt-40 text-paper md:px-10 md:pt-52">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <FadeUp immediate>
            <p className="eyebrow mb-8 text-stone">Contato</p>
          </FadeUp>
          <SplitReveal as="h1" immediate className="display max-w-[13ch] text-[clamp(3rem,7.5vw,9rem)]">
            Vamos dar vida a uma nova <span className="serif-accent text-crimson">história?</span>
          </SplitReveal>
          <FadeUp immediate delay={0.2} className="mt-10 max-w-[44ch]">
            <p className="body-lg text-paper/70">
              Para novos projetos, propostas profissionais ou informações sobre direção de elenco, entre em contato.
            </p>
          </FadeUp>

          <FadeUp immediate delay={0.35} className="mt-20">
            <BigLink href={`mailto:${contact.email}`} label="E-mail" value={contact.email} />
            <BigLink href={contact.phoneHref} label="Telefone" value={contact.phone} />
          </FadeUp>
        </div>

        <div className="relative hidden lg:col-span-4 lg:block">
          <RevealImage
            src={portraits.contact}
            alt="Vanessa Veiga"
            immediate
            sizes="30vw"
            className="mt-6 aspect-[3/4]"
            imgClassName="grayscale"
          />
        </div>
      </div>

      <Tsuru className="pointer-events-none absolute -bottom-[6vw] -right-[4vw] h-[40vw] w-auto opacity-[0.06]" ink="var(--color-paper)" accent="var(--color-paper)" />
    </section>
  );
}
