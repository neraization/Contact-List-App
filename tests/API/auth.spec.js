const { test, expect } = require("../../pages/Base");

test.describe.serial("Users", () => {
  //Declaring global variables
  let token;

  test("Should login successfuly", async ({ usersAPI }) => {
    // Prepare request body
    const body = {
      email: "nermin.maslo2@gmail.com",
      password: "12345678",
    };

    // Send request
    const response = await usersAPI.userLogin({ data: body });
    const responseBody = await response.json();

    token = responseBody.token;

    // Assert response
    expect(response.status(), "The server did not return a successful status code").toBe(200);
  });

  test("Should logout successfuly", async ({ usersAPI }) => {
    // Send request
    const response = await usersAPI.userLogout(token);

    // Assert response
    expect(response.status(), "The server did not return a successful status code").toBe(200);
  });
});
