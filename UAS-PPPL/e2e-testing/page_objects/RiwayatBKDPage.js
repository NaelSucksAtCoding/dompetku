const BasePage = require("./BasePage");

// TODO (Abel): Implementasikan POM untuk halaman Riwayat BKD
// Sesuaikan selector data-testid dengan elemen yang ada di aplikasi

class RiwayatBKDPage extends BasePage {
  constructor(page) {
    super(page);

    // --- Navigasi ---
    this.btnKembali              = '[data-testid="btn-kembali-riwayat"]';
    this.riwayatBKDHeader        = '[data-testid="riwayat-bkd-header"]';

    // --- Filter & Pencarian ---
    this.filterSemester          = '[data-testid="filter-semester"]';
    this.filterStatus            = '[data-testid="filter-status"]';
    this.inputPencarian          = '[data-testid="input-pencarian-riwayat"]';
    this.btnCariRiwayat          = '[data-testid="btn-cari-riwayat"]';

    // --- Tabel Riwayat ---
    this.tabelRiwayat            = '[data-testid="tabel-riwayat-bkd"]';
    this.riwayatItemRow          = '[data-testid="riwayat-bkd-row"]';
    this.pesanDataKosong         = '[data-testid="pesan-riwayat-kosong"]';

    // --- Badge Status ---
    this.badgeMenunggu           = '[data-testid="badge-menunggu"]';
    this.badgeDisetujui          = '[data-testid="badge-disetujui"]';
    this.badgeDitolak            = '[data-testid="badge-ditolak"]';

    // --- Detail BKD ---
    this.btnLihatDetail          = '[data-testid="btn-lihat-detail-bkd"]';
    this.modalDetailBKD          = '[data-testid="modal-detail-bkd"]';
    this.btnTutupModal           = '[data-testid="btn-tutup-modal-bkd"]';
  }

  async goToRiwayatBKD() {
    await this.navigate("/bkd/riwayat");
  }

  // TODO (Abel): Implementasikan method-method berikut

  async filterBerdasarkanSemester(semester) {
    // TODO
  }

  async filterBerdasarkanStatus(status) {
    // TODO
  }

  async getRiwayatRowCount() {
    await this.waitForSelector(this.tabelRiwayat);
    const rows = await this.page.$$(this.riwayatItemRow);
    return rows.length;
  }

  async isPesanDataKosongVisible() {
    return await this.isElementVisible(this.pesanDataKosong);
  }

  async klikLihatDetail() {
    await this.click(this.btnLihatDetail);
  }

  async isModalDetailVisible() {
    return await this.isElementVisible(this.modalDetailBKD);
  }

  async tutupModal() {
    await this.click(this.btnTutupModal);
  }
}

module.exports = RiwayatBKDPage;
