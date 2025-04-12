# Panduan Deployment CrimsonRealm

Dokumen ini berisi panduan detail dan perbandingan untuk men-deploy aplikasi CrimsonRealm ke tiga platform yang berbeda.

## Perbandingan Platform

| Fitur | GitHub Pages | Vercel | Railway |
|-------|-------------|--------|---------|
| **Frontend** | ✅ | ✅ | ✅ |
| **Backend API** | ❌ | ✅ | ✅ |
| **Database** | ❌ | ❌ (Eksternal) | ✅ |
| **Full-stack** | Partial | ✅ | ✅ |
| **CI/CD** | ✅ | ✅ | ✅ |
| **Custom Domain** | ✅ | ✅ | ✅ |
| **Harga** | Gratis | Gratis (Batas tertentu) | Gratis (Batas tertentu) |
| **Performa** | Baik | Sangat Baik | Sangat Baik |
| **File Config** | `.github/workflows/` | `vercel.json` | `railway.json` |

## Pemilihan Platform

- **GitHub Pages**: Pilihan terbaik untuk static frontend dengan backend API yang terpisah. Mudah diatur dan gratis.
- **Vercel**: Pilihan terbaik untuk aplikasi full-stack dengan deployment yang cepat dan mudah. Memerlukan database eksternal.
- **Railway**: Pilihan terbaik untuk aplikasi full-stack dengan database terintegrasi. Memiliki dashboard yang mudah digunakan untuk mengelola layanan.

## Konfigurasi Platform-Specific

### GitHub Pages

CrimsonRealm menggunakan pendekatan khusus untuk GitHub Pages:

1. **Routing SPA**: Menggunakan 404.html untuk routing client-side yang tidak didukung oleh GitHub Pages secara native.
2. **Base Path**: Menambahkan `<base>` tag di HTML untuk memastikan resource dimuat dengan benar relatif terhadap base path repositori.
3. **API Configuration**: Pada GitHub Pages, frontend dihosting terpisah dari API, sehingga konfigurasi API endpoint diatur melalui environment variable `VITE_GITHUB_PAGES_API_URL`.

Solusi ini memungkinkan single-page application berjalan dengan baik di GitHub Pages.

### Vercel

Konfigurasi untuk Vercel berfokus pada:

1. **Server-side Routing**: Menggunakan fitur routing bawaan Vercel untuk mengarahkan semua request ke server/index.ts.
2. **GitHub Integration**: Mengaktifkan integrasi GitHub untuk deployment otomatis.
3. **CORS Headers**: Mengonfigurasi header CORS untuk API agar dapat diakses dari frontend di domain yang berbeda.

Kelebihan Vercel adalah kemampuannya untuk hosting API dan frontend dalam satu deployment.

### Railway

Railway memberikan solusi all-in-one:

1. **Database PostgreSQL**: Railway menyediakan database PostgreSQL terintegrasi yang dioptimalkan untuk aplikasi web.
2. **Health Checks**: Konfigurasi health check untuk memastikan aplikasi berjalan dengan baik.
3. **Post-Deploy Scripts**: Otomatisasi migrasi database setelah deployment dengan post-deploy hook.

Railway adalah pilihan ideal untuk aplikasi full-stack yang membutuhkan database.

## Teknologi CI/CD

Aplikasi ini menggunakan GitHub Actions sebagai sistem CI/CD:

1. **Main Workflow**: `.github/workflows/ci-cd.yml` yang membangun, menguji, dan memicu deployment.
2. **Platform-specific Workflows**:
   - `.github/workflows/github-pages-deploy.yml`
   - `.github/workflows/vercel-deploy.yml`
   - `.github/workflows/railway-deploy.yml`

Workflow ini menyederhanakan proses deployment dan memastikan kualitas yang konsisten.

## Konfigurasi Environment

Variabel environment yang diperlukan:

### Umum
- `DATABASE_URL`: URL koneksi database PostgreSQL
- `SESSION_SECRET`: Secret untuk enkripsi session
- `NODE_ENV`: `development` atau `production`

### GitHub Pages
- `VITE_GITHUB_PAGES_API_URL`: URL API endpoint yang digunakan oleh GitHub Pages deployment

### Vercel
- `VERCEL_TOKEN`: Token API Vercel untuk deployment otomatis

### Railway
- `RAILWAY_TOKEN`: Token API Railway
- `RAILWAY_SERVICE_ID`: ID service di Railway
- `RAILWAY_APP_URL`: URL aplikasi di Railway

## Alur Deployment

Aplikasi ini mendukung dua metode deployment:

### Manual Deployment
Menggunakan script `deploy.sh` untuk deployment ke platform pilihan:
```bash
./deploy.sh [platform]
```

### Otomatis melalui CI/CD
Push ke branch `main` akan memicu workflow CI/CD yang akan men-deploy ke semua platform secara otomatis.

## Troubleshooting

### Cross-Origin Resource Sharing (CORS)
Karena GitHub Pages memisahkan frontend dan backend, CORS dikonfigurasi dengan benar untuk memastikan API dapat diakses lintas domain.

### Base Path di GitHub Pages
URI di GitHub Pages mengandung nama repositori yang memerlukan penyesuaian path di aplikasi React. Ini ditangani oleh custom hook di `App.tsx` dan `github-pages-redirect.js`.

### Static Routing
GitHub Pages tidak mendukung server-side redirects, sehingga routing diimplementasikan dengan kombinasi:
1. Custom 404.html yang menyimpan path yang diminta dan melakukan redirect ke homepage
2. Script yang mendeteksi path yang disimpan dan mengarahkan aplikasi React ke halaman yang tepat