import { describe, it, expect } from "vitest";
import { trim } from "../src/trim";

describe("trim", () => {
  describe("default whitespace trimming", () => {
    it("trims spaces from both ends", () => {
      expect(trim("  hello  ")).toBe("hello");
    });

    it("trims tabs from both ends", () => {
      expect(trim("\t\thello\t\t")).toBe("hello");
    });

    it("trims newlines from both ends", () => {
      expect(trim("\n\nhello\n\n")).toBe("hello");
    });

    it("trims carriage returns from both ends", () => {
      expect(trim("\r\rhello\r\r")).toBe("hello");
    });

    it("trims mixed whitespace from both ends", () => {
      expect(trim(" \t\n\rhello \t\n\r")).toBe("hello");
    });

    it("returns empty string for whitespace-only input", () => {
      expect(trim("   ")).toBe("");
    });

    it("handles internal whitespace", () => {
      expect(trim("  hello world  ")).toBe("hello world");
    });
  });

  describe("custom character trimming", () => {
    it("trims single custom character from both ends", () => {
      expect(trim("///path///", "/")).toBe("path");
    });

    it("trims dashes from both ends", () => {
      expect(trim("---title---", "-")).toBe("title");
    });

    it("trims dots from both ends", () => {
      expect(trim("...dots...", ".")).toBe("dots");
    });

    it("trims multiple character types", () => {
      expect(trim("_-_name_-_", "_-")).toBe("name");
    });

    it("trims underscores from both ends", () => {
      expect(trim("___variable___", "_")).toBe("variable");
    });

    it("handles character set not in string", () => {
      expect(trim("hello", "/")).toBe("hello");
    });

    it("trims quotes", () => {
      expect(trim('"hello"', '"')).toBe("hello");
    });

    it("trims brackets", () => {
      expect(trim("[content]", "[]")).toBe("content");
    });

    it("trims parentheses", () => {
      expect(trim("(value)", "()")).toBe("value");
    });
  });

  describe("edge cases", () => {
    it("returns empty string for empty input", () => {
      expect(trim("")).toBe("");
    });

    it("handles null input", () => {
      expect(trim(null as any)).toBe(null);
    });

    it("handles undefined input", () => {
      expect(trim(undefined as any)).toBe(undefined);
    });

    it("returns original when no matching chars", () => {
      expect(trim("hello")).toBe("hello");
    });

    it("handles string of only trim chars", () => {
      expect(trim("///", "/")).toBe("");
    });

    it("handles single character string", () => {
      expect(trim("x")).toBe("x");
    });

    it("handles single trim char string", () => {
      expect(trim("/", "/")).toBe("");
    });

    it("handles asymmetric trimming needs", () => {
      expect(trim("  hello/", " /")).toBe("hello");
    });
  });

  describe("Unicode handling", () => {
    it("handles emoji in string", () => {
      expect(trim("  🎉hello🎉  ")).toBe("🎉hello🎉");
    });

    it("handles emoji in trim chars", () => {
      expect(trim("🎉🎉hello🎉🎉", "🎉")).toBe("hello");
    });

    it("handles multi-codepoint emoji", () => {
      expect(trim("  👨‍👩‍👧‍👦  ")).toBe("👨‍👩‍👧‍👦");
    });

    it("handles combining characters", () => {
      expect(trim("  café  ")).toBe("café");
    });

    it("handles right-to-left text", () => {
      expect(trim("  مرحبا  ")).toBe("مرحبا");
    });

    it("handles CJK characters", () => {
      expect(trim("  你好  ")).toBe("你好");
    });

    it("handles mixed Unicode and ASCII", () => {
      expect(trim("...hello世界...", ".")).toBe("hello世界");
    });
  });

  describe("real-world use cases", () => {
    it("cleans path separators", () => {
      expect(trim("/api/users/", "/")).toBe("api/users");
    });

    it("removes surrounding punctuation", () => {
      expect(trim("!Hello!", "!")).toBe("Hello");
    });

    it("cleans CSV values", () => {
      expect(trim('"value"', '"')).toBe("value");
    });

    it("removes markdown code markers", () => {
      expect(trim("`code`", "`")).toBe("code");
    });

    it("cleans whitespace around operators", () => {
      expect(trim("  +  ", " ")).toBe("+");
    });

    it("handles JSON-like values", () => {
      expect(trim("{ }", " {}")).toBe("");
    });
  });

  describe("comparison with native trim", () => {
    it("behaves like native trim for whitespace", () => {
      const testStr = "  hello world  ";
      expect(trim(testStr)).toBe(testStr.trim());
    });

    it("extends native trim with custom chars", () => {
      expect(trim("###heading###", "#")).toBe("heading");
    });
  });
});
