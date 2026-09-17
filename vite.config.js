import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `__dirname` não existe em ESM e o package.json usa "type": "module".
const entry = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Duas páginas reais. A de currículo vira dist/curriculo/index.html, que
      // qualquer host estático serve em /curriculo/ sem regra de rewrite — se
      // fosse rota client-side, acesso direto e refresh dariam 404.
      input: {
        main: entry("./index.html"),
        curriculo: entry("./curriculo/index.html"),
      },
    },
  },
});
