# Wireframe Low-Fidelity AniStream (Fase 0 — Langkah 23)

Dokumen ini menyimpan artefak sketsa tata letak kasar (_low-fidelity wireframe_) untuk 4 halaman inti MVP AniStream dengan pendekatan **Mobile-First** (`375px` → `1280px`) dan cakupan **4 state antarmuka** (`Normal`, `Loading`, `Empty`, `Error`).

> **Kanvas Figma Design:** [AniStream — Low-Fidelity Wireframes (Fase 0)](https://www.figma.com/design/ztzAzJ7dhJmyxrBPv7Cpo9)  
> **Prinsip Desain:** Murni grayscale (kotak, garis silang placeholder, teks hierarki) untuk menguji posisi elemen, prioritas informasi, dan pemulihan kondisi gagal sebelum masuk ke perancangan Design Tokens (Langkah 24) dan kode CSS (Fase 1).

---

## 1. Daftar Artefak Wireframe

| No  | Halaman                    | Rute                  | Berkas SVG (Repositori)                            | Fokus Tata Letak Mobile (`375px`) → Desktop (`1280px`)                                       |
| :-: | :------------------------- | :-------------------- | :------------------------------------------------- | :------------------------------------------------------------------------------------------- |
|  1  | **Beranda (Home)**         | `/`                   | [`01-beranda.svg`](./01-beranda.svg)               | Drawer `[☰]` + Hero stack + Scroll/Grid 2 kol → Navbar inline + Hero split + Grid 5 kol     |
|  2  | **Jelajah (Explore)**      | `/explore`            | [`02-jelajah.svg`](./02-jelajah.svg)               | Search input + Chip genre scroll horizontal + Grid 2 kol → Toolbar filter penuh + Grid 5 kol |
|  3  | **Detail Anime**           | `/anime/:id`          | [`03-detail-anime.svg`](./03-detail-anime.svg)     | Poster mini + CTA penuh + Grid episode 4 kol → 2 kolom sticky poster + Grid episode 8 kol    |
|  4  | **Halaman Tonton (Watch)** | `/watch/:id/:episode` | [`04-halaman-tonton.svg`](./04-halaman-tonton.svg) | Player `16:9` full-bleed + Info + Grid episode → Split theater player + Sidebar playlist     |

---

## 2. Matriks Cakupan 4 State Antarmuka

Setiap halaman pada SVG di atas merancang 4 kondisi UI secara lengkap:

1. **State Normal:** Konten utama tampil penuh dengan penanda jelas untuk area interaktif (tombol CTA utama, chip filter, tombol episode, kontrol player, dan toggle watchlist).
2. **State Loading:** Kerangka _skeleton loader_ yang dimensinya menyamai state Normal agar mencegah _Cumulative Layout Shift (CLS)_. Pada halaman `/explore`, input pencarian tetap aktif selama loading.
3. **State Empty:** Pesan ramah saat data bernilai kosong (`0 hasil` di Jelajah, daftar episode belum tersedia untuk anime _Upcoming_, atau katalog beranda kosong) beserta tombol aksi pemulihan (_Reset Filter_, _Jelajahi Katalog_, atau _Simpan ke Watchlist_).
4. **State Error / Offline:** Penanganan khusus untuk kegagalan jaringan, Jikan API `HTTP 429`, ID 404, maupun _Video Stream Error_ (overlay gelap di atas area player `16:9` dengan tombol **Segarkan Player** dan navigasi episode lain tetap dapat diakses).

---

## 3. Keputusan Tata Letak Mobile-First Utama

- **Navigasi Global:** Layar sempit (`375px`) menyembunyikan tautan halaman (`Beranda`, `Jelajah`, `Watchlist`) ke dalam tombol drawer `[☰]` agar header tidak sesak dan pencarian cepat tetap dapat diakses. Di desktop (`>= 1024px`), tautan tampil sejajar.
- **Kontrol Pencarian (`/explore`):** Chip genre menggunakan _horizontal scroll_ pada ponsel agar katalog langsung terlihat di atas lipatan layar (_above the fold_), lalu berkembang menjadi baris `flex-wrap` di desktop.
- **Pemutar Video (`/watch/:id/:episode`):** Menjaga rasio aspek `16:9` secara ketat di semua ukuran dan semua state (termasuk saat Loading & Stream Error) sehingga daftar episode di bawah atau di sampingnya tidak bergeser.

---

## 4. Checklist Validasi Langkah 23

- [x] Folder `docs/wireframes/` dibuat di repositori `anistream/`.
- [x] Sketsa versi mobile (`375px`) digambar lebih dulu untuk 4 halaman inti.
- [x] Penyesuaian tata letak untuk versi desktop (`1280px`) terdokumentasi di setiap lembar.
- [x] Keempat state UI (`Normal`, `Loading`, `Empty`, `Error`) terwakili pada setiap halaman.
- [x] Tautan kanvas Figma Design dan berkas `.svg` versi repositori terhubung.
