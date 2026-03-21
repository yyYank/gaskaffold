package cmd

import "github.com/spf13/cobra"

func newGenerateCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "generate",
		Short: "ボイラープレートを生成する",
	}
	cmd.AddCommand(newGenerateSpreadsheetCmd())
	return cmd
}
