# Ringkasan Produk

## A. Tujuan Proyek

AniStream adalah platform katalog dan web player streaming anime non-komersial yang dibangun untuk mempelajari dan mengimplementasikan arsitektur frontend web standar industri (SPA vanilla JavaScript, clean architecture layered services, state management, dan design tokens).

Proyek ini bukan produk komersial. Seluruh data anime bersumber dari API publik pihak ketiga (Jikan/AniList), dan video menggunakan stream uji coba publik yang legal.

---

## B. Pengguna (User Personas)

### 1. Rian — Casual Mobile Streamer (20 th)

Suka menonton anime saat senggang di ponsel. Tidak ingin repot navigasi berlapis-lapis, cukup buka, cari yang menarik, dan langsung tonton. Membutuhkan tampilan mobile yang cepat dibuka dan player yang nyaman disentuh.

**Kebutuhan utama:** akses cepat ke anime populer/trending, antarmuka mobile yang ringan.

### 2. Nadia — Binge Watcher (25 th)

Menonton banyak judul per musim. Aktif melacak anime on-going, memantau jadwal rilis musiman, dan mengelola daftar tontonan. Membutuhkan fitur pencarian cepat berdasarkan genre serta watchlist lokal untuk melacak episode yang belum ditonton.

**Kebutuhan utama:** pencarian & filter yang kuat, watchlist lokal, pelacakan progres tontonan.

### 3. Budi — New Explorer (28 th)

Jarang menonton anime. Hanya ingin mengeksplorasi anime apa yang sedang trending hari ini dan membaca sinopsis ringkas sebelum memutuskan menonton. Tidak butuh fitur pengelolaan tontonan yang kompleks.

**Kebutuhan utama:** halaman beranda yang informatif, sinopsis jelas, rekomendasi yang mudah ditemukan.

---

## C. Masalah yang Dipecahkan

Dari sudut pandang pengguna akhir, AniStream memecahkan masalah berikut:

- **Navigasi yang membingungkan:** Menemukan tontonan anime yang sesuai selera dengan cepat melalui pencarian, filter genre, dan daftar anime populer/musiman tanpa navigasi berlapis.
- **Kehilangan jejak tontonan:** Melacak riwayat episode terakhir yang ditonton secara otomatis tanpa keharusan mendaftar akun berbayar.
- **Antarmuka yang berantakan:** Memberikan pengalaman menjelajah dan menonton dengan tampilan yang bersih, responsif, dan bebas gangguan visual.
- **Informasi anime yang tersebar:** Menyajikan data anime yang komprehensif (sinopsis, genre, status, episode, skor) dari database publik yang luas dalam satu tempat yang mudah diakses.

---

## D. Yang Sengaja TIDAK Dibangun (Non-Goals)

Daftar berikut adalah batasan tegas untuk menjaga fokus proyek. Bukan berarti "tidak pernah selamanya", tetapi **bukan di scope MVP ini:**

- ❌ **Sistem pembayaran / langganan:** Proyek murni edukasi non-komersial.
- ❌ **Fitur unggah video oleh pengguna:** Menggunakan video streaming uji coba publik legal.
- ❌ **Fitur komentar real-time / chatroom:** Fokus pada katalog, player, dan navigasi.
- ❌ **Aplikasi mobile native (React Native / Flutter):** Fokus 100% pada responsive web application yang berjalan di browser mobile maupun desktop.
- ❌ **Backend custom / server sendiri:** Fokus pada konsumsi API publik pihak ketiga (Jikan/AniList), bukan membangun arsitektur server.
