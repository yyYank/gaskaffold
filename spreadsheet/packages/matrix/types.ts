/**
 * マトリクス表の型定義
 * GAS グローバルスコープで利用するためexportしない
 */

interface MatrixRow {
  id: string;
  label: string;
  [key: string]: string;
}

interface Matrix {
  columns: string[];
  rows: MatrixRow[];
}
