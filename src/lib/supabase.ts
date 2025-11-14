import { createClient } from "@supabase/supabase-js";

import { AppConfig } from "@/config/app.config";

const isMockMode = !AppConfig.supabase.url || !AppConfig.supabase.anonKey;

export const supabase = isMockMode ? null : createClient(AppConfig.supabase.url, AppConfig.supabase.anonKey);

export const isSupabaseConfigured = !isMockMode;
