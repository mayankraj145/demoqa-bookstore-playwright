const { BasePage } = require('./BasePage');

const COLUMN = { TITLE: 1, AUTHOR: 2, PUBLISHER: 3 };

class BookStorePage extends BasePage {
  constructor(page) {
    super(page);
    this.searchBox = page.locator('#searchBox');
    this.resultRows = page.locator('table tbody tr').filter({ has: page.locator('td a') });
  }

  async goToLogin() {
    await this.clickLeftNav('Login');
    await this.page.waitForURL('**/login');
  }

  async search(term) {
    await this.searchBox.fill(term);
    await this.page.waitForTimeout(500);
  }

  rowByTitle(title) {
    return this.resultRows.filter({ hasText: title }).first();
  }

  async getBookFromRow(title) {
    const cells = this.rowByTitle(title).locator('td');
    return {
      title: await this.textOf(cells.nth(COLUMN.TITLE)),
      author: await this.textOf(cells.nth(COLUMN.AUTHOR)),
      publisher: await this.textOf(cells.nth(COLUMN.PUBLISHER)),
    };
  }
}

module.exports = { BookStorePage };
