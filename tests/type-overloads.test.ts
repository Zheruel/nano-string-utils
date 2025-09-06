/**
 * TypeScript type tests for function overloads
 * These tests verify that the overloads provide better type inference
 */

import { describe, test, expect } from "vitest";
import {
  truncate,
  pad,
  padStart,
  padEnd,
  template,
  templateSafe,
  excerpt,
  highlight,
  fuzzyMatch,
  memoize,
  randomString,
  toASCII,
  removeNonPrintable,
} from "../src/index.js";

describe("Function Overload Type Tests", () => {
  test("truncate overloads", () => {
    // With default suffix
    const result1 = truncate("hello world", 5);
    expect(typeof result1).toBe("string");
    expect(result1).toBe("he...");

    // With custom suffix
    const result2 = truncate("hello world", 5, "…");
    expect(typeof result2).toBe("string");
    expect(result2).toBe("hell…");
  });

  test("pad overloads", () => {
    // With default padding
    const result1 = pad("hi", 5);
    expect(typeof result1).toBe("string");
    expect(result1).toBe(" hi  ");

    // With custom padding
    const result2 = pad("hi", 5, "-");
    expect(typeof result2).toBe("string");
    expect(result2).toBe("-hi--");
  });

  test("padStart overloads", () => {
    // With default padding
    const result1 = padStart("5", 3);
    expect(typeof result1).toBe("string");
    expect(result1).toBe("  5");

    // With custom padding
    const result2 = padStart("5", 3, "0");
    expect(typeof result2).toBe("string");
    expect(result2).toBe("005");
  });

  test("padEnd overloads", () => {
    // With default padding
    const result1 = padEnd("hi", 5);
    expect(typeof result1).toBe("string");
    expect(result1).toBe("hi   ");

    // With custom padding
    const result2 = padEnd("hi", 5, ".");
    expect(typeof result2).toBe("string");
    expect(result2).toBe("hi...");
  });

  test("template overloads", () => {
    // With default options
    const result1 = template("Hello {{name}}", { name: "World" });
    expect(typeof result1).toBe("string");
    expect(result1).toBe("Hello World");

    // With custom options
    const result2 = template(
      "Hello ${name}",
      { name: "World" },
      {
        delimiters: ["${", "}"],
      }
    );
    expect(typeof result2).toBe("string");
    expect(result2).toBe("Hello World");
  });

  test("templateSafe overloads", () => {
    // With default options
    const result1 = templateSafe("Hello {{name}}", { name: "<script>" });
    expect(typeof result1).toBe("string");
    expect(result1).toBe("Hello &lt;script&gt;");

    // With custom options
    const result2 = templateSafe(
      "Hello ${name}",
      { name: "<script>" },
      {
        delimiters: ["${", "}"],
      }
    );
    expect(typeof result2).toBe("string");
    expect(result2).toBe("Hello &lt;script&gt;");
  });

  test("excerpt overloads", () => {
    // With default suffix
    const result1 = excerpt("The quick brown fox", 10);
    expect(typeof result1).toBe("string");
    expect(result1).toBe("The quick...");

    // With custom suffix
    const result2 = excerpt("The quick brown fox", 10, "…");
    expect(typeof result2).toBe("string");
    expect(result2).toBe("The quick…");
  });

  test("highlight overloads", () => {
    // With single term
    const result1 = highlight("The quick brown fox", "quick");
    expect(typeof result1).toBe("string");
    expect(result1).toBe("The <mark>quick</mark> brown fox");

    // With array of terms
    const result2 = highlight("The quick brown fox", ["quick", "fox"]);
    expect(typeof result2).toBe("string");
    expect(result2).toBe("The <mark>quick</mark> brown <mark>fox</mark>");

    // With single term and options
    const result3 = highlight("The quick brown fox", "quick", {
      caseSensitive: true,
    });
    expect(typeof result3).toBe("string");
    expect(result3).toBe("The <mark>quick</mark> brown fox");

    // With array and options
    const result4 = highlight("The quick brown fox", ["quick"], {
      wrapper: ["**", "**"],
    });
    expect(typeof result4).toBe("string");
    expect(result4).toBe("The **quick** brown fox");
  });

  test("fuzzyMatch overloads", () => {
    // With default options
    const result1 = fuzzyMatch("qck", "quick");
    expect(result1).not.toBeNull();
    if (result1) {
      expect(result1.matched).toBe(true);
      expect(typeof result1.score).toBe("number");
    }

    // With custom options - using a lower threshold to ensure match
    const result2 = fuzzyMatch("qck", "quick", {
      caseSensitive: false,
      threshold: 0.3,
    });
    expect(result2).not.toBeNull();
    if (result2) {
      expect(result2.matched).toBe(true);
      expect(typeof result2.score).toBe("number");
    }
  });

  test("memoize overloads", () => {
    const fn = (a: number, b: number) => a + b;

    // With default options
    const memoized1 = memoize(fn);
    expect(typeof memoized1).toBe("function");
    expect(memoized1(1, 2)).toBe(3);

    // With custom options
    const memoized2 = memoize(fn, { maxSize: 50 });
    expect(typeof memoized2).toBe("function");
    expect(memoized2(2, 3)).toBe(5);

    // Verify function still works correctly
    const result = memoized1(1, 2);
    expect(typeof result).toBe("number");
    expect(result).toBe(3);
  });

  test("randomString overloads", () => {
    // With default charset
    const result1 = randomString(10);
    expect(typeof result1).toBe("string");
    expect(result1.length).toBe(10);

    // With custom charset
    const result2 = randomString(10, "abc123");
    expect(typeof result2).toBe("string");
    expect(result2.length).toBe(10);
    // Verify it only contains characters from the charset
    expect(result2).toMatch(/^[abc123]+$/);
  });

  test("toASCII overloads", () => {
    // With default options
    const result1 = toASCII("café");
    expect(typeof result1).toBe("string");
    expect(result1).toBe("cafe");

    // With custom options
    const result2 = toASCII("привет", { placeholder: "?" });
    expect(typeof result2).toBe("string");
    // Cyrillic is transliterated, not replaced with placeholder
    expect(result2).toBe("privet");
  });

  test("removeNonPrintable overloads", () => {
    // With default options (preserves spaces by default)
    const result1 = removeNonPrintable("hello\x00world");
    expect(typeof result1).toBe("string");
    expect(result1).toBe("helloworld"); // Null character is removed

    // With custom options
    const result2 = removeNonPrintable("hello\nworld", {
      keepNewlines: true,
    });
    expect(typeof result2).toBe("string");
    expect(result2).toBe("hello\nworld");
  });
});
