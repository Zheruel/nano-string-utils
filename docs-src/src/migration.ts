declare const Prism: any;
import {
  migrationMappings,
  bundleSizeComparison,
  generateMigrationExample,
  getMigrationSteps,
} from "./migration-guide.js";

export function initMigrationGuide() {
  const migrationContainer = document.getElementById("migration-guide");
  if (!migrationContainer) return;

  migrationContainer.innerHTML = `
    <div class="migration-nav">
      <button class="migration-nav-btn active" data-section="overview">Overview</button>
      <button class="migration-nav-btn" data-section="mapping">Function Mapping</button>
      <button class="migration-nav-btn" data-section="steps">Migration Steps</button>
    </div>

    <div class="migration-content">
      <section id="overview" class="migration-panel active">
        ${renderOverview()}
      </section>
      <section id="mapping" class="migration-panel">
        ${renderMappingTable()}
      </section>
      <section id="steps" class="migration-panel">
        ${renderMigrationSteps()}
      </section>
    </div>
  `;

  // Add event listeners for navigation
  const navButtons = migrationContainer.querySelectorAll(".migration-nav-btn");
  const sections = migrationContainer.querySelectorAll(".migration-panel");

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetSection = (btn as HTMLElement).dataset.section;

      // Update active states
      navButtons.forEach((b) => b.classList.remove("active"));
      sections.forEach((s) => s.classList.remove("active"));

      btn.classList.add("active");
      if (targetSection) {
        const section = document.getElementById(targetSection);
        if (section) {
          section.classList.add("active");
          // Re-highlight code blocks in the newly visible section
          setTimeout(() => {
            Prism.highlightAllUnder(section);
          }, 0);
        }
      }
    });
  });

  // Initialize copy button for codemod script
  const copyBtn = document.getElementById("copy-codemod");
  copyBtn?.addEventListener("click", () => {
    navigator.clipboard.writeText(generateCodemodScript());
    copyBtn.textContent = "✅ Copied!";
    setTimeout(() => {
      copyBtn.textContent = "📋 Copy Script";
    }, 2000);
  });

  // Mapping table filter
  const searchInput = document.getElementById(
    "mapping-search"
  ) as HTMLInputElement;
  const filterTags = document.querySelectorAll(".filter-tag");

  searchInput?.addEventListener("input", filterMappingTable);
  filterTags?.forEach((tag) => {
    tag.addEventListener("click", () => {
      filterTags.forEach((t) => t.classList.remove("active"));
      tag.classList.add("active");
      filterMappingTable();
    });
  });

  // Highlight code blocks
  setTimeout(() => {
    Prism.highlightAll();
  }, 0);
}

function renderOverview() {
  return `
    <div class="comparison-section">
      <h2>Why Migrate?</h2>
      <div class="size-comparison">
        <div class="size-bars">
          <div class="size-bar">
            <span class="size-label">lodash (full)</span>
            <div class="size-bar-fill" style="width: 100%; background: #e74c3c;">
              <span class="size-value">${
                bundleSizeComparison.lodash.full
              }</span>
            </div>
          </div>
          <div class="size-bar">
            <span class="size-label">lodash (string only)</span>
            <div class="size-bar-fill" style="width: 34%; background: #f39c12;">
              <span class="size-value">${
                bundleSizeComparison.lodash.string
              }</span>
            </div>
          </div>
          <div class="size-bar">
            <span class="size-label">nano-string-utils</span>
            <div class="size-bar-fill" style="width: max(9%, 60px); background: #27ae60;">
              <span class="size-value">${
                bundleSizeComparison.nanoStringUtils.full
              }</span>
            </div>
          </div>
        </div>

        <div class="size-summary">
          <span class="size-reduction">96% smaller</span>
          <span class="size-details">than lodash • Zero dependencies</span>
        </div>
      </div>

      <div class="benefits-grid">
        <div class="benefit-item">
          <span class="benefit-icon">🎯</span>
          <span class="benefit-text">Tree-shakeable imports</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">📦</span>
          <span class="benefit-text">ESM & CommonJS support</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">🔒</span>
          <span class="benefit-text">Full TypeScript safety</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">⚡</span>
          <span class="benefit-text">Modern JavaScript only</span>
        </div>
      </div>
    </div>

    <div class="migration-example">
      <h3>Quick Example</h3>
      <pre><code class="language-javascript">${generateMigrationExample(
        "lodash"
      )}</code></pre>
    </div>
  `;
}

