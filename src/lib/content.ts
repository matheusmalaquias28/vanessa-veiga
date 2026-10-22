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
};

const u = (id: string, w = 2000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const portraits = {
  hero: "/images/vanessa/retrato-capa.webp",
  about: u("1515138692129-197a2c608cfd"),
  aboutAlt: u("1533392151650-269f96231f65"),
  contact: u("1562901169-5bf47e283c3a"),
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
    tagline: "Personagens que ganham vida nas grandes telas.",
    cta: "Explorar cinema",
    image: "/images/areas/cinema.webp",
    tone: "#141414",
    ink: "light",
  },
  streaming: {
    label: "Streaming",
    href: "/projetos/streaming",
    tagline: "Novas plataformas. Novos encontros. Novas histórias.",
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

export const categoryOrder: Category[] = ["cinema", "streaming", "teatro", "tv"];

export const projects: Project[] = [
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
    image: u("1579255971440-9849401c74b6"),
    featured: true,
  },
  { slug: "vestido-pra-casar", title: "Vestido pra Casar", category: "cinema", image: u("1540076156429-35ffe82b7870") },
  { slug: "christabel", title: "Christabel", category: "cinema", image: u("1519220407669-06f9912b4aca") },
  { slug: "o-ultimo-cine-drive-in", title: "O Último Cine Drive-in", category: "cinema", image: u("1528051918192-ea3f5f11907d") },
  { slug: "dia-de-preto", title: "Dia de Preto", category: "cinema", image: u("1556912300-3017f3de2aa6") },
  { slug: "sexa", title: "Sexa", category: "cinema", image: u("1556229868-7b2d4b56b909") },
  { slug: "rio-de-sangue", title: "Rio de Sangue", category: "cinema", image: u("1542460533-50ac46fb13d7") },
  { slug: "o-genio-do-crime", title: "O Gênio do Crime", category: "cinema", image: u("1762979772530-81c3a60f5010") },
  {
    slug: "cacilda-becker-em-cena-aberta",
    title: "Cacilda Becker em Cena Aberta",
    category: "cinema",
    image: u("1546872006-42c78c0ccb29"),
    status: "em-desenvolvimento",
  },
  { slug: "cinco-contra-um", title: "Cinco Contra Um", category: "cinema", image: u("1695213484783-bb55b01adf34") },

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
    image: u("1604073788733-f01b27fe34cd"),
    featured: true,
  },
  {
    slug: "vizinhos",
    title: "Vizinhos",
    category: "streaming",
    format: "Longa-metragem",
    platform: "Netflix",
    cast: "Leandro Hassum, Julia Ribeiro, Paulinho Gogó",
    description: "Com Leandro Hassum, Julia Ribeiro e Paulinho Gogó.",
    image: u("1580518337843-f959e992563b"),
  },
  {
    slug: "vidas-bandidas",
    title: "Vidas Bandidas",
    category: "streaming",
    format: "Série",
    year: "2024",
    cast: "Juliana Paes, Thomaz Aquino, Rodrigo Simas",
    description: "Com Juliana Paes, Thomaz Aquino e Rodrigo Simas.",
    image: u("1777146464379-c527ae8c92f0"),
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
    image: u("1762291629616-3e2c044c79a0"),
  },
  {
    slug: "passinho",
    title: "Passinho",
    category: "streaming",
    image: u("1529229504105-4ea795dcbf59"),
    status: "em-desenvolvimento",
  },

  // ─── Teatro ───────────────────────────────────────────────
  {
    slug: "clube-da-esquina",
    title: "Clube da Esquina: Os Sonhos Não Envelhecem",
    category: "teatro",
    format: "Musical",
    year: "2022",
    direction: "Dennis Carvalho",
    description: "Um espetáculo musical inspirado no universo artístico do Clube da Esquina.",
    image: u("1585699324551-f6c309eedeca"),
    featured: true,
  },
  {
    slug: "iron-o-homem-da-mascara-de-ferro",
    title: "Iron: O Homem da Máscara de Ferro",
    category: "teatro",
    format: "Musical",
    direction: "Ulysses Cruz",
    image: u("1774967550635-182fb37cf31f"),
  },
  {
    slug: "perfeita",
    title: "Perfeita",
    category: "teatro",
    year: "2024",
    direction: "Ulysses Cruz",
    image: u("1579539760267-b2e78d9d735e"),
  },
  { slug: "o-leao-no-inverno", title: "O Leão no Inverno", category: "teatro", image: u("1762786113000-fa587fd3d69c") },
  { slug: "rio-mais-brasil", title: "Rio + Brasil", category: "teatro", image: u("1550026593-cb89847b168d") },
  { slug: "o-nosso-musical", title: "O Nosso Musical", category: "teatro", image: u("1560088161-ca82e528afc9") },
  { slug: "cinderella", title: "Cinderella", category: "teatro", image: u("1508807526345-15e9b5f4eaff") },
  { slug: "susi-o-tempo-dispara", title: "Susi, o Tempo Dispara", category: "teatro", image: u("1761229660731-891484da5c35") },
  { slug: "meu-filho-e-um-musical", title: "Meu Filho é um Musical", category: "teatro", image: u("1503095396549-807759245b35") },

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
    production: "TV Globo / Maria Farinha Filmes",
    image: u("1532800783378-1bed60adaf58"),
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
    image: u("1725221673945-8574b7091f55"),
  },
  { slug: "malhacao", title: "Malhação", category: "tv", tvGroup: "dramaturgia", image: u("1568038479111-87bf80659645") },
  {
    slug: "se-eu-fechar-os-olhos-agora",
    title: "Se Eu Fechar os Olhos Agora",
    category: "tv",
    tvGroup: "dramaturgia",
    image: u("1496156555893-ce6408188e2c"),
    heroImage: "/images/projetos/se-eu-fechar-os-olhos-agora.webp",
    heroInsetImage: "/images/projetos/posters/se-eu-fechar-os-olhos-agora.webp",
    heroPoster: "/images/projetos/posters/full/se-eu-fechar-os-olhos-agora.webp",
  },
  { slug: "nada-sera-como-antes", title: "Nada Será Como Antes", category: "tv", tvGroup: "dramaturgia", image: u("1606920669741-c8ba74262a94") },
  { slug: "babilonia", title: "Babilônia", category: "tv", tvGroup: "dramaturgia", image: u("1725288453683-3d3a6ec420ec") },
  { slug: "zorra-total", title: "Zorra Total", category: "tv", tvGroup: "programas", image: u("1767455471230-c0957aba5034") },
  { slug: "caca-talentos", title: "Caça Talentos", category: "tv", tvGroup: "programas", image: u("1585951237313-1979e4df7385") },
  { slug: "tv-xuxa", title: "TV Xuxa", category: "tv", tvGroup: "programas", image: u("1471341971476-ae15ff5dd4ea") },
  { slug: "linha-direta", title: "Linha Direta", category: "tv", tvGroup: "programas", image: u("1607287214260-c78e5ebcafee") },
  { slug: "cena-aberta", title: "Cena Aberta", category: "tv", tvGroup: "programas", image: u("1615414047026-802692414b79") },
  { slug: "vai-fazer-o-que", title: "Vai Fazer o Quê?", category: "tv", tvGroup: "programas", image: u("1522712004038-9005ebdcddfb") },
  { slug: "meu-filho-nunca-faria-isso", title: "Meu Filho Nunca Faria Isso", category: "tv", tvGroup: "programas", image: u("1668570001021-e5448a58b7b2") },
  { slug: "quando-voce-acredita-existe", title: "Quando Você Acredita, Existe", category: "tv", tvGroup: "programas", image: u("1622427479715-4f2b1f320707") },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const byCategory = (c: Category) => projects.filter((p) => p.category === c);

