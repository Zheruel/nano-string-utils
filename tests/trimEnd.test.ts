import { describe, it, expect } from "vitest";
import { trimEnd } from "../src/trimEnd";

describe("trimEnd", () => {
  describe("default whitespace trimming", () => {
    it("trims trailing spaces", () => {
      expect(trimEnd("hello  ")).toBe("hello");
    });

    it("trims trailing tabs", () => {
      expect(trimEnd("hello\t\t")).toBe("hello");
    });

    it("trims trailing newlines", () => {
      expect(trimEnd("hello\n\n")).toBe("hello");
    });

    it("trims trailing carriage returns", () => {
      expect(trimEnd("hello\r\r")).toBe("hello");
    });

    it("trims mixed whitespace", () => {
      expect(trimEnd("hello \t\n\r")).toBe("hello");
    });

    it("preserves leading whitespace", () => {
      expect(trimEnd("  hello  ")).toBe("  hello");
    });

    it("returns empty string for whitespace-only input", () => {
      expect(trimEnd("   ")).toBe("");
    });
  });

  describe("custom character trimming", () => {
    it("trims single custom character", () => {
      expect(trimEnd("path///", "/")).toBe("path");
    });

    it("trims dashes", () => {
      expect(trimEnd("title---", "-")).toBe("title");
    });

    it("trims dots", () => {
      expect(trimEnd("...dots...", ".")).toBe("...dots");
    });

    it("trims multiple character types", () => {
      expect(trimEnd("name_-_", "_-")).toBe("name");
    });

    it("trims underscores", () => {
      expect(trimEnd("variable___", "_")).toBe("variable");
    });

    it("handles character set not in string", () => {
      expect(trimEnd("hello", "/")).toBe("hello");
    });
  });

  describe("edge cases", () => {
    it("returns empty string for empty input", () => {
      expect(trimEnd("")).toBe("");
    });

    it("handles null input", () => {
      expect(trimEnd(null as any)).toBe(null);
    });

    it("handles undefined input", () => {
      expect(trimEnd(undefined as any)).toBe(undefined);
    });

    it("returns original when no matching chars at end", () => {
      expect(trimEnd("hello")).toBe("hello");
    });

    it("handles string of only trim chars", () => {
      expect(trimEnd("///", "/")).toBe("");
    });

    it("handles single character string", () => {
      expect(trimEnd("x")).toBe("x");
    });

    it("handles single trim char string", () => {
      expect(trimEnd("/", "/")).toBe("");
    });
  });

  describe("Unicode handling", () => {
    it("handles emoji in string", () => {
      expect(trimEnd("hello🎉  ")).toBe("hello🎉");
    });

    it("handles emoji in trim chars", () => {
      expect(trimEnd("hello🎉🎉🎉", "🎉")).toBe("hello");
    });

    it("handles multi-codepoint emoji", () => {
      expect(trimEnd("family 👨‍👩‍👧‍👦  ")).toBe("family 👨‍👩‍👧‍👦");
    });

    it("handles combining characters", () => {
      expect(trimEnd("café  ")).toBe("café");
    });

    it("handles right-to-left text", () => {
      expect(trimEnd("مرحبا  ")).toBe("مرحبا");
    });

    it("handles CJK characters", () => {
      expect(trimEnd("你好  ")).toBe("你好");
    });
  });

  describe("real-world use cases", () => {
    it("cleans path suffixes", () => {
      expect(trimEnd("/api/users/", "/")).toBe("/api/users");
    });

    it("removes trailing punctuation", () => {
      expect(trimEnd("Hello!!!", "!")).toBe("Hello");
    });

    it("cleans file extensions", () => {
      expect(trimEnd("file.txt", ".txt")).toBe("file");
    });

    it("removes trailing commas", () => {
      expect(trimEnd("item1, item2,", ", ")).toBe("item1, item2");
    });

    it("cleans markdown emphasis", () => {
      expect(trimEnd("*bold*", "*")).toBe("*bold");
    });
  });
});
