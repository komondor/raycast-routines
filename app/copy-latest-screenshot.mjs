#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Copy Latest Screenshot
// @raycast.mode compact

// Optional parameters:
// @raycast.icon 📸
// @raycast.packageName Developer Utils
// @raycast.description Copy the most recent screenshot to the clipboard as an image

// Documentation:
// @raycast.author Francois Seguin
// @raycast.authorURL https://github.com/komondor

import { $ } from "zx";
import { readdir, stat } from "fs/promises";
import { join } from "path";

$.verbose = false;

const DIR = "/Volumes/Projects/.data/screenshots";
const IMAGE_RE = /\.(png|jpg|jpeg|gif|tiff|heic)$/i;

const entries = (await readdir(DIR)).filter((f) => IMAGE_RE.test(f));

if (entries.length === 0) {
  console.error("❌ No screenshots found in " + DIR);
  process.exit(1);
}

// Find the most recently modified image
let latest = null;
for (const name of entries) {
  const path = join(DIR, name);
  const mtime = (await stat(path)).mtimeMs;
  if (!latest || mtime > latest.mtime) latest = { name, path, mtime };
}

// Pick the right clipboard class for the file type
const ext = latest.name.split(".").pop().toLowerCase();
const clipClass =
  ext === "png"
    ? "«class PNGf»"
    : ext === "gif"
    ? "GIF picture"
    : ext === "tiff"
    ? "TIFF picture"
    : "JPEG picture";

// Read the file into the clipboard as an actual image (pbcopy is text-only)
await $`osascript -e ${`set the clipboard to (read (POSIX file "${latest.path}") as ${clipClass})`}`;

console.log(`📋 Copied: ${latest.name}`);
