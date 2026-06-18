const BasePage = require("./BasePage");

// TODO (Desta): Implementasikan POM untuk halaman Input BKD
// Sesuaikan selector data-testid dengan elemen yang ada di aplikasi

class InputBKDPage extends BasePage {
  constructor(page) {
    super(page);

    // --- Navigasi ---
    this.btnKembali              = '[data-testid="btn-kembali"]';
    this.inputBKDHeader          = '[data-testid="input-bkd-header"]';

    // --- Form Input BKD ---
    this.formInputBKD            = '[data-testid="form-input-bkd"]';
    this.selectKategori          = '[data-testid="select-kategori-bkd"]';
    this.selectSubKategori       = '[data-testid="select-sub-kategori-bkd"]';
    this.inputJudul              = '[data-testid="input-judul-bkd"]';
    this.inputSKS                = '[data-testid="input-sks-bkd"]';
    this.inputSemester           = '[data-testid="input-semester-bkd"]';
    this.inputTahunAkademik      = '[data-testid="input-tahun-akademik-bkd"]';
    this.inputAngkaKredit        = '[data-testid="input-angka-kredit-bkd"]';
    this.inputKeterangan         = '[data-testid="input-keterangan-bkd"]';
    this.inputUploadBukti        = '[data-testid="input-upload-bukti"]';

    // --- Tombol Aksi ---
    this.btnSimpan               = '[data-testid="btn-simpan-bkd"]';
    this.btnReset                = '[data-testid="btn-reset-bkd"]';

    // --- Notifikasi ---
    this.notifBerhasil           = '[data-testid="notif-bkd-berhasil"]';
    this.notifGagal              = '[data-testid="notif-bkd-gagal"]';
    this.errorValidasi           = '[data-testid="error-validasi-bkd"]';
  }

  async goToInputBKD() {
    await this.navigate("/bkd/input");
  }

  // TODO (Desta): Implementasikan method-method berikut

  async pilihKategori(kategori) {
    // TODO
  }

  async pilihSubKategori(subKategori) {
    // TODO
  }

  async isiFormBKD({ judul, sks, semester, tahunAkademik, angkaKredit, keterangan }) {
    // TODO
  }

  async klikSimpan() {
    await this.click(this.btnSimpan);
  }

  async klikReset() {
    await this.click(this.btnReset);
  }

  async isInputBerhasil() {
    return await this.isElementVisible(this.notifBerhasil);
  }

  async isErrorValidasiVisible() {
    return await this.isElementVisible(this.errorValidasi);
  }

  async getErrorValidasiText() {
    return await this.getElementText(this.errorValidasi);
  }
}

module.exports = InputBKDPage;
