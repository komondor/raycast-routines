#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title sampling
// @raycast.mode fullOutput
// @raycast.argument1 { "type": "text", "placeholder": "youtube url" }

// Optional parameters:
// @raycast.icon 🤖
// @raycast.packageName Web Searches

import { $ as $zx, cd } from "zx";

const youtube_url = process.argv[2];

cd(`${process.env.HOME}/Downloads`);

await $zx`yt-dlp --extract-audio --audio-format wav --cookies-from-browser chrome ${youtube_url}`;
