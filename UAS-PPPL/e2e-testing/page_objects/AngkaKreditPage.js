const BasePage = require("./BasePage");

class AngkaKreditPage extends BasePage {
  constructor(page) {
    super(page);

    // --- Navigasi halaman ---
    this.btnKembaliKeDashboard   = '[data-testid="btn-kembali-dashboard"]';
    this.akDashboardHeader       = '[data-testid="ak-dashboard-header"]';

    // --- Kartu Profil Dosen ---
    this.profilAvatar            = '[data-testid="profil-avatar"]';
    this.profilNama              = '[data-testid="profil-nama"]';
    this.profilJabatan           = '[data-testid="profil-jabatan"]';
    this.profilNIP               = '[data-testid="profil-nip"]';
    this.profilProdi             = '[data-testid="profil-prodi"]';

    // --- Progres Angka Kredit ---
    this.seksiProgresAK          = '[data-testid="seksi-progres-ak"]';
    this.nilaiAKSaatIni          = '[data-testid="nilai-ak-saat-ini"]';
    this.targetAK                = '[data-testid="target-ak"]';
    this.labelTargetJabatan      = '[data-testid="label-target-jabatan"]';
    this.sisaAKLabel             = '[data-testid="sisa-ak-label"]';
    this.progressBar             = '[data-testid="progress-bar-ak"]';
    this.updateAKLabel           = '[data-testid="update-ak-label"]';

    // --- Tombol Aksi ---
    this.btnInputBKD             = '[data-testid="btn-input-bkd"]';
    this.btnRiwayatBKD           = '[data-testid="btn-riwayat-bkd"]';
    this.btnAjukanKenaikanJabatan = '[data-testid="btn-ajukan-kenaikan-jabatan"]';
    this.btnBukaMenuPAK          = '[data-testid="btn-buka-menu-pak"]';

    // --- Alert Syarat Kenaikan Jabatan ---
    this.alertBelumMemenuhiSyarat = '[data-testid="alert-belum-memenuhi-syarat"]';
    this.alertSudahMemenuhiSyarat = '[data-testid="alert-sudah-memenuhi-syarat"]';

    // --- Rincian Angka Kredit (4 kartu kategori) ---
    this.seksiRincianAK          = '[data-testid="seksi-rincian-ak"]';
    this.kartuPendidikan         = '[data-testid="kartu-ak-pendidikan"]';
    this.kartuPenelitian         = '[data-testid="kartu-ak-penelitian"]';
    this.kartuPengabdian         = '[data-testid="kartu-ak-pengabdian"]';
    this.kartuPenunjang          = '[data-testid="kartu-ak-penunjang"]';

    // --- BKD Terkini ---
    this.seksiBKDTerkini         = '[data-testid="seksi-bkd-terkini"]';
    this.btnLihatSemuaBKD        = '[data-testid="btn-lihat-semua-bkd"]';
    this.bkdItemRow              = '[data-testid="bkd-item-row"]';
    this.badgeStatusMenunggu     = '[data-testid="badge-status-menunggu"]';
    this.badgeStatusDisetujui    = '[data-testid="badge-status-disetujui"]';
    this.badgeStatusDitolak      = '[data-testid="badge-status-ditolak"]';

    // --- Dokumen PAK ---
    this.seksiDokumenPAK         = '[data-testid="seksi-dokumen-pak"]';
  }

  // ---------------------------------------------------------------
  // Navigasi
  // ---------------------------------------------------------------
  async goToAngkaKredit() {
    await this.navigate("/administrasi/angka-kredit");
  }

  async kembaliKeDashboard() {
    await this.click(this.btnKembaliKeDashboard);
  }

  // ---------------------------------------------------------------
  // Tombol Aksi
  // ---------------------------------------------------------------
  async clickInputBKD() {
    await this.click(this.btnInputBKD);
  }

  async clickRiwayatBKD() {
    await this.click(this.btnRiwayatBKD);
  }

  async clickAjukanKenaikanJabatan() {
    await this.click(this.btnAjukanKenaikanJabatan);
  }

  async clickBukaMenuPAK() {
    await this.click(this.btnBukaMenuPAK);
  }

  async clickLihatSemuaBKD() {
    await this.click(this.btnLihatSemuaBKD);
  }

  // ---------------------------------------------------------------
  // Getter nilai / teks
  // ---------------------------------------------------------------
  async getNilaiAKSaatIni() {
    return await this.getElementText(this.nilaiAKSaatIni);
  }

  async getTargetAK() {
    return await this.getElementText(this.targetAK);
  }

  async getLabelTargetJabatan() {
    return await this.getElementText(this.labelTargetJabatan);
  }

  async getSisaAKLabel() {
    return await this.getElementText(this.sisaAKLabel);
  }

  async getBKDRowCount() {
    await this.waitForSelector(this.seksiBKDTerkini);
    const rows = await this.page.$$(this.bkdItemRow);
    return rows.length;
  }

  // ---------------------------------------------------------------
  // Assertions helper
  // ---------------------------------------------------------------
  async isDashboardAKVisible() {
    return await this.isElementVisible(this.akDashboardHeader);
  }

  async isAlertBelumMemenuhiSyaratVisible() {
    return await this.isElementVisible(this.alertBelumMemenuhiSyarat);
  }

  async isAlertSudahMemenuhiSyaratVisible() {
    return await this.isElementVisible(this.alertSudahMemenuhiSyarat);
  }

  async isProgressBarVisible() {
    return await this.isElementVisible(this.progressBar);
  }

  async isSeksiRincianAKVisible() {
    return await this.isElementVisible(this.seksiRincianAK);
  }

  async isSeksiBKDTerkiniVisible() {
    return await this.isElementVisible(this.seksiBKDTerkini);
  }

  async isSeksiDokumenPAKVisible() {
    return await this.isElementVisible(this.seksiDokumenPAK);
  }

  async isBtnAjukanKenaikanJabatanDisabled() {
    const btn = await this.page.$(this.btnAjukanKenaikanJabatan);
    if (!btn) return false;
    return await btn.isDisabled();
  }
}

module.exports = AngkaKreditPage;
