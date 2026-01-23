import { describe, it, expect } from "vitest";
import { trimStart } from "../src/trimStart";

describe("trimStart", () => {
  describe("default whitespace trimming", () => {
    it("trims leading spaces", () => {
      expect(trimStart("  hello")).toBe("hello");
    });

    it("trims leading tabs", () => {
      expect(trimStart("\t\thello")).toBe("hello");
    });

    it("trims leading newlines", () => {
      expect(trimStart("\n\nhello")).toBe("hello");
    });

    it("trims leading carriage returns", () => {
      expect(trimStart("\r\rhello")).toBe("hello");
    });

    it("trims mixed whitespace", () => {
      expect(trimStart(" \t\n\rhello")).toBe("hello");
    });

    it("preserves trailing whitespace", () => {
      expect(trimStart("  hello  ")).toBe("hello  ");
    });

    it("returns empty string for whitespace-only input", () => {
      expect(trimStart("   ")).toBe("");
    });
  });

  describe("custom character trimming", () => {
    it("trims single custom character", () => {
      expect(trimStart("///path", "/")).toBe("path");
    });

    it("trims dashes", () => {
      expect(trimStart("---title", "-")).toBe("title");
    });

    it("trims dots", () => {
      expect(trimStart("...dots...", ".")).toBe("dots...");
    });

    it("trims multiple character types", () => {
      expect(trimStart("_-_name", "_-")).toBe("name");
    });

    it("trims underscores", () => {
      expect(trimStart("___variable", "_")).toBe("variable");
    });

    it("handles character set not in string", () => {
      expect(trimStart("hello", "/")).toBe("hello");
    });
  });

  describe("edge cases", () => {
    it("returns empty string for empty input", () => {
      expect(trimStart("")).toBe("");
    });

    it("handles null input", () => {
      expect(trimStart(null as any)).toBe(null);
    });

    it("handles undefined input", () => {
      expect(trimStart(undefined as any)).toBe(undefined);
    });

    it("returns original when no matching chars at start", () => {
      expect(trimStart("hello")).toBe("hello");
    });

    it("handles string of only trim chars", () => {
      expect(trimStart("///", "/")).toBe("");
    });

    it("handles single character string", () => {
      expect(trimStart("x")).toBe("x");
    });

    it("handles single trim char string", () => {
      expect(trimStart("/", "/")).toBe("");
    });
  });

  describe("Unicode handling", () => {
    it("handles emoji in string", () => {
      expect(trimStart("  🎉hello")).toBe("🎉hello");
    });

    it("handles emoji in trim chars", () => {
      expect(trimStart("🎉🎉🎉hello", "🎉")).toBe("hello");
    });

    it("handles multi-codepoint emoji", () => {
      expect(trimStart("  👨‍👩‍👧‍👦 family")).toBe("👨‍👩‍👧‍👦 family");
    });

    it("handles combining characters", () => {
      expect(trimStart("  café")).toBe("café");
    });

    it("handles right-to-left text", () => {
      expect(trimStart("  مرحبا")).toBe("مرحبا");
    });

    it("handles CJK characters", () => {
      expect(trimStart("  你好")).toBe("你好");
    });
  });

  describe("real-world use cases", () => {
    it("cleans path prefixes", () => {
      expect(trimStart("/api/users", "/")).toBe("api/users");
    });

    it("removes leading zeros", () => {
      expect(trimStart("00042", "0")).toBe("42");
    });

    it("cleans comment prefixes", () => {
      expect(trimStart("// comment", "/ ")).toBe("comment");
    });

    it("removes markdown list markers", () => {
      expect(trimStart("- item", "- ")).toBe("item");
    });

    it("cleans protocol from URL", () => {
      expect(trimStart("https://example.com", "htps:/")).toBe("example.com");
    });
  });
});
