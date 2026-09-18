import React, { createContext, useContext, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { useLang } from "./i18n.jsx";

/* ============================================================================
 * TEMA (escuro / claro)
 * O escuro é o padrão do site — a preferência do sistema não é consultada, só
 * a escolha explícita de quem visita. As cores em si não moram aqui: este
 * módulo só escreve `data-theme` no <html> e a folha src/index.css troca as
 * variáveis a partir disso.
 *
 * O mesmo par (ler o localStorage, aplicar no <html>) roda também no script
 * inline do index.html, antes da pintura, para não haver flash do tema errado.
 * Se mexer na chave ou nos valores aqui, mexa lá também.
 * ==========================================================================*/

const STORAGE_KEY = "portfolio:theme";
const THEMES = ["dark", "light"];

// Duração do fade entre os temas, igual à da regra .theme-switching no CSS.
const TRANSITION_MS = 300;

export const ThemeContext = createContext({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

function readStoredTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (THEMES.includes(saved)) return saved;
  } catch {
    /* localStorage indisponível (aba anônima, cookies bloqueados) */
  }
  return "dark";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readStoredTheme);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* segue sem persistir */
    }
    const root = document.documentElement;
    root.dataset.theme = theme;
    // O script inline do index.html pinta o <html> com um hex fixo para cobrir
    // o instante antes da folha de estilo chegar. Daqui em diante a folha já
    // está aplicada, então o inline sai do caminho e o fundo passa a seguir o
    // token — é o que permite ele acompanhar a troca de tema.
    root.style.removeProperty("background-color");
  }, [theme]);

  // A classe só existe durante a troca: fora dela, nenhuma regra global de
  // transição concorre com as transições próprias dos componentes.
  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.add("theme-switching");
    window.clearTimeout(root._themeTimer);
    root._themeTimer = window.setTimeout(
      () => root.classList.remove("theme-switching"),
      TRANSITION_MS + 20,
    );
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/* ---- Botão sol / lua -------------------------------------------------------
 * Mostra o tema ATIVO (sol no claro, lua no escuro) e o aria-label descreve a
 * AÇÃO do clique, que é o que um leitor de tela precisa saber. Fica do mesmo
 * tamanho do seletor PT/EN, ao lado do qual é montado. ------------------------*/
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLang();
  const isDark = theme === "dark";
  const Icon = isDark ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t.theme.switchToLight : t.theme.switchToDark}
      className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
    >
      <Icon className="h-4 w-4" strokeWidth={1.8} />
    </button>
  );
}
