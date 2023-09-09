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

run.command("devices").description("list of all devices on network");
run.command("sampling").description("export youtube to wav");
run.command("repo").description("convert a github repo to a text");
run.command("find").description("find a tag in a notion database");

try {
  program.parse(["--help"], { from: "user" });
  process.exit();
} catch (err) {
  const { message } = err;
  if (!message.includes("outputHelp")) {
    console.error("something went wrong");
  }
}
