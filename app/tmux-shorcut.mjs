#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Tmux Shortcuts
// @raycast.mode fullOutput

// Optional parameters:
// @raycast.icon ⌨️
// @raycast.packageName Developer Utils
// @raycast.description Display tmux keyboard shortcuts reference

// Documentation:
// @raycast.author Your Name
// @raycast.authorURL https://github.com/yourusername

console.log("🔷 TMUX KEYBOARD SHORTCUTS REFERENCE\n");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

console.log("📋 SESSION MANAGEMENT");
console.log("  prefix + d              Detach from session");
console.log("  prefix + $              Rename session");
console.log("  prefix + s              List sessions");
console.log("  prefix + (              Switch to previous session");
console.log("  prefix + )              Switch to next session\n");

console.log("🪟  WINDOW MANAGEMENT");
console.log("  prefix + c              Create new window");
console.log("  prefix + ,              Rename current window");
console.log("  prefix + w              List windows");
console.log("  Shift + →               Next window");
console.log("  Shift + ←               Previous window");
console.log("  prefix + &              Kill current window");
console.log("  prefix + [0-9]          Switch to window by number");
console.log("  prefix + l              Toggle last window\n");

console.log("🔲 PANE MANAGEMENT");
console.log("  prefix + %              Split pane vertically");
console.log('  prefix + "              Split pane horizontally');
console.log("  prefix + o              Switch to next pane");
console.log("  prefix + ;              Toggle between panes");
console.log("  prefix + x              Kill current pane");
console.log("  prefix + z              Toggle pane zoom");
console.log("  prefix + !              Convert pane to window");
console.log("  prefix + {              Move pane left");
console.log("  prefix + }              Move pane right");
console.log("  prefix + space          Toggle pane layouts");
console.log("  prefix + q              Show pane numbers\n");

console.log("⬆️  PANE NAVIGATION");
console.log("  prefix + ↑              Move to pane above");
console.log("  prefix + ↓              Move to pane below");
console.log("  prefix + ←              Move to pane left");
console.log("  prefix + →              Move to pane right\n");

console.log("📏 PANE RESIZING");
console.log("  prefix + Ctrl+↑         Resize pane up");
console.log("  prefix + Ctrl+↓         Resize pane down");
console.log("  prefix + Ctrl+←         Resize pane left");
console.log("  prefix + Ctrl+→         Resize pane right\n");

console.log("📜 COPY MODE");
console.log("  prefix + [              Enter copy mode");
console.log("  prefix + ]              Paste buffer");
console.log("  prefix + =              List all buffers");
console.log("  In copy mode:");
console.log("    space                 Start selection");
console.log("    Enter                 Copy selection");
console.log("    q                     Exit copy mode\n");

console.log("⚙️  MISC");
console.log("  prefix + ?              List all keybindings");
console.log("  prefix + :              Enter command mode");
console.log("  prefix + t              Show clock");
console.log("  prefix + r              Reload config");

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("\n💡 Tip: Use 'prefix + ?' to see all available shortcuts");
