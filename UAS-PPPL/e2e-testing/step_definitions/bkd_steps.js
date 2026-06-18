const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const InputBKDPage = require("../page_objects/InputBKDPage");
const KenaikanJabatanPage = require("../page_objects/KenaikanJabatanPage");

// ==============================================================
// HALAMAN 5 — INPUT BKD
// TODO (Desta): Implementasikan step definitions berikut
// ==============================================================

Given("dosen berada di halaman Input BKD", async function () {
  this.inputBKDPage = new InputBKDPage(this.page);
  await this.inputBKDPage.goToInputBKD();
});

When("dosen mengisi form BKD dengan data valid", async function () {
  // TODO (Desta): implementasi pengisian form BKD dengan data valid
});

When("dosen mengisi form BKD dengan data tidak lengkap", async function () {
  // TODO (Desta): implementasi pengisian form BKD dengan data tidak lengkap
});

When("dosen mengklik tombol Simpan BKD", async function () {
  await this.inputBKDPage.klikSimpan();
});

When("dosen mengklik tombol Reset BKD", async function () {
  await this.inputBKDPage.klikReset();
});

Then("sistem berhasil menyimpan data BKD", async function () {
  const berhasil = await this.inputBKDPage.isInputBerhasil();
  expect(berhasil).toBe(true);
});

Then("sistem menampilkan pesan validasi BKD {string}", async function (pesanExpected) {
  const pesan = await this.inputBKDPage.getErrorValidasiText();
  expect(pesan).toContain(pesanExpected);
});

// ==============================================================
// HALAMAN 6 — PENGAJUAN KENAIKAN JABATAN
// TODO (Desta): Implementasikan step definitions berikut
// ==============================================================

Given("dosen berada di halaman Pengajuan Kenaikan Jabatan", async function () {
  this.kenaikanPage = new KenaikanJabatanPage(this.page);
  await this.kenaikanPage.goToKenaikanJabatan();
});

Given("dosen telah memenuhi syarat AK untuk kenaikan jabatan", async function () {
  const terpenuhi = await this.kenaikanPage.isSyaratTerpenuhi();
  expect(terpenuhi).toBe(true);
});

Given("dosen belum memenuhi syarat AK untuk kenaikan jabatan", async function () {
  const belumTerpenuhi = await this.kenaikanPage.isSyaratBelumTerpenuhi();
  expect(belumTerpenuhi).toBe(true);
});

When("dosen mengklik tombol Ajukan Kenaikan", async function () {
  await this.kenaikanPage.klikAjukan();
});

When("dosen mengklik tombol Batal Kenaikan", async function () {
  await this.kenaikanPage.klikBatal();
});

Then("pengajuan kenaikan jabatan berhasil disubmit", async function () {
  const berhasil = await this.kenaikanPage.isPengajuanBerhasil();
  expect(berhasil).toBe(true);
});

Then("tombol Ajukan Kenaikan dalam kondisi nonaktif", async function () {
  const disabled = await this.kenaikanPage.isBtnAjukanDisabled();
  expect(disabled).toBe(true);
});
