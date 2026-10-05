import type { SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(url && anonKey);

let client: Promise<SupabaseClient> | null = null;

/** Loads supabase-js only when a page actually needs it, keeping it out of the main bundle. */
export function getSupabase(): Promise<SupabaseClient> | null {
  if (!supabaseConfigured) return null;
  client ??= import("@supabase/supabase-js").then(({ createClient }) =>
    createClient(url!, anonKey!, { auth: { persistSession: false, autoRefreshToken: false } }),
  );
  return client;
}

export type PartnerEnquiry = {
  full_name: string;
  organisation: string;
  role: string;
  email: string;
  phone: string | null;
  audience: string;
  message: string;
  consent: boolean;
};

export type PilotPost = {
  id: string;
  published_at: string;
  title: string;
  body: string;
};
