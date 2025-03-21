const { test, expect } = require("../../pages/Base");
import { USER_SESSION } from "../../playwright.config";
import { UtilityPage } from "../../pages/Utility";

test.describe.serial("Contact List Application", () => {
  //Use session from setup login
  test.use({ storageState: USER_SESSION });
  //global variables
  const utility = new UtilityPage();

  const contact = {
    firstName: "John",
    lastName: "Doe",
    birthdate: "1995-01-01",
    email: `john${utility.getRandomString()}@gmail.com`, //ensure uniqueness
    phone: "8005555555",
    street1: "1 Main St.",
    street2: "Apartment A",
    city: "Anytown",
    stateProvince: "KS",
    postalCode: "12345",
    country: "USA",
  };

  test("Verify that the contacts table is displayed after login", async ({
    ContactList,
    page,
  }, testInfo) => {
    //Navigate to the Contact List page
    await page.goto("/contactList");

    //Assert that page is loaded and Contact List table is displayed
    await expect(ContactList.contactList.title).toHaveText("Contact List", { timeout: 10000 });
    await expect(ContactList.contactList.contactTable).toBeInViewport({ timeout: 10000 });

    await ContactList.takeScreenShoot(testInfo, "Contact List Table");
  });

  test("Verify that a new contact can be successfully created", async ({
    ContactList,
    page,
    AddContact,
  }, testInfo) => {
    //Navigate to the Contact List page
    await page.goto("/contactList");

    //Assert that page is loaded and Contact List table is displayed
    await expect(ContactList.contactList.title).toHaveText("Contact List", { timeout: 10000 });
    await expect(ContactList.contactList.addNewContactButton).toBeInViewport({ timeout: 10000 });

    await ContactList.clickAddNewContact();
    //Add Contact page
    await expect(AddContact.ContactForm.title).toHaveText("Add Contact", { timeout: 10000 });

    //Fill the form
    await AddContact.inputFirstName(contact.firstName);
    await AddContact.inputLastName(contact.lastName);
    await AddContact.inputDateOfBirth(contact.birthdate);
    await AddContact.inputEmail(contact.email);
    await AddContact.inputPhone(contact.phone);
    await AddContact.inputAddress1(contact.street1);
    await AddContact.inputAddress2(contact.street2);
    await AddContact.inputCity(contact.city);
    await AddContact.inputState(contact.stateProvince);
    await AddContact.inputPostalCode(contact.postalCode);
    await AddContact.inputCountry(contact.country);

    //Assert the inputs in form
    await expect(AddContact.ContactForm.firstName).toHaveValue(contact.firstName);
    await expect(AddContact.ContactForm.lastName).toHaveValue(contact.lastName);
    await expect.soft(AddContact.ContactForm.birthDate).toHaveValue(contact.birthdate);
    await expect.soft(AddContact.ContactForm.email).toHaveValue(contact.email);
    await expect.soft(AddContact.ContactForm.phone).toHaveValue(contact.phone);
    await expect.soft(AddContact.ContactForm.address1).toHaveValue(contact.street1);
    await expect.soft(AddContact.ContactForm.address2).toHaveValue(contact.street2);
    await expect.soft(AddContact.ContactForm.city).toHaveValue(contact.city);
    await expect.soft(AddContact.ContactForm.state).toHaveValue(contact.stateProvince);
    await expect.soft(AddContact.ContactForm.postalCode).toHaveValue(contact.postalCode);
    await expect.soft(AddContact.ContactForm.country).toHaveValue(contact.country);

    await AddContact.clickSubmit();

    //Assert that Contact List page is loaded and Contact List table is displayed
    await expect(ContactList.contactList.title).toHaveText("Contact List", { timeout: 10000 });
    await expect(ContactList.contactList.addNewContactButton).toBeInViewport({ timeout: 10000 });

    //Assert that Contact is created and displayed in the Table
    await expect((await ContactList.getContactLocator(contact.email)).contact).toHaveText(
      contact.email,
      {
        timeout: 10000,
      }
    );

    (await ContactList.getContactLocator(contact.email)).contact.click({ trial: true });
    await page.waitForTimeout(1000);

    //Add Contact Data to the Playwright Report
    test.info().annotations.push({
      type: "Newly created Contact",
      description: JSON.stringify(
        {
          First_Name: contact.firstName,
          Last_Name: contact.lastName,
          Email: contact.email,
        },
        null,
        2
      ),
    });

    await ContactList.takeScreenShoot(testInfo, "New Contact in the Table");
  });

  test("Verify that updating a contacts information and clicking Submit saves the changes", async ({
    ContactList,
    page,
    ContactDetails,
    EditContact,
  }, testInfo) => {
    const firstNameUpdated = "JohnUpdated";
    //Navigate to the Contact List page
    await page.goto("/contactList");

    //Assert that page is loaded and Contact List table is displayed
    await expect(ContactList.contactList.title).toHaveText("Contact List", { timeout: 10000 });
    await expect(ContactList.contactList.addNewContactButton).toBeInViewport({ timeout: 10000 });

    //Click on the Existing Contact in the table
    await ContactList.clickOnExistingContact(contact.email);
    //Contact Details page
    await expect(ContactDetails.contactDetailsForm.title).toHaveText("Contact Details", {
      timeout: 10000,
    });

    //Assert displayed data on the Contact Details Form
    await expect(ContactDetails.ContactForm.firstName).toHaveText(contact.firstName);
    await expect(ContactDetails.ContactForm.lastName).toHaveText(contact.lastName);
    await expect.soft(ContactDetails.ContactForm.birthDate).toHaveText(contact.birthdate);
    await expect.soft(ContactDetails.ContactForm.email).toHaveText(contact.email);
    await expect.soft(ContactDetails.ContactForm.phone).toHaveText(contact.phone);
    await expect.soft(ContactDetails.ContactForm.address1).toHaveText(contact.street1);
    await expect.soft(ContactDetails.ContactForm.address2).toHaveText(contact.street2);
    await expect.soft(ContactDetails.ContactForm.city).toHaveText(contact.city);
    await expect.soft(ContactDetails.ContactForm.state).toHaveText(contact.stateProvince);
    await expect.soft(ContactDetails.ContactForm.postalCode).toHaveText(contact.postalCode);
    await expect.soft(ContactDetails.ContactForm.country).toHaveText(contact.country);

    await ContactDetails.clickEditContact();
    //Assert that Edit Contact Page is loaded
    await expect(EditContact.ContactForm.title).toHaveText("Edit Contact", { timeout: 10000 });
    await page.waitForTimeout(1000);

    //Edit Contact First Name
    await EditContact.inputFirstName(firstNameUpdated);
    await EditContact.clickSubmit();

    //Assert that Contact is updated properly
    await expect(ContactDetails.ContactForm.firstName).toHaveText(firstNameUpdated);

    await ContactList.takeScreenShoot(testInfo, "Updated Contact");

    await ContactDetails.clickReturn();

    //Assert that Contact List page is loaded and Contact List table is displayed
    await expect(ContactList.contactList.title).toHaveText("Contact List", { timeout: 10000 });
    await expect(ContactList.contactList.addNewContactButton).toBeInViewport({ timeout: 10000 });

    //Assert that Contact is updated and displayed in the Table
    await expect((await ContactList.getContactLocator(contact.email)).row).toContainText(
      firstNameUpdated,
      {
        timeout: 10000,
      }
    );

    (await ContactList.getContactLocator(contact.email)).contact.click({ trial: true });
    await page.waitForTimeout(1000);

    //Add Contact Data to the Playwright Report
    test.info().annotations.push({
      type: "Updated Contact",
      description: JSON.stringify(
        {
          First_Name: firstNameUpdated,
          Last_Name: contact.lastName,
          Email: contact.email,
        },
        null,
        2
      ),
    });

    await ContactList.takeScreenShoot(testInfo, "Updated Contact in the Table");
  });

  test("Verify that clicking the Delete button removes the contact ", async ({
    ContactList,
    page,
    ContactDetails,
  }, testInfo) => {
    //Handling Delete dialog that will pop up when I click Delete Contact button
    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });

    //Navigate to the Contact List page
    await page.goto("/contactList");

    //Assert that page is loaded and Contact List table is displayed
    await expect(ContactList.contactList.title).toHaveText("Contact List", { timeout: 10000 });
    await expect(ContactList.contactList.addNewContactButton).toBeInViewport({ timeout: 10000 });

    //Click on the Existing Contact in the table
    await ContactList.clickOnExistingContact(contact.email);
    //Contact Details page
    await expect(ContactDetails.contactDetailsForm.title).toHaveText("Contact Details", {
      timeout: 10000,
    });

    //Assert that we have correct user
    await expect(ContactDetails.ContactForm.lastName).toHaveText(contact.lastName);
    await expect.soft(ContactDetails.ContactForm.email).toHaveText(contact.email);

    //Delete Contact
    await ContactDetails.clickDeleteContact();

    //Assert that Contact List page is loaded and Contact List table is displayed
    await expect(ContactList.contactList.title).toHaveText("Contact List", { timeout: 10000 });
    await expect(ContactList.contactList.addNewContactButton).toBeInViewport({ timeout: 10000 });

    //Assert that Contact is deleted and not present in the Table
    await expect(ContactList.contactList.contactTable).not.toContainText(contact.email, {
      timeout: 10000,
    });

    await ContactList.takeScreenShoot(testInfo, "List of Contacts after Deletion");
  });

  test("Verify that clicking Logout successfully logs the user out and redirects to the login page", async ({
    ContactList,
    page,
    Login,
  }, testInfo) => {
    //Navigate to the Contact List page
    await page.goto("/contactList");

    //Assert that page is loaded and Contact List table is displayed
    await expect(ContactList.contactList.title).toHaveText("Contact List", { timeout: 10000 });
    await expect(ContactList.contactList.contactTable).toBeInViewport({ timeout: 10000 });

    await ContactList.clickLogout();

    await expect(Login.login.title).toHaveText("Contact List App");
    await expect(Login.login.form).toBeInViewport({ timeout: 10000 });

    await ContactList.takeScreenShoot(testInfo, "User is Logged Out");
  });
});
