#!/usr/bin/env node

/**
 * Pipes Notebook Importer
 *
 * Fetches catalog/CATALOG.md from GitHub, lists available pipelines and rules,
 * resolves fragment dependencies from selected pipelines, and downloads all
 * required files into the local .pipes/ structure.
 *
 * Usage:
 *   node .pipes/utils/scripts/import.js
 *   node .pipes/utils/scripts/import.js --select pipeline-health-check,pipeline-initiate-session
 *   node .pipes/utils/scripts/import.js --select pipeline-health-check --yes
 *   node .pipes/utils/scripts/import.js --all --yes
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ─── Config ───────────────────────────────────────────────────────────────────

const CATALOG_URL = 'https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/CATALOG.md';

const DEST = {
  pipelines: '.pipes/utils/pipelines',
  fragments:  '.pipes/utils/fragments',
  rules:      '.pipes/utils/rules',
};

// Script lives at .pipes/utils/scripts/ — project root is three levels up
const PROJECT_ROOT = path.resolve(__dirname, '..', '..', '..');

// ─── HTTP ─────────────────────────────────────────────────────────────────────

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}: ${url}`));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(chunks.join('')));
    }).on('error', reject);
  });
}

// ─── Catalog Parser ───────────────────────────────────────────────────────────

/**
 * Parse CATALOG.md and return three Maps: pipelines, fragments, rules.
 * Each entry: { id, name, description, domain?, url, type? }
 */
