export const AppConfig = {
  isProduction: import.meta.env.NODE_ENV === "production",
  api: {
    url: import.meta.env.VITE_PUBLIC_API_URL as string,
  },
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL as string,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
  },
};
