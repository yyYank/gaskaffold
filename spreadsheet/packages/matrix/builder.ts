/**
 * マトリクス表シートのビルダー（GAS 上で実行）
 * Builder<MatrixInput, MatrixSheet> を実装するconstオブジェクト
 */

const matrixBuilder: Builder<MatrixInput, MatrixSheet> = {
  build(input) {
    const headers = ["id", "label", ...input.columns];
    const rows = input.rows.map((r) => [
      r.id,
      r.label,
      ...input.columns.map((col) => r[col] ?? ""),
    ]);

    return {
      sheets: [{ name: "マトリクス", headers, rows }],
      __brand: "MatrixSheet",
    } as MatrixSheet;
  },
};
