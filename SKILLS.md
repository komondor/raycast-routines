# SKILLS.md — Writing Raycast Script Commands

The complete reference for creating a script command in this repo "on the go". Read this
before adding a file to `app/`. Source of truth: the official
[raycast/script-commands](https://github.com/raycast/script-commands) repo and
[Raycast Manual](https://manual.raycast.com/script-commands).

---

## 1. What a Script Command is

Raycast scans a configured directory, reads the metadata header at the top of each script
file, and turns each one into a searchable command in the root search. There is **no build
step and no manifest** — the file *is* the command. Renaming, adding an argument, or changing
the mode is picked up automatically; no restart needed. The script must be **executable**
(`chmod +x`).

In this repo, all commands live in `app/`, are Node ESM (`.mjs`), and start with
`#!/usr/bin/env node`.

---

## 2. The metadata header

Metadata is a block of `@raycast.*` directives inside comments at the top of the file. Use the
comment syntax of the script's language — for our Node scripts that's `//`:

```js
#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Generate UUID
// @raycast.mode compact

// Optional parameters:
// @raycast.icon 🔑
// @raycast.packageName Developer Utils
// @raycast.description Generate a UUID v4 and copy it to clipboard

// Documentation:
// @raycast.author Francois Seguin
// @raycast.authorURL https://github.com/komondor
```

### Required directives

| Directive | Meaning |
|---|---|
| `@raycast.schemaVersion` | Always `1`. |
| `@raycast.title` | Name shown in root search. |
| `@raycast.mode` | How output is presented — see §3. |

### Optional directives

| Directive | Meaning |
|---|---|
| `@raycast.packageName` | Subtitle / grouping label. Inferred from the directory if omitted. |
| `@raycast.icon` | Emoji, a file path, or an `https://` PNG/JPEG URL (64px recommended). |
| `@raycast.iconDark` | Dark-theme icon variant. Defaults to `icon`. |
| `@raycast.currentDirectoryPath` | Working directory for the script. Defaults to the script's own folder. |
| `@raycast.needsConfirmation` | `true` → Raycast shows a confirm dialog before running. Use for destructive actions. |
| `@raycast.refreshTime` | **Required for `inline` mode.** Auto-refresh interval — see §4. |
| `@raycast.argument1/2/3` | Up to 3 inputs shown in the search bar — see §5. |
| `@raycast.author` / `@raycast.authorURL` | Documentation only. |
| `@raycast.description` | Short description, shown in docs/details. |

Raycast appends `/usr/local/bin` to `$PATH` automatically, so Homebrew-installed CLIs (e.g.
`yt-dlp`, `fzf`) are reachable.

---

## 3. Modes (`@raycast.mode`)

Pick the mode by **how much output the user should see**:

| Mode | Behavior | Use when |
|---|---|---|
| `silent` | Runs, shows no window. Raycast stays/closes. Optionally prints a one-line HUD toast. | Fire-and-forget actions (toggle a setting, copy something, trigger a webhook). |
| `compact` | Runs, shows a small inline result / HUD with the final line of output. | Quick result you just want to glance at (a generated UUID, a count). |
| `fullOutput` | Opens a full output view streaming all stdout. Supports **ANSI color codes**. | Anything with multi-line output (cheat sheets, command logs, tables). |
| `inline` | Shows the **first line of output** directly on the command item in root search, auto-refreshing on `refreshTime`. | Live status you want visible without running it (battery %, unread count, current track). |

Notes:
- `inline` **requires** `@raycast.refreshTime`; without it, Raycast falls back to `compact`.
- ANSI escape codes color output in `fullOutput` and `inline`.
- For `silent`/`compact`, a single short stdout line works best as the HUD text.

---

## 4. `refreshTime` (inline mode only)

Format: a number + unit. Minimum interval is **10 seconds**.

| Unit | Example |
|---|---|
| seconds | `10s` |
| minutes | `1m` |
| hours | `12h` |
| days | `1d` |

```js
// @raycast.mode inline
// @raycast.refreshTime 30s
```

---

## 5. Arguments (`@raycast.argument1..3`)

Up to **3** arguments, each a JSON object. They appear as inputs in the search bar and are
passed to the script as **positional CLI args in order** (`process.argv[2]`, `[3]`, `[4]` in
Node; `$1 $2 $3` in bash).

```js
// @raycast.argument1 { "type": "text", "placeholder": "YouTube URL" }
// @raycast.argument2 { "type": "dropdown", "placeholder": "Format", "data": [{ "title": "WAV", "value": "wav" }, { "title": "MP3", "value": "mp3" }] }
// @raycast.argument3 { "type": "password", "placeholder": "API token", "optional": true }
```

### Argument fields

| Field | Values | Notes |
|---|---|---|
| `type` | `text` \| `password` \| `dropdown` | Required. `password` masks input with asterisks. |
| `placeholder` | string | Hint text in the input. |
| `optional` | boolean | Default `false` (required). Optional args may arrive empty. |
| `percentEncoded` | boolean | URL-encodes the value before passing — handy when building URLs. |
| `data` | `[{ "title", "value" }]` | **Required for `dropdown`.** `title` is shown; `value` is passed to the script. |
| `secure` | — | Deprecated; use `type: "password"` instead. |

Reading them in Node:

```js
const url = process.argv[2];
if (!url) { console.error("Please provide a URL"); process.exit(1); }
```

---

## 6. Templates

If a filename contains `.template.` (e.g. `search.template.sh`), Raycast treats it as a
template requiring values to be filled in and **won't list it as a runnable command** until
the `.template.` marker is removed. Use this for shareable starting points, not for live tools.

---

## 7. Languages & shebangs

Raycast runs whatever the shebang points to. This repo standardizes on **Node ESM**:

```js
#!/usr/bin/env node
```

Other common shebangs Raycast supports (for reference): `#!/bin/bash`, `#!/bin/zsh`,
`#!/usr/bin/env python3`, `#!/usr/bin/env ruby`, `#!/usr/bin/env swift`,
`#!/usr/bin/env osascript` (AppleScript). Match the metadata comment char to the language
(`#` for shell/python/ruby, `//` for Node/Swift).

---

## 8. Patterns used in this repo

**Shell calls via `zx`** — the preferred way to shell out:
```js
import { $ } from "zx";
$.verbose = false;            // hide the command echo
await $`echo ${value} | pbcopy`;   // copy to clipboard
```

**Plain `child_process`** when you want raw control:
```js
import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);
const { stdout, stderr } = await execAsync(command);
```

**Output conventions by mode:**
- `compact` → one summary line: `console.log("UUID copied: " + uuid)`.
- `fullOutput` → stream freely; use emoji/section headers for scannability.
- `silent` → do the side effect, print nothing (or one HUD line).

**Env & secrets:** read from `process.env` or `~/.env`; document any new var in `Readme.md`.
Never hardcode tokens. Output directories are configured via env vars (see `Readme.md`).

---

## 9. Checklist for a new command

1. `app/<kebab-name>.mjs`, shebang `#!/usr/bin/env node`.
2. Header: `schemaVersion 1` + `title` + `mode` (+ `icon`, `description`, `author`).
3. Add `argument1..3` if it needs input; `refreshTime` if `inline`; `needsConfirmation` if destructive.
4. Implement logic; pull deps from the existing `node_modules` (don't add new local files).
5. `chmod +x app/<kebab-name>.mjs`.
6. Document any required env var or external CLI in `Readme.md`.
7. Raycast auto-detects it — no restart.

---

## Minimal templates

**`compact` — quick result to clipboard:**
```js
#!/usr/bin/env node
// @raycast.schemaVersion 1
// @raycast.title My Tool
// @raycast.mode compact
// @raycast.icon 🔧
// @raycast.description What it does
// @raycast.author Francois Seguin
// @raycast.authorURL https://github.com/komondor

import { $ } from "zx";
$.verbose = false;
const result = "…";
await $`echo ${result} | pbcopy`;
console.log(`Copied: ${result}`);
```

**`fullOutput` + text argument:**
```js
#!/usr/bin/env node
// @raycast.schemaVersion 1
// @raycast.title Do Thing
// @raycast.mode fullOutput
// @raycast.icon ⚙️
// @raycast.argument1 { "type": "text", "placeholder": "input" }
// @raycast.description Does a thing with input
// @raycast.author Francois Seguin
// @raycast.authorURL https://github.com/komondor

const input = process.argv[2];
if (!input) { console.error("❌ Provide an input"); process.exit(1); }
console.log(`Working on ${input}…`);
// …
console.log("✅ Done");
```

---

### Sources
- [Raycast Manual — Script Commands](https://manual.raycast.com/script-commands)
- [raycast/script-commands (GitHub)](https://github.com/raycast/script-commands)
- [OUTPUTMODES.md](https://github.com/raycast/script-commands/blob/master/documentation/OUTPUTMODES.md)
- [ARGUMENTS.md](https://github.com/raycast/script-commands/blob/master/documentation/ARGUMENTS.md)
