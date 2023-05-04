#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title run
// @raycast.mode fullOutput

// Optional parameters:
// @raycast.icon 🤖

import { Command } from "commander";

const program = new Command();

program.exitOverride();
const run = program.name("run");

run.command("bookmarks").description("open chrome bookamrks manager");
run.command("devices").description("list of all devices on network");
run.command("sampling").description("sampling");

try {
  program.parse(["--help"], { from: "user" });
  process.exit();
} catch (err) {
  if (!message.includes("outputHelp")) {
    console.error("something went wrong");
  }
}
