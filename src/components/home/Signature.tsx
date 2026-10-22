import { Tsuru } from "../brand";
import { ArrowLink } from "../ui/ArrowLink";
import { ScrubWords, SplitReveal } from "../ui/motion";

export function Signature() {
  return (
    <section data-theme="light" className="relative overflow-hidden bg-paper px-5 py-32 text-ink md:px-10 md:py-48">
      <div className="fold-lines pointer-events-none absolute inset-0 text-ink" aria-hidden />
      <Tsuru
        className="pointer-events-none absolute -right-[8vw] top-1/2 h-[80vh] w-auto -translate-y-1/2 opacity-[0.05]"
        ink="var(--color-ink)"
        accent="var(--color-ink)"
      />

      <div className="relative grid gap-12 lg:grid-cols-12">
        <p className="eyebrow text-stone-deep lg:col-span-3">03 — Assinatura</p>
        <div className="lg:col-span-9">
          <SplitReveal className="display max-w-[13ch] text-[clamp(3rem,7.4vw,8.75rem)]">
            O encontro entre talento e <span className="serif-accent text-crimson">narrativa.</span>
          </SplitReveal>

          <ScrubWords className="mt-14 max-w-[34ch] text-[clamp(1.375rem,2.3vw,2.25rem)] font-extralight leading-[1.3]">
            Cada projeto carrega uma identidade própria. Cada personagem pede um olhar atento. É nesse encontro que
            começa o trabalho de direção de elenco.
          </ScrubWords>

          <div className="mt-14">
            <ArrowLink href="/sobre">Conheça Vanessa Veiga</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
