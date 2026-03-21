package cmd

import (
	"io/fs"

	"github.com/spf13/cobra"
)

func NewRootCmd(templateFS fs.FS) *cobra.Command {
	cmd := &cobra.Command{
		Use:   "gascaffold",
		Short: "GAS スプレッドシートプロジェクトのボイラープレート生成ツール",
	}
	cmd.AddCommand(newGenerateCmd(templateFS))
	return cmd
}
