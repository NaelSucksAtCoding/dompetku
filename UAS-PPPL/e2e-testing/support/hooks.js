const { Before, After, AfterStep, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium } = require("playwright");

// Set default timeout pengujian menjadi 30 detik
setDefaultTimeout(30000);

Before(async function () {
  this.browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  this.context = await this.browser.newContext({
    viewport: { width: 1280, height: 720 }
  });

  this.page = await this.context.newPage();
});

After(async function () {
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});

AfterStep(async function (stepResult) {
  if (stepResult.result.status === "FAILED") {
    if (this.page) {
      const screenshot = await this.page.screenshot({ fullPage: true });
      this.attach(screenshot, "image/png");
    }
  }
});
