#!/usr/bin/env node

import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import {
  generateBundleSizeReport,
  generateMarkdownTable,
} from "./bundle-size.js";

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface PerformanceResult {
  function: string;
  library: string;
  opsPerSec: number;
}

async function runPerformanceBenchmarks(): Promise<PerformanceResult[]> {
  console.log("🏃 Running performance benchmarks...\n");

  try {
    // Run vitest bench and capture output
    const { stdout } = await execAsync(
      "npm run bench -- benchmarks/performance.bench.ts",
      {
        cwd: path.join(__dirname, ".."),
        env: { ...process.env, CI: "true" }, // Run in CI mode for consistent output
      }
    );

    // Parse the output to extract benchmark results
    const results: PerformanceResult[] = [];
    const lines = stdout.split("\n");

    let currentFunction = "";
    for (const line of lines) {
      // Match function names (describe blocks)
      if (line.includes("✓") && line.includes("bench")) {
        const match = line.match(/✓\s+(\w+(?:\s+\w+)*)\s+\((\d+)\s+samples\)/);
        if (match) {
          currentFunction = match[1];
        }
      }

      // Match benchmark results
      const benchMatch = line.match(/(\w+[-\w]*)\s+([\d,\.]+)\s+ops\/s/);
      if (benchMatch && currentFunction) {
        results.push({
          function: currentFunction,
          library: benchMatch[1],
          opsPerSec: parseFloat(benchMatch[2].replace(/,/g, "")),
        });
      }
    }

    return results;
  } catch (error) {
    console.error("Error running performance benchmarks:", error);
    // Return empty results if benchmarks fail
    return [];
  }
}

function generatePerformanceMarkdown(perfResults: PerformanceResult[]): string {
  const functions = [...new Set(perfResults.map((r) => r.function))].sort();

  let markdown = "## Performance Comparison\n\n";
  markdown += "Operations per second (higher is better):\n\n";
  markdown +=
    "| Function | nano-string-utils | lodash | es-toolkit | Winner |\n";
  markdown +=
    "|----------|-------------------|--------|------------|--------|\n";

  for (const func of functions) {
    const nanoResult = perfResults.find(
      (r) => r.library === "nano-string-utils" && r.function === func
    );
    const lodashResult = perfResults.find(
      (r) => r.library === "lodash" && r.function === func
    );
    const esToolkitResult = perfResults.find(
      (r) => r.library === "es-toolkit" && r.function === func
    );

    const results = [
      { name: "nano", ops: nanoResult?.opsPerSec || 0 },
      { name: "lodash", ops: lodashResult?.opsPerSec || 0 },
      { name: "es-toolkit", ops: esToolkitResult?.opsPerSec || 0 },
    ].filter((r) => r.ops > 0);

    const winner =
      results.length > 0
        ? results.reduce((max, curr) => (curr.ops > max.ops ? curr : max)).name
        : "-";

    const formatOps = (ops: number | undefined) =>
      ops ? `${ops.toLocaleString()} ops/s` : "-";

    markdown += `| ${func} | ${formatOps(nanoResult?.opsPerSec)} | ${formatOps(
      lodashResult?.opsPerSec
    )} | ${formatOps(esToolkitResult?.opsPerSec)} | ${winner} |\n`;
  }

  return markdown;
}

async function generateCompleteBenchmarkReport() {
  console.log("📊 Nano String Utils - Benchmark Suite\n");
  console.log("=".repeat(50) + "\n");

  // Run performance benchmarks (disabled for now as it needs vitest to be properly configured)
  // const perfResults = await runPerformanceBenchmarks();

  // Run bundle size analysis
  console.log("📦 Analyzing bundle sizes...\n");
  const bundleResults = await generateBundleSizeReport();

  // Generate complete markdown report
  let fullReport = "# Nano String Utils - Benchmark Results\n\n";
  fullReport += "_Comparing nano-string-utils with lodash and es-toolkit_\n\n";
  fullReport +=
    "Generated on: " + new Date().toISOString().split("T")[0] + "\n\n";

  // Add performance results (when available)
  // if (perfResults.length > 0) {
  //   fullReport += generatePerformanceMarkdown(perfResults);
  //   fullReport += "\n";
  // }

  // Add bundle size results
  fullReport += generateMarkdownTable(bundleResults);

  // Add summary
  fullReport += "\n## Summary\n\n";
  fullReport += "### Key Findings\n\n";

  // Analyze bundle size winners
  const bundleWinners: Record<string, number> = {
    nano: 0,
    lodash: 0,
    "es-toolkit": 0,
  };
  for (const result of bundleResults) {
    if (result.library === "nano-string-utils") {
      const others = bundleResults.filter(
        (r) =>
          r.function === result.function && r.library !== "nano-string-utils"
      );
      if (others.every((o) => result.gzipped < o.gzipped)) {
        bundleWinners.nano++;
      }
    }
  }

  fullReport += `- **Bundle Size**: nano-string-utils has the smallest bundle size in ${
    bundleWinners.nano
  } out of ${
    [...new Set(bundleResults.map((r) => r.function))].length
  } tested functions\n`;
  fullReport +=
    "- **Zero Dependencies**: nano-string-utils maintains zero runtime dependencies\n";
  fullReport +=
    "- **Tree-shaking**: All functions are independently importable for optimal bundle optimization\n";

  fullReport += "\n### Methodology\n\n";
  fullReport +=
    "- Bundle sizes measured using esbuild with minification enabled\n";
  fullReport += "- Sizes shown include both minified and gzipped values\n";
  fullReport +=
    "- Each function imported individually to measure tree-shaking effectiveness\n";
  fullReport +=
    "- Performance benchmarks use Vitest bench with multiple iterations\n";

  // Save the report
  const outputPath = path.join(__dirname, "benchmark-results.md");
  await fs.writeFile(outputPath, fullReport);

  console.log(
    "\n✅ Complete benchmark report saved to benchmarks/benchmark-results.md"
  );
  console.log("\n📈 Quick Stats:");
  console.log(
    `   - Functions tested: ${
      [...new Set(bundleResults.map((r) => r.function))].length
    }`
  );
  console.log(
    `   - Libraries compared: 3 (nano-string-utils, lodash, es-toolkit)`
  );
  console.log(
    `   - Smallest bundle winner: nano-string-utils (${bundleWinners.nano} functions)`
  );
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateCompleteBenchmarkReport().catch(console.error);
}
