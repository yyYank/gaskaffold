package scaffold

import (
	"embed"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
)

//go:embed all:template
var templateFS embed.FS

// Generate はテンプレートファイルを outDir にコピーする。
// packages が nil の場合は全パッケージを出力する。
func Generate(outDir string, packages []string) error {
	if err := os.MkdirAll(outDir, 0755); err != nil {
		return err
	}
	return copyFromEmbed(outDir, packages)
}

func copyFromEmbed(outDir string, packages []string) error {
	allowedPackages := toSet(packages)

	return fs.WalkDir(templateFS, "template", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		relPath, _ := filepath.Rel("template", path)
		if relPath == "." {
			return nil
		}

		// packages/ 配下はフィルタリングする（allowedPackages が空 = 全許可）
		if len(allowedPackages) > 0 && isUnderPackagesDir(relPath) {
			pkgName := packageNameOf(relPath)
			if !allowedPackages[pkgName] {
				if d.IsDir() {
					return fs.SkipDir
				}
				return nil
			}
		}

		destPath := filepath.Join(outDir, relPath)

		if d.IsDir() {
			return os.MkdirAll(destPath, 0755)
		}

		data, err := templateFS.ReadFile(path)
		if err != nil {
			return err
		}
		return os.WriteFile(destPath, data, 0644)
	})
}

// isUnderPackagesDir は relPath が packages/<name> 以下のパスかを判定する
func isUnderPackagesDir(relPath string) bool {
	segments := strings.Split(filepath.ToSlash(relPath), "/")
	return len(segments) >= 2 && segments[0] == "packages"
}

// packageNameOf は packages/<name>/... の <name> を返す
func packageNameOf(relPath string) string {
	segments := strings.Split(filepath.ToSlash(relPath), "/")
	if len(segments) >= 2 {
		return segments[1]
	}
	return ""
}

// AvailablePackages はテンプレートに含まれるパッケージ名の一覧を返す
func AvailablePackages() ([]string, error) {
	entries, err := templateFS.ReadDir("template/packages")
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

func toSet(items []string) map[string]bool {
	s := make(map[string]bool, len(items))
	for _, v := range items {
		s[v] = true
	}
	return s
}
