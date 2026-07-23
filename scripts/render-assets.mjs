#!/usr/bin/env node
/**
 * Renders every SVG in assets/src/ to a 2x PNG in assets/.
 *
 * README images must be PNG served from absolute raw.githubusercontent.com URLs:
 * npm's README sanitizer strips SVG <img> sources, so SVG-only assets would render
 * on GitHub but silently vanish on npmjs.com.
 *
 * Chrome headless is the renderer because no rsvg/resvg/inkscape/magick is installed.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "assets", "src");
const outDir = join(root, "assets");
const SCALE = 2;

const CHROME =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const stage = mkdtempSync(join(tmpdir(), "nsu-assets-"));

for (const file of readdirSync(srcDir).filter((f) => f.endsWith(".svg"))) {
  const svg = readFileSync(join(srcDir, file), "utf8");
  const [, w, h] = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/) ?? [];
  if (!w) throw new Error(`${file}: needs a viewBox="0 0 W H"`);

  const html = join(stage, file.replace(/\.svg$/, ".html"));
  writeFileSync(
    html,
    `<!doctype html><meta charset="utf-8">
<style>html,body{margin:0;padding:0;background:transparent}svg{display:block;width:${w}px;height:${h}px}</style>
${svg}`
  );

  const out = join(outDir, file.replace(/\.svg$/, ".png"));
  execFileSync(
    CHROME,
    [
      "--headless",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-sandbox",
      `--force-device-scale-factor=${SCALE}`,
      `--window-size=${w},${h}`,
      `--screenshot=${out}`,
      html,
    ],
    { stdio: ["ignore", "ignore", "pipe"] }
  );

  console.log(`${file} -> assets/${file.replace(/\.svg$/, ".png")}  ${w * SCALE}x${h * SCALE}`);
}

// Flat vector art quantizes to a small palette with no visible banding, which cuts
// these files by roughly 60%. sharp-cli is fetched on demand rather than added as a
// devDependency, so the zero-install story stays intact.
try {
  execFileSync(
    "npx",
    ["-y", "sharp-cli", "-i", join(outDir, "*.png"), "-o", outDir, "--palette", "--colours", "96"],
    { stdio: ["ignore", "ignore", "pipe"], timeout: 300_000 }
  );
  console.log("palette-compressed assets/*.png");
} catch {
  console.warn("skipped palette compression (npx sharp-cli unavailable)");
}
