# Implementation Plan - Direct Excel (.xlsx) Import for RTE Catalog

## Overview
Enable users to directly import and parse their complete `.xlsx` catalog spreadsheet files within the RTE Equipment Catalog application, using the `xlsx` (SheetJS) library.

## Proposed Changes

### 1. Dependencies
- Install `xlsx` package for robust client-side Excel workbook parsing.

### 2. File Parser & Import Service (`src/utils/excelParser.ts`)
- Create a utility function to parse `.xlsx` files uploaded via the UI.
- Map Excel rows and columns according to RTE catalog structure (Code Modèle, Désignation, Classification Ealico, Type, Équipes concernées, Nb éléments, Obligatoire Ealico, Fiche technique, Contrôles 1 à 4).

### 3. UI Enhancements (`src/components/Header.tsx` & `src/App.tsx`)
- Add an "Importer Excel (.xlsx)" button in the top bar.
- Update file input to accept `.xlsx` and `.xls` files alongside `.json`.
- Automatically parse the uploaded Excel workbook, convert sheets into structured equipment records, update state, and persist to `localStorage`.
- Display success notifications and summary of imported records.

## Verification Plan
- Compile applet (`compile_applet`) and run linter (`lint_applet`).
- Verify Excel file upload handler correctly parses sample or custom RTE `.xlsx` workbooks.
