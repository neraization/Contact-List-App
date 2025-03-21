exports.ContactAPIPage = class ContactAPIPage {
  /**
   * @param {import('playwright').APIRequestContext} request
   */
  constructor(request) {
    this.request = request;
  }

  //#region Contact Controller

  async addNewContact(options) {
    const url = process.env.BASE_URL + "/contacts";

    return await this.request.post(url, {
      data: options.data,
      headers: {
        Authorization: "Bearer " + options.token,
      },
    });
  }

  async getAllContacts(token) {
    const url = process.env.BASE_URL + "/contacts";

    return await this.request.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  async getContact(options) {
    const url = process.env.BASE_URL + "/contacts/" + options.contactId;

    return await this.request.get(url, {
      headers: {
        Authorization: "Bearer " + options.token,
      },
    });
  }

  async updateContact(options) {
    const url = process.env.BASE_URL + "/contacts/" + options.contactId;

    return await this.request.put(url, {
      data: options.data,
      headers: {
        Authorization: "Bearer " + options.token,
      },
    });
  }

  async updateContactPartially(options) {
    const url = process.env.BASE_URL + "/contacts/" + options.contactId;

    return await this.request.patch(url, {
      data: options.data,
      headers: {
        Authorization: "Bearer " + options.token,
      },
    });
  }

  async deleteContact(options) {
    const url = process.env.BASE_URL + "/contacts/" + options.contactId;

    return await this.request.delete(url, {
      headers: {
        Authorization: "Bearer " + options.token,
      },
    });
  }

  //#endregion
};
