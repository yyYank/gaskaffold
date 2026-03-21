/**
 * 機能一覧（プランニング）シートのビルダー（GAS 上で実行）
 * Builder<FeatureInput[], PlanningSheet> を実装するconstオブジェクト
 */

const planningBuilder: Builder<FeatureInput[], PlanningSheet> = {
  build(input) {
    const headers = ["feature_id", "category", "name", "description", "priority", "milestone", "owner", "status", "memo"];
    const rows = input.map((f) => [
      f.id,
      f.category,
      f.name,
      f.description ?? "",
      f.priority,
      f.milestone ?? "",
      f.owner ?? "",
      f.status ?? "未着手",
      f.memo ?? "",
    ]);

    return {
      sheets: [{ name: "機能一覧", headers, rows }],
      __brand: "PlanningSheet",
    } as PlanningSheet;
  },
};
