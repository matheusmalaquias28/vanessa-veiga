# Vanessa Veiga — Direção de Elenco

Site portfólio em Next.js 16 (App Router, Turbopack) + Tailwind v4 + GSAP 3.15 (ScrollTrigger, MorphSVG, SplitText, Flip) + Lenis. Hospedagem prevista na Vercel. Todas as páginas são estáticas (SSG).

```bash
npm install
npm run dev
```

## Estrutura

| Rota | Conteúdo |
| --- | --- |
| `/` | Hero com montagem das produções, áreas fixas no scroll (estilo realevate.agency), trajetória, assinatura |
| `/sobre` | Abertura, biografia, o trabalho (5 etapas), fechamento |
| `/projetos` | Índice com filtros Todos · Cinema · Streaming · Teatro · TV |
| `/projetos/cinema`, `/streaming`, `/teatro`, `/televisao` | Páginas por área |
| `/projetos/[slug]` | Página individual de cada produção |
| `/livros` | Modelo da galeria (aguardando acervo) |
| `/contato` | E-mail e telefone, sem formulário |

- Conteúdo: `src/lib/content.ts` (produções, áreas, contatos, etapas). Fonte única; no futuro pode ser trocado por um CMS mantendo os mesmos campos.
- Marca: `src/components/brand-paths.ts` é gerado a partir de `public/logo-vanessa-veiga.svg`.
- Preloader de origami: `src/components/layout/Preloader.tsx` (aparece só na primeira visita, guardado no localStorage; limpar os dados do site mostra de novo; clique pula).
- Menu e contraste do cabeçalho: `src/components/layout/Chrome.tsx`. Cada seção declara `data-theme="light|dark"`.
- Transição entre páginas: `src/components/layout/PageTransition.tsx` (intercepta links internos).

## Pendências antes de publicar

- **Imagens**: todas as fotos são provisórias (Unsplash). Substituir por retratos da Vanessa e stills/pôsteres oficiais autorizados.
- **Créditos**: confirmar a função exata da Vanessa em cada produção (a ficha técnica exibe "Direção de elenco").
- **Lançamentos**: Cacilda Becker em Cena Aberta e Passinho estão marcados como "Em desenvolvimento".
- **Anos e fichas**: só foram preenchidos os dados enviados na copy; os demais campos ficam ocultos até serem informados.
- **Livros**: os dois volumes de "111 Monólogos" já têm título, descrição e capa; faltam ano, tipo de participação e link de compra (campos `year`, `role`, `link` em `content.ts`).
- **Contato**: confirmar e-mail e telefone; WhatsApp só se confirmado.
- **Domínio**: `metadataBase` em `src/app/layout.tsx` usa `vanessaveiga.com.br` como provisório.
- **Paleta**: o acento usa o vermelho do tsuru da logo (`#E6003D`) no lugar do terracota sugerido.
"# vanessa-veiga" 
