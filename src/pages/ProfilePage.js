const { BasePage } = require('./BasePage');

class ProfilePage extends BasePage {
  async goToBookStore() {
    await this.clickLeftNav('Book Store');
    await this.page.waitForURL('**/books');
  }
}

module.exports = { ProfilePage };
