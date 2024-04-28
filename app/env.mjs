#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title env
// @raycast.mode fullOutput

// Optional parameters:
// @raycast.icon 🤖

import { $ } from "zx";

$.verbose = true;

await $`cat ~/.zprofile`;
