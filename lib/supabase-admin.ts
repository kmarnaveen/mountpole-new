import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function normalizeServerEnv(value?: string) {
  const normalized = value?.trim() ?? "";

  if (!normalized || normalized.startsWith("REPLACE_WITH_")) {
    return "";
  }

  return normalized;
}

const supabaseUrl = normalizeServerEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseServiceRoleKey = normalizeServerEnv(
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

let supabaseAdminClient: SupabaseClient | null = null;

export function isSupabaseAdminConfigured() {
  return Boolean(supabaseUrl && supabaseServiceRoleKey);
}

export function getSupabaseAdminClient() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      "Supabase server environment variables are not configured.",
    );
  }

  if (!supabaseAdminClient) {
    supabaseAdminClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    });
  }

  return supabaseAdminClient;
}
