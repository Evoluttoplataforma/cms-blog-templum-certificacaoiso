import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// CMS do blog — painel privado servido em certificacaoiso.com.br/acesso.
// Estático: o supabase-js faz auth + CRUD no navegador (RLS protege).
export default defineConfig({
  site: 'https://certificacaoiso.com.br',
  base: '/acesso',
  build: { format: 'directory' },
  integrations: [tailwind()],
});
