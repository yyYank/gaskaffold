// 意味構造に従って定義する: phase は PhaseStep の属性ではなく親 RunbookPhase の属性
export const RUNBOOK: RunbookPhase[] = [
  {
    phase: "事前確認",
    steps: [
      {
        id: "01-001" as StepId,
        title: "ディスク空き容量確認",
        description: "デプロイに必要な最低 2GB 以上の空きがあること",
        verification: { command: "df -h /var", expected: "Avail 列が 2G 以上" },
        files: [
          { file: "params.yaml", direction: "input", description: "デプロイパラメータ" },
        ],
        owner: "佐藤",
      },
    ],
  },
  {
    phase: "デプロイ",
    steps: [
      {
        id: "01-002" as StepId,
        title: "Nginx 停止",
        verification: { command: "systemctl stop nginx", expected: "inactive (dead)" },
        rollback: { command: "systemctl start nginx" },
        owner: "佐藤",
      },
    ],
  },
];
