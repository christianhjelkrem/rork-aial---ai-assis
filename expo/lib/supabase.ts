import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_IAAL_SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_IAAL_SUPABASE_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

console.log("[supabase] URL present:", !!supabaseUrl, "Key present:", !!supabaseAnonKey);

let supabase: SupabaseClient;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn("Supabase URL or Anon Key is missing. Supabase client not initialized.");
  supabase = null as unknown as SupabaseClient;
}

export { supabase };
