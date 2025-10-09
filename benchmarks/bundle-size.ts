import { build } from "esbuild";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { gzip } from "zlib";
import { promisify } from "util";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const gzipAsync = promisify(gzip);

interface BundleSizeResult {
  library: string;
  function: string;
  minified: number;
  gzipped: number;
  treeShaken?: {
    minified: number;
    gzipped: number;
  };
}

interface DetailedSizeMetrics {
  function: string;
  nano: {
    minified: number;
    gzipped: number;
    treeShaken: {
      minified: number;
      gzipped: number;
    };
  };
  lodash?: {
    minified: number;
    gzipped: number;
  };
  esToolkit?: {
    minified: number;
    gzipped: number;
  };
  winner: string;
  percentSavings?: number; // How much smaller nano is compared to smallest competitor
}

// Read all functions from the generated JSON file
async function getAllFunctions(): Promise<string[]> {
  const functionsPath = path.join(__dirname, "all-functions.json");

  // If the file doesn't exist, run the extraction script first
  try {
    await fs.access(functionsPath);
  } catch {
    console.log("Extracting function list...");
    const { execSync } = await import("child_process");
    execSync("node benchmarks/extract-functions.js", { stdio: "inherit" });
  }

  const content = await fs.readFile(functionsPath, "utf-8");
  return JSON.parse(content);
}

// Known functions in lodash
const lodashFunctions = new Set([
  "camelCase",
  "kebabCase",
  "snakeCase",
  "capitalize",
  "truncate",
  "deburr",
  "pad",
  "padStart",
  "padEnd",
  "template",
  "escapeHtml",
  "words",
  "random",
]);

// Known functions in es-toolkit
const esToolkitFunctions = new Set([
  "camelCase",
  "kebabCase",
  "snakeCase",
  "pascalCase",
  "capitalize",
  "deburr",
  "pad",
  "escapeHtml",
  "random",
  "truncate",
]);

async function measureBundleSize(
  library: string,
  functionName: string,
  measureTreeShaken = false
): Promise<BundleSizeResult | null> {
  const tempDir = path.join(__dirname, ".temp");
  await fs.mkdir(tempDir, { recursive: true });

  const entryFile = path.join(tempDir, `${library}-${functionName}.js`);

  // Generate import code based on library
  let importCode = "";
  if (library === "nano-string-utils") {
    if (measureTreeShaken) {
      // Direct import from specific file for tree-shaken measurement
      importCode = `import { ${functionName} } from '../../dist/index.js';\nexport { ${functionName} };`;
    } else {
      // Regular import from index
      importCode = `import { ${functionName} } from 'nano-string-utils';\nexport { ${functionName} };`;
    }
  } else if (library === "lodash") {
    if (!lodashFunctions.has(functionName)) {
      return null;
    }
    // Use modular imports for lodash
    importCode = `import ${functionName} from 'lodash/${functionName}';\nexport default ${functionName};`;
  } else if (library === "es-toolkit") {
    if (!esToolkitFunctions.has(functionName)) {
      return null;
    }
    importCode = `import { ${functionName} } from 'es-toolkit';\nexport { ${functionName} };`;
  }

  await fs.writeFile(entryFile, importCode);

  try {
    // Build with esbuild
    const result = await build({
      entryPoints: [entryFile],
      bundle: true,
      minify: true,
      format: "esm",
      outfile: path.join(tempDir, `${library}-${functionName}-bundle.js`),
      write: false,
      metafile: true,
      external: [],
      treeShaking: true,
    });

    const minifiedSize = result.outputFiles[0].contents.byteLength;

    // Calculate gzipped size
    const gzipped = await gzipAsync(result.outputFiles[0].contents);
    const gzippedSize = gzipped.byteLength;

    // Clean up temp file
    await fs.unlink(entryFile).catch(() => {});

    const baseResult: BundleSizeResult = {
      library,
      function: functionName,
      minified: minifiedSize,
      gzipped: gzippedSize,
    };

    // If this is nano and we haven't measured tree-shaken yet, do it now
    if (library === "nano-string-utils" && !measureTreeShaken) {
      const treeShaken = await measureBundleSize(library, functionName, true);
      if (treeShaken) {
        baseResult.treeShaken = {
          minified: treeShaken.minified,
          gzipped: treeShaken.gzipped,
        };
      }
    }

    return baseResult;
  } catch (error) {
    // Function doesn't exist in this library or build failed
    await fs.unlink(entryFile).catch(() => {});
    return null;
  }
}

