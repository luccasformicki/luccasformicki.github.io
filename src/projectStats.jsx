import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* ============================================================================
 * CONTADORES DE VISUALIZAÇÕES E CURTIDAS
 * Os números vivem no Supabase (tabela `project_stats`, uma linha por projeto)
 * e são lidos de uma vez só: uma query para a seção inteira, não uma por card.
 * A escrita nunca é direta — passa pelas funções `increment_views`,
 * `increment_likes` e `decrement_likes`, que são o que o RLS libera.
 *
 * Nada aqui é obrigatório para a página funcionar: se a query falhar, se as
 * variáveis de ambiente não estiverem definidas ou se o RPC der erro, os
 * contadores ficam zerados e o resto do site segue igual.
 * ==========================================================================*/

const VIEWED_PREFIX = "viewed:";
const LIKED_PREFIX = "liked:";

const EMPTY_STATS = { views: 0, likes: 0 };

/* ---- localStorage tolerante a falha ---------------------------------------
 * Aba anônima e cookies bloqueados fazem qualquer acesso lançar. Como isto
 * aqui é só deduplicação, o custo de falhar é contar duas vezes — nunca vale
 * derrubar a página por causa disso. ----------------------------------------*/
function hasFlag(key) {
  try {
    return localStorage.getItem(key) !== null;
  } catch {
    return false;
  }
}

function setFlag(key) {
  try {
    localStorage.setItem(key, "1");
  } catch {
    /* segue sem deduplicar */
  }
}

function removeFlag(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* segue */
  }
}

// Ids já curtidos neste navegador, lidos direto das chaves salvas — assim o
// coração já nasce preenchido ao voltar ao site, sem depender do servidor.
function readLikedIds() {
  const ids = new Set();
  try {
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (key && key.startsWith(LIKED_PREFIX)) ids.add(key.slice(LIKED_PREFIX.length));
    }
  } catch {
    /* sem localStorage: começa vazio */
  }
  return ids;
}

/* ---- Cliente carregado sob demanda -----------------------------------------
 * O `createClient` lança se as variáveis de ambiente não existirem, e num
 * import estático esse erro derrubaria o site inteiro antes de pintar. Com
 * import dinâmico ele vira uma promise rejeitada que este módulo engole, e a
 * página continua de pé (com os contadores em zero). De quebra, o bundle do
 * supabase sai do carregamento inicial. --------------------------------------*/
let clientPromise = null;

function loadClient() {
  if (!clientPromise) {
    clientPromise = import("./lib/supabase.js")
      .then((mod) => mod.supabase ?? null)
      .catch(() => null);
  }
  return clientPromise;
}

const ProjectStatsContext = createContext({
  getStats: () => EMPTY_STATS,
  hasLiked: () => false,
  registerView: () => {},
  toggleLike: () => {},
});

export const useProjectStats = () => useContext(ProjectStatsContext);

