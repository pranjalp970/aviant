// Converts the testing-supplement figures (PNG exports of FAA-CT-8080-2H, kept in
// assets/figures/, not deployed) into the WebP files the app serves from public/figures/.
// Run: node scripts/build-figures.mjs   (prints each figure's size for the question bank)
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = "assets/figures/akts-8080-2h";
const OUT = "public/figures/akts-8080-2h";
// Photographic charts compress well with lossy WebP; tables, graphs and diagrams stay near-lossless so text stays crisp.
const LOSSY = new Set(["figure-20", "figure-21", "figure-22", "figure-23", "figure-24", "figure-25", "figure-26", "figure-27"]);

fs.mkdirSync(OUT, { recursive: true });
const sizes = {};
for (const file of fs.readdirSync(SRC).filter((f) => f.endsWith(".png")).sort()) {
  const name = path.basename(file, ".png");
  const img = sharp(path.join(SRC, file));
  const { width, height } = await img.metadata();
  await img.webp(LOSSY.has(name) ? { quality: 85, effort: 6 } : { nearLossless: true, quality: 60, effort: 6 }).toFile(path.join(OUT, `${name}.webp`));
  sizes[name] = { width, height };
}
console.log(JSON.stringify(sizes, null, 2));
