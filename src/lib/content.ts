/**
 * Conteúdo do site. Fonte única para páginas, cards e metadados.
 *
 * IMAGENS: todas as fotos atuais são PROVISÓRIAS (Unsplash, licença livre) e
 * apenas simulam stills, pôsteres e retratos. Substituir por material oficial
 * autorizado antes da publicação (ver lista de validações no README).
 */

export type Category = "cinema" | "streaming" | "teatro" | "tv";

export type Project = {
  slug: string;
  title: string;
  category: Category;
  /** Formato exibido como subcategoria (Longa-metragem, Série, Novela...) */
  format?: string;
  /** Subgrupo usado apenas na página de TV */
  tvGroup?: "dramaturgia" | "programas";
  year?: string;
  production?: string;
  platform?: string;
  direction?: string;
  cast?: string;
  description?: string;
  image: string;
  /** Imagem horizontal usada só na montagem da hero (ex.: banner oficial) */
  heroImage?: string;
  /** Classes de object-position da heroImage no desktop (sempre com prefixo lg:) */
  heroFocus?: string;
  /** Pôster vertical em alta usado como fundo da hero no celular */
  heroPoster?: string;
  /** Pôster vertical (comprimido) do recorte pequeno da hero */
  heroInsetImage?: string;
  featured?: boolean;
  /** Produções sem estreia confirmada recebem um selo editorial */
  status?: "em-desenvolvimento";
  trailer?: string;
  /** Função de Vanessa no projeto; padrão "Direção de elenco" */
  role?: string;
  /** Exibidora / onde assistir hoje */
  distributor?: string;
  kidsCast?: string;
  curiosities?: string[];
  /** Outros vídeos (YouTube, Globoplay, IMDb, TikTok...) */
  videos?: string[];
  /** Matérias na imprensa */
  press?: string[];
  /** Trecho de crítica em destaque */
  quote?: { text: string; source: string; url: string };
};

