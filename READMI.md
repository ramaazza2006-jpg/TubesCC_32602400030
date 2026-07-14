# 📚 StudySync

StudySync merupakan aplikasi manajemen aktivitas perkuliahan berbasis web yang dikembangkan sebagai proyek mata kuliah **Cloud Computing**.

Aplikasi ini membantu mahasiswa mengelola aktivitas akademik dalam satu platform, seperti:

- Login & Register
- Mata Kuliah
- Jadwal Perkuliahan
- Tugas
- Catatan
- Materi Kuliah
- Penyimpanan file menggunakan S3 Compatible Storage

---

# Daftar Isi

- Tentang Project
- Teknologi
- Arsitektur Sistem
- Persyaratan
- Instalasi
- Menjalankan Project
- Penggunaan
- Struktur Folder
- Docker
- Database
- Object Storage
- API
- Troubleshooting
- Pengembangan Selanjutnya

---

# Tentang Project

StudySync menggunakan arsitektur client-server.

```
Frontend (React)
        │
        │ REST API
        ▼
Backend (Express)
        │
        ├────────► MySQL
        │
        └────────► MiniStack (S3)
```

Frontend bertugas menampilkan antarmuka pengguna.

Backend menangani autentikasi, database, dan upload file.

File materi kuliah tidak disimpan di database, tetapi disimpan pada S3 Compatible Storage (MiniStack), sedangkan database hanya menyimpan metadata file.

---

# Teknologi

## Frontend

- React
- Vite
- Axios
- React Hot Toast
- Lucide React

## Backend

- Node.js
- Express.js
- Sequelize
- Multer
- JWT

## Database

- MySQL 8

## Object Storage

- MiniStack (S3 Compatible)

## Container

- Docker
- Docker Compose

---

# Persyaratan

Pastikan software berikut sudah terinstall.

| Software | Versi Minimum |
|-----------|---------------|
| Docker Desktop | Latest |
| Git | Latest |
| NodeJS | 20+ |
| MySQL Client (Opsional) | Bebas |

---

# Clone Repository

Clone repository terlebih dahulu.

```bash
git clone https://github.com/USERNAME/TubesCC_studysync.git
```

Masuk ke folder project.

```bash
cd TubesCC_studysync
```

---

# Struktur Project

```
TubesCC_studysync

│
├── backend/
│
├── studysync/
│
├── docker-compose.yml
│
├── README.md
│
└── .gitignore
```

---

# Konfigurasi Environment

## Backend

Masuk ke folder backend.

```bash
cd backend
```

Buat file

```
.env
```

Contoh isi

```env
PORT=5000

DB_HOST=db
DB_PORT=3306
DB_NAME=studysync

DB_USER=studysync
DB_PASSWORD=studysync123

JWT_SECRET=studysyncsecret

S3_ENDPOINT=http://host.docker.internal:4566
S3_PUBLIC_ENDPOINT=http://localhost:4566

S3_BUCKET=studysync-materials

S3_REGION=us-east-1

S3_ACCESS_KEY_ID=test
S3_SECRET_ACCESS_KEY=test
```

---

# Build Docker

Kembali ke root project.

```bash
docker compose up -d --build
```

Docker akan membuat container

- MySQL
- Backend
- Frontend

---

# Menjalankan MiniStack

Jalankan MiniStack.

```bash
docker run -d \
--name ministack-lokal \
-p 4566:4566 \
nahuelnucera/ministack
```

---

# Menjalankan Stackport

(Optional)

Untuk melihat isi bucket.

```bash
docker run -d \
--name stackport-ui \
-p 8080:8080 \
-e AWS_ENDPOINT_URL=http://host.docker.internal:4566 \
-e AWS_ACCESS_KEY_ID=test \
-e AWS_SECRET_ACCESS_KEY=test \
-e AWS_DEFAULT_REGION=us-east-1 \
davireis/stackport
```

---

# Mengecek Container

```bash
docker ps
```

Harus muncul

```
studysync_backend

studysync_frontend

studysync_db

ministack-lokal

stackport-ui
```

---

# Membuka Aplikasi

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

MiniStack

```
http://localhost:4566
```

Stackport

```
http://localhost:8080
```

---

# Registrasi

Saat pertama kali membuka website

1. Klik Register

2. Isi

- Nama
- Email
- Password

3. Klik Register

4. Login

---

# Dashboard

Dashboard menampilkan

- Jumlah Mata Kuliah
- Jumlah Jadwal
- Jumlah Tugas
- Statistik

---

# Menambah Mata Kuliah

Masuk menu

```
Courses
```

Klik

```
Tambah Mata Kuliah
```

Isi

- Nama
- Kode
- Dosen

Simpan.

---

# Menambah Jadwal

Masuk menu

```
Schedule
```

Klik

```
Tambah Jadwal
```

Isi

- Hari
- Jam
- Mata Kuliah
- Ruangan

Simpan.

---

# Menambah Tugas

Masuk menu

```
Tasks
```

Klik

```
Tambah Tugas
```

Isi

- Judul
- Mata Kuliah
- Deadline

Simpan.

---

# Upload Materi

Masuk menu

```
Materials
```

Klik

```
Upload File
```

Pilih file.

Klik Upload.

File akan

✔ disimpan ke MiniStack

Metadata disimpan ke MySQL.

---

# Download Materi

Klik

```
Download
```

Backend akan membuat Presigned URL selama 5 menit.

Browser otomatis mengunduh file.

---

# Delete Materi

Klik

```
Delete
```

Object pada S3 akan dihapus.

Data pada database juga ikut dihapus.

---

# Database

Host

```
localhost
```

Port

```
3306
```

Username

```
root
```

Password

```
root123
```

Database

```
studysync
```

Melihat isi database

```sql
USE studysync;

SELECT * FROM materials;
```

---

# Object Storage

Bucket

```
studysync-materials
```

Struktur

```
materials/

└── userId

      └── file.pdf
```

---

# Docker Command

Build

```bash
docker compose up -d --build
```

Stop

```bash
docker compose down
```

Restart Backend

```bash
docker restart studysync_backend
```

Log Backend

```bash
docker logs -f studysync_backend
```

Container

```bash
docker ps
```

---

# Pengujian

## Upload

- Login
- Upload PDF
- Pastikan file muncul pada menu Materials

## Download

Klik Download

Pastikan file berhasil diunduh.

## Delete

Klik Delete

Pastikan

- file hilang dari aplikasi
- object hilang dari bucket
- data hilang dari database

---

# Troubleshooting

## Backend tidak berjalan

```bash
docker logs studysync_backend
```

---

## Database tidak connect

```bash
docker restart studysync_db
```

---

## Bucket belum dibuat

Restart backend

```bash
docker restart studysync_backend
```

Backend otomatis membuat bucket.

---

## Melihat isi Bucket

Buka

```
http://localhost:8080
```

---

# Screenshot

Tambahkan screenshot berikut.

- Login
- Dashboard
- Courses
- Schedule
- Tasks
- Notes
- Materials
- Stackport
- Database

---

# Pengembangan Selanjutnya

Beberapa fitur yang direncanakan:

- Preview PDF
- Preview DOCX
- Folder Materi
- Share File
- Google Calendar
- Reminder Deadline
- Dark Mode
- Progressive Web App (PWA)
- Deploy ke AWS EC2
- Migrasi ke AWS S3
- CI/CD GitHub Actions

---

# Kontributor

Project ini dikembangkan oleh kelompok StudySync sebagai tugas mata kuliah **Cloud Computing**.

---

# Lisensi

Project ini dibuat untuk keperluan pembelajaran dan penelitian di lingkungan akademik.