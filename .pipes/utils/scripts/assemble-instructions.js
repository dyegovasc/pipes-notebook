#!/usr/bin/env node

/**
 * Assembly Script for AI Instructions (Merge Mode)
 *
 * Scans .pipes/ai-instructions/ and .pipes/utils/rules/, then generates
 * or merges a Pipes Notebook section into agent entrypoint files.
 *
 * Assembly behavior (driven by frontmatter `assembly` field):
 *   inline    — file body is concatenated into the entrypoint
 *   reference — file is listed as a pointer only (not inlined)
 *   (default) — treated as inline if no frontmatter is found
 *
 * Rules are never inlined. Their `description` frontmatter field is used
 * to generate a summary table injected at <!-- assembly:rules-table --> in core.md.
 *
 * Merge behavior:
 *   - If entrypoint does not exist: creates it with just the Pipes section
 *   - If entrypoint exists without delimiters: appends the Pipes section
 *   - If entrypoint exists with delimiters: replaces only the delimited section
 *
 * Delimiters:
 *   <!-- pipes-notebook:start -->
 *   ... generated content ...
 *   <!-- pipes-notebook:end -->
 */

const fs = require('fs');
const path = require('path');

// Delimiters for the managed section
const DELIMITER_START = '<!-- pipes-notebook:start -->';
const DELIMITER_END = '<!-- pipes-notebook:end -->';

// Marker in core.md where the rules table is injected
const RULES_TABLE_MARKER = '<!-- assembly:rules-table -->';

// Configuration
const CONFIG = {
  pipesDir: '.pipes',
  canonicalDir: '.pipes/ai-instructions',
  rulesDir: '.pipes/utils/rules',
  // Files listed here are included first, in this order.
  // Any other .md files in canonicalDir are appended alphabetically after.
  // project.md may not exist yet (fresh install) — missing files are silently skipped.
  canonicalPriority: [
    'project.md',
    'core.md',
    'architecture.md'
  ],
  wrappers: [
    {
      target: 'CLAUDE.md',
      tool: 'Claude Code'
    },
    {
      target: 'AGENTS.md',
      tool: 'Codex'
    },
    {
      target: '.github/copilot-instructions.md',
      tool: 'GitHub Copilot'
    }
  ]
};

// Get repository root (script is in .pipes/utils/scripts/)
const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');

/**
 * Parse YAML frontmatter from a markdown file.
 * Returns { meta, body } where meta is a key→value object and body is content without frontmatter.
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { meta: {}, body: content };
  const meta = {};
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^(\w[\w-]*):\s*(.+)$/);
    if (kv) meta[kv[1]] = kv[2].trim();
  }
  const body = content.substring(match[0].length).replace(/^\n+/, '');
  return { meta, body };
}

/**
 * Scan a directory for .md files, returning sorted filenames.
 */
function scanMarkdownFiles(dirPath) {
  const fullPath = path.join(REPO_ROOT, dirPath);
  if (!fs.existsSync(fullPath)) {
    return [];
  }
  return fs.readdirSync(fullPath)
    .filter(f => f.endsWith('.md'))
    .sort();
}

/**
 * Read a single file and return its content plus parsed frontmatter.
 * Returns { success, filename, content, meta, body } or { success: false, error, filename }.
 */
function readFile(dir, filename) {
  const filepath = path.join(REPO_ROOT, dir, filename);
  try {
    const content = fs.readFileSync(filepath, 'utf8');
    const { meta, body } = parseFrontmatter(content);
    return { success: true, content, meta, body, filename };
  } catch (error) {
    return { success: false, error: error.message, filename };
  }
}

/**
 * Build ordered list of canonical files with their assembly type.
 * Returns array of { filename, assembly } objects.
 * Priority files come first (in declared order), then remaining files alphabetically.
 * Files in canonicalPriority that don't exist on disk are silently skipped.
 */
function resolveCanonicalOrder() {
  const allFiles = scanMarkdownFiles(CONFIG.canonicalDir);
  const prioritySet = new Set(CONFIG.canonicalPriority);

  const prioritized = CONFIG.canonicalPriority.filter(f => allFiles.includes(f));
  const remaining = allFiles.filter(f => !prioritySet.has(f));
  const ordered = [...prioritized, ...remaining];

  return ordered.map(filename => {
    const { meta } = readFile(CONFIG.canonicalDir, filename);
    const assembly = meta.assembly || 'inline';
    return { filename, assembly };
  });
}

