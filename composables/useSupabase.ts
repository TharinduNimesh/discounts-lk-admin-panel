import { createClient } from "@supabase/supabase-js";
import type { Database } from "~/types";

export function useSupabase() {
  const config = useRuntimeConfig();
  const supabaseUrl = config.public.supabaseUrl as string;
  const supabaseAnonKey = config.public.supabaseAnonKey as string;
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}
