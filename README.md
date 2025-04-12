# CrimsonRealm Website by Berlianoel

Website CrimsonRealm ini dibuat oleh Berlianoel dan dikonfigurasi untuk deployment di Railway, Vercel, dan GitHub Pages.

## Cara Deploy ke Railway

### Langkah 1: Buat akun Railway
- Buka [Railway.app](https://railway.app/)
- Buat akun atau login

### Langkah 2: Buat Project Baru
1. Klik "New Project" > "Deploy from GitHub"
2. Hubungkan repository GitHub Anda
3. Pilih repository yang berisi file CrimsonRealm by Berlianoel

### Langkah 3: Konfigurasi Environment Variables
1. Buka project di Railway
2. Klik tab "Variables"
3. Tambahkan variabel berikut:
   - DATABASE_URL: (otomatis jika menambahkan database)
   - SESSION_SECRET: (gunakan random string yang aman)

### Langkah 4: Tambahkan Database PostgreSQL
1. Klik "New" > "Add PostgreSQL"
2. Railway akan otomatis membuat database dan menambahkan `DATABASE_URL` ke environment variables

### Langkah 5: Konfigurasi Domain (Opsional)
1. Buka project di Railway
2. Klik tab "Settings"
3. Di bagian "Domains", klik "Generate Domain" atau tambahkan domain khusus

## Cara Deploy ke Vercel

### Langkah 1: Buat akun Vercel
- Buka [Vercel.com](https://vercel.com/)
- Buat akun atau login

### Langkah 2: Import Project
1. Klik "Add New" > "Project" 
2. Hubungkan repository GitHub Anda
3. Konfigurasi sesuai kebutuhan (Vercel akan otomatis mendeteksi pengaturan dari vercel.json)
4. Tambahkan environment variable DATABASE_URL dan SESSION_SECRET

## Cara Deploy ke GitHub Pages

GitHub Pages dikonfigurasi melalui GitHub Actions. Setiap kali Anda push ke branch main, website akan otomatis di-build dan di-deploy ke GitHub Pages.

### Langkah untuk mengaktifkan:
1. Pastikan repository sudah memiliki secret DATABASE_URL dan SESSION_SECRET
2. Push kode ke branch main
3. GitHub Actions akan menjalankan workflow di .github/workflows/github-pages.yml
4. Website Anda akan tersedia di https://username.github.io/repo-name/

## Menjalankan Aplikasi Secara Lokal

```bash
# Install dependencies
npm install

# Jalankan aplikasi
npm run dev
```

Server akan berjalan di http://localhost:5000

## Catatan Penting

- Aplikasi menggunakan port 5000, yang merupakan port standar di Railway
- Pastikan selalu memiliki database PostgreSQL yang dikonfigurasi dengan benar
- Gunakan secret key yang aman untuk SESSION_SECRET di environment variables

---

**Created by Berlianoel © 2023-2025**