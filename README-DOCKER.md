# StudySync — Docker Desktop + MySQL + S3 lokal (4 container)

Panduan ini menggantikan cara lama yang memakai `localStorage` browser sebagai
"database". Sekarang semua data (Users, Courses, Tasks, Notes, Schedules)
disimpan di MySQL, dan file di Materials diunggah ke storage bertipe S3.

## Kenapa bukan `ministack` / `stackport`?

Instruksi WhatsApp yang kamu kirim menyuruh menjalankan:

```
docker run -d --name ministack-lokal -p 4566:4566 nahuelnucera/ministack
docker run -d --name stackport-ui -p 8080:8080 ... davireis/stackport
```

Kedua image itu (`nahuelnucera/ministack`, `davireis/stackport`) adalah image
Docker Hub milik akun pribadi, bukan image resmi/terverifikasi. Menjalankan
image tak dikenal begitu saja punya risiko supply-chain (isi image tidak bisa
diverifikasi). Sebagai gantinya, docker-compose di sini memakai
**`localstack/localstack`** — image resmi, API S3-nya identik (port 4566,
kompatibel dengan AWS SDK), tinggal pakai.

Kalau kamu tetap ingin GUI browser untuk lihat isi bucket S3, jalankan
terpisah setelah `docker compose up`:
```
docker run -d --name s3-gui -p 8080:8080 -e AWS_ENDPOINT_URL=http://host.docker.internal:4566 davireis/stackport
```
Ini opsional dan tidak dibutuhkan aplikasi — aplikasi hanya butuh service
`s3` di `docker-compose.yml`.

## Menjalankan

1. Pastikan Docker Desktop menyala.
2. Dari folder root project (yang berisi `docker-compose.yml`):
   ```
   docker compose up --build
   ```
3. Tunggu sampai MySQL sehat (healthcheck), backend akan otomatis membuat
   tabel-tabel lewat Sequelize `sync()` dan membuat bucket S3.
4. Akses:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - MySQL: `localhost:3306` — buka dengan client apa saja (MySQL Workbench,
     DBeaver, TablePlus, atau `mysql -h 127.0.0.1 -P 3306 -u studysync -p`),
     kredensial sesuai `backend/.env`. Container GUI khusus (phpMyAdmin)
     sengaja dilepas dari `docker-compose.yml` supaya jumlah service tetap
     minimal — cukup 4 container: `db`, `s3`, `backend`, `frontend`.
   - S3 (LocalStack) endpoint: http://localhost:4566

## Soal "localhost"

Aturan yang dipakai di seluruh project ini:

- **Di dalam container ke container** (backend → MySQL, backend → S3):
  **TIDAK BOLEH** pakai `localhost` — harus pakai nama service Docker
  (`db`, `s3`), karena di dalam container `localhost` menunjuk ke
  container itu sendiri, bukan container tetangganya. Ini sudah diatur di
  `docker-compose.yml` dan `backend/.env`.
- **Dari browser ke backend** (`VITE_API_URL`) dan **dari browser ke
  S3 untuk lihat/unduh file** (`S3_PUBLIC_ENDPOINT`): **boleh dan memang
  harus** pakai `localhost`, karena browser jalan di host machine kamu, di
  luar jaringan Docker — ini bukan bug, cuma sifat dasar port-mapping Docker.

## File .env

- `backend/.env` — kredensial MySQL, S3, JWT secret. Sudah ada default untuk
  development lokal (`backend/.env.example` sebagai referensi).
- `studysync/.env` — `VITE_API_URL` untuk frontend.

Ganti `JWT_SECRET` dan semua password sebelum dipakai di luar development.

## Yang masih pakai data statis (belum wired ke database)

Untuk menjaga scope tetap masuk akal, dua widget dashboard berikut masih
memakai data contoh (`src/data/activities.js`, `src/data/dashboard.js`),
karena butuh tabel log aktivitas / agregasi mingguan yang belum ada di
backend:
- **Aktivitas Terbaru** (`ActivityCard`)
- **Grafik progres mingguan** (`ProgressChart`)

Upload foto profil di halaman Profile juga sudah dilepas dulu (sebelumnya
disimpan sebagai base64 di localStorage) — bisa ditambahkan sebagai endpoint
upload ke S3 seperti Materials kalau dibutuhkan.

Semua fitur inti lain (Login/Register, Courses, Tasks, Notes, Schedule,
Materials + upload file ke S3) sudah terhubung penuh ke backend/MySQL/S3.
