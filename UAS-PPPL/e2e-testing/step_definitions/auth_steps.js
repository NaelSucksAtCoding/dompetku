const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const LoginPage = require("../page_objects/LoginPage");

Given("pengguna berada di halaman login", async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goToLoginPage();
});

When("pengguna memasukkan email {string} dan password {string}",
  async function (email, password) {
    await this.loginPage.login(email, password);
  }
);

When("pengguna menekan tombol login", async function () {
  await this.loginPage.click(this.loginPage.loginButton);
});

Then("pengguna berhasil masuk ke halaman dashboard", async function () {
  const loggedIn = await this.loginPage.isLoggedIn();
  expect(loggedIn).toBe(true);
});

Then("sistem menampilkan pesan error {string}", async function (expectedMsg) {
  const actualMsg = await this.loginPage.getErrorMessage();
  expect(actualMsg).toContain(expectedMsg);
});

Then("pengguna tetap berada di halaman login", async function () {
  const url = this.page.url();
  expect(url).toContain("/login");
});
