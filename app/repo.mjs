#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title repo
// @raycast.mode fullOutput
// @raycast.argument1 { "type": "text", "placeholder": "github url" }
// @raycast.argument2 { "type": "text", "placeholder": "pdf_or_text" }

// Optional parameters:
// @raycast.icon 🤖
// @raycast.packageName Web Searches

import { $, $ as $zx, cd } from "zx";
import path from "path";
import PDFDocument from "pdfkit";
import { readFile } from "fs/promises";
import { createWriteStream } from "fs";
import cliSpinners from "cli-spinners";
import readline from "readline";
import logUpdate from "log-update";
import { log } from "console";

// You might need to use a package like `readline` to handle cursor movement and clearing lines in the terminal.

try {
  $zx.verbose = false;

  await delayMessanger(1200, "txo to pdf conversion initiated");

  const scriptPath = path.join(
    new URL(".", import.meta.url).pathname,
    "../tools/github-to-pdf/gpt_repository_loader.py"
  );
  const location = process.argv[2];
  const pdf_or_text = process.argv[3];

  let folderPath = "";
  let folder_name = "";

  // verify if location starts with https://github.com

  if (location.includes("https://github.com") === true) {
    cd(`/tmp`);

    folder_name = location.split("/").pop().split(".");

    await $zx`rm -rf ${folder_name}`;

    const gloneOuput = await $zx`git clone ${location}`;

    await delayMessanger(1200, "repo cloned");

    // remove package-lock.json if exists

    await $zx`rm -rf ${folder_name}/package-lock.json`;
    await $zx`rm -rf ${folder_name}/yarn.lock`;

    folderPath = `/tmp/${folder_name}`;
    // remove node_modules if exists

    await $zx`python3 ${scriptPath} ${folderPath} -o /tmp/${folder_name}.raw.txt`;

    await delayMessanger(1200, "data extracted");

    await $zx`grep \\\\0 /tmp/${folder_name}.raw.txt > /tmp/${folder_name}.txt`;

    await delayMessanger(1200, "data cleaned");
  } else {
    folderPath = `${process.env.HOME}/Downloads/${location}`;
    folder_name = location;

    await delayMessanger(1200, "data extracted");

    await $zx`python3 ${scriptPath} ${folderPath} -o /tmp/${folder_name}.txt`;
  }

  if (pdf_or_text === "text") {
    // mv the file to downloads

    await $zx`mv /tmp/${folder_name}.txt ${process.env.HOME}/Downloads/`;

    await delayMessanger(
      1200,
      `txt saved to ${process.env.HOME}/Downloads/${folder_name}.txt`
    );
  }

  if (pdf_or_text === "pdf") {
    const doc = new PDFDocument();

    // Pipe its output to a file

    await delayMessanger(1200, "pdf convesion initiated");

    doc.pipe(
      createWriteStream(`${process.env.HOME}/Downloads/${folder_name}.pdf`)
    );

    // Read text from the text file
    const data = await readFile(`/tmp/${folder_name}.txt`, "utf8");

    // Add the text to the PDF

    doc.text(data);

    // Finalize the PDF file
    doc.end();

    await delayMessanger(1200, "pdf convesion finished");

    await $zx`rm -rf /tmp/${folder_name}.txt`;
    await $zx`rm -rf /tmp/${folder_name}.raw.txt`;

    await delayMessanger(1200, `pdf saved to ${process.env.HOME}/Downloads/`);
  }
} catch (err) {
  console.log(err);
}

// sleep console.log

async function delayMessanger(ms, message) {
  console.log(message);
  return new Promise((resolve) => setTimeout(resolve, ms));
}
