import { describe, test, expect } from "vitest";
import { branded } from "../src/index.js";

describe("Branded Type Builders", () => {
  describe("toEmail", () => {
    test("returns Email for valid email addresses", () => {
      const email = branded.toEmail("user@example.com");
      expect(email).toBe("user@example.com");
      expect(email).not.toBeNull();
    });

    test("returns null for invalid email addresses", () => {
      expect(branded.toEmail("notanemail")).toBeNull();
      expect(branded.toEmail("@example.com")).toBeNull();
      expect(branded.toEmail("user@")).toBeNull();
      expect(branded.toEmail("")).toBeNull();
    });

    test("validates complex email formats", () => {
      expect(branded.toEmail("user+tag@subdomain.example.com")).not.toBeNull();
      expect(branded.toEmail("user.name@example.co.uk")).not.toBeNull();
      expect(branded.toEmail("user..double@example.com")).toBeNull();
    });
  });

  describe("toUrl", () => {
    test("returns URL for valid URLs", () => {
      const url = branded.toUrl("https://example.com");
      expect(url).toBe("https://example.com");
      expect(url).not.toBeNull();
    });

    test("returns null for invalid URLs", () => {
      expect(branded.toUrl("not a url")).toBeNull();
      expect(branded.toUrl("example.com")).toBeNull();
      expect(branded.toUrl("javascript:alert(1)")).toBeNull();
      expect(branded.toUrl("")).toBeNull();
    });

    test("validates various URL formats", () => {
      expect(branded.toUrl("http://localhost:3000")).not.toBeNull();
      expect(
        branded.toUrl("https://sub.domain.com/path?query=1#hash")
      ).not.toBeNull();
      expect(branded.toUrl("ftp://files.example.com")).not.toBeNull();
      expect(branded.toUrl("ftps://secure.example.com")).not.toBeNull();
    });
  });

  describe("toSlug", () => {
    test("transforms strings into valid slugs", () => {
      expect(branded.toSlug("Hello World")).toBe("hello-world");
      expect(branded.toSlug("  Multiple   Spaces  ")).toBe("multiple-spaces");
      expect(branded.toSlug("Special!@#Characters")).toBe("specialcharacters");
      expect(branded.toSlug("MixedCASE")).toBe("mixedcase");
    });

    test("handles already valid slugs", () => {
      expect(branded.toSlug("already-a-slug")).toBe("already-a-slug");
      expect(branded.toSlug("simple")).toBe("simple");
    });

    test("handles edge cases", () => {
      expect(branded.toSlug("")).toBe("");
      expect(branded.toSlug("   ")).toBe("");
      expect(branded.toSlug("---")).toBe("");
      expect(branded.toSlug("123-numbers")).toBe("123-numbers");
    });
  });

  describe("unsafeEmail", () => {
    test("casts string to Email without validation", () => {
      const email = branded.unsafeEmail("not-validated@example");
      expect(email).toBe("not-validated@example");
      // Type is Email but no runtime validation
    });

    test("allows invalid emails when using unsafe", () => {
      const email = branded.unsafeEmail("invalid email");
      expect(email).toBe("invalid email");
    });
  });

  describe("unsafeUrl", () => {
    test("casts string to URL without validation", () => {
      const url = branded.unsafeUrl("not-validated-url");
      expect(url).toBe("not-validated-url");
      // Type is URL but no runtime validation
    });

    test("allows invalid URLs when using unsafe", () => {
      const url = branded.unsafeUrl("just a string");
      expect(url).toBe("just a string");
    });
  });

  describe("unsafeSlug", () => {
    test("casts string to Slug without validation or transformation", () => {
      const slug = branded.unsafeSlug("Not A Slug!");
      expect(slug).toBe("Not A Slug!");
      // Type is Slug but no runtime validation or transformation
    });

    test("does not transform input", () => {
      const slug = branded.unsafeSlug("UPPERCASE");
      expect(slug).toBe("UPPERCASE");
      expect(slug).not.toBe("uppercase");
    });
  });

  describe("ensureSlug", () => {
    test("returns existing slug as-is", () => {
      expect(branded.ensureSlug("already-a-slug")).toBe("already-a-slug");
      expect(branded.ensureSlug("simple")).toBe("simple");
      expect(branded.ensureSlug("my-post-123")).toBe("my-post-123");
    });

    test("transforms non-slug strings", () => {
      expect(branded.ensureSlug("Hello World")).toBe("hello-world");
      expect(branded.ensureSlug("NOT_A_SLUG")).toBe("not-a-slug");
      expect(branded.ensureSlug("Special!Characters")).toBe(
        "specialcharacters"
      );
    });

    test("handles edge cases", () => {
      expect(branded.ensureSlug("")).toBe("");
      expect(branded.ensureSlug("   spaces   ")).toBe("spaces");
      expect(branded.ensureSlug("123")).toBe("123");
    });
  });

  describe("ValidationResult type", () => {
    test("builder functions return correct types", () => {
      const email = branded.toEmail("user@example.com");
      const invalidEmail = branded.toEmail("invalid");

      // Type is Email | null
      if (email) {
        expect(email).toBe("user@example.com");
      }

      expect(invalidEmail).toBeNull();
    });
  });
});
