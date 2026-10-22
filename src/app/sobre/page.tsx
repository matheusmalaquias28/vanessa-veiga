import type { Metadata } from "next";
import { ProcessList } from "@/components/about/ProcessList";
import { Tsuru } from "@/components/brand";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { FadeUp, RevealImage, ScrubWords, SplitReveal } from "@/components/ui/motion";
import { portraits } from "@/lib/content";

export const metadata: Metadata = { title: { absolute: "Sobre Vanessa Veiga — Trajetória e Direção de Elenco" } };

export default function SobrePage() {
  return (
    <>
      {/* abertura */}
      <section data-theme="light" className="relative overflow-hidden bg-paper text-ink">
        <div className="grid min-h-[100svh] lg:grid-cols-2">
          <div className="flex flex-col justify-end px-5 pb-14 pt-40 md:px-10 md:pb-20">
            <FadeUp immediate>
              <p className="eyebrow mb-8 text-stone-deep">Sobre Vanessa</p>
            </FadeUp>
            <SplitReveal as="h1" immediate className="display max-w-[12ch] text-[clamp(3rem,6.8vw,8rem)]">
              Um olhar que encontra histórias em <span className="serif-accent text-crimson">pessoas.</span>
            </SplitReveal>
            <FadeUp immediate delay={0.25} className="mt-10 max-w-[40ch]">
              <p className="body-lg text-ink/70">
                Uma trajetória dedicada à descoberta, à seleção e à construção de elencos para diferentes linguagens
                artísticas.
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
              Uma trajetória construída através de <span className="serif-accent">personagens.</span>
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

      {/* o trabalho */}
      <section data-theme="dark" className="bg-ink-soft px-5 py-28 text-paper md:px-10 md:py-44">
        <div className="mb-20 grid gap-10 lg:grid-cols-12">
          <p className="eyebrow text-stone lg:col-span-3">O trabalho</p>
          <div className="lg:col-span-9">
            <SplitReveal className="display max-w-[14ch] text-[clamp(2.5rem,5.6vw,6.5rem)]">
              Cada personagem exige um olhar <span className="serif-accent text-crimson">singular.</span>
            </SplitReveal>
            <FadeUp className="mt-10 max-w-[52ch]">
              <p className="body-lg text-paper/70">
                A direção de elenco é um processo que envolve pesquisa, sensibilidade e conhecimento do universo
                artístico. Do primeiro levantamento de perfis à escolha dos intérpretes, cada etapa contribui para a
                construção da identidade de uma produção.
              </p>
            </FadeUp>
          </div>
        </div>
        <ProcessList />
      </section>

      {/* fechamento */}
      <section data-theme="light" className="relative overflow-hidden bg-paper px-5 py-32 text-ink md:px-10 md:py-48">
        <div className="fold-lines pointer-events-none absolute inset-0 text-ink" aria-hidden />
        <Tsuru
          className="pointer-events-none absolute -left-[10vw] bottom-0 h-[70vh] w-auto opacity-[0.05]"
          ink="var(--color-ink)"
          accent="var(--color-ink)"
        />
        <div className="relative mx-auto max-w-5xl text-center">
          <SplitReveal className="display text-[clamp(2.5rem,6vw,7rem)]">
            Diferentes histórias. O mesmo compromisso com cada <span className="serif-accent text-crimson">personagem.</span>
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
