const TARGET_BOOK_TITLE = 'Learning JavaScript Design Patterns';

function getCredentials() {
  const username = process.env.DEMOQA_USERNAME;
  const password = process.env.DEMOQA_PASSWORD;

  if (!username || !password) {
    throw new Error('Set DEMOQA_USERNAME and DEMOQA_PASSWORD in .env');
  }

  return { username, password };
}

module.exports = { TARGET_BOOK_TITLE, getCredentials };
