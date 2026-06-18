const BasePage = require("./BasePage");

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput     = 'input[name="email"]';
    this.passwordInput  = 'input[name="password"]';
    this.loginButton    = 'button[type="submit"]';
    this.errorMessage   = '[data-testid="error-message"]';
    this.dashboardHeader = '[data-testid="dashboard-header"]';
  }

  async goToLoginPage() {
    await this.navigate("/login");
  }

  async login(email, password) {
    await this.fillInput(this.emailInput, email);
    await this.fillInput(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async getErrorMessage() {
    return await this.getElementText(this.errorMessage);
  }

  async isLoggedIn() {
    return await this.isElementVisible(this.dashboardHeader);
  }
}

module.exports = LoginPage;
