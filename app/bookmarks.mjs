#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title bookmarks
// @raycast.mode compact

// Optional parameters:
// @raycast.icon 🤖

import { $ } from "zx";

// command to open chrome://bookmarks/ in chrome

await $`open -a "Google Chrome" "chrome://bookmarks/"`;
