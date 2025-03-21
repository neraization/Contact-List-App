exports.UsersPage = class UsersPage {
  /**
   * @param {import('playwright').APIRequestContext} request
   */
  constructor(request) {
    this.request = request;
  }

  //#region Users Controller

  async userLogin(options) {
    const url = process.env.BASE_URL + "/users/login";

    return await this.request.post(url, {
      data: options.data,
    });
  }

  async userLogout(token) {
    const url = process.env.BASE_URL + "/users/logout";

    return await this.request.post(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  //#endregion
};
