class BasePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || "http://localhost:3000";
  }

  async navigate(path) {
    await this.page.goto(`${this.baseUrl}${path}`, {
      waitUntil: "domcontentloaded"
    });
  }

  async waitForSelector(selector, timeout = 10000) {
    await this.page.waitForSelector(selector, {
      state: "visible",
      timeout
    });
  }

  async click(selector) {
    await this.waitForSelector(selector);
    await this.page.click(selector);
  }

  async fillInput(selector, text) {
    await this.waitForSelector(selector);
    await this.page.fill(selector, "");
    await this.page.fill(selector, text);
  }

  async getElementText(selector) {
    await this.waitForSelector(selector);
    return await this.page.textContent(selector);
  }

  async isElementVisible(selector, timeout = 5000) {
    try {
      await this.page.waitForSelector(selector, {
        state: "visible",
        timeout
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  async wait(ms) {
    await this.page.waitForTimeout(ms);
  }
}

module.exports = BasePage;
