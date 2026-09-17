import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Eye,
  ExternalLink,
  Code2,
  Braces,
  Terminal,
  Database,
  GitBranch,
  Boxes,
  Palette,
  Cpu,
  Send,
  Download,
  Award,
  Loader2,
} from "lucide-react";
import { LangProvider, LanguageToggle, TRANSLATIONS, useLang } from "./i18n.jsx";
import { RESUME_PAGE } from "./config.js";


/* ============================================================================
 * DADOS EDITÁVEIS
 * Troque os valores abaixo pelos seus dados reais. Campos com `{ pt, en }`
 * guardam o mesmo texto nos dois idiomas — edite os dois lados.
 * ==========================================================================*/

// ---- Identidade / Hero -----------------------------------------------------
const PROFILE = {
  name: "Luccas F", // <- EDITAR: seu nome / logo do header
  role: {
    pt: ["Desenvolvedor", "Full Stack"],
    en: ["Full Stack", " Developer"],
  }, // <- EDITAR: cargo em 2 linhas
  tagline: {
    pt: "Eu crio produtos digitais rápidos, acessíveis e bem projetados, do backend à interface. Gosto de transformar problemas complexos em experiências simples, com foco em performance e boa arquitetura.",
    en: "I build fast, accessible, well-designed digital products, from backend to interface. I enjoy turning complex problems into simple experiences, with a focus on performance and solid architecture.",
  }, // <- EDITAR: parágrafo curto do hero
  githubUrl: "https://github.com/luccasformicki",
  linkedinUrl: "https://www.linkedin.com/in/luccas-formicki/",
  email: "luccas.formicki@outlook.com",
  // O PDF do currículo e a URL da página dedicada ficam em src/config.js.
};

// ---- Seção "Sobre mim" ------------------------------------------------------
const ABOUT = {
  paragraphs: {
    pt: [
      "Sou desenvolvedor full stack e estudante de Análise e Desenvolvimento de Sistemas na FIAP, além de técnico em Desenvolvimento de Sistemas formado pela ETEC. Construo aplicações de ponta a ponta, com Java e Spring Boot no backend e React com Next.js e TypeScript no frontend.",
      "Antes de programar profissionalmente, passei dois anos em suporte técnico e infraestrutura — hardware, redes e sistemas de vídeo em eventos corporativos ao vivo, onde falha não tem plano B e ninguém quer ouvir explicação técnica. Aprendi ali a diagnosticar problema rápido, trabalhar sob pressão e traduzir o que é técnico para quem não é.",
      "Hoje aplico isso construindo software: autenticação JWT, APIs REST, modelagem de dados e deploy automatizado com GitHub Actions. Gosto de projeto que resolve um problema real de alguém — de preferência um que eu mesmo já tive.",
    ],
    en: [
      "I'm a full-stack developer and an Analysis and Systems Development student at FIAP, as well as a Systems Development technician graduated from ETEC. I build end-to-end applications with Java and Spring Boot on the backend and React, Next.js, and TypeScript on the frontend.",
      "Before programming professionally, I spent two years in technical support and infrastructure, working with hardware, networks, and video systems at live corporate events, where failure has no backup plan and nobody wants a technical explanation. I learned to diagnose problems quickly, work under pressure, and translate technical concepts for non-technical people.",
      "Today I apply that experience to building software: JWT authentication, REST APIs, data modeling, and automated deployment with GitHub Actions. I like projects that solve a real problem for someone, preferably one I've faced myself.",
    ],
  }, // <- EDITAR: 2 ou 3 parágrafos sobre você
};

// ---- Seção "Experiência" ----------------------------------------------------
// <- EDITAR: adicione, remova ou reordene experiências. A mais recente primeiro.
const EXPERIENCE = [
  {
    id: 1,
    company: "Rolê Organizado",
    role: { pt: "Desenvolvedor Full Stack (Freelancer)", en: "Full Stack Developer (Freelancer)" },
    period: { pt: "Set 2025 — Atual", en: "Sep 2025 — Present" },
    description: {
      pt: "Desenvolvimento da plataforma de ponta a ponta: Java com Spring Boot no backend e React com Next.js e TypeScript no frontend. Implementei autenticação JWT, integração de APIs REST com React Query e modelagem de dados em arquitetura de três camadas. Trabalho em ciclos curtos direto com os fundadores, transformando requisito de negócio em entrega técnica, com versionamento em Git e deploy automatizado via GitHub Actions.",
      en: "End-to-end development of the platform: Java with Spring Boot on the backend and React with Next.js and TypeScript on the frontend. Implemented JWT authentication, REST API integration with React Query, and data modeling in a three-layer architecture. Work in short cycles directly with the founders, turning business requirements into technical deliveries with Git versioning and automated deployment via GitHub Actions.",
    },
  },
  {
    id: 2,
    company: "Freelancer",
    role: { pt: "Suporte Técnico e Infraestrutura", en: "Technical Support and Infrastructure" },
    period: { pt: "2022 — Atual", en: "2022 — Present" },
    description: {
      pt: "Atuação freelancer e sazonal para Demarchi, Beltrat, AMCO, Editora Lire, Sitaxx e Vagas.com. Responsável por redes, sistemas de vídeo e infraestrutura em eventos corporativos ao vivo. Diagnóstico e resolução de incidentes em tempo real, sem janela de manutenção e sem margem para retrabalho. Coordenei equipes técnicas em campo e fui o ponto de contato entre o time técnico e clientes não técnicos.",
      en: "Seasonal freelance work for Demarchi, Beltrat, AMCO, Editora Lire, Sitaxx, and Vagas.com. Responsible for networks, video systems, and infrastructure at live corporate events. Diagnosed and resolved incidents in real time, with no maintenance window or room for rework. Coordinated on-site technical teams and acted as the liaison between technical staff and non-technical clients.",
    },
  },
  {
    id: 3,
    company: "CARMESP",
    role: { pt: "Suporte Técnico", en: "Technical Support" },
    period: { pt: "Mai 2024 — Abr 2026", en: "May 2024 — Apr 2026" },
    description: {
      pt: "Atendimento a chamados de hardware, software e rede para os colaboradores, com manutenção preventiva e corretiva de equipamentos. Estruturei controles e análises em planilhas para reduzir trabalho manual e apoiar decisões da operação.",
      en: "Handled hardware, software, and network support requests for employees, including preventive and corrective equipment maintenance. Built spreadsheet controls and analyses to reduce manual work and support operational decisions.",
    },
  },
];

// ---- Seção "Linguagens e Ferramentas" --------------------------------------
// <- EDITAR: adicione, remova ou troque os itens desta lista livremente.
// `certificado` só recebe uma URL quando existe um PDF real para abrir.
const TECNOLOGIAS = [
  { nome: "JavaScript", certificado: null },
  { nome: "TypeScript", certificado: null },
  { nome: "React", certificado: null },
  { nome: "Node.js", certificado: null },
  { nome: "Java", certificado: "/certificados/java-fiap.pdf" },
  { nome: "Python", certificado: null },
  { nome: "PostgreSQL", certificado: null },
  { nome: "Docker", certificado: null },
  { nome: "Terraform", certificado: null },
  { nome: "Git", certificado: null },
  { nome: "Figma", certificado: null },
  { nome: "Salesforce", certificado: null, status: "em-andamento" },
];

