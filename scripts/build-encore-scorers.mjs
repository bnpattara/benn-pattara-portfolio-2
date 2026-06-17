#!/usr/bin/env node
/**
 * Build MTD cashier scorer leaderboard from weekly Excel exports.
 *
 * Export columns: A=Store, B=Employee Name, D=Total Transactions, F=Card Applications
 * Aggregates everyone with ≥1 card across WK1–WK3, keyed by store + name.
 *
 * Usage:
 *   node scripts/build-encore-scorers.mjs [wk1] [wk2] [wk3]
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const INDEX_HTML = path.join(ROOT, "public/encore-cup/index.html");
const SCORERS_JSON = path.join(ROOT, "public/encore-cup/cashier-scorers.json");

const WEEK_FILES = [
  path.join(process.env.HOME, "Downloads/week 1.xlsx"),
  path.join(process.env.HOME, "Downloads/week 2.xlsx"),
  path.join(process.env.HOME, "Downloads/data-11.xlsx"),
];

const STORES = new Set([
  "1224", "1305", "1319", "1321", "1459", "4807",
  "594", "6004", "6014", "6108", "6806", "6810",
]);

/** openpyxl reads inline strings; zip/xml col[2] is NOT associate id. */
function readXlsxRows(filePath) {
  const py = `
import json, sys
import openpyxl

path = sys.argv[1]
wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
rows = []
for row in wb.active.iter_rows(min_row=2, values_only=True):
    if not row or row[0] is None:
        continue
    try:
        store = str(int(row[0]))
    except (TypeError, ValueError):
        continue
    name = str(row[1] or "").strip()
    cards = round(float(row[5] or 0)) if row[5] is not None else 0
    rows.append([store, name, cards])
print(json.dumps(rows))
`;
  const out = execFileSync("python3", ["-c", py, filePath], { encoding: "utf8" });
  return JSON.parse(out);
}

function aggregateScorers(paths) {
  const byKey = new Map();
  for (const filePath of paths) {
    if (!fs.existsSync(filePath)) {
      console.error(`SKIP: ${filePath} not found`);
      continue;
    }
    for (const [store, name, cards] of readXlsxRows(filePath)) {
      if (!STORES.has(store) || !name || cards <= 0) continue;
      const key = `${store}\0${name}`;
      byKey.set(key, (byKey.get(key) || 0) + cards);
    }
  }
  return [...byKey.entries()]
    .map(([key, goals]) => {
      const [store, name] = key.split("\0");
      return { name, store, goals };
    })
    .sort((a, b) =>
      b.goals - a.goals ||
      a.store.localeCompare(b.store) ||
      a.name.localeCompare(b.name)
    );
}

function patchIndexHtml(scorers) {
  const html = fs.readFileSync(INDEX_HTML, "utf8");
  const block = `const CASHIER_SCORERS = ${JSON.stringify(scorers, null, 2)};`;
  const re = /\/\/ BEGIN CASHIER_SCORERS[\s\S]*?\/\/ END CASHIER_SCORERS/;
  if (!re.test(html)) {
    throw new Error("CASHIER_SCORERS markers not found in index.html");
  }
  const next = html.replace(
    re,
    `// BEGIN CASHIER_SCORERS — generated · node scripts/build-encore-scorers.mjs\n${block}\n// END CASHIER_SCORERS`
  );
  fs.writeFileSync(INDEX_HTML, next);
}

function main() {
  const paths = process.argv.slice(2);
  const weekPaths = [0, 1, 2].map((i) => paths[i] || WEEK_FILES[i]);
  const scorers = aggregateScorers(weekPaths);
  const totalCards = scorers.reduce((s, c) => s + c.goals, 0);

  fs.writeFileSync(SCORERS_JSON, JSON.stringify(scorers, null, 2) + "\n");
  patchIndexHtml(scorers);
  console.log(`OK  ${scorers.length} cashiers · ${totalCards} cards MTD`);
  console.log(`    ${SCORERS_JSON}`);
  console.log(`    patched ${INDEX_HTML}`);
}

main();
