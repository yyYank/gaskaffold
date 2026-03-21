/**
 * シート定義の共通型
 */
export interface SheetDefinition {
  name: string;
  headers: string[];
  rows: (string | number | boolean)[][];
}
