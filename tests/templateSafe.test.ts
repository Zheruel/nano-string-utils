import { describe, it, expect } from "vitest";
import { templateSafe } from "../src/templateSafe";

describe("templateSafe", () => {
  describe("HTML escaping", () => {
    it("escapes HTML in simple values", () => {
      expect(
        templateSafe("Hello {{name}}!", {
          name: '<script>alert("XSS")</script>',
        })
      ).toBe("Hello &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;!");
    });

    it("escapes HTML tags", () => {
      expect(templateSafe("User: {{name}}", { name: "<b>John</b>" })).toBe(
        "User: &lt;b&gt;John&lt;/b&gt;"
      );
    });

    it("escapes quotes", () => {
      expect(templateSafe("Message: {{msg}}", { msg: 'Hello "World"' })).toBe(
        "Message: Hello &quot;World&quot;"
      );
    });

    it("escapes ampersands", () => {
      expect(templateSafe("Company: {{name}}", { name: "AT&T" })).toBe(
        "Company: AT&amp;T"
      );
    });

    it("escapes single quotes", () => {
      expect(templateSafe("Text: {{text}}", { text: "It's a test" })).toBe(
        "Text: It&#39;s a test"
      );
    });

    it("escapes multiple special characters", () => {
      expect(
        templateSafe("Code: {{code}}", {
          code: '<div class="test">&nbsp;</div>',
        })
      ).toBe("Code: &lt;div class=&quot;test&quot;&gt;&amp;nbsp;&lt;/div&gt;");
    });
  });

  describe("nested object escaping", () => {
    it("escapes HTML in nested properties", () => {
      expect(
        templateSafe("User: {{user.name}}", {
          user: { name: '<script>alert("XSS")</script>' },
        })
      ).toBe("User: &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;");
    });

    it("escapes deeply nested properties", () => {
      expect(
        templateSafe("Bio: {{profile.bio.text}}", {
          profile: { bio: { text: "<b>Bold text</b>" } },
        })
      ).toBe("Bio: &lt;b&gt;Bold text&lt;/b&gt;");
    });

    it("escapes multiple nested properties", () => {
      expect(
        templateSafe("{{user.name}} - {{user.email}}", {
          user: {
            name: "<b>John</b>",
            email: "john@<script>.com",
          },
        })
      ).toBe("&lt;b&gt;John&lt;/b&gt; - john@&lt;script&gt;.com");
    });
  });

  describe("array escaping", () => {
    it("escapes HTML in array elements", () => {
      expect(
        templateSafe("First: {{items.0}}", {
          items: ["<script>alert(1)</script>"],
        })
      ).toBe("First: &lt;script&gt;alert(1)&lt;/script&gt;");
    });

    it("escapes multiple array elements", () => {
      expect(
        templateSafe("{{tags.0}}, {{tags.1}}", {
          tags: ["<b>tag1</b>", "<i>tag2</i>"],
        })
      ).toBe("&lt;b&gt;tag1&lt;/b&gt;, &lt;i&gt;tag2&lt;/i&gt;");
    });

    it("escapes nested arrays", () => {
      expect(
        templateSafe("Value: {{data.0.html}}", {
          data: [{ html: "<div>content</div>" }],
        })
      ).toBe("Value: &lt;div&gt;content&lt;/div&gt;");
    });
  });

  describe("non-string values", () => {
    it("does not affect numbers", () => {
      expect(templateSafe("Count: {{count}}", { count: 42 })).toBe("Count: 42");
    });

    it("does not affect booleans", () => {
      expect(templateSafe("Active: {{active}}", { active: true })).toBe(
        "Active: true"
      );
    });

    it("does not affect null", () => {
      expect(templateSafe("Value: {{val}}", { val: null })).toBe("Value: ");
    });

    it("handles mixed types", () => {
      expect(
        templateSafe("{{str}} {{num}} {{bool}}", {
          str: "<b>text</b>",
          num: 123,
          bool: false,
        })
      ).toBe("&lt;b&gt;text&lt;/b&gt; 123 false");
    });
  });

  describe("with custom options", () => {
    it("works with custom delimiters", () => {
      expect(
        templateSafe(
          "Hello ${name}!",
          { name: "<script>XSS</script>" },
          { delimiters: ["${", "}"] }
        )
      ).toBe("Hello &lt;script&gt;XSS&lt;/script&gt;!");
    });

    it("works with fallback option", () => {
      // Fallback option is applied after escaping, so it's not escaped
      expect(templateSafe("Hello {{name}}!", {}, { fallback: "Guest" })).toBe(
        "Hello Guest!"
      );
    });

    it("works with keepUnmatched option", () => {
      expect(
        templateSafe(
          "{{greeting}} {{name}}!",
          { greeting: "<b>Hello</b>" },
          { keepUnmatched: true }
        )
      ).toBe("&lt;b&gt;Hello&lt;/b&gt; {{name}}!");
    });
  });

  describe("edge cases", () => {
    it("handles empty strings", () => {
      expect(templateSafe("Value: {{val}}", { val: "" })).toBe("Value: ");
    });

    it("handles strings with only whitespace", () => {
      expect(templateSafe("Value: {{val}}", { val: "   " })).toBe("Value:    ");
    });

    it("escapes HTML entities that are already escaped", () => {
      expect(templateSafe("Text: {{text}}", { text: "&lt;div&gt;" })).toBe(
        "Text: &amp;lt;div&amp;gt;"
      );
    });

    it("handles objects with toString that returns HTML", () => {
      // Objects with custom toString are not plain objects, so not escaped
      const obj = { toString: () => "<b>custom</b>" };
      expect(templateSafe("Value: {{val}}", { val: obj })).toBe(
        "Value: <b>custom</b>"
      );
    });

    it("handles large amounts of HTML content", () => {
      const longHtml = "<div>" + "<span>test</span>".repeat(100) + "</div>";
      const result = templateSafe("Content: {{html}}", { html: longHtml });
      expect(result).toContain("&lt;div&gt;");
      expect(result).toContain("&lt;span&gt;test&lt;/span&gt;");
      expect(result).not.toContain("<div>");
      expect(result).not.toContain("<span>");
    });

    it("preserves non-HTML special characters", () => {
      expect(templateSafe("Math: {{expr}}", { expr: "2 + 2 = 4" })).toBe(
        "Math: 2 + 2 = 4"
      );
    });

    it("handles Unicode characters", () => {
      expect(
        templateSafe("Text: {{text}}", { text: "🦄 <b>Unicorn</b> 🦄" })
      ).toBe("Text: 🦄 &lt;b&gt;Unicorn&lt;/b&gt; 🦄");
    });
  });
});
