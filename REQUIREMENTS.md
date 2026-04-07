# Smart Name Splitter — Requirements

## Purpose

A single-page tool to split a pasted list of names into multiple groups using a visual pool and column layout, with optional random assignment of unplaced names and clipboard export per group.

## Input

- **Name list**: Free text in a textarea. Names are separated by commas and/or newlines.
- **Parsing**: Trim whitespace; empty tokens are ignored.
- **Validation**: Duplicate names in the parsed list are rejected with a clear error message. The UI must not proceed with ambiguous duplicates.

## Defaults and configuration

- **Default sample text**: The textarea has no prefilled names; only a short placeholder may describe the expected format.
- **Number of groups**: Default is **2**. The user can change the count (e.g. via a number control or select) within a reasonable range (e.g. 2–12).
- **Changing group count**: Existing assignments are preserved where possible. If the count is reduced, names in removed trailing columns are merged into the last remaining column so no names are dropped.

## Pool (after parse)

- After names are parsed successfully, **all** names appear in a **pool** section (replacing any prior “pre-select” or “generate split options” flows).
- **Unused** names in the pool are interactive: normal styling, clickable.
- **Used** names (assigned to at least one column) remain visible in the pool but are **disabled**: grayed out and not clickable, indicating they are already placed.

## Columns (groups)

- The layout shows **N** columns matching the selected number of groups (labels such as “Group 1” … “Group N”).
- **Click name in pool (unused)**: Adds that name to **column 1** (first column). The name is removed from the unused pool state and appears in that column; the pool chip for that name becomes used/disabled.
- **Click name inside a column**: Removes it from the current column and **appends** it to the **next** column. From the **last** column, the next column wraps to the **first** column.

## Random distribution

- A dedicated control (e.g. button) **randomly distributes** all names that are still **unused** (only in the pool, not in any column).
- Distribution should be **balanced** across columns (e.g. round-robin after a shuffle, or equivalent so counts differ by at most one).

## Column totals

- Each column displays the **count** of names currently in that column (visible at a glance).

## Clipboard export

- Each column has a **copy** action (e.g. button) that copies that column’s names to the system clipboard as a **clean plain-text list**: one name per line, consistent and easy to paste elsewhere. Optional short header line for the group is acceptable if it improves clarity.

## Non-goals (current version)

- Server-side persistence or multi-user collaboration.
- Undo/redo history (unless added later).

## Acceptance summary

| Requirement                         | Expected behavior                                      |
| ----------------------------------- | ------------------------------------------------------ |
| No default names                    | Empty/default-free textarea content                    |
| Pool replaces old preselect/splits  | Single pool + N columns workflow                       |
| Group count                         | Default 2, user-selectable, safe merge on decrease     |
| Pool click                          | First column; chip becomes used in pool                |
| Column click                        | Advance to next column, wrap from last to first        |
| Random remaining                    | Shuffle + balanced assign into columns                 |
| Column totals                       | Shown per column                                       |
| Copy per column                     | Formatted multiline text on clipboard                  |