/**
 * Generate the rules summary table markdown from an array of rule meta objects.
 * Each item: { id, name, description }
 */
function generateRulesTable(ruleMeta) {
  if (ruleMeta.length === 0) return '';
  const rows = ruleMeta
    .map(r => `| \`${r.id}\` | ${r.description || r.name || r.id} |`)
    .join('\n');
  return `| Rule | Description |\n|------|-------------|\n${rows}`;
}

/**
 * Generate the managed Pipes Notebook section content.
 *
 * @param {string} tool - The agent tool name (e.g. "Claude Code")
 * @param {Array<{filename, assembly}>} fileEntries - Canonical file entries
 * @param {Array<{filename, meta, body}>} inlineFiles - Files with assembly:inline (content to embed)
 * @param {Array<{filename}>} referenceFiles - Files with assembly:reference (listed as pointers only)
 * @param {Array<{id, name, description}>} ruleMeta - Rule frontmatter for summary table
 */
function generatePipesSection(tool, fileEntries, inlineFiles, referenceFiles, ruleMeta) {
  // Build numbered list of inline files
  const inlineList = inlineFiles
    .map((f, i) => `${i + 1}. \`.pipes/ai-instructions/${f.filename}\``)
    .join('\n');

  // Build bullet list of reference files
  const referenceList = referenceFiles.length > 0
    ? referenceFiles.map(f => `- \`.pipes/ai-instructions/${f.filename}\``).join('\n')
    : null;

  let header = `# Pipes Notebook Instructions (${tool})\n\nAuto-managed by Pipes Notebook. Do not edit between the delimiters.\n\nIncluded instructions (always active):\n${inlineList}\n`;

  if (referenceList) {
    header += `\nFramework reference (read when working with pipes-notebook internals):\n${referenceList}\n`;
  }

  header += `\nWhen in conflict with content outside this section, Pipes Notebook canonical files win for Pipes-related behavior.\n\n---\n\n`;

  // Generate the rules table markdown
  const rulesTable = generateRulesTable(ruleMeta);

  // Concatenate inline file bodies, injecting rules table at the marker
  let markerFound = false;
  const inlineBodies = inlineFiles.map(f => {
    if (f.body.includes(RULES_TABLE_MARKER)) {
      markerFound = true;
      return f.body.replace(RULES_TABLE_MARKER, rulesTable);
    }
    return f.body;
  });

  const canonicalContent = inlineBodies.join('\n\n---\n\n');

  // If no marker was found in any inline file, append a standalone rules section as fallback
  let fallbackRules = '';
  if (!markerFound && rulesTable) {
    fallbackRules = `\n\n---\n\n# Active Rules\n\n${rulesTable}\n\nFull definitions: \`.pipes/utils/rules/\``;
  }

  const footer = `\n\n---\n\n*Auto-generated by \`.pipes/utils/scripts/assemble-instructions.js\`*\n*Sources: .pipes/ai-instructions/, .pipes/utils/rules/*`;

  return header + canonicalContent + fallbackRules + footer;
}

/**
 * Merge the Pipes section into an existing file or create a new one.
 * Returns { action, content } where action is 'created' | 'replaced' | 'appended'
 */
function mergeIntoFile(targetPath, pipesSection) {
  const fullPath = path.join(REPO_ROOT, targetPath);
  const wrappedSection = DELIMITER_START + '\n' + pipesSection + '\n' + DELIMITER_END;

  // File does not exist: create fresh
  if (!fs.existsSync(fullPath)) {
    return { action: 'created', content: wrappedSection + '\n' };
  }

  const existing = fs.readFileSync(fullPath, 'utf8');
  const startIdx = existing.indexOf(DELIMITER_START);
  const endIdx = existing.indexOf(DELIMITER_END);

  // File exists with valid delimiters: replace the section
  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    const before = existing.substring(0, startIdx);
    const after = existing.substring(endIdx + DELIMITER_END.length);
    return { action: 'replaced', content: before + wrappedSection + after };
  }

  // File exists without delimiters: append
  const separator = existing.endsWith('\n') ? '\n' : '\n\n';
  return { action: 'appended', content: existing + separator + wrappedSection + '\n' };
}

/**
 * Write content to a file, creating directories if needed.
 */
