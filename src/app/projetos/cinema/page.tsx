import type { Metadata } from "next";
import { AreaPage } from "@/components/projects/AreaPage";

export const metadata: Metadata = { title: { absolute: "Direção de Elenco para Cinema — Vanessa Veiga" } };

export default function CinemaPage() {
  return (
    <AreaPage
      config={{
        category: "cinema",
        cover: "/images/areas/cinema.webp",
        headline: (
          <>
            Personagens que ganham vida na <span className="serif-accent">grande tela.</span>
          </>
        ),
        text: "Uma seleção de longas e curtas-metragens que fazem parte da trajetória de Vanessa Veiga na direção de elenco.",
        subtext: "Histórias, interpretações e encontros que contribuem para construir o universo de cada filme.",
        featured: ["olga", "vai-que-cola-2", "jovens-polacas"],
      }}
    />
  );
}
