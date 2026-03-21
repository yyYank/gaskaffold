package cmd_test

import (
	"bytes"
	"testing"
	"testing/fstest"

	"github.com/yyYank/gascaffold/cmd"
)

var testFS = fstest.MapFS{
	"core/types.ts":                     {},
	"core/sheet.ts":                     {},
	"core/exporter.ts":                  {},
	"data/infra-runbook.ts":             {},
	"data/screen-list.ts":               {},
	"packages/infra-runbook/builder.ts": {},
	"packages/infra-runbook/types.ts":   {},
	"packages/matrix/builder.ts":        {},
	"packages/matrix/types.ts":          {},
	"packages/planning/builder.ts":      {},
	"packages/planning/types.ts":        {},
	"packages/screen-list/builder.ts":   {},
	"packages/screen-list/types.ts":     {},
	"packages/story-list/builder.ts":    {},
	"packages/story-list/types.ts":      {},
	"packages/swot/builder.ts":          {},
	"packages/swot/types.ts":            {},
	"packages/test-runbook/builder.ts":  {},
	"packages/test-runbook/types.ts":    {},
	"index.ts":              {},
	"package.json":          {},
	"tsconfig.json":         {},
	"appsscript.json":       {},
	"scripts/export-tsv.ts": {},
}

// rootコマンドが存在し、ヘルプが出力されることを検証する
func TestRootCommand_Help(t *testing.T) {
	buf := new(bytes.Buffer)
	rootCmd := cmd.NewRootCmd(testFS)
	rootCmd.SetOut(buf)
	rootCmd.SetArgs([]string{"--help"})

	err := rootCmd.Execute()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	output := buf.String()
	if output == "" {
		t.Error("expected help output, got empty string")
	}
}