export function ProjectStatsProvider({ children }) {
  // O que veio do servidor e o que este navegador acabou de somar ficam
  // separados de propósito: assim a curtida otimista não é apagada se a query
  // inicial chegar depois do clique.
  const [serverStats, setServerStats] = useState({});
  const [likeDelta, setLikeDelta] = useState({});
  const [likedIds, setLikedIds] = useState(readLikedIds);

  // Projetos cuja visualização já foi disparada nesta sessão. Evita repetir a
  // chamada quando o card remonta (troca de filtro, StrictMode em dev).
  const viewsFiredRef = useRef(new Set());

  // Projetos com um curtir/descurtir ainda em voo. Sem isto, dois cliques
  // rápidos disparariam increment e decrement em paralelo e o total do
  // servidor terminaria errado — qual das duas respostas chega por último
  // deixa de importar se a segunda nem sai.
  const likePendingRef = useRef(new Set());

  // Uma única query para todos os projetos.
  useEffect(() => {
    let active = true;

    (async () => {
      const client = await loadClient();
      if (!client || !active) return;

      try {
        const { data, error } = await client.from("project_stats").select("*");
        if (!active || error || !data) return;

        const next = {};
        data.forEach((row) => {
          next[row.project_id] = {
            views: row.views ?? 0,
            likes: row.likes ?? 0,
          };
        });
        setServerStats(next);
      } catch {
        /* sem rede ou tabela indisponível: fica tudo em zero */
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const getStats = useCallback(
    (projectId) => {
      const base = serverStats[projectId];
      return {
        views: base?.views ?? 0,
        // Piso em zero: descurtir antes da query inicial chegar soma -1 sobre
        // um total ainda em zero, e "-1 curtidas" não existe.
        likes: Math.max(0, (base?.likes ?? 0) + (likeDelta[projectId] ?? 0)),
      };
    },
    [serverStats, likeDelta]
  );

  const hasLiked = useCallback((projectId) => likedIds.has(projectId), [likedIds]);

  // Chamado quando a pessoa clica para ABRIR o projeto — no botão do desktop ou
  // no card inteiro no celular. Não é disparado por montagem nem por o card
  // aparecer na tela: visualização aqui significa intenção de ver o projeto.
  const registerView = useCallback((projectId) => {
    if (!projectId || viewsFiredRef.current.has(projectId)) return;
    viewsFiredRef.current.add(projectId);

    // Deduplicação: uma visualização por projeto por navegador.
    const key = VIEWED_PREFIX + projectId;
    if (hasFlag(key)) return;

    // Marca ANTES de chamar: um duplo-clique impaciente no botão já encontra a
    // chave gravada no segundo disparo e não repete o RPC.
    setFlag(key);

    (async () => {
      const client = await loadClient();
      if (!client) return;
      try {
        await client.rpc("increment_views", { pid: projectId });
      } catch {
        /* visualização é best-effort: não tenta de novo nem avisa. Em rota
           interna, que navega na mesma aba, a requisição pode ser cancelada
           no meio — e como a chave já foi gravada, essa visualização se
           perde. É o preço de não segurar o clique esperando a resposta. */
      }
    })();
  }, []);

  // Curtir e descurtir são o MESMO gesto: o clique sempre inverte o estado
  // atual. O que manda é a marca em localStorage, não o render anterior —
  // assim um coração que nasceu preenchido de uma visita antiga descurte no
  // primeiro clique, sem precisar curtir de novo antes.
  const toggleLike = useCallback(
    (projectId) => {
      if (!projectId || likePendingRef.current.has(projectId)) return;

      const key = LIKED_PREFIX + projectId;
      const wasLiked = likedIds.has(projectId) || hasFlag(key);
      const step = wasLiked ? -1 : 1;

      likePendingRef.current.add(projectId);

      // Otimista nas duas direções: coração e número respondem ao clique, não
      // à latência da rede. Se o RPC falhar, `revert` desfaz exatamente isto.
      setLikedIds((prev) => {
        const next = new Set(prev);
        if (wasLiked) next.delete(projectId);
        else next.add(projectId);
        return next;
      });
      setLikeDelta((prev) => ({ ...prev, [projectId]: (prev[projectId] ?? 0) + step }));
      if (wasLiked) removeFlag(key);
      else setFlag(key);

      const revert = () => {
        setLikedIds((prev) => {
          const next = new Set(prev);
          if (wasLiked) next.add(projectId);
          else next.delete(projectId);
          return next;
        });
        setLikeDelta((prev) => {
          const next = { ...prev };
          const value = (next[projectId] ?? 0) - step;
          // Zero é o único valor descartável: -1 é um delta legítimo agora que
          // existe descurtir, e apagá-lo ressuscitaria a curtida no total.
          if (value === 0) delete next[projectId];
          else next[projectId] = value;
          return next;
        });
        if (wasLiked) setFlag(key);
        else removeFlag(key);
      };

      (async () => {
        try {
          const client = await loadClient();
          if (!client) {
            revert();
            return;
          }
          const { error } = await client.rpc(wasLiked ? "decrement_likes" : "increment_likes", {
            pid: projectId,
          });
          if (error) revert();
        } catch {
          revert();
        } finally {
          likePendingRef.current.delete(projectId);
        }
      })();
    },
    [likedIds]
  );

  const value = useMemo(
    () => ({ getStats, hasLiked, registerView, toggleLike }),
    [getStats, hasLiked, registerView, toggleLike]
  );

  return (
    <ProjectStatsContext.Provider value={value}>{children}</ProjectStatsContext.Provider>
  );
}
