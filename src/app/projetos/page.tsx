import type { Metadata } from "next";
import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { FadeUp, SplitReveal } from "@/components/ui/motion";

export const metadata: Metadata = { title: { absolute: "Projetos e Produções — Vanessa Veiga" } };

export default function ProjetosPage() {
  return (
    <section data-theme="light" className="bg-paper px-5 pb-32 pt-40 text-ink md:px-10 md:pt-52">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <SplitReveal as="h1" immediate className="display text-[clamp(3rem,8vw,9.5rem)] lg:col-span-9">
          Histórias que fazem parte de uma <span className="serif-accent text-crimson">trajetória.</span>
        </SplitReveal>
        <FadeUp immediate delay={0.2} className="lg:col-span-3">
          <p className="body-lg text-ink/70">
            Uma seleção de produções que atravessam gêneros, formatos e diferentes formas de contar histórias.
          </p>
        </FadeUp>
      </div>
      <div className="mt-6">
        <ProjectIndex />
      </div>
    </section>
  );
}
