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

run.command("sampling").description("export youtube to wav");
run.command("uuid").description("generate a uuid");
run.command("projects").description("open projects directory in cursor");
run
  .command("env")
  .description("list of all environment variables in .zprofile");

try {
  program.parse(["--help"], { from: "user" });
  process.exit();
} catch (err) {
  const { message } = err;
  if (!message.includes("outputHelp")) {
    console.error("something went wrong");
  }
}
