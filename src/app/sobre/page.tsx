import type { Metadata } from "next";
import { ProcessList } from "@/components/about/ProcessList";
import { Tsuru } from "@/components/brand";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { FadeUp, RevealImage, ScrubWords, SplitReveal } from "@/components/ui/motion";
import { miniBio, miniBioPdf, portraits } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Sobre Vanessa Veiga — Trajetória e Direção de Elenco" },
  description: "Conheça Vanessa Veiga: formada em Artes Cênicas e Pedagogia, diretora de elenco há 30 anos no cinema, na TV, no streaming e no teatro.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <>
      {/* abertura */}
      <section data-theme="light" className="relative overflow-hidden bg-canvas text-ink">
        <div className="grid min-h-[100svh] lg:grid-cols-2">
          <div className="flex flex-col justify-end px-5 pb-14 pt-40 md:px-10 md:pb-20">
            <FadeUp immediate>
              <p className="eyebrow mb-8 text-stone-deep">Sobre Vanessa</p>
            </FadeUp>
            <SplitReveal as="h1" immediate className="display max-w-[12ch] text-[clamp(3rem,6.8vw,8rem)]">
              Um olhar que encontra histórias em <span className="serif-accent text-crimson">pessoas.</span>
            </SplitReveal>
            <FadeUp immediate delay={0.15} className="mt-6">
              <p className="display max-w-[20ch] text-[clamp(1.5rem,2.6vw,2.75rem)] text-ink/80">
                Sensibilidade para reconhecer quem pode contá-las.
              </p>
            </FadeUp>
            <FadeUp immediate delay={0.25} className="mt-10 max-w-[40ch]">
              <p className="body-lg text-ink/70">
                Uma trajetória dedicada à pesquisa e descoberta de talentos, compondo elencos que traduzem cada
                projeto.
              </p>
            </FadeUp>
          </div>
          <RevealImage
            src={portraits.about}
            alt="Retrato de Vanessa Veiga"
            priority
            immediate
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="min-h-[80svh] lg:min-h-full"
            imgClassName="grayscale"
          />
        </div>
      </section>

      {/* biografia */}
      <section data-theme="dark" className="relative overflow-hidden bg-ink px-5 py-28 text-paper md:px-10 md:py-44">
        <p
          className="display pointer-events-none absolute -right-[4vw] top-10 text-[30vw] leading-none text-paper/[0.04]"
          aria-hidden
        >
          1996
        </p>
        <div className="relative grid gap-14 lg:grid-cols-12">
          <p className="eyebrow text-stone lg:col-span-3">Biografia</p>
          <div className="lg:col-span-9">
            <SplitReveal className="display max-w-[15ch] text-[clamp(2.5rem,5.6vw,6.5rem)]">
              Experiência que orienta o olhar. Curiosidade que move o <span className="serif-accent">trabalho.</span>
            </SplitReveal>
            <div className="mt-16 grid gap-10 md:grid-cols-2">
              <FadeUp className="space-y-6 font-extralight leading-relaxed text-paper/75 md:text-lg">
                <p>
                  Desde 1996, Vanessa Veiga desenvolve sua trajetória profissional na direção de elenco, atuando na
                  pesquisa, identificação e seleção de talentos para produções audiovisuais e teatrais.
                </p>
                <p>
                  Seu trabalho atravessa diferentes formatos e linguagens, reunindo experiências no cinema, na televisão,
                  no streaming e no teatro.
                </p>
              </FadeUp>
              <FadeUp delay={0.1} className="space-y-6 font-extralight leading-relaxed text-paper/75 md:text-lg">
                <p>
                  Ao longo dessa trajetória, participou de projetos como Olga, Vai que Cola 2, Jovens Polacas, Depois do
                  Universo, Segunda Chamada e muitas outras produções.
                </p>
                <p>
                  Com um olhar atento às particularidades de cada narrativa, Vanessa desenvolve processos de seleção que
                  consideram não apenas as características técnicas dos intérpretes, mas também a conexão entre talento,
                  personagem e proposta artística.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>

        <div className="relative mt-28 grid items-center gap-12 md:mt-40 lg:grid-cols-12">
          <RevealImage
            src={portraits.aboutAlt}
            alt="Vanessa Veiga"
            sizes="(min-width: 1024px) 40vw, 100vw"
            from="bottom"
            className="aspect-[4/5] lg:col-span-5"
            imgClassName="grayscale"
          />
          <div className="lg:col-span-6 lg:col-start-7">
            <ScrubWords className="serif-accent text-[clamp(2rem,4vw,4.25rem)] leading-[1.1]">
              Mais do que selecionar nomes, dirigir elenco é compreender histórias e reconhecer quem pode dar vida a elas.
            </ScrubWords>
          </div>
        </div>
      </section>

      {/* mini bio */}
      <section data-theme="light" className="bg-canvas px-5 py-28 text-ink md:px-10 md:py-40">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow text-stone-deep">Mini bio</p>
            <a
              href={miniBioPdf}
              download
              className="mt-10 inline-flex items-center gap-3 rounded-full border border-ink px-6 py-3 text-[0.8125rem] transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              Baixar mini bio em PDF
              <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                <path d="M8 2v9M4 7.5 8 11.5l4-4M3 14h10" />
              </svg>
            </a>
          </div>
          <div className="lg:col-span-9">
            <SplitReveal className="display max-w-[16ch] text-[clamp(2.25rem,4.4vw,5rem)]">
              Vanessa <span className="serif-accent text-crimson">Veiga.</span>
            </SplitReveal>
            <FadeUp className="mt-12 max-w-[68ch] columns-1 gap-12 space-y-6 font-light leading-relaxed text-ink/75 md:text-lg xl:max-w-none xl:columns-2 [&>p]:break-inside-avoid">
              {miniBio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </FadeUp>
          </div>
        </div>
      </section>

      {/* o trabalho */}
      <section data-theme="dark" className="bg-ink-soft px-5 py-28 text-paper md:px-10 md:py-44">
        <div className="mb-20 text-center">
          <p className="eyebrow mb-10 text-stone">Direção de elenco</p>
          {/* o título define a largura do bloco; o texto (w-0 min-w-full) acompanha essa largura */}
          <div className="mx-auto w-fit max-w-full">
            <SplitReveal className="display max-w-[14ch] text-[clamp(2.5rem,5.6vw,6.5rem)]">
              Cada personagem exige um olhar <span className="serif-accent text-crimson">singular.</span>
            </SplitReveal>
            <FadeUp className="mt-10 w-0 min-w-full">
              <div className="body-lg space-y-6 text-paper/70">
                <p>
                  A direção de elenco conecta talentos às histórias que serão contadas. No cinema, na televisão e no
                  teatro, esse trabalho parte de uma leitura sensível da obra e da pesquisa de intérpretes capazes de
                  construir os personagens e as relações entre eles.
                </p>
                <p>
                  Mais do que identificar perfis, selecionar um elenco exige compreender as necessidades da dramaturgia,
                  reconhecer potencialidades e construir, em diálogo com a direção e a produção, um conjunto que traduza
                  a proposta artística do projeto.
                </p>
                <p>
                  O olhar da direção de elenco combina experiência, avaliação criteriosa e curiosidade. Acompanha
                  profissionais de diferentes trajetórias, descobre novos talentos e amplia as possibilidades de escolha.
                </p>
                <p>
                  Durante o processo seletivo, a direção de elenco orienta os intérpretes, conduz testes e oferece à
                  direção artística elementos para decisões fundamentadas na composição do elenco.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
        <ProcessList />
      </section>

      {/* fechamento */}
      <section data-theme="light" className="relative overflow-hidden bg-canvas px-5 py-32 text-ink md:px-10 md:py-48">
        <div className="fold-lines pointer-events-none absolute inset-0 text-ink" aria-hidden />
        <Tsuru
          className="pointer-events-none absolute -left-[10vw] bottom-0 h-[70vh] w-auto opacity-[0.05]"
          ink="var(--color-gold)"
          accent="var(--color-ink)"
        />
        <div className="relative mx-auto max-w-5xl text-center">
          <SplitReveal className="display text-[clamp(2.5rem,6vw,7rem)]">
            Diferentes histórias. Elencos <span className="serif-accent text-crimson">únicos.</span>
          </SplitReveal>
          <FadeUp className="mx-auto mt-10 max-w-[46ch]">
            <p className="body-lg text-ink/70">
              De grandes produções cinematográficas a espetáculos teatrais, descubra os trabalhos que fazem parte dessa
              trajetória.
            </p>
            <div className="mt-12">
              <ArrowLink href="/projetos">Conhecer projetos</ArrowLink>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
