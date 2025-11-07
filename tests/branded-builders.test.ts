import { describe, test, expect } from "vitest";
import {
  toEmail,
  toUrl,
  toSlug,
  toSafeHTML,
  toHexColor,
  unsafeEmail,
  unsafeUrl,
  unsafeSlug,
  unsafeSafeHTML,
  unsafeHexColor,
  ensureSlug,
} from "../src/index.js";

describe("Branded Type Builders", () => {
  describe("toEmail", () => {
    test("returns Email for valid email addresses", () => {
      const email = toEmail("user@example.com");
      expect(email).toBe("user@example.com");
      expect(email).not.toBeNull();
    });

    test("returns null for invalid email addresses", () => {
      expect(toEmail("notanemail")).toBeNull();
      expect(toEmail("@example.com")).toBeNull();
      expect(toEmail("user@")).toBeNull();
      expect(toEmail("")).toBeNull();
    });

    test("validates complex email formats", () => {
      expect(toEmail("user+tag@subdomain.example.com")).not.toBeNull();
      expect(toEmail("user.name@example.co.uk")).not.toBeNull();
      expect(toEmail("user..double@example.com")).toBeNull();
    });

    test("validates emails with apostrophes by default", () => {
      const email1 = toEmail("o'connor@example.com");
      const email2 = toEmail("d'angelo@test.co");
      expect(email1).not.toBeNull();
      expect(email2).not.toBeNull();
      expect(email1).toBe("o'connor@example.com");
    });

    test("rejects international characters by default", () => {
      expect(toEmail("josé@example.com")).toBeNull();
      expect(toEmail("müller@domain.de")).toBeNull();
      expect(toEmail("user@café.com")).toBeNull();
    });

    test("validates international characters with allowInternational option", () => {
      const email1 = toEmail("josé@example.com", { allowInternational: true });
      const email2 = toEmail("müller@domain.de", { allowInternational: true });
      const email3 = toEmail("user@café.com", { allowInternational: true });

      expect(email1).not.toBeNull();
      expect(email2).not.toBeNull();
      expect(email3).not.toBeNull();
      expect(email1).toBe("josé@example.com");
    });

    test("returns null for invalid international emails even with option", () => {
      expect(toEmail("invalid", { allowInternational: true })).toBeNull();
      expect(toEmail("@example.com", { allowInternational: true })).toBeNull();
    });
  });

  describe("toUrl", () => {
    test("returns URL for valid URLs", () => {
      const url = toUrl("https://example.com");
      expect(url).toBe("https://example.com");
      expect(url).not.toBeNull();
    });

    test("returns null for invalid URLs", () => {
      expect(toUrl("not a url")).toBeNull();
      expect(toUrl("example.com")).toBeNull();
      expect(toUrl("javascript:alert(1)")).toBeNull();
      expect(toUrl("")).toBeNull();
    });

    test("validates various URL formats", () => {
      expect(toUrl("http://localhost:3000")).not.toBeNull();
      expect(toUrl("https://sub.domain.com/path?query=1#hash")).not.toBeNull();
      expect(toUrl("ftp://files.example.com")).not.toBeNull();
      expect(toUrl("ftps://secure.example.com")).not.toBeNull();
    });
  });

  describe("toSlug", () => {
    test("transforms strings into valid slugs", () => {
      expect(toSlug("Hello World")).toBe("hello-world");
      expect(toSlug("  Multiple   Spaces  ")).toBe("multiple-spaces");
      expect(toSlug("Special!@#Characters")).toBe("specialcharacters");
      expect(toSlug("MixedCASE")).toBe("mixedcase");
    });

    test("handles already valid slugs", () => {
      expect(toSlug("already-a-slug")).toBe("already-a-slug");
      expect(toSlug("simple")).toBe("simple");
    });

    test("handles edge cases", () => {
      expect(toSlug("")).toBe("");
      expect(toSlug("   ")).toBe("");
      expect(toSlug("---")).toBe("");
      expect(toSlug("123-numbers")).toBe("123-numbers");
    });
  });

  describe("toSafeHTML", () => {
    test("sanitizes dangerous HTML by default", () => {
      const safe = toSafeHTML('<script>alert("xss")</script>Hello');
      expect(safe).toBe("Hello");
    });

    test("removes script tags and content", () => {
      const safe = toSafeHTML(
        "<p>Safe</p><script>bad()</script><p>Content</p>"
      );
      expect(safe).toBe("SafeContent");
    });

    test("strips all HTML by default", () => {
      const safe = toSafeHTML("<div><b>Bold</b> and <i>italic</i></div>");
      expect(safe).toBe("Bold and italic");
    });

    test("allows specific tags when configured", () => {
      const safe = toSafeHTML("<b>Bold</b> and <script>bad</script>", {
        allowedTags: ["b", "i", "em", "strong"],
      });
      expect(safe).toBe("<b>Bold</b> and ");
    });

    test("removes dangerous attributes from allowed tags", () => {
      const safe = toSafeHTML(
        '<div onclick="alert(1)">Click</div><b>Safe</b>',
        {
          allowedTags: ["div", "b"],
        }
      );
      expect(safe).toContain("<div>Click</div>");
      expect(safe).toContain("<b>Safe</b>");
      expect(safe).not.toContain("onclick");
    });

    test("removes non-printable characters", () => {
      const safe = toSafeHTML("Hello\x00World\x01");
      expect(safe).toBe("HelloWorld");
    });

    test("handles empty strings", () => {
      expect(toSafeHTML("")).toBe("");
    });

    test("preserves plain text", () => {
      const safe = toSafeHTML("Just plain text");
      expect(safe).toBe("Just plain text");
    });
  });

  describe("unsafeEmail", () => {
    test("casts string to Email without validation", () => {
      const email = unsafeEmail("not-validated@example");
      expect(email).toBe("not-validated@example");
      // Type is Email but no runtime validation
    });

    test("allows invalid emails when using unsafe", () => {
      const email = unsafeEmail("invalid email");
      expect(email).toBe("invalid email");
    });
  });

  describe("unsafeUrl", () => {
    test("casts string to URL without validation", () => {
      const url = unsafeUrl("not-validated-url");
      expect(url).toBe("not-validated-url");
      // Type is URL but no runtime validation
    });

    test("allows invalid URLs when using unsafe", () => {
      const url = unsafeUrl("just a string");
      expect(url).toBe("just a string");
    });
  });

  describe("unsafeSlug", () => {
    test("casts string to Slug without validation or transformation", () => {
      const slug = unsafeSlug("Not A Slug!");
      expect(slug).toBe("Not A Slug!");
      // Type is Slug but no runtime validation or transformation
    });

    test("does not transform input", () => {
      const slug = unsafeSlug("UPPERCASE");
      expect(slug).toBe("UPPERCASE");
      expect(slug).not.toBe("uppercase");
    });
  });

  describe("unsafeSafeHTML", () => {
    test("casts string to SafeHTML without sanitization", () => {
      const html = unsafeSafeHTML('<script>alert("xss")</script>');
      expect(html).toBe('<script>alert("xss")</script>');
      // Type is SafeHTML but no runtime sanitization - DANGEROUS!
    });

    test("does not sanitize dangerous content", () => {
      const html = unsafeSafeHTML('<div onclick="bad()">Click</div>');
      expect(html).toBe('<div onclick="bad()">Click</div>');
      expect(html).toContain("onclick");
    });

    test("preserves all content as-is", () => {
      const html = unsafeSafeHTML("Any string at all");
      expect(html).toBe("Any string at all");
    });
  });

  describe("ensureSlug", () => {
    test("returns existing slug as-is", () => {
      expect(ensureSlug("already-a-slug")).toBe("already-a-slug");
      expect(ensureSlug("simple")).toBe("simple");
      expect(ensureSlug("my-post-123")).toBe("my-post-123");
    });

    test("transforms non-slug strings", () => {
      expect(ensureSlug("Hello World")).toBe("hello-world");
      expect(ensureSlug("NOT_A_SLUG")).toBe("not-a-slug");
      expect(ensureSlug("Special!Characters")).toBe("specialcharacters");
    });

    test("handles edge cases", () => {
      expect(ensureSlug("")).toBe("");
      expect(ensureSlug("   spaces   ")).toBe("spaces");
      expect(ensureSlug("123")).toBe("123");
    });
  });

  describe("toHexColor", () => {
    test("returns HexColor for valid hex colors", () => {
      const color = toHexColor("#ff5733");
      expect(color).toBe("#ff5733");
      expect(color).not.toBeNull();
    });

    test("returns null for invalid hex colors", () => {
      expect(toHexColor("fff")).toBeNull();
      expect(toHexColor("#gggggg")).toBeNull();
      expect(toHexColor("#ff")).toBeNull();
      expect(toHexColor("")).toBeNull();
    });

    test("validates various hex color formats", () => {
      expect(toHexColor("#fff")).not.toBeNull();
      expect(toHexColor("#ffffff")).not.toBeNull();
      expect(toHexColor("#fff8")).not.toBeNull();
      expect(toHexColor("#ffffff80")).not.toBeNull();
      expect(toHexColor("#FFF")).not.toBeNull();
    });
  });

  describe("unsafeHexColor", () => {
    test("casts string to HexColor without validation", () => {
      const color = unsafeHexColor("not-validated");
      expect(color).toBe("not-validated");
      // Type is HexColor but no runtime validation
    });

    test("allows invalid hex colors when using unsafe", () => {
      const color = unsafeHexColor("just a string");
      expect(color).toBe("just a string");
    });
  });

  describe("ValidationResult type", () => {
    test("builder functions return correct types", () => {
      const email = toEmail("user@example.com");
      const invalidEmail = toEmail("invalid");

      // Type is Email | null
      if (email) {
        expect(email).toBe("user@example.com");
      }

      expect(invalidEmail).toBeNull();
    });
  });
});
