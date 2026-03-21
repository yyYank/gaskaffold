package cmd_test

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/yyYank/gascaffold/cmd"
)

// generate spread-sheet --out が指定ディレクトリを作成することを検証する
func TestGenerateSpreadsheet_CreatesOutputDir(t *testing.T) {
	outDir := filepath.Join(t.TempDir(), "my-project")

	rootCmd := cmd.NewRootCmd(testFS)
	rootCmd.SetArgs([]string{"generate", "spread-sheet", "--out", outDir})

	err := rootCmd.Execute()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if _, err := os.Stat(outDir); os.IsNotExist(err) {
		t.Errorf("expected output directory to be created: %s", outDir)
	}
}

// --packages 未指定のとき全パッケージが出力されることを検証する（非インタラクティブ環境）
func TestGenerateSpreadsheet_NoPackagesFlag_OutputsAll(t *testing.T) {
	outDir := filepath.Join(t.TempDir(), "all-project")

	rootCmd := cmd.NewRootCmd(testFS)
	rootCmd.SetArgs([]string{"generate", "spread-sheet", "--out", outDir, "--no-interactive"})

	err := rootCmd.Execute()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	expectedPackages := []string{
		"infra-runbook", "matrix", "planning",
		"screen-list", "story-list", "swot", "test-runbook",
	}
	for _, pkg := range expectedPackages {
		path := filepath.Join(outDir, "packages", pkg)
		if _, err := os.Stat(path); os.IsNotExist(err) {
			t.Errorf("expected package to exist: %s", path)
		}
	}
}

// --packages フラグで指定したパッケージのみ出力されることを検証する
func TestGenerateSpreadsheet_PackagesFlag(t *testing.T) {
	outDir := filepath.Join(t.TempDir(), "filtered-project")

	rootCmd := cmd.NewRootCmd(testFS)
	rootCmd.SetArgs([]string{
		"generate", "spread-sheet",
		"--out", outDir,
		"--packages", "infra-runbook,screen-list",
	})

	err := rootCmd.Execute()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	// 指定パッケージは存在する
	for _, pkg := range []string{"infra-runbook", "screen-list"} {
		path := filepath.Join(outDir, "packages", pkg)
		if _, err := os.Stat(path); os.IsNotExist(err) {
			t.Errorf("expected package to exist: %s", path)
		}
	}

	// 指定していないパッケージは存在しない
	for _, pkg := range []string{"matrix", "planning"} {
		path := filepath.Join(outDir, "packages", pkg)
		if _, err := os.Stat(path); err == nil {
			t.Errorf("expected package NOT to exist: %s", path)
		}
	}
}
