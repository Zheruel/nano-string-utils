import { describe, test, expect } from "vitest";
import {
  BrandedTypeError,
  assertEmail,
  assertUrl,
  assertSlug,
} from "../src/index.js";

describe("Branded Type Assertions", () => {
  describe("assertEmail", () => {
    test("passes for valid email addresses", () => {
      expect(() => assertEmail("user@example.com")).not.toThrow();
      expect(() => assertEmail("test@domain.co.uk")).not.toThrow();
    });

    test("throws BrandedTypeError for invalid emails", () => {
      expect(() => assertEmail("notanemail")).toThrow(BrandedTypeError);
      expect(() => assertEmail("notanemail")).toThrow(
        'Invalid Email: "notanemail"'
      );
      expect(() => assertEmail("@example.com")).toThrow(BrandedTypeError);
    });

    test("throws with custom message", () => {
      expect(() => assertEmail("invalid", "Custom email error")).toThrow(
        'Invalid Custom email error: "invalid"'
      );
    });

    test("type assertion works", () => {
      const input: string = "user@example.com";
      assertEmail(input);
      // After assertion, TypeScript knows input is Email
      // This is a compile-time check, runtime just verifies no throw
      expect(input).toBe("user@example.com");
    });
  });

  describe("assertUrl", () => {
    test("passes for valid URLs", () => {
      expect(() => assertUrl("https://example.com")).not.toThrow();
      expect(() => assertUrl("http://localhost:3000")).not.toThrow();
    });

    test("throws BrandedTypeError for invalid URLs", () => {
      expect(() => assertUrl("not a url")).toThrow(BrandedTypeError);
      expect(() => assertUrl("not a url")).toThrow('Invalid URL: "not a url"');
      expect(() => assertUrl("example.com")).toThrow(BrandedTypeError);
    });

    test("throws with custom message", () => {
      expect(() => assertUrl("invalid", "Custom URL error")).toThrow(
        'Invalid Custom URL error: "invalid"'
      );
    });

    test("type assertion works", () => {
      const input: string = "https://example.com";
      assertUrl(input);
      // After assertion, TypeScript knows input is URL
      expect(input).toBe("https://example.com");
    });
  });

  describe("assertSlug", () => {
    test("passes for valid slugs", () => {
      expect(() => assertSlug("hello-world")).not.toThrow();
      expect(() => assertSlug("my-post-123")).not.toThrow();
    });

    test("throws BrandedTypeError for invalid slugs", () => {
      expect(() => assertSlug("Hello World")).toThrow(BrandedTypeError);
      expect(() => assertSlug("Hello World")).toThrow(
        'Invalid Slug: "Hello World"'
      );
      expect(() => assertSlug("UPPERCASE")).toThrow(BrandedTypeError);
    });

    test("throws with custom message", () => {
      expect(() => assertSlug("Invalid Slug!", "Custom slug error")).toThrow(
        'Invalid Custom slug error: "Invalid Slug!"'
      );
    });

    test("type assertion works", () => {
      const input: string = "hello-world";
      assertSlug(input);
      // After assertion, TypeScript knows input is Slug
      expect(input).toBe("hello-world");
    });
  });

  describe("BrandedTypeError", () => {
    test("is an instance of Error", () => {
      const error = new BrandedTypeError("Email", "invalid");
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(BrandedTypeError);
    });

    test("has correct name property", () => {
      const error = new BrandedTypeError("Email", "invalid");
      expect(error.name).toBe("BrandedTypeError");
    });

    test("has correct message format", () => {
      const error = new BrandedTypeError("Email", "test@invalid");
      expect(error.message).toBe('Invalid Email: "test@invalid"');
    });
  });
});
