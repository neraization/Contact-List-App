exports.LoginPage = class LoginPage {
  /**
   * @param {import('playwright').Page} page
   */

  constructor(page) {
    this.page = page;
  }

  //Locators

  get login() {
    return {
      title: this.page.locator("h1"),
      email: this.page.locator("#email"),
      password: this.page.locator("#password"),
      submitButton: this.page.locator("#submit"),
      form: this.page.locator("form"),
    };
  }

  //Methods

  async enterEmail(email) {
    await this.login.email.clear();
    await this.login.email.fill(email);
  }

  async enterPassword(password) {
    await this.login.password.clear();
    await this.login.password.fill(password);
  }

  async submitSignInForm() {
    await this.login.submitButton.click();
  }
};
