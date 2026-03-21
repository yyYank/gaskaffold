/**
 * マトリクス表の型定義
 */

export interface MatrixRow {
  id: string;
  label: string;
  [key: string]: string;
}

export interface Matrix {
  columns: string[];
  rows: MatrixRow[];
}
