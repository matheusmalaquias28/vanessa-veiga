import type { Metadata } from "next";
import { AreaPage } from "@/components/projects/AreaPage";

export const metadata: Metadata = { title: { absolute: "Direção de Elenco para Teatro — Vanessa Veiga" } };

export default function TeatroPage() {
  return (
    <AreaPage
      config={{
        category: "teatro",
        dark: true,
        headline: (
          <>
            A arte do encontro, <span className="serif-accent">ao vivo.</span>
          </>
        ),
        text: "No teatro, a presença transforma cada interpretação em uma experiência única. Conheça os espetáculos que fazem parte da trajetória de Vanessa Veiga na direção de elenco.",
        wide: "clube-da-esquina",
        featured: ["iron-o-homem-da-mascara-de-ferro", "perfeita"],
        closing: {
          title: "No palco, cada escolha encontra o público em tempo real.",
          cta: "Conhecer outros trabalhos",
          href: "/projetos",
        },
      }}
    />
  );
}
