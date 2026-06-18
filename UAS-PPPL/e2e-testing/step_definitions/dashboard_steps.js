const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const DashboardPage = require("../page_objects/DashboardPage");

// ---------------------------------------------------------------
// Given
// ---------------------------------------------------------------

Given("dosen telah berhasil login dan berada di halaman dashboard", async function () {
  this.dashboardPage = new DashboardPage(this.page);
  await this.dashboardPage.goToDashboard();
});

// ---------------------------------------------------------------
// When
// ---------------------------------------------------------------

When("dosen mengakses halaman dashboard", async function () {
  this.dashboardPage = new DashboardPage(this.page);
  await this.dashboardPage.goToDashboard();
});

When("dosen mengklik menu navigasi {string}", async function (namaMenu) {
  const menuMap = {
    "Akademik"      : this.dashboardPage.navAkademik,
    "Kehadiran"     : this.dashboardPage.navKehadiran,
    "Hasil Studi"   : this.dashboardPage.navHasilStudi,
    "Administrasi"  : this.dashboardPage.navAdministrasi,
  };
  const selector = menuMap[namaMenu];
  expect(selector, `Menu "${namaMenu}" tidak ditemukan di peta selector`).toBeDefined();
  await this.dashboardPage.click(selector);
});

When("dosen mengklik ikon notifikasi", async function () {
  await this.dashboardPage.clickNotifikasi();
});

When("dosen mengklik ikon profil", async function () {
  await this.dashboardPage.clickProfile();
});

When("dosen mengklik tautan Lihat Semua Pengumuman", async function () {
  await this.dashboardPage.clickLihatSemuaPengumuman();
});

// ---------------------------------------------------------------
// Then
// ---------------------------------------------------------------

Then("halaman dashboard ditampilkan dengan benar", async function () {
  const visible = await this.dashboardPage.isDashboardVisible();
  expect(visible).toBe(true);
});

Then("section Jadwal Harian ditampilkan", async function () {
  const visible = await this.dashboardPage.isSectionJadwalVisible();
  expect(visible).toBe(true);
});

Then("section Pengumuman ditampilkan", async function () {
  const visible = await this.dashboardPage.isSectionPengumumanVisible();
  expect(visible).toBe(true);
});

Then("terdapat minimal {int} kartu jadwal yang tampil", async function (minJumlah) {
  const count = await this.dashboardPage.getJadwalCardCount();
  expect(count).toBeGreaterThanOrEqual(minJumlah);
});

Then("terdapat minimal {int} kartu pengumuman yang tampil", async function (minJumlah) {
  const count = await this.dashboardPage.getPengumumanCardCount();
  expect(count).toBeGreaterThanOrEqual(minJumlah);
});

Then("sistem menampilkan pesan tidak ada jadwal", async function () {
  const visible = await this.dashboardPage.isPesanTidakAdaJadwalVisible();
  expect(visible).toBe(true);
});

Then("sistem menampilkan pesan tidak ada pengumuman", async function () {
  const visible = await this.dashboardPage.isPesanTidakAdaPengumumanVisible();
  expect(visible).toBe(true);
});

Then("URL halaman mengandung {string}", async function (pathSegment) {
  const url = this.page.url();
  expect(url).toContain(pathSegment);
});
