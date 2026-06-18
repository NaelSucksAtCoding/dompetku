const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const GajiPage = require("../page_objects/GajiPage");
const RiwayatBKDPage = require("../page_objects/RiwayatBKDPage");

// ==============================================================
// HALAMAN 7 — RIWAYAT BKD
// TODO (Abel): Implementasikan step definitions berikut
// ==============================================================

Given("dosen berada di halaman Riwayat BKD", async function () {
  this.riwayatBKDPage = new RiwayatBKDPage(this.page);
  await this.riwayatBKDPage.goToRiwayatBKD();
});

When("dosen memfilter riwayat berdasarkan semester {string}", async function (semester) {
  // TODO (Abel): implementasi filter semester
  await this.riwayatBKDPage.filterBerdasarkanSemester(semester);
});

When("dosen memfilter riwayat berdasarkan status {string}", async function (status) {
  // TODO (Abel): implementasi filter status
  await this.riwayatBKDPage.filterBerdasarkanStatus(status);
});

When("dosen mengklik tombol Lihat Detail BKD", async function () {
  await this.riwayatBKDPage.klikLihatDetail();
});

When("dosen menutup modal detail BKD", async function () {
  await this.riwayatBKDPage.tutupModal();
});

Then("tabel riwayat BKD ditampilkan dengan data", async function () {
  const count = await this.riwayatBKDPage.getRiwayatRowCount();
  expect(count).toBeGreaterThan(0);
});

Then("sistem menampilkan pesan riwayat BKD kosong", async function () {
  const visible = await this.riwayatBKDPage.isPesanDataKosongVisible();
  expect(visible).toBe(true);
});

Then("modal detail BKD ditampilkan", async function () {
  const visible = await this.riwayatBKDPage.isModalDetailVisible();
  expect(visible).toBe(true);
});

// ==============================================================
// HALAMAN 8 — GAJI DOSEN
// TODO (Abel): Implementasikan step definitions berikut
// ==============================================================

Given("dosen berada di halaman Gaji Dosen", async function () {
  this.gajiPage = new GajiPage(this.page);
  await this.gajiPage.goToGajiDosen();
});

When("dosen memilih periode gaji bulan {string} tahun {string}", async function (bulan, tahun) {
  // TODO (Abel): implementasi pilih periode
  await this.gajiPage.pilihPeriode(bulan, tahun);
});

When("dosen mengklik tombol Tampilkan Gaji", async function () {
  await this.gajiPage.klikTampilkan();
});

When("dosen mengklik tombol Unduh PDF Slip Gaji", async function () {
  await this.gajiPage.klikUnduhPDF();
});

Then("slip gaji ditampilkan dengan informasi lengkap", async function () {
  const visible = await this.gajiPage.isSlipGajiVisible();
  expect(visible).toBe(true);
});

Then("sistem menampilkan pesan data gaji tidak tersedia", async function () {
  const visible = await this.gajiPage.isPesanDataKosongVisible();
  expect(visible).toBe(true);
});

Then("file PDF slip gaji berhasil diunduh", async function () {
  const berhasil = await this.gajiPage.isUnduhBerhasil();
  expect(berhasil).toBe(true);
});
