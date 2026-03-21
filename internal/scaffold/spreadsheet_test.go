package scaffold_test

import (
	"os"
	"path/filepath"
	"testing"
	"testing/fstest"

	"github.com/yyYank/gascaffold/internal/scaffold"
)

// テスト用の最小限テンプレートFS
var testFS = fstest.MapFS{
	"core/types.ts":    {},
	"core/sheet.ts":    {},
	"core/exporter.ts": {},
	"data/infra-runbook.ts": {},
	"data/screen-list.ts":   {},
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
	"index.ts":          {},
	"package.json":      {},
	"tsconfig.json":     {},
	"appsscript.json":   {},
	"scripts/export-tsv.ts": {},
}

// Generate を呼ぶと core/ 配下のファイルが出力ディレクトリにコピーされることを検証する
func TestGenerate_CopiesCoreFiles(t *testing.T) {
	outDir := t.TempDir()

	err := scaffold.Generate(testFS, outDir, nil)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	coreFiles := []string{"types.ts", "sheet.ts", "exporter.ts"}
	for _, f := range coreFiles {
		path := filepath.Join(outDir, "core", f)
		if _, err := os.Stat(path); os.IsNotExist(err) {
			t.Errorf("expected core file to exist: %s", path)
		}
	}
}

// data/ 配下のスタブファイルが出力ディレクトリにコピーされることを検証する
func TestGenerate_CopiesDataFiles(t *testing.T) {
	outDir := t.TempDir()

	err := scaffold.Generate(testFS, outDir, nil)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	dataFiles := []string{"infra-runbook.ts", "screen-list.ts"}
	for _, f := range dataFiles {
		path := filepath.Join(outDir, "data", f)
		if _, err := os.Stat(path); os.IsNotExist(err) {
			t.Errorf("expected data file to exist: %s", path)
		}
	}
}

// packages に特定パッケージを指定すると、そのパッケージのみコピーされることを検証する
func TestGenerate_FiltersPackages(t *testing.T) {
	outDir := t.TempDir()

	err := scaffold.Generate(testFS, outDir, []string{"infra-runbook", "screen-list"})
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
	for _, pkg := range []string{"matrix", "planning", "story-list", "swot", "test-runbook"} {
		path := filepath.Join(outDir, "packages", pkg)
		if _, err := os.Stat(path); err == nil {
			t.Errorf("expected package NOT to exist: %s", path)
		}
	}
}

// AvailablePackages がテンプレートに含まれる全パッケージ名を返すことを検証する
func TestAvailablePackages(t *testing.T) {
	packages, err := scaffold.AvailablePackages(testFS)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	expected := []string{"infra-runbook", "matrix", "planning", "screen-list", "story-list", "swot", "test-runbook"}
	if len(packages) != len(expected) {
		t.Fatalf("expected %d packages, got %d: %v", len(expected), len(packages), packages)
	}
	for _, pkg := range expected {
		found := false
		for _, p := range packages {
			if p == pkg {
				found = true
				break
			}
		}
		if !found {
			t.Errorf("expected package %q in AvailablePackages", pkg)
		}
	}
}

// packages が nil のとき、全パッケージが出力ディレクトリにコピーされることを検証する
func TestGenerate_CopiesAllPackages(t *testing.T) {
	outDir := t.TempDir()

	err := scaffold.Generate(testFS, outDir, nil)
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
			t.Errorf("expected package directory to exist: %s", path)
		}
	}
}
