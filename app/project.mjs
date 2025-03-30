#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title project
// @raycast.mode compact

// Optional parameters:
// @raycast.icon 🤖

import { $ } from "zx";

$.verbose = true;

await $`cursor ~/projects`;
