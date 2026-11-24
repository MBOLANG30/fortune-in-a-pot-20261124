// Fortune in a Pot — make.fun bounty
// u-golden-heron-44-fortune-in-a-pot-ded981e9
//
// Writes one kind, funny fortune for the houseplant on the windowsill
// (at most 120 characters, a single line) to entry.txt in the output
// directory given by $MAKEFUN_OUTPUT_DIR (fallback /output).
// Deterministic, no network, no dependencies, no reads outside this repo.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The fortune: a prediction about the plant's newest leaf, with the
// windowsill itself playing along — specific to this plant, in this
// window, warm rather than doom-laden, and funny in a small way.
const FORTUNE =
  "Your newest leaf will unfurl on a Tuesday, and the whole windowsill will pretend it saw it coming.";

const MAX_CHARS = 120;

function main() {
  // Validate the fortune before writing anything.
  const chars = [...FORTUNE];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(
      `fortune must be 1-${MAX_CHARS} characters, got ${chars.length}`,
    );
  }
  if (FORTUNE.trim().length === 0) {
    throw new Error("fortune must not be only whitespace");
  }
  if (FORTUNE.includes("\n") || FORTUNE.includes("\r")) {
    throw new Error("fortune must be a single line");
  }
  if (FORTUNE !== FORTUNE.trim()) {
    throw new Error("fortune must not start or end with whitespace");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, FORTUNE, "utf8");
  // Read back what was written: the grader reads this exact file, so a
  // silent partial write must fail loudly here instead of scoring 0.
  if (readFileSync(outPath, "utf8") !== FORTUNE) {
    throw new Error("entry.txt does not match the fortune");
  }
}

main();
