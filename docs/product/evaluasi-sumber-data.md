# Evaluasi Sumber Data Eksternal (API & Media Stream)

Dokumen ini disusun oleh peran **`api-architect`** untuk mendokumentasikan spesifikasi teknis, batasan kuota (_rate limiting_), arsitektur konsumsi data, mitigasi anomali data, serta sumber media video uji coba legal untuk aplikasi AniStream.

---

## 1. Pemilihan API Publik Utama

| Parameter Evaluasi        | Jikan API (v4) — **Pilihan Utama**                                                                        | AniList API (v2) — Alternatif                                                               |
| :------------------------ | :-------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| **Protokol / Format**     | **RESTful JSON murni** (Standard HTTP GET)                                                                | **GraphQL** (Single Endpoint POST)                                                          |
| **Kesesuaian Proyek**     | Sangat ideal untuk arsitektur Vanilla JS (Fase 0–6) tanpa memerlukan library client GraphQL pihak ketiga. | Memerlukan penyusunan body payload GraphQL dan penanganan query string yang lebih kompleks. |
| **Sumber Data Asli**      | Database resmi **MyAnimeList (MAL)**.                                                                     | Database komunitas **AniList**.                                                             |
| **Autentikasi (API Key)** | **Tidak memerlukan API Key** (Open Public API).                                                           | Tidak memerlukan API key untuk data publik.                                                 |
| **Kelengkapan Data**      | Sangat lengkap: sinopsis, studio, trailer video YouTube, daftar episode, dan skor.                        | Sangat lengkap dengan metrik komunitas yang kaya.                                           |

> **Keputusan Arsitektur:**  
> AniStream menetapkan **Jikan API v4** (`https://api.jikan.moe/v4`) sebagai sumber data utama. Pendekatan RESTful ini memungkinkan kita membangun lapisan `HttpClient` kustom yang murni dan ringan di Fase 3.

---

## 2. Kebijakan Batas Permintaan (Rate Limiting) & Mitigasi Frontend

