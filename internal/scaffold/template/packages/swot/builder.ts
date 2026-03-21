/**
 * SWOT シートのビルダー（GAS 上で実行）
 * Builder<SwotInput[], SwotSheet> を実装するconstオブジェクト
 */

const swotBuilder: Builder<SwotInput[], SwotSheet> = {
  build(input) {
    const headers = ["id", "category", "item", "description", "priority"];
    const rows = input.map((s) => [
      s.id,
      s.category,
      s.item,
      s.description ?? "",
      s.priority ?? "中",
    ]);

    return {
      sheets: [{ name: "SWOT", headers, rows }],
      __brand: "SwotSheet",
    } as SwotSheet;
  },
};
