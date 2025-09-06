import { describe, test, expect } from "vitest";
import { branded } from "../src/index.js";

describe("Branded Type Assertions", () => {
  describe("assertEmail", () => {
    test("passes for valid email addresses", () => {
      expect(() => branded.assertEmail("user@example.com")).not.toThrow();
      expect(() => branded.assertEmail("test@domain.co.uk")).not.toThrow();
    });

    test("throws BrandedTypeError for invalid emails", () => {
      expect(() => branded.assertEmail("notanemail")).toThrow(
        branded.BrandedTypeError
      );
      expect(() => branded.assertEmail("notanemail")).toThrow(
        'Invalid Email: "notanemail"'
      );
      expect(() => branded.assertEmail("@example.com")).toThrow(
        branded.BrandedTypeError
      );
    });

    test("throws with custom message", () => {
      expect(() =>
        branded.assertEmail("invalid", "Custom email error")
      ).toThrow('Invalid Custom email error: "invalid"');
    });

    test("type assertion works", () => {
      const input: string = "user@example.com";
      branded.assertEmail(input);
      // After assertion, TypeScript knows input is Email
      // This is a compile-time check, runtime just verifies no throw
      expect(input).toBe("user@example.com");
    });
  });

  describe("assertUrl", () => {
    test("passes for valid URLs", () => {
      expect(() => branded.assertUrl("https://example.com")).not.toThrow();
      expect(() => branded.assertUrl("http://localhost:3000")).not.toThrow();
    });

    test("throws BrandedTypeError for invalid URLs", () => {
      expect(() => branded.assertUrl("not a url")).toThrow(
        branded.BrandedTypeError
      );
      expect(() => branded.assertUrl("not a url")).toThrow(
        'Invalid URL: "not a url"'
      );
      expect(() => branded.assertUrl("example.com")).toThrow(
        branded.BrandedTypeError
      );
    });

    test("throws with custom message", () => {
      expect(() => branded.assertUrl("invalid", "Custom URL error")).toThrow(
        'Invalid Custom URL error: "invalid"'
      );
    });

    test("type assertion works", () => {
      const input: string = "https://example.com";
      branded.assertUrl(input);
      // After assertion, TypeScript knows input is URL
      expect(input).toBe("https://example.com");
    });
  });

  describe("assertSlug", () => {
    test("passes for valid slugs", () => {
      expect(() => branded.assertSlug("hello-world")).not.toThrow();
      expect(() => branded.assertSlug("my-post-123")).not.toThrow();
    });

    test("throws BrandedTypeError for invalid slugs", () => {
      expect(() => branded.assertSlug("Hello World")).toThrow(
        branded.BrandedTypeError
      );
      expect(() => branded.assertSlug("Hello World")).toThrow(
        'Invalid Slug: "Hello World"'
      );
      expect(() => branded.assertSlug("UPPERCASE")).toThrow(
        branded.BrandedTypeError
      );
    });

    test("throws with custom message", () => {
      expect(() =>
        branded.assertSlug("Invalid Slug!", "Custom slug error")
      ).toThrow('Invalid Custom slug error: "Invalid Slug!"');
    });

    test("type assertion works", () => {
      const input: string = "hello-world";
      branded.assertSlug(input);
      // After assertion, TypeScript knows input is Slug
      expect(input).toBe("hello-world");
    });
  });

  describe("BrandedTypeError", () => {
    test("is an instance of Error", () => {
      const error = new branded.BrandedTypeError("Email", "invalid");
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(branded.BrandedTypeError);
    });

    test("has correct name property", () => {
      const error = new branded.BrandedTypeError("Email", "invalid");
      expect(error.name).toBe("BrandedTypeError");
    });

    test("has correct message format", () => {
      const error = new branded.BrandedTypeError("Email", "test@invalid");
      expect(error.message).toBe('Invalid Email: "test@invalid"');
    });
  });
});
