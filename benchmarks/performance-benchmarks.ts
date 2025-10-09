#!/usr/bin/env tsx

import { Bench } from "tinybench";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Import functions from nano-string-utils
import * as nano from "../src/index.js";

// Import competitor libraries
import lodash from "lodash";
import * as esToolkit from "es-toolkit";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface BenchmarkResult {
  name: string;
  library: "nano" | "lodash" | "es-toolkit";
  opsPerSecond: number;
  margin: number;
}

interface FunctionBenchmark {
  name: string;
  nano: { opsPerSecond: number; margin: number } | null;
  lodash: { opsPerSecond: number; margin: number } | null;
  esToolkit: { opsPerSecond: number; margin: number } | null;
  winner: "nano" | "lodash" | "es-toolkit";
  speedup: number; // How much faster the winner is vs slowest
  nanoVsLodash?: number; // Multiplier: nano / lodash
  nanoVsEsToolkit?: number; // Multiplier: nano / es-toolkit
}

interface PerformanceData {
  generated: string;
  totalFunctions: number;
  functions: FunctionBenchmark[];
  summary: {
    nanoWins: number;
    lodashWins: number;
    esToolkitWins: number;
    averageSpeedup: number;
  };
}

async function runBenchmark(
  name: string,
  nanoFn: () => void,
  lodashFn?: () => void,
  esToolkitFn?: () => void
): Promise<FunctionBenchmark> {
  const bench = new Bench({ time: 500 });

  if (nanoFn) {
    bench.add("nano", nanoFn);
  }
  if (lodashFn) {
    bench.add("lodash", () => {
      try {
        lodashFn();
      } catch (error) {
        console.error(`Error in lodash ${name}:`, error);
      }
    });
  }
  if (esToolkitFn) {
    bench.add("es-toolkit", esToolkitFn);
  }

  await bench.run();

  const results = bench.tasks.map((task) => ({
    library: task.name as "nano" | "lodash" | "es-toolkit",
    opsPerSecond: task.result?.hz || 0,
    margin: task.result?.rme || 0,
  }));

  const nanoResult = results.find((r) => r.library === "nano");
  const lodashResult = results.find((r) => r.library === "lodash");
  const esToolkitResult = results.find((r) => r.library === "es-toolkit");

  // Determine winner
  const validResults = results.filter((r) => r.opsPerSecond > 0);
  const winner = validResults.reduce((max, curr) =>
    curr.opsPerSecond > max.opsPerSecond ? curr : max
  );

  const slowest = validResults.reduce((min, curr) =>
    curr.opsPerSecond < min.opsPerSecond ? curr : min
  );

  const speedup =
    slowest.opsPerSecond > 0 ? winner.opsPerSecond / slowest.opsPerSecond : 1;

  const nanoVsLodash =
    nanoResult && lodashResult && lodashResult.opsPerSecond > 0
      ? nanoResult.opsPerSecond / lodashResult.opsPerSecond
      : undefined;

  const nanoVsEsToolkit =
    nanoResult && esToolkitResult && esToolkitResult.opsPerSecond > 0
      ? nanoResult.opsPerSecond / esToolkitResult.opsPerSecond
      : undefined;

  return {
    name,
    nano: nanoResult
      ? { opsPerSecond: nanoResult.opsPerSecond, margin: nanoResult.margin }
      : null,
    lodash: lodashResult
      ? {
          opsPerSecond: lodashResult.opsPerSecond,
          margin: lodashResult.margin,
        }
      : null,
    esToolkit: esToolkitResult
      ? {
          opsPerSecond: esToolkitResult.opsPerSecond,
          margin: esToolkitResult.margin,
        }
      : null,
    winner: winner.library,
    speedup,
    nanoVsLodash,
    nanoVsEsToolkit,
  };
}

