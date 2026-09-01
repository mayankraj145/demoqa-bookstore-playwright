const fs = require('fs');
const path = require('path');

function writeBookDetails(book) {
  const filePath = path.resolve(process.cwd(), 'output', 'book-details.txt');
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  const content = `Title: ${book.title}\nAuthor: ${book.author}\nPublisher: ${book.publisher}\n`;
  fs.writeFileSync(filePath, content, 'utf-8');

  return filePath;
}

module.exports = { writeBookDetails };
