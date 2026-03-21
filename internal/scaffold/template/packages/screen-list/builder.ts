/**
 * 画面一覧シートのビルダー（GAS 上で実行）
 * Builder<ScreenInput[], ScreenListSheet> を実装するconstオブジェクト
 */

const screenListBuilder: Builder<ScreenInput[], ScreenListSheet> = {
  build(input) {
    const headers = ["screen_id", "name", "path", "description", "owner", "status"];
    const rows = input.map((s) => [
      s.id,
      s.name,
      s.path,
      s.description ?? "",
      s.owner,
      s.status ?? "未着手",
    ]);

    return {
      sheets: [{ name: "画面一覧", headers, rows }],
      __brand: "ScreenListSheet",
    } as ScreenListSheet;
  },
};
