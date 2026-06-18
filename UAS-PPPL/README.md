# UAS PPPL — E2E Automated Testing

**Pengujian Fungsional SIAKAD Modul Dosen**

Mata Kuliah: Pengujian dan Perawatan Perangkat Lunak (PPPL)  
Program Studi D-IV Teknologi Rekayasa Perangkat Lunak  
Sekolah Vokasi — Universitas Gadjah Mada

---

## Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [System Under Test (SUT)](#system-under-test-sut)
- [Test Suite](#test-suite)
- [Teknologi](#teknologi)
- [Struktur Repository](#struktur-repository)
- [Pembagian Tugas](#pembagian-tugas)
- [Cara Menjalankan](#cara-menjalankan)
- [Bug Report](#bug-report)

---

## Tentang Proyek

Proyek ini merupakan implementasi framework pengujian otomatis **End-to-End (E2E)** berbasis **Behavior-Driven Development (BDD)** untuk tugas akhir mata kuliah Pengujian dan Perawatan Perangkat Lunak (PPPL). Framework dibangun menggunakan integrasi **Cucumber**, **Playwright**, dan pola desain **Page Object Model (POM)** untuk memastikan kualitas fungsional Sistem Informasi Akademik (SIAKAD) Modul Dosen milik Universitas Global Nusantara.

---

## System Under Test (SUT)

| | |
|---|---|
| **Sistem** | SIAKAD (Sistem Informasi Akademik) — Modul Dosen |
| **Institusi** | Universitas Global Nusantara |
| **Base URL** | `http://localhost:3000` |

SIAKAD Modul Dosen adalah sistem berbasis web yang digunakan oleh dosen untuk mengelola seluruh aktivitas akademik secara digital, mulai dari autentikasi, pencatatan kehadiran berbasis GPS, hingga pengelolaan Beban Kerja Dosen (BKD) dan Angka Kredit. Sistem ini mencakup 8 halaman fungsional utama yang menjadi target pengujian dalam proyek ini.

---

## Test Suite

Framework pengujian ini mencakup **8 modul halaman** yang dirancang menggunakan metode **Boundary Value Analysis (BVA)** dan **Equivalence Partitioning (EP)**.

| No | Modul Halaman | Metode Uji | PIC |
|----|---------------|------------|-----|
| 1 | Auth / Login | BVA + EP | Danny |
| 2 | Presensi Dosen (GPS Geofencing) | BVA + EP | Danny |
| 3 | Dashboard Dosen | EP | Gunael |
| 4 | Angka Kredit — Dashboard AK | BVA + EP | Gunael |
| 5 | Input BKD — Form Beban Kerja Dosen | BVA + EP | Desta |
| 6 | Pengajuan Kenaikan Jabatan | EP | Desta |
| 7 | Riwayat BKD | EP | Abel |
| 8 | Gaji Dosen — Slip Gaji & Unduh PDF | BVA + EP | Abel |

### Ringkasan Skenario

| Halaman | Normal | Negatif | Total |
|---------|:------:|:-------:|:-----:|
| Auth / Login | 2 | 3 | 5 |
| Presensi GPS | 1 | 2 | 3 |
| Dashboard Dosen | 5 | 2 | 7 |
| Angka Kredit | 6 | 1 | 7 |
| Input BKD | - | - | TBD |
| Kenaikan Jabatan | - | - | TBD |
| Riwayat BKD | - | - | TBD |
| Gaji Dosen | - | - | TBD |

---

## Teknologi

| Komponen | Library / Tool | Versi |
|----------|----------------|-------|
| Test Runner | Cucumber.js | ^10.6.0 |
| Browser Automation | Playwright (Chromium) | ^1.42.1 |
| Design Pattern | Page Object Model (POM) | — |
| Test Paradigm | Behavior-Driven Development (BDD) | — |
| Report Generator | cucumber-html-reporter | ^7.2.0 |
| Runtime | Node.js | >= 18.x |

---

## Struktur Repository

```
UAS-PPPL/
│
├── e2e-testing/
│   ├── features/
│   │   └── siakad_dosen_e2e.feature       # Skenario BDD Gherkin (semua halaman)
│   │
│   ├── page_objects/
│   │   ├── BasePage.js                    # Class dasar POM
│   │   ├── LoginPage.js                   # POM Halaman Login
│   │   ├── PresensiPage.js                # POM Halaman Presensi GPS
│   │   ├── DashboardPage.js               # POM Halaman Dashboard Dosen
│   │   ├── AngkaKreditPage.js             # POM Halaman Angka Kredit
│   │   ├── InputBKDPage.js                # POM Halaman Input BKD
│   │   ├── KenaikanJabatanPage.js         # POM Halaman Kenaikan Jabatan
│   │   ├── RiwayatBKDPage.js              # POM Halaman Riwayat BKD
│   │   └── GajiPage.js                    # POM Halaman Gaji Dosen
│   │
│   ├── step_definitions/
│   │   ├── auth_steps.js                  # Steps: Login & Autentikasi
│   │   ├── presensi_steps.js              # Steps: Presensi GPS
│   │   ├── dashboard_steps.js             # Steps: Dashboard Dosen
│   │   ├── ak_steps.js                    # Steps: Angka Kredit
│   │   ├── bkd_steps.js                   # Steps: Input BKD & Kenaikan Jabatan
│   │   └── gaji_steps.js                  # Steps: Gaji Dosen
│   │
│   ├── support/
│   │   ├── hooks.js                       # Browser lifecycle & screenshot on failure
│   │   └── reporter.js                    # Konfigurasi laporan HTML otomatis
│   │
│   ├── reports/
│   │   └── cucumber_report.json           # Output laporan (auto-generated)
│   │
│   ├── docs/
│   │   └── BUG_REPORTING.md               # Dokumentasi bug yang ditemukan
│   │
│   ├── package.json                       # Manifest & dependensi Node.js
│   └── cucumber.js                        # Konfigurasi runner Cucumber
│
└── README.md
```

---

## Pembagian Tugas

| Anggota | Role | Tanggung Jawab | Output File |
|---------|------|----------------|-------------|
| **Danny** | Automation QA Engineer 1 | Inisialisasi folder framework & base class POM. Implementasi POM + Step Definitions untuk Halaman 1 (Login) dan Halaman 2 (Presensi GPS). Rancangan test case BVA/EP. | `BasePage.js`, `hooks.js`, `LoginPage.js`, `PresensiPage.js`, `auth_steps.js`, `presensi_steps.js` |
| **Gunael** | Automation QA Engineer 2 | Konfigurasi runner (`package.json`, `cucumber.js`) dan penulisan skenario BDD Gherkin global. Implementasi POM + Step Definitions untuk Halaman 3 (Dashboard) dan Halaman 4 (Angka Kredit). Rancangan test case BVA/EP. | `siakad_dosen_e2e.feature`, `DashboardPage.js`, `AngkaKreditPage.js`, `dashboard_steps.js`, `ak_steps.js` |
| **Desta** | Automation QA Engineer 3 | Implementasi POM + Step Definitions untuk Halaman 5 (Input BKD) dan Halaman 6 (Kenaikan Jabatan). Rancangan test case BVA/EP. | `InputBKDPage.js`, `KenaikanJabatanPage.js`, `bkd_steps.js` |
| **Abel** | Automation QA Engineer 4 | Konfigurasi HTML Report dan penyusunan bug report. Implementasi POM + Step Definitions untuk Halaman 7 (Riwayat BKD) dan Halaman 8 (Gaji Dosen). Rancangan test case BVA/EP. | `RiwayatBKDPage.js`, `GajiPage.js`, `gaji_steps.js`, `reporter.js`, `BUG_REPORTING.md` |

---

## Cara Menjalankan

### Prasyarat

- Node.js versi 18 ke atas
- Aplikasi SIAKAD berjalan di `http://localhost:3000`

### Instalasi

```bash
# Clone repository
git clone https://github.com/<username>/UAS-PPPL.git
cd UAS-PPPL/e2e-testing

# Install dependensi
npm install

# Install browser Playwright
npx playwright install chromium
```

### Menjalankan Semua Test

```bash
npm test
```

### Menjalankan Test Berdasarkan Tag

```bash
# Per fitur
npx cucumber-js --tags "@login"
npx cucumber-js --tags "@presensi"
npx cucumber-js --tags "@dashboard"
npx cucumber-js --tags "@angka-kredit"

# Per tipe skenario
npx cucumber-js --tags "@normal"
npx cucumber-js --tags "@negatif"
```

### Generate Laporan HTML

```bash
npm run report
# Output: reports/cucumber_report.html
```

---

## Bug Report

Dokumentasi bug yang ditemukan selama pengujian tersedia di [`e2e-testing/docs/BUG_REPORTING.md`](./e2e-testing/docs/BUG_REPORTING.md).

| Field | Keterangan |
|-------|------------|
| **ID** | Kode unik bug, contoh: `BUG-001` |
| **Halaman** | Modul halaman tempat bug ditemukan |
| **Deskripsi** | Penjelasan singkat bug |
| **Langkah Reproduksi** | Urutan langkah untuk mereproduksi bug |
| **Expected Result** | Hasil yang seharusnya muncul |
| **Actual Result** | Hasil yang benar-benar muncul |
| **Severity** | Critical / Major / Minor / Trivial |
| **Status** | Open / In Progress / Resolved |

---

*Universitas Gadjah Mada — Sekolah Vokasi, Departemen Teknik Elektro dan Informatika*
