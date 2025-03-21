const { BasePage } = require("./Base");
exports.ContactListPage = class ContactListPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */

  constructor(page) {
    super(page);
  }

  //Locators
  get contactList() {
    return {
      title: this.page.locator("h1"),
      contactTable: this.page.locator("#myTable"),
      addNewContactButton: this.page.locator("#add-contact"),
      logout: this.page.locator("#logout"),
    };
  }

  async getContactLocator(email) {
    return {
      contact: this.page.getByRole("table").locator("tr >> td").filter({ hasText: email }),
      row: this.page
        .getByRole("table")
        .locator("tr >> td")
        .filter({ hasText: email })
        .locator(".."),
    };
  }

  //Methods
  async clickAddNewContact() {
    await this.contactList.addNewContactButton.click({ trial: true });
    await this.contactList.addNewContactButton.click();
  }

  async clickOnExistingContact(email) {
    await (await this.getContactLocator(email)).contact.click({ trial: true });
    await (await this.getContactLocator(email)).contact.click();
  }

  async clickLogout() {
    await this.contactList.logout.click();
  }
};
