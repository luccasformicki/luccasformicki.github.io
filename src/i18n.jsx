import React, { createContext, useContext, useEffect, useState } from "react";

/* ============================================================================
 * TRADUÇÕES (PT / EN) + estado de idioma
 * <- EDITAR: todos os textos de interface (labels, botões, títulos de seção,
 * placeholders) vivem aqui. PT é o idioma padrão.
 * Conteúdo editorial (projetos, experiências, sobre mim) fica em App.jsx, cada
 * item com campos `{ pt, en }` para os textos que variam por idioma.
 * Este módulo é compartilhado pelas duas páginas do site (/ e /curriculo/).
 * ==========================================================================*/
export const TRANSLATIONS = {
  pt: {
    header: { contact: "Contato" },
    scrollDown: "ROLAR PARA BAIXO",
    backToTop: "VOLTAR AO TOPO",
    githubAria: "Abrir perfil do GitHub em nova aba",
    nav: {
      hero: "Início",
      sobre: "Sobre",
      experiencia: "Experiência",
      skills: "Skills",
      projetos: "Projetos",
      contato: "Contato",
    },
    hero: {
      available: "Disponível para novos projetos",
      aboutLink: "Sobre mim",
      resumeButton: "Baixar currículo (PDF)",
      codeAria:
        "Painel com animação de código Python. Role para ler o código desde o início.",
      codePaused: "Role até o fim",
    },
    about: {
      eyebrow: "01 — SOBRE MIM",
      title: "Um pouco sobre minha trajetória",
    },
    experience: {
      eyebrow: "02 — TRAJETÓRIA",
      title: "Experiência",
    },
    skills: {
      eyebrow: "03 — STACK",
      title: "Linguagens e Ferramentas",
      certificateButton: "Ver certificado",
      certificationInProgress: "Certificação em andamento",
    },
    projects: {
      eyebrow: "04 — TRABALHOS",
      title: "Projetos",
      featuredLabel: "Projeto em destaque",
      filterAll: "Todos",
      viewProject: "Ver projeto",
      viewCode: "Ver código",
      likesLabel: "curtidas",
      viewsLabel: "visualizações",
      status: {
        concluido: "Concluído",
        "em-andamento": "Em andamento",
        planejado: "Planejado",
      },
    },
    contact: {
      eyebrow: "05 — CONTATO",
      title: "Vamos conversar?",
      subtitle:
        "Estou aberto(a) a novas oportunidades e colaborações. Envie uma mensagem ou me encontre nos links abaixo.",
      namePlaceholder: "Nome",
      emailPlaceholder: "E-mail",
      messagePlaceholder: "Mensagem",
      submit: "Enviar mensagem",
      sending: "Enviando...",
      successNotice: "Mensagem enviada com sucesso.",
      errorNotice: "Não foi possível enviar. Escreva diretamente para",
      linkedin: "LinkedIn",
      github: "GitHub",
      rights: "Todos os direitos reservados.",
    },
  },
  en: {
    header: { contact: "Contact" },
    scrollDown: "SCROLL DOWN",
    backToTop: "BACK TO TOP",
    githubAria: "Open GitHub profile in a new tab",
    nav: {
      hero: "Home",
      sobre: "About",
      experiencia: "Experience",
      skills: "Skills",
      projetos: "Projects",
      contato: "Contact",
    },
    hero: {
      available: "Available for new projects",
      aboutLink: "About me",
      resumeButton: "Download résumé (PDF)",
      codeAria:
        "Panel with a Python code animation. Scroll to read the code from the beginning.",
      codePaused: "auto-scroll paused — scroll to the end",
    },
    about: {
      eyebrow: "01 — ABOUT ME",
      title: "A bit about my journey",
    },
    experience: {
      eyebrow: "02 — BACKGROUND",
      title: "Experience",
    },
    skills: {
      eyebrow: "03 — STACK",
      title: "Languages & Tools",
      certificateButton: "View certificate",
      certificationInProgress: "Certification in progress",
    },
    projects: {
      eyebrow: "04 — WORK",
      title: "Projects",
      featuredLabel: "Featured project",
      filterAll: "All",
      viewProject: "View project",
      viewCode: "View code",
      likesLabel: "likes",
      viewsLabel: "views",
      status: {
        concluido: "Completed",
        "em-andamento": "In progress",
        planejado: "Planned",
      },
    },
    contact: {
      eyebrow: "05 — CONTACT",
      title: "Let's talk?",
      subtitle:
        "I'm open to new opportunities and collaborations. Send a message or find me on the links below.",
      namePlaceholder: "Name",
      emailPlaceholder: "Email",
      messagePlaceholder: "Message",
      submit: "Send message",
      sending: "Sending...",
      successNotice: "Message sent successfully.",
      errorNotice: "Could not send the message. Write directly to",
      linkedin: "LinkedIn",
      github: "GitHub",
      rights: "All rights reserved.",
    },
  },
};

const STORAGE_KEY = "portfolio:lang";

export const LangContext = createContext({
  lang: "pt",
  setLang: () => {},
  t: TRANSLATIONS.pt,
});

export const useLang = () => useContext(LangContext);

// O site tem duas páginas reais, então navegar entre elas é um carregamento
// novo: sem persistir, a escolha de idioma se perderia no caminho.
export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "pt" || saved === "en") return saved;
    } catch {
      /* localStorage indisponível (aba anônima, cookies bloqueados) */
    }
    return "pt";
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* segue sem persistir */
    }
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

/* ---- Toggle de idioma PT / EN ----------------------------------------------*/
export function LanguageToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center text-xs font-medium border border-white/20 rounded-full overflow-hidden">
      <button
        onClick={() => setLang("pt")}
        aria-pressed={lang === "pt"}
        className={`px-3 py-1.5 transition-colors duration-300 ${
          lang === "pt" ? "bg-[#B026B0] text-white" : "text-white/50 hover:text-white"
        }`}
      >
        PT
      </button>
      <button
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-3 py-1.5 transition-colors duration-300 ${
          lang === "en" ? "bg-[#B026B0] text-white" : "text-white/50 hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}
