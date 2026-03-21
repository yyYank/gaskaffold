package cmd_test

import (
	"bytes"
	"strings"
	"testing"

	"github.com/yyYank/gascaffold/cmd"
)

// generateサブコマンドが存在し、rootのヘルプに表示されることを検証する
func TestGenerateCommand_ExistsInRoot(t *testing.T) {
	buf := new(bytes.Buffer)
	rootCmd := cmd.NewRootCmd(testFS)
	rootCmd.SetOut(buf)
	rootCmd.SetArgs([]string{"--help"})

	rootCmd.Execute()

	if !strings.Contains(buf.String(), "generate") {
		t.Errorf("expected 'generate' in help output, got: %s", buf.String())
	}
}

// `g` エイリアスで generate と同じ動作をすることを検証する
func TestGenerateCommand_Alias(t *testing.T) {
	buf := new(bytes.Buffer)
	rootCmd := cmd.NewRootCmd(testFS)
	rootCmd.SetOut(buf)
	rootCmd.SetArgs([]string{"g", "--help"})

	err := rootCmd.Execute()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if buf.String() == "" {
		t.Error("expected help output, got empty string")
	}
}

// generate --help が正常に出力されることを検証する
func TestGenerateCommand_Help(t *testing.T) {
	buf := new(bytes.Buffer)
	rootCmd := cmd.NewRootCmd(testFS)
	rootCmd.SetOut(buf)
	rootCmd.SetArgs([]string{"generate", "--help"})

	err := rootCmd.Execute()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if buf.String() == "" {
		t.Error("expected help output, got empty string")
	}
}