function parseCatalog(content) {
  const pipelines = new Map();
  const fragments = new Map();
  const rules     = new Map();
  let section = null;

  for (const raw of content.split('\n')) {
    const line = raw.trim();

    if (line.startsWith('## Pipelines'))  { section = 'pipelines'; continue; }
    if (line.startsWith('## Fragments'))  { section = 'fragments'; continue; }
    if (line.startsWith('## Rules'))      { section = 'rules';     continue; }
    if (!line.startsWith('|'))            continue;

    const cols = line.split('|').map((s) => s.trim()).filter(Boolean);

    // Skip header and separator rows
    if (cols[0] === 'id' || cols[0].startsWith('-')) continue;

    if (section === 'pipelines' && cols.length >= 5) {
      const [id, name, description, domain, url] = cols;
      pipelines.set(id, { id, name, description, domain, url });

    } else if (section === 'fragments' && cols.length >= 4) {
      const [id, name, description, url] = cols;
      // Derive type from the url path: …/fragments/{domain}/{type}/{file}
      const parts = url.split('/');
      const type  = parts[parts.length - 2]; // e.g. instruction, output, question, validation
      fragments.set(id, { id, name, description, url, type });

    } else if (section === 'rules' && cols.length >= 5) {
      const [id, name, description, domain, url] = cols;
      rules.set(id, { id, name, description, domain, url });
    }
  }

  return { pipelines, fragments, rules };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function filename(url)       { return url.split('/').pop(); }
function col(str, w)         { return str.padEnd(w); }
function green(str)          { return `\x1b[32m${str}\x1b[0m`; }
function dim(str)            { return `\x1b[2m${str}\x1b[0m`; }

function isInstalled(destDir, file) {
  return fs.existsSync(path.join(PROJECT_ROOT, destDir, file));
}

function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

// ─── Display ──────────────────────────────────────────────────────────────────

function displayCatalog(pipelines, rules) {
  const ID_W = 52;

  console.log('\nPipelines:');
  const pByDomain = groupBy(pipelines.values(), 'domain');
  for (const [domain, items] of Object.entries(pByDomain)) {
    console.log(`  [${domain}]`);
    for (const p of items) {
      const tag = isInstalled(DEST.pipelines, filename(p.url)) ? `  ${green('(installed)')}` : '';
      console.log(`    ${col(p.id, ID_W)} ${dim(p.description)}${tag}`);
    }
  }

  console.log('\nRules:');
  const rByDomain = groupBy(rules.values(), 'domain');
  for (const [domain, items] of Object.entries(rByDomain)) {
    console.log(`  [${domain}]`);
    for (const r of items) {
      const tag = isInstalled(DEST.rules, filename(r.url)) ? `  ${green('(installed)')}` : '';
      console.log(`    ${col(r.id, ID_W)} ${dim(r.description)}${tag}`);
    }
  }

  console.log('\n  (Fragments are resolved automatically from selected pipelines.)\n');
}

function groupBy(iter, key) {
  const map = {};
  for (const item of iter) {
    (map[item[key]] = map[item[key]] || []).push(item);
  }
  return map;
}

// ─── Fragment Resolution ──────────────────────────────────────────────────────

/**
 * Fetch a pipeline file and extract its `fragments:` frontmatter list.
 */
async function resolvePipelineFragments(pipelineUrl) {
  const content = await fetchText(pipelineUrl);
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return [];
  const fragBlock = fmMatch[1].match(/fragments:\s*\n((?:\s+-\s+\S+\n?)+)/);
  if (!fragBlock) return [];
  return (fragBlock[1].match(/-\s+(\S+)/g) || []).map((s) => s.replace(/^-\s+/, ''));
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Validate project structure
  if (!fs.existsSync(path.join(PROJECT_ROOT, '.pipes/utils/pipelines'))) {
    console.error('Error: .pipes/ not found. Run the init command first.');
    process.exit(1);
  }

  const args        = process.argv.slice(2);
  const allFlag     = args.includes('--all');
  const yesFlag     = args.includes('--yes');
  const selectIdx   = args.indexOf('--select');
  const preSelected = selectIdx !== -1 ? (args[selectIdx + 1] || '').split(',').filter(Boolean) : null;

  // Fetch and parse catalog
  process.stdout.write('Fetching catalog... ');
  const catalogContent = await fetchText(CATALOG_URL);
  const { pipelines, fragments, rules } = parseCatalog(catalogContent);
  console.log('done.\n');

  // Validate .pipes/ fragment type directories exist (create if needed)
  for (const type of ['instruction', 'output', 'question', 'validation']) {
    fs.mkdirSync(path.join(PROJECT_ROOT, DEST.fragments, type), { recursive: true });
  }
  fs.mkdirSync(path.join(PROJECT_ROOT, DEST.pipelines), { recursive: true });
  fs.mkdirSync(path.join(PROJECT_ROOT, DEST.rules),     { recursive: true });

  // ── Selection ──────────────────────────────────────────────────────────────

  let selectedIds;

  if (allFlag) {
    selectedIds = [...pipelines.keys(), ...rules.keys()];
  } else if (preSelected) {
    selectedIds = preSelected;
  } else {
    displayCatalog(pipelines, rules);

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await ask(rl, 'Select IDs (comma-separated, or "all"): ');
    rl.close();

    if (answer.trim() === 'all') {
      selectedIds = [...pipelines.keys(), ...rules.keys()];
    } else {
      selectedIds = answer.split(',').map((s) => s.trim()).filter(Boolean);
    }
  }

  // Validate IDs
  const invalid = selectedIds.filter((id) => !pipelines.has(id) && !rules.has(id));
  if (invalid.length) {
    console.error(`\nUnknown IDs: ${invalid.join(', ')}`);
    console.error('Run without arguments to see the full list.');
    process.exit(1);
  }

  const selectedPipelines = selectedIds.filter((id) => pipelines.has(id)).map((id) => pipelines.get(id));
  const selectedRules      = selectedIds.filter((id) => rules.has(id)).map((id) => rules.get(id));

  // ── Fragment Resolution ────────────────────────────────────────────────────

  if (selectedPipelines.length) {
    process.stdout.write('Resolving fragment dependencies...');
  }

  const fragIds = new Set();
  for (const p of selectedPipelines) {
    const deps = await resolvePipelineFragments(p.url);
    deps.forEach((id) => fragIds.add(id));
    process.stdout.write('.');
  }
  if (selectedPipelines.length) console.log(' done.');

  const missingFrags = [...fragIds].filter((id) => !fragments.has(id));
  if (missingFrags.length) {
    console.error(`\nFragments missing from catalog: ${missingFrags.join(', ')}`);
    process.exit(1);
  }

  const selectedFragments = [...fragIds].map((id) => fragments.get(id));

  // ── Build Plan ─────────────────────────────────────────────────────────────

  const toInstall = [];
  const skipped   = [];

  for (const p of selectedPipelines) {
    const file = filename(p.url);
    const dest = path.join(PROJECT_ROOT, DEST.pipelines, file);
    if (fs.existsSync(dest)) skipped.push(p.id);
    else toInstall.push({ id: p.id, url: p.url, dest });
  }

  for (const f of selectedFragments) {
    const file = filename(f.url);
    const dest = path.join(PROJECT_ROOT, DEST.fragments, f.type, file);
    if (fs.existsSync(dest)) skipped.push(f.id);
    else toInstall.push({ id: f.id, url: f.url, dest });
  }

  for (const r of selectedRules) {
    const file = filename(r.url);
    const dest = path.join(PROJECT_ROOT, DEST.rules, file);
    if (fs.existsSync(dest)) skipped.push(r.id);
    else toInstall.push({ id: r.id, url: r.url, dest });
  }

  // ── Show Plan ──────────────────────────────────────────────────────────────

  console.log('\nImport plan:');
  console.log(`  Pipelines  (${selectedPipelines.length}): ${selectedPipelines.map((p) => p.id).join(', ') || 'none'}`);
  console.log(`  Fragments  (${selectedFragments.length}): ${selectedFragments.map((f) => f.id).join(', ') || 'none'}`);
  console.log(`  Rules      (${selectedRules.length}): ${selectedRules.map((r) => r.id).join(', ') || 'none'}`);

  if (skipped.length) {
    console.log(`\n  Already installed (will skip): ${skipped.join(', ')}`);
  }

  if (!toInstall.length) {
    console.log('\nAll selected files already installed. Nothing to do.');
    return;
  }

  // ── Confirm ────────────────────────────────────────────────────────────────

  if (!yesFlag) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await ask(rl, '\nProceed? [y/N]: ');
    rl.close();
    if (answer.trim().toLowerCase() !== 'y') {
      console.log('Aborted.');
      return;
    }
  }

  // ── Download ───────────────────────────────────────────────────────────────

  console.log('\nInstalling:');
  let installed = 0;

  for (const item of toInstall) {
    const content = await fetchText(item.url);
    fs.mkdirSync(path.dirname(item.dest), { recursive: true });
    fs.writeFileSync(item.dest, content, 'utf8');
    console.log(`  ${green('✓')} ${item.id}`);
    installed++;
  }

  // ── Summary ────────────────────────────────────────────────────────────────

  console.log(`\nDone: ${installed} file(s) installed, ${skipped.length} skipped.`);

  const rulesInstalled = toInstall.some(item =>
    item.dest.includes(DEST.rules)
  );

  if (rulesInstalled) {
    console.log(
      '\nNew rules were imported. Run pipeline-regenerate-agent-entry-points\n' +
      'to update the Active Rules table in your entrypoints.'
    );
  }
}

main().catch((err) => {
  console.error(`\nError: ${err.message}`);
  process.exit(1);
});
