const BasePage = require("./BasePage");

// TODO (Abel): Implementasikan POM untuk halaman Gaji Dosen (Slip Gaji & Unduh PDF)
// Sesuaikan selector data-testid dengan elemen yang ada di aplikasi

class GajiPage extends BasePage {
  constructor(page) {
    super(page);

    // --- Navigasi ---
    this.btnKembali              = '[data-testid="btn-kembali-gaji"]';
    this.gajiHeader              = '[data-testid="gaji-header"]';

    // --- Filter Periode ---
    this.filterBulan             = '[data-testid="filter-bulan-gaji"]';
    this.filterTahun             = '[data-testid="filter-tahun-gaji"]';
    this.btnTampilkan            = '[data-testid="btn-tampilkan-gaji"]';

    // --- Slip Gaji ---
    this.slipGajiContainer       = '[data-testid="slip-gaji-container"]';
    this.totalGajiBersih         = '[data-testid="total-gaji-bersih"]';
    this.komponenGajiPokok       = '[data-testid="komponen-gaji-pokok"]';
    this.komponenTunjangan       = '[data-testid="komponen-tunjangan"]';
    this.komponenPotongan        = '[data-testid="komponen-potongan"]';
    this.pesanDataKosong         = '[data-testid="pesan-gaji-kosong"]';

    // --- Unduh PDF ---
    this.btnUnduhPDF             = '[data-testid="btn-unduh-slip-pdf"]';
    this.notifUnduhBerhasil      = '[data-testid="notif-unduh-berhasil"]';
    this.notifUnduhGagal         = '[data-testid="notif-unduh-gagal"]';
  }

  async goToGajiDosen() {
    await this.navigate("/administrasi/gaji");
  }

  // TODO (Abel): Implementasikan method-method berikut

  async pilihPeriode(bulan, tahun) {
    // TODO
  }

  async klikTampilkan() {
    await this.click(this.btnTampilkan);
  }

  async getTotalGajiBersih() {
    return await this.getElementText(this.totalGajiBersih);
  }

  async isSlipGajiVisible() {
    return await this.isElementVisible(this.slipGajiContainer);
  }

  async isPesanDataKosongVisible() {
    return await this.isElementVisible(this.pesanDataKosong);
  }

  async klikUnduhPDF() {
    await this.click(this.btnUnduhPDF);
  }

  async isUnduhBerhasil() {
    return await this.isElementVisible(this.notifUnduhBerhasil);
  }
}

module.exports = GajiPage;
