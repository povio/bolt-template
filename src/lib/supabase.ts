import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isMockMode = !supabaseUrl || !supabaseAnonKey;

export const supabase = isMockMode ? null : createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = !isMockMode;
