const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const AngkaKreditPage = require("../page_objects/AngkaKreditPage");

// ---------------------------------------------------------------
// Given
// ---------------------------------------------------------------

Given("dosen berada di halaman Dashboard Angka Kredit", async function () {
  this.akPage = new AngkaKreditPage(this.page);
  await this.akPage.goToAngkaKredit();
});

Given("dosen belum memenuhi syarat kenaikan jabatan", async function () {
  const alertVisible = await this.akPage.isAlertBelumMemenuhiSyaratVisible();
  expect(alertVisible).toBe(true);
});

Given("dosen telah memenuhi syarat kenaikan jabatan", async function () {
  const alertVisible = await this.akPage.isAlertSudahMemenuhiSyaratVisible();
  expect(alertVisible).toBe(true);
});

// ---------------------------------------------------------------
// When
// ---------------------------------------------------------------

When("dosen mengklik tombol Input BKD", async function () {
  await this.akPage.clickInputBKD();
});

When("dosen mengklik tombol Riwayat BKD", async function () {
  await this.akPage.clickRiwayatBKD();
});

When("dosen mengklik tombol Ajukan Kenaikan Jabatan", async function () {
  await this.akPage.clickAjukanKenaikanJabatan();
});

When("dosen mengklik tombol Buka Menu PAK", async function () {
  await this.akPage.clickBukaMenuPAK();
});

When("dosen mengklik tautan Lihat Semua BKD", async function () {
  await this.akPage.clickLihatSemuaBKD();
});

When("dosen mengklik tautan Kembali Ke Dashboard", async function () {
  await this.akPage.kembaliKeDashboard();
});

// ---------------------------------------------------------------
// Then
// ---------------------------------------------------------------

Then("halaman Dashboard Angka Kredit ditampilkan dengan benar", async function () {
  const visible = await this.akPage.isDashboardAKVisible();
  expect(visible).toBe(true);
});

Then("profil dosen ditampilkan pada halaman", async function () {
  const visible = await this.akPage.isElementVisible(this.akPage.profilNama);
  expect(visible).toBe(true);
});

Then("progress bar Angka Kredit ditampilkan", async function () {
  const visible = await this.akPage.isProgressBarVisible();
  expect(visible).toBe(true);
});

Then("rincian Angka Kredit per kategori ditampilkan", async function () {
  const visible = await this.akPage.isSeksiRincianAKVisible();
  expect(visible).toBe(true);
});

Then("section BKD Terkini ditampilkan", async function () {
  const visible = await this.akPage.isSeksiBKDTerkiniVisible();
  expect(visible).toBe(true);
});

Then("section Dokumen PAK ditampilkan", async function () {
  const visible = await this.akPage.isSeksiDokumenPAKVisible();
  expect(visible).toBe(true);
});

Then("alert belum memenuhi syarat kenaikan jabatan ditampilkan", async function () {
  const visible = await this.akPage.isAlertBelumMemenuhiSyaratVisible();
  expect(visible).toBe(true);
});

Then("tombol Ajukan Kenaikan Jabatan dalam kondisi nonaktif", async function () {
  const disabled = await this.akPage.isBtnAjukanKenaikanJabatanDisabled();
  expect(disabled).toBe(true);
});

Then("nilai AK saat ini ditampilkan pada halaman", async function () {
  const nilai = await this.akPage.getNilaiAKSaatIni();
  expect(nilai).not.toBeNull();
  expect(nilai.trim()).not.toBe("");
});

Then("label target jabatan ditampilkan", async function () {
  const label = await this.akPage.getLabelTargetJabatan();
  expect(label.trim()).not.toBe("");
});

Then("terdapat minimal {int} baris riwayat BKD terkini", async function (minJumlah) {
  const count = await this.akPage.getBKDRowCount();
  expect(count).toBeGreaterThanOrEqual(minJumlah);
});

Then("dosen diarahkan ke halaman dashboard", async function () {
  const url = this.page.url();
  expect(url).toContain("/dashboard");
});
