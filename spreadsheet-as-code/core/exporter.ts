import * as fs from "fs";
import * as path from "path";

/**
 * TSV 出力ロジック（Node.js ローカル実行用）
 */

export function toTsv(headers: string[], rows: (string | number | boolean)[][]): string {
  const headerLine = headers.join("\t");
  const dataLines = rows.map((row) =>
    row.map((cell) => String(cell ?? "")).join("\t")
  );
  return [headerLine, ...dataLines].join("\n");
}

export function writeTsv(outputDir: string, filename: string, content: string): void {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const filePath = path.join(outputDir, filename);
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`Written: ${filePath}`);
}
