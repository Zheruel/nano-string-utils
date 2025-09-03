import { describe, expect, it } from "vitest";
import { levenshtein } from "../src/levenshtein";

describe("levenshtein", () => {
  describe("basic cases", () => {
    it("returns 0 for identical strings", () => {
      expect(levenshtein("", "")).toBe(0);
      expect(levenshtein("hello", "hello")).toBe(0);
      expect(levenshtein("123", "123")).toBe(0);
    });

    it("handles empty strings", () => {
      expect(levenshtein("", "abc")).toBe(3);
      expect(levenshtein("abc", "")).toBe(3);
      expect(levenshtein("hello", "")).toBe(5);
      expect(levenshtein("", "world")).toBe(5);
    });

    it("calculates single character differences", () => {
      expect(levenshtein("a", "b")).toBe(1);
      expect(levenshtein("a", "ab")).toBe(1);
      expect(levenshtein("ab", "a")).toBe(1);
    });
  });

  describe("single operations", () => {
    it("handles substitutions", () => {
      expect(levenshtein("cat", "bat")).toBe(1);
      expect(levenshtein("cat", "cut")).toBe(1);
      expect(levenshtein("cat", "car")).toBe(1);
    });

    it("handles insertions", () => {
      expect(levenshtein("cat", "cats")).toBe(1);
      expect(levenshtein("cat", "cart")).toBe(1);
      expect(levenshtein("cat", "scat")).toBe(1);
    });

    it("handles deletions", () => {
      expect(levenshtein("cats", "cat")).toBe(1);
      expect(levenshtein("cart", "cat")).toBe(1);
      expect(levenshtein("scat", "cat")).toBe(1);
    });
  });

  describe("real-world typos", () => {
    it("detects common typing mistakes", () => {
      expect(levenshtein("example", "exmaple")).toBe(2); // transposition
      expect(levenshtein("necessary", "neccessary")).toBe(1); // double letter
      expect(levenshtein("separate", "seperate")).toBe(1); // missing letter
      expect(levenshtein("definitely", "definately")).toBe(1); // common misspelling
    });

    it("handles spelling variations", () => {
      expect(levenshtein("color", "colour")).toBe(1);
      expect(levenshtein("organize", "organise")).toBe(1);
      expect(levenshtein("center", "centre")).toBe(2);
    });

    it("calculates distances for longer transformations", () => {
      expect(levenshtein("kitten", "sitting")).toBe(3);
      expect(levenshtein("saturday", "sunday")).toBe(3);
      expect(levenshtein("book", "back")).toBe(2);
    });
  });

  describe("unicode and special characters", () => {
    it("handles emoji correctly", () => {
      expect(levenshtein("😀", "😃")).toBe(1);
      expect(levenshtein("👍", "👎")).toBe(1);
      expect(levenshtein("😀😃", "😀😄")).toBe(1);
      expect(levenshtein("hello😀", "hello😃")).toBe(1);
    });

    it("handles accented characters", () => {
      expect(levenshtein("café", "cafe")).toBe(1);
      expect(levenshtein("naïve", "naive")).toBe(1);
      expect(levenshtein("résumé", "resume")).toBe(2);
    });

    it("handles multi-byte characters", () => {
      expect(levenshtein("日本", "日本語")).toBe(1);
      expect(levenshtein("你好", "您好")).toBe(1);
      expect(levenshtein("мир", "мира")).toBe(1);
    });
  });

  describe("maxDistance parameter", () => {
    it("returns Infinity when distance exceeds maxDistance", () => {
      expect(levenshtein("hello", "helicopter", 3)).toBe(Infinity);
      expect(levenshtein("cat", "elephant", 2)).toBe(Infinity);
      expect(levenshtein("abc", "xyz", 2)).toBe(Infinity);
    });

    it("returns actual distance when within maxDistance", () => {
      expect(levenshtein("hello", "hallo", 3)).toBe(1);
      expect(levenshtein("cat", "cats", 2)).toBe(1);
      expect(levenshtein("test", "tent", 5)).toBe(1);
    });

    it("optimizes for early termination with length difference", () => {
      expect(levenshtein("a", "abcdefgh", 3)).toBe(Infinity);
      expect(levenshtein("short", "verylongstring", 5)).toBe(Infinity);
    });

    it("handles edge cases with maxDistance", () => {
      expect(levenshtein("abc", "def", 3)).toBe(3);
      expect(levenshtein("abc", "def", 2)).toBe(Infinity);
      expect(levenshtein("same", "same", 0)).toBe(0);
    });
  });

  describe("performance edge cases", () => {
    it("handles long identical strings efficiently", () => {
      const longString = "a".repeat(100);
      expect(levenshtein(longString, longString)).toBe(0);
    });

    it("calculates distance for completely different long strings", () => {
      expect(levenshtein("a".repeat(50), "b".repeat(50))).toBe(50);
    });

    it("handles strings with different lengths efficiently", () => {
      expect(levenshtein("abc", "abcdefghij")).toBe(7);
      expect(levenshtein("abcdefghij", "abc")).toBe(7);
    });

    it("optimizes memory by swapping strings internally", () => {
      // Should give same result regardless of parameter order
      const short = "cat";
      const long = "catastrophe";
      expect(levenshtein(short, long)).toBe(levenshtein(long, short));
      expect(levenshtein(short, long)).toBe(8);
    });
  });

  describe("special string patterns", () => {
    it("handles repeated characters", () => {
      expect(levenshtein("aaa", "aaaa")).toBe(1);
      expect(levenshtein("aaaa", "aaa")).toBe(1);
      expect(levenshtein("aaa", "bbb")).toBe(3);
    });

    it("handles palindromes", () => {
      expect(levenshtein("racecar", "racecar")).toBe(0);
      expect(levenshtein("racecar", "racecars")).toBe(1);
      expect(levenshtein("level", "lever")).toBe(1);
    });

    it("handles case-sensitive comparisons", () => {
      expect(levenshtein("Hello", "hello")).toBe(1);
      expect(levenshtein("WORLD", "world")).toBe(5);
      expect(levenshtein("Test", "test")).toBe(1);
    });
  });
});
