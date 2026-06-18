const BasePage = require("./BasePage");

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);

    // --- Navbar ---
    this.navAkademik        = '[data-testid="nav-akademik"]';
    this.navKehadiran       = '[data-testid="nav-kehadiran"]';
    this.navHasilStudi      = '[data-testid="nav-hasil-studi"]';
    this.navAdministrasi    = '[data-testid="nav-administrasi"]';
    this.notifBell          = '[data-testid="btn-notifikasi"]';
    this.profileAvatar      = '[data-testid="btn-profile"]';

    // --- Header / identitas halaman ---
    this.dashboardHeader    = '[data-testid="dashboard-header"]';

    // --- Section Jadwal Harian ---
    this.sectionJadwal      = '[data-testid="section-jadwal-harian"]';
    this.jadwalCard         = '[data-testid="jadwal-card"]';
    this.pesanTidakAdaJadwal = '[data-testid="pesan-tidak-ada-jadwal"]';

    // --- Section Pengumuman ---
    this.sectionPengumuman       = '[data-testid="section-pengumuman"]';
    this.btnLihatSemuaPengumuman = '[data-testid="btn-lihat-semua-pengumuman"]';
    this.pengumumanCard          = '[data-testid="pengumuman-card"]';
    this.pesanTidakAdaPengumuman = '[data-testid="pesan-tidak-ada-pengumuman"]';
  }

  // ---------------------------------------------------------------
  // Navigasi
  // ---------------------------------------------------------------
  async goToDashboard() {
    await this.navigate("/dashboard");
  }

  // ---------------------------------------------------------------
  // Navbar actions
  // ---------------------------------------------------------------
  async clickNavAkademik() {
    await this.click(this.navAkademik);
  }

  async clickNavKehadiran() {
    await this.click(this.navKehadiran);
  }

  async clickNavHasilStudi() {
    await this.click(this.navHasilStudi);
  }

  async clickNavAdministrasi() {
    await this.click(this.navAdministrasi);
  }

  async clickNotifikasi() {
    await this.click(this.notifBell);
  }

  async clickProfile() {
    await this.click(this.profileAvatar);
  }

  async clickLihatSemuaPengumuman() {
    await this.click(this.btnLihatSemuaPengumuman);
  }

  // ---------------------------------------------------------------
  // Assertions helper
  // ---------------------------------------------------------------
  async isDashboardVisible() {
    return await this.isElementVisible(this.dashboardHeader);
  }

  async isSectionJadwalVisible() {
    return await this.isElementVisible(this.sectionJadwal);
  }

  async isSectionPengumumanVisible() {
    return await this.isElementVisible(this.sectionPengumuman);
  }

  async getJadwalCardCount() {
    await this.waitForSelector(this.sectionJadwal);
    const cards = await this.page.$$(this.jadwalCard);
    return cards.length;
  }

  async getPengumumanCardCount() {
    await this.waitForSelector(this.sectionPengumuman);
    const cards = await this.page.$$(this.pengumumanCard);
    return cards.length;
  }

  async isPesanTidakAdaJadwalVisible() {
    return await this.isElementVisible(this.pesanTidakAdaJadwal);
  }

  async isPesanTidakAdaPengumumanVisible() {
    return await this.isElementVisible(this.pesanTidakAdaPengumuman);
  }
}

module.exports = DashboardPage;
