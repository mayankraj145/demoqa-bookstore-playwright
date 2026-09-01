const { test, expect } = require('@playwright/test');
const fs = require('fs');

const { HomePage } = require('../src/pages/HomePage');
const { LoginPage } = require('../src/pages/LoginPage');
const { ProfilePage } = require('../src/pages/ProfilePage');
const { BookStorePage } = require('../src/pages/BookStorePage');
const { TARGET_BOOK_TITLE, getCredentials } = require('../src/data/testData');
const { writeBookDetails } = require('../src/utils/fileWriter');

test('DemoQA Book Store: login, search a book, export its details, log out', async ({ page }) => {
  const { username, password } = getCredentials();

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const profilePage = new ProfilePage(page);
  const bookStorePage = new BookStorePage(page);

  await homePage.open();
  await homePage.goToBookStoreApp();

  await bookStorePage.goToLogin();
  await loginPage.loginAndWaitForProfile(username, password);

  await expect(page).toHaveURL(/\/profile/);
  expect(await profilePage.getUsername()).toBe(username);
  await expect(profilePage.logoutButton).toBeVisible();

  await profilePage.goToBookStore();
  await bookStorePage.search(TARGET_BOOK_TITLE);
  await expect(bookStorePage.rowByTitle(TARGET_BOOK_TITLE)).toBeVisible();

  const book = await bookStorePage.getBookFromRow(TARGET_BOOK_TITLE);
  const filePath = writeBookDetails(book);
  expect(fs.existsSync(filePath)).toBe(true);
  console.log(`Book details written to ${filePath}:`, book);

  await bookStorePage.logout();
  await expect(page).toHaveURL(/\/login/);
});
