import type { Metadata } from "next";
import { AreaPage } from "@/components/projects/AreaPage";

export const metadata: Metadata = { title: { absolute: "Projetos para Streaming — Vanessa Veiga" } };

export default function StreamingPage() {
  return (
    <AreaPage
      config={{
        category: "streaming",
        cover: "/images/areas/streaming.webp",
        headline: (
          <>
            Novas telas. Infinitas possibilidades de <span className="serif-accent">contar histórias.</span>
          </>
        ),
        text: "Uma seleção de filmes e séries desenvolvidos para plataformas de streaming, com narrativas que exploram diferentes universos, personagens e linguagens.",
        wide: "beleza-fatal",
        featured: ["depois-do-universo", "vizinhos", "vidas-bandidas", "no-ano-que-vem"],
        closing: {
          title: "Cada nova tela abre espaço para novas histórias.",
          cta: "Explore também os projetos para televisão",
          href: "/projetos/televisao",
        },
      }}
    />
  );
}
