/**
 * マトリクス表の型定義
 * GAS グローバルスコープで利用するためexportしない
 */

// Input: asキャスト不要なプレーンな型
type MatrixRowInput = {
  id: string;
  label: string;
  [key: string]: string;
};

type MatrixInput = {
  columns: string[];
  rows: MatrixRowInput[];
};

// Output: Brand型で他のSheet型と区別する
type MatrixSheet = Brand<{ sheets: SheetData[] }, "MatrixSheet">;
