/**
 * API Configuration
 * 
 * File ini menentukan URL API berdasarkan environment deployment.
 * Ini memungkinkan aplikasi berjalan dengan benar di:
 * - Development (localhost)
 * - Vercel
 * - Railway
 * - GitHub Pages
 */

// Mendapatkan API URL dari berbagai sumber
const getApiUrl = (): string => {
  // Periksa apakah ada variabel global yang disetel oleh github-pages-redirect.js
  if (typeof window !== 'undefined' && window.CRIMSONREALM_API_URL) {
    return window.CRIMSONREALM_API_URL;
  }

  // Gunakan environment variable Vite jika tersedia
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // GitHub Pages perlu menggunakan Vercel/Railway API absolute URL
  if (typeof window !== 'undefined' && window.location.hostname.endsWith('github.io')) {
    return import.meta.env.VITE_GITHUB_PAGES_API_URL || 'https://crimson-realm-api.vercel.app';
  }

  // Untuk development dan deployment dengan backend yang sama (Vercel, Railway)
  // gunakan relative URL untuk menghindari CORS
  return '';
};

// Base path untuk router, berguna untuk GitHub Pages
export const getBasePath = (): string => {
  if (typeof window !== 'undefined' && window.CRIMSONREALM_ROUTER_BASE) {
    return window.CRIMSONREALM_ROUTER_BASE;
  }
  
  return '';
};

// API URL berdasarkan environment
export const API_URL = getApiUrl();

// Utility untuk membangun URL API lengkap
export const getApiEndpoint = (path: string): string => {
  const baseUrl = API_URL;
  
  // Pastikan path selalu diawali dengan slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${baseUrl}${normalizedPath}`;
};

// Fungsi untuk ping API dan memastikan koneksi
export const pingApi = async (): Promise<boolean> => {
  try {
    const response = await fetch(getApiEndpoint('/ping'));
    return response.ok;
  } catch (error) {
    console.error('API ping failed:', error);
    return false;
  }
};

// Log konfigurasi API untuk debugging
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('API Configuration:', {
    API_URL,
    basePath: getBasePath(),
    environment: import.meta.env.MODE
  });
}

export default {
  API_URL,
  getApiEndpoint,
  getBasePath,
  pingApi
};