const BasePage = require("./BasePage");

// TODO (Desta): Implementasikan POM untuk halaman Pengajuan Kenaikan Jabatan
// Sesuaikan selector data-testid dengan elemen yang ada di aplikasi

class KenaikanJabatanPage extends BasePage {
  constructor(page) {
    super(page);

    // --- Navigasi ---
    this.btnKembali                  = '[data-testid="btn-kembali-kenaikan"]';
    this.kenaikanJabatanHeader       = '[data-testid="kenaikan-jabatan-header"]';

    // --- Informasi Syarat ---
    this.infoSyaratAK                = '[data-testid="info-syarat-ak"]';
    this.statusSyaratTerpenuhi       = '[data-testid="status-syarat-terpenuhi"]';
    this.statusSyaratBelumTerpenuhi  = '[data-testid="status-syarat-belum-terpenuhi"]';

    // --- Form Pengajuan ---
    this.formPengajuan               = '[data-testid="form-pengajuan-kenaikan"]';
    this.selectJabatanTujuan         = '[data-testid="select-jabatan-tujuan"]';
    this.inputUploadDokumen          = '[data-testid="input-upload-dokumen-kenaikan"]';
    this.inputCatatan                = '[data-testid="input-catatan-kenaikan"]';

    // --- Tombol Aksi ---
    this.btnAjukan                   = '[data-testid="btn-ajukan-kenaikan"]';
    this.btnBatal                    = '[data-testid="btn-batal-kenaikan"]';

    // --- Notifikasi ---
    this.notifPengajuanBerhasil      = '[data-testid="notif-kenaikan-berhasil"]';
    this.notifPengajuanGagal         = '[data-testid="notif-kenaikan-gagal"]';
    this.errorValidasi               = '[data-testid="error-validasi-kenaikan"]';
  }

  async goToKenaikanJabatan() {
    await this.navigate("/administrasi/kenaikan-jabatan");
  }

  // TODO (Desta): Implementasikan method-method berikut

  async isSyaratTerpenuhi() {
    return await this.isElementVisible(this.statusSyaratTerpenuhi);
  }

  async isSyaratBelumTerpenuhi() {
    return await this.isElementVisible(this.statusSyaratBelumTerpenuhi);
  }

  async pilihJabatanTujuan(jabatan) {
    // TODO
  }

  async uploadDokumen(filePath) {
    // TODO
  }

  async klikAjukan() {
    await this.click(this.btnAjukan);
  }

  async klikBatal() {
    await this.click(this.btnBatal);
  }

  async isPengajuanBerhasil() {
    return await this.isElementVisible(this.notifPengajuanBerhasil);
  }

  async isBtnAjukanDisabled() {
    const btn = await this.page.$(this.btnAjukan);
    if (!btn) return false;
    return await btn.isDisabled();
  }
}

module.exports = KenaikanJabatanPage;
