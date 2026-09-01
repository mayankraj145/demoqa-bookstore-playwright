const { BasePage } = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.bookStoreCard = page.locator('.card').filter({ hasText: 'Book Store Application' });
  }

  async open() {
    await super.open('/');
  }

  async goToBookStoreApp() {
    await this.safeClick(this.bookStoreCard);
    await this.page.waitForURL('**/books');
  }
}

module.exports = { HomePage };
