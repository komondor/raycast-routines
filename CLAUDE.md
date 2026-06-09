# CLAUDE.md

> Project memory for `routines` — auto-loaded every session.

## What this folder is

This is a collection of **Raycast Script Commands** — small, single-file scripts that
Raycast indexes and runs as searchable commands. Each script is a self-contained
"productivity shotgun": one file, one job, fired from the Raycast root search.

The whole point is **speed**: a new utility is one `.mjs` file with a metadata header,
no build step, no UI code. We keep adding to this collection over time.

- GitHub: `https://github.com/komondor/raycast-routines`
- Author: Francois Seguin (`komondor`)

## Layout

```
routines/
├── app/                 # ← all script commands live here (point Raycast at this dir)
│   ├── tmux-shorcut.mjs       # fullOutput — tmux keyboard-shortcut cheat sheet
│   ├── download-audio.mjs     # fullOutput + text arg — YouTube URL → WAV via yt-dlp
│   ├── view-env.mjs           # fullOutput — cat ~/.env
│   └── generate-uuid.mjs      # compact — UUID v4 → clipboard
├── SKILLS.md            # ← HOW to write a Raycast script (full reference). Read this before adding one.
├── Readme.md            # human-facing index + env-var docs
├── package.json         # shared deps (zx, uuid, @raycast/api, puppeteer, etc.)
└── meta.json            # internal app registration
```

## Conventions for scripts in `app/`

- **Runtime:** Node ESM. Shebang `#!/usr/bin/env node`, extension `.mjs`.
- **Header:** every script starts with a `// @raycast.*` metadata block (see `SKILLS.md`).
  Required keys: `schemaVersion 1`, `title`, `mode`.
- **One file = one command.** No shared local modules; pull from `node_modules` (already installed) instead.
- **Helpers we lean on:** [`zx`](https://github.com/google/zx) (`import { $ } from "zx"`) for
  shell calls, `uuid`, `dotenv`. Heavier deps (`puppeteer`, `pdfkit`, `globby`, `inquirer`) are available too.
- **Clipboard:** pipe to `pbcopy`. **Notify:** print to stdout (mode decides how it shows).
- **Secrets / dirs:** read from env vars (documented in `Readme.md`) or `~/.env`. Never hardcode tokens.
- **Author block:** existing scripts still say "Your Name" — prefer
  `@raycast.author Francois Seguin` / `@raycast.authorURL https://github.com/komondor`.

## Adding a new script (the routine)

1. Read `SKILLS.md` to pick the right `mode` and argument types.
2. Create `app/<kebab-name>.mjs`, write the `@raycast.*` header, then the logic.
3. `chmod +x app/<kebab-name>.mjs` (scripts must be executable).
4. If it needs an env var or external CLI (e.g. `yt-dlp`, `fzf`), add a row to `Readme.md`.
5. Raycast auto-detects new files / metadata changes — no restart needed.

## House rules

- Keep each script lean and dependency-light; this repo values quick-to-write over clever.
- Don't rewrite existing scripts unless asked — just add new ones.
- When unsure about a metadata directive, `SKILLS.md` is the source of truth.
