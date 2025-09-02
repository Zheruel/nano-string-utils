import { describe, it, expect } from "vitest";
import { padStart } from "../src/padStart";

describe("padStart", () => {
  describe("basic padding", () => {
    it("pads string to specified length", () => {
      expect(padStart("Hi", 5)).toBe("   Hi");
    });

    it("pads with zeros", () => {
      expect(padStart("5", 3, "0")).toBe("005");
    });

    it("pads with custom characters", () => {
      expect(padStart("Hi", 5, ".")).toBe("...Hi");
    });

    it("pads single character strings", () => {
      expect(padStart("x", 4, "-")).toBe("---x");
    });

    it("pads empty strings", () => {
      expect(padStart("", 3, "0")).toBe("000");
    });
  });

  describe("multi-character padding", () => {
    it("pads with multi-character patterns", () => {
      expect(padStart("Hi", 6, "=-")).toBe("=-=-Hi");
    });

    it("handles patterns that don't divide evenly", () => {
      expect(padStart("Hi", 7, "123")).toBe("12312Hi");
    });

    it("pads with emoji", () => {
      expect(padStart("Hi", 5, "🎉")).toBe("🎉🎉🎉Hi");
    });

    it("handles complex Unicode patterns", () => {
      expect(padStart("test", 8, "→←")).toBe("→←→←test");
    });

    it("truncates pattern when needed", () => {
      expect(padStart("X", 4, "abc")).toBe("abcX");
    });
  });

  describe("edge cases", () => {
    it("returns original string if already at target length", () => {
      expect(padStart("Hello", 5)).toBe("Hello");
    });

    it("returns original string if longer than target", () => {
      expect(padStart("Hello World", 5)).toBe("Hello World");
    });

    it("handles zero length", () => {
      expect(padStart("Hi", 0)).toBe("Hi");
    });

    it("handles negative length", () => {
      expect(padStart("Hi", -5)).toBe("Hi");
    });

    it("uses space when padding chars is empty", () => {
      expect(padStart("Hi", 5, "")).toBe("   Hi");
    });

    it("handles null padding chars", () => {
      expect(padStart("Hi", 5, null as any)).toBe("   Hi");
    });

    it("handles undefined padding chars", () => {
      expect(padStart("Hi", 5, undefined)).toBe("   Hi");
    });
  });

  describe("Unicode handling", () => {
    it("correctly handles emoji in the input string", () => {
      expect(padStart("🦄", 3, "-")).toBe("--🦄");
    });

    it("handles multi-codepoint characters", () => {
      // Note: Family emoji is actually 7 code points joined by zero-width joiners
      // Array.from splits it, so it appears longer than 1 visual character
      const family = "👨‍👩‍👧‍👦";
      const result = padStart(family, 10, "-");
      expect(result).toContain(family);
      expect(result.endsWith(family)).toBe(true);
      expect(result.startsWith("-")).toBe(true);
    });

    it("handles combining characters", () => {
      expect(padStart("é", 3, "-")).toBe("--é");
    });

    it("handles right-to-left text", () => {
      expect(padStart("مرحبا", 7, "-")).toBe("--مرحبا");
    });
  });

  describe("number formatting use cases", () => {
    it("formats numbers with leading zeros", () => {
      expect(padStart("42", 5, "0")).toBe("00042");
    });

    it("formats binary numbers", () => {
      expect(padStart("101", 8, "0")).toBe("00000101");
    });

    it("formats hex values", () => {
      expect(padStart("FF", 4, "0")).toBe("00FF");
    });

    it("creates fixed-width fields", () => {
      expect(padStart("123", 10, " ")).toBe("       123");
    });
  });

  describe("performance considerations", () => {
    it("handles very long padding efficiently", () => {
      const result = padStart("test", 1000, "-");
      expect(result.length).toBe(1000);
      expect(result.endsWith("test")).toBe(true);
      expect(result.startsWith("-")).toBe(true);
    });

    it("handles very long multi-char patterns", () => {
      const result = padStart("x", 100, "1234567890");
      expect(result.length).toBe(100);
      expect(result.endsWith("x")).toBe(true);
    });
  });
});
