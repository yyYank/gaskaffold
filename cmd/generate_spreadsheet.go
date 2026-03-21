package cmd

import (
	"io/fs"
	"os"
	"strings"

	"github.com/AlecAivazis/survey/v2"
	"github.com/spf13/cobra"
	"github.com/yyYank/gascaffold/internal/scaffold"
	"golang.org/x/term"
)

func newGenerateSpreadsheetCmd(templateFS fs.FS) *cobra.Command {
	var outDir string
	var packagesFlag string
	var noInteractive bool

	cmd := &cobra.Command{
		Use:   "spread-sheet",
		Short: "GAS スプレッドシートプロジェクトを生成する",
		RunE: func(cmd *cobra.Command, args []string) error {
			var packages []string

			switch {
			case packagesFlag != "":
				// --packages フラグが指定された場合はそれを使う
				packages = strings.Split(packagesFlag, ",")
			case !noInteractive && term.IsTerminal(int(os.Stdin.Fd())):
				// インタラクティブモード: チェックボックスで選択
				selected, err := selectPackagesInteractively(templateFS)
				if err != nil {
					return err
				}
				packages = selected
			default:
				// 非インタラクティブ or --no-interactive: 全パッケージ
				packages = nil
			}

			return scaffold.Generate(templateFS, outDir, packages)
		},
	}
	cmd.Flags().StringVar(&outDir, "out", "", "出力先ディレクトリ（必須）")
	cmd.Flags().StringVar(&packagesFlag, "packages", "", "出力するパッケージをカンマ区切りで指定（例: infra-runbook,screen-list）")
	cmd.Flags().BoolVar(&noInteractive, "no-interactive", false, "インタラクティブ選択を無効にして全パッケージを出力する")
	cmd.MarkFlagRequired("out")
	return cmd
}

func selectPackagesInteractively(templateFS fs.FS) ([]string, error) {
	available, err := scaffold.AvailablePackages(templateFS)
	if err != nil {
		return nil, err
	}

	var selected []string
	prompt := &survey.MultiSelect{
		Message: "出力するパッケージを選択してください（スペースで選択、Enterで確定）:",
		Options: available,
		Default: available,
	}
	if err := survey.AskOne(prompt, &selected); err != nil {
		return nil, err
	}

	if len(selected) == 0 {
		return nil, nil
	}
	return selected, nil
}
