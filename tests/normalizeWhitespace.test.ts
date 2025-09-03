import { describe, it, expect } from "vitest";
import { normalizeWhitespace } from "../src/normalizeWhitespace";

describe("normalizeWhitespace", () => {
  describe("basic normalization", () => {
    it("should normalize multiple regular spaces", () => {
      expect(normalizeWhitespace("hello   world")).toBe("hello world");
      expect(normalizeWhitespace("a    b    c")).toBe("a b c");
    });

    it("should trim leading and trailing spaces by default", () => {
      expect(normalizeWhitespace("  hello  ")).toBe("hello");
      expect(normalizeWhitespace("   hello world   ")).toBe("hello world");
    });

    it("should normalize tabs", () => {
      expect(normalizeWhitespace("hello\tworld")).toBe("hello world");
      expect(normalizeWhitespace("a\t\tb\t\tc")).toBe("a b c");
    });

    it("should normalize newlines", () => {
      expect(normalizeWhitespace("hello\nworld")).toBe("hello world");
      expect(normalizeWhitespace("hello\n\nworld")).toBe("hello world");
      expect(normalizeWhitespace("hello\r\nworld")).toBe("hello world");
    });

    it("should handle mixed whitespace", () => {
      expect(normalizeWhitespace("  hello\t\nworld  ")).toBe("hello world");
      expect(normalizeWhitespace("\t\nhello   \n\t  world\r\n")).toBe(
        "hello world"
      );
    });
  });

  describe("Unicode whitespace characters", () => {
    it("should normalize non-breaking space (U+00A0)", () => {
      expect(normalizeWhitespace("hello\u00A0world")).toBe("hello world");
      expect(normalizeWhitespace("a\u00A0\u00A0b")).toBe("a b");
    });

    it("should normalize em space (U+2003)", () => {
      expect(normalizeWhitespace("hello\u2003world")).toBe("hello world");
    });

    it("should normalize en space (U+2002)", () => {
      expect(normalizeWhitespace("hello\u2002world")).toBe("hello world");
    });

    it("should normalize thin space (U+2009)", () => {
      expect(normalizeWhitespace("hello\u2009world")).toBe("hello world");
    });

    it("should normalize hair space (U+200A)", () => {
      expect(normalizeWhitespace("hello\u200Aworld")).toBe("hello world");
    });

    it("should normalize zero-width space (U+200B)", () => {
      expect(normalizeWhitespace("hello\u200Bworld")).toBe("hello world");
      expect(normalizeWhitespace("a\u200B\u200Bb")).toBe("a b");
    });

    it("should normalize ideographic space (U+3000)", () => {
      expect(normalizeWhitespace("hello\u3000world")).toBe("hello world");
      expect(normalizeWhitespace("日本\u3000語")).toBe("日本 語");
    });

    it("should normalize line separator (U+2028)", () => {
      expect(normalizeWhitespace("hello\u2028world")).toBe("hello world");
    });

    it("should normalize paragraph separator (U+2029)", () => {
      expect(normalizeWhitespace("hello\u2029world")).toBe("hello world");
    });

    it("should normalize narrow non-breaking space (U+202F)", () => {
      expect(normalizeWhitespace("hello\u202Fworld")).toBe("hello world");
    });

    it("should normalize medium mathematical space (U+205F)", () => {
      expect(normalizeWhitespace("hello\u205Fworld")).toBe("hello world");
    });

    it("should normalize zero-width non-breaking space/BOM (U+FEFF)", () => {
      expect(normalizeWhitespace("\uFEFFhello world")).toBe("hello world");
      expect(normalizeWhitespace("hello\uFEFFworld")).toBe("hello world");
    });

    it("should normalize Ogham space mark (U+1680)", () => {
      expect(normalizeWhitespace("hello\u1680world")).toBe("hello world");
    });

    it("should handle mixed Unicode spaces", () => {
      const mixed = "hello\u00A0\u2003\u200Bworld\u3000test";
      expect(normalizeWhitespace(mixed)).toBe("hello world test");
    });

    it("should handle various space widths", () => {
      // Various width spaces from U+2000 to U+200A
      const spaces =
        "a\u2000b\u2001c\u2002d\u2003e\u2004f\u2005g\u2006h\u2007i\u2008j\u2009k\u200Al";
      expect(normalizeWhitespace(spaces)).toBe("a b c d e f g h i j k l");
    });
  });

  describe("trim option", () => {
    it("should not trim when trim is false", () => {
      expect(normalizeWhitespace("  hello  ", { trim: false })).toBe(" hello ");
      expect(normalizeWhitespace("  hello world  ", { trim: false })).toBe(
        " hello world "
      );
    });

    it("should trim by default", () => {
      expect(normalizeWhitespace("  hello  ")).toBe("hello");
    });

    it("should handle Unicode spaces with trim false", () => {
      expect(normalizeWhitespace("\u00A0hello\u00A0", { trim: false })).toBe(
        " hello "
      );
      expect(normalizeWhitespace("\u3000hello\u3000", { trim: false })).toBe(
        " hello "
      );
    });
  });

  describe("collapse option", () => {
    it("should not collapse when collapse is false", () => {
      expect(normalizeWhitespace("hello    world", { collapse: false })).toBe(
        "hello    world"
      );
      expect(normalizeWhitespace("a  b  c", { collapse: false })).toBe(
        "a  b  c"
      );
    });

    it("should collapse by default", () => {
      expect(normalizeWhitespace("hello    world")).toBe("hello world");
    });

    it("should handle Unicode spaces with collapse false", () => {
      expect(
        normalizeWhitespace("hello\u00A0\u00A0world", { collapse: false })
      ).toBe("hello  world");
      expect(normalizeWhitespace("a\u3000\u3000b", { collapse: false })).toBe(
        "a  b"
      );
    });

    it("should work with trim and collapse both false", () => {
      expect(
        normalizeWhitespace("  hello    world  ", {
          trim: false,
          collapse: false,
        })
      ).toBe("  hello    world  ");
    });
  });

  describe("preserveNewlines option", () => {
    it("should preserve newlines when preserveNewlines is true", () => {
      expect(
        normalizeWhitespace("hello\nworld", { preserveNewlines: true })
      ).toBe("hello\nworld");
      expect(
        normalizeWhitespace("hello\n\nworld", { preserveNewlines: true })
      ).toBe("hello\n\nworld");
    });

    it("should normalize other whitespace but keep newlines", () => {
      expect(
        normalizeWhitespace("hello\t\nworld", { preserveNewlines: true })
      ).toBe("hello \nworld");
      expect(
        normalizeWhitespace("hello\u00A0\nworld", { preserveNewlines: true })
      ).toBe("hello \nworld");
    });

    it("should trim but preserve internal newlines", () => {
      expect(
        normalizeWhitespace("  hello\nworld  ", { preserveNewlines: true })
      ).toBe("hello\nworld");
    });

    it("should collapse spaces but not newlines", () => {
      expect(
        normalizeWhitespace("hello   \n\n   world", { preserveNewlines: true })
      ).toBe("hello \n\n world");
    });

    it("should work with trim false and preserveNewlines", () => {
      expect(
        normalizeWhitespace("  hello\nworld  ", {
          trim: false,
          preserveNewlines: true,
        })
      ).toBe(" hello\nworld ");
    });

    it("should work with collapse false and preserveNewlines", () => {
      expect(
        normalizeWhitespace("hello    \n    world", {
          collapse: false,
          preserveNewlines: true,
        })
      ).toBe("hello    \n    world");
    });

    it("should handle carriage returns with preserveNewlines", () => {
      expect(
        normalizeWhitespace("hello\r\nworld", { preserveNewlines: true })
      ).toBe("hello \nworld");
      expect(
        normalizeWhitespace("hello\rworld", { preserveNewlines: true })
      ).toBe("hello world");
    });
  });

  describe("edge cases", () => {
    it("should handle empty string", () => {
      expect(normalizeWhitespace("")).toBe("");
    });

    it("should handle string with only spaces", () => {
      expect(normalizeWhitespace("     ")).toBe("");
      expect(normalizeWhitespace("     ", { trim: false })).toBe(" ");
    });

    it("should handle string with only Unicode spaces", () => {
      expect(normalizeWhitespace("\u00A0\u2003\u3000")).toBe("");
      expect(normalizeWhitespace("\u00A0\u2003\u3000", { trim: false })).toBe(
        " "
      );
    });

    it("should handle string with only newlines", () => {
      expect(normalizeWhitespace("\n\n\n")).toBe("");
      expect(normalizeWhitespace("\n\n\n", { preserveNewlines: true })).toBe(
        ""
      );
      expect(
        normalizeWhitespace("\n\n\n", { preserveNewlines: true, trim: false })
      ).toBe("\n\n\n");
    });

    it("should handle single character", () => {
      expect(normalizeWhitespace("a")).toBe("a");
    });

    it("should handle string without any whitespace", () => {
      expect(normalizeWhitespace("helloworld")).toBe("helloworld");
    });

    it("should handle null/undefined gracefully", () => {
      expect(normalizeWhitespace(null as any)).toBe(null);
      expect(normalizeWhitespace(undefined as any)).toBe(undefined);
    });

    it("should handle zero-width spaces at boundaries", () => {
      expect(normalizeWhitespace("\u200Bhello\u200B")).toBe("hello");
      expect(normalizeWhitespace("\u200B\u200Bhello world\u200B\u200B")).toBe(
        "hello world"
      );
    });
  });

  describe("real-world scenarios", () => {
    it("should clean up copy-pasted text with non-breaking spaces", () => {
      const text =
        "This\u00A0text\u00A0was\u00A0copied\u00A0from\u00A0a\u00A0website";
      expect(normalizeWhitespace(text)).toBe(
        "This text was copied from a website"
      );
    });

    it("should normalize text from Word documents", () => {
      const text =
        "Title\u2003\u2003Subtitle\n\nParagraph\u00A0with\u00A0non-breaking\u00A0spaces.";
      expect(normalizeWhitespace(text)).toBe(
        "Title Subtitle Paragraph with non-breaking spaces."
      );
    });

    it("should clean up formatted code snippets", () => {
      const code = "function\u2003example()\u2003{\n\treturn\u00A0true;\n}";
      expect(normalizeWhitespace(code, { preserveNewlines: true })).toBe(
        "function example() {\n return true;\n}"
      );
    });

    it("should handle text with BOM", () => {
      const text = '\uFEFF<?xml version="1.0"?>';
      expect(normalizeWhitespace(text)).toBe('<?xml version="1.0"?>');
    });

    it("should handle Asian text with ideographic spaces", () => {
      const text = "こんにちは\u3000世界\u3000です";
      expect(normalizeWhitespace(text)).toBe("こんにちは 世界 です");
    });

    it("should clean up social media text with zero-width spaces", () => {
      const text = "Check\u200Bout\u200Bthis\u200Blink!";
      expect(normalizeWhitespace(text)).toBe("Check out this link!");
    });

    it("should handle mathematical expressions with various spaces", () => {
      const math = "x\u205F=\u205F5\u2009+\u20093";
      expect(normalizeWhitespace(math)).toBe("x = 5 + 3");
    });
  });
});
