import { describe, it, expect } from "vitest";
import {
  // Case conversions
  camelCase,
  kebabCase,
  snakeCase,
  pascalCase,
  constantCase,
  dotCase,
  pathCase,
  sentenceCase,
  titleCase,
  // Text manipulation
  slugify,
  capitalize,
  reverse,
  truncate,
  stripHtml,
  escapeHtml,
  deburr,
  // Analysis
  wordCount,
  hashString,
  // Validation
  isEmail,
  isUrl,
  isASCII,
  // Padding
  pad,
  padStart,
  padEnd,
  // Template
  template,
  templateSafe,
  // Unicode
  graphemes,
  codePoints,
  toASCII,
  removeNonPrintable,
  normalizeWhitespace,
  // Advanced text
  excerpt,
  highlight,
  diff,
} from "../src/index.js";

describe("Null/Undefined Safety Checks", () => {
  describe("Case Conversion Functions", () => {
    it("should handle null/undefined in camelCase", () => {
      expect(camelCase(null as any)).toBe(null);
      expect(camelCase(undefined as any)).toBe(undefined);
      expect(camelCase("")).toBe("");
    });

    it("should handle null/undefined in kebabCase", () => {
      expect(kebabCase(null as any)).toBe(null);
      expect(kebabCase(undefined as any)).toBe(undefined);
      expect(kebabCase("")).toBe("");
    });

    it("should handle null/undefined in snakeCase", () => {
      expect(snakeCase(null as any)).toBe(null);
      expect(snakeCase(undefined as any)).toBe(undefined);
      expect(snakeCase("")).toBe("");
    });

    it("should handle null/undefined in pascalCase", () => {
      expect(pascalCase(null as any)).toBe(null);
      expect(pascalCase(undefined as any)).toBe(undefined);
      expect(pascalCase("")).toBe("");
    });

    it("should handle null/undefined in constantCase", () => {
      expect(constantCase(null as any)).toBe(null);
      expect(constantCase(undefined as any)).toBe(undefined);
      expect(constantCase("")).toBe("");
    });

    it("should handle null/undefined in dotCase", () => {
      expect(dotCase(null as any)).toBe(null);
      expect(dotCase(undefined as any)).toBe(undefined);
      expect(dotCase("")).toBe("");
    });

    it("should handle null/undefined in pathCase", () => {
      expect(pathCase(null as any)).toBe(null);
      expect(pathCase(undefined as any)).toBe(undefined);
      expect(pathCase("")).toBe("");
    });

    it("should handle null/undefined in sentenceCase", () => {
      expect(sentenceCase(null as any)).toBe(null);
      expect(sentenceCase(undefined as any)).toBe(undefined);
      expect(sentenceCase("")).toBe("");
    });

    it("should handle null/undefined in titleCase", () => {
      expect(titleCase(null as any)).toBe("");
      expect(titleCase(undefined as any)).toBe("");
      expect(titleCase("")).toBe("");
    });
  });

  describe("Text Manipulation Functions", () => {
    it("should handle null/undefined in slugify", () => {
      expect(slugify(null as any)).toBe(null);
      expect(slugify(undefined as any)).toBe(undefined);
      expect(slugify("")).toBe("");
    });

    it("should handle null/undefined in capitalize", () => {
      expect(capitalize(null as any)).toBe(null);
      expect(capitalize(undefined as any)).toBe(undefined);
      expect(capitalize("")).toBe("");
    });

    it("should handle null/undefined in reverse", () => {
      expect(reverse(null as any)).toBe(null);
      expect(reverse(undefined as any)).toBe(undefined);
      expect(reverse("")).toBe("");
    });

    it("should handle null/undefined in truncate", () => {
      expect(truncate(null as any, 10)).toBe(null);
      expect(truncate(undefined as any, 10)).toBe(undefined);
      expect(truncate("", 10)).toBe("");
    });

    it("should handle null/undefined in stripHtml", () => {
      expect(stripHtml(null as any)).toBe(null);
      expect(stripHtml(undefined as any)).toBe(undefined);
      expect(stripHtml("")).toBe("");
    });

    it("should handle null/undefined in escapeHtml", () => {
      expect(escapeHtml(null as any)).toBe(null);
      expect(escapeHtml(undefined as any)).toBe(undefined);
      expect(escapeHtml("")).toBe("");
    });

    it("should handle null/undefined in deburr", () => {
      expect(deburr(null as any)).toBe(null);
      expect(deburr(undefined as any)).toBe(undefined);
      expect(deburr("")).toBe("");
    });
  });

  describe("Analysis Functions", () => {
    it("should handle null/undefined in wordCount", () => {
      expect(wordCount(null as any)).toBe(0);
      expect(wordCount(undefined as any)).toBe(0);
      expect(wordCount("")).toBe(0);
    });

    it("should handle null/undefined in hashString", () => {
      expect(hashString(null as any)).toBe(0);
      expect(hashString(undefined as any)).toBe(0);
      // Empty string has a specific hash value (FNV offset basis)
      expect(hashString("")).toBe(2166136261);
    });
  });

  describe("Validation Functions", () => {
    it("should handle null/undefined in isEmail", () => {
      expect(isEmail(null as any)).toBe(false);
      expect(isEmail(undefined as any)).toBe(false);
      expect(isEmail("")).toBe(false);
    });

    it("should handle null/undefined in isUrl", () => {
      expect(isUrl(null as any)).toBe(false);
      expect(isUrl(undefined as any)).toBe(false);
      expect(isUrl("")).toBe(false);
    });

    it("should handle null/undefined in isASCII", () => {
      expect(isASCII(null as any)).toBe(false);
      expect(isASCII(undefined as any)).toBe(false);
      expect(isASCII("")).toBe(true); // Empty string is technically ASCII
    });
  });

  describe("Padding Functions", () => {
    it("should handle null/undefined in pad", () => {
      expect(pad(null as any, 10)).toBe(null);
      expect(pad(undefined as any, 10)).toBe(undefined);
      expect(pad("", 10)).toBe("          ");
    });

    it("should handle null/undefined in padStart", () => {
      expect(padStart(null as any, 10)).toBe(null);
      expect(padStart(undefined as any, 10)).toBe(undefined);
      expect(padStart("", 10)).toBe("          ");
    });

    it("should handle null/undefined in padEnd", () => {
      expect(padEnd(null as any, 10)).toBe(null);
      expect(padEnd(undefined as any, 10)).toBe(undefined);
      expect(padEnd("", 10)).toBe("          ");
    });
  });

  describe("Template Functions", () => {
    it("should handle null/undefined in template", () => {
      expect(template(null as any, {})).toBe(null);
      expect(template(undefined as any, {})).toBe(undefined);
      expect(template("", {})).toBe("");
    });

    it("should handle null/undefined in templateSafe", () => {
      expect(templateSafe(null as any, {})).toBe(null);
      expect(templateSafe(undefined as any, {})).toBe(undefined);
      expect(templateSafe("", {})).toBe("");
    });
  });

  describe("Unicode Functions", () => {
    it("should handle null/undefined in graphemes", () => {
      expect(graphemes(null as any)).toEqual([]);
      expect(graphemes(undefined as any)).toEqual([]);
      expect(graphemes("")).toEqual([]);
    });

    it("should handle null/undefined in codePoints", () => {
      expect(codePoints(null as any)).toEqual([]);
      expect(codePoints(undefined as any)).toEqual([]);
      expect(codePoints("")).toEqual([]);
    });

    it("should handle null/undefined in toASCII", () => {
      expect(toASCII(null as any)).toBe(null);
      expect(toASCII(undefined as any)).toBe(undefined);
      expect(toASCII("")).toBe("");
    });

    it("should handle null/undefined in removeNonPrintable", () => {
      expect(removeNonPrintable(null as any)).toBe(null);
      expect(removeNonPrintable(undefined as any)).toBe(undefined);
      expect(removeNonPrintable("")).toBe("");
    });

    it("should handle null/undefined in normalizeWhitespace", () => {
      expect(normalizeWhitespace(null as any)).toBe(null);
      expect(normalizeWhitespace(undefined as any)).toBe(undefined);
      expect(normalizeWhitespace("")).toBe("");
    });
  });

  describe("Advanced Text Functions", () => {
    it("should handle null/undefined in excerpt", () => {
      expect(excerpt(null as any, 50)).toBe(null);
      expect(excerpt(undefined as any, 50)).toBe(undefined);
      expect(excerpt("", 50)).toBe("");
    });

    it("should handle null/undefined in highlight", () => {
      expect(highlight(null as any, "test")).toBe("");
      expect(highlight(undefined as any, "test")).toBe("");
      expect(highlight("", "test")).toBe("");
    });

    it("should handle null/undefined in diff", () => {
      expect(diff(null as any, "test")).toBe("{+test+}");
      expect(diff(undefined as any, "test")).toBe("{+test+}");
      expect(diff("test", null as any)).toBe("[-test-]");
      expect(diff("test", undefined as any)).toBe("[-test-]");
      expect(diff("", "test")).toBe("{+test+}");
      expect(diff("test", "")).toBe("[-test-]");
    });
  });

  describe("Edge Cases", () => {
    it("should preserve distinction between null, undefined, and empty string", () => {
      // Most string -> string functions preserve the input
      expect(capitalize(null as any)).toBe(null);
      expect(capitalize(undefined as any)).toBe(undefined);
      expect(capitalize("")).toBe("");

      // String -> boolean functions return false for all falsy values
      expect(isEmail(null as any)).toBe(false);
      expect(isEmail(undefined as any)).toBe(false);
      expect(isEmail("")).toBe(false);

      // String -> number functions return appropriate defaults
      expect(wordCount(null as any)).toBe(0);
      expect(wordCount(undefined as any)).toBe(0);
      expect(wordCount("")).toBe(0);
    });

    it("should handle valid strings after null checks", () => {
      // Verify functions still work correctly with valid input
      expect(camelCase("hello-world")).toBe("helloWorld");
      expect(isEmail("test@example.com")).toBe(true);
      expect(wordCount("hello world")).toBe(2);
    });
  });
});
