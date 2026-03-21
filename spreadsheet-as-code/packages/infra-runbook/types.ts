/**
 * インフラ手順書の型定義
 */

export interface FileRef {
  file: string;
  direction: "input" | "output";
  description?: string;
}

export interface Step {
  id: string;
  phase: string;
  title: string;
  description?: string;
  command?: string;
  expected?: string;
  rollback?: string;
  owner: string;
  files?: FileRef[];
}
