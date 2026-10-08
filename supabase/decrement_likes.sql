-- ============================================================================
-- decrement_likes(pid) — a metade que faltava do botão de curtir
--
-- Par de `increment_likes`, escrita no mesmo formato das funções que já
-- existiam no banco (`increment_views` / `increment_likes`): sql, security
-- definer, search_path travado em public.
--
-- Rodar uma vez no SQL Editor do Supabase (painel > SQL Editor > New query).
-- Enquanto ela não existir, o front-end desfaz a própria remoção quando o RPC
-- responde "function not found" — o coração volta a aparecer preenchido.
-- ============================================================================

create or replace function decrement_likes(pid text)
returns void
language sql
security definer
set search_path = public
as $$
  -- Sem upsert, ao contrário das funções de incremento: se a linha não
  -- existe, não há curtida para remover. `greatest(0, ...)` é o piso, para
  -- que cliques concorrentes de navegadores diferentes nunca deixem o total
  -- negativo.
  update project_stats
     set likes = greatest(0, likes - 1)
   where project_id = pid;
$$;

-- Redundante na prática (o Postgres já concede execute a PUBLIC por padrão,
-- que é como as duas funções de incremento funcionam sem grant nenhum), mas
-- deixa explícito quem precisa chamar: o site usa a anon key.
grant execute on function decrement_likes(text) to anon;
