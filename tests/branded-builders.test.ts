import { describe, test, expect } from "vitest";
import {
  toEmail,
  toUrl,
  toSlug,
  unsafeEmail,
  unsafeUrl,
  unsafeSlug,
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
