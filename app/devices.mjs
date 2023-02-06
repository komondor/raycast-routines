#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title devices
// @raycast.mode fullOutput

// Optional parameters:
// @raycast.icon 🤖

import { $, echo } from "zx";

// command to open chrome://devices/ in chrome

echo("Searching for devices...");

$.verbose = false;
const devices = await $`arp -a`;

// split with new line

const devicesArray = devices.stdout.split("\n");

let listDevices = [];

for (let device of devicesArray) {
  // split with tab

  let deviceArray = device.split(" ");

  // hostname is equal to  ?, ignore

  let deviceName = deviceArray[0];
  let deviceIp = deviceArray[1];

  if (deviceName === "") {
    continue;
  }

  // check if device is already in list

  let isObjectInArray = listDevices.some((obj) => obj.hostname === deviceName);

  if (!isObjectInArray) {
    listDevices.push({ hostname: deviceName, ip: deviceIp });
  }
}

console.table(listDevices);
