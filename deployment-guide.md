# Panduan Deployment CrimsonRealm

Panduan ini akan membantu Anda men-deploy aplikasi CrimsonRealm ke tiga platform berbeda: GitHub Pages, Vercel, dan Railway.

## Persiapan Umum

Sebelum melakukan deployment ke platform manapun, pastikan Anda telah:

1. Meng-clone repositori ini ke lokal
2. Menginstal semua dependencies dengan `npm install`
3. Memastikan aplikasi berjalan dengan baik di lingkungan lokal
4. Memiliki akun di platform yang akan digunakan (GitHub, Vercel, Railway)

## Deployment ke GitHub Pages

GitHub Pages akan men-deploy versi statis dari aplikasi frontend. API backend perlu di-deploy terpisah di Vercel atau Railway.

### Cara Manual

1. Build aplikasi dengan konfigurasi GitHub Pages:
   ```bash
   VITE_GITHUB_PAGES_API_URL=https://crimson-realm-api.vercel.app npm run build
   ```

2. Siapkan build untuk GitHub Pages:
   ```bash
   node github-pages-prepare.js nama-repositori-anda
   ```

3. Deploy ke branch gh-pages:
   ```bash
   npx gh-pages -d dist
   ```

### Dengan GitHub Actions

1. Buat branch `gh-pages` jika belum ada
2. Set GitHub repository secrets:
   - `API_URL`: URL dari API backend Anda (contoh: https://crimson-realm-api.vercel.app)
3. Push ke branch `main` atau jalankan workflow GitHub Pages secara manual

## Deployment ke Vercel

Vercel akan men-deploy aplikasi fullstack (frontend + backend + API).

### Cara Manual

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login ke Vercel:
   ```bash
   vercel login
   ```

3. Deploy aplikasi:
   ```bash
   vercel
   ```

4. Untuk deployment produksi:
   ```bash
   vercel --prod
   ```

### Dengan GitHub Actions

1. Dapatkan Vercel token dari dashboard Vercel (Settings → Tokens)
2. Set GitHub repository secrets:
   - `VERCEL_TOKEN`: Token API Vercel Anda
3. Push ke branch `main` atau jalankan workflow Vercel secara manual

## Deployment ke Railway

Railway akan men-deploy aplikasi fullstack dengan database PostgreSQL.

### Cara Manual

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login ke Railway:
   ```bash
   railway login
   ```

3. Inisialisasi project Railway:
   ```bash
   railway init
   ```

4. Tambahkan database PostgreSQL ke project
   Dari dashboard Railway, tambahkan PostgreSQL sebagai plugin

5. Deploy aplikasi:
   ```bash
   railway up
   ```

### Dengan GitHub Actions

1. Dapatkan Railway token dari dashboard Railway (Settings → API Tokens)
2. Dapatkan Railway service ID dari URL service Anda
3. Set GitHub repository secrets:
   - `RAILWAY_TOKEN`: Token API Railway Anda
   - `RAILWAY_SERVICE_ID`: ID service Railway Anda
   - `RAILWAY_APP_URL`: URL aplikasi Railway (untuk health check)
4. Push ke branch `main` atau jalankan workflow Railway secara manual

## Konfigurasi Environment Variables

### Variabel Lingkungan yang Diperlukan

- `DATABASE_URL`: URL koneksi database PostgreSQL
- `SESSION_SECRET`: Secret untuk sesi pengguna
- `NODE_ENV`: `development` atau `production`
- `VITE_API_URL`: URL API untuk frontend (jika berbeda dari host)
- `VITE_GITHUB_PAGES_API_URL`: URL API yang digunakan oleh deployment GitHub Pages

### Setting Variabel di Vercel

1. Di dashboard Vercel, pilih project Anda
2. Pergi ke "Settings" → "Environment Variables"
3. Tambahkan variabel yang diperlukan

### Setting Variabel di Railway

1. Di dashboard Railway, pilih project Anda
2. Pergi ke "Variables" tab
3. Tambahkan variabel yang diperlukan

## Pemecahan Masalah

### Routing dengan GitHub Pages

GitHub Pages tidak mendukung client-side routing secara native. Solusi ini menggunakan redirect 404.html untuk mengatasi masalah ini.

### CORS Issues

Jika frontend dan backend berada di domain berbeda, pastikan CORS dikonfigurasi dengan benar di server/index.ts.

### Database Migrations

Migrations dijalankan otomatis pada deployment Railway menggunakan postDeploy script.

### Vercel Build Fails

1. Periksa log build di dashboard Vercel
2. Pastikan vercel.json dikonfigurasi dengan benar
3. Coba build aplikasi secara lokal untuk mengidentifikasi masalah

## Domain Kustom

### GitHub Pages

1. Tambahkan file CNAME ke client/public/
2. Konfigurasi DNS di penyedia domain Anda

### Vercel & Railway

1. Tambahkan domain di dashboard platform
2. Ikuti instruksi verifikasi domain 
3. Konfigurasi DNS di penyedia domain Anda