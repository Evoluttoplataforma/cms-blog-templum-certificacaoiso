import { createClient } from "@supabase/supabase-js";

// Keys PÚBLICAS (anon) — seguras no client; o RLS é quem protege.
const url = import.meta.env.PUBLIC_SUPABASE_URL || "https://yfpdrckyuxltvznqfqgh.supabase.co";
const anon = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_Yfg9Ts5WRqD4Gc3jeWAS2A_-YWZrtiQ";

export const supa = createClient(url, anon);

// Caminho base do painel (servido sob /acesso).
export const BASE = "/acesso";

export async function requireAuth() {
  const { data } = await supa.auth.getSession();
  if (!data.session) { window.location.href = BASE + "/login"; return null; }
  return data.session;
}

// Upload p/ o Storage bucket "media" (público). Retorna a URL pública.
export async function uploadMedia(file: File, folder: string): Promise<string> {
  const ext = (file.name.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supa.storage.from("media").upload(path, file, { upsert: true, contentType: file.type });
  if (error) throw error;
  return supa.storage.from("media").getPublicUrl(path).data.publicUrl;
}

// Helper: escapa HTML p/ innerHTML seguro.
export function esc(s: any): string {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}