const u = (id: string, w = 2000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const portraits = {
  hero: "/images/vanessa/retrato-hero.webp",
  about: u("1515138692129-197a2c608cfd"),
  aboutAlt: u("1533392151650-269f96231f65"),
  contact: "/images/vanessa/retrato-contato.webp",
};

export const categories: Record<
  Category,
  {
    label: string;
    href: string;
    tagline: string;
    cta: string;
    image: string;
    tone: string;
    ink: "light" | "dark";
  }
> = {
  cinema: {
    label: "Cinema",
    href: "/projetos/cinema",
    tagline: "Um olhar para o talento. Uma escolha para cada história.",
    cta: "Explorar cinema",
    image: "/images/areas/cinema.webp",
    tone: "#141414",
    ink: "light",
  },
  streaming: {
    label: "Streaming",
    href: "/projetos/streaming",
    tagline: "Escolhas de elenco que traduzem as singularidades de cada projeto.",
    cta: "Explorar streaming",
    image: "/images/areas/streaming.webp",
    tone: "#2a2522",
    ink: "light",
  },
  teatro: {
    label: "Teatro",
    href: "/projetos/teatro",
    tagline: "A presença, a emoção e a força de cada interpretação.",
    cta: "Explorar teatro",
    image: u("1585699324551-f6c309eedeca"),
    tone: "#5c1220",
    ink: "light",
  },
  tv: {
    label: "Televisão",
    href: "/projetos/televisao",
    tagline: "Personagens que atravessam histórias e gerações.",
    cta: "Explorar televisão",
    image: u("1638472432243-901591666239"),
    tone: "#e8e3d9",
    ink: "dark",
  },
};

/** Frases que se alternam nas páginas de projeto sem descrição própria, para não repetir a mesma em todas. */
export const projectLines: Partial<Record<Category, string[]>> = {
  cinema: [
    "Entre o roteiro e a tela, a escolha de quem conta a história.",
    "O encontro entre um personagem e quem vai interpretá-lo.",
    "Histórias também se escrevem a partir das escolhas de elenco.",
    "Diferentes histórias. Um olhar direcionado para cada elenco.",
  ],
  streaming: [
    "Cada história tem suas particularidades.",
    "O elenco nasce a partir das melhores escolhas.",
    "A singularidade de cada projeto orientando a escolha de elenco.",
    "Um olhar atento para identificar o que torna cada história única.",
  ],
};

export const categoryOrder: Category[] = ["cinema", "streaming", "teatro", "tv"];

const projectList: Project[] = [
  // ─── Cinema ───────────────────────────────────────────────
  {
    slug: "olga",
    title: "Olga",
    category: "cinema",
    format: "Longa-metragem",
    year: "2004",
    production: "Globo Filmes",
    description: "Um dos trabalhos da trajetória de Vanessa no cinema brasileiro.",
    image: u("1517081719774-67c8f09db5b5"),
    heroImage: "/images/projetos/olga.jpg",
    heroInsetImage: "/images/projetos/posters/olga.webp",
    heroPoster: "/images/projetos/posters/full/olga.webp",
    heroFocus: "lg:object-[70%_50%]",
    featured: true,
  },
  {
    slug: "vai-que-cola-2",
    title: "Vai que Cola 2: O Começo",
    category: "cinema",
    format: "Longa-metragem",
    year: "2019",
    production: "Conspiração Filmes / H2O",
    description: "Longa-metragem de comédia que integra o portfólio de cinema.",
    image: u("1516203108699-aa41b85e4832"),
    heroImage: "/images/projetos/vai-que-cola-2.jpg",
    heroInsetImage: "/images/projetos/posters/vai-que-cola-2.webp",
    heroPoster: "/images/projetos/posters/full/vai-que-cola-2.webp",
    heroFocus: "lg:object-[50%_35%]",
    featured: true,
  },
  {
    slug: "jovens-polacas",
    title: "Jovens Polacas",
    category: "cinema",
    format: "Longa-metragem",
    year: "2019",
    production: "Alelo Filmes / Pipa Produções",
    description: "Drama cinematográfico presente na seleção de trabalhos de Vanessa.",
    image: "/images/projetos/jovens-polacas.webp",
    featured: true,
  },
  {
    slug: "vestido-pra-casar",
    title: "Vestido pra Casar",
    category: "cinema",
    format: "Longa-metragem",
    year: "2015",
    production: "Imagem Filmes",
    image: "/images/projetos/vestido-pra-casar.webp",
  },
  {
    slug: "christabel",
    title: "Christabel",
    category: "cinema",
    format: "Longa-metragem",
    year: "2017",
    production: "Alelo Filmes / Pipa Produções",
    image: "/images/projetos/christabel.webp",
  },
  {
    slug: "o-ultimo-cine-drive-in",
    title: "O Último Cine Drive-in",
    category: "cinema",
    format: "Longa-metragem",
    year: "2013",
    production: "Pavirada Filmes / Vitrine Filmes",
    image: "/images/projetos/o-ultimo-cine-drive-in.webp",
  },
  {
    slug: "dia-de-preto",
    title: "Dia de Preto",
    category: "cinema",
    format: "Curta-metragem",
    year: "2012",
    image: "/images/projetos/dia-de-preto.webp",
  },
  { slug: "sexa", title: "Sexa", category: "cinema", production: "Giros Filmes", image: "/images/projetos/sexa.webp" },
  {
    slug: "rio-de-sangue",
    title: "Rio de Sangue",
    category: "cinema",
    production: "Intro Pictures",
    platform: "Disney+",
    image: "/images/projetos/rio-de-sangue.webp",
  },
  {
    slug: "o-genio-do-crime",
    title: "O Gênio do Crime",
    category: "cinema",
    production: "Boutique Filmes",
    platform: "Globoplay",
    image: "/images/projetos/o-genio-do-crime.webp",
  },
  {
    slug: "cacilda-becker-em-cena-aberta",
    title: "Cacilda Becker em Cena Aberta",
    category: "cinema",
    format: "Longa-metragem",
    year: "2024",
    production: "Giros Filmes",
    image: "/images/projetos/cacilda-becker-em-cena-aberta.webp",
    status: "em-desenvolvimento",
  },
  { slug: "cinco-contra-um", title: "Cinco Contra Um", category: "cinema", image: "/images/projetos/cinco-contra-um.webp" },

  // ─── Streaming ────────────────────────────────────────────
  {
    slug: "depois-do-universo",
    title: "Depois do Universo",
    category: "streaming",
    format: "Longa-metragem",
    year: "2022",
    platform: "Netflix",
    cast: "Giulia Be, Henrique Zaga",
    description: "Uma produção da Netflix com Giulia Be e Henrique Zaga no elenco.",
    image: u("1742327648139-2f81d97d6d7e"),
    heroImage: "/images/projetos/depois-do-universo.webp",
    heroInsetImage: "/images/projetos/posters/depois-do-universo.webp",
    heroPoster: "/images/projetos/posters/full/depois-do-universo.webp",
    featured: true,
  },
  {
    slug: "beleza-fatal",
    title: "Beleza Fatal",
    category: "streaming",
    format: "Novela",
    image: "/images/projetos/beleza-fatal.webp",
    featured: true,
  },
  {
    slug: "vizinhos",
    title: "Vizinhos",
    category: "streaming",
    format: "Longa-metragem",
    year: "2022",
    platform: "Netflix",
    cast: "Leandro Hassum, Julia Ribeiro, Paulinho Gogó",
    description: "Com Leandro Hassum, Julia Ribeiro e Paulinho Gogó.",
    image: "/images/projetos/vizinhos.webp",
  },
  {
    slug: "vidas-bandidas",
    title: "Vidas Bandidas",
    category: "streaming",
    format: "Série",
    year: "2024",
    cast: "Juliana Paes, Thomaz Aquino, Rodrigo Simas",
    description: "Com Juliana Paes, Thomaz Aquino e Rodrigo Simas.",
    image: "/images/projetos/vidas-bandidas.webp",
  },
  {
    slug: "no-ano-que-vem",
    title: "No Ano que Vem",
    category: "streaming",
    format: "Série",
    year: "2024",
    platform: "Canal Brasil",
    direction: "Maria Flor",
    description: "Série dirigida por Maria Flor.",
    image: "/images/projetos/no-ano-que-vem.webp",
  },
  {
    slug: "passinho",
    title: "Passinho",
    category: "streaming",
    image: "/images/projetos/passinho.webp",
    status: "em-desenvolvimento",
  },
  {
    slug: "dom-de-iludir",
    title: "Dom de Iludir",
    category: "streaming",
    format: "Série",
    year: "2026",
    platform: "Netflix",
    image: u("1540076156429-35ffe82b7870"),
  },
  {
    slug: "el-encargado",
    title: "El Encargado",
    category: "streaming",
    format: "Série · episódio Brasil, 3ª temporada",
    year: "2025",
    platform: "Disney+",
    image: u("1519220407669-06f9912b4aca"),
  },
  {
    slug: "da-mood",
    title: "Da Mood",
    category: "streaming",
    format: "Série",
    year: "2021",
    platform: "RTP Play (Portugal)",
    videos: ["https://www.youtube.com/watch?v=FFzAROFzexs"],
    image: u("1528051918192-ea3f5f11907d"),
  },

  // ─── Teatro ───────────────────────────────────────────────
  {
    slug: "clube-da-esquina",
    title: "Clube da Esquina: Os Sonhos Não Envelhecem",
    category: "teatro",
    format: "Musical",
    year: "2023",
    direction: "Dennis Carvalho",
    description: "Um espetáculo musical inspirado no universo artístico do Clube da Esquina.",
    image: "/images/projetos/clube-da-esquina.webp",
    featured: true,
  },
  {
    slug: "iron-o-homem-da-mascara-de-ferro",
    title: "Iron: O Homem da Máscara de Ferro",
    category: "teatro",
    format: "Musical",
    direction: "Ulysses Cruz",
    image: "/images/projetos/iron-o-homem-da-mascara-de-ferro.webp",
  },
  {
    slug: "perfeita",
    title: "Perfeita!",
    category: "teatro",
    year: "2024",
    direction: "Ulysses Cruz",
    image: "/images/projetos/perfeita.webp",
  },
  {
    slug: "o-leao-no-inverno",
    title: "O Leão no Inverno",
    category: "teatro",
    year: "2018",
    direction: "Ulysses Cruz",
    image: "/images/projetos/o-leao-no-inverno.webp",
  },
  {
    slug: "rio-mais-brasil",
    title: "Rio + Brasil, O Nosso Musical",
    category: "teatro",
    format: "Musical",
    year: "2016",
    direction: "Ulysses Cruz",
    image: u("1550026593-cb89847b168d"),
  },
  {
    slug: "cinderella",
    title: "Cinderella",
    category: "teatro",
    format: "Musical",
    year: "2015",
    direction: "Moeller & Botelho",
    image: "/images/projetos/cinderella.webp",
  },
  { slug: "susi-o-musical", title: "Susi, o Musical", category: "teatro", image: "/images/projetos/susi-o-musical.webp" },
  { slug: "meu-filho-e-um-musical", title: "Meu Filho é um Musical", category: "teatro", image: "/images/projetos/meu-filho-e-um-musical.webp" },
  {
    slug: "sarah-bernhardt-em-sao-paulo",
    title: "Sarah Bernhardt em São Paulo",
    category: "teatro",
    year: "2026",
    direction: "Ulysses Cruz",
    image: u("1560088161-ca82e528afc9"),
  },

  // ─── Televisão ────────────────────────────────────────────
  {
    slug: "segunda-chamada",
    title: "Segunda Chamada",
    category: "tv",
    tvGroup: "dramaturgia",
    format: "Série",
    year: "2019",
    production: "TV Globo / O2",
    image: u("1638472432243-901591666239"),
    heroImage: "/images/projetos/segunda-chamada.webp",
    heroInsetImage: "/images/projetos/posters/segunda-chamada.webp",
    heroPoster: "/images/projetos/posters/full/segunda-chamada.webp",
    heroFocus: "lg:object-[46%_40%]",
    featured: true,
  },
  {
    slug: "aruanas",
    title: "Aruanas",
    category: "tv",
    tvGroup: "dramaturgia",
    format: "Série",
    year: "2018",
    production: "TV Globo / Maria Farinha Filmes",
    image: "/images/projetos/aruanas.webp",
  },
  {
    slug: "segundo-sol",
    title: "Segundo Sol",
    category: "tv",
    tvGroup: "dramaturgia",
    format: "Novela",
    year: "2018",
    production: "TV Globo",
    image: u("1534528741775-53994a69daeb"),
    heroImage: "/images/projetos/segundo-sol.webp",
    heroInsetImage: "/images/projetos/posters/segundo-sol.webp",
    heroPoster: "/images/projetos/posters/full/segundo-sol.webp",
  },
  {
    slug: "rock-story",
    title: "Rock Story",
    category: "tv",
    tvGroup: "dramaturgia",
    format: "Novela",
    year: "2016–2017",
    production: "TV Globo",
    image: "/images/projetos/rock-story.webp",
  },
  {
    slug: "se-eu-fechar-os-olhos-agora",
    title: "Se Eu Fechar os Olhos Agora",
    category: "tv",
    tvGroup: "dramaturgia",
    format: "Minissérie",
    year: "2017–2018",
    production: "TV Globo",
    image: u("1496156555893-ce6408188e2c"),
    heroImage: "/images/projetos/se-eu-fechar-os-olhos-agora.webp",
    heroInsetImage: "/images/projetos/posters/se-eu-fechar-os-olhos-agora.webp",
    heroPoster: "/images/projetos/posters/full/se-eu-fechar-os-olhos-agora.webp",
  },
  { slug: "nada-sera-como-antes", title: "Nada Será Como Antes", category: "tv", tvGroup: "dramaturgia", format: "Série", year: "2015", production: "TV Globo", image: "/images/projetos/nada-sera-como-antes.webp" },
  { slug: "babilonia", title: "Babilônia", category: "tv", tvGroup: "dramaturgia", format: "Novela", year: "2015", production: "TV Globo", image: "/images/projetos/babilonia.webp" },
  { slug: "malhacao", title: "Malhação", category: "tv", tvGroup: "dramaturgia", format: "Novela", year: "1998, 2009, 2013–2014", production: "TV Globo", image: "/images/projetos/malhacao.webp" },
  { slug: "acampamento-de-ferias-iii", title: "Acampamento de Férias III", category: "tv", tvGroup: "dramaturgia", year: "2011", production: "TV Globo", image: u("1556912300-3017f3de2aa6") },
  { slug: "acampamento-de-ferias-ii", title: "Acampamento de Férias II", category: "tv", tvGroup: "dramaturgia", year: "2010", production: "TV Globo", image: u("1556229868-7b2d4b56b909") },
  { slug: "clara-e-o-chuveiro-do-tempo", title: "Clara e o Chuveiro do Tempo", category: "tv", tvGroup: "dramaturgia", year: "2006", production: "TV Globo", image: u("1542460533-50ac46fb13d7") },
  { slug: "por-toda-a-minha-vida", title: "Por Toda a Minha Vida", category: "tv", tvGroup: "dramaturgia", year: "2006", production: "TV Globo", image: u("1762979772530-81c3a60f5010") },

  // Programas & especiais
  { slug: "quando-voce-acredita-existe", title: "Quando Você Acredita, Existe", category: "tv", tvGroup: "programas", format: "Especial de fim de ano", year: "2019", production: "TV Globo", image: "/images/projetos/quando-voce-acredita-existe.webp" },
  { slug: "meu-filho-nunca-faria-isso", title: "Meu Filho Nunca Faria Isso", category: "tv", tvGroup: "programas", format: "Quadro do Fantástico", year: "2019", production: "TV Globo", image: "/images/projetos/meu-filho-nunca-faria-isso.webp" },
  { slug: "vai-fazer-o-que", title: "Vai Fazer o Quê?", category: "tv", tvGroup: "programas", format: "Quadro do Fantástico", year: "2016–2018", production: "TV Globo", image: "/images/projetos/vai-fazer-o-que.webp" },
  { slug: "zorra-total", title: "Zorra Total", category: "tv", tvGroup: "programas", year: "2011–2013", production: "TV Globo", image: "/images/projetos/zorra-total.webp" },
  { slug: "as-aventuras-do-didi", title: "As Aventuras do Didi", category: "tv", tvGroup: "programas", year: "2010–2011", production: "TV Globo", image: u("1546872006-42c78c0ccb29") },
  { slug: "tv-globinho", title: "TV Globinho", category: "tv", tvGroup: "programas", year: "2009–2011", production: "TV Globo", image: u("1695213484783-bb55b01adf34") },
  { slug: "tv-xuxa", title: "TV Xuxa", category: "tv", tvGroup: "programas", year: "2005–2008", production: "TV Globo", image: "/images/projetos/tv-xuxa.webp" },
  { slug: "linha-direta", title: "Linha Direta e Linha Direta Justiça", category: "tv", tvGroup: "programas", year: "2006–2007", production: "TV Globo", image: "/images/projetos/linha-direta.webp" },
  { slug: "cena-aberta", title: "Cena Aberta", category: "tv", tvGroup: "programas", year: "2003", production: "TV Globo / Casa de Cinema de Porto Alegre", image: "/images/projetos/cena-aberta.webp" },
  { slug: "caca-talentos", title: "Caça Talentos", category: "tv", tvGroup: "programas", year: "1997–1998", production: "TV Globo", image: "/images/projetos/caca-talentos.webp" },
  { slug: "tempero-de-familia", title: "Tempero de Família – Café da Manhã", category: "tv", tvGroup: "programas", year: "2020", image: u("1604073788733-f01b27fe34cd") },
  { slug: "vilas-que-amamos", title: "Vilãs que Amamos", category: "tv", tvGroup: "programas", year: "2019", platform: "Canal VIVA", image: u("1580518337843-f959e992563b") },
  { slug: "sem-malas", title: "Sem Malas", category: "tv", tvGroup: "programas", format: "Projeto-piloto", year: "2011–2013", production: "Independente", image: u("1777146464379-c527ae8c92f0") },
  { slug: "expo-food", title: "Expo Food", category: "tv", tvGroup: "programas", year: "2011", image: u("1762291629616-3e2c044c79a0") },
  { slug: "fashion-business", title: "Fashion Business", category: "tv", tvGroup: "programas", year: "2011", image: u("1529229504105-4ea795dcbf59") },
  { slug: "band-folia", title: "Band Folia", category: "tv", tvGroup: "programas", year: "1999–2005", platform: "TV Bandeirantes", image: u("1761229660731-891484da5c35") },
];

/** Créditos, vídeos e matérias enviados pela cliente (documento "Novas inserções 2023 e 2026"). */
const projectDetails: Record<string, Partial<Project>> = {
  olga: {
    description: undefined,
    direction: "Jayme Monjardim",
    role: "Direção de testes de elenco e assistente do diretor durante as filmagens",
  },
  "rock-story": {
    trailer: "https://www.imdb.com/pt/video/vi2375006489/",
    press: [
      "http://gshow.globo.com/novelas/rock-story/",
      "http://teledramaturgia.com.br/rock-story/",
      "https://gente.ig.com.br/tvenovela/2017-06-01/rock-story-final.html",
      "https://noticiasdatv.uol.com.br/noticia/opiniao/com-vila-impetuosa-em-rock-story-alinne-moraes-chega-ao-auge-na-carreira--14243",
      "https://oplanetatv.clickgratis.com.br/blogs/curtas-e-quentes/rock-story-chega-ao-fim-uma-das-novelas-mais-agradaveis-das-sete.html",
      "https://telepadi.folha.uol.com.br/pare-tudo-e-va-ver-reprise-belo-capitulo-final-de-rock-story/",
    ],
  },
  "quando-voce-acredita-existe": {
    press: [
      "https://kogut.oglobo.globo.com/noticias-da-tv/noticia/2019/09/francisco-cuoco-fara-especial-de-fim-de-ano-na-globo.html",
      "https://kogut.oglobo.globo.com/noticias-da-tv/noticia/2019/10/tony-tornado-fara-especial-de-fim-de-ano-da-globo.html",
      "https://rd1.com.br/globo-prepara-especial-de-natal-com-milton-goncalves-e-francisco-cuoco/",
    ],
  },
  "meu-filho-nunca-faria-isso": {
    press: [
      "https://istoe.com.br/tag/meu-filho-nunca-faria-isso/",
      "https://catracalivre.com.br/entretenimento/novo-quadro-do-fantastico-expoe-imagem-de-adolescentes/",
      "https://g1.globo.com/fantastico/quadros/meu-filho-nunca-faria-isso/noticia/2019/10/27/meu-filho-nunca-faria-isso-seu-filho-tomaria-alguma-atitude-diante-de-um-assedio-sexual.ghtml",
    ],
  },
  "vai-fazer-o-que": {
    press: [
      "https://g1.globo.com/fantastico/quadros/vai-fazer-o-que/",
      "http://g1.globo.com/fantastico/quadros/Vai-fazer-o-que/noticia/2017/12/mae-descobre-no-caixa-que-nao-tem-dinheiro-para-brinquedo-do-filho.html",
    ],
  },
  "segunda-chamada": {
    press: [
      "https://gshow.globo.com/series/segunda-chamada/",
      "https://www.ocanal.com.br/globo/apos-teste-globo-muda-horario-de-segunda-chamada/",
      "https://observatoriodatelevisao.bol.uol.com.br/noticia-da-tv/2019/10/conheca-a-historia-de-segunda-chamada-nova-serie-da-globo",
      "https://kogut.oglobo.globo.com/noticias-da-tv/critica/noticia/2019/10/globo-lanca-segunda-chamada-serie-imperdivel-sobre-escola-de-adultos.html",
    ],
  },
  aruanas: {
    press: [
      "https://gshow.globo.com/series/aruanas/",
      "https://f5.folha.uol.com.br/multitela/2019/07/serie-aruanas-que-retrata-a-vida-de-ativistas-ambientais-chega-ao-streaming.shtml",
      "https://telepadi.folha.uol.com.br/globo-lanca-aruanas-em-portugal-serie-traduz-para-o-mundo-tragedia-ambiental-brasileira/",
    ],
  },
  "segundo-sol": {
    press: [
      "https://gshow.globo.com/novelas/segundo-sol/",
      "https://observatoriodatelevisao.bol.uol.com.br/novelas/segundo-sol",
      "https://veja.abril.com.br/entretenimento/os-acertos-e-erros-de-segundo-sol/",
      "https://observatoriodatelevisao.bol.uol.com.br/noticia-da-tv/2019/08/era-uma-necessidade-diz-fabricio-boliveira-sobre-papel-em-segundo-sol",
      "https://veja.abril.com.br/entretenimento/fabricio-boliveira-de-segundo-sol-faltam-papeis-centrais-para-negros/",
    ],
  },
  "se-eu-fechar-os-olhos-agora": {
    press: [
      "https://g1.globo.com/pop-arte/noticia/2019/09/19/sob-pressao-e-se-eu-fechar-os-olhos-agora-sao-indicados-ao-premio-emmy.ghtml",
      "https://br.noticias.yahoo.com/paulo-rocha-aparece-careca-e-irreconhecivel-em-minisserie-da-globo-211626264.html",
      "https://gshow.globo.com/series/se-eu-fechar-os-olhos-agora/",
      "https://noticiasdatv.uol.com.br/noticia/televisao/cinco-motivos-para-ver-se-eu-fechar-os-olhos-agora-e-acreditar-no-futuro-da-tv-26090",
      "http://teledramaturgia.com.br/se-eu-fechar-os-olhos-agora/",
      "https://defatoonline.com.br/minisserie-gravada-em-catas-altas-concorre-ao-emmy-internacional-2019/",
    ],
  },
  "nada-sera-como-antes": {
    press: [
      "https://globoplay.globo.com/nada-sera-como-antes/t/5szkv52s1K/",
      "http://gshow.globo.com/series/nada-sera-como-antes/",
      "http://teledramaturgia.com.br/nada-sera-como-antes/",
      "https://observatoriodatelevisao.bol.uol.com.br/critica-de-tv/2016/12/nada-sera-como-antes-termina-como-uma-das-melhores-series-nacionais-de-2016",
    ],
  },
  babilonia: {
    press: ["http://gshow.globo.com/novelas/babilonia/", "https://www.purepeople.com.br/famosos/novela-babilonia_p3183"],
  },
  vizinhos: { trailer: "https://www.youtube.com/watch?v=IaV-OO-Mwx0" },
  "depois-do-universo": {
    trailer: "https://www.youtube.com/watch?v=8OkqLOe_mZI",
    curiosities: [
      "Estreia da cantora Giulia Be como atriz.",
      "Primeiro filme brasileiro do ator Henrique Zaga.",
      "Giulia Be compôs uma música exclusivamente para o filme.",
    ],
    videos: ["https://www.youtube.com/watch?v=DwY36fs3c_E"],
    press: [
      "https://about.netflix.com/pt_br/news/beyond-the-universe-a-film-starring-henrique-zaga-and-giulia-be-premieres",
      "https://rollingstone.uol.com.br/cinema/depois-do-universo-sinopse-elenco-e-tudo-o-que-sabemos-sobre-romance-da-netflix-com-giulia-be-lista/",
      "https://www.agazeta.com.br/colunas/rafael-braz/depois-do-universo-drama-romantico-da-netflix-e-quase-muito-bom-1122",
      "https://canaltech.com.br/cinema/depois-do-universo-conheca-o-filme-brasileiro-que-e-sucesso-na-netflix-229287/",
      "https://www.techtudo.com.br/noticias/2022/11/depois-do-universo-veja-sinopse-trailer-e-elenco-do-filme-da-netflix-streaming.ghtml",
      "https://www.zappeando.com.br/filmes/depois-do-universo-virou-top-10-global-da-netflix-filme-emociona-o-publico",
      "https://istoe.com.br/me-doei-por-inteira-diz-giulia-be-sobre-filme-depois-do-universo/",
      "https://extra.globo.com/tv-e-lazer/veja-sete-curiosidades-sobre-giulia-be-depois-do-universo-filme-que-o-quarto-de-lingua-nao-inglesa-mais-visto-da-netflix-25602473.html",
      "https://www.zappeando.com.br/filmes/giulia-be-compos-musicas-para-depois-do-universo-conheca-atriz-e-cantora",
    ],
  },
  sexa: {
    format: "Longa-metragem",
    year: "2025",
    direction: "Glória Pires",
    cast: "Glória Pires, Tiago Martins, Danilo Mesquita, Isabel Fillardis, Luana Tanaka",
    description: "Longa-metragem protagonizado e dirigido por Glória Pires.",
    trailer: "https://www.youtube.com/watch?v=Xl5A20vdaog",
    press: [
      "https://www.estadao.com.br/cultura/cinema/gloria-pires-estreia-na-direcao-com-sexa-comedia-que-retrata-envelhecimento-sem-tabus-catarse/",
      "https://www.ibahia.com/agenda-cultural/cinema/sexa-filme-dirigido-e-protagonizado-por-gloria-pires-estreia-no-brasil-349155",
    ],
  },
  "cacilda-becker-em-cena-aberta": {
    direction: "Julia Moraes",
    cast: "Débora Falabella, Daniel Haidar, Mariana Ximenez, Julia Stocker, Augusto Madeira",
  },
  "rio-de-sangue": {
    format: "Longa-metragem",
    year: "2026",
    direction: "Gustavo Bonafé",
    cast: "Giovanna Antonelli, Alice Wegman, Antônio Calloni, Rui Ricardo Dias, Ravel Andrade, Felipe Simas",
    trailer: "https://www.youtube.com/watch?v=QYk4tt6pLOk",
  },
  "o-genio-do-crime": {
    format: "Longa-metragem",
    year: "2026",
    direction: "Lipe Binder",
    kidsCast: "Francisco Galvão, Bella Alelaf, Samuel Estevam, Breno Kaneto",
    cast: "Marcos Veras, Aílton Graça, Estevam Nabote, Douglas Silva, Thelmo Fernandes",
    trailer: "https://www.youtube.com/watch?v=fU7JkJyw4oo",
  },
  "cinco-contra-um": { format: "Curta-metragem", year: "2022", direction: "Chico Amorim" },
  "no-ano-que-vem": {
    cast: "Julia Lemmertz, Jennifer Dias, Eduardo Moscovis",
    videos: [
      "https://www.youtube.com/watch?v=HirVL0hr5BQ",
      "https://www.youtube.com/watch?v=TTJWQJOYLE0",
      "https://www.youtube.com/watch?v=gpSH1fnHirA",
    ],
  },
  "vidas-bandidas": {
    platform: "Disney+",
    direction: "Gustavo Bonafé",
    trailer: "https://www.youtube.com/watch?v=D2v8SdBq6Do",
    press: [
      "https://rollingstone.com.br/entretenimento/onde-assistir-a-vidas-bandidas-nova-serie-com-juliana-paes-e-thomas-aquino/",
      "https://fotografia.folha.uol.com.br/galerias/1807945291964711-imagens-da-serie-vidas-bandidas-1-temporada",
    ],
  },
  "beleza-fatal": {
    year: "2025",
    platform: "HBO Max",
    direction: "Maria de Médicis, Giovanna Machline, Matheus Senra e Rafael Miranda",
    cast: "Camila Pitanga, Giovanna Antonelli, Camila Queiroz",
    trailer: "https://www.youtube.com/watch?v=FH2AKrfuwCQ",
    press: [
      "https://www.terra.com.br/vida-e-estilo/beleza-fatal-5-motivos-para-assistir-a-nova-novela-brasileira-de-streaming,2b03ab0111d3a805060907193aec2066eaz0nqjt.html",
      "https://portalleodias.com/colunas/flavio-ricco",
    ],
  },
  passinho: {
    format: "Série",
    year: "2024",
    platform: "Disney+",
    direction: "Jéssica Queiroz e Marton Olímpio",
    cast: "Giullie, João Gabriel D’Aleluia, Duda Pimenta, Tati Tibúrcio, André Ramiro, Digão Ribeiro",
  },
  "clube-da-esquina": {
    videos: [
      "https://globoplay.globo.com/v/11120011/",
      "https://globoplay.globo.com/podcasts/episode/conversa-com-bial/1b9c5f85-43e5-41e1-ba9e-34a90cdb0c87/",
      "https://www.youtube.com/watch?v=QTEXwDI6Rkw",
      "https://www.youtube.com/watch?v=AU-M_dtr43M",
    ],
    press: [
      "https://oglobo.globo.com/rioshow/noticia/2022/09/musical-sobre-clube-da-esquina-e-destaque-na-programacao-de-teatro-do-rio-de-janeiro.ghtml",
      "https://oglobo.globo.com/cultura/teatro/noticia/2022/06/clube-da-esquina-inspira-novo-musical-dirigido-por-dennis-carvalho.ghtml",
      "https://www.em.com.br/app/noticia/cultura/2022/08/19/interna_cultura,1387517/o-musical-clube-da-esquina-os-sonhos-nao-envelhecem-estreia-em-bh.shtml",
      "https://catracalivre.com.br/agenda/clube-da-esquina-musical-teatro-rio-de-janeiro/",
      "https://gshow.globo.com/tudo-mais/pop/noticia/musical-sobre-o-clube-da-esquina-celebra-50-anos-do-movimento-e-exalta-a-amizade-delirio-coletivo.ghtml",
      "https://revistaquem.globo.com/noticias/noticia/2022/10/clube-da-esquina-os-sonhos-nao-envelhecem-tem-impecavel-tiago-barbosa-como-milton-nascimento.ghtml",
      "https://telaviva.com.br/23/03/2023/musical-clube-da-esquina-os-sonhos-nao-envelhecem-estreia-em-pracas-publicas-e-nos-cinemas/",
      "https://abroadwayeaqui.com.br/2023/03/24/musical-clube-da-esquina-os-sonhos-nao-envelhecem-sera-transmitido-em-praca-publica-no-interior-de-sp/",
    ],
  },
  "iron-o-homem-da-mascara-de-ferro": {
    videos: ["https://www.youtube.com/watch?v=DmzazUPeMZQ", "https://www.youtube.com/watch?v=A7273QrnAxo"],
    press: [
      "https://www.cenamusical.com.br/coletiva-do-musical-iron-o-homem-da-mascara-de-ferro/",
      "https://guia.folha.uol.com.br/teatro/2023/08/musical-iron-o-homem-da-mascara-de-ferro-em-sp-transforma-epico-em-balada-com-o-publico.shtml",
      "https://cultura.uol.com.br/radio/programas/estacao-cultura/2023/08/31/1341_musical-imersivo-revisita-o-homem-da-mascara-de-ferro.html",
      "https://eurbanidade.com.br/critica-iron-o-homem-da-mascara-de-ferro-direcao-ulysses-cruz/",
    ],
    quote: {
      text: "Um dos grandes acertos de Iron — O Homem Da Máscara De Ferro, sem dúvida, é na escolha dos atores e atrizes para as personagens.",
      source: "eUrbanidade",
      url: "https://eurbanidade.com.br/critica-iron-o-homem-da-mascara-de-ferro-direcao-ulysses-cruz/",
    },
  },
  perfeita: {
    cast: "Sérgio Guizé",
    press: [
      "https://www.abcdoabc.com.br/sergio-guize-sol-menezzes-e-gustavo-machado-protagonizam-o-espetaculo-perfeita/",
      "https://www.blogdoarcanjo.com/2024/11/07/critica-perfeita-antecipa-futuro-distopico-em-potente-encontro-de-samir-yazbek-e-ulysses-cruz/",
      "https://vejasp.abril.com.br/coluna/teatro/perfeita-peca-sergio-guize-gustavo-machado-sol-menezzes/",
    ],
  },
  "susi-o-musical": {
    format: "Musical",
    year: "2026",
    direction: "Ulysses Cruz",
    cast: "Priscilla Alcântara, Bruna Guerin, Clara Verdier, Ariane Souza, Luana Tanaka",
    videos: ["https://www.tiktok.com/@bnewsoficial/video/7592787750772952341"],
    press: [
      "https://entretenimento.r7.com/prisma/r7-teatro/priscilla-e-anunciada-como-a-boneca-susi-em-musical-que-revive-icone-da-infancia-brasileira-07012026/",
      "https://entretenimento.r7.com/prisma/r7-teatro/priscilla-surge-caracterizada-como-a-boneca-susi-para-musical-em-sao-paulo-veja-fotos-15022026/",
    ],
  },
  "meu-filho-e-um-musical": {
    format: "Musical",
    year: "2026",
    direction: "Juliana Amaral e João Fonseca",
    videos: ["https://www.youtube.com/watch?v=uwExxljbnuI"],
    press: [
      "https://revistaquem.globo.com/entretenimento/teatro/noticia/2026/08/dea-lucia-se-emociona-em-estreia-de-musical-sobre-o-filho-paulo-gustavo-em-sp.ghtml",
    ],
  },
};

/** Produções com material oficial da hero usam esse banner no lugar da foto provisória. */
export const projects: Project[] = projectList.map((p) => {
  const merged = { ...p, ...projectDetails[p.slug] };
  return merged.heroImage ? { ...merged, image: merged.heroImage } : merged;
});

/** Nome do veículo a partir do endereço da matéria/vídeo. */
const outlets: Record<string, string> = {
  "about.netflix.com": "Netflix",
  "rollingstone.uol.com.br": "Rolling Stone",
  "rollingstone.com.br": "Rolling Stone",
  "agazeta.com.br": "A Gazeta",
  "canaltech.com.br": "Canaltech",
  "techtudo.com.br": "TechTudo",
  "zappeando.com.br": "Zappeando",
  "istoe.com.br": "IstoÉ",
  "extra.globo.com": "Extra",
  "estadao.com.br": "Estadão",
  "ibahia.com": "iBahia",
  "fotografia.folha.uol.com.br": "Folha de S.Paulo",
  "guia.folha.uol.com.br": "Guia Folha",
  "terra.com.br": "Terra",
  "portalleodias.com": "Portal Leo Dias",
  "oglobo.globo.com": "O Globo",
  "em.com.br": "Estado de Minas",
  "catracalivre.com.br": "Catraca Livre",
  "gshow.globo.com": "Gshow",
  "revistaquem.globo.com": "Quem",
  "telaviva.com.br": "Tela Viva",
  "abroadwayeaqui.com.br": "A Broadway é Aqui",
  "cenamusical.com.br": "Cena Musical",
  "cultura.uol.com.br": "Rádio Cultura",
  "eurbanidade.com.br": "eUrbanidade",
  "abcdoabc.com.br": "ABC do ABC",
  "blogdoarcanjo.com": "Blog do Arcanjo",
  "vejasp.abril.com.br": "Veja SP",
  "entretenimento.r7.com": "R7",
  "globoplay.globo.com": "Globoplay",
  "kogut.oglobo.globo.com": "O Globo · Kogut",
  "rd1.com.br": "RD1",
  "g1.globo.com": "g1",
  "ocanal.com.br": "O Canal",
  "observatoriodatelevisao.bol.uol.com.br": "Observatório da TV",
  "f5.folha.uol.com.br": "F5 · Folha",
  "telepadi.folha.uol.com.br": "Telepadi · Folha",
  "veja.abril.com.br": "Veja",
  "br.noticias.yahoo.com": "Yahoo Notícias",
  "noticiasdatv.uol.com.br": "Notícias da TV",
  "teledramaturgia.com.br": "Teledramaturgia",
  "defatoonline.com.br": "DeFato Online",
  "gente.ig.com.br": "iG Gente",
  "oplanetatv.clickgratis.com.br": "O Planeta TV",
  "purepeople.com.br": "Purepeople",
  "youtube.com": "YouTube",
  "tiktok.com": "TikTok",
  "imdb.com": "IMDb",
};
export const outletOf = (url: string) => {
  const host = new URL(url).hostname.replace(/^www\./, "");
  return outlets[host] ?? host;
};
export const youtubeId = (url: string) => url.match(/(?:v=|youtu\.be\/)([\w-]{11})/)?.[1];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const byCategory = (c: Category) => projects.filter((p) => p.category === c);

/** Produções que passam na montagem da hero, em ordem. */
export const heroReel = ["olga", "vai-que-cola-2", "depois-do-universo", "se-eu-fechar-os-olhos-agora", "segunda-chamada", "segundo-sol", "beleza-fatal"]
  .map((s) => getProject(s)!)
  .filter(Boolean);

/** Mini bio enviada pela cliente; o PDF em /public (miniBioPdf) foi gerado com este mesmo texto. */
export const miniBio = [
  "Formada em Artes Cênicas e Pedagogia, pós-graduada em Direção para Teledramaturgia e pós-graduanda em Criação de Conteúdos Digitais. Diretora de elenco há 30 anos.",
  "Autora dos livros 111 Monólogos Originais para Atores Contemporâneos (2021) e 111 Monólogos Originais para Jovens Atores Contemporâneos (2024).",
  "Integrou por 18 anos a equipe de produtores de elenco da TV Globo, atuando em novelas como Segundo Sol, Rock Story, Babilônia, Joia Rara e Senhora do Destino, além dos programas Zorra Total, TV Xuxa, Linha Direta e o especial Cena Aberta.",
  "Ainda na emissora, foi responsável pela pesquisa e montagem de elenco de séries como Segunda Chamada, Aruanas, Nada Será Como Antes e Se Eu Fechar os Olhos Agora, indicada ao 47º Emmy Internacional.",
  "Selecionou e preparou o elenco da novela angolana Reviravolta, a convite da Televisão Pública de Angola (TPA). No cinema, trabalhou em O Último Cine Drive-In, A Floresta que se Move, Vestido pra Casar e Olga. Seus longas mais recentes foram Rio de Sangue (dir. Gustavo Bonafé), Sexa (dir. Glória Pires), O Gênio do Crime (dir. Lipe Binder) e Cacilda Becker em Cena Aberta (dir. Juli Moraes), ainda sem data de lançamento.",
  "No teatro, atuou nas montagens de O Leão no Inverno, Rio + Brasil: O Nosso Musical, Iron: O Homem da Máscara de Ferro (dir. Ulysses Cruz), Cinderella (Moeller & Botelho) e Clube da Esquina: Os Sonhos Não Envelhecem (dir. Dennis Carvalho). Em 2026, foi responsável pelos elencos de Susi, o Musical (dir. Ulysses Cruz) e Meu Filho é um Musical (dir. João Fonseca), sobre a trajetória do humorista Paulo Gustavo.",
  "Para o streaming: Dom de Iludir (Netflix), Beleza Fatal (HBO Max), Depois do Universo e Vizinhos (Netflix), Da Mood (RTP), Vidas Bandidas e Passinho – o Ritmo dos Sonhos (Disney+), entre outros projetos ainda inéditos.",
];
export const miniBioPdf = "/mini-bio-vanessa-veiga.pdf";

export const contact = {
  email: "vveiga@contato.com.br",
  phone: "+55 88 96543-8765",
  phoneHref: "tel:+5588965438765",
  instagram: "https://www.instagram.com/vanessaveigaworking/",
  instagramHandle: "@vanessaveigaworking",
  imdb: "https://www.imdb.com/pt/name/nm3706431/",
};

export const nav = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Projetos", href: "/projetos" },
  { label: "Livros", href: "/livros" },
  { label: "Contato", href: "/contato" },
];

