package cmd_test

import (
	"bytes"
	"testing"

	"github.com/yyYank/gascaffold/cmd"
)

// rootコマンドが存在し、ヘルプが出力されることを検証する
func TestRootCommand_Help(t *testing.T) {
	buf := new(bytes.Buffer)
	rootCmd := cmd.NewRootCmd()
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
