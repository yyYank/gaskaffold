import { Step } from "../packages/infra-runbook/types";

export const STEPS: Step[] = [
  {
    id: "01-001",
    phase: "事前確認",
    title: "ディスク空き容量確認",
    description: "デプロイに必要な最低 2GB 以上の空きがあること",
    command: "df -h /var",
    expected: "Avail 列が 2G 以上",
    owner: "佐藤",
    files: [
      { file: "params.yaml", direction: "input", description: "デプロイパラメータ" },
    ],
  },
  {
    id: "01-002",
    phase: "デプロイ",
    title: "Nginx 停止",
    command: "systemctl stop nginx",
    expected: "inactive (dead)",
    rollback: "systemctl start nginx",
    owner: "佐藤",
  },
];
