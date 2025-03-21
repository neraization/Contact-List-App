const { test, expect } = require("../../pages/Base");

test.describe.serial("Contacts", () => {
  //Declaring global variables
  let token;
  let contactId;
  let randomString;

  test.beforeAll(async ({ usersAPI }) => {
    // Prepare request body
    const body = {
      email: "nermin.maslo2@gmail.com",
      password: "12345678",
    };
    // Prepare authorization token
    const response = await usersAPI.userLogin({ data: body });
    const responseBody = await response.json();

    token = responseBody.token;

    // Assert response
    expect(response.status(), "The server did not return a successful status code").toBe(200);
  });

  test("Should Create Contact successfuly", async ({ contactsAPI, utility }) => {
    //Generating Random string for uniqueness
    randomString = utility.getRandomString();
    // Prepare request body
    const body = {
      firstName: `John${randomString}`,
      lastName: "Doe",
      birthdate: "1970-01-01",
      email: `jdoe${randomString}@fake.com`,
      phone: "8005555555",
      street1: "1 Main St.",
      street2: "Apartment A",
      city: "Anytown",
      stateProvince: "KS",
      postalCode: "12345",
      country: "USA",
    };

    // Send request
    const response = await contactsAPI.addNewContact({ data: body, token: token });

    const responseBody = await response.json();
    // Assert response
    expect(response.status(), "The server did not return a successful status code").toBe(201);
    expect(responseBody).toMatchObject(body);

    contactId = responseBody._id;
  });

  test("Should Retrieve Contact List successfuly", async ({ contactsAPI }) => {
    // Send request
    const response = await contactsAPI.getAllContacts(token);

    // Assert response
    expect(response.status(), "The server did not return a successful status code").toBe(200);
    expect(
      (await response.json()).length,
      "The number of returned Contacts does not match the balance in the database"
    ).toBeGreaterThanOrEqual(1); // We will have at least one Contact after Creation
  });

  test("Should get a Contact by ID", async ({ contactsAPI }) => {
    // Send request
    var response = await contactsAPI.getContact({
      contactId: contactId,
      token: token,
    });

    // Assert response
    expect(response.status(), "The server did not return a successful status code").toBe(200);
    expect(await response.json()).toEqual(
      expect.objectContaining({
        _id: contactId,
      })
    );
  });

  test("Should update a Contact by ID", async ({ contactsAPI }) => {
    // Prepare new First Name
    const newFirstName = "Automation";

    // Prepare request body
    const body = {
      firstName: newFirstName,
      lastName: "Doe",
      birthdate: "1970-01-01",
      email: `jdoe${randomString}@fake.com`,
      phone: "8005555555",
      street1: "1 Main St.",
      street2: "Apartment A",
      city: "Anytown",
      stateProvince: "KS",
      postalCode: "12345",
      country: "USA",
    };

    // Send request
    const response = await contactsAPI.updateContact({
      data: body,
      contactId: contactId,
      token: token,
    });

    // Assert response
    expect(response.status(), "The server did not return a successful status code").toBe(200);
    expect(await response.json()).toMatchObject(body);
  });

  test("Should update Partially a Contact by ID", async ({ contactsAPI }) => {
    // Prepare new Last Name
    const newLastName = "AutomationLastName";

    // Prepare request body
    const body = {
      lastName: newLastName,
    };

    // Send request
    const response = await contactsAPI.updateContactPartially({
      data: body,
      contactId: contactId,
      token: token,
    });

    // Assert response
    expect(response.status(), "The server did not return a successful status code").toBe(200);
    expect(await response.json()).toEqual(
      expect.objectContaining({
        lastName: newLastName,
      })
    );
  });

  test("Should delete a Contact by ID", async ({ contactsAPI }) => {
    // Send request
    var response = await contactsAPI.deleteContact({
      contactId: contactId,
      token: token,
    });

    // Assert response
    expect(response.status(), "The server did not return a successful status code").toBe(200);
  });
});
