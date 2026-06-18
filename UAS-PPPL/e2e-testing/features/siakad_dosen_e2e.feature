# language: id
Feature: SIAKAD Modul Dosen - E2E Testing
  Sebagai dosen Universitas Global Nusantara
  Saya ingin dapat login, melihat dashboard, mencatat kehadiran, dan mengelola angka kredit
  Agar seluruh aktivitas akademik saya terdokumentasi secara digital dan akuntabel

  # ==============================================================
  # HALAMAN 1 — AUTH / LOGIN
  # ==============================================================

  Background:
    Given pengguna berada di halaman login

  @login @normal
  Scenario: Login berhasil sebagai Dosen
    When pengguna memasukkan email "danny@ugn.ac.id" dan password "Password123!"
    Then pengguna berhasil masuk ke halaman dashboard

  @login @normal
  Scenario: Login berhasil sebagai Manajer
    When pengguna memasukkan email "manager@ugn.ac.id" dan password "Manager123!"
    Then pengguna berhasil masuk ke halaman dashboard

  @login @negatif
  Scenario: Login gagal karena password salah
    When pengguna memasukkan email "danny@ugn.ac.id" dan password "SalahPassword!"
    Then sistem menampilkan pesan error "Email atau password salah"
    And pengguna tetap berada di halaman login

  @login @negatif
  Scenario: Login gagal karena field kosong
    When pengguna memasukkan email "" dan password ""
    Then sistem menampilkan pesan error "Email wajib diisi"

  @login @negatif
  Scenario: Login gagal karena format email tidak valid
    When pengguna memasukkan email "bukanemailvalid" dan password "Password123!"
    Then sistem menampilkan pesan error "Format email tidak valid"

  # ==============================================================
  # HALAMAN 2 — PRESENSI DOSEN (GPS GEOFENCING)
  # ==============================================================

  @presensi @normal
  Scenario: Presensi berhasil - lokasi dalam radius kampus
    Given dosen telah login dan berada di halaman presensi
    And terdapat jadwal mengajar pada hari ini
    And lokasi dosen berada dalam radius kampus
    When dosen menekan tombol Input Presensi
    And dosen menekan tombol Deteksi Lokasi
    Then sistem berhasil mencatat kehadiran dosen
    And status presensi berubah menjadi "Hadir"

  @presensi @negatif
  Scenario: Presensi gagal - lokasi di luar radius kampus
    Given dosen telah login dan berada di halaman presensi
    And terdapat jadwal mengajar pada hari ini
    And lokasi dosen berada di luar radius kampus
    When dosen menekan tombol Input Presensi
    And dosen menekan tombol Deteksi Lokasi
    Then sistem menampilkan error lokasi di luar kampus

  @presensi @negatif
  Scenario: Presensi gagal - izin GPS ditolak
    Given dosen telah login dan berada di halaman presensi
    And terdapat jadwal mengajar pada hari ini
    And dosen menolak izin akses lokasi
    When dosen menekan tombol Input Presensi
    And dosen menekan tombol Deteksi Lokasi
    Then sistem menampilkan pesan izin lokasi diperlukan

  # ==============================================================
  # HALAMAN 3 — DASHBOARD DOSEN
  # ==============================================================

  @dashboard @normal
  Scenario: Dashboard berhasil ditampilkan setelah login
    Given dosen telah berhasil login dan berada di halaman dashboard
    Then halaman dashboard ditampilkan dengan benar
    And section Jadwal Harian ditampilkan
    And section Pengumuman ditampilkan

  @dashboard @normal
  Scenario: Jadwal harian tampil ketika ada jadwal pada hari ini
    Given dosen telah berhasil login dan berada di halaman dashboard
    Then terdapat minimal 1 kartu jadwal yang tampil

  @dashboard @normal
  Scenario: Pengumuman tampil ketika ada pengumuman aktif
    Given dosen telah berhasil login dan berada di halaman dashboard
    Then terdapat minimal 1 kartu pengumuman yang tampil

  @dashboard @negatif
  Scenario: Sistem menampilkan pesan kosong ketika tidak ada jadwal hari ini
    Given dosen telah berhasil login dan berada di halaman dashboard
    Then sistem menampilkan pesan tidak ada jadwal

  @dashboard @negatif
  Scenario: Sistem menampilkan pesan kosong ketika tidak ada pengumuman
    Given dosen telah berhasil login dan berada di halaman dashboard
    Then sistem menampilkan pesan tidak ada pengumuman

  @dashboard @normal
  Scenario Outline: Navigasi menu utama berfungsi dengan benar
    Given dosen telah berhasil login dan berada di halaman dashboard
    When dosen mengklik menu navigasi "<namaMenu>"
    Then URL halaman mengandung "<pathSegmen>"

    Examples:
      | namaMenu      | pathSegmen    |
      | Akademik      | /akademik     |
      | Kehadiran     | /kehadiran    |
      | Hasil Studi   | /hasil-studi  |
      | Administrasi  | /administrasi |

  @dashboard @normal
  Scenario: Klik tautan Lihat Semua Pengumuman mengarah ke halaman pengumuman
    Given dosen telah berhasil login dan berada di halaman dashboard
    When dosen mengklik tautan Lihat Semua Pengumuman
    Then URL halaman mengandung "/pengumuman"

  # ==============================================================
  # HALAMAN 4 — DASHBOARD ANGKA KREDIT
  # ==============================================================

  @angka-kredit @normal
  Scenario: Dashboard Angka Kredit ditampilkan lengkap
    Given dosen berada di halaman Dashboard Angka Kredit
    Then halaman Dashboard Angka Kredit ditampilkan dengan benar
    And profil dosen ditampilkan pada halaman
    And progress bar Angka Kredit ditampilkan
    And rincian Angka Kredit per kategori ditampilkan
    And section BKD Terkini ditampilkan
    And section Dokumen PAK ditampilkan

  @angka-kredit @normal
  Scenario: Nilai AK saat ini dan target jabatan ditampilkan
    Given dosen berada di halaman Dashboard Angka Kredit
    Then nilai AK saat ini ditampilkan pada halaman
    And label target jabatan ditampilkan

  @angka-kredit @normal
  Scenario: Riwayat BKD terkini menampilkan daftar pengajuan
    Given dosen berada di halaman Dashboard Angka Kredit
    Then terdapat minimal 1 baris riwayat BKD terkini

  @angka-kredit @negatif
  Scenario: Alert belum memenuhi syarat ditampilkan ketika AK kurang dari target
    Given dosen berada di halaman Dashboard Angka Kredit
    And dosen belum memenuhi syarat kenaikan jabatan
    Then alert belum memenuhi syarat kenaikan jabatan ditampilkan
    And tombol Ajukan Kenaikan Jabatan dalam kondisi nonaktif

  @angka-kredit @normal
  Scenario: Tombol Input BKD mengarahkan ke halaman form input BKD
    Given dosen berada di halaman Dashboard Angka Kredit
    When dosen mengklik tombol Input BKD
    Then URL halaman mengandung "/bkd/input"

  @angka-kredit @normal
  Scenario: Tombol Riwayat BKD mengarahkan ke halaman riwayat BKD
    Given dosen berada di halaman Dashboard Angka Kredit
    When dosen mengklik tombol Riwayat BKD
    Then URL halaman mengandung "/bkd/riwayat"

  @angka-kredit @normal
  Scenario: Tombol Buka Menu PAK mengarahkan ke halaman dokumen PAK
    Given dosen berada di halaman Dashboard Angka Kredit
    When dosen mengklik tombol Buka Menu PAK
    Then URL halaman mengandung "/pak"

  @angka-kredit @normal
  Scenario: Tombol Lihat Semua BKD mengarahkan ke halaman riwayat lengkap
    Given dosen berada di halaman Dashboard Angka Kredit
    When dosen mengklik tautan Lihat Semua BKD
    Then URL halaman mengandung "/bkd"

  @angka-kredit @normal
  Scenario: Tombol Kembali Ke Dashboard mengarahkan kembali ke dashboard utama
    Given dosen berada di halaman Dashboard Angka Kredit
    When dosen mengklik tautan Kembali Ke Dashboard
    Then dosen diarahkan ke halaman dashboard
