import { describe, it, expect } from "vitest";
import { highlight } from "../src/highlight";

describe("highlight", () => {
  describe("basic functionality", () => {
    it("should highlight a simple term", () => {
      expect(highlight("The quick brown fox", "quick")).toBe(
        "The <mark>quick</mark> brown fox"
      );
    });

    it("should return empty string for empty text", () => {
      expect(highlight("", "search")).toBe("");
    });

    it("should return original text for empty search term", () => {
      expect(highlight("Hello world", "")).toBe("Hello world");
    });

    it("should return original text for empty array of terms", () => {
      expect(highlight("Hello world", [])).toBe("Hello world");
    });

    it("should return original text when no matches found", () => {
      expect(highlight("Hello world", "foo")).toBe("Hello world");
    });

    it("should handle null/undefined text gracefully", () => {
      expect(highlight(null as any, "search")).toBe("");
      expect(highlight(undefined as any, "search")).toBe("");
    });
  });

  describe("case sensitivity", () => {
    it("should be case-insensitive by default", () => {
      expect(highlight("Hello HELLO hello", "hello")).toBe(
        "<mark>Hello</mark> <mark>HELLO</mark> <mark>hello</mark>"
      );
    });

    it("should preserve original case when highlighting", () => {
      expect(highlight("The Quick brown fox", "quick")).toBe(
        "The <mark>Quick</mark> brown fox"
      );
    });

    it("should be case-sensitive when option is enabled", () => {
      expect(
        highlight("Hello HELLO hello", "hello", { caseSensitive: true })
      ).toBe("Hello HELLO <mark>hello</mark>");
    });
  });

  describe("multiple terms", () => {
    it("should highlight multiple distinct terms", () => {
      expect(highlight("The quick brown fox", ["quick", "fox"])).toBe(
        "The <mark>quick</mark> brown <mark>fox</mark>"
      );
    });

    it("should handle overlapping terms correctly", () => {
      expect(
        highlight("Java and JavaScript are different", ["Java", "JavaScript"])
      ).toBe("<mark>Java</mark> and <mark>JavaScript</mark> are different");
    });

    it("should deduplicate terms in array", () => {
      expect(highlight("Hello world", ["Hello", "Hello", "world"])).toBe(
        "<mark>Hello</mark> <mark>world</mark>"
      );
    });

    it("should filter out empty terms", () => {
      expect(highlight("Hello world", ["Hello", "", "world"])).toBe(
        "<mark>Hello</mark> <mark>world</mark>"
      );
    });
  });

  describe("custom wrapper", () => {
    it("should use custom wrapper tags", () => {
      expect(highlight("Hello world", "Hello", { wrapper: ["**", "**"] })).toBe(
        "**Hello** world"
      );
    });

    it("should use custom HTML wrapper", () => {
      expect(
        highlight("Hello world", "Hello", { wrapper: ["<span>", "</span>"] })
      ).toBe("<span>Hello</span> world");
    });

    it("should apply className to mark tag", () => {
      expect(
        highlight("Hello world", "Hello", { className: "highlight" })
      ).toBe('<mark class="highlight">Hello</mark> world');
    });

    it("should ignore className for custom wrapper", () => {
      expect(
        highlight("Hello world", "Hello", {
          wrapper: ["<span>", "</span>"],
          className: "highlight",
        })
      ).toBe("<span>Hello</span> world");
    });
  });

  describe("whole word matching", () => {
    it("should match whole words only when enabled", () => {
      expect(
        highlight("Java and JavaScript", "Java", { wholeWord: true })
      ).toBe("<mark>Java</mark> and JavaScript");
    });

    it("should match partial words by default", () => {
      expect(
        highlight("Java and JavaScript", "Java", { wholeWord: false })
      ).toBe("<mark>Java</mark> and <mark>Java</mark>Script");
    });

    it("should handle word boundaries with punctuation", () => {
      expect(
        highlight("Hello, world! Hello.", "Hello", { wholeWord: true })
      ).toBe("<mark>Hello</mark>, world! <mark>Hello</mark>.");
    });

    it("should not match within words when whole word is enabled", () => {
      expect(highlight("unhappy happiness", "happy", { wholeWord: true })).toBe(
        "unhappy happiness"
      );
    });
  });

  describe("special characters", () => {
    it("should escape regex special characters in search terms", () => {
      expect(highlight("Price is $10.99 (on sale)", "$10.99")).toBe(
        "Price is <mark>$10.99</mark> (on sale)"
      );
    });

    it("should handle brackets and parentheses", () => {
      expect(highlight("Array[0] and func()", "[0]")).toBe(
        "Array<mark>[0]</mark> and func()"
      );
    });

    it("should handle asterisks and dots", () => {
      expect(highlight("*.js files", "*.js")).toBe("<mark>*.js</mark> files");
    });
  });

  describe("HTML escaping", () => {
    it("should escape HTML when option is enabled", () => {
      expect(highlight("<div>Hello</div>", "Hello", { escapeHtml: true })).toBe(
        "&lt;div&gt;<mark>Hello</mark>&lt;/div&gt;"
      );
    });

    it("should not escape HTML by default", () => {
      expect(highlight("<div>Hello</div>", "Hello")).toBe(
        "<div><mark>Hello</mark></div>"
      );
    });

    it("should escape all HTML entities", () => {
      const text = "<script>alert(\"XSS\")</script> & 'test'";
      expect(highlight(text, "test", { escapeHtml: true })).toBe(
        "&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt; &amp; &#39;<mark>test</mark>&#39;"
      );
    });
  });

  describe("edge cases", () => {
    it("should handle consecutive matches", () => {
      expect(highlight("aaaa", "aa")).toBe("<mark>aa</mark><mark>aa</mark>");
    });

    it("should handle text at boundaries", () => {
      expect(highlight("hello world hello", "hello")).toBe(
        "<mark>hello</mark> world <mark>hello</mark>"
      );
    });

    it("should handle very long text efficiently", () => {
      const longText = "hello ".repeat(1000) + "world";
      const result = highlight(longText, "hello");
      expect(result).toContain("<mark>hello</mark>");
      expect(result.match(/<mark>hello<\/mark>/g)?.length).toBe(1000);
    });

    it("should handle empty strings in term array", () => {
      expect(
        highlight("Hello world", ["", "Hello", null as any, undefined as any])
      ).toBe("<mark>Hello</mark> world");
    });
  });

  describe("real-world scenarios", () => {
    it("should highlight search results", () => {
      const text = "The quick brown fox jumps over the lazy dog";
      expect(highlight(text, "quick brown")).toBe(
        "The <mark>quick brown</mark> fox jumps over the lazy dog"
      );
    });

    it("should highlight error messages", () => {
      const log =
        "INFO: Starting process\nERROR: Connection failed\nWARN: Retry attempted";
      expect(highlight(log, ["ERROR", "WARN"], { wrapper: ["**", "**"] })).toBe(
        "INFO: Starting process\n**ERROR**: Connection failed\n**WARN**: Retry attempted"
      );
    });

    it("should highlight code snippets", () => {
      const code = "function getName() { return this.name; }";
      expect(
        highlight(code, ["function", "return"], {
          wrapper: ['<span class="keyword">', "</span>"],
        })
      ).toBe(
        '<span class="keyword">function</span> getName() { <span class="keyword">return</span> this.name; }'
      );
    });

    it("should highlight with custom markdown-style wrapper", () => {
      const text = "JavaScript and TypeScript are popular";
      expect(
        highlight(text, ["JavaScript", "TypeScript"], {
          wrapper: ["`", "`"],
        })
      ).toBe("`JavaScript` and `TypeScript` are popular");
    });
  });
});
