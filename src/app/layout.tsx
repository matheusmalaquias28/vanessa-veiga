import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { Chrome } from "@/components/layout/Chrome";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { Preloader } from "@/components/layout/Preloader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vanessaveiga.com.br"),
  title: {
    default: "Vanessa Veiga — Direção de Elenco",
    template: "%s — Vanessa Veiga",
  },
  description:
    "Vanessa Veiga, diretora de elenco há 30 anos. Pesquisa, seleção e preparação de elenco para cinema, televisão, streaming e teatro: Segundo Sol, Beleza Fatal, Depois do Universo, Olga e mais.",
  applicationName: "Vanessa Veiga",
  authors: [{ name: "Vanessa Veiga" }],
  creator: "Vanessa Veiga",
  keywords: [
    "Vanessa Veiga",
    "diretora de elenco",
    "direção de elenco",
    "produtora de elenco",
    "casting",
    "teste de elenco",
    "elenco para cinema",
    "elenco para televisão",
    "elenco para streaming",
    "elenco para teatro",
    "monólogos para atores",
  ],
  openGraph: {
    title: "Vanessa Veiga — Direção de Elenco",
    description: "Toda história começa com um encontro. Direção de elenco para cinema, televisão, streaming e teatro.",
    siteName: "Vanessa Veiga Working",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vanessa Veiga — Direção de Elenco",
    description: "Toda história começa com um encontro. Direção de elenco para cinema, televisão, streaming e teatro.",
  },
  robots: { index: true, follow: true },
};

/** Dados estruturados da pessoa por trás do site (Google / buscadores) */
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vanessa Veiga",
  jobTitle: "Diretora de elenco",
  url: "https://vanessaveiga.com.br",
  image: "https://vanessaveiga.com.br/images/vanessa/retrato-hero.webp",
  sameAs: ["https://www.instagram.com/vanessaveigaworking/", "https://www.imdb.com/pt/name/nm3706431/"],
  knowsAbout: ["Direção de elenco", "Cinema", "Televisão", "Streaming", "Teatro"],
};

export const viewport: Viewport = {
  themeColor: "#141414",
};

// Esconde o preloader antes da hidratação quando ele já foi visto neste navegador
// (volta a aparecer só se os dados do site forem limpos).
const introScript = `try{if(localStorage.getItem('vv-intro')==='1')document.documentElement.classList.add('intro-seen')}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body>
        <Preloader />
        <SmoothScroll />
        <Chrome />
        <PageTransition />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
