/**
 * Modul konfigurasi terpusat AniStream
 * Membaca variabel lingkungan dengan nilai default (fallback)
 */
export const config = Object.freeze({
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.jikan.moe/v4',
  appName: import.meta.env.VITE_APP_NAME || 'AniStream',
  appEnv: import.meta.env.VITE_APP_ENV || 'development',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
});
