export const AppConfig = {
  isProduction: import.meta.env.NODE_ENV === "production",
  api: {
    url: import.meta.env.VITE_PUBLIC_API_URL as string,
  },
  auth: {
    googleRedirectUrl: `${import.meta.env.VITE_PUBLIC_API_URL}api/user/auth/google`,
  },
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL as string,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
  },
  googleAnalytics: {
    measurementId: import.meta.env.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID as string,
  },
};