const TECHNOLOGY_ICONS = {
  JavaScript: Braces,
  TypeScript: Code2,
  React: Boxes,
  "Node.js": Terminal,
  Java: Code2,
  Python: Terminal,
  PostgreSQL: Database,
  Docker: Cpu,
  Terraform: Cpu,
  Git: GitBranch,
  Figma: Palette,
  Salesforce: Boxes,
};

const PRIMARY_TECHNOLOGIES = [
  "Java",
  "Python",
  "JavaScript",
  "Node.js",
];

// ---- Seção "Projetos" -------------------------------------------------------
const PROJETOS = [
  {
    destaque: true,
    titulo: "Sensitivity Finder",
    status: "concluido",
    descricao:
      "Ferramenta para jogadores de CS e Valorant descobrirem a sensibilidade ideal de mira. Em vez de tentativa e erro, o jogador faz rodadas curtas de teste e o sistema analisa o desempenho para sugerir o valor que funciona melhor para ele.",
    tags: ["JavaScript", "HTML", "CSS"],
    demo: null,
    codigo: null,
  },
  {
    titulo: "Extensão de acessibilidade",
    status: "em-andamento",
    descricao:
      "Extensão de navegador que aplica ajustes de leitura em qualquer página: aumento de fonte, controle de contraste, espaçamento entre linhas e fonte para dislexia. A ideia é tornar a web utilizável para quem tem baixa visão sem depender de o site ter sido feito com acessibilidade.",
    tags: ["JavaScript", "HTML", "CSS", "Chrome Extensions API"],
    demo: null,
    codigo: null,
  },
  {
    titulo: "E-commerce de moda",
    status: "em-andamento",
    descricao:
      "Loja online para uma cliente do meu bairro: catálogo de produtos, carrinho e painel administrativo para ela gerenciar estoque e pedidos sozinha. Em fase final, aguardando hospedagem.",
    tags: [],
    demo: null,
    codigo: null,
  },
  {
    titulo: "Site institucional — Recupcred",
    status: "em-andamento",
    descricao:
      "Site institucional para a Recupcred, focado em apresentar os serviços da empresa e converter visitante em contato.",
    tags: [],
    demo: null,
    codigo: null,
  },
  {
    titulo: "Plataforma de estudo de inglês",
    status: "planejado",
    descricao:
      "Aplicação de estudo de inglês com foco em vocabulário e repetição espaçada. Nasceu de uma dificuldade minha — construir a ferramenta faz parte do processo de aprender.",
    tags: [],
    demo: null,
    codigo: null,
  },
];

const FEATURED_PROJECT = PROJETOS.find((project) => project.destaque);
const PROJECTS = PROJETOS.filter((project) => !project.destaque);

// ---- Navegação (header e sidebar numerada, 00 a 05) ------------------------
const SECTIONS = [
  { id: "hero", number: "00" },
  { id: "sobre", number: "01" },
  { id: "experiencia", number: "02" },
  { id: "skills", number: "03" },
  { id: "projetos", number: "04" },
  { id: "contato", number: "05" },
];

/* ============================================================================
 * CONTEXTOS
 * ==========================================================================*/

// Idioma ativo + tradutor

// Direção da rolagem, guardada em ref e lida pelas seções ao animar
const ScrollDirectionContext = createContext({ current: "down" });

// `prefers-reduced-motion`
const ReducedMotionContext = createContext(false);

// Estado de revelação (visível / direção / fase) da seção mais próxima
const SectionRevealContext = createContext({ visible: true, dir: "down", phase: "visible" });

/* ============================================================================
 * HOOKS
 * ==========================================================================*/

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/* ============================================================================
 * COMPONENTES DE APOIO
 * ==========================================================================*/

