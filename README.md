# CrimsonRealm Website

Situs web responsif dengan desain modern dan fungsionalitas lengkap.

## Fitur

- Halaman utama dengan hero section
- Halaman tentang kami (About)
- Halaman kontak dengan formulir
- Halaman petualangan (Adventures)
- Halaman destinasi (Destinations)
- Halaman admin (untuk pengelolaan konten)
- Desain responsif untuk semua perangkat

## Stack Teknologi

- **Frontend**: React, TailwindCSS, Shadcn UI
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (Neon)
- **Autentikasi**: Passport.js
- **ORM**: Drizzle
- **Deployment**: Vercel, Railway

## Persiapan Deployment

### Deployment di Vercel

1. Push kode ke GitHub repository
2. Login ke [Vercel](https://vercel.com)
3. Klik "New Project" dan pilih GitHub repository
4. Masuk ke tab "Environment Variables" dan tambahkan:
   - `DATABASE_URL` - URL koneksi PostgreSQL
   - `SESSION_SECRET` - Secret key untuk session (string acak)
   - `NODE_ENV` - Set ke "production"
5. Klik "Deploy"

### Deployment di Railway

1. Push kode ke GitHub repository
2. Login ke [Railway](https://railway.app)
3. Klik "New Project" dan pilih GitHub repository
4. Tambahkan PostgreSQL plugin dari marketplace
5. Tambahkan variabel lingkungan:
   - `SESSION_SECRET` - Secret key untuk session (string acak)
   - `NODE_ENV` - Set ke "production"
6. Railway akan secara otomatis mengatur `DATABASE_URL` dan `PORT`
7. Deploy project

## Pengaturan Database

Sebelum menjalankan aplikasi, siapkan database PostgreSQL:

1. Buat database PostgreSQL (bisa menggunakan Neon, Railway, atau penyedia lainnya)
2. Simpan URL koneksi sebagai variabel lingkungan `DATABASE_URL`
3. Schema dan tabel akan dibuat otomatis saat aplikasi pertama kali dijalankan

## Menjalankan Aplikasi Secara Lokal

1. Clone repository
2. Install dependencies: `npm install`
3. Buat file `.env` berdasarkan `.env.example`
4. Jalankan aplikasi: `npm run dev`
5. Buka [http://localhost:5000](http://localhost:5000)

## Kredit

Website ini dibuat oleh Berlianoel. Semua hak cipta dilindungi.