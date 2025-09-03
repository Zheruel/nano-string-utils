import { describe, expect, it } from "vitest";
import { levenshteinNormalized } from "../src/levenshteinNormalized";

describe("levenshteinNormalized", () => {
  describe("identical strings", () => {
    it("returns 1 for identical strings", () => {
      expect(levenshteinNormalized("hello", "hello")).toBe(1);
      expect(levenshteinNormalized("", "")).toBe(1);
      expect(levenshteinNormalized("test", "test")).toBe(1);
      expect(levenshteinNormalized("123", "123")).toBe(1);
    });
  });

  describe("completely different strings", () => {
    it("returns 0 for empty vs non-empty strings", () => {
      expect(levenshteinNormalized("", "hello")).toBe(0);
      expect(levenshteinNormalized("world", "")).toBe(0);
    });

    it("returns 0 for completely different strings of same length", () => {
      expect(levenshteinNormalized("abc", "xyz")).toBe(0);
      expect(levenshteinNormalized("1111", "2222")).toBe(0);
    });
  });

  describe("partial similarity", () => {
    it("calculates correct similarity for single character differences", () => {
      expect(levenshteinNormalized("cat", "bat")).toBeCloseTo(0.667, 3);
      expect(levenshteinNormalized("cat", "cut")).toBeCloseTo(0.667, 3);
      expect(levenshteinNormalized("cat", "car")).toBeCloseTo(0.667, 3);
    });

    it("calculates correct similarity for insertions and deletions", () => {
      expect(levenshteinNormalized("cat", "cats")).toBe(0.75);
      expect(levenshteinNormalized("cats", "cat")).toBe(0.75);
      expect(levenshteinNormalized("hello", "helo")).toBe(0.8);
    });

    it("calculates correct similarity for multiple edits", () => {
      expect(levenshteinNormalized("kitten", "sitting")).toBeCloseTo(0.571, 3);
      expect(levenshteinNormalized("saturday", "sunday")).toBe(0.625);
      expect(levenshteinNormalized("hello", "world")).toBeCloseTo(0.2, 10);
    });
  });

  describe("real-world use cases", () => {
    it("detects high similarity for typos", () => {
      expect(levenshteinNormalized("example", "exmaple")).toBeCloseTo(0.714, 3);
      expect(levenshteinNormalized("necessary", "neccessary")).toBe(0.9);
      expect(levenshteinNormalized("separate", "seperate")).toBe(0.875);
      expect(levenshteinNormalized("definitely", "definately")).toBe(0.9);
    });

    it("detects moderate similarity for spelling variations", () => {
      expect(levenshteinNormalized("color", "colour")).toBeCloseTo(0.833, 3);
      expect(levenshteinNormalized("organize", "organise")).toBe(0.875);
      expect(levenshteinNormalized("center", "centre")).toBeCloseTo(0.667, 3);
    });

    it("works for fuzzy matching thresholds", () => {
      // Common threshold for "similar enough" is 0.8
      const threshold = 0.8;

      // Should match
      expect(levenshteinNormalized("hello", "hallo") >= threshold).toBe(true);
      expect(levenshteinNormalized("test", "tests") >= threshold).toBe(true);
      expect(levenshteinNormalized("world", "word") >= threshold).toBe(true);

      // Should not match
      expect(levenshteinNormalized("hello", "goodbye") >= threshold).toBe(
        false
      );
      expect(levenshteinNormalized("cat", "dog") >= threshold).toBe(false);
    });
  });

  describe("unicode and special characters", () => {
    it("handles emoji correctly", () => {
      expect(levenshteinNormalized("😀", "😀")).toBe(1);
      expect(levenshteinNormalized("😀", "😃")).toBe(0.5); // Different emoji (surrogate pairs, differ by 1 char in 2)
      expect(levenshteinNormalized("hello😀", "hello😃")).toBeCloseTo(0.857, 3);
    });

    it("handles accented characters", () => {
      expect(levenshteinNormalized("café", "cafe")).toBe(0.75);
      expect(levenshteinNormalized("naïve", "naive")).toBe(0.8);
    });
  });

  describe("edge cases", () => {
    it("handles very long strings", () => {
      const long1 = "a".repeat(100);
      const long2 = "a".repeat(99) + "b";
      expect(levenshteinNormalized(long1, long2)).toBe(0.99);
    });

    it("handles strings with different lengths", () => {
      expect(levenshteinNormalized("a", "abc")).toBeCloseTo(0.333, 3);
      expect(levenshteinNormalized("abc", "a")).toBeCloseTo(0.333, 3);
      expect(levenshteinNormalized("ab", "abcd")).toBe(0.5);
    });

    it("is symmetric", () => {
      expect(levenshteinNormalized("hello", "world")).toBe(
        levenshteinNormalized("world", "hello")
      );
      expect(levenshteinNormalized("cat", "dog")).toBe(
        levenshteinNormalized("dog", "cat")
      );
    });

    it("returns values in valid range [0, 1]", () => {
      const testCases = [
        ["", ""],
        ["", "a"],
        ["a", ""],
        ["a", "a"],
        ["a", "b"],
        ["hello", "world"],
        ["test", "testing"],
      ];

      for (const [a, b] of testCases) {
        const score = levenshteinNormalized(a, b);
        expect(score).toBeGreaterThanOrEqual(0);
        expect(score).toBeLessThanOrEqual(1);
      }
    });
  });

  describe("similarity scoring examples", () => {
    it("provides intuitive similarity scores", () => {
      // Very similar (> 0.9)
      expect(levenshteinNormalized("test", "test")).toBe(1);
      expect(levenshteinNormalized("hello", "hallo")).toBe(0.8);

      // Similar (0.7 - 0.9)
      expect(levenshteinNormalized("cat", "bat")).toBeCloseTo(0.667, 3);
      expect(levenshteinNormalized("example", "examples")).toBe(0.875);

      // Somewhat similar (0.5 - 0.7)
      expect(levenshteinNormalized("hello", "help")).toBe(0.6);
      expect(levenshteinNormalized("world", "word")).toBe(0.8);

      // Dissimilar (< 0.5)
      expect(levenshteinNormalized("hello", "world")).toBeCloseTo(0.2, 10);
      expect(levenshteinNormalized("cat", "dog")).toBe(0);
    });
  });
});
