#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title projects
// @raycast.mode compact

// Optional parameters:
// @raycast.icon 🤖

import { $ } from "zx";

$.shell = "zsh";

$.verbose = true;

await $`cursor ~/projects`;
