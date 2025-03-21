exports.UtilityPage = class UtilityPage {
  constructor() {}

  getRandomString() {
    let now = new Date().getTime();
    let timestamp = now.toString();
    return timestamp;
  }
};
