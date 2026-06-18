const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const PresensiPage = require("../page_objects/PresensiPage");

Given("dosen telah login dan berada di halaman presensi", async function () {
  this.presensiPage = new PresensiPage(this.page);
  await this.presensiPage.goToPresensiPage();
});

Given("terdapat jadwal mengajar pada hari ini", async function () {
  const jadwalVisible = await this.presensiPage.isElementVisible(
    this.presensiPage.jadwalHariIni
  );
  expect(jadwalVisible).toBe(true);
});

Given("lokasi dosen berada dalam radius kampus", async function () {
  await this.presensiPage.mockGPSLocationValid();
});

Given("lokasi dosen berada di luar radius kampus", async function () {
  await this.presensiPage.mockGPSLocationInvalid();
});

Given("dosen menolak izin akses lokasi", async function () {
  await this.presensiPage.denyGPSPermission();
});

When("dosen menekan tombol Input Presensi", async function () {
  await this.presensiPage.clickInputPresensi();
});

When("dosen menekan tombol Deteksi Lokasi", async function () {
  await this.presensiPage.clickDeteksiLokasi();
});

Then("sistem berhasil mencatat kehadiran dosen", async function () {
  const sukses = await this.presensiPage.isPresensiSukses();
  expect(sukses).toBe(true);
});

Then("status presensi berubah menjadi {string}", async function (expectedStatus) {
  const status = await this.presensiPage.getStatusPresensi();
  expect(status).toContain(expectedStatus);
});

Then("sistem menampilkan error lokasi di luar kampus", async function () {
  const errorVisible = await this.presensiPage.isErrorLokasiVisible();
  expect(errorVisible).toBe(true);
});

Then("sistem menampilkan pesan izin lokasi diperlukan", async function () {
  const errorVisible = await this.presensiPage.isElementVisible(
    '[data-testid="error-izin-lokasi"]'
  );
  expect(errorVisible).toBe(true);
});
