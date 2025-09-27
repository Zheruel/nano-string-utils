import { describe, expect, it } from "vitest";
import { sanitize } from "../src/sanitize";

describe("sanitize", () => {
  describe("basic functionality", () => {
    it("should return empty string for null/undefined", () => {
      expect(sanitize(null as any)).toBe("");
      expect(sanitize(undefined as any)).toBe("");
    });

    it("should return empty string for non-string input", () => {
      expect(sanitize(123 as any)).toBe("");
      expect(sanitize({} as any)).toBe("");
      expect(sanitize([] as any)).toBe("");
    });

    it("should return plain text unchanged by default", () => {
      expect(sanitize("Hello World")).toBe("Hello World");
      expect(sanitize("Plain text with numbers 123")).toBe(
        "Plain text with numbers 123"
      );
    });
  });

  describe("HTML stripping", () => {
    it("should strip all HTML tags by default", () => {
      expect(sanitize("<p>Hello</p>")).toBe("Hello");
      expect(sanitize("<div>Test</div>")).toBe("Test");
      expect(sanitize("<span>Content</span>")).toBe("Content");
    });

    it("should strip nested HTML tags", () => {
      expect(sanitize("<div><p>Nested</p></div>")).toBe("Nested");
      expect(sanitize("<div><span><b>Deep</b></span></div>")).toBe("Deep");
    });

    it("should handle self-closing tags", () => {
      expect(sanitize("Line<br/>break")).toBe("Linebreak");
      expect(sanitize("<img src='test.jpg' />Image")).toBe("Image");
      expect(sanitize("Text<hr/>More")).toBe("TextMore");
    });

    it("should decode HTML entities after stripping", () => {
      expect(sanitize("&lt;script&gt;alert('xss')&lt;/script&gt;")).toBe(
        "<script>alert('xss')</script>"
      );
      expect(sanitize("&amp;&lt;&gt;&quot;&#x27;&#x2F;")).toBe("&<>\"'/");
    });
  });

  describe("XSS prevention", () => {
    it("should remove script tags and content", () => {
      expect(sanitize("<script>alert('xss')</script>")).toBe("");
      expect(sanitize("Before<script>evil()</script>After")).toBe(
        "BeforeAfter"
      );
      expect(sanitize("<script type='text/javascript'>bad()</script>")).toBe(
        ""
      );
    });

    it("should remove style tags and content", () => {
      expect(sanitize("<style>body { display: none; }</style>")).toBe("");
      expect(sanitize("Text<style>.evil { }</style>More")).toBe("TextMore");
    });

    it("should remove javascript: URIs", () => {
      expect(sanitize("javascript:alert(1)")).toBe("");
      expect(sanitize("JAVASCRIPT:alert(1)")).toBe("");
      expect(sanitize("javascript:void(0)")).toBe("");
    });

    it("should remove data: URIs", () => {
      expect(sanitize("data:text/html,<script>alert(1)</script>")).toBe("");
      expect(
        sanitize("DATA:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==")
      ).toBe("");
    });

    it("should remove vbscript: URIs", () => {
      expect(sanitize("vbscript:msgbox('xss')")).toBe("");
      expect(sanitize("VBSCRIPT:alert(1)")).toBe("");
    });

    it("should remove event handlers from HTML", () => {
      expect(sanitize("<div onclick='alert(1)'>Click</div>")).toBe("Click");
      expect(sanitize("<img onerror='alert(1)' src='x'>")).toBe("");
      expect(sanitize("<body onload='evil()'>Content</body>")).toBe("Content");
    });

    it("should handle malformed tags", () => {
      expect(sanitize("<script>alert(1)</script")).toBe("");
      expect(sanitize("<script >alert(1)</script>")).toBe("");
      expect(sanitize("< script >alert(1)</ script >")).toBe("alert(1)");
    });
  });

  describe("allowed tags", () => {
    it("should preserve allowed tags", () => {
      expect(sanitize("<b>Bold</b>", { allowedTags: ["b"] })).toBe(
        "<b>Bold</b>"
      );
      expect(sanitize("<i>Italic</i>", { allowedTags: ["i"] })).toBe(
        "<i>Italic</i>"
      );
      expect(
        sanitize("<b>Bold</b> and <i>Italic</i>", { allowedTags: ["b", "i"] })
      ).toBe("<b>Bold</b> and <i>Italic</i>");
    });

    it("should strip non-allowed tags", () => {
      expect(
        sanitize("<b>Bold</b><script>bad</script>", { allowedTags: ["b"] })
      ).toBe("<b>Bold</b>");
      expect(
        sanitize("<p>Para</p><div>Div</div>", { allowedTags: ["p"] })
      ).toBe("<p>Para</p>Div");
    });

    it("should remove dangerous attributes from allowed tags", () => {
      expect(
        sanitize("<b onclick='alert(1)'>Bold</b>", { allowedTags: ["b"] })
      ).toBe("<b>Bold</b>");
      expect(
        sanitize("<a href='javascript:alert(1)'>Link</a>", {
          allowedTags: ["a"],
        })
      ).toBe("<a>Link</a>");
    });

    it("should handle closing tags correctly", () => {
      expect(
        sanitize("<b>Start</b>Middle<b>End</b>", { allowedTags: ["b"] })
      ).toBe("<b>Start</b>Middle<b>End</b>");
    });
  });

  describe("allowed attributes", () => {
    it("should preserve allowed attributes", () => {
      expect(
        sanitize("<a href='test.html'>Link</a>", {
          allowedTags: ["a"],
          allowedAttributes: ["href"],
        })
      ).toBe("<a href='test.html'>Link</a>");
    });

    it("should remove non-allowed attributes", () => {
      expect(
        sanitize("<a href='test.html' onclick='alert(1)'>Link</a>", {
          allowedTags: ["a"],
          allowedAttributes: ["href"],
        })
      ).toBe("<a href='test.html'>Link</a>");
    });
  });

  describe("escapeHtml option", () => {
    it("should escape HTML instead of stripping when escapeHtml is true", () => {
      expect(
        sanitize("<div>Test</div>", { stripHtml: false, escapeHtml: true })
      ).toBe("&lt;div&gt;Test&lt;&#x2F;div&gt;");
      expect(
        sanitize("<script>alert(1)</script>", {
          stripHtml: false,
          escapeHtml: true,
        })
      ).toBe("&lt;script&gt;alert(1)&lt;&#x2F;script&gt;");
    });

    it("should handle special characters when escaping", () => {
      expect(
        sanitize("< > & \" ' /", { stripHtml: false, escapeHtml: true })
      ).toBe("&lt; &gt; &amp; &quot; &#x27; &#x2F;");
    });
  });

  describe("non-printable characters", () => {
    it("should remove control characters by default", () => {
      expect(sanitize("Hello\x00World")).toBe("HelloWorld");
      expect(sanitize("Text\x1FMore")).toBe("TextMore");
      expect(sanitize("\x7FInvisible")).toBe("Invisible");
    });

    it("should preserve tabs, newlines, and carriage returns", () => {
      expect(sanitize("Hello\tWorld")).toBe("Hello\tWorld");
      expect(sanitize("Line1\nLine2")).toBe("Line1\nLine2");
      expect(sanitize("Text\rMore")).toBe("Text\rMore");
    });

    it("should remove when removeNonPrintable is true", () => {
      expect(sanitize("Hello\x00World", { removeNonPrintable: true })).toBe(
        "HelloWorld"
      );
    });

    it("should keep when removeNonPrintable is false", () => {
      expect(sanitize("Hello\x00World", { removeNonPrintable: false })).toBe(
        "Hello\x00World"
      );
    });
  });

  describe("whitespace normalization", () => {
    it("should normalize whitespace when enabled", () => {
      expect(sanitize("Hello   World", { normalizeWhitespace: true })).toBe(
        "Hello World"
      );
      expect(
        sanitize("Multiple\n\nNewlines", { normalizeWhitespace: true })
      ).toBe("Multiple Newlines");
      expect(sanitize("\t\tTabs\t\t", { normalizeWhitespace: true })).toBe(
        "Tabs"
      );
    });

    it("should trim whitespace when normalizing", () => {
      expect(
        sanitize("  Leading and trailing  ", { normalizeWhitespace: true })
      ).toBe("Leading and trailing");
    });

    it("should not normalize by default", () => {
      expect(sanitize("Hello   World")).toBe("Hello   World");
      expect(sanitize("Line1\n\nLine2")).toBe("Line1\n\nLine2");
    });
  });

  describe("max length", () => {
    it("should truncate to max length", () => {
      expect(sanitize("Hello World", { maxLength: 5 })).toBe("Hello");
      expect(sanitize("Long text here", { maxLength: 10 })).toBe("Long text ");
    });

    it("should handle max length with HTML stripping", () => {
      expect(sanitize("<p>Hello World</p>", { maxLength: 5 })).toBe("Hello");
    });

    it("should not truncate when no max length", () => {
      expect(sanitize("Hello World")).toBe("Hello World");
    });
  });

  describe("custom patterns", () => {
    it("should remove custom patterns", () => {
      expect(
        sanitize("Remove @mentions here", { removePatterns: [/@\w+/g] })
      ).toBe("Remove  here");
      expect(
        sanitize("Text with #hashtags", { removePatterns: [/#\w+/g] })
      ).toBe("Text with ");
    });

    it("should apply multiple custom patterns", () => {
      expect(
        sanitize("@user posted #news", {
          removePatterns: [/@\w+/g, /#\w+/g],
        })
      ).toBe(" posted ");
    });
  });

  describe("combined options", () => {
    it("should apply multiple sanitization options", () => {
      const input = "<script>bad</script><b>Bold</b>  Text\x00";
      const result = sanitize(input, {
        allowedTags: ["b"],
        removeNonPrintable: true,
        normalizeWhitespace: true,
      });
      expect(result).toBe("<b>Bold</b> Text");
    });

    it("should handle complex HTML with multiple options", () => {
      const input = `<div onclick="alert(1)">
        <script>evil()</script>
        <p>Paragraph</p>
        <b>Bold   text</b>
      </div>`;
      const result = sanitize(input, {
        allowedTags: ["p", "b"],
        normalizeWhitespace: true,
        removeScripts: true,
      });
      expect(result).toBe("<p>Paragraph</p> <b>Bold text</b>");
    });
  });

  describe("edge cases", () => {
    it("should handle empty string", () => {
      expect(sanitize("")).toBe("");
    });

    it("should handle only HTML tags", () => {
      expect(sanitize("<div></div>")).toBe("");
      expect(sanitize("<br/><hr/>")).toBe("");
    });

    it("should handle broken HTML", () => {
      expect(sanitize("<div>Unclosed")).toBe("Unclosed");
      expect(sanitize("Unopened</div>")).toBe("Unopened");
    });

    it("should handle mixed content", () => {
      const input =
        "Normal text <script>alert(1)</script> more text javascript:void(0)";
      expect(sanitize(input)).toBe("Normal text  more text ");
    });

    it("should handle deeply nested malicious content", () => {
      const input =
        "<div><div><script><script>alert(1)</script></script></div></div>";
      expect(sanitize(input)).toBe("");
    });
  });
});
