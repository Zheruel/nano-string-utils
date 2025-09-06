import { describe, test, expect } from "vitest";
import { branded } from "../src/index.js";

describe("Branded Type Guards", () => {
  describe("isValidEmail", () => {
    test("returns true for valid email addresses", () => {
      expect(branded.isValidEmail("user@example.com")).toBe(true);
      expect(branded.isValidEmail("test.user@domain.co.uk")).toBe(true);
      expect(branded.isValidEmail("admin+tag@company.org")).toBe(true);
      expect(branded.isValidEmail("john.doe@sub.domain.com")).toBe(true);
    });

    test("returns false for invalid email addresses", () => {
      expect(branded.isValidEmail("notanemail")).toBe(false);
      expect(branded.isValidEmail("@example.com")).toBe(false);
      expect(branded.isValidEmail("user@")).toBe(false);
      expect(branded.isValidEmail("user..name@example.com")).toBe(false);
      expect(branded.isValidEmail("user@example.")).toBe(false);
      expect(branded.isValidEmail("user#example.com")).toBe(false);
      expect(branded.isValidEmail("")).toBe(false);
    });

    test("type narrows to Email", () => {
      const input: string = "user@example.com";
      if (branded.isValidEmail(input)) {
        // TypeScript should recognize input as Email here
        // This is compile-time check, runtime just verifies the guard works
        expect(input).toBe("user@example.com");
      }
    });
  });

  describe("isValidUrl", () => {
    test("returns true for valid URLs", () => {
      expect(branded.isValidUrl("https://example.com")).toBe(true);
      expect(branded.isValidUrl("http://localhost:3000")).toBe(true);
      expect(branded.isValidUrl("https://sub.domain.com/path?query=1")).toBe(
        true
      );
      expect(branded.isValidUrl("ftp://files.example.com")).toBe(true);
      expect(branded.isValidUrl("https://example.com#anchor")).toBe(true);
    });

    test("returns false for invalid URLs", () => {
      expect(branded.isValidUrl("not a url")).toBe(false);
      expect(branded.isValidUrl("example.com")).toBe(false);
      expect(branded.isValidUrl("//example.com")).toBe(false);
      expect(branded.isValidUrl("javascript:alert(1)")).toBe(false);
      expect(branded.isValidUrl("http://example..com")).toBe(false);
      expect(branded.isValidUrl("")).toBe(false);
    });

    test("type narrows to URL", () => {
      const input: string = "https://example.com";
      if (branded.isValidUrl(input)) {
        // TypeScript should recognize input as URL here
        expect(input).toBe("https://example.com");
      }
    });
  });

  describe("isSlug", () => {
    test("returns true for valid slugs", () => {
      expect(branded.isSlug("hello-world")).toBe(true);
      expect(branded.isSlug("my-awesome-post-123")).toBe(true);
      expect(branded.isSlug("product")).toBe(true);
      expect(branded.isSlug("2024-update")).toBe(true);
      expect(branded.isSlug("a-b-c-d-e")).toBe(true);
    });

    test("returns false for non-slug strings", () => {
      expect(branded.isSlug("Hello World")).toBe(false);
      expect(branded.isSlug("hello_world")).toBe(false);
      expect(branded.isSlug("UPPERCASE")).toBe(false);
      expect(branded.isSlug("hello--world")).toBe(false);
      expect(branded.isSlug("-start")).toBe(false);
      expect(branded.isSlug("end-")).toBe(false);
      expect(branded.isSlug("special!char")).toBe(false);
      expect(branded.isSlug("")).toBe(false);
    });

    test("type narrows to Slug", () => {
      const input: string = "hello-world";
      if (branded.isSlug(input)) {
        // TypeScript should recognize input as Slug here
        expect(input).toBe("hello-world");
      }
    });
  });
});
