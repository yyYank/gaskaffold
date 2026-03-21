/**
 * シート構築の共通ロジック（GAS 上で実行）
 */

function getOrCreateSheet(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet, name: string): GoogleAppsScript.Spreadsheet.Sheet {
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
  }
  return sheet;
}

function buildSheet(
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
  sheetName: string,
  headers: string[],
  rows: (string | number | boolean)[][]
): void {
  const sheet = getOrCreateSheet(spreadsheet, sheetName);
  sheet.clearContents();

  if (headers.length > 0) {
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setValues([headers]);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#4a86e8");
    headerRange.setFontColor("#ffffff");
  }

  if (rows.length > 0) {
    const dataRange = sheet.getRange(2, 1, rows.length, headers.length);
    dataRange.setValues(rows);
  }

  // 列幅の自動調整
  sheet.autoResizeColumns(1, headers.length);

  // 読み取り専用（警告モード）に設定
  const protection = sheet.protect();
  protection.setWarningOnly(true);
}
