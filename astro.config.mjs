import { defineConfig } from 'astro/config';

// CMS do blog — painel privado (atrás de Supabase Auth). Estático: as páginas
// são "cascas" e o supabase-js faz auth + CRUD no navegador (RLS protege).
export default defineConfig({
  site: 'https://certificacaoiso.com.br',
  base: '/acesso',
  build: { format: 'directory' },
});