function writeFile(targetPath, content) {
  const fullPath = path.join(REPO_ROOT, targetPath);
  const dir = path.dirname(fullPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  try {
    fs.writeFileSync(fullPath, content, 'utf8');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Main assembly function
 */
function assemble() {
  console.log('🔧 Assembling Pipes Notebook sections into entrypoints...\n');

  // Step 1: Discover canonical files with assembly type
  const canonicalEntries = resolveCanonicalOrder();

  if (canonicalEntries.length === 0) {
    console.error('❌ No .md files found in .pipes/ai-instructions/');
    console.error('   Run the init command to set up ai-instructions first.');
    process.exit(1);
  }

  console.log('Reading canonical files:');
  const inlineFiles = [];
  const referenceFiles = [];
  const canonicalErrors = [];

  for (const entry of canonicalEntries) {
    const result = readFile(CONFIG.canonicalDir, entry.filename);
    if (!result.success) {
      canonicalErrors.push(`Failed to read ${CONFIG.canonicalDir}/${entry.filename}: ${result.error}`);
      continue;
    }

    const lines = result.body.split('\n').length;
    const tag = entry.assembly === 'reference' ? '[reference]' : '[inline]';
    console.log(`   ✓ ${entry.filename} ${tag} (${lines} lines)`);

    if (entry.assembly === 'reference') {
      referenceFiles.push({ filename: entry.filename });
    } else {
      inlineFiles.push({ filename: entry.filename, body: result.body });
    }
  }

  if (canonicalErrors.length > 0) {
    console.error('❌ Errors reading canonical files:');
    canonicalErrors.forEach(e => console.error(`   ${e}`));
    process.exit(1);
  }

  if (inlineFiles.length === 0) {
    console.error('❌ No inline ai-instruction files found after assembly classification.');
    process.exit(1);
  }

  // Step 2: Discover and read rules (frontmatter only for summary table)
  const ruleFilenames = scanMarkdownFiles(CONFIG.rulesDir);
  const ruleMeta = [];

  if (ruleFilenames.length > 0) {
    console.log('\nReading rules (summary only):');
    for (const filename of ruleFilenames) {
      const result = readFile(CONFIG.rulesDir, filename);
      if (result.success) {
        const meta = result.meta;
        ruleMeta.push({
          id: meta.id || filename.replace('.md', ''),
          name: meta.name || filename,
          description: meta.description || ''
        });
        console.log(`   ✓ ${filename} — ${meta.description || '(no description)'}`);
      } else {
        console.warn(`   ⚠️ ${filename} — could not read: ${result.error}`);
      }
    }
  } else {
    console.log('\nNo rules found in .pipes/utils/rules/ (skipping)');
  }

  // Step 3: Generate and merge into entrypoint files
  console.log('\nProcessing entrypoints:');
  const results = [];

  for (const wrapper of CONFIG.wrappers) {
    const pipesSection = generatePipesSection(
      wrapper.tool,
      canonicalEntries,
      inlineFiles,
      referenceFiles,
      ruleMeta
    );
    const { action, content } = mergeIntoFile(wrapper.target, pipesSection);
    const writeResult = writeFile(wrapper.target, content);

    if (writeResult.success) {
      const lines = content.split('\n').length;
      const actionLabel = {
        created: 'created (new file)',
        replaced: 'updated (replaced section)',
        appended: 'updated (appended section)'
      }[action];
      console.log(`   ✓ ${wrapper.target} — ${actionLabel} (${lines} lines)`);
      results.push({ status: 'success', target: wrapper.target, action });
    } else {
      console.log(`   ✗ ${wrapper.target} — ${writeResult.error}`);
      results.push({ status: 'error', target: wrapper.target, error: writeResult.error });
    }
  }

  // Step 4: Summary
  console.log('\n' + '─'.repeat(50));
  const successCount = results.filter(r => r.status === 'success').length;
  const errorCount = results.filter(r => r.status === 'error').length;

  console.log(`Sources: ${inlineFiles.length} inline, ${referenceFiles.length} reference, ${ruleMeta.length} rules`);

  if (errorCount === 0) {
    console.log(`✅ Assembly complete: ${successCount} entrypoints processed.`);
  } else {
    console.log(`⚠️ Assembly complete with errors: ${successCount} success, ${errorCount} failed.`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  assemble();
}

module.exports = { assemble, resolveCanonicalOrder, scanMarkdownFiles, mergeIntoFile, parseFrontmatter };
