#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title find
// @raycast.mode fullOutput
// @raycast.argument1 { "type": "text", "placeholder": "tag" }

// Optional parameters:
// @raycast.icon 🤖
// @raycast.packageName find

import dotenv from "dotenv";
import { Client } from "@notionhq/client";
dotenv.config({ path: "../.env" });
import { $ } from "zx";

const tag = process.argv[2];

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Database ID

const filter = {
  property: "Tags", // Replace with your tag property name
  multi_select: {
    contains: tag, // The tag you're looking for
  },
};

const response = await notion.databases.query({
  database_id: process.env.NOTION_DB_ID,
  filter,
});

if (response.results.length === 0) {
  console.log("No results found");
  process.exit();
} else if (response.results.length > 1) {
  console.log("More than one result found");
  console.log("This command only supports one result");
  process.exit();
} else {
  const url = response.results[0].properties.Url.url;

  // open url in chrome

  await $`open ${url}`;

  process.exit();
}