/** Produções que passam na montagem da hero, em ordem. */
export const heroReel = ["olga", "vai-que-cola-2", "depois-do-universo", "se-eu-fechar-os-olhos-agora", "segunda-chamada", "segundo-sol", "beleza-fatal"]
  .map((s) => getProject(s)!)
  .filter(Boolean);

export const contact = {
  email: "vveiga@contato.com.br",
  phone: "+55 88 96543-8765",
  phoneHref: "tel:+5588965438765",
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

export type Book = {
  title: string;
  description: string;
  /** Ainda não informados: aparecem no card assim que preenchidos */
  year?: string;
  role?: string;
  cover?: string;
  link?: string;
  /** Cor da capa provisória, enquanto não chega a capa oficial */
  tone: string;
};

export const books: Book[] = [
  {
    title: "111 Monólogos Originais para Atores Contemporâneos (Volume 1)",
    description:
      "Um monólogo satisfatório para apresentação aos produtores de elenco e diretores deve possuir as seguintes características: ter entre um e dois minutos de duração, possibilitar ao menos duas transições de emoção e, principalmente, caber “na boca” do intérprete com fluidez.",
    cover: "/images/livros/111-monologos-atores.webp",
    tone: "#141414",
  },
  {
    title: "111 Monólogos Originais para Jovens Atores Contemporâneos",
    description:
      "Sejam crianças, adolescentes ou adultos, atores precisam de cuidado, orientação e prática do ofício, exercitando-se constantemente para o trabalho, colocando o corpo e a mente em função da personagem.",
    cover: "/images/livros/111-monologos-jovens-atores.webp",
    tone: "#5c1220",
  },
];
