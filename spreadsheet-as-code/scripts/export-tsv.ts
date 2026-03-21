import { STEPS } from "../data/infra-runbook";
import { SCREENS } from "../data/screen-list";
import { toTsv, writeTsv } from "../core/exporter";

const OUTPUT_DIR = "./output";

// インフラ手順書 - steps.tsv
const stepHeaders = ["step_id", "phase", "title", "description", "command", "expected", "rollback", "owner"];
const stepRows = STEPS.map((s) => [
  s.id,
  s.phase,
  s.title,
  s.description ?? "",
  s.command ?? "",
  s.expected ?? "",
  s.rollback ?? "",
  s.owner,
]);
writeTsv(OUTPUT_DIR, "steps.tsv", toTsv(stepHeaders, stepRows));

// インフラ手順書 - files.tsv
const fileHeaders = ["step_id", "file", "direction", "description"];
const fileRows: (string | number | boolean)[][] = [];
for (const step of STEPS) {
  for (const f of step.files ?? []) {
    fileRows.push([step.id, f.file, f.direction, f.description ?? ""]);
  }
}
writeTsv(OUTPUT_DIR, "files.tsv", toTsv(fileHeaders, fileRows));

// 画面一覧 - screens.tsv
const screenHeaders = ["screen_id", "name", "path", "owner"];
const screenRows = SCREENS.map((s) => [s.id, s.name, s.path, s.owner]);
writeTsv(OUTPUT_DIR, "screens.tsv", toTsv(screenHeaders, screenRows));

console.log("TSV 出力完了");
