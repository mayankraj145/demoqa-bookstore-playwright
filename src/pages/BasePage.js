class BasePage {
  constructor(page) {
    this.page = page;
    this.usernameLabel = page.locator('#userName-value');
    this.logoutButton = page.getByRole('button', { name: /^log\s?out$/i });
  }

  async open(path = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    // the sticky ad banner and footer sit on top of real controls
    await this.page
      .addStyleTag({ content: '#fixedban, footer { display: none !important; }' })
      .catch(() => {});
  }

  async safeClick(locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.scrollIntoViewIfNeeded();
    await locator.click();
  }

  async textOf(locator) {
    return (await locator.innerText()).trim();
  }

  async getUsername() {
    await this.usernameLabel.waitFor({ state: 'visible' });
    return this.textOf(this.usernameLabel);
  }

  async logout() {
    await this.safeClick(this.logoutButton);
    await this.page.waitForURL('**/login');
  }

  async clickLeftNav(itemText) {
    const group = this.page.locator('.left-pannel .element-group', {
      hasText: 'Book Store Application',
    });
    const item = group.locator('span.text', {
      hasText: new RegExp(`^${itemText}$`),
    });

    await group.waitFor({ state: 'visible' });

    // the group is sometimes still collapsed right after a navigation
    for (let i = 0; i < 3 && !(await item.isVisible()); i += 1) {
      await this.safeClick(group.locator('.header-text'));
      await item.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
    }

    await this.safeClick(item);
  }
}

module.exports = { BasePage };
