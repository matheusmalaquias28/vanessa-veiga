import type { Metadata } from "next";
import { AreaPage } from "@/components/projects/AreaPage";

export const metadata: Metadata = { title: { absolute: "Direção de Elenco para Televisão — Vanessa Veiga" } };

export default function TelevisaoPage() {
  return (
    <AreaPage
      config={{
        category: "tv",
        headline: (
          <>
            Histórias que atravessam <span className="serif-accent">gerações.</span>
          </>
        ),
        text: "Da dramaturgia aos programas de televisão, uma trajetória marcada por diferentes formatos, personagens e produções que fizeram parte da televisão brasileira.",
        subtext:
          "A experiência de Vanessa na televisão abrange novelas, séries, programas e produções especiais, contemplando diferentes gêneros e perfis artísticos.",
        featured: ["segunda-chamada", "aruanas", "segundo-sol", "rock-story"],
      }}
    />
  );
}
