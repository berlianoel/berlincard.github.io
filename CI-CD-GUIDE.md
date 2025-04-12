# CI/CD Guide untuk CrimsonRealm

Dokumen ini menjelaskan proses Continuous Integration dan Continuous Deployment untuk aplikasi CrimsonRealm.

## Struktur CI/CD

Aplikasi ini dikonfigurasi untuk deployment ke tiga platform:

1. **GitHub Pages** - Untuk static frontend
2. **Vercel** - Untuk full-stack deployment
3. **Railway** - Untuk full-stack deployment dengan database

## GitHub Secrets yang Diperlukan

Workflow GitHub Actions memerlukan beberapa secret untuk berfungsi dengan baik:

### Umum
- `DATABASE_URL` - URL koneksi database PostgreSQL

### Untuk Vercel
- `VERCEL_TOKEN` - Token API Vercel untuk deployment

### Untuk Railway
- `RAILWAY_TOKEN` - Token API Railway
- `RAILWAY_SERVICE_ID` - ID service di Railway
- `RAILWAY_APP_URL` - URL aplikasi yang dideploy di Railway

## Alur CI/CD

```
[Push ke main] → [Build & Test] → [Trigger Platform-Specific Deployments]
                                   ├─→ [GitHub Pages Deployment]
                                   ├─→ [Vercel Deployment]
                                   └─→ [Railway Deployment]
```

## Workflow Files

1. `.github/workflows/ci-cd.yml` - Pipeline utama yang menjalankan build, test, dan memicu deployment
2. `.github/workflows/github-pages-deploy.yml` - Deployment ke GitHub Pages
3. `.github/workflows/vercel-deploy.yml` - Deployment ke Vercel
4. `.github/workflows/railway-deploy.yml` - Deployment ke Railway

## Menjalankan Deployment Manual

Deployment dapat dipicu secara manual di GitHub Actions UI:

1. Pergi ke tab "Actions" di repositori GitHub
2. Pilih workflow yang ingin dijalankan (GitHub Pages, Vercel, atau Railway)
3. Klik tombol "Run workflow"
4. Pilih branch yang ingin di-deploy dan klik "Run workflow"

## Troubleshooting

### Masalah Umum

- **Deployment gagal di GitHub Pages**: Pastikan `CNAME` di-set dengan benar di direktori `client/public/`
- **Masalah CORS**: Periksa konfigurasi CORS di `server/index.ts` untuk memastikan domain yang benar diizinkan
- **API tidak terhubung dari GitHub Pages**: Pastikan `VITE_GITHUB_PAGES_API_URL` diatur dengan benar

### Memeriksa Status Deployment

Setiap platform menyediakan dashboard untuk memeriksa status deployment:

- GitHub Pages: Di repositori GitHub, pergi ke Settings → Pages
- Vercel: Di dashboard Vercel (vercel.com)
- Railway: Di dashboard Railway (railway.app)

## Database Migrations

Database migrations dijalankan secara otomatis pada deployment ke Railway melalui `postDeploy` command di `railway.json`.