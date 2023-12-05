# CRUD with Node.js and Google Sheets as database

Use [Google Sheets](https://sheets.google.com) as database provider, in real-time!

## Pre-requisits

* Google Sheets API JSON file;
* Google Sheet file with public access;
* Sheet ID.
* Change line 13 from `index.js` with the actual `spreadsheetId` of your Google Sheet.
* Change the `credentials.js` file with the actual credentials of your Google Sheets API JSON key.

## Start the server

From the `/`, run:

* `npm i`
* `npm run start`
