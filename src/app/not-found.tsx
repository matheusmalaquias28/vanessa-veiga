import { Tsuru } from "@/components/brand";
import { ArrowLink } from "@/components/ui/ArrowLink";

export default function NotFound() {
  return (
    <section data-theme="dark" className="grid min-h-[100svh] place-items-center bg-ink px-5 text-center text-paper">
      <div>
        <Tsuru className="mx-auto h-20 w-auto" ink="var(--color-paper)" />
        <h1 className="display mt-10 text-[clamp(2.5rem,6vw,6rem)]">
          Esta cena ficou <span className="serif-accent text-crimson">fora do roteiro.</span>
        </h1>
        <p className="body-lg mx-auto mt-6 max-w-[36ch] text-paper/70">A página que você procura não existe ou mudou de lugar.</p>
        <div className="mt-12">
          <ArrowLink href="/">Voltar ao início</ArrowLink>
        </div>
      </div>
    </section>
  );
}
