/**
 * ストーリー一覧シートのビルダー（GAS 上で実行）
 * Builder<StoryInput[], StoryListSheet> を実装するconstオブジェクト
 */

const storyListBuilder: Builder<StoryInput[], StoryListSheet> = {
  build(input) {
    const headers = ["story_id", "title", "as_a", "i_want", "so_that", "priority", "story_points", "owner", "status"];
    const rows = input.map((s) => [
      s.id,
      s.title,
      s.asA,
      s.iWant,
      s.soThat,
      s.priority,
      s.storyPoints ?? "",
      s.owner ?? "",
      s.status ?? "未着手",
    ]);

    return {
      sheets: [{ name: "ストーリー一覧", headers, rows }],
      __brand: "StoryListSheet",
    } as StoryListSheet;
  },
};
