# Google Sheets setup

1. Create or choose the Google Sheet that should receive website leads.
2. In Google Cloud, create a service account and enable the Google Sheets API.
3. Generate a JSON key for that service account.
4. Share the Google Sheet with the service account email as an editor.
5. Add these server-side environment variables:

   - `GOOGLE_SHEETS_SPREADSHEET_ID`
   - `GOOGLE_SHEETS_TAB_NAME` (optional; if omitted, the first sheet tab is used)
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`

6. For the private key, keep escaped newlines in the env value, for example:

   `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"`

The contact API route appends these columns:

- Submitted At
- Source
- Name
- Email
- Company
- Phone
- Message
- Product
- SKU
- Referrer
- User Agent