# DemoQA Book Store - Playwright

Playwright test in JavaScript for the Book Store Application on demoqa.com.
It logs in, searches for a book, writes the book details to a file and logs out.

## Steps covered

1. Go to https://demoqa.com/
2. Open Book Store Application
3. Login
4. Check the username and logout button are shown
5. Click Book Store
6. Search "Learning JavaScript Design Patterns"
7. Check the search result has that book
8. Write Title, Author and Publisher to output/book-details.txt
9. Logout

## Before running

Register a user yourself at https://demoqa.com/register.
Registration is not automated because the page has a reCAPTCHA.
The password needs an uppercase letter, a lowercase letter, a number
and a special character, for example Pass@123.

Then copy .env.example to .env and put your details in it:

    DEMOQA_USERNAME=mj
    DEMOQA_PASSWORD=Pass@123

## Running

    npm install
    npx playwright install chromium
    npm test

Use npm run test:headed to watch it in the browser,
and npm run report to open the HTML report.

## Output

output/book-details.txt gets:

    Title: Learning JavaScript Design Patterns
    Author: Addy Osmani
    Publisher: O'Reilly Media

## Files

    src/pages/    page objects (Home, Login, Profile, BookStore)
    src/data/     book title and credentials
    src/utils/    writes the output file
    tests/        bookstore.spec.js
<img width="1396" height="506" alt="image" src="https://github.com/user-attachments/assets/d903c609-6170-4bef-a14f-f6a3b1fb1542" />
