#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title repo
// @raycast.mode fullOutput
// @raycast.argument1 { "type": "text", "placeholder": "github url" }

// Optional parameters:
// @raycast.icon 🤖
// @raycast.packageName Web Searches

import { $ as $zx, cd } from "zx";
import path from "path";
import PDFDocument from "pdfkit";
import { readFile } from "fs/promises";
import { createWriteStream } from "fs";

try {
  $zx.verbose = false;

  await delayMessanger(1200, "txo to pdf conversion initiated");

  const scriptPath = path.join(
    new URL(".", import.meta.url).pathname,
    "../tools/gpt-repository-loader/gpt_repository_loader.py"
  );
  const github_url = process.argv[2];

  cd(`/tmp`);

  const folder_name = github_url.split("/").pop().split(".");

  await $zx`rm -rf ${folder_name}`;

  const gloneOuput = await $zx`git clone ${github_url}`;

  await delayMessanger(1200, "repo cloned");

  // remove package-lock.json

  await $zx`rm ${folder_name}/package-lock.json`;

  // extrat the folder name from the url

  const outputConverter =
    await $zx`python3 ${scriptPath} /tmp/${folder_name} -o /tmp/${folder_name}.txt`;

  if (`${outputConverter}`.includes(`${folder_name}.txt`)) {
    await delayMessanger(1200, "repo converted to txt");
  }

  // https://github.com/homanp/langchain-ui

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

  await delayMessanger(1200, `pdf saved to ${process.env.HOME}/Downloads/`);
} catch (err) {
  console.log(err);
}

// sleep console.log

async function delayMessanger(ms, message) {
  console.log(message);
  return new Promise((resolve) => setTimeout(resolve, ms));
}
