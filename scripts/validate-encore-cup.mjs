#!/usr/bin/env node
/**
 * Validate public/encore-cup/index.html STORE_WEEK_STATS against weekly Excel exports.
 *
 * Usage:
 *   node scripts/validate-encore-cup.mjs [week1.xlsx] [week2.xlsx] [week3.xlsx]
 *
 * Defaults to ~/Downloads/week 1.xlsx, week 2.xlsx, week 3.xlsx
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const INDEX_HTML = path.join(ROOT, "public/encore-cup/index.html");

const STORES = [
  "1224", "1305", "1319", "1321", "1459", "4807",
  "594", "6004", "6014", "6108", "6806", "6810",
];

const STORE_GOALS = {
  "594": 1.8, "1224": 1.7, "1305": 1.8, "1319": 1.8, "1321": 1.8,
  "1459": 1.7, "4807": 1.7, "6004": 1.8, "6014": 1.8, "6108": 1.8,
  "6806": 1.8, "6810": 1.8,
};

const WEEK_FILES = [
  { label: "WK 1", defaultPath: path.join(process.env.HOME, "Downloads/week 1.xlsx") },
  { label: "WK 2", defaultPath: path.join(process.env.HOME, "Downloads/week 2.xlsx") },
  { label: "WK 3", defaultPath: path.join(process.env.HOME, "Downloads/week 3.xlsx") },
];

function readXlsxRows(filePath) {
  const py = `
import zipfile, xml.etree.ElementTree as ET, json, sys
path = sys.argv[1]
z = zipfile.ZipFile(path)
ss = []
if 'xl/sharedStrings.xml' in z.namelist():
    root = ET.fromstring(z.read('xl/sharedStrings.xml'))
    for si in root.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
        texts = [t.text or '' for t in si.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t')]
        ss.append(''.join(texts))
sheet = ET.fromstring(z.read('xl/worksheets/sheet1.xml'))
rows = []
for row in sheet.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}row'):
    cells = []
    for c in row:
        t = c.get('t')
        v = c.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v')
        if v is None:
            cells.append('')
        else:
            val = v.text
            if t == 's':
                val = ss[int(val)]
            cells.append(val)
    rows.append(cells)
print(json.dumps(rows))
`;
  const out = execFileSync("python3", ["-c", py, filePath], { encoding: "utf8" });
  return JSON.parse(out);
}

function aggregateWeek(rows) {
  const byStore = new Map();
  for (const row of rows) {
    const storeId = row[0];
    if (!STORES.includes(storeId)) continue;
    if (!byStore.has(storeId)) byStore.set(storeId, []);
    byStore.get(storeId).push(row);
  }

  const stats = {};
  for (const storeId of STORES) {
    const cashierRows = byStore.get(storeId) ?? [];
    const txns = cashierRows.reduce((s, r) => s + Number(r[3] || 0), 0);
    const cards = cashierRows.reduce((s, r) => s + Number(r[5] || 0), 0);
    const goal = STORE_GOALS[storeId];
    stats[storeId] = {
      txns: Math.round(txns),
      cards: Math.round(cards),
      cashiers: cashierRows.length,
      cashiersOpened: cashierRows.filter((r) => Number(r[5] || 0) > 0).length,
      cashiersAtGoal: cashierRows.filter((r) => {
        const t = Number(r[3] || 0);
        const c = Number(r[5] || 0);
        return t > 0 && (c / t) * 100 >= goal;
      }).length,
    };
  }
  return stats;
}

function loadIndexStats() {
  const html = fs.readFileSync(INDEX_HTML, "utf8");
  const blockMatch = html.match(/const STORE_WEEK_STATS = \{([\s\S]*?)\n\};/);
  if (!blockMatch) throw new Error("STORE_WEEK_STATS block not found in index.html");

  const stats = {};
  for (const weekLabel of ["WK 1", "WK 2", "WK 3"]) {
    stats[weekLabel] = {};
    const weekRe = new RegExp(`"${weekLabel}":\\s*\\{([\\s\\S]*?)\\n  \\}`, "m");
    const wm = blockMatch[0].match(weekRe);
    if (!wm) continue;
    for (const storeId of STORES) {
      const sm = wm[1].match(
        new RegExp(`"${storeId}":\\s*\\{\\s*txns:\\s*(\\d+),\\s*cards:\\s*(\\d+),\\s*cashiers:\\s*(\\d+),\\s*cashiersOpened:\\s*(\\d+),\\s*cashiersAtGoal:\\s*(\\d+)\\s*\\}`)
      );
      if (sm) {
        stats[weekLabel][storeId] = {
          txns: Number(sm[1]),
          cards: Number(sm[2]),
          cashiers: Number(sm[3]),
          cashiersOpened: Number(sm[4]),
          cashiersAtGoal: Number(sm[5]),
        };
      }
    }
  }
  return stats;
}

function main() {
  const cliPaths = process.argv.slice(2);
  const indexStats = loadIndexStats();
  let failures = 0;

  WEEK_FILES.forEach((wk, i) => {
    const filePath = cliPaths[i] || wk.defaultPath;
    if (!fs.existsSync(filePath)) {
      console.error(`SKIP ${wk.label}: file not found — ${filePath}`);
      return;
    }

    const excelStats = aggregateWeek(readXlsxRows(filePath));
    const htmlStats = indexStats[wk.label] || {};

    let weekTxns = 0;
    let weekCards = 0;
    for (const storeId of STORES) {
      weekTxns += excelStats[storeId].txns;
      weekCards += excelStats[storeId].cards;
      const exp = excelStats[storeId];
      const act = htmlStats[storeId];
      if (!act) {
        console.error(`FAIL ${wk.label} ${storeId}: missing in index.html`);
        failures++;
        continue;
      }
      for (const field of ["txns", "cards", "cashiers", "cashiersOpened", "cashiersAtGoal"]) {
        if (exp[field] !== act[field]) {
          console.error(
            `FAIL ${wk.label} ${storeId}.${field}: excel=${exp[field]} html=${act[field]}`
          );
          failures++;
        }
      }
    }

    const rate = weekTxns > 0 ? ((weekCards / weekTxns) * 100).toFixed(2) : "0.00";
    console.log(`OK  ${wk.label}: ${weekTxns} txns · ${weekCards} cards · ${rate}%`);
  });

  if (failures > 0) {
    console.error(`\n${failures} mismatch(es) found.`);
    process.exit(1);
  }
  console.log("\nAll weeks match Excel exports.");
}

main();
