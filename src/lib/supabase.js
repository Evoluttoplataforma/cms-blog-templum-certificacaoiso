import { createClient } from "@supabase/supabase-js";

// Keys PÚBLICAS (anon) — seguras no client; o RLS é quem protege.
// Em produção, o Cloudflare injeta PUBLIC_SUPABASE_* (override). Fallback p/ dev.
const URL = import.meta.env.PUBLIC_SUPABASE_URL || "https://yfpdrckyuxltvznqfqgh.supabase.co";
const ANON = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_Yfg9Ts5WRqD4Gc3jeWAS2A_-YWZrtiQ";

export const supabase = createClient(URL, ANON);

// Redireciona pro login se não houver sessão. Retorna a sessão ou null.
export async function requireAuth() {
  const { data } = await supabase.auth.getSession();
  if (!data.session) { location.href = "/acesso/login/"; return null; }
  return data.session;
}
