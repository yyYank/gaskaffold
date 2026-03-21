/**
 * インフラ手順書シートのビルダー（GAS 上で実行）
 * Builder<RunbookPhase[], InfraRunbookSheet> を実装するconstオブジェクト
 *
 * 設計方針: ADR-002 に従い意味構造 → row への変換はここだけに閉じ込める
 */

const infraRunbookBuilder: Builder<RunbookPhase[], InfraRunbookSheet> = {
  build(input) {
    // 意味構造 (Phase > Step) を row に展開する
    const stepHeaders = ["phase", "step_id", "title", "description", "command", "expected", "rollback", "owner"];
    const stepRows = input.flatMap(({ phase, steps }) =>
      steps.map((s) => [
        phase,
        s.id,
        s.title,
        s.description ?? "",
        s.verification.command,
        s.verification.expected,
        s.rollback?.command ?? "",
        s.owner,
      ])
    );

    const fileHeaders = ["step_id", "file", "direction", "description"];
    const fileRows = input.flatMap(({ steps }) =>
      steps.flatMap((s) =>
        (s.files ?? []).map((f) => [s.id, f.file, f.direction, f.description ?? ""])
      )
    );

    return {
      sheets: [
        { name: "手順書", headers: stepHeaders, rows: stepRows },
        { name: "ファイル一覧", headers: fileHeaders, rows: fileRows },
      ],
      __brand: "InfraRunbookSheet",
    } as InfraRunbookSheet;
  },
};
