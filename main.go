package main

import (
	"os"

	"github.com/yyYank/gascaffold/cmd"
)

func main() {
	if err := cmd.NewRootCmd().Execute(); err != nil {
		os.Exit(1)
	}
}
