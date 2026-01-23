import { describe, it, expect } from "vitest";
import { wrap } from "../src/wrap";

describe("wrap", () => {
  describe("basic wrapping", () => {
    it("wraps text at specified width", () => {
      expect(wrap("Hello world, how are you today?", 15)).toBe(
        "Hello world,\nhow are you\ntoday?",
      );
    });

    it("wraps with default width of 80", () => {
      // Long single word stays intact (no word boundaries to break at)
      const longText = "a".repeat(100);
      const result = wrap(longText);
      expect(result).toBe(longText);

      // With word boundaries, wraps at 80
      const words = "word ".repeat(20).trim();
      const wordResult = wrap(words);
      expect(wordResult.split("\n")[0]!.length).toBeLessThanOrEqual(80);
    });

    it("accepts width as options object", () => {
      expect(wrap("Hello world, how are you?", { width: 15 })).toBe(
        "Hello world,\nhow are you?",
      );
    });

    it("handles text shorter than width", () => {
      expect(wrap("Hello", 80)).toBe("Hello");
    });

    it("preserves short text with default width", () => {
      expect(wrap("Hello world")).toBe("Hello world");
    });
  });

  describe("word boundary handling", () => {
    it("breaks at word boundaries", () => {
      expect(wrap("one two three", 7)).toBe("one two\nthree");
    });

    it("keeps words together when possible", () => {
      expect(wrap("hello world", 20)).toBe("hello world");
    });

    it("handles multiple spaces between words", () => {
      expect(wrap("hello    world", 15)).toBe("hello world");
    });
  });

  describe("long word handling", () => {
    it("keeps long words intact by default", () => {
      expect(wrap("Supercalifragilisticexpialidocious is awesome", 10)).toBe(
        "Supercalifragilisticexpialidocious\nis awesome",
      );
    });

    it("breaks long words when breakWords is true", () => {
      expect(
        wrap("Supercalifragilisticexpialidocious", {
          width: 10,
          breakWords: true,
        }),
      ).toBe("Supercalif\nragilistic\nexpialidoc\nious");
    });

    it("handles word exactly at width", () => {
      expect(wrap("0123456789", 10)).toBe("0123456789");
    });
  });

  describe("existing newlines", () => {
    it("preserves existing newlines", () => {
      expect(wrap("Line 1\nLine 2", 80)).toBe("Line 1\nLine 2");
    });

    it("wraps each line independently", () => {
      expect(wrap("Line 1 is longer\nLine 2 is longer", { width: 10 })).toBe(
        "Line 1 is\nlonger\nLine 2 is\nlonger",
      );
    });

    it("handles multiple consecutive newlines", () => {
      expect(wrap("Line 1\n\nLine 3", 80)).toBe("Line 1\n\nLine 3");
    });
  });

  describe("custom separator", () => {
    it("uses custom separator", () => {
      expect(
        wrap("Hello world, how are you?", { width: 15, separator: "<br>" }),
      ).toBe("Hello world,<br>how are you?");
    });

    it("uses HTML line break", () => {
      expect(wrap("one two three", { width: 7, separator: "<br>\n" })).toBe(
        "one two<br>\nthree",
      );
    });
  });

  describe("edge cases", () => {
    it("returns empty string for empty input", () => {
      expect(wrap("")).toBe("");
    });

    it("handles null input", () => {
      expect(wrap(null as any)).toBe(null);
    });

    it("handles undefined input", () => {
      expect(wrap(undefined as any)).toBe(undefined);
    });

    it("returns original for width <= 0", () => {
      expect(wrap("hello world", 0)).toBe("hello world");
      expect(wrap("hello world", -5)).toBe("hello world");
    });

    it("handles single word", () => {
      expect(wrap("hello", 10)).toBe("hello");
    });

    it("handles single character", () => {
      expect(wrap("x", 1)).toBe("x");
    });

    it("handles width of 1 with breakWords", () => {
      expect(wrap("hi", { width: 1, breakWords: true })).toBe("h\ni");
    });
  });

  describe("Unicode handling", () => {
    it("handles emoji in text", () => {
      expect(wrap("Hello 🎉 world 🎊 party", 12)).toBe(
        "Hello 🎉\nworld 🎊\nparty",
      );
    });

    it("handles CJK characters", () => {
      // Each CJK word is 2 chars, "你好 世界" is 5 chars (including space)
      // Width 4 allows "你好" and "世界" separately
      expect(wrap("你好 世界 很好", 4)).toBe("你好\n世界\n很好");
    });

    it("handles right-to-left text", () => {
      expect(wrap("مرحبا بالعالم", 10)).toBe("مرحبا\nبالعالم");
    });

    it("handles mixed Unicode and ASCII", () => {
      expect(wrap("Hello 世界 World", 10)).toBe("Hello 世界\nWorld");
    });
  });

  describe("real-world use cases", () => {
    it("formats help text for terminal", () => {
      const description =
        "This is a command line tool that helps you process text files efficiently.";
      const result = wrap(description, 40);
      expect(result.split("\n").every((line) => line.length <= 40)).toBe(true);
    });

    it("formats for email", () => {
      const text =
        "Thank you for your purchase. Your order will be shipped soon.";
      expect(wrap(text, 30)).toBe(
        "Thank you for your purchase.\nYour order will be shipped\nsoon.",
      );
    });

    it("formats code comments", () => {
      const comment =
        "This function calculates the sum of all numbers in the array";
      const result = wrap(comment, 30);
      expect(result).toBe(
        "This function calculates the\nsum of all numbers in the\narray",
      );
    });

    it("handles paragraph text", () => {
      const paragraph =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.";
      const result = wrap(paragraph, 40);
      const lines = result.split("\n");
      expect(lines.every((line) => line.length <= 40)).toBe(true);
    });
  });

  describe("performance considerations", () => {
    it("handles very long text efficiently", () => {
      const longText = "word ".repeat(1000);
      const result = wrap(longText, 80);
      expect(result.split("\n").length).toBeGreaterThan(1);
    });

    it("handles very narrow width", () => {
      // Width 3 fits pairs like "a b", producing 5 lines
      const text = "a b c d e f g h i j";
      const result = wrap(text, 3);
      expect(result.split("\n").length).toBe(5);
    });
  });
});
