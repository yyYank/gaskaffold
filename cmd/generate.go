package cmd

import (
	"io/fs"

	"github.com/spf13/cobra"
)

func newGenerateCmd(templateFS fs.FS) *cobra.Command {
	cmd := &cobra.Command{
		Use:   "generate",
		Short: "ボイラープレートを生成する",
	}
	cmd.AddCommand(newGenerateSpreadsheetCmd(templateFS))
	return cmd
}
