import { build } from "esbuild";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface BundleSizeResult {
  library: string;
  function: string;
  minified: number;
  gzipped: number;
}

const libraries = {
  "nano-string-utils": "nano-string-utils",
  lodash: "lodash",
  "es-toolkit": "es-toolkit",
};

const functions = [
  "camelCase",
  "kebabCase",
  "snakeCase",
  "pascalCase",
  "capitalize",
  "truncate",
  "deburr",
  "pad",
  "padStart",
  "padEnd",
  "template",
];

async function measureBundleSize(
  library: string,
  functionName: string
): Promise<BundleSizeResult | null> {
  const tempDir = path.join(__dirname, ".temp");
  await fs.mkdir(tempDir, { recursive: true });

  const entryFile = path.join(tempDir, `${library}-${functionName}.js`);

  // Generate import code based on library
  let importCode = "";
  if (library === "nano-string-utils") {
    importCode = `import { ${functionName} } from 'nano-string-utils';\nconsole.log(${functionName});`;
  } else if (library === "lodash") {
    // Check if function exists in lodash
    const lodashFunctions = [
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
    ];
    if (!lodashFunctions.includes(functionName)) {
      return null;
    }
    // Use modular imports for lodash
    importCode = `import ${functionName} from 'lodash/${functionName}';\nconsole.log(${functionName});`;
  } else if (library === "es-toolkit") {
    // Check if function exists in es-toolkit
    const esToolkitFunctions = [
      "camelCase",
      "kebabCase",
      "snakeCase",
      "pascalCase",
      "capitalize",
      "deburr",
      "pad",
      "padStart",
      "padEnd",
    ];
    if (!esToolkitFunctions.includes(functionName)) {
      return null;
    }
    importCode = `import { ${functionName} } from 'es-toolkit';\nconsole.log(${functionName});`;
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
    });

    const minifiedSize = result.outputFiles[0].contents.byteLength;

    // Calculate gzipped size using Node's built-in zlib
    const { gzip } = await import("zlib");
    const { promisify } = await import("util");
    const gzipAsync = promisify(gzip);
    const gzipped = await gzipAsync(result.outputFiles[0].contents);
    const gzippedSize = gzipped.byteLength;

    // Clean up temp file
    await fs.unlink(entryFile).catch(() => {});

    return {
      library,
      function: functionName,
      minified: minifiedSize,
      gzipped: gzippedSize,
    };
  } catch (error) {
    // Function doesn't exist in this library
    await fs.unlink(entryFile).catch(() => {});
    return null;
  }
}

async function generateBundleSizeReport() {
  const results: BundleSizeResult[] = [];

  for (const [libName, libPackage] of Object.entries(libraries)) {
    for (const func of functions) {
      const result = await measureBundleSize(libPackage, func);
      if (result) {
        results.push(result);
        console.log(
          `✓ Measured ${libName}/${func}: ${result.minified} bytes (${result.gzipped} gzipped)`
        );
      } else {
        console.log(`- Skipped ${libName}/${func} (not available)`);
      }
    }
  }

  // Clean up temp directory
  const tempDir = path.join(__dirname, ".temp");
  await fs.rmdir(tempDir, { recursive: true }).catch(() => {});

  return results;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  const kb = bytes / 1024;
  return kb < 10 ? `${kb.toFixed(1)}KB` : `${Math.round(kb)}KB`;
}

function generateMarkdownTable(results: BundleSizeResult[]): string {
  const functions = [...new Set(results.map((r) => r.function))].sort();

  let markdown = "## Bundle Size Comparison\n\n";
  markdown +=
    "Sizes shown are for minified (gzipped) bundles when importing a single function.\n\n";
  markdown +=
    "| Function | nano-string-utils | lodash | es-toolkit | Winner |\n";
  markdown +=
    "|----------|-------------------|--------|------------|--------|\n";

  for (const func of functions) {
    const nanoResult = results.find(
      (r) => r.library === "nano-string-utils" && r.function === func
    );
    const lodashResult = results.find(
      (r) => r.library === "lodash" && r.function === func
    );
    const esToolkitResult = results.find(
      (r) => r.library === "es-toolkit" && r.function === func
    );

    const sizes = [
      { name: "nano", size: nanoResult?.gzipped || Infinity },
      { name: "lodash", size: lodashResult?.gzipped || Infinity },
      { name: "es-toolkit", size: esToolkitResult?.gzipped || Infinity },
    ].filter((s) => s.size !== Infinity);

    const winner =
      sizes.length > 0
        ? sizes.reduce((min, curr) => (curr.size < min.size ? curr : min)).name
        : "-";

    const nanoSize = nanoResult
      ? `${formatBytes(nanoResult.minified)} (${formatBytes(
          nanoResult.gzipped
        )})`
      : "-";
    const lodashSize = lodashResult
      ? `${formatBytes(lodashResult.minified)} (${formatBytes(
          lodashResult.gzipped
        )})`
      : "-";
    const esToolkitSize = esToolkitResult
      ? `${formatBytes(esToolkitResult.minified)} (${formatBytes(
          esToolkitResult.gzipped
        )})`
      : "-";

    markdown += `| ${func} | ${nanoSize} | ${lodashSize} | ${esToolkitSize} | ${winner} |\n`;
  }

  return markdown;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log("📊 Measuring bundle sizes...\n");
  generateBundleSizeReport()
    .then((results) => {
      console.log("\n" + generateMarkdownTable(results));

      // Save results to file
      const outputPath = path.join(__dirname, "bundle-size-results.md");
      return fs.writeFile(outputPath, generateMarkdownTable(results));
    })
    .then(() => {
      console.log("\n✅ Results saved to benchmarks/bundle-size-results.md");
    })
    .catch(console.error);
}

export { measureBundleSize, generateBundleSizeReport, generateMarkdownTable };
