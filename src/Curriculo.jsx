import React, { useEffect, useState } from "react";
import { ArrowLeft, Download } from "lucide-react";

import { RESUME_PDF } from "./config.js";

/* ============================================================================
 * PÁGINA /curriculo/
 * Só em PT — ainda não há versão em inglês do currículo, então esta página não
 * monta o LangProvider nem o seletor PT/EN.
 * Escrita mobile-first: as classes sem prefixo valem para o celular, e os
 * prefixos sm:/md: só ampliam a partir dali.
 * ==========================================================================*/

const TEXT = {
  title: "Currículo — Luccas Formicki",
  download: "Baixar PDF",
  back: "Voltar ao site",
  loading: "Carregando o documento…",
  errorTitle: "Não foi possível carregar o PDF.",
  errorLink: "Tentar abrir em outra aba",
  viewerLabel: "Currículo de Luccas Formicki em PDF",
  viewerFallback: "Seu navegador não consegue exibir o PDF aqui.",
  viewerFallbackLink: "Abrir o PDF em outra aba",
};

/**
 * Confirma que o PDF existe de fato antes de montar qualquer coisa.
 * O botão de download só aparece quando isto resolve, então ele nunca é
 * renderizado antes do documento.
 *
 * Uso `fetch` em vez do evento `load` do <object> porque esse evento é
 * inconsistente entre navegadores: se ele não disparar, o botão nunca
 * apareceria. A checagem do content-type é necessária porque servidor de SPA
 * costuma responder 200 com HTML para arquivo inexistente.
 */
function usePdfReady(url) {
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((response) => {
        const type = (response.headers.get("content-type") || "").toLowerCase();
        if (!response.ok || !type.includes("pdf")) throw new Error("PDF indisponível");
        setStatus("ready");
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        setStatus("error");
      });

    return () => controller.abort();
  }, [url]);

  return status;
}

export default function Curriculo() {
  const status = usePdfReady(RESUME_PDF);
  const [viewerVersion, setViewerVersion] = useState(0);

  useEffect(() => {
    const viewport = document.querySelector('meta[name="viewport"]');
    const defaultViewport = "width=device-width, initial-scale=1.0, viewport-fit=cover";
    let orientationTimer;

    const resetViewportLayout = () => {
      document.documentElement.style.removeProperty("zoom");
      document.body.style.removeProperty("zoom");
      document.documentElement.style.removeProperty("transform");
      document.body.style.removeProperty("transform");
      document.documentElement.style.removeProperty("width");
      document.body.style.removeProperty("width");
      if (viewport) viewport.setAttribute("content", defaultViewport);
    };

    resetViewportLayout();
    const remountViewer = () => {
      window.clearTimeout(orientationTimer);
      orientationTimer = window.setTimeout(() => {
        resetViewportLayout();
        setViewerVersion((version) => version + 1);
      }, 100);
    };

    window.addEventListener("orientationchange", remountViewer);
    window.addEventListener("resize", remountViewer);

    return () => {
      window.clearTimeout(orientationTimer);
      window.removeEventListener("orientationchange", remountViewer);
      window.removeEventListener("resize", remountViewer);
    };
  }, []);

  return (
    <div
      className="min-h-screen overflow-x-hidden bg-[#0D0D0D] bg-dot-grid"
      style={{ backgroundColor: "#0D0D0D" }}
    >
      <main className="mx-auto w-full max-w-5xl px-5 pb-16 pt-10 sm:px-8 md:pb-24 md:pt-14">
        <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
          {TEXT.title}
        </h1>

        {/* Empilha no celular (botões de largura total, sem risco de estouro) e
            vira linha a partir de sm. */}
        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          {status === "ready" ? (
            <a
              href={RESUME_PDF}
              download
              target="_self"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#B026B0] px-6 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#8f1f8f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B026B0] motion-reduce:transition-none sm:w-auto"
            >
              <Download className="h-4 w-4 shrink-0" />
              {TEXT.download}
            </a>
          ) : null}

          <a
            href="/"
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-white/30 px-6 py-3.5 text-sm text-white transition-colors duration-300 hover:border-[#B026B0] hover:text-[#B026B0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B026B0] motion-reduce:transition-none sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
            {TEXT.back}
          </a>
        </div>

        {status === "loading" ? (
          <p
            aria-live="polite"
            className="mt-8 text-sm font-light text-[#C4C4C4] md:mt-10"
          >
            {TEXT.loading}
          </p>
        ) : null}

        {status === "error" ? (
          <p
            aria-live="polite"
            className="mt-8 text-sm font-light leading-relaxed text-[#C4C4C4] md:mt-10"
          >
            {TEXT.errorTitle}{" "}
            <a
              href={RESUME_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B026B0] underline underline-offset-4"
            >
              {TEXT.errorLink}
            </a>
          </p>
        ) : null}

        {status === "ready" ? (
          <object
            key={viewerVersion}
            data={RESUME_PDF}
            type="application/pdf"
            aria-label={TEXT.viewerLabel}
            className="resume-viewer mt-8 block h-[80vh] min-h-[420px] w-full rounded-xl border border-white/10 bg-white/5 md:mt-10 md:rounded-2xl"
          >
            {/* Alguns navegadores de celular não embutem PDF: aqui fica a saída. */}
            <p className="p-6 text-sm font-light leading-relaxed text-[#C4C4C4]">
              {TEXT.viewerFallback}{" "}
              <a
                href={RESUME_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B026B0] underline underline-offset-4"
              >
                {TEXT.viewerFallbackLink}
              </a>
            </p>
          </object>
        ) : null}
      </main>
    </div>
  );
}
