/**
 * Script ini menangani routing SPA di GitHub Pages
 * 
 * Ketika aplikasi berjalan di GitHub Pages, base URL akan berisi nama repositori.
 * Script ini mendeteksi apakah aplikasi berjalan di GitHub Pages dan menyesuaikan routing.
 */

(function() {
  // Deteksi jika ini adalah GitHub Pages
  function isGitHubPages() {
    return window.location.hostname.endsWith('github.io');
  }

  // Dapatkan nama repositori dari URL jika di GitHub Pages
  function getRepoName() {
    if (!isGitHubPages()) return '';
    
    const pathSegments = window.location.pathname.split('/');
    if (pathSegments.length > 1) {
      return pathSegments[1];
    }
    return '';
  }

  // Setel base path untuk router
  function setRouterBasePath() {
    window.CRIMSONREALM_ROUTER_BASE = isGitHubPages() ? '/' + getRepoName() : '';
  }

  // Tangani redirect dari 404.html
  function handleRedirect() {
    const redirectPath = localStorage.getItem('crimsonrealmRedirectPath');
    if (redirectPath) {
      // Hapus path dari localStorage agar tidak looping redirect
      localStorage.removeItem('crimsonrealmRedirectPath');
      
      // Tunggu hingga router tersedia, lalu navigasi
      const waitForRouter = setInterval(() => {
        if (window.navigateToCrimsonRoute) {
          clearInterval(waitForRouter);
          window.navigateToCrimsonRoute(redirectPath);
        }
      }, 100);
      
      // Batas waktu jika router tidak pernah tersedia
      setTimeout(() => {
        clearInterval(waitForRouter);
      }, 5000);
    }
  }

  // Konfigurasi API endpoint berdasarkan environment
  function configureApiEndpoint() {
    const hostname = window.location.hostname;
    
    if (hostname.endsWith('github.io')) {
      // GitHub Pages - Gunakan endpoint API dari Railway atau Vercel
      window.CRIMSONREALM_API_URL = process.env.VITE_DEFAULT_API_URL || 'https://crimson-realm-api.vercel.app';
    } else if (hostname.endsWith('vercel.app')) {
      // Vercel deployment - Gunakan relative path
      window.CRIMSONREALM_API_URL = '';
    } else if (hostname.endsWith('railway.app') || hostname.includes('railway.')) {
      // Railway deployment - Gunakan relative path
      window.CRIMSONREALM_API_URL = '';
    } else {
      // Lingkungan development atau lainnya - Gunakan localhost
      window.CRIMSONREALM_API_URL = process.env.VITE_API_URL || '';
    }
  }

  // Inisialisasi semua konfigurasi
  function init() {
    setRouterBasePath();
    configureApiEndpoint();
    handleRedirect();
    
    // Debug info
    console.log('CrimsonRealm environment:', {
      isGitHubPages: isGitHubPages(),
      repoName: getRepoName(),
      basePath: window.CRIMSONREALM_ROUTER_BASE,
      apiUrl: window.CRIMSONREALM_API_URL
    });
  }

  // Jalankan inisialisasi saat dokumen siap
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();