/**
 * Deno compatibility test for nano-string-utils
 * Run with: deno run --allow-read tests/runtime-tests/deno-test.ts
 */

// Import from local TypeScript source files (Deno can run TypeScript directly)
import {
  slugify,
  camelCase,
  kebabCase,
  snakeCase,
  pascalCase,
  truncate,
  capitalize,
  reverse,
  isEmail,
  isUrl,
  wordCount,
  stripHtml,
  escapeHtml,
  titleCase,
  constantCase,
  dotCase,
  pathCase,
  sentenceCase,
  deburr,
  pad,
  padStart,
  padEnd,
  template,
  graphemes,
  codePoints,
  isASCII,
  normalizeWhitespace,
  removeNonPrintable,
  toASCII,
  excerpt,
  highlight,
  diff,
  levenshtein,
  fuzzyMatch,
  pluralize,
  singularize,
} from "../../src/index.ts";

// Test results tracker
let passed = 0;
let failed = 0;
const errors: string[] = [];

function test(name: string, fn: () => boolean) {
  try {
    if (fn()) {
      passed++;
      console.log(`✅ ${name}`);
    } else {
      failed++;
      errors.push(`${name}: assertion failed`);
      console.log(`❌ ${name}`);
    }
  } catch (error) {
    failed++;
    errors.push(`${name}: ${error}`);
    console.log(`❌ ${name}: ${error}`);
  }
}

// Run tests for each function
console.log("🦕 Testing nano-string-utils in Deno...\n");

// Case conversion tests
test("slugify", () => slugify("Hello World!") === "hello-world");
test("camelCase", () => camelCase("hello-world") === "helloWorld");
test("kebabCase", () => kebabCase("HelloWorld") === "hello-world");
test("snakeCase", () => snakeCase("HelloWorld") === "hello_world");
test("pascalCase", () => pascalCase("hello-world") === "HelloWorld");
test("titleCase", () => titleCase("hello world") === "Hello World");
test("constantCase", () => constantCase("hello world") === "HELLO_WORLD");
test("dotCase", () => dotCase("hello world") === "hello.world");
test("pathCase", () => pathCase("hello world") === "hello/world");
test("sentenceCase", () => sentenceCase("hello world") === "Hello world");

// String manipulation tests
test("truncate", () => truncate("Hello World", 5) === "He...");
test("capitalize", () => capitalize("hello") === "Hello");
test("reverse", () => reverse("hello") === "olleh");
test("pad", () => pad("hi", 5) === " hi  ");
test("padStart", () => padStart("hi", 5, "*") === "***hi");
test("padEnd", () => padEnd("hi", 5, "*") === "hi***");
test("deburr", () => deburr("héllo") === "hello");

// Validation tests
test("isEmail", () => isEmail("test@example.com") === true);
test("isEmail (invalid)", () => isEmail("invalid") === false);
test("isUrl", () => isUrl("https://example.com") === true);
test("isUrl (invalid)", () => isUrl("not-a-url") === false);
test("isASCII", () => isASCII("hello") === true);
test("isASCII (unicode)", () => isASCII("héllo") === false);

// Utility tests
test("wordCount", () => wordCount("Hello world test") === 3);
test("stripHtml", () => stripHtml("<p>Hello</p>") === "Hello");
test("escapeHtml", () => escapeHtml("<div>") === "&lt;div&gt;");

// Unicode tests
test("graphemes", () => graphemes("👨‍👩‍👧‍👦").length === 1);
test("codePoints", () => codePoints("AB").length === 2);
test("normalizeWhitespace", () =>
  normalizeWhitespace("hello  world") === "hello world");
test("removeNonPrintable", () =>
  removeNonPrintable("hello\x00world") === "helloworld");
test("toASCII", () => toASCII("héllo") === "hello");

// Text processing tests
test("excerpt", () => excerpt("Hello world test", 10).startsWith("Hello"));
test("highlight", () => highlight("Hello world", "world").includes("<mark>"));
test("diff", () => {
  const result = diff("hello", "hallo");
  return typeof result === "string" && result.includes("+");
});
test("levenshtein", () => levenshtein("hello", "hallo") === 1);
test("fuzzyMatch", () => {
  const result = fuzzyMatch("hllo", "hello"); // fuzzyMatch looks for subsequence
  return result !== null && result.score > 0.5;
});
test("pluralize", () => pluralize("cat") === "cats");
test("singularize", () => singularize("cats") === "cat");

// Template test
test("template", () => {
  const result = template("Hello {{name}}", { name: "World" });
  return result === "Hello World";
});

// Print results
console.log("\n📊 Test Results:");
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);

if (failed > 0) {
  console.log("\n❌ Failed tests:");
  errors.forEach((error) => console.log(`  - ${error}`));
  // @ts-ignore - Deno global exists when running in Deno
  if (typeof globalThis !== "undefined" && "Deno" in globalThis) {
    // @ts-ignore
    globalThis.Deno.exit(1);
  } else if (typeof process !== "undefined") {
    process.exit(1);
  }
}

console.log("\n🎉 All Deno tests passed successfully!");
