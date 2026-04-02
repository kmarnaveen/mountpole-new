import "server-only";

import { google } from "googleapis";

export type ContactSheetRow = {
  submittedAt: string;
  source: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  product: string;
  sku: string;
  referrer: string;
  userAgent: string;
};

const SHEET_HEADERS = [
  "Submitted At",
  "Source",
  "Name",
  "Email",
  "Company",
  "Phone",
  "Message",
  "Product",
  "SKU",
  "Referrer",
  "User Agent",
];

function getEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getSheetsClient() {
  const clientEmail = getEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const privateKey = getEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY").replace(
    /\\n/g,
    "\n",
  );

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

async function resolveSheetTitle(
  spreadsheetId: string,
  explicitSheetTitle?: string,
) {
  if (explicitSheetTitle) {
    return explicitSheetTitle;
  }

  const sheets = getSheetsClient();
  const response = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties.title",
  });

  const firstSheetTitle = response.data.sheets?.[0]?.properties?.title;
  if (!firstSheetTitle) {
    throw new Error("Could not resolve a target sheet tab in the spreadsheet.");
  }

  return firstSheetTitle;
}

async function ensureHeaderRow(spreadsheetId: string, sheetTitle: string) {
  const sheets = getSheetsClient();
  const headerRange = `${sheetTitle}!A1:K1`;
  const existingHeader = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: headerRange,
  });

  if ((existingHeader.data.values?.[0]?.length ?? 0) > 0) {
    return;
  }

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: headerRange,
    valueInputOption: "RAW",
    requestBody: {
      values: [SHEET_HEADERS],
    },
  });
}

export async function appendContactSubmission(row: ContactSheetRow) {
  const spreadsheetId = getEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
  const explicitSheetTitle = process.env.GOOGLE_SHEETS_TAB_NAME?.trim();
  const sheetTitle = await resolveSheetTitle(spreadsheetId, explicitSheetTitle);

  await ensureHeaderRow(spreadsheetId, sheetTitle);

  const sheets = getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetTitle}!A:K`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          row.submittedAt,
          row.source,
          row.name,
          row.email,
          row.company,
          row.phone,
          row.message,
          row.product,
          row.sku,
          row.referrer,
          row.userAgent,
        ],
      ],
    },
  });
}