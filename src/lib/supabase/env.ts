const requiredPublicKeys = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
] as const;

export type PublicSupabaseEnv = {
  url: string;
  anonKey: string;
};

export type ServerSupabaseEnv = PublicSupabaseEnv & {
  secretKey: string;
};

function readEnv(key: string): string | undefined {
  const value = process.env[key];
  return value && value.trim().length > 0 ? value : undefined;
}

export function getPublicSupabaseEnv(): PublicSupabaseEnv | null {
  const [url, anonKey] = requiredPublicKeys.map(readEnv);

  if (!url || !anonKey) {
    return null;
  }

  return { url, anonKey };
}

export function getServerSupabaseEnv(): ServerSupabaseEnv | null {
  const url = readEnv("NEXT_PUBLIC_SUPABASE_URL");
  const anonKey = readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  const secretKey =
    readEnv("SUPABASE_SECRET_KEY") ?? readEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !anonKey || !secretKey) {
    return null;
  }

  return { url, anonKey, secretKey };
}

export function assertPublicSupabaseEnv(): PublicSupabaseEnv {
  const env = getPublicSupabaseEnv();

  if (!env) {
    throw new Error(
      "Missing public Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  return env;
}

export function assertServerSupabaseEnv(): ServerSupabaseEnv {
  const env = getServerSupabaseEnv();

  if (!env) {
    throw new Error(
      "Missing server Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and either SUPABASE_SECRET_KEY or SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  return env;
}

export function isSupabaseConfigured() {
  return getPublicSupabaseEnv() !== null;
}
