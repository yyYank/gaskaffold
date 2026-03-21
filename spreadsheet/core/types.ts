/**
 * 共通型定義
 * GAS グローバルスコープで利用するためexportしない
 */

// ノミナルタイピング：構造が同じでも別物として区別するBrand型
type Brand<T, B extends string> = T & { readonly __brand: B };

// シートデータの共通型
type SheetData = {
  name: string;
  headers: string[];
  rows: (string | number | boolean)[][];
};

/**
 * ドキュメントビルダーの契約
 * TInput: asキャスト不要なプレーンな入力型
 * TOutput: Brand型で識別されるOutput型
 */
interface Builder<TInput, TOutput> {
  build(input: TInput): TOutput;
}
