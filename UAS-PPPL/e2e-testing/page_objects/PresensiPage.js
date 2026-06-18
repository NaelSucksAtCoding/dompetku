const BasePage = require("./BasePage");

class PresensiPage extends BasePage {
  constructor(page) {
    super(page);
    this.presensiMenu        = '[data-testid="menu-presensi"]';
    this.deteksiLokasiBtn    = 'button[data-testid="btn-deteksi-lokasi"]';
    this.inputPresensiBtn    = 'button[data-testid="btn-input-presensi"]';
    this.statusPresensi      = '[data-testid="status-presensi"]';
    this.errorLokasi         = '[data-testid="error-lokasi"]';
    this.notifBerhasil       = '[data-testid="notif-presensi-berhasil"]';
    this.jadwalHariIni       = '[data-testid="jadwal-hari-ini"]';
    this.pesanTidakAdaJadwal = '[data-testid="pesan-tidak-ada-jadwal"]';
  }

  async goToPresensiPage() {
    await this.navigate("/kehadiran/presensi");
  }

  async mockGPSLocationValid() {
    await this.page.context().setGeolocation({
      latitude: -7.770717,
      longitude: 110.377667
    });
    await this.page.context().grantPermissions(["geolocation"]);
  }

  async mockGPSLocationInvalid() {
    await this.page.context().setGeolocation({
      latitude: -6.200000,
      longitude: 106.816666
    });
    await this.page.context().grantPermissions(["geolocation"]);
  }

  async denyGPSPermission() {
    await this.page.context().clearPermissions();
  }

  async clickDeteksiLokasi() {
    await this.click(this.deteksiLokasiBtn);
  }

  async clickInputPresensi() {
    await this.click(this.inputPresensiBtn);
  }

  async getStatusPresensi() {
    return await this.getElementText(this.statusPresensi);
  }

  async isPresensiSukses() {
    return await this.isElementVisible(this.notifBerhasil);
  }

  async isErrorLokasiVisible() {
    return await this.isElementVisible(this.errorLokasi);
  }
}

module.exports = PresensiPage;
