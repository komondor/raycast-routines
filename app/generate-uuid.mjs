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
// @raycast.author Your Name
// @raycast.authorURL https://github.com/yourusername

import { v4 as uuidv4 } from "uuid";
import { $ } from "zx";

const uuid = uuidv4();

// Copy to clipboard
$.verbose = false;
await $`echo ${uuid} | pbcopy`;

console.log(`UUID copied to clipboard: ${uuid}`);
