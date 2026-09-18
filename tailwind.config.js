/** @type {import('tailwindcss').Config} */

// Toda cor do site é um token semântico apontando para uma variável CSS
// (definidas em src/index.css, uma vez por tema). Assim a troca de tema é só
// trocar os valores das variáveis — nenhum componente precisa de `dark:`.
// As variáveis guardam o RGB sem função ("13 13 13") para o `<alpha-value>`
// do Tailwind continuar funcionando: `border-ink/10`, `bg-accent/10` etc.
const themed = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./curriculo/index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: themed("bg"), // fundo da página
        ink: themed("ink"), // texto/ícone principal e base de bordas e superfícies
        body: themed("body"), // texto corrido secundário
        muted: themed("muted"), // rótulos discretos (numeração, contadores)
        faint: themed("faint"), // rodapé, placeholders, ícones de apoio
        accent: themed("accent"), // roxo da identidade, igual nos dois temas
        "accent-hover": themed("accent-hover"),
        "accent-soft": themed("accent-soft"), // roxo em texto pequeno sobre fundo tênue
        "on-accent": themed("on-accent"), // texto sobre preenchimento roxo
        rail: themed("rail"), // trilho da sidebar e divisores fortes
        ok: themed("ok"), // sucesso / "concluído"
        danger: themed("danger"), // erro do formulário
        live: themed("live"), // indicador "disponível"
        "live-ping": themed("live-ping"), // halo pulsante do indicador
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(var(--c-dot) 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-grid": "24px 24px",
      },
    },
  },
  plugins: [],
};
