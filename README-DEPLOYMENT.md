# Panduan Deployment CrimsonRealm

Dokumen ini berisi langkah-langkah detail untuk deployment aplikasi CrimsonRealm ke Vercel dan Railway.

## Deployment ke Vercel

### Persiapan

1. Pastikan Anda memiliki akun [Vercel](https://vercel.com) dan telah login
2. Push kode ke repository GitHub
3. Hubungkan repository GitHub dengan Vercel

### Konfigurasi

1. Di dashboard Vercel, pilih "New Project"
2. Impor repository GitHub yang berisi aplikasi CrimsonRealm
3. Pada halaman konfigurasi, atur:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: npm run build
   - **Output Directory**: dist
   - **Install Command**: npm install

4. Tambahkan variabel lingkungan berikut:
   - `DATABASE_URL` - URL koneksi PostgreSQL (misalnya dari Neon)
   - `SESSION_SECRET` - Secret key untuk session (string acak)
   - `NODE_ENV` - Set ke "production"

5. Klik "Deploy"

### Pemecahan Masalah Umum

1. **Error koneksi database**:
   - Periksa apakah `DATABASE_URL` sudah benar
   - Pastikan database sudah dibuat di provider PostgreSQL
   - Untuk Neon, pastikan opsi "Pooled connection" diaktifkan

2. **Error CORS**:
   - Aplikasi sudah mengatur CORS secara otomatis untuk domain Vercel
   - Jika masih terjadi error, tambahkan domain Vercel ke daftar CORS yang diizinkan

3. **Error "Cannot find module"**:
   - Coba redeploy dengan menambahkan `--include=dev` pada Install Command: `npm install --include=dev`

## Deployment ke Railway

### Persiapan

1. Pastikan Anda memiliki akun [Railway](https://railway.app) dan telah login
2. Push kode ke repository GitHub
3. Hubungkan repository GitHub dengan Railway

### Konfigurasi

1. Di dashboard Railway, pilih "New Project" → "Deploy from GitHub repo"
2. Pilih repository GitHub yang berisi aplikasi CrimsonRealm
3. Railway akan secara otomatis mendeteksi konfigurasi dari `railway.json`

4. Tambahkan database PostgreSQL:
   - Klik "New" → "Database" → "PostgreSQL"
   - Railway akan secara otomatis menyediakan `DATABASE_URL`

5. Tambahkan variabel lingkungan berikut:
   - `SESSION_SECRET` - Secret key untuk session (string acak)
   - `NODE_ENV` - Set ke "production"

6. Deploy project

### Pemecahan Masalah Umum

1. **Error build**:
   - Periksa log build di Railway dashboard
   - Pastikan file `build-for-deploy.sh` memiliki permission eksekusi
   - Anda dapat mengubah permission di local dengan: `chmod +x build-for-deploy.sh`

2. **Error koneksi database**:
   - Railway menautkan database secara otomatis, periksa tab "Variables" untuk memastikan `DATABASE_URL` telah diatur

3. **Error runtime**:
   - Periksa log aplikasi di dashboard Railway
   - Coba restart service jika diperlukan

## Pengaturan Database

Aplikasi CrimsonRealm memerlukan PostgreSQL. Berikut cara menyiapkannya:

### Menggunakan Neon (untuk Vercel)

1. Buat akun di [Neon](https://neon.tech)
2. Buat project baru
3. Salin connection string dari Neon dashboard
4. Tambahkan ke variabel lingkungan `DATABASE_URL` di Vercel

### Menggunakan Railway PostgreSQL

1. Tambahkan PostgreSQL service di Railway
2. Railway akan secara otomatis menyediakan variabel `DATABASE_URL`
3. Tidak diperlukan konfigurasi tambahan

### Skema Database

Aplikasi akan secara otomatis membuat tabel ketika pertama kali berjalan, tetapi Anda juga dapat menjalankan migrasi secara manual:

```bash
DATABASE_URL=your_connection_string npm run db:push
```

## Catatan Penting

- Pastikan domain deployment Anda ditambahkan ke variabel `CORS_ORIGIN` jika menggunakan domain kustom
- Pertama kali deployment, aplikasi akan membuat user admin default dengan username `berlin` dan password `admin`
- Ganti password default admin segera setelah deployment berhasil

Jika menemui masalah lain, buka issue di repository GitHub atau hubungi dukungan pengembang.