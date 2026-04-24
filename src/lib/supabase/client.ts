"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { assertPublicSupabaseEnv } from "./env";
import type { Database } from "./types";

let browserClient: SupabaseClient<Database> | null = null;

export function getSupabaseBrowserClient() {
  if (browserClient) {
    return browserClient;
  }

  const { url, anonKey } = assertPublicSupabaseEnv();
  browserClient = createClient<Database>(url, anonKey);

  return browserClient;
}