function renderMappingTable() {
  const mappings = [...migrationMappings];

  return `
    <h2>Function Mapping Reference</h2>
    <p>Find the nano-string-utils equivalent for your lodash/underscore functions:</p>

    <div class="mapping-filter">
      <input type="text" id="mapping-search" placeholder="Search functions..." />
      <div class="filter-tags">
        <button class="filter-tag active" data-filter="all">All</button>
        <button class="filter-tag" data-filter="direct">Direct Replacement</button>
        <button class="filter-tag" data-filter="native">Use Native JS</button>
        <button class="filter-tag" data-filter="unavailable">No Equivalent</button>
      </div>
    </div>

    <div class="mapping-table-container">
      <table class="mapping-table">
        <thead>
          <tr>
            <th>lodash/underscore</th>
            <th>nano-string-utils</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          ${mappings
            .map(
              (m) => `
            <tr data-type="${getFilterType(m)}">
              <td><code>${m.lodash}</code></td>
              <td>
                ${
                  m.nano
                    ? `<code class="highlight-green">${m.nano}</code>`
                    : '<span class="text-muted">—</span>'
                }
              </td>
              <td>${m.notes || "Direct replacement"}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderMigrationSteps() {
  const steps = getMigrationSteps();

  return `
    <h2>Step-by-Step Migration</h2>
    <p>Follow these steps to migrate your project:</p>

    <div class="migration-steps">
      ${steps
        .map(
          (step, index) => `
        <div class="migration-step">
          <div class="step-number">${step.step}</div>
          <div class="step-content">
            <h3>${step.title}</h3>
            <pre><code class="language-${
              index === 0 ? "bash" : "javascript"
            }">${step.code}</code></pre>
          </div>
        </div>
      `
        )
        .join("")}
    </div>

    <div class="migration-tips">
      <h3>💡 Pro Tips</h3>
      <ul>
        <li>Start with a single file or module to test the migration</li>
        <li>Use your test suite to verify functionality after each change</li>
        <li>Consider using the automated script below for large codebases</li>
        <li>Check the bundle size improvement with your build tools</li>
      </ul>
    </div>

    <div class="codemod-section">
      <h3>Automated Migration Script</h3>
      <p>For large codebases, use this simple Node.js script to automate common replacements:</p>
      <pre><code class="language-javascript">${generateCodemodScript()}</code></pre>
      <button class="btn-secondary" id="copy-codemod">📋 Copy Script</button>
    </div>
  `;
}

function filterMappingTable() {
  const searchInput = document.getElementById(
    "mapping-search"
  ) as HTMLInputElement;
  const activeFilter = document.querySelector(".filter-tag.active");
  const searchTerm = searchInput?.value.toLowerCase() || "";
  const filterType = (activeFilter as HTMLElement)?.dataset.filter || "all";

  const rows = document.querySelectorAll(".mapping-table tbody tr");

  rows.forEach((row) => {
    const text = (row as HTMLElement).textContent?.toLowerCase() || "";
    const type = (row as HTMLElement).dataset.type;

    const matchesSearch = !searchTerm || text.includes(searchTerm);
    const matchesFilter = filterType === "all" || type === filterType;

    (row as HTMLElement).style.display =
      matchesSearch && matchesFilter ? "" : "none";
  });
}

function getFilterType(mapping: any) {
  if (!mapping.nano && mapping.notes?.includes("native")) return "native";
  if (!mapping.nano) return "unavailable";
  return "direct";
}

function generateCodemodScript() {
  return `#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Simple codemod for migrating from lodash to nano-string-utils
const replacements = [
  { from: /import\\s+_\\s+from\\s+['"]lodash['"]/g, to: "import * as _ from 'nano-string-utils'" },
  { from: /import\\s+{([^}]+)}\\s+from\\s+['"]lodash['"]/g, to: "import {$1} from 'nano-string-utils'" },
  { from: /_\\.camelCase/g, to: 'camelCase' },
  { from: /_\\.kebabCase/g, to: 'kebabCase' },
  { from: /_\\.snakeCase/g, to: 'snakeCase' },
  { from: /_\\.capitalize/g, to: 'capitalize' },
  { from: /_\\.escape/g, to: 'escapeHtml' },
  { from: /_\\.truncate/g, to: 'truncate' },
  { from: /_\\.pad/g, to: 'pad' },
  { from: /_\\.padEnd/g, to: 'padEnd' },
  { from: /_\\.padStart/g, to: 'padStart' },
  { from: /_\\.deburr/g, to: 'deburr' },
  { from: /_\\.words/g, to: 'words' },
];

// Find all JS/TS files
const files = glob.sync('src/**/*.{js,jsx,ts,tsx}', { ignore: '**/node_modules/**' });

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  replacements.forEach(({ from, to }) => {
    if (from.test(content)) {
      content = content.replace(from, to);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(file, content);
    console.log('✅ Updated:', file);
  }
});

console.log('Migration complete! Remember to:');
console.log('1. Run npm install nano-string-utils');
console.log('2. Review and test the changes');
console.log('3. Handle any functions that need manual migration');`;
}
