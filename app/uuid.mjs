#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title uuid
// @raycast.mode fullOutput

// Optional parameters:
// @raycast.icon 🤖

import { v4 as uuidv4 } from "uuid";
import { $ } from "zx";

// copy some text

const uuid = uuidv4();

console.log(uuid);

// copy to clipboard

$.verbose = false;

await $`echo ${uuid} | pbcopy`;
