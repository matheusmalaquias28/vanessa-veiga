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
    "Desde 1996, conectando talentos, personagens e histórias que ganham vida no cinema, na televisão, no streaming e no teatro.",
  openGraph: {
    title: "Vanessa Veiga — Direção de Elenco",
    description: "Toda história começa com um encontro.",
    locale: "pt_BR",
    type: "website",
  },
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