export const process = [
  { n: "01", title: "Pesquisa de talentos", text: "Pesquisa específica de perfis e intérpretes de acordo com o universo, a linguagem e as necessidades de cada projeto.", image: u("1532170579297-281918c8ae72") },
  { n: "02", title: "Triagem de perfis", text: "Análise e organização de talentos para identificar possibilidades alinhadas às características dos personagens.", image: u("1616840420121-7ad8ed885f11") },
  { n: "03", title: "Seleção de talentos", text: "Identificação de intérpretes considerando as exigências artísticas e técnicas da produção.", image: u("1594211185595-f42d6b758ab9") },
  { n: "04", title: "Direção de testes", text: "Condução de testes de elenco para avaliar interpretações, possibilidades e conexões com os personagens.", image: u("1644718847151-fff2271484a1") },
  { n: "05", title: "Escalação de elenco", text: "Composição do elenco de acordo com as especificidades narrativas, técnicas e artísticas de cada projeto.", image: u("1550026593-f369f98df0af") },
];

export type Review = {
  /** Sem nome quando a plataforma não informou o autor */
  name?: string;
  rating: number;
  /** AAAA-MM-DD */
  date: string;
  /** Título da avaliação (Amazon) */
  title?: string;
  text?: string;
  /** Onde a avaliação foi publicada, ex.: "Amazon" */
  source?: string;
  verified?: boolean;
  /** Conta na nota, mas o texto não é exibido (ex.: pedido de suporte) */
  hideText?: boolean;
};

