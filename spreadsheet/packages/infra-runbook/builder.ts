/**
 * インフラ手順書シートのビルダー（GAS 上で実行）
 * Builder<InfraRunbookInput[], InfraRunbookSheet> を実装するconstオブジェクト
 */

const infraRunbookBuilder: Builder<InfraRunbookInput[], InfraRunbookSheet> = {
  build(input) {
    const stepHeaders = ["step_id", "phase", "title", "description", "command", "expected", "rollback", "owner"];
    const stepRows = input.map((s) => [
      s.id,
      s.phase,
      s.title,
      s.description ?? "",
      s.command ?? "",
      s.expected ?? "",
      s.rollback ?? "",
      s.owner,
    ]);

    const fileHeaders = ["step_id", "file", "direction", "description"];
    const fileRows: (string | number | boolean)[][] = [];
    for (const step of input) {
      for (const f of step.files ?? []) {
        fileRows.push([step.id, f.file, f.direction, f.description ?? ""]);
      }
    }

    return {
      sheets: [
        { name: "手順書", headers: stepHeaders, rows: stepRows },
        { name: "ファイル一覧", headers: fileHeaders, rows: fileRows },
      ],
      __brand: "InfraRunbookSheet",
    } as InfraRunbookSheet;
  },
};
