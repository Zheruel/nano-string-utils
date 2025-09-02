import { describe, it, expect } from "vitest";
import { padEnd } from "../src/padEnd";

describe("padEnd", () => {
  describe("basic padding", () => {
    it("pads string to specified length", () => {
      expect(padEnd("Hi", 5)).toBe("Hi   ");
    });

    it("pads with dots", () => {
      expect(padEnd("Hi", 5, ".")).toBe("Hi...");
    });

    it("pads with zeros", () => {
      expect(padEnd("5", 3, "0")).toBe("500");
    });

    it("pads single character strings", () => {
      expect(padEnd("x", 4, "-")).toBe("x---");
    });

    it("pads empty strings", () => {
      expect(padEnd("", 3, "0")).toBe("000");
    });
  });

  describe("multi-character padding", () => {
    it("pads with multi-character patterns", () => {
      expect(padEnd("Hi", 6, "=-")).toBe("Hi=-=-");
    });

    it("handles patterns that don't divide evenly", () => {
      expect(padEnd("Hi", 7, "123")).toBe("Hi12312");
    });

    it("pads with emoji", () => {
      expect(padEnd("Hi", 5, "🎉")).toBe("Hi🎉🎉🎉");
    });

    it("handles complex Unicode patterns", () => {
      expect(padEnd("test", 8, "→←")).toBe("test→←→←");
    });

    it("truncates pattern when needed", () => {
      expect(padEnd("X", 4, "abc")).toBe("Xabc");
    });
  });

  describe("edge cases", () => {
    it("returns original string if already at target length", () => {
      expect(padEnd("Hello", 5)).toBe("Hello");
    });

    it("returns original string if longer than target", () => {
      expect(padEnd("Hello World", 5)).toBe("Hello World");
    });

    it("handles zero length", () => {
      expect(padEnd("Hi", 0)).toBe("Hi");
    });

    it("handles negative length", () => {
      expect(padEnd("Hi", -5)).toBe("Hi");
    });

    it("uses space when padding chars is empty", () => {
      expect(padEnd("Hi", 5, "")).toBe("Hi   ");
    });

    it("handles null padding chars", () => {
      expect(padEnd("Hi", 5, null as any)).toBe("Hi   ");
    });

    it("handles undefined padding chars", () => {
      expect(padEnd("Hi", 5, undefined)).toBe("Hi   ");
    });
  });

  describe("Unicode handling", () => {
    it("correctly handles emoji in the input string", () => {
      expect(padEnd("🦄", 3, "-")).toBe("🦄--");
    });

    it("handles multi-codepoint characters", () => {
      // Note: Family emoji is actually 7 code points joined by zero-width joiners
      // Array.from splits it, so it appears longer than 1 visual character
      const family = "👨‍👩‍👧‍👦";
      const result = padEnd(family, 10, "-");
      expect(result).toContain(family);
      expect(result.startsWith(family)).toBe(true);
      expect(result.endsWith("-")).toBe(true);
    });

    it("handles combining characters", () => {
      expect(padEnd("é", 3, "-")).toBe("é--");
    });

    it("handles right-to-left text", () => {
      expect(padEnd("مرحبا", 7, "-")).toBe("مرحبا--");
    });
  });

  describe("text formatting use cases", () => {
    it("creates ellipsis effect", () => {
      expect(padEnd("Loading", 10, ".")).toBe("Loading...");
    });

    it("creates table-like alignment", () => {
      expect(padEnd("Name", 10, " ")).toBe("Name      ");
    });

    it("creates separator lines", () => {
      expect(padEnd("Title", 15, "-")).toBe("Title----------");
    });

    it("formats list items", () => {
      expect(padEnd("Item 1", 20, " .")).toBe("Item 1 . . . . . . .");
    });
  });

  describe("performance considerations", () => {
    it("handles very long padding efficiently", () => {
      const result = padEnd("test", 1000, "-");
      expect(result.length).toBe(1000);
      expect(result.startsWith("test")).toBe(true);
      expect(result.endsWith("-")).toBe(true);
    });

    it("handles very long multi-char patterns", () => {
      const result = padEnd("x", 100, "1234567890");
      expect(result.length).toBe(100);
      expect(result.startsWith("x")).toBe(true);
    });
  });
});
