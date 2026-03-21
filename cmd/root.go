package cmd

import "github.com/spf13/cobra"

func NewRootCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "gascaffold",
		Short: "GAS スプレッドシートプロジェクトのボイラープレート生成ツール",
	}
	cmd.AddCommand(newGenerateCmd())
	return cmd
}
