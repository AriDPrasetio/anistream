# Matriks Prioritas Fitur & Batasan MVP (Scope Gate)

Dokumen ini menetapkan pembagian tegas seluruh fitur aplikasi AniStream ke dalam tiga tingkatan prioritas: **Tingkat 1: Wajib (MVP)**, **Tingkat 2: Penting Setelah MVP (Post-MVP)**, dan **Tingkat 3: Bonus (Stretch Goals)**, serta menegaskan batasan fitur yang ditolak (_Non-Goals_).

Dokumen ini berfungsi sebagai **Scope Gate**: pelindung utama pengembang dari jebakan _scope creep_ (pembengkakan fitur yang tak kunjung selesai).

---

## 1. Aturan Emas Eksekusi (The 100% Rule)

> [!IMPORTANT]
> **Prinsip Disiplin SDLC:**  
> Jangan pernah menyentuh atau mengimplementasikan fitur dari kelompok berikutnya sebelum seluruh fitur pada kelompok sebelumnya **100% selesai, diuji, memenuhi Definition of Done (DoD), dan di-merge ke branch `main`**.

---

## 2. Matriks Tiga Tingkat Prioritas Fitur

| Tingkat | Kategori Prioritas                                                | Daftar Fitur & Spesifikasi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Target Fase Pengerjaan | Kriteria Sukses Minimum                                                                                                                           |
| :-----: | :---------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------ |
|  **1**  | **Wajib (MVP Scope)**<br>_(Core Platform)_                        | **1. Beranda Interaktif:** Hero banner anime unggulan & carousel/grid anime terpopuler musim ini.<br>**2. Pencarian & Filter Dasar:** Input pencarian judul (debounce) & dropdown filter genre.<br>**3. Halaman Detail Anime:** Poster, sinopsis, skor, genre, status, trailer YouTube, & list episode.<br>**4. Halaman Pemutar Video (Player):** Video player HTML5 kustom (Play/Pause, seekbar waktu, kontrol volume, fullscreen) dengan video stream uji coba legal.<br>**5. Watchlist Lokal:** Bookmark anime favorit tersimpan di `localStorage` browser. | **Fase 1 s/d Fase 4**  | Pengguna dapat membuka web, mencari anime, melihat sinopsis lengkap, memutar video episode 1, dan menyimpan judul ke watchlist tanpa login.       |
|  **2**  | **Penting Setelah MVP (Post-MVP)**<br>_(Experience Enhancements)_ | **1. Simulasi Autentikasi (UI Form):** Form Login & Register interaktif dengan validasi error inline & mock session token.<br>**2. Lanjutkan Menonton (Continue Watching):** Pelacakan posisi menit terakhir video diputar di `localStorage` + tombol pintas resume tontonan.<br>**3. Sakelar Tema Gelap/Terang:** Toggle tema instan (Dark/Light Mode) berbasis CSS variables tanpa reload halaman.                                                                                                                                                           |       **Fase 5**       | Antarmuka terasa lebih personal; progress tontonan tidak hilang saat browser ditutup; form validasi bekerja secara aksesibel.                     |
|  **3**  | **Bonus (Stretch Goals)**<br>_(Nice-to-Have)_                     | **1. Infinite Scroll / Smart Pagination:** Pemuatan katalog otomatis saat scroll mencapai ujung bawah layar.<br>**2. Internasionalisasi (Multi-Bahasa / i18n):** Sakelar bahasa antarmuka (Bahasa Indonesia & English).<br>**3. Progressive Web App (PWA):** Dukungan instalasi aplikasi di homescreen ponsel dan caching offline sederhana via Service Worker.                                                                                                                                                                                                | **Fase 6 (Opsional)**  | Fitur nilai tambah yang hanya disentuh jika seluruh pipeline pengujian, audit aksesibilitas, dan deployment telah tuntas lebih cepat dari jadwal. |

---

## 3. Batasan Tegas: Fitur yang DITOLAK (Non-Goals)

Untuk memastikan kelancaran belajar arsitektur frontend web tanpa komplikasi berlebih, fitur-fitur berikut **secara eksplisit ditolak dari seluruh siklus proyek**:

- ❌ **Sistem Pembayaran / Langganan (No Payment Gateway):** Proyek bersifat murni edukasi non-komersial.
- ❌ **Fitur Unggah Video oleh Pengguna (No User Video Upload):** Menghindari beban penyimpanan cloud, transkoding video server, dan risiko hak cipta.
- ❌ **Fitur Komentar Real-time / Live Chat:** Menghindari kebutuhan arsitektur WebSocket / database real-time.
- ❌ **Aplikasi Mobile Native (React Native / Flutter / Kotlin / Swift):** Fokus 100% pada ekosistem _Responsive Web Standards_ (HTML5, CSS, Vanilla JS / React Web).
- ❌ **Backend Custom / Database Server Sendiri:** Menggunakan API publik pihak ketiga (Jikan API v4) dan Mock Service Worker (MSW) untuk simulasi.

---

## 4. Persetujuan Scope Gate (Sign-off)

Dengan ditetapkannya matriks ini:

1. Setiap keputusan penambahan fitur baru di tengah jalan wajib diklasifikasikan ke dalam dokumen ini terlebih dahulu.
2. Fokus eksekusi Fase 1 s/d Fase 4 terkunci murni pada **Tingkat 1 (MVP)**.
