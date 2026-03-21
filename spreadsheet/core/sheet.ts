/**
 * シート操作の共通ロジック（GAS 上で実行）
 */

function getOrCreateSheet(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet, name: string): GoogleAppsScript.Spreadsheet.Sheet {
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
  }
  return sheet;
}

/**
 * 既存シートの内容をバックアップシートにコピーする
 * バックアップシート名: _backup_{元シート名}_{タイムスタンプ}
 */
function backupSheet(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet, sheet: GoogleAppsScript.Spreadsheet.Sheet): void {
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  if (lastRow === 0 || lastCol === 0) return;

  const timestamp = Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyyMMdd_HHmmss");
  const backupName = `_backup_${sheet.getName()}_${timestamp}`;
  const backupSheet = spreadsheet.insertSheet(backupName);
  const data = sheet.getRange(1, 1, lastRow, lastCol).getValues();
  backupSheet.getRange(1, 1, lastRow, lastCol).setValues(data);
}

function buildSheet(
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
  sheetName: string,
  headers: string[],
  rows: (string | number | boolean)[][]
): void {
  const sheet = getOrCreateSheet(spreadsheet, sheetName);

  // 既存データをバックアップしてからクリア
  backupSheet(spreadsheet, sheet);
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