async function generateBundleSizeReport() {
  const functions = await getAllFunctions();
  const results: BundleSizeResult[] = [];
  const detailedMetrics: DetailedSizeMetrics[] = [];

  console.log(
    `📊 Measuring bundle sizes for ${functions.length} functions...\n`
  );

  for (const func of functions) {
    // Measure nano-string-utils
    const nanoResult = await measureBundleSize("nano-string-utils", func);
    if (nanoResult) {
      results.push(nanoResult);
      console.log(
        `✓ nano-string-utils/${func}: ${nanoResult.minified}B (${nanoResult.gzipped}B gzip) | tree-shaken: ${nanoResult.treeShaken?.minified}B (${nanoResult.treeShaken?.gzipped}B gzip)`
      );
    }

    // Measure lodash
    const lodashResult = await measureBundleSize("lodash", func);
    if (lodashResult) {
      results.push(lodashResult);
      console.log(
        `✓ lodash/${func}: ${lodashResult.minified}B (${lodashResult.gzipped}B gzip)`
      );
    }

    // Measure es-toolkit
    const esToolkitResult = await measureBundleSize("es-toolkit", func);
    if (esToolkitResult) {
      results.push(esToolkitResult);
      console.log(
        `✓ es-toolkit/${func}: ${esToolkitResult.minified}B (${esToolkitResult.gzipped}B gzip)`
      );
    }

    // Create detailed metrics for this function
    if (nanoResult) {
      const metric: DetailedSizeMetrics = {
        function: func,
        nano: {
          minified: nanoResult.minified,
          gzipped: nanoResult.gzipped,
          treeShaken: {
            minified: nanoResult.treeShaken?.minified || nanoResult.minified,
            gzipped: nanoResult.treeShaken?.gzipped || nanoResult.gzipped,
          },
        },
        winner: "nano",
      };

      if (lodashResult) {
        metric.lodash = {
          minified: lodashResult.minified,
          gzipped: lodashResult.gzipped,
        };
      }

      if (esToolkitResult) {
        metric.esToolkit = {
          minified: esToolkitResult.minified,
          gzipped: esToolkitResult.gzipped,
        };
      }

      // Determine winner based on gzipped tree-shaken size
      const sizes = [
        {
          name: "nano",
          size: nanoResult.treeShaken?.gzipped || nanoResult.gzipped,
        },
        { name: "lodash", size: lodashResult?.gzipped || Infinity },
        { name: "es-toolkit", size: esToolkitResult?.gzipped || Infinity },
      ].filter((s) => s.size !== Infinity);

      metric.winner = sizes.reduce((min, curr) =>
        curr.size < min.size ? curr : min
      ).name;

      // Calculate savings percentage
      const competitors = sizes.filter((s) => s.name !== "nano");
      if (competitors.length > 0) {
        const smallestCompetitor = Math.min(...competitors.map((c) => c.size));
        const nanoSize = nanoResult.treeShaken?.gzipped || nanoResult.gzipped;
        metric.percentSavings = Math.round(
          ((smallestCompetitor - nanoSize) / smallestCompetitor) * 100
        );
      }

      detailedMetrics.push(metric);
    }
  }

  // Clean up temp directory
  const tempDir = path.join(__dirname, ".temp");
  await fs.rmdir(tempDir, { recursive: true }).catch(() => {});

  return { results, detailedMetrics };
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  const kb = bytes / 1024;
  return kb < 10 ? `${kb.toFixed(1)}KB` : `${Math.round(kb)}KB`;
}

async function generateJSONReport(metrics: DetailedSizeMetrics[]) {
  const outputPath = path.join(__dirname, "bundle-sizes.json");

  const report = {
    generated: new Date().toISOString(),
    totalFunctions: metrics.length,
    functions: metrics.map((m) => ({
      name: m.function,
      nano: {
        bundled: {
          raw: m.nano.minified,
          gzip: m.nano.gzipped,
        },
        treeShaken: {
          raw: m.nano.treeShaken.minified,
          gzip: m.nano.treeShaken.gzipped,
        },
      },
      lodash: m.lodash
        ? {
            raw: m.lodash.minified,
            gzip: m.lodash.gzipped,
          }
        : null,
      esToolkit: m.esToolkit
        ? {
            raw: m.esToolkit.minified,
            gzip: m.esToolkit.gzipped,
          }
        : null,
      winner: m.winner,
      percentSavings: m.percentSavings,
    })),
    summary: {
      totalNanoWins: metrics.filter((m) => m.winner === "nano").length,
      totalEsToolkitWins: metrics.filter((m) => m.winner === "es-toolkit")
        .length,
      totalLodashWins: metrics.filter((m) => m.winner === "lodash").length,
      averageSavings: Math.round(
        metrics
          .filter((m) => m.percentSavings !== undefined)
          .reduce((sum, m) => sum + (m.percentSavings || 0), 0) / metrics.length
      ),
      smallestFunction: metrics.reduce((min, curr) =>
        curr.nano.treeShaken.gzipped < min.nano.treeShaken.gzipped ? curr : min
      ).function,
      largestFunction: metrics.reduce((max, curr) =>
        curr.nano.treeShaken.gzipped > max.nano.treeShaken.gzipped ? curr : max
      ).function,
    },
  };

  await fs.writeFile(outputPath, JSON.stringify(report, null, 2));
  return outputPath;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log("🚀 nano-string-utils Bundle Size Analysis\n");
  generateBundleSizeReport()
    .then(async ({ results, detailedMetrics }) => {
      // Generate and save JSON report
      const jsonPath = await generateJSONReport(detailedMetrics);
      console.log(`\n✅ JSON report saved to ${jsonPath}`);

      // Copy to public directory for serving in documentation site
      const publicJsonPath = path.join(
        __dirname,
        "..",
        "docs-src",
        "public",
        "bundle-sizes.json"
      );
      await fs.mkdir(path.dirname(publicJsonPath), { recursive: true });
      await fs.copyFile(jsonPath, publicJsonPath);
      console.log(`✅ JSON copied to docs-src/public/`);

      // Summary
      const totalNanoWins = detailedMetrics.filter(
        (m) => m.winner === "nano"
      ).length;
      const avgSavings = Math.round(
        detailedMetrics
          .filter((m) => m.percentSavings !== undefined)
          .reduce((sum, m) => sum + (m.percentSavings || 0), 0) /
          detailedMetrics.length
      );

      console.log(`\n📊 Summary:`);
      console.log(`   - Total functions: ${detailedMetrics.length}`);
      console.log(`   - Nano wins: ${totalNanoWins}/${detailedMetrics.length}`);
      console.log(`   - Average size reduction: ${avgSavings}%`);
    })
    .catch(console.error);
}

export { measureBundleSize, generateBundleSizeReport, formatBytes };
