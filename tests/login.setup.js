import { test as setup, expect } from "../pages/Base.js";
import { USER_SESSION } from "../playwright.config.js";

setup("Should login successfuly into Contact List App", async ({ page, Login }) => {
  await page.goto("/"); // Navigate to Sign In page

  const email = "nerminmaslo@gmail.com";
  const password = "12345678";

  await expect(Login.login.title).toHaveText("Contact List App");
  await expect(Login.login.form).toBeInViewport();

  await Login.enterEmail(email);
  await Login.enterPassword(password);

  await Login.submitSignInForm();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/My Contacts/, { timeout: 10000 });

  // Save user session
  await page.context().storageState({
    path: USER_SESSION,
  });
});