export type Book = {
  slug: string;
  title: string;
  description: string;
  /** Texto completo da página do livro (parágrafos separados por linha em branco); sem ele, usa a description */
  about?: string;
  /** Linha "Conteúdo" da ficha, ex.: "111 monólogos originais" */
  contents?: string;
  /** Ex.: "E-book", "Capa dura" */
  format?: string;
  publisher?: string;
  edition?: string;
  /** AAAA-MM-DD */
  published?: string;
  language?: string;
  pages?: number;
  isbn10?: string;
  isbn13?: string;
  weight?: string;
  dimensions?: string;
  /** Ainda não informados: aparecem no card assim que preenchidos */
  year?: string;
  role?: string;
  cover?: string;
  /** Link da página de compra (Hotmart etc.). Sem ele, o botão leva ao contato. */
  buyUrl?: string;
  /** Preço exibido acima do botão, ex.: "R$ 49,90" */
  price?: string;
  reviews?: Review[];
  /** Cor da capa provisória, enquanto não chega a capa oficial */
  tone: string;
};

export const books: Book[] = [
  {
    slug: "111-monologos-originais-para-atores-contemporaneos",
    title: "111 Monólogos Originais para Atores Contemporâneos (Volume 1)",
    description:
      "Um monólogo satisfatório para apresentação aos produtores de elenco e diretores deve possuir as seguintes características: ter entre um e dois minutos de duração, possibilitar ao menos duas transições de emoção e, principalmente, caber “na boca” do intérprete com fluidez.",
    about: [
      "Em algum momento, todo ator lidará com a realidade de gerar vídeos de testes em sua própria casa. Com a evolução das câmeras de celular, a execução deste material tornou-se mais apurada e acessível.",
      "Muitos projetos têm sido produzidos não só pelos players convencionais, mas também pelas vorazes plataformas de streaming que elevaram os formatos existentes a níveis jamais vistos, tornando imperativo que o ator tenha capacidade de gerir-se com qualidade e eficiência.",
      "Um monólogo satisfatório para apresentação aos produtores de elenco e diretores deve possuir as seguintes características: ter entre um e dois minutos de duração, possibilitar ao menos duas transições de emoção e, principalmente, caber “na boca” do intérprete com fluidez.",
      "Por todos estes motivos, 111 Monólogos Originais para Atores Contemporâneos é uma ferramenta essencial para qualquer ator que deseje exercitar-se para dominar o processo de audição. Procure um monólogo que possua um tema que o (a) emocione ou que tenha a ver com o teste para o qual te convidaram e... bote pra quebrar! 😉",
    ].join("\n\n"),
    year: "2021",
    contents: "111 monólogos originais",
    format: "Impresso",
    publisher: "ShowTime",
    edition: "1ª",
    published: "2021-07-30",
    language: "Português",
    pages: 242,
    isbn10: "9893702941",
    isbn13: "978-9893702949",
    weight: "340 g",
    dimensions: "16 × 1,4 × 24 cm",
    cover: "/images/livros/111-monologos-atores-capa.webp",
    tone: "#141414",
    reviews: [
      { name: "Marcus", rating: 5, date: "2025-04-02", title: "Livro obrigatório para quem quer praticar a arte da interpretação", text: "Amei o livro!!", source: "Amazon", verified: true },
      { name: "Cristiane calixto", rating: 5, date: "2024-07-15", title: "Maravilhoso", text: "Comprei e não recebi ainda, mas conheço e sei que é excelente", source: "Amazon" },
      { name: "Patrícia", rating: 5, date: "2023-08-01", title: "Indico!", text: "Ótimo! Já estou utilizando.", source: "Amazon", verified: true },
      { name: "Osmar", rating: 5, date: "2021-03-23" },
      { name: "Caroline", rating: 5, date: "2021-03-02", text: "Estou amando estudar os monólogos!!!!! Vale a pena!!" },
      { name: "Antonio", rating: 5, date: "2020-12-03", text: "Acredito que é um material super necessário para atores/atrizes. Adorei." },
      { name: "Juliana", rating: 5, date: "2020-09-28", text: "Adorei poder exercitar com o conteúdo do livro. Recomendo para todos os atores!" },
      { name: "Beatriz", rating: 5, date: "2020-09-04" },
      { name: "Ana", rating: 5, date: "2020-08-07", text: "Amei o livro! Era tudo que eu tava precisando e correspondeu muito bem às expectativas!! Super recomendo! Gratidão!" },
      { name: "Sandro", rating: 5, date: "2020-08-06" },
      {
        name: "Leonardo",
        rating: 5,
        date: "2020-07-28",
        text: "Não consigo abrir o conteúdo. Cadastrei a senha. Mas qd vou abrir, coloco a senha e aparece incorreta. Já tentei muitas vezes. O que fazer?",
        hideText: true,
      },
      { name: "Fernanda", rating: 5, date: "2020-07-27", text: "Excelente material." },
      {
        name: "Mario",
        rating: 5,
        date: "2020-07-14",
        text: "E-book fundamental para todo ator e atriz!!! Nunca encontrei nada parecido!!! É a famosa mão na roda!!! Já quero o segundo!!! Livro NECESSÁRIO!!! Bravo !!!",
      },
      {
        name: "Marianne",
        rating: 5,
        date: "2020-07-08",
        text: "Vanessa tem um dom de saber colocar tanta vida dentro de poucas frases. E é exatamente isso que fazem os 111 monólogos serem diferentes de todos os outros que encontramos. E por serem tantas histórias, a gente acaba se identificando com várias, e dá vontade de ler cada vez mais, e colocá-los em prática. Indico de olhos fechados.",
      },
      { name: "Carina", rating: 5, date: "2020-07-06" },
      { name: "Rafaela", rating: 5, date: "2020-07-06", text: "Ótima fonte para estudo e prática de atrizes e atores." },
      {
        name: "Alexsandro",
        rating: 5,
        date: "2020-07-05",
        text: "Comecei a ler hoje e já estou me identificando com vários textos. Não consigo parar de ler e reler... Com certeza vai ajudar muitos atores a aprimorarem seus talentos. O produto é realmente excelente, de fácil assimilação e uso. Didática exemplar e conteúdo extremamente útil para profissionais e estudantes da área, principalmente por vir de alguém que tem uma visão aguçada de mercado e sabe das necessidades de atores, produtores, diretores... Gratidão Vanessa!",
      },
      {
        name: "Dandara",
        rating: 5,
        date: "2020-07-02",
        text: "Desde que comecei a ler esse e-book não consegui mais parar. Me identifiquei com muitos textos e estou com vontade de experimentar vários deles. Este material é riquíssimo e com certeza vai orientar muitos atores que desejam se aprimorar, a começar por mim. Obrigada Vanessa por tamanha sensibilidade e carinho com nossa profissão!!",
      },
      {
        rating: 5,
        date: "2020-07-02",
        text: "Excelente ideia, excelente livro! Mal comecei a ler e já estou empolgada com tanto material incrível - fora a visão de mundo e de mercado por trás, que muito ressoa em mim. Ter um livro com monólogos pensados por alguém que entende as reais necessidades de um ator é um presente. Amando!! Recomendo muito ♥️",
      },
    ],
  },
  {
    slug: "111-monologos-originais-para-jovens-atores-contemporaneos",
    title: "111 Monólogos Originais para Jovens Atores Contemporâneos",
    description:
      "Sejam crianças, adolescentes ou adultos, atores precisam de cuidado, orientação e prática do ofício, exercitando-se constantemente para o trabalho, colocando o corpo e a mente em função da personagem.",
    about:
      "Sejam crianças, adolescentes ou adultos, atores precisam de cuidado, orientação e prática do ofício, exercitando-se constantemente para o trabalho, colocando o corpo e a mente em função da personagem. Neste livro, Vanessa nos presenteia com monólogos infanto-juvenis modernos e naturalistas, conteúdo importante para jovens atores, seus pais e preparadores que frequentemente buscam textos bons e compatíveis com a linguagem do mercado audiovisual para atualizar os materiais de trabalho de seus filhos / alunos.",
    year: "2024",
    contents: "111 monólogos originais",
    format: "Capa dura",
    publisher: "Ipê das Letras",
    published: "2024-07-30",
    language: "Português",
    pages: 256,
    isbn10: "9893752922",
    isbn13: "978-9893752920",
    weight: "620 g",
    dimensions: "16 × 1,6 × 24 cm",
    cover: "/images/livros/111-monologos-jovens-atores-capa.webp",
    tone: "#5c1220",
  },
  {
    slug: "11-monologos-para-quem-tem-pressa",
    title: "11 Monólogos para Quem Tem Pressa (Volume 1)",
    description: "Com versões em inglês.",
    contents: "11 monólogos, com versões em inglês",
    cover: "/images/livros/11-monologos-para-quem-tem-pressa-capa.webp",
    tone: "#f5c400",
  },
];

export const getBook = (slug: string) => books.find((b) => b.slug === slug);

/** Nota média e total de avaliações; null quando não há avaliações. */
export function bookRating(b: Book) {
  const r = b.reviews ?? [];
  if (!r.length) return null;
  return { average: r.reduce((s, x) => s + x.rating, 0) / r.length, count: r.length };
}
