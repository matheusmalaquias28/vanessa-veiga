import type { MetadataRoute } from "next";
import { books, categories, categoryOrder, projects } from "@/lib/content";

const base = "https://vanessaveiga.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({ url: `${base}${path}`, changeFrequency: "monthly", priority });
  return [
    page("/", 1),
    page("/sobre", 0.9),
    page("/projetos", 0.9),
    ...categoryOrder.map((c) => page(categories[c].href, 0.8)),
    page("/livros", 0.8),
    page("/contato", 0.7),
    ...books.map((b) => page(`/livros/${b.slug}`, 0.7)),
    ...projects.map((p) => page(`/projetos/${p.slug}`, 0.6)),
  ];
}
