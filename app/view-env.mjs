#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Show Environment
// @raycast.mode fullOutput

// Optional parameters:
// @raycast.icon ⚙️
// @raycast.packageName Developer Utils
// @raycast.description Display all environment variables from .zprofile

// Documentation:
// @raycast.author Your Name
// @raycast.authorURL https://github.com/yourusername

import { $ } from "zx";

$.verbose = true;

await $`cat ~/.zprofile`;
