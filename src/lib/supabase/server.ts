import { createClient } from "@supabase/supabase-js";
import { assertPublicSupabaseEnv, assertServerSupabaseEnv } from "./env";
import type { Database } from "./types";

export function createSupabaseServerClient() {
  const { url, anonKey } = assertPublicSupabaseEnv();

  return createClient<Database>(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function createSupabaseAdminClient() {
  const { url, secretKey } = assertServerSupabaseEnv();

  return createClient<Database>(url, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
