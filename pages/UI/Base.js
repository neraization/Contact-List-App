exports.BasePage = class BasePage {
  /**
   * @param {import('playwright').Page} page
   */

  constructor(page) {
    this.page = page;
  }

  //Locators
  get ContactForm() {
    return {
      title: this.page.locator("h1"),
      firstName: this.page.locator("#firstName"),
      lastName: this.page.locator("#lastName"),
      birthDate: this.page.locator("#birthdate"),
      email: this.page.locator("#email"),
      phone: this.page.locator("#phone"),
      address1: this.page.locator("#street1"),
      address2: this.page.locator("#street2"),
      city: this.page.locator("#city"),
      state: this.page.locator("#stateProvince"),
      postalCode: this.page.locator("#postalCode"),
      country: this.page.locator("#country"),
      submitButton: this.page.locator("#submit"),
    };
  }

  async inputFirstName(firstName) {
    await this.ContactForm.firstName.clear();
    await this.ContactForm.firstName.fill(firstName);
  }

  async inputLastName(lastName) {
    await this.ContactForm.lastName.clear();
    await this.ContactForm.lastName.fill(lastName);
  }

  async inputDateOfBirth(date) {
    await this.ContactForm.birthDate.clear();
    await this.ContactForm.birthDate.fill(date);
  }

  async inputEmail(email) {
    await this.ContactForm.email.clear();
    await this.ContactForm.email.fill(email);
  }

  async inputPhone(phone) {
    await this.ContactForm.phone.clear();
    await this.ContactForm.phone.fill(phone);
  }

  async inputAddress1(address1) {
    await this.ContactForm.address1.clear();
    await this.ContactForm.address1.fill(address1);
  }

  async inputAddress2(address2) {
    await this.ContactForm.address2.clear();
    await this.ContactForm.address2.fill(address2);
  }

  async inputCity(city) {
    await this.ContactForm.city.clear();
    await this.ContactForm.city.fill(city);
  }

  async inputState(state) {
    await this.ContactForm.state.clear();
    await this.ContactForm.state.fill(state);
  }

  async inputPostalCode(postalCode) {
    await this.ContactForm.postalCode.clear();
    await this.ContactForm.postalCode.fill(postalCode);
  }

  async inputCountry(country) {
    await this.ContactForm.country.clear();
    await this.ContactForm.country.fill(country);
  }

  async clickSubmit() {
    await this.ContactForm.submitButton.click();
  }

  async takeScreenShoot(testInfo, title) {
    await testInfo.attach(title, {
      body: await this.page.screenshot(),
      contentType: "image/png",
    });
  }
};
