package main

import (
	"fmt"
	"io/fs"
	"os"

	"github.com/yyYank/gascaffold/cmd"
)

func main() {
	templateFS, err := fs.Sub(rawSpreadsheetFS, "spreadsheet")
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	if err := cmd.NewRootCmd(templateFS).Execute(); err != nil {
		os.Exit(1)
	}
}
