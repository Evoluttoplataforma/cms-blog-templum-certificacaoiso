# CLAUDE.md — repositório do CMS (certificacaoiso.com.br/acesso)

> Leia `ARQUITETURA.md` (neste repo) para o sistema completo (site · blog · cms · Supabase).

## Este repositório
- **App:** Painel admin do blog — servido em **`certificacaoiso.com.br/acesso`**
- **Stack:** Astro + Tailwind + `@supabase/supabase-js` · `base: '/acesso'` · Supabase Auth
- **Worker Cloudflare:** **`certificacaoiso-cms`** (proxiado pelo Worker do blog em `/acesso*`)
- **Remote:** `github.com/Evoluttoplataforma/cms-blog-templum-certificacaoiso`
- **Dev:** `npm run dev` (porta **4444**) · **Build:** `npm run build`

## ⚠️ Git & Deploy — regras (NÃO DAR ZIKA)
- Este repo publica **só o CMS**. Mudou site/blog? É **outro repositório** — não commite aqui.
- **`git push origin main` = DEPLOY EM PRODUÇÃO** (Workers Builds). Só pushe pra publicar.
- **Deploy usa `wrangler versions upload`** → ⚠️ **NÃO** adicione `routes` no `wrangler.toml`
  (quebra o deploy). Rota `/acesso*` e domínios são tratados **fora** daqui (proxy no Worker do blog
  e/ou painel da Cloudflare).
- **Antes de pushar:** `git status` + **`npm run build`**.
- Só commite/pushe quando o usuário pedir.
- **Nunca commitar:** `.env`, secrets, `service_role`, `node_modules`, `dist`.
- Commit de IA termina com: `Co-Authored-By: Claude <noreply@anthropic.com>`
- Push rejeitado? → `git pull --rebase origin main` e push de novo.

## Como funciona
- CRUD **client-side** direto no Supabase (RLS + Auth). Telas: dashboard, artigos (editor rico),
  iscas, histórias, comentários, banners, usuários.
- Criar usuário → Edge Function `blog-templum-create-user`. “Republicar site” → `blog-templum-rebuild`.
- Tabelas: `blog_templum_*`. Chave anon pública com fallback no código (`src/lib/supa.ts`);
  `service_role` **nunca** aqui.
