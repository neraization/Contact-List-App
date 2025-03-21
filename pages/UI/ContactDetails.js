const { BasePage } = require("./Base");
exports.ContactDetailsPage = class ContactDetailsPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */

  constructor(page) {
    super(page);
  }

  //locators

  get contactDetailsForm() {
    return {
      title: this.page.locator("h1"),
      editContactButton: this.page.locator("#edit-contact"),
      deleteContactButton: this.page.locator("#delete"),
      returnToContactListButton: this.page.locator("#return"),
    };
  }

  //methods

  async clickEditContact() {
    await this.contactDetailsForm.editContactButton.click({ trial: true });
    await this.contactDetailsForm.editContactButton.click();
  }

  async clickReturn() {
    await this.contactDetailsForm.returnToContactListButton.click({ trial: true });
    await this.contactDetailsForm.returnToContactListButton.click();
  }

  async clickDeleteContact() {
    await this.contactDetailsForm.deleteContactButton.click({ trial: true });
    await this.contactDetailsForm.deleteContactButton.click();
  }
};
