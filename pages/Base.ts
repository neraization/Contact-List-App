import { test as base } from "@playwright/test";
import { UsersPage } from "./API/Users";
import { ContactAPIPage } from "./API/Contact";
import { UtilityPage } from "./Utility";
import { LoginPage } from "./UI/Login";
import { ContactListPage } from "./UI/ContactList";
import { AddContactPage } from "./UI/AddContact";
import { EditContactPage } from "./UI/EditContact";
import { ContactDetailsPage } from "./UI/ContactDetails";

// Declare the types of your fixtures.
type CustomFixtures = {
  usersAPI: UsersPage;
  contactsAPI: ContactAPIPage;
  utility: UtilityPage;
  Login: LoginPage;
  ContactList: ContactListPage;
  AddContact: AddContactPage;
  EditContact: EditContactPage;
  ContactDetails: ContactDetailsPage;
};

// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<CustomFixtures>({
  usersAPI: async ({ request }, use) => {
    await use(new UsersPage(request));
  },

  contactsAPI: async ({ request }, use) => {
    await use(new ContactAPIPage(request));
  },

  utility: async ({}, use) => {
    await use(new UtilityPage());
  },

  Login: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  ContactList: async ({ page }, use) => {
    await use(new ContactListPage(page));
  },

  AddContact: async ({ page }, use) => {
    await use(new AddContactPage(page));
  },

  EditContact: async ({ page }, use) => {
    await use(new EditContactPage(page));
  },

  ContactDetails: async ({ page }, use) => {
    await use(new ContactDetailsPage(page));
  },
});
export { expect } from "@playwright/test";
