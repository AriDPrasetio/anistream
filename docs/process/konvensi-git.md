# Konvensi Penamaan Branch & Pesan Commit

## A. Konvensi Penamaan Branch

- `feat/nama-fitur`: Penambahan fitur fungsional baru (misal: `feat/navbar-component`, `feat/video-player`).
- `fix/deskripsi-bug`: Perbaikan bug (misal: `fix/search-debounce-leak`).
- `docs/topik-dokumen`: Pembaruan dokumentasi (misal: `docs/fase-0-modular`, `docs/api-specs`).
- `chore/alat-bantu`: Konfigurasi build tool, update dependensi (misal: `chore/setup-eslint`, `chore/update-vite`).
- `refactor/nama-modul`: Penatan ulang kode tanpa mengubah perilaku (misal:`refactor/http-client-mapper`).

## B. Konvensi Pesan Commit (Conventional Commits)

Gunakan struktur pesan commit standar:

```text
<tipe>(ruang-lingkup-opsional): <deskripsi singkat imperatif>
```

_Contoh:_

- `feat(player): implementasi kontrol volume kustom`
- `fix(router): perbaiki kegagalan rute saat refresh di halaman detail`
- `chore(deps): perbarui vite ke versi 5.4`

> NOTE!: Satu commit sebaiknya mewakili **satu perubahan logis tunggal**. Hindari commit raksasa berisi gabungan perbaikan bug, penulisan dokumen, dan ubah CSS sekaligus.

## C. Aturan Penggabungan (Squash & Merge)

Saat menggabungkan Pull Request ke cabang `main`:

- Selalu gunakan opsi **Squash and Merge**.
- Ini akan memadatkan puluhan commit kecil atau commit perbaikan typo di feature branch menjadi commit bersih dan deskriptif di riwayat branch `main`.