Berdasarkan dokumentasi resmi Jikan API ([docs.api.jikan.moe](https://docs.api.jikan.moe/)), server menerapkan batasan laju panggilan:

- **Batas Kecepatan Panggilan:**
  - Maksimal **3 permintaan per detik** (_3 requests/second_).
  - Maksimal **60 permintaan per menit** (_60 requests/minute_).
- **Respons Pelanggaran:** Status **HTTP 429 Too Many Requests**.

### Dampak & Solusi Arsitektur pada Frontend:

1. **Input Pencarian (Search Input):**
   - Wajib menerapkan teknik **Debounce (350–500 ms)**. Request API hanya dikirim setelah pengguna berhenti mengetik, bukan pada setiap ketukan tombol (_keypress_).
2. **Pencegahan Duplicate In-flight Request:**
   - Jika pengguna berpindah halaman dengan cepat, request yang belum selesai dari halaman sebelumnya harus dibatalkan menggunakan **`AbortController`**.
3. **Mekanisme Caching di Memori (Client-side Memory Cache):**
   - Lapisan _Service_ akan meng-cache respons endpoint statis (seperti detail anime dan daftar genre) dengan masa berlaku (TTL) 5–10 menit untuk mencegah fetch berulang saat navigasi bolak-balik.
4. **Penanganan Otomatis HTTP 429:**
   - Lapisan _HttpClient_ akan membaca header respons dan menerapkan _exponential backoff retry_ (mencoba kembali secara transparan setelah jeda 1–3 detik).

---

## 3. Daftar Endpoint Esensial AniStream

**Base URL:** `https://api.jikan.moe/v4`

| Kebutuhan Layar / Fitur   | Metode | Endpoint Path                 | Query Parameter Utama                                   |
| :------------------------ | :----: | :---------------------------- | :------------------------------------------------------ |
| **Hero Banner & Populer** | `GET`  | `/top/anime`                  | `?filter=bypopularity&limit=10`                         |
| **Anime Musim Sekarang**  | `GET`  | `/seasons/now`                | `?limit=12&sfw=true`                                    |
| **Pencarian Katalog**     | `GET`  | `/anime`                      | `?q={query}&sfw=true&limit=24&order_by=score&sort=desc` |
| **Filter Genre**          | `GET`  | `/genres/anime`               | _(Statis, di-cache jangka panjang)_                     |
| **Detail Lengkap Anime**  | `GET`  | `/anime/{id}/full`            | `{id}` = numerik (contoh: `52991` untuk _Frieren_)      |
| **Daftar Episode Anime**  | `GET`  | `/anime/{id}/episodes`        | `?page={page}` (untuk anime episode panjang)            |
| **Rekomendasi Terkait**   | `GET`  | `/anime/{id}/recommendations` | Diambil untuk melengkapi halaman detail                 |

---

## 4. Analisis Struktur Respons & Catatan Anomali Data (Data Anomalies)

Penyelidikan pada sampel payload JSON riil (misal: `/anime/21/full` dan `/anime/52991/full`) menemukan beberapa anomali data yang wajib ditangani di **Lapisan Mapper (DTO)** pada Fase 3:

```json
// Contoh struktur nyata Jikan v4
{
  "data": {
    "mal_id": 52991,
    "title": "Sousou no Frieren",
    "title_english": "Frieren: Beyond Journey's End",
    "title_japanese": "葬送のフリーレン",
    "images": {
      "jpg": {
        "image_url": "https://...jpg",
        "large_image_url": "https://...jpg"
      },
      "webp": {
        "image_url": "https://...webp",
        "large_image_url": "https://...webp"
      }
    },
    "score": 9.32,
    "episodes": 28,
    "status": "Finished Airing",
    "synopsis": "During their decade-long quest...",
    "trailer": {
      "youtube_id": "qgQunxD0qMo",
      "url": "https://www.youtube.com/watch?v=..."
    }
  }
}
```

### Anomali & Strategi Normalisasi di Lapisan Mapper:

1. **Struktur Objek Gambar Bersarang (_Deeply Nested Images_):**
   - Format WebP tidak selalu tersedia pada anime klasik/lama.
   - **Solusi Mapper:** Buat pemetaan fallback aman:  
     `posterUrl = anime.images?.webp?.large_image_url ?? anime.images?.jpg?.large_image_url ?? '/assets/placeholder-cover.png'`
2. **Judul Multilingual & Judul Bahasa Inggris Bernilai `null`:**
   - Anime yang belum dilisensikan di pasar barat seringkali memiliki `title_english: null`.
   - **Solusi Mapper:** Gunakan fallback hierarki:  
     `displayTitle = anime.title_english || anime.title || 'Judul Tidak Tersedia'`
3. **Skor Rating Bernilai `null`:**
   - Anime yang berstatus _Upcoming_ (_Not yet aired_) memiliki `score: null`.
   - **Solusi Mapper:** Format ke string aman: `score ? score.toFixed(1) : 'TBA'`
4. **Jumlah Episode Bernilai `null`:**
   - Anime yang sedang tayang (_Currently Airing_) sering kali memiliki `episodes: null`.
   - **Solusi Mapper:** Tampilkan teks dinamis: `episodes ? `${episodes} Episode` : 'Sedang Tayang'`
5. **Sinopsis Kosong:**
   - Beberapa anime pendek/spesial memiliki `synopsis: null`.
   - **Solusi Mapper:** Sediakan teks fallback: `'Sinopsis belum tersedia untuk judul ini.'`

---

## 5. Sumber Video Uji Coba Legal & Terbuka (Test Video Streams)

Sesuai komitmen etik non-komersial dan perlindungan hak cipta, pemutar video AniStream dilarang menggunakan konten scraping ilegal. Pengujian player akan menggunakan video domain publik / creative commons terstandar industri:

| Format Stream                      | Sumber Video                        | URL Stream Terbuka                                                                   | Tujuan Pengujian                                                                |
| :--------------------------------- | :---------------------------------- | :----------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| **MP4 (Direct Stream)**            | Big Buck Bunny (Blender Foundation) | `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4` | Pengujian kontrol pemutar video HTML5 native dasar (Play, Pause, Seek, Volume). |
| **MP4 (Direct Stream)**            | Sintel (Blender Foundation)         | `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4`       | Pengujian pergantian episode dan playlist.                                      |
| **HLS (Adaptive Bitrate `.m3u8`)** | Mux Public Test Stream              | `https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8`                                  | Pengujian pemutaran adaptif streaming HLS menggunakan `hls.js` di Fase 4.       |

---

## 6. Checklist Kriteria Keberhasilan (Langkah 11)

- [x] File `docs/product/evaluasi-sumber-data.md` tersimpan di repositori.
- [x] Base URL dan daftar endpoint utama Jikan tercatat lengkap.
- [x] Batas _rate limit_ (3 req/s) dan strategi pencegahan HTTP 429 terdokumentasi.
- [x] Daftar anomali data (nested images, null title, nullable score) tercatat.
- [x] Tautan video stream pengujian open-source legal telah disiapkan.
