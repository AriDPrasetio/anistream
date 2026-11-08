# 🎬 AniStream

AniStream adalah platform katalog dan streaming anime modern yang dibangun secara murni menggunakan **Vanilla JavaScript (ES Modules)** dan di-bundle menggunakan **Vite**. Proyek ini dibuat sebagai studi komprehensif dalam menguasai arsitektur frontend web tanpa ketergantungan framework di awal, mencakup routing SPA, state management reaktif, design tokens, dan integrasi API berlapis.

> ⚠️ **Pernyataan Non-Komersial & Legalitas:**  
> Proyek ini murni ditujukan untuk tujuan edukasi dan pembelajaran rekayasa perangkat lunak. Seluruh data metadata anime bersumber dari API publik **Jikan (Unofficial MyAnimeList API)** dan seluruh pemutaran video pengujian menggunakan aset open-source legal bebas royalti.

---

## 🚀 Fitur Utama & Rencana Fase

- [x] **Fase 0: Persiapan dan Perencanaan** (Setup repo, tooling, perancangan produk & arsitektur)
- [ ] **Fase 1: Fondasi UI** (Design tokens CSS, layout responsif, komponen dasar semantik)
- [ ] **Fase 2: Navigasi dan Routing** (SPA Client-side Routing dengan HTML5 History API)
- [ ] **Fase 3: Lapisan Data dan State** (Fetch wrapper, DTO Mappers, state store reaktif)
- [ ] **Fase 4: Pemutar Video dan Interaksi** (HTML5 Custom Video Player, Watchlist)
- [ ] **Fase 5: Optimasi dan Aksesibilitas** (WCAG 2.1 AA, Performance LCP, Caching)
- [ ] **Fase 6: Testing dan Deployment** (Unit Testing, CI/CD GitHub Actions, Vercel/Netlify)
- [ ] **Fase 7: Refaktor / Migrasi Lanjutan** (Migrasi terencana ke React + TypeScript)

---

## 🛠️ Tumpukan Teknologi (Tech Stack)

- **Bahasa:** Vanilla JavaScript (ES6+ Native Modules)
- **Build Tool & Dev Server:** [Vite](https://vitejs.dev/)
- **Gaya Tampilan:** CSS Modern (2-Tier Design Tokens, CSS Logical Properties, ITCSS Architecture)
- **Kualitas Kode:** ESLint (Flat Config), Prettier, EditorConfig, Husky + lint-staged
- **Sumber Data:** [Jikan API v4](https://jikan.moe/)

---

## 📋 Prasyarat Sistem

- **Node.js:** Versi LTS `v26.13.0` atau lebih baru
- **npm:** Versi `12.0.1` atau lebih baru
- **Git:** Versi `2.54.0.windows.1` atau lebih baru

---

## 💻 Panduan Menjalankan Proyek Secara Lokal

1. **Klon Repositori:**

   ```bash
   git clone git@github.com:username/anistream.git
   cd anistream
   ```

2. **Pasang Dependensi:**

   ```bash
   npm install
   ```

3. **Siapkan Variabel Lingkungan:**

   ```bash
   cp .env.example .env
   ```

4. **Jalankan Mode Pengembangan:**

   ```bash
   npm run dev
   ```

   Buka peramban di `http://localhost:5173/`.

5. **Kompilasi untuk Produksi:**

   ```bash
   npm run build
   ```

6. **Pemeriksaan Kualitas Kode:**
   ```bash
   npm run lint        # Periksa potensi bug via ESLint
   npm run format:check # Periksa kerapian format via Prettier
   ```

---

## 📁 Struktur Direktori Singkat

```text
anistream/
├── docs/               # Dokumentasi produk, arsitektur, dan panduan belajar
├── public/             # Aset statis publik
├── src/
│   ├── app/            # Routing dan lifecycle aplikasi
│   ├── components/     # Komponen UI modular
│   ├── core/           # HTTP Client, Store, Event Bus, Config
│   ├── mappers/        # Transformasi data API ke model internal
│   ├── pages/          # Komponen tampilan halaman
│   ├── services/       # Integrasi pemanggil API eksternal
│   ├── styles/         # Design tokens, reset, dan styling global
│   └── utils/          # Fungsi pembantu murni (pure helpers)
├── index.html          # Titik masuk HTML utama
└── package.json        # Dependensi dan skrip proyek
```

---

## 📄 Lisensi & Atribusi

- Didistribusikan di bawah lisensi **MIT License**.
- Data anime disediakan oleh [Jikan API](https://jikan.moe/).
- Video uji coba bersumber dari [Blender Open Movies](https://www.blender.org/about/projects/).
