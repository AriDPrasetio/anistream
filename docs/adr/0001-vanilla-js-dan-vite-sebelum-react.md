# ADR 0001: Memakai Vanilla JavaScript dan Vite Dahulu Sebelum Migrasi ke React

- **Status:** Diterima (Accepted)
- **Tanggal:** 2026-11-05
- **Pengambil Keputusan:** Ari Dwi Prasetio

---

## 1. Konteks (Context)

Ketika memulai proyek frontend berskala menengah seperti katalog dan video streaming anime, terdapat godaan kuat untuk langsung menggunakan framework modern populer (seperti React, Next.js, atau Vue) bersamaan dengan TypeScript.

Namun, tujuan pembelajaran utama dari proyek AniStream adalah membentuk pemahaman mendalam tentang:

- Bagaimana peramban (browser) menangani DOM, event delegation, dan rendering loop secara murni.
- Bagaimana merancang arsitektur aplikasi (State Management, Client Routing, dan Data Fetching/Mapping) dari prinsip pertama (_first principles_).
- Masalah-masalah teknis apa saja yang sebenarnya diselesaikan oleh React (Virtual DOM, reconciliation, state synchronization).

Jika framework langsung digunakan sejak hari pertama, batas antara _"konsep web standar"_ dan _"sintaks bawaan framework"_ seringkali kabur bagi pembelajar.

---

## 2. Keputusan (Decision)

Saya memutuskan untuk:

1. Mengembangkan AniStream dari **Fase 0 hingga Fase 6** menggunakan **Vanilla JavaScript murni (ES Modules standar)** dengan bantuan **Vite** sebagai dev server dan bundler modern.
2. Menerapkan arsitektur berlapis (_Strict Layered Architecture_): pemisahan penuh antara Lapisan Data (`services/`, `mappers/`), Lapisan State (`core/store.js`), dan Lapisan UI (`components/`, `pages/`).
3. Menjadwalkan **Fase 7** khusus sebagai fase migrasi terencana (_planned migration_) ke **React + TypeScript**.

---

## 3. Alternatif yang Dipertimbangkan (Alternatives Considered)

- **Alternatif A: Langsung menggunakan Next.js / React + TypeScript sejak Fase 0**  
  _Alasan ditolak:_ Menutupi proses belajar manipulasi DOM dasar dan mekanisme routing browser asli; rawan ketergantungan pada _black-box magic_ dari framework.
- **Alternatif B: Menggunakan Webpack daripada Vite**  
  _Alasan ditolak:_ Konfigurasi Webpack terlalu kompleks dan bertele-tele untuk proyek awal, serta waktu startup lebih lambat dibanding Vite yang memanfaatkan native browser ESM.

---

## 4. Konsekuensi (Consequences)

### Dampak Positif:

- Pemahaman tentang JavaScript modern tanpa abstraksi framework.
- Repositori ringan dan waktu build relatif cepat.
- Berkat arsitektur berlapis, ketika migrasi ke React di Fase 7 dilakukan, seluruh kode di folder `services/`, `mappers/`, dan `utils/` **dapat dipindahkan 100% tanpa perubahan apa pun**, karena lapisan data tersebut tidak terikat pada framework UI.

### Dampak Negatif (Tantangan):

- Memerlukan penulisan kode manual lebih banyak di awal untuk manipulasi DOM dan perutean SPA (Client-side Router).
- Manajemen state reaktif harus diimplementasikan sendiri menggunakan pola Observer atau Pub/Sub sederhana.
