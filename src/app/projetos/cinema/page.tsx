import type { Metadata } from "next";
import { AreaPage } from "@/components/projects/AreaPage";

export const metadata: Metadata = {
  title: { absolute: "Direção de Elenco para Cinema — Vanessa Veiga" },
  description: "Longas e curtas com direção de elenco de Vanessa Veiga: Olga, Vai que Cola 2, Rio de Sangue, Sexa, O Gênio do Crime e mais.",
  alternates: { canonical: "/projetos/cinema" },
};

export default function CinemaPage() {
  return (
    <AreaPage
      config={{
        category: "cinema",
        cover: "/images/areas/cinema.webp",
        headline: (
          <>
            Entre o roteiro e a tela, a escolha de quem conta a <span className="serif-accent">história.</span>
          </>
        ),
        text: "Uma seleção de longas e curtas-metragens que fazem parte da trajetória de Vanessa Veiga na direção de elenco.",
        subtext: "Histórias, interpretações e encontros que contribuem para construir o universo de cada filme.",
        featured: ["olga", "vai-que-cola-2", "jovens-polacas"],
      }}
    />
  );
}
