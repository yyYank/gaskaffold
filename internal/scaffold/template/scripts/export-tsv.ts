import { RUNBOOK } from "../data/infra-runbook";
import { SCREENS } from "../data/screen-list";
import { toTsv, writeTsv } from "../core/exporter";

const OUTPUT_DIR = "./output";

// インフラ手順書 - steps.tsv
// 意味構造 (Phase > Step) を row に展開する
const stepHeaders = ["phase", "step_id", "title", "description", "command", "expected", "rollback", "owner"];
const stepRows = RUNBOOK.flatMap(({ phase, steps }) =>
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
writeTsv(OUTPUT_DIR, "steps.tsv", toTsv(stepHeaders, stepRows));

// インフラ手順書 - files.tsv
const fileHeaders = ["step_id", "file", "direction", "description"];
const fileRows = RUNBOOK.flatMap(({ steps }) =>
  steps.flatMap((s) =>
    (s.files ?? []).map((f) => [s.id, f.file, f.direction, f.description ?? ""])
  )
);
writeTsv(OUTPUT_DIR, "files.tsv", toTsv(fileHeaders, fileRows));

// 画面一覧 - screens.tsv
const screenHeaders = ["screen_id", "name", "path", "owner"];
const screenRows = SCREENS.map((s) => [s.id, s.name, s.path, s.owner]);
writeTsv(OUTPUT_DIR, "screens.tsv", toTsv(screenHeaders, screenRows));

console.log("TSV 出力完了");