function GlassCard({ className = "", children, ...props }) {
  return (
    <div
      {...props}
      className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl ${className}`}
    >
      {children}
    </div>
  );
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---- Animação de entrada/saída sensível à direção da rolagem --------------*/

// Envolve uma <section>: observa quando ela entra/sai da viewport e
// disponibiliza esse estado (visível, direção, fase) para os <Reveal> internos.
function AnimatedSection({ id, className = "", children }) {
  const sectionRef = useRef(null);
  const directionRef = useContext(ScrollDirectionContext);
  const [reveal, setReveal] = useState({ visible: false, dir: "down", phase: "before" });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setReveal((prev) => ({
          visible: entry.isIntersecting,
          dir: directionRef.current,
          phase: entry.isIntersecting
            ? "visible"
            : prev.phase === "visible"
            ? "after"
            : "before",
        }));
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [directionRef]);

  return (
    <section id={id} ref={sectionRef} className={className}>
      <SectionRevealContext.Provider value={reveal}>{children}</SectionRevealContext.Provider>
    </section>
  );
}

// Envolve um elemento interno da seção (título, parágrafo, botão, imagem...).
// `index` define o atraso do stagger (cascata) em relação aos outros Reveal
// da mesma seção.
function Reveal({ index = 0, className = "", children }) {
  const reveal = useContext(SectionRevealContext);
  const reducedMotion = useContext(ReducedMotionContext);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const exiting = reveal.phase === "after";
  // Descendo: entra vindo de cima (-), sai deslizando pra baixo (+).
  // Subindo: entra vindo de baixo (+), sai deslizando pra cima (-).
  const sign = reveal.dir === "down" ? (exiting ? 1 : -1) : exiting ? -1 : 1;
  const offset = reveal.visible ? 0 : sign * 48;

  return (
    <div
      className={`transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${className}`}
      style={{
        transform: `translateY(${offset}px)`,
        opacity: reveal.visible ? 1 : 0,
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {children}
    </div>
  );
}


/* ---- Header fixo ------------------------------------------------------------*/
function Header() {
  const { t } = useLang();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/85 backdrop-blur-md md:bg-transparent md:backdrop-blur-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-6">
        <button
          onClick={() => scrollToSection("hero")}
          className="text-white font-bold tracking-tight text-lg hover:text-[#B026B0] transition-colors duration-300"
        >
          {PROFILE.name} {/* <- EDITAR: exibido também como "logo" */}
        </button>

        <div className="flex items-center gap-3 md:gap-5">
          <div className={`${mobileMenuOpen ? "flex" : "hidden"} md:flex items-center gap-3 md:gap-5`}>
            <LanguageToggle />
            <button
              onClick={() => scrollToSection("contato")}
              className="text-sm text-white border border-white/40 rounded-full px-5 py-2 hover:border-[#B026B0] hover:text-[#B026B0] transition-colors duration-300"
            >
              {t.header.contact}
            </button>
          </div>
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Fechar opções" : "Abrir opções"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="md:hidden flex h-9 w-9 items-center justify-center text-white hover:text-[#B026B0] transition-colors duration-300"
          >
            <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${mobileMenuOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---- Sidebar direita: números 00–05 + trilho com segmento ativo -----------*/
const SIDEBAR_ITEM_HEIGHT = 32; // px
const SIDEBAR_GAP = 28; // px

function SectionSidebar({ activeIndex }) {
  const { t } = useLang();
  const trackHeight =
    SECTIONS.length * SIDEBAR_ITEM_HEIGHT + (SECTIONS.length - 1) * SIDEBAR_GAP;
  const activeTop = activeIndex * (SIDEBAR_ITEM_HEIGHT + SIDEBAR_GAP);

  return (
    <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden min-[995px]:flex items-stretch gap-4">
      <div className="flex flex-col" style={{ gap: SIDEBAR_GAP }}>
        {SECTIONS.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            style={{ height: SIDEBAR_ITEM_HEIGHT }}
            className={`flex items-center justify-center text-xs tracking-widest font-medium transition-colors duration-300 ${
              index === activeIndex ? "text-white" : "text-[#666666] hover:text-white/70"
            }`}
            aria-label={t.nav[section.id]}
            aria-current={index === activeIndex ? "true" : undefined}
          >
            {section.number}
          </button>
        ))}
      </div>

      {/* trilho vertical, à direita dos números */}
      <div className="relative w-px" style={{ height: trackHeight }}>
        <div className="absolute inset-0 bg-[#3A3A3A]" />
        <div
          className="absolute left-0 w-px bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.5)] transition-[top] duration-300 ease-out"
          style={{ height: SIDEBAR_ITEM_HEIGHT, top: activeTop }}
        />
      </div>
    </div>
  );
}

/* ---- "Scroll Down" vertical, canto inferior direito ------------------------*/
function ScrollDownHint({ activeIndex }) {
  const { t } = useLang();
  const isLastSection = activeIndex === SECTIONS.length - 1;
  const nextSection = isLastSection ? SECTIONS[0] : SECTIONS[activeIndex + 1];

  return (
    <button
      type="button"
      onClick={() => scrollToSection(nextSection.id)}
      aria-label={isLastSection ? t.backToTop : t.scrollDown}
      className="fixed bottom-8 right-4 min-[995px]:right-10 z-40 hidden min-[995px]:flex flex-col items-center gap-3 text-white/50 hover:text-white transition-colors duration-300"
    >
      <span
        className="text-[10px] tracking-[0.3em] select-none"
        style={{ writingMode: "vertical-rl" }}
      >
        {isLastSection ? t.backToTop : t.scrollDown}
      </span>
      {isLastSection ? (
        <ArrowUp className="w-4 h-4 text-[#B026B0]" />
      ) : (
        <ArrowDown className="w-4 h-4 text-[#B026B0] animate-bounce" />
      )}
    </button>
  );
}

/* ---- Botão flutuante do GitHub, canto inferior esquerdo --------------------*/
function GithubFloatingButton({ hidden }) {
  const { t } = useLang();
  return (
    <a
      href={PROFILE.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.githubAria}
      className={`${hidden ? "hidden" : "flex"} fixed bottom-8 left-6 md:left-10 z-40 w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 items-center justify-center text-white hover:border-[#B026B0] hover:text-[#B026B0] hover:scale-105 transition-all duration-300`}
    >
      <Github className="w-5 h-5" />
    </a>
  );
}

/* ============================================================================
 * SEÇÕES
 * ==========================================================================*/

/* ============================================================================
 * ANIMAÇÃO DE CÓDIGO DO HERO
 * Portado de hero-animation-preview.html. Lá o tokenizador roda UMA vez, antes
 * de animar; aqui o resultado já vem pronto como dado: cada linha é um array de
 * { t: texto, c: cor }. A digitação só revela caracteres — nada é recolorido
 * depois de escrito (o que causaria o efeito de piscar).
 * As cores vivem em variáveis CSS (.code-anim, em src/index.css).
 * ==========================================================================*/

const CODE = [
  [{ t: "# portfolio.py — movido a café", c: "comment" }],
  [],
  [
    { t: "projetos", c: "vardecl" },
    { t: " ", c: "plain" },
    { t: "=", c: "op" },
    { t: " [", c: "plain" },
  ],
  [
    { t: "    ", c: "plain" },
    { t: '"Sensitivity Finder"', c: "string" },
    { t: ",", c: "plain" },
  ],
  [
    { t: "    ", c: "plain" },
    { t: '"Extensão de acessibilidade"', c: "string" },
    { t: ",", c: "plain" },
  ],
  [
    { t: "    ", c: "plain" },
    { t: '"E-commerce de moda"', c: "string" },
    { t: ",", c: "plain" },
  ],
  [{ t: "]", c: "plain" }],
  [],
  [
    { t: "limpar_tela", c: "func" },
    { t: "()", c: "plain" },
  ],
  [
    { t: "print", c: "builtin" },
    { t: "(", c: "plain" },
    { t: '"Seja bem-vindo ao meu portfólio :D"', c: "string" },
    { t: ")", c: "plain" },
  ],
  [
    { t: "print", c: "builtin" },
    { t: "(", c: "plain" },
    { t: '"1. Ver meus projetos"', c: "string" },
    { t: ")", c: "plain" },
  ],
  [
    { t: "print", c: "builtin" },
    { t: "(", c: "plain" },
    { t: '"2. Falar comigo"', c: "string" },
    { t: ")", c: "plain" },
  ],
  [
    { t: "print", c: "builtin" },
    { t: "(", c: "plain" },
    { t: '"3. Sair (sério mesmo?)"', c: "string" },
    { t: ")", c: "plain" },
  ],
  [],
  [
    { t: "opcao", c: "vardecl" },
    { t: " ", c: "plain" },
    { t: "=", c: "op" },
    { t: " ", c: "plain" },
    { t: "input", c: "builtin" },
    { t: "(", c: "plain" },
    { t: '"Digite a opção: "', c: "string" },
    { t: ")", c: "plain" },
  ],
  [],
  [
    { t: "if", c: "keyword" },
    { t: " opcao ", c: "plain" },
    { t: "==", c: "op" },
    { t: " ", c: "plain" },
    { t: "'1'", c: "string" },
    { t: ":", c: "plain" },
  ],
  [
    { t: "    ", c: "plain" },
    { t: "for", c: "keyword" },
    { t: " ", c: "plain" },
    { t: "i", c: "vardecl" },
    { t: ", ", c: "plain" },
    { t: "p", c: "vardecl" },
    { t: " ", c: "plain" },
    { t: "in", c: "keyword" },
    { t: " ", c: "plain" },
    { t: "enumerate", c: "builtin" },
    { t: "(projetos, ", c: "plain" },
    { t: "start", c: "param" },
    { t: "=", c: "op" },
    { t: "1", c: "number" },
    { t: "):", c: "plain" },
  ],
  [
    { t: "        ", c: "plain" },
    { t: "print", c: "builtin" },
    { t: "(", c: "plain" },
    { t: 'f"| ', c: "string" },
    { t: "{", c: "keyword" },
    { t: "i", c: "plain" },
    { t: "}", c: "keyword" },
    { t: ". ", c: "string" },
    { t: "{", c: "keyword" },
    { t: "p", c: "plain" },
    { t: "}", c: "keyword" },
    { t: '"', c: "string" },
    { t: ")", c: "plain" },
  ],
  [],
  [
    { t: "elif", c: "keyword" },
    { t: " opcao ", c: "plain" },
    { t: "==", c: "op" },
    { t: " ", c: "plain" },
    { t: "'2'", c: "string" },
    { t: ":", c: "plain" },
  ],
  [
    { t: "    ", c: "plain" },
    { t: "try", c: "keyword" },
    { t: ":", c: "plain" },
  ],
  [
    { t: "        ", c: "plain" },
    { t: "interessou", c: "vardecl" },
    { t: " ", c: "plain" },
    { t: "=", c: "op" },
    { t: " ", c: "plain" },
    { t: "input", c: "builtin" },
    { t: "(", c: "plain" },
    { t: '"Se interessou por algo? (s/n) "', c: "string" },
    { t: ")", c: "plain" },
  ],
  [
    { t: "    ", c: "plain" },
    { t: "except", c: "keyword" },
    { t: " ", c: "plain" },
    { t: "ValueError", c: "class" },
    { t: ":", c: "plain" },
  ],
  [
    { t: "        ", c: "plain" },
    { t: "print", c: "builtin" },
    { t: "(", c: "plain" },
    { t: '"Opa! Só aceito s ou n :)"', c: "string" },
    { t: ")", c: "plain" },
  ],
  [],
  [
    { t: "    ", c: "plain" },
    { t: "if", c: "keyword" },
    { t: " interessou ", c: "plain" },
    { t: "==", c: "op" },
    { t: " ", c: "plain" },
    { t: "'s'", c: "string" },
    { t: ":", c: "plain" },
  ],
  [
    { t: "        ", c: "plain" },
    { t: "enviar_mensagem", c: "func" },
    { t: "(", c: "plain" },
    { t: '"Bora conversar!"', c: "string" },
    { t: ")", c: "plain" },
  ],
  [
    { t: "    ", c: "plain" },
    { t: "else", c: "keyword" },
    { t: ":", c: "plain" },
  ],
  [
    { t: "        ", c: "plain" },
    { t: "enviar_feedback", c: "func" },
    { t: "(", c: "plain" },
    { t: '"Me conta o que dá pra melhorar"', c: "string" },
    { t: ")", c: "plain" },
  ],
];

// Traceback do fim do ciclo — a "dica" é o convite pra continuar navegando.
// A primeira linha em branco separa o traceback do código, como na referência.
const ERROR_BLOCK = [
  [],
  [{ t: "Traceback (most recent call last):", c: "error" }],
  [{ t: '  File "portfolio.py", line 30, in <module>', c: "error" }],
  [{ t: "    contratar(desenvolvedor)", c: "error" }],
  [
    {
      t: "DesenvolvedorNotFoundError: 404 — desenvolvedor não encontrado",
      c: "error",
    },
  ],
  [],
  [{ t: "> dica: ele está logo abaixo, é só rolar a página :)", c: "hint" }],
  [{ t: "> reiniciando...", c: "muted" }],
  [],
];

// Tempos idênticos aos de hero-animation-preview.html.
const CHAR_MS = 22; // velocidade base da digitação
const CHAR_JITTER_MS = 9; // variação aleatória, somada (0..9), pra não parecer robô
const LINE_PAUSE_MS = 130; // respiro extra no fim de cada linha
const CYCLE_MS = 40000; // duração do ciclo inteiro, traceback incluído
const ERROR_HOLD_MS = 3000; // quanto tempo o erro fica na tela
const RESTART_MS = 500; // tela limpa antes de recomeçar
const MIN_HOLD_MS = 800; // piso do respiro antes do traceback
// Margem pra considerar "grudado no fim". Pequena de proposito: so absorve
// arredondamento de subpixel. Com os 40px da referencia, rolar uma unica linha
// (~22px) ainda contaria como "no fim" e o painel puxaria a pessoa de volta.
const STICK_THRESHOLD_PX = 8;

// Cada passo revela um caractere. Pré-calcular a lista reduz a animação a um
// índice, e `endOfLine` marca onde entra a pausa de fim de linha.
const TYPING_STEPS = (() => {
  const steps = [];
  CODE.forEach((tokens, line) => {
    if (tokens.length === 0) return;
    tokens.forEach((token, tokenIndex) => {
      for (let char = 1; char <= token.t.length; char += 1) {
        steps.push({
          line,
          token: tokenIndex,
          char,
          endOfLine: tokenIndex === tokens.length - 1 && char === token.t.length,
        });
      }
    });
  });
  return steps;
})();

const FULL_CODE = CODE.map((tokens) =>
  tokens.map((token) => token.t).join("")
).join("\n");

// Reconstrói as linhas visíveis a partir do índice do passo atual.
function typedLines(index) {
  if (index < 0) return [];
  const step = TYPING_STEPS[index];
  const tokens = CODE[step.line];
  const current = tokens.slice(0, step.token);
  if (step.char > 0) {
    const token = tokens[step.token];
    current.push({ t: token.t.slice(0, step.char), c: token.c });
  }
  return [...CODE.slice(0, step.line), current];
}

function CodeLine({ tokens, number, showCursor }) {
  return (
    <div className="flex">
      <span className="tok-linenr w-[26px] shrink-0 select-none pr-2 text-right">
        {number ?? " "}
      </span>
      <span className="min-w-0 flex-1">
        {tokens.map((token, i) => (
          <span key={i} className={`tok-${token.c}`}>
            {token.t}
          </span>
        ))}
        {showCursor ? <span className="code-cursor" /> : null}
      </span>
    </div>
  );
}

// Xícara do canto inferior direito — SVG inline, com vapor subindo.
function CoffeeCup() {
  return (
    <svg
      width="26"
      height="30"
      viewBox="0 0 26 30"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        {[
          { d: "M9 7V3", delay: "0s" },
          { d: "M13 7V2", delay: "0.5s" },
          { d: "M17 7V3", delay: "1s" },
        ].map((steam) => (
          <path
            key={steam.d}
            d={steam.d}
            className="code-steam"
            style={{ animationDelay: steam.delay }}
          />
        ))}
      </g>
      <path
        d="M4 12h15v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-7z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M19 14h2a3 3 0 0 1 0 6h-2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 27h17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeroCodeAnimation() {
  const { t } = useLang();
  const reducedMotion = useContext(ReducedMotionContext);

  const scrollRef = useRef(null);
  const stateRef = useRef({ index: -1, phase: "typing" });
  const elapsedRef = useRef(0);
  const resumeDelayRef = useRef(600);

  const [anim, setAnim] = useState(stateRef.current);
  const [atBottom, setAtBottom] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);

  // Rolar NÃO pausa: a digitação segue rodando enquanto a pessoa lê. O scroll
  // só decide se o painel acompanha o cursor (ver o useLayoutEffect abaixo).
  // A aba em segundo plano continua pausando, por bateria.
  const paused = tabHidden;

  useEffect(() => {
    const sync = () => setTabHidden(document.visibilityState === "hidden");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  // Motor da digitação: setTimeout encadeado (nunca setInterval). O progresso
  // mora em refs, então pausar/retomar só reexecuta o efeito de onde parou.
  useEffect(() => {
    if (reducedMotion || paused) return undefined;

    let timer = null;

    const commit = (next) => {
      stateRef.current = next;
      setAnim(next);
    };

    const schedule = (delay) => {
      resumeDelayRef.current = delay;
      timer = setTimeout(tick, delay);
    };

    function tick() {
      const { index, phase } = stateRef.current;

      if (phase === "typing") {
        const next = index + 1;
        if (next < TYPING_STEPS.length) {
          commit({ index: next, phase: "typing" });
          const delay =
            CHAR_MS +
            Math.random() * CHAR_JITTER_MS +
            (TYPING_STEPS[next].endOfLine ? LINE_PAUSE_MS : 0);
          elapsedRef.current += delay;
          schedule(delay);
          return;
        }
        // Terminou de escrever: segura na tela de modo que o traceback ainda
        // caiba dentro dos 40s do ciclo.
        commit({ index, phase: "holding" });
        const rest = Math.max(
          MIN_HOLD_MS,
          CYCLE_MS - ERROR_HOLD_MS - elapsedRef.current
        );
        elapsedRef.current += rest;
        schedule(rest);
        return;
      }

      if (phase === "holding") {
        commit({ index, phase: "error" });
        schedule(ERROR_HOLD_MS);
        return;
      }

      elapsedRef.current = 0;
      commit({ index: -1, phase: "typing" });
      schedule(RESTART_MS);
    }

    timer = setTimeout(tick, resumeDelayRef.current);
    return () => clearTimeout(timer);
  }, [reducedMotion, paused]);

  const lines = reducedMotion ? CODE : typedLines(anim.index);
  const showError = !reducedMotion && anim.phase === "error";

  // "Grudar no fim": o painel só acompanha o cursor enquanto estiver no fim.
  // useLayoutEffect para o ajuste acontecer antes da pintura (sem tremer).
  useLayoutEffect(() => {
    if (reducedMotion) return;
    const el = scrollRef.current;
    if (el && atBottom) el.scrollTop = el.scrollHeight;
  }, [anim, atBottom, reducedMotion]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    setAtBottom(distance <= STICK_THRESHOLD_PX);
  };

  return (
    <div className="code-anim relative flex w-full max-w-md aspect-square flex-col overflow-hidden rounded-3xl border border-[color:var(--code-border)] bg-[color:var(--code-bg)] shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
      {/* barra de título estilo editor */}
      <div className="flex shrink-0 items-center gap-[7px] border-b border-[color:var(--code-border)] bg-[color:var(--code-bar)] px-3.5 py-[11px]">
        <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />
        <span className="ml-2.5 font-mono text-[11.5px] text-[#6d6480]">
          portfolio.py
        </span>
      </div>

      {/* pb-14 reserva a faixa onde ficam a xícara e a pílula, pra elas nunca
          cobrirem o código; pr-4 afasta o texto da barra de rolagem. */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        tabIndex={0}
        role="region"
        aria-label={t.hero.codeAria}
        className="code-scroll relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden pb-14 pl-3 pr-4 pt-3"
      >
        <pre
          aria-hidden="true"
          className="whitespace-pre-wrap break-words font-mono text-[10.5px] leading-[1.75] sm:text-[11.5px] md:text-[12.5px]"
        >
          {lines.map((tokens, i) => (
            <CodeLine
              key={i}
              tokens={tokens}
              number={i + 1}
              showCursor={!reducedMotion && !showError && i === lines.length - 1}
            />
          ))}

          {showError
            ? ERROR_BLOCK.map((tokens, i) => (
                <CodeLine
                  key={`err-${i}`}
                  tokens={tokens}
                  showCursor={i === ERROR_BLOCK.length - 1}
                />
              ))
            : null}
        </pre>

        {/* leitores de tela recebem o código inteiro, sem a digitação */}
        <span className="sr-only">{FULL_CODE}</span>
      </div>

      {/* A pílula vem antes da xícara no DOM para ficar atrás dela. À direita
          ela reserva um vão de 26px — a largura exata do ícone, que fica por cima
          sem sair do lugar. À esquerda, pl-[52px] = os 12px de respiro mais 40px
          fixos, definidos na folha e não a partir do tamanho do texto. */}
      {!reducedMotion && !atBottom ? (
        <div className="pointer-events-none absolute bottom-3.5 right-1">
          <span className="inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-[#3a2f52] bg-[#201a2e] py-1.5 pl-[52px] pr-3 text-[10px] text-[#b9b1cc] sm:text-[11.5px]">
            {t.hero.codePaused}
            <span aria-hidden="true" className="w-[26px] shrink-0" />
          </span>
        </div>
      ) : null}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3.5 right-4 text-[color:var(--code-plain)] opacity-[0.42]"
      >
        <CoffeeCup />
      </div>
    </div>
  );
}

function Hero({ id }) {
  const { lang, t } = useLang();
  return (
    <AnimatedSection
      id={id}
      className="min-h-screen flex items-center px-6 md:px-10 pt-32 pb-20"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1">
          <Reveal index={1} className="inline-flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-[#C4C4C4] text-xs font-light">{t.hero.available}</span>
          </Reveal>

          <Reveal index={2}>
            <h1 className="mt-6 text-white font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight">
              {PROFILE.role[lang][0]}
              <br />
              {PROFILE.role[lang][1]}
            </h1>
          </Reveal>

          <Reveal index={3}>
            <p className="mt-6 max-w-md text-[#C4C4C4] font-light text-sm leading-relaxed">
              {PROFILE.tagline[lang]}
            </p>
          </Reveal>

          <Reveal index={4} className="mt-8 flex flex-wrap items-center gap-6">
            <button
              onClick={() => scrollToSection("sobre")}
              className="inline-flex items-center gap-2 text-[#B026B0] text-sm font-medium group"
            >
              {t.hero.aboutLink}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* No mobile, mantém a navegação na aba atual. */}
            <a
              href={RESUME_PAGE}
              className="inline-flex md:hidden items-center gap-2 text-sm text-white border border-white/30 rounded-full px-5 py-2.5 hover:border-[#B026B0] hover:text-[#B026B0] transition-colors duration-300"
            >
              <Download className="w-4 h-4" />
              {t.hero.resumeButton}
            </a>
            {/* Desktop mantém a página dedicada em uma nova aba. */}
            <a
              href={RESUME_PAGE}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 text-sm text-white border border-white/30 rounded-full px-5 py-2.5 hover:border-[#B026B0] hover:text-[#B026B0] transition-colors duration-300"
            >
              <Download className="w-4 h-4" />
              {t.hero.resumeButton}
            </a>
          </Reveal>
        </div>

        <Reveal index={0} className="order-1 md:order-2 flex items-center justify-center">
          <HeroCodeAnimation />
        </Reveal>
      </div>
    </AnimatedSection>
  );
}

function About({ id }) {
  const { lang, t } = useLang();
  return (
    <AnimatedSection id={id} className="min-h-screen flex items-center px-6 md:px-10 py-24">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-[1fr_1.3fr] gap-16 items-center">
        <Reveal index={0} className="order-1 md:order-1">
          <picture>
            <source srcSet="/foto-luccas.webp" type="image/webp" />
            <img
              src="/foto-luccas.jpg"
              alt="Luccas Formicki, desenvolvedor full stack"
              width="480"
              height="480"
              loading="lazy"
              decoding="async"
              className="w-full max-w-sm mx-auto md:mx-0 rounded-3xl border border-white/10 object-cover aspect-[6/7]"
            />
          </picture>
        </Reveal>

        <div className="order-2 md:order-2">
          <Reveal index={1}>
            <span className="text-[#B026B0] text-xs font-medium tracking-[0.3em]">
              {t.about.eyebrow}
            </span>
          </Reveal>
          <Reveal index={2}>
            <h2 className="mt-4 text-white font-bold text-3xl sm:text-4xl">{t.about.title}</h2>
          </Reveal>

          <div className="mt-6 space-y-4">
            {ABOUT.paragraphs[lang].map((p, i) => (
              <Reveal index={3 + i} key={i}>
                <p className="text-[#C4C4C4] font-light text-sm leading-relaxed">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function Experience({ id }) {
  const { lang, t } = useLang();
  return (
    <AnimatedSection id={id} className="min-h-screen flex items-center px-6 md:px-10 py-24">
      <div className="max-w-4xl mx-auto w-full">
        <Reveal index={0}>
          <span className="text-[#B026B0] text-xs font-medium tracking-[0.3em]">
            {t.experience.eyebrow}
          </span>
        </Reveal>
        <Reveal index={1}>
          <h2 className="mt-4 text-white font-bold text-3xl sm:text-4xl">
            {t.experience.title}
          </h2>
        </Reveal>

        <div className="mt-14 relative border-l border-white/10 pl-8 ml-2 space-y-12">
          {EXPERIENCE.map((exp, i) => (
            <Reveal index={2 + i} key={exp.id} className="relative">
              <span className="absolute -left-[41px] top-1.5 w-3 h-3 rounded-full bg-[#B026B0] ring-4 ring-[#0D0D0D]" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-white font-bold text-lg">{exp.company}</h3>
                <span className="text-[#B026B0] text-xs font-medium tracking-wide">
                  {exp.period[lang]}
                </span>
              </div>
              <p className="mt-1 text-[#C4C4C4] text-sm font-light">{exp.role[lang]}</p>
              <p className="mt-3 text-[#C4C4C4]/80 text-sm font-light leading-relaxed max-w-xl">
                {exp.description[lang]}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

function TechCard({ tech, index }) {
  const { t } = useLang();
  const Icon = TECHNOLOGY_ICONS[tech.nome];
  return (
    <Reveal index={index}>
      <GlassCard className="h-full flex flex-col items-center text-center gap-4 py-10 px-4 hover:border-[#B026B0]/50 hover:bg-white/[0.07] transition-all duration-300">
        <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
        <span className="text-[#C4C4C4] text-sm font-light">{tech.nome}</span>
        {/* Espaço reservado para o botão de certificado, mantém os cards alinhados */}
        <div className="mt-auto pt-2 h-9 flex items-center">
          {tech.status === "em-andamento" ? (
            <span className="text-[10px] text-[#C4C4C4]/70 border border-white/15 rounded-full px-3 py-1.5">
              {t.skills.certificationInProgress}
            </span>
          ) : tech.certificado !== null ? (
            <a
              href={tech.certificado}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white border border-white/30 rounded-full px-3.5 py-1.5 hover:border-[#B026B0] hover:text-[#B026B0] transition-colors duration-300"
            >
              <Award className="w-3.5 h-3.5" />
              {t.skills.certificateButton}
            </a>
          ) : null}
        </div>
      </GlassCard>
    </Reveal>
  );
}

function Skills({ id }) {
  const { t } = useLang();
  const [showAllTechnologies, setShowAllTechnologies] = useState(false);
  const primaryTechnologies = PRIMARY_TECHNOLOGIES.map((name) =>
    TECNOLOGIAS.find((tech) => tech.nome === name)
  ).filter(Boolean);
  const mobileTechnologies = showAllTechnologies ? TECNOLOGIAS : primaryTechnologies;

  return (
    <AnimatedSection id={id} className="min-h-screen flex items-center px-6 md:px-10 py-24">
      <div className="max-w-7xl mx-auto w-full">
        <Reveal index={0}>
          <span className="text-[#B026B0] text-xs font-medium tracking-[0.3em]">
            {t.skills.eyebrow}
          </span>
        </Reveal>
        <Reveal index={1}>
          <h2 className="mt-4 text-white font-bold text-3xl sm:text-4xl">{t.skills.title}</h2>
        </Reveal>

        <div className="desktop-technologies mt-12 hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-fr">
          {TECNOLOGIAS.map((tech, i) => (
            <TechCard key={tech.nome} tech={tech} index={2 + i} />
          ))}
        </div>

        <div className="mobile-technologies mt-8 md:hidden">
          <div className="grid grid-cols-2 gap-4 auto-rows-fr">
            {mobileTechnologies.map((tech, i) => (
              <TechCard key={tech.nome} tech={tech} index={2 + i} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowAllTechnologies((showAll) => !showAll)}
            className="mx-auto mt-6 flex items-center gap-2 text-xs text-[#C4C4C4] border border-white/20 rounded-full px-4 py-2 hover:border-[#B026B0] hover:text-white transition-colors duration-300"
          >
            {showAllTechnologies ? "Mostrar menos" : "Ver todas as tecnologias"}
            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showAllTechnologies ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
}

function FeaturedProject() {
  const { t } = useLang();
  return (
    <Reveal index={2} className="mb-16">
      <GlassCard className="grid md:grid-cols-2 gap-0 overflow-hidden">
        <img
          src={`https://placehold.co/900x600/141414/B026B0?text=${encodeURIComponent(FEATURED_PROJECT.titulo)}`}
          alt={FEATURED_PROJECT.titulo}
          className="w-full h-full object-cover aspect-video md:aspect-auto"
        />
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <span className="text-[#B026B0] text-xs font-medium tracking-[0.3em]">
            {t.projects.featuredLabel}
          </span>
          <h3 className="mt-3 text-white font-bold text-2xl sm:text-3xl">
            {FEATURED_PROJECT.titulo}
          </h3>
          <ProjectStatusBadge status={FEATURED_PROJECT.status} />
          <p className="mt-4 text-[#C4C4C4] font-light text-sm leading-relaxed">
            {FEATURED_PROJECT.descricao}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {FEATURED_PROJECT.tags.map((techName) => (
              <span
                key={techName}
                className="text-xs text-[#C4C4C4] border border-white/10 rounded-full px-3 py-1"
              >
                {techName}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {FEATURED_PROJECT.demo || FEATURED_PROJECT.codigo ? (
              <a
                href={FEATURED_PROJECT.demo || FEATURED_PROJECT.codigo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium bg-[#B026B0] text-white rounded-full px-5 py-2.5 hover:bg-[#c136c1] transition-colors duration-300"
              >
                Ver mais
              </a>
            ) : null}
          </div>
        </div>
      </GlassCard>
    </Reveal>
  );
}

function ProjectStatusBadge({ status }) {
  const { t } = useLang();
  const statusStyles = {
    concluido: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    "em-andamento": "border-[#B026B0]/40 bg-[#B026B0]/10 text-[#d77ad7]",
    planejado: "border-white/15 bg-white/5 text-white/55",
  };

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[10px] font-medium ${statusStyles[status]}`}
    >
      {t.projects.status[status]}
    </span>
  );
}

function ProjectFilter({ techs, active, onChange }) {
  const { t } = useLang();
  return (
    <Reveal index={3} className="desktop-project-filter hidden md:flex flex-wrap gap-3">
      <button
        onClick={() => onChange(t.projects.filterAll)}
        className={`text-xs font-medium rounded-full px-4 py-2 transition-colors duration-300 ${
          active === t.projects.filterAll
            ? "bg-[#B026B0] text-white"
            : "text-[#C4C4C4] border border-white/20 hover:border-[#B026B0] hover:text-[#B026B0]"
        }`}
      >
        {t.projects.filterAll}
      </button>
      {techs.map((techName) => (
        <button
          key={techName}
          onClick={() => onChange(techName)}
          className={`text-xs font-medium rounded-full px-4 py-2 transition-colors duration-300 ${
            active === techName
              ? "bg-[#B026B0] text-white"
              : "text-[#C4C4C4] border border-white/20 hover:border-[#B026B0] hover:text-[#B026B0]"
          }`}
        >
          {techName}
        </button>
      ))}
    </Reveal>
  );
}

function ProjectCard({ project, index, mobile = false }) {
  const { lang, t } = useLang();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(project.likes ?? 0);
  const projectUrl = project.demo || project.codigo;
  const pointerStartRef = useRef(null);
  const wasDraggedRef = useRef(false);

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const openProject = () => {
    if (mobile && projectUrl) window.open(projectUrl, "_blank", "noopener,noreferrer");
  };

  const handleProjectKeyDown = (event) => {
    if (mobile && projectUrl && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      openProject();
    }
  };

  const handlePointerDown = (event) => {
    if (!mobile) return;
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
    wasDraggedRef.current = false;
  };

  const handlePointerMove = (event) => {
    if (!mobile || !pointerStartRef.current) return;
    const movedX = Math.abs(event.clientX - pointerStartRef.current.x);
    const movedY = Math.abs(event.clientY - pointerStartRef.current.y);
    if (movedX > 8 || movedY > 8) wasDraggedRef.current = true;
  };

  const handlePointerEnd = () => {
    pointerStartRef.current = null;
  };

  const handleProjectClick = () => {
    if (wasDraggedRef.current) {
      wasDraggedRef.current = false;
      return;
    }
    openProject();
  };

  return (
    <Reveal index={index} className={mobile ? "min-w-0" : "min-w-[86vw] snap-start md:min-w-0"}>
      <GlassCard
        onClick={handleProjectClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onKeyDown={handleProjectKeyDown}
        role={mobile && projectUrl ? "link" : undefined}
        tabIndex={mobile && projectUrl ? 0 : undefined}
        className={`group overflow-hidden flex flex-col hover:border-white/20 transition-colors duration-300 ${
          mobile && projectUrl ? "cursor-pointer" : ""
        }`}
      >
        <div className="relative overflow-hidden">
          <img
            src={`https://placehold.co/600x400/141414/B026B0?text=${encodeURIComponent(project.titulo)}`}
            alt={project.titulo}
            className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Botão de curtir */}
          <button
            onClick={(event) => {
              event.stopPropagation();
              toggleLike();
            }}
            aria-label="Curtir projeto"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center transition-transform duration-200 hover:scale-110"
          >
            <Heart
              className={`w-4 h-4 transition-colors duration-200 ${
                liked ? "fill-[#B026B0] text-[#B026B0]" : "text-white"
              }`}
            />
          </button>

          {/* Contador de visualizações, fade-in apenas no hover */}
          <div
            className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label={`${(project.views ?? 0).toLocaleString(lang === "pt" ? "pt-BR" : "en-US")} ${
              t.projects.viewsLabel
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            {(project.views ?? 0).toLocaleString(lang === "pt" ? "pt-BR" : "en-US")}
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-white font-bold text-lg">{project.titulo}</h3>
          <ProjectStatusBadge status={project.status} />
          <p className="mt-2 text-[#C4C4C4] text-sm font-light leading-relaxed flex-1">
            {project.descricao}
          </p>

          {!mobile ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-[#C4C4C4] border border-white/10 rounded-full px-2.5 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-3 flex items-center gap-1.5 text-white/40 text-xs">
            <Heart className="w-3 h-3" />
            {likes} {t.projects.likesLabel}
          </div>

          <div className="mt-6 hidden items-center gap-3 md:flex">
            {project.demo || project.codigo ? (
              <a
                href={project.demo || project.codigo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center text-sm font-medium bg-[#B026B0] text-white rounded-full px-4 py-2.5 hover:bg-[#c136c1] transition-colors duration-300"
              >
                Ver mais
              </a>
            ) : null}
          </div>
        </div>
      </GlassCard>
    </Reveal>
  );
}

function MobileProjectCarousel({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStartRef = useRef(null);

  useEffect(() => {
    setActiveIndex(0);
  }, [projects]);

  const goToProject = (nextIndex) => {
    setActiveIndex(Math.max(0, Math.min(nextIndex, projects.length - 1)));
  };

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event) => {
    const start = pointerStartRef.current;
    pointerStartRef.current = null;
    if (!start) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    const horizontalDistance = Math.abs(deltaX);
    const verticalDistance = Math.abs(deltaY);
    const isIntentionalHorizontalSwipe =
      horizontalDistance >= 56 && horizontalDistance > verticalDistance * 1.35;

    if (!isIntentionalHorizontalSwipe) return;

    goToProject(activeIndex + (deltaX < 0 ? 1 : -1));
  };

  const handlePointerCancel = () => {
    pointerStartRef.current = null;
  };

  return (
    <div className="mobile-projects md:hidden">
      <div
        className="mobile-project-carousel relative mt-8 overflow-hidden"
        aria-label="Projetos"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {projects.map((project) => (
            <div key={project.titulo} className="w-full shrink-0 px-1">
              <div className="mb-3 flex min-h-7 flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-[#C4C4C4] border border-white/10 rounded-full px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <ProjectCard project={project} index={0} mobile />
            </div>
          ))}
        </div>

        {activeIndex > 0 ? (
          <button
            type="button"
            aria-label="Projeto anterior"
            onClick={() => goToProject(activeIndex - 1)}
            className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-lg"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        ) : null}
        {activeIndex < projects.length - 1 ? (
          <button
            type="button"
            aria-label="Próximo projeto"
            onClick={() => goToProject(activeIndex + 1)}
            className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-lg"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        ) : null}
      </div>
      <div className="mt-4 flex justify-center gap-1.5" aria-hidden="true">
        {projects.map((project, index) => (
          <span
            key={project.titulo}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-6 bg-[#B026B0]" : "w-1.5 bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Lista de tecnologias única, derivada dos projetos, usada no filtro.
const PROJECT_TECHS = Array.from(new Set(PROJETOS.flatMap((p) => p.tags)));

function Projects({ id }) {
  const { t } = useLang();
  const [activeFilter, setActiveFilter] = useState(t.projects.filterAll);

  // Mantém o filtro "Todos" sincronizado ao trocar de idioma
  useEffect(() => {
    setActiveFilter((prev) =>
      prev === TRANSLATIONS.pt.projects.filterAll || prev === TRANSLATIONS.en.projects.filterAll
        ? t.projects.filterAll
        : prev
    );
  }, [t]);

  const filteredProjects =
    activeFilter === t.projects.filterAll
      ? PROJECTS
      : PROJECTS.filter((p) => p.tags.includes(activeFilter));
  const mobileProjects =
    activeFilter === t.projects.filterAll
      ? PROJETOS
      : PROJETOS.filter((p) => p.tags.includes(activeFilter));

  return (
    <AnimatedSection id={id} className="min-h-screen px-6 md:px-10 py-24">
      <div className="max-w-7xl mx-auto w-full">
        <Reveal index={0}>
          <span className="text-[#B026B0] text-xs font-medium tracking-[0.3em]">
            {t.projects.eyebrow}
          </span>
        </Reveal>
        <Reveal index={1}>
          <h2 className="mt-4 text-white font-bold text-3xl sm:text-4xl">{t.projects.title}</h2>
        </Reveal>

        <div className="desktop-featured-project mt-12 hidden md:block">
          <FeaturedProject />
        </div>

        <ProjectFilter techs={PROJECT_TECHS} active={activeFilter} onChange={setActiveFilter} />

        <MobileProjectCarousel projects={mobileProjects} />

        <div className="desktop-project-grid projects-carousel mt-8 hidden md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {/* <- EDITAR: adicione novos projetos no array PROJECTS no topo do arquivo */}
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.titulo} project={project} index={4 + i} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

function Contact({ id }) {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitState, setSubmitState] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (submitState !== "idle") setSubmitState("idle");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const honeypot = e.currentTarget.elements.botcheck.value;
    if (honeypot) return;

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !emailIsValid || message.length < 10) {
      setSubmitState("error");
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setSubmitState("error");
      return;
    }

    setSubmitState("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "Novo contato pelo portfólio",
          from_name: name,
          name,
          email,
          message,
          botcheck: "",
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) throw new Error("Web3Forms request failed");

      setForm({ name: "", email: "", message: "" });
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <AnimatedSection id={id} className="min-h-screen flex items-center px-6 md:px-10 py-24">
      <div className="max-w-4xl mx-auto w-full">
        <Reveal index={0}>
          <span className="text-[#B026B0] text-xs font-medium tracking-[0.3em]">
            {t.contact.eyebrow}
          </span>
        </Reveal>
        <Reveal index={1}>
          <h2 className="mt-4 text-white font-bold text-3xl sm:text-4xl">{t.contact.title}</h2>
        </Reveal>
        <Reveal index={2}>
          <p className="mt-4 text-[#C4C4C4] font-light text-sm max-w-md">{t.contact.subtitle}</p>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-[1.3fr_1fr] gap-10">
          <Reveal index={3}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder={t.contact.namePlaceholder}
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-5 py-3 text-white text-sm placeholder:text-white/30 outline-none focus:border-[#B026B0] transition-colors duration-300"
              />
              <input
                type="email"
                name="email"
                placeholder={t.contact.emailPlaceholder}
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-5 py-3 text-white text-sm placeholder:text-white/30 outline-none focus:border-[#B026B0] transition-colors duration-300"
              />
              <textarea
                name="message"
                placeholder={t.contact.messagePlaceholder}
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-5 py-3 text-white text-sm placeholder:text-white/30 outline-none focus:border-[#B026B0] transition-colors duration-300 resize-none"
              />
              <input
                type="text"
                name="botcheck"
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <button
                type="submit"
                disabled={submitState === "submitting"}
                className="inline-flex items-center gap-2 bg-[#B026B0] text-white text-sm font-medium rounded-full px-6 py-3 hover:bg-[#c136c1] disabled:cursor-not-allowed disabled:opacity-60 transition-colors duration-300"
              >
                {submitState === "submitting" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {submitState === "submitting" ? t.contact.sending : t.contact.submit}
              </button>

              {submitState === "success" ? (
                <p className="text-emerald-300 text-xs pt-1">{t.contact.successNotice}</p>
              ) : null}
              {submitState === "error" ? (
                <p className="text-red-300 text-xs pt-1">
                  {t.contact.errorNotice}{" "}
                  <a
                    href={`mailto:${PROFILE.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white"
                  >
                    {PROFILE.email}
                  </a>
                </p>
              ) : null}
            </form>
          </Reveal>

          <Reveal index={4} className="flex flex-col gap-4">
            <a
              href={`mailto:${PROFILE.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-sm text-white hover:border-[#B026B0] hover:text-[#B026B0] transition-colors duration-300"
            >
              <Mail className="w-4 h-4" />
              {PROFILE.email}
            </a>
            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-sm text-white hover:border-[#B026B0] hover:text-[#B026B0] transition-colors duration-300"
            >
              <Linkedin className="w-4 h-4" />
              {t.contact.linkedin}
            </a>
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-sm text-white hover:border-[#B026B0] hover:text-[#B026B0] transition-colors duration-300"
            >
              <Github className="w-4 h-4" />
              {t.contact.github}
              <ExternalLink className="w-3 h-3 ml-auto text-white/30" />
            </a>
          </Reveal>
        </div>

        <footer className="mt-24 pt-8 border-t border-white/10 text-white/30 text-xs">
          © {new Date().getFullYear()} {PROFILE.name}. {t.contact.rights}
        </footer>
      </div>
    </AnimatedSection>
  );
}

/* ============================================================================
 * APP
 * ==========================================================================*/

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const directionRef = useRef("down");
  const lastScrollY = useRef(0);
  const reducedMotion = usePrefersReducedMotion();

  // Scroll-spy baseado na posição da seção, sem exigir que uma seção inteira
  // ocupe metade da viewport. Isso mantém Projetos ativo mesmo sendo alto.
  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      const marker = window.innerHeight * 0.4;
      let nextIndex = 0;

      SECTIONS.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= marker) {
          nextIndex = index;
        }
      });

      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Direção da rolagem, guardada em ref e consultada pelas seções ao animar
  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY.current + 2) directionRef.current = "down";
      else if (y < lastScrollY.current - 2) directionRef.current = "up";
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <LangProvider>
      <ScrollDirectionContext.Provider value={directionRef}>
        <ReducedMotionContext.Provider value={reducedMotion}>
          <div
            className="relative min-h-screen overflow-x-hidden bg-[#0D0D0D] bg-dot-grid min-[995px]:pr-24"
            style={{ backgroundColor: "#0D0D0D" }}
          >
            <Header />
            <SectionSidebar activeIndex={activeIndex} />
            <ScrollDownHint activeIndex={activeIndex} />
            <GithubFloatingButton hidden={activeIndex === SECTIONS.length - 1} />

            <main>
              <Hero id="hero" />
              <About id="sobre" />
              <Experience id="experiencia" />
              <Skills id="skills" />
              <Projects id="projetos" />
              <Contact id="contato" />
            </main>
          </div>
        </ReducedMotionContext.Provider>
      </ScrollDirectionContext.Provider>
    </LangProvider>
  );
}
