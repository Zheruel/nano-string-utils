import { describe, it, expect } from "vitest";
import { fuzzyMatch } from "../src/fuzzyMatch";

describe("fuzzyMatch", () => {
  describe("basic matching", () => {
    it("should return perfect score for exact match", () => {
      const result = fuzzyMatch("abc", "abc");
      expect(result).toEqual({ matched: true, score: 0.95 }); // Case-insensitive by default
    });

    it("should return perfect score for case-sensitive exact match", () => {
      const result = fuzzyMatch("abc", "abc", { caseSensitive: true });
      expect(result).toEqual({ matched: true, score: 1.0 });
    });

    it("should match case-insensitively by default", () => {
      const result = fuzzyMatch("abc", "ABC");
      expect(result).toEqual({ matched: true, score: 0.95 });
    });

    it("should match characters in order with gaps", () => {
      const result = fuzzyMatch("ac", "abc");
      expect(result).toBeTruthy();
      expect(result?.matched).toBe(true);
      expect(result?.score).toBeGreaterThan(0.5);
    });

    it("should return null for characters in wrong order", () => {
      const result = fuzzyMatch("ba", "abc");
      expect(result).toBeNull();
    });

    it("should return null when query characters not found", () => {
      const result = fuzzyMatch("xyz", "abc");
      expect(result).toBeNull();
    });
  });

  describe("empty inputs", () => {
    it("should return score 0 for empty query", () => {
      const result = fuzzyMatch("", "test");
      expect(result).toEqual({ matched: false, score: 0 });
    });

    it("should return null for empty target", () => {
      const result = fuzzyMatch("test", "");
      expect(result).toBeNull();
    });

    it("should return score 0 for both empty", () => {
      const result = fuzzyMatch("", "");
      expect(result).toEqual({ matched: false, score: 0 });
    });
  });

  describe("real-world use cases", () => {
    it("should match command palette style queries", () => {
      const result = fuzzyMatch("gto", "goToLine");
      expect(result?.matched).toBe(true);
      expect(result?.score).toBeGreaterThan(0.5);
      expect(result?.score).toBeLessThan(0.7);
    });

    it("should match file finder queries", () => {
      const result = fuzzyMatch("usrctrl", "userController.js");
      expect(result?.matched).toBe(true);
      expect(result?.score).toBeGreaterThan(0.4);
      expect(result?.score).toBeLessThan(0.6);
    });

    it("should match with typos", () => {
      const result = fuzzyMatch("iphne", "iPhone");
      expect(result?.matched).toBe(true);
      expect(result?.score).toBeGreaterThan(0.6);
      expect(result?.score).toBeLessThan(0.8);
    });

    it("should match file paths", () => {
      const result = fuzzyMatch("index", "src/components/index.html");
      expect(result?.matched).toBe(true);
      expect(result?.score).toBeGreaterThan(0.2);
    });

    it("should match camelCase boundaries", () => {
      const result = fuzzyMatch("gc", "getUserController");
      expect(result?.matched).toBe(true);
      expect(result?.score).toBeGreaterThan(0.3);
    });

    it("should match PascalCase boundaries", () => {
      const result = fuzzyMatch("uc", "UserController");
      expect(result?.matched).toBe(true);
      expect(result?.score).toBeGreaterThan(0.3);
    });

    it("should match snake_case", () => {
      const result = fuzzyMatch("uc", "user_controller");
      expect(result?.matched).toBe(true);
      expect(result?.score).toBeGreaterThan(0.3);
    });

    it("should match kebab-case", () => {
      const result = fuzzyMatch("uc", "user-controller");
      expect(result?.matched).toBe(true);
      expect(result?.score).toBeGreaterThan(0.3);
    });
  });

  describe("scoring", () => {
    it("should score exact match highest", () => {
      const exact = fuzzyMatch("test", "test");
      const prefix = fuzzyMatch("test", "testing");
      const scattered = fuzzyMatch("test", "t_e_s_t");

      expect(exact?.score).toBeGreaterThan(prefix?.score || 0);
      expect(prefix?.score).toBeGreaterThan(scattered?.score || 0);
    });

    it("should score consecutive matches higher", () => {
      const consecutive = fuzzyMatch("abc", "abcdef");
      const scattered = fuzzyMatch("abc", "aXbXc");

      expect(consecutive?.score).toBeGreaterThan(scattered?.score || 0);
    });

    it("should score early matches higher", () => {
      const early = fuzzyMatch("abc", "abc___");
      const late = fuzzyMatch("abc", "___abc");

      expect(early?.score).toBeGreaterThan(late?.score || 0);
    });

    it("should give bonus for prefix matches", () => {
      const prefix = fuzzyMatch("user", "userController");
      expect(prefix?.score).toBeGreaterThanOrEqual(0.85);
    });

    it("should score word boundary matches higher", () => {
      const boundary = fuzzyMatch("uc", "user_controller");
      const middle = fuzzyMatch("uc", "tuucn");

      expect(boundary?.matched).toBe(true);
      expect(middle?.matched).toBe(true);
      expect(boundary?.score).toBeGreaterThan(middle?.score || 0);
    });

    it("should handle very long strings with distant matches", () => {
      const result = fuzzyMatch("ab", "a" + "x".repeat(100) + "b");
      expect(result?.matched).toBe(true);
      expect(result?.score).toBeLessThan(0.5);
    });
  });

  describe("options", () => {
    it("should respect caseSensitive option", () => {
      const insensitive = fuzzyMatch("ABC", "abc", { caseSensitive: false });
      const sensitive = fuzzyMatch("ABC", "abc", { caseSensitive: true });

      expect(insensitive?.matched).toBe(true);
      expect(sensitive).toBeNull();
    });

    it("should respect threshold option", () => {
      const lowScore = fuzzyMatch("ab", "a" + "x".repeat(50) + "b");
      const withThreshold = fuzzyMatch("ab", "a" + "x".repeat(50) + "b", {
        threshold: 0.5,
      });

      expect(lowScore?.matched).toBe(true);
      expect(lowScore?.score).toBeLessThan(0.5);
      expect(withThreshold).toBeNull();
    });

    it("should allow threshold of 0", () => {
      const result = fuzzyMatch("ab", "axxxxb", { threshold: 0 });
      expect(result?.matched).toBe(true);
    });
  });

  describe("edge cases", () => {
    it("should handle single character query", () => {
      const result = fuzzyMatch("a", "banana");
      expect(result?.matched).toBe(true);
      expect(result?.score).toBeGreaterThan(0);
    });

    it("should handle single character target", () => {
      const result = fuzzyMatch("a", "a");
      expect(result?.matched).toBe(true);
      expect(result?.score).toBe(0.95);
    });

    it("should handle query longer than target", () => {
      const result = fuzzyMatch("testing", "test");
      expect(result).toBeNull();
    });

    it("should handle special characters", () => {
      const result = fuzzyMatch("@#$", "@#$%^&");
      expect(result?.matched).toBe(true);
    });

    it("should handle unicode characters", () => {
      const result = fuzzyMatch("café", "café_latte");
      expect(result?.matched).toBe(true);
      expect(result?.score).toBeGreaterThanOrEqual(0.85);
    });

    it("should handle emojis", () => {
      const result = fuzzyMatch("😀🎉", "😀_party_🎉");
      expect(result?.matched).toBe(true);
    });

    it("should handle repeated characters in query", () => {
      const result = fuzzyMatch("aaa", "banana");
      expect(result?.matched).toBe(true);
    });

    it("should handle numbers", () => {
      const result = fuzzyMatch("123", "test123file");
      expect(result?.matched).toBe(true);
    });
  });

  describe("performance characteristics", () => {
    it("should handle reasonable strings efficiently", () => {
      const start = performance.now();
      for (let i = 0; i < 1000; i++) {
        fuzzyMatch("usrctrl", "userController.js");
      }
      const elapsed = performance.now() - start;
      expect(elapsed).toBeLessThan(100); // Should handle 1000 matches in < 100ms
    });
  });
});
