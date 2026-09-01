const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.locator('#userName');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login');
  }

  async loginAndWaitForProfile(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.safeClick(this.loginButton);
    await this.page.waitForURL('**/profile');
  }
}

module.exports = { LoginPage };