async function generatePerformanceBenchmarks(): Promise<void> {
  console.log("🏃 Running performance benchmarks...\n");

  const benchmarks: FunctionBenchmark[] = [];

  console.log("Benchmarking camelCase...");
  benchmarks.push(
    await runBenchmark(
      "camelCase",
      () => nano.camelCase("hello_world_test_string"),
      () => lodash.camelCase("hello_world_test_string"),
      () => esToolkit.camelCase("hello_world_test_string")
    )
  );

  console.log("Benchmarking kebabCase...");
  benchmarks.push(
    await runBenchmark(
      "kebabCase",
      () => nano.kebabCase("helloWorldTestString"),
      () => lodash.kebabCase("helloWorldTestString"),
      () => esToolkit.kebabCase("helloWorldTestString")
    )
  );

  console.log("Benchmarking snakeCase...");
  benchmarks.push(
    await runBenchmark(
      "snakeCase",
      () => nano.snakeCase("helloWorldTestString"),
      () => lodash.snakeCase("helloWorldTestString"),
      () => esToolkit.snakeCase("helloWorldTestString")
    )
  );

  console.log("Benchmarking pascalCase...");
  benchmarks.push(
    await runBenchmark(
      "pascalCase",
      () => nano.pascalCase("hello-world-test"),
      () => lodash.startCase("hello-world-test"), // lodash uses startCase for pascal
      () => esToolkit.pascalCase("hello-world-test")
    )
  );

  console.log("Benchmarking capitalize...");
  benchmarks.push(
    await runBenchmark(
      "capitalize",
      () => nano.capitalize("hello world"),
      () => lodash.capitalize("hello world"),
      () => esToolkit.capitalize("hello world")
    )
  );

  console.log("Benchmarking truncate (short)...");
  benchmarks.push(
    await runBenchmark(
      "truncate (short)",
      () => nano.truncate("hello world", 10),
      () => lodash.truncate("hello world", { length: 10 }),
      undefined // es-toolkit doesn't have truncate
    )
  );

  console.log("Benchmarking truncate (long)...");
  const longString =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(10);
  benchmarks.push(
    await runBenchmark(
      "truncate (long)",
      () => nano.truncate(longString, 100),
      () => lodash.truncate(longString, { length: 100 }),
      undefined // es-toolkit doesn't have truncate
    )
  );

  console.log("Benchmarking deburr...");
  benchmarks.push(
    await runBenchmark(
      "deburr",
      () => nano.deburr("déjà vu café résumé"),
      () => lodash.deburr("déjà vu café résumé"),
      () => esToolkit.deburr("déjà vu café résumé")
    )
  );

  console.log("Benchmarking pad...");
  benchmarks.push(
    await runBenchmark(
      "pad",
      () => nano.pad("test", 10),
      () => lodash.pad("test", 10),
      () => esToolkit.pad("test", 10)
    )
  );

  console.log("Benchmarking padStart...");
  benchmarks.push(
    await runBenchmark(
      "padStart",
      () => nano.padStart("test", 10),
      () => lodash.padStart("test", 10),
      undefined // es-toolkit doesn't have padStart
    )
  );

  console.log("Benchmarking padEnd...");
  benchmarks.push(
    await runBenchmark(
      "padEnd",
      () => nano.padEnd("test", 10),
      () => lodash.padEnd("test", 10),
      undefined // es-toolkit doesn't have padEnd
    )
  );

  console.log("Benchmarking template...");
  benchmarks.push(
    await runBenchmark(
      "template",
      () =>
        nano.template("Hello {{name}}, you have {{count}} messages", {
          name: "World",
          count: 5,
        }),
      () => {
        const compiled = lodash.template(
          "Hello <%= name %>, you have <%= count %> messages"
        );
        compiled({ name: "World", count: 5 });
      },
      undefined // es-toolkit doesn't have template
    )
  );

  console.log("Benchmarking escapeHtml...");
  benchmarks.push(
    await runBenchmark(
      "escapeHtml",
      () => nano.escapeHtml('<div class="test">Hello & "world"</div>'),
      () => lodash.escape('<div class="test">Hello & "world"</div>'),
      () => esToolkit.escape('<div class="test">Hello & "world"</div>')
    )
  );

  console.log("Benchmarking slugify...");
  benchmarks.push(
    await runBenchmark(
      "slugify",
      () => nano.slugify("Hello World! This is a Test String."),
      () => lodash.kebabCase("hello world! this is a test string."),
      () => esToolkit.kebabCase("hello world! this is a test string.")
    )
  );

  console.log("Benchmarking isEmail...");
  benchmarks.push(
    await runBenchmark(
      "isEmail",
      () => nano.isEmail("test@example.com"),
      undefined,
      undefined
    )
  );

  console.log("Benchmarking isUrl...");
  benchmarks.push(
    await runBenchmark(
      "isUrl",
      () => nano.isUrl("https://example.com/path"),
      undefined,
      undefined
    )
  );

  // Calculate summary
  const nanoWins = benchmarks.filter((b) => b.winner === "nano").length;
  const lodashWins = benchmarks.filter((b) => b.winner === "lodash").length;
  const esToolkitWins = benchmarks.filter(
    (b) => b.winner === "es-toolkit"
  ).length;
  const averageSpeedup =
    benchmarks.reduce((sum, b) => sum + b.speedup, 0) / benchmarks.length;

  const data: PerformanceData = {
    generated: new Date().toISOString(),
    totalFunctions: benchmarks.length,
    functions: benchmarks,
    summary: {
      nanoWins,
      lodashWins,
      esToolkitWins,
      averageSpeedup,
    },
  };

  // Write to JSON file
  const outputPath = path.join(__dirname, "performance-benchmarks.json");
  await fs.writeFile(outputPath, JSON.stringify(data, null, 2));

  // Also copy to docs public folder for the website
  const docsPublicPath = path.join(
    __dirname,
    "../docs-src/public/performance-benchmarks.json"
  );
  await fs.writeFile(docsPublicPath, JSON.stringify(data, null, 2));

  console.log("\n✅ Performance benchmarks generated!");
  console.log(`   - Total functions: ${data.totalFunctions}`);
  console.log(`   - Nano wins: ${nanoWins}`);
  console.log(`   - Lodash wins: ${lodashWins}`);
  console.log(`   - es-toolkit wins: ${esToolkitWins}`);
  console.log(`   - Average speedup: ${averageSpeedup.toFixed(2)}x`);
  console.log(`\n📄 Saved to: ${outputPath}`);
  console.log(`📄 Copied to: ${docsPublicPath}`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generatePerformanceBenchmarks().catch(console.error);
}
