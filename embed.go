package main

import "embed"

//go:embed spreadsheet/core
//go:embed spreadsheet/packages
//go:embed spreadsheet/data
//go:embed spreadsheet/scripts
//go:embed spreadsheet/index.ts
//go:embed spreadsheet/package.json
//go:embed spreadsheet/tsconfig.json
//go:embed spreadsheet/appsscript.json
var rawSpreadsheetFS embed.FS
