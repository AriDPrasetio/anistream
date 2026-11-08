# Dokumentasi Arsitektur Folder AniStream

Struktur direktori kode sumber dirancang dengan pembagian tanggung jawab yang ketat:

- **`src/app/`**: Bertanggung jawab atas routing aplikasi Single Page Application (SPA), konfigurasi rute, dan inisialisasi lifecycle halaman.
- **`src/core/`**: Fondasi teknis internal aplikasi, seperti pembungkus HTTP Client (Fetch wrapper), State Store reaktif sederhana, Event Bus, dan loader konfigurasi.
- **`src/services/`**: Lapisan perantara untuk berkomunikasi dengan API eksternal (Jikan API). Berisi fungsi pemanggil endpoint tanpa mempedulikan manipulasi DOM UI.
- **`src/mappers/`**: Lapisan transformasi data. Mengubah payload JSON mentah dari Jikan API yang tidak teratur menjadi model objek internal AniStream yang aman dan bersih.
- **`src/pages/`**: Komponen tampilan tingkat halaman (Home, Explore, Detail, Watch, Watchlist, 404). Merakit komponen-komponen UI menjadi satu tampilan utuh.
- **`src/components/`**: Komponen UI independen dan dapat digunakan kembali (Navbar, AnimeCard, Modal, LoadingSpinner, VideoPlayer).
- **`src/styles/`**: Pengorganisasian CSS berlapis (Design Tokens, Reset, Typography, Layout, dan Style komponen).
- **`src/utils/`**: Fungsi pembantu murni (pure functions) yang tidak memiliki efek samping (formatting durasi menit/jam, debounce timer, sanitasi string).
- **`tests/`**: Berkas pengujian unit dan integrasi.
- **`docs/`**: Seluruh artefak perencanaan produk, arsitektur, dan panduan belajar.
