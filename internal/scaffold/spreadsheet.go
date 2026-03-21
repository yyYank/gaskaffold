package scaffold

import (
	"io/fs"
	"os"
	"path/filepath"
	"strings"
)

// Generate はテンプレートファイルを outDir にコピーする。
// fsys はテンプレートのルートFS（spreadsheet/ 相当）。
// packages が nil の場合は全パッケージを出力する。
func Generate(fsys fs.FS, outDir string, packages []string) error {
	if err := os.MkdirAll(outDir, 0755); err != nil {
		return err
	}
	allowedPackages := toSet(packages)

	return fs.WalkDir(fsys, ".", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if path == "." {
			return nil
		}

		// packages/ 配下はフィルタリングする（allowedPackages が空 = 全許可）
		if len(allowedPackages) > 0 && isUnderPackagesDir(path) {
			pkgName := packageNameOf(path)
			if !allowedPackages[pkgName] {
				if d.IsDir() {
					return fs.SkipDir
				}
				return nil
			}
		}

		destPath := filepath.Join(outDir, path)

		if d.IsDir() {
			return os.MkdirAll(destPath, 0755)
		}

		data, err := fs.ReadFile(fsys, path)
		if err != nil {
			return err
		}
		return os.WriteFile(destPath, data, 0644)
	})
}

// AvailablePackages はテンプレートに含まれるパッケージ名の一覧を返す
func AvailablePackages(fsys fs.FS) ([]string, error) {
	entries, err := fs.ReadDir(fsys, "packages")
	if err != nil {
		return nil, err
	}
	var packages []string
	for _, e := range entries {
		if e.IsDir() {
			packages = append(packages, e.Name())
		}
	}
	return packages, nil
}

// isUnderPackagesDir は path が packages/<name> 以下かを判定する
func isUnderPackagesDir(path string) bool {
	segments := strings.Split(filepath.ToSlash(path), "/")
	return len(segments) >= 2 && segments[0] == "packages"
}

// packageNameOf は packages/<name>/... の <name> を返す
func packageNameOf(path string) string {
	segments := strings.Split(filepath.ToSlash(path), "/")
	if len(segments) >= 2 {
		return segments[1]
	}
	return ""
}

func toSet(items []string) map[string]bool {
	s := make(map[string]bool, len(items))
	for _, v := range items {
		s[v] = true
	}
	return s
}
