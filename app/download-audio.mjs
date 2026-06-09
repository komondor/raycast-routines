#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Sample This Track
// @raycast.mode fullOutput

// Optional parameters:
// @raycast.icon 🎵
// @raycast.argument1 { "type": "text", "placeholder": "YouTube URL" }

// Documentation:
// @raycast.description Download audio from YouTube as WAV using yt-dlp
// @raycast.author Your Name
// @raycast.authorURL https://raycast.com

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const url = process.argv[2];

if (!url) {
  console.error('Please provide a YouTube URL');
  process.exit(1);
}

const targetDir = '/Volumes/Samples/resources/sampling';
const command = `cd ${targetDir} && yt-dlp --cookies-from-browser chrome -x --audio-format wav "${url}"`;

try {
  console.log('Downloading audio...');
  const { stdout, stderr } = await execAsync(command);

  if (stdout) console.log(stdout);
  if (stderr) console.error(stderr);

  console.log('✅ Download complete!');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
