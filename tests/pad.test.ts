import { describe, it, expect } from "vitest";
import { pad } from "../src/pad";

describe("pad", () => {
  describe("basic padding", () => {
    it("pads string to specified length", () => {
      expect(pad("Hi", 6)).toBe("  Hi  ");
    });

    it("pads with custom characters", () => {
      expect(pad("Hi", 6, "-")).toBe("--Hi--");
    });

    it("handles odd padding lengths", () => {
      expect(pad("Hi", 7, "-")).toBe("--Hi---");
    });

    it("pads single character strings", () => {
      expect(pad("x", 5)).toBe("  x  ");
    });

    it("pads empty strings", () => {
      expect(pad("", 4, "-")).toBe("----");
    });
  });

  describe("multi-character padding", () => {
    it("pads with multi-character patterns", () => {
      expect(pad("Hi", 8, "=-")).toBe("=-=Hi=-=");
    });

    it("handles patterns that don't divide evenly", () => {
      expect(pad("Hi", 7, "123")).toBe("12Hi123");
    });

    it("pads with emoji", () => {
      expect(pad("Hi", 6, "🎉")).toBe("🎉🎉Hi🎉🎉");
    });

    it("handles complex Unicode patterns", () => {
      expect(pad("test", 8, "→←")).toBe("→←test→←");
    });
  });

  describe("edge cases", () => {
    it("returns original string if already at target length", () => {
      expect(pad("Hello", 5)).toBe("Hello");
    });

    it("returns original string if longer than target", () => {
      expect(pad("Hello World", 5)).toBe("Hello World");
    });

    it("handles zero length", () => {
      expect(pad("Hi", 0)).toBe("Hi");
    });

    it("handles negative length", () => {
      expect(pad("Hi", -5)).toBe("Hi");
    });

    it("uses space when padding chars is empty", () => {
      expect(pad("Hi", 6, "")).toBe("  Hi  ");
    });

    it("handles null padding chars", () => {
      expect(pad("Hi", 6, null as any)).toBe("  Hi  ");
    });

    it("handles undefined padding chars", () => {
      expect(pad("Hi", 6, undefined)).toBe("  Hi  ");
    });
  });

  describe("Unicode handling", () => {
    it("correctly handles emoji in the input string", () => {
      expect(pad("🦄", 5, "-")).toBe("--🦄--");
    });

    it("handles multi-codepoint characters", () => {
      // Note: Family emoji is actually 7 code points joined by zero-width joiners
      // Array.from splits it, so it appears longer than 1 visual character
      const family = "👨‍👩‍👧‍👦";
      const result = pad(family, 10, "-");
      expect(result).toContain(family);
      expect(result.startsWith("-")).toBe(true);
      expect(result.endsWith("-")).toBe(true);
    });

    it("handles combining characters", () => {
      expect(pad("é", 5, "-")).toBe("--é--");
    });

    it("handles right-to-left text", () => {
      expect(pad("مرحبا", 9, "-")).toBe("--مرحبا--");
    });
  });

  describe("centering behavior", () => {
    it("centers even padding", () => {
      expect(pad("test", 8, "-")).toBe("--test--");
    });

    it("adds extra padding to the right for odd amounts", () => {
      expect(pad("test", 9, "-")).toBe("--test---");
    });

    it("maintains centering with multi-char patterns", () => {
      expect(pad("X", 7, "12")).toBe("121X121");
    });

    it("centers very short strings", () => {
      expect(pad("a", 11, "-")).toBe("-----a-----");
    });
  });

  describe("performance considerations", () => {
    it("handles very long padding efficiently", () => {
      const result = pad("test", 1000, "-");
      expect(result.length).toBe(1000);
      expect(result).toContain("test");
      expect(result.startsWith("-")).toBe(true);
      expect(result.endsWith("-")).toBe(true);
    });

    it("handles very long multi-char patterns", () => {
      const result = pad("x", 100, "1234567890");
      expect(result.length).toBe(100);
      expect(result).toContain("x");
    });
  });
});
