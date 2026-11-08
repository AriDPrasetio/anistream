# Daftar Halaman dan Rute (Route Specification) AniStream

Dokumen ini mendefinisikan arsitektur informasi dan spesifikasi rute aplikasi (_Single Page Application_) AniStream. Dokumen ini menjadi acuan utama bagi pembangunan _Client-side Router_ (HTML5 History API) pada Fase 2 serta penyiapan lapisan integrasi API (_Services & Mappers_) pada Fase 3.

---

## 1. Prinsip Navigasi & Pola Akses (Model Freemium / Zero-Friction)

Sesuai kesepakatan produk, AniStream mengadopsi pola **Zero-Friction**:

- Seluruh konten video uji coba dan katalog publik dapat diakses secara instan oleh siapa saja (**Guest**) tanpa keharusan login.
- Fitur Watchlist lokal beroperasi menggunakan `localStorage` browser.
- Halaman autentikasi (`/auth`) berfungsi sebagai fitur simulasi akun tingkat lanjut (Post-MVP / Fase 5).

---

## 2. Tabel Spesifikasi 7 Halaman & Rute Utama

| No  | Nama Halaman               | Pola URL (Route)      | Tujuan & Deskripsi Halaman                                                                                                                                 | Kebutuhan Endpoint API (Jikan v4)                                                                                                 |         Hak Akses (Auth)         |
| :-: | :------------------------- | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- | :------------------------------: |
|  1  | **Beranda (Home)**         | `/`                   | Menampilkan hero banner anime unggulan, daftar anime populer musim ini, dan daftar top anime sepanjang masa.                                               | • `GET /seasons/now` (Anime musim ini)<br>• `GET /top/anime?filter=bypopularity` (Anime terpopuler)                               |          Publik (Guest)          |
|  2  | **Jelajah (Explore)**      | `/explore`            | Pusat pencarian dan penjelajahan katalog dengan filter terpadu (kata kunci judul, genre, tipe, skor, dan status tayang).                                   | • `GET /anime?q={query}&genres={id}&order_by=score&sort=desc`<br>• `GET /genres/anime` (Daftar opsi genre)                        |          Publik (Guest)          |
|  3  | **Detail Anime**           | `/anime/:id`          | Menampilkan informasi lengkap anime: sinopsis, rating, genre, studio, trailer video YouTube, dan daftar tombol episode.                                    | • `GET /anime/{id}/full` (Detail lengkap)<br>• `GET /anime/{id}/episodes` (Daftar episode)<br>• `GET /anime/{id}/recommendations` |          Publik (Guest)          |
|  4  | **Halaman Tonton (Watch)** | `/watch/:id/:episode` | Pemutar video HTML5 kustom, navigasi antar episode (Next/Prev), dan panel daftar episode terkait di samping/bawah player.                                  | • Data detail anime dari cache/state<br>• Stream video uji coba publik legal<br>• Metadata nomor & judul episode                  |          Publik (Guest)          |
|  5  | **Profil & Watchlist**     | `/watchlist`          | Menampilkan koleksi anime yang disimpan pengguna (status: Ingin Ditonton, Sedang Ditonton, Selesai) serta histori tontonan terakhir (_continue watching_). | • Data lokal dari `localStorage` browser (ID, judul, poster, progress episode terakhir)                                           | Publik (Guest) / Opsional Member |
|  6  | **Autentikasi (Auth)**     | `/auth`               | Antarmuka interaktif form Login & Registrasi pengguna (simulasi form validation & local session management).                                               | • Mock Auth Service / validasi frontend murni (dummy token di `localStorage`)                                                     |          Publik (Guest)          |
|  7  | **Halaman 404**            | `*` (Catch-all)       | Menangkap rute URL yang tidak terdaftar, menampilkan pesan ramah, dan memandu pengguna kembali ke halaman utama.                                           | • Tidak memerlukan API (Statis)                                                                                                   |          Publik (Guest)          |

---

## 3. Detail Parameter Rute (Route Parameters)

Untuk memastikan implementasi router di Fase 2 terstruktur rapi dan mudah di-parse:

1. **Parameter Dinamis (Path Params):**
   - `:id` $\rightarrow$ ID unik anime dari Jikan API (contoh: `/anime/52991` untuk _Sousou no Frieren_). Wajib bertipe numerik.
   - `:episode` $\rightarrow$ Nomor episode yang sedang diputar (contoh: `/watch/52991/1`). Wajib bertipe numerik positif.

2. **Parameter Kueri (Query Params):**
   - Rute `/explore` mendukung parameter pencarian URL yang dapat di-_share_ atau di-_bookmark_:
     - `?q=naruto` (Pencarian teks)
     - `?genre=1,4` (Filter ID genre ganda)
     - `?status=airing` (Filter status tayang)
     - `?page=1` (Paginasi halaman)

---

## 4. Matriks Komponen UI Bersama (Shared Shell Layout)

Seluruh halaman di atas akan berada di dalam kerangka layout global (_Application Shell_) yang konsisten:

- **Header / Navbar:** Logo AniStream, Link Navigasi (Beranda, Jelajah, Watchlist), Quick Search Input, dan Tombol Masuk/Profil.
- **Main Container (`<main>`):** Area dinamis tempat konten rute dirender oleh Router.
- **Footer:** Pernyataan hak cipta non-komersial, atribusi API Jikan/MyAnimeList, dan tautan repositori GitHub proyek.
- **Global Toast / Modal Container:** Tempat menampilkan notifikasi status sistem (misal: "Ditambahkan ke Watchlist", "Koneksi Offline").
