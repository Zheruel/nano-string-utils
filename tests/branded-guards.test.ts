import { describe, test, expect } from "vitest";
import {
  isValidEmail,
  isValidUrl,
  isSlug,
  isValidHexColor,
} from "../src/index.js";

describe("Branded Type Guards", () => {
  describe("isValidEmail", () => {
    test("returns true for valid email addresses", () => {
      expect(isValidEmail("user@example.com")).toBe(true);
      expect(isValidEmail("test.user@domain.co.uk")).toBe(true);
      expect(isValidEmail("admin+tag@company.org")).toBe(true);
      expect(isValidEmail("john.doe@sub.domain.com")).toBe(true);
    });

    test("returns false for invalid email addresses", () => {
      expect(isValidEmail("notanemail")).toBe(false);
      expect(isValidEmail("@example.com")).toBe(false);
      expect(isValidEmail("user@")).toBe(false);
      expect(isValidEmail("user..name@example.com")).toBe(false);
      expect(isValidEmail("user@example.")).toBe(false);
      expect(isValidEmail("user#example.com")).toBe(false);
      expect(isValidEmail("")).toBe(false);
    });

    test("validates emails with apostrophes by default", () => {
      expect(isValidEmail("o'connor@example.com")).toBe(true);
      expect(isValidEmail("d'angelo@test.co")).toBe(true);
    });

    test("rejects international characters by default", () => {
      expect(isValidEmail("josé@example.com")).toBe(false);
      expect(isValidEmail("müller@domain.de")).toBe(false);
    });

    test("validates international characters with allowInternational option", () => {
      expect(
        isValidEmail("josé@example.com", { allowInternational: true })
      ).toBe(true);
      expect(
        isValidEmail("müller@domain.de", { allowInternational: true })
      ).toBe(true);
      expect(isValidEmail("user@café.com", { allowInternational: true })).toBe(
        true
      );
    });

    test("type narrows to Email", () => {
      const input: string = "user@example.com";
      if (isValidEmail(input)) {
        // TypeScript should recognize input as Email here
        // This is compile-time check, runtime just verifies the guard works
        expect(input).toBe("user@example.com");
      }
    });
  });

  describe("isValidUrl", () => {
    test("returns true for valid URLs", () => {
      expect(isValidUrl("https://example.com")).toBe(true);
      expect(isValidUrl("http://localhost:3000")).toBe(true);
      expect(isValidUrl("https://sub.domain.com/path?query=1")).toBe(true);
      expect(isValidUrl("ftp://files.example.com")).toBe(true);
      expect(isValidUrl("https://example.com#anchor")).toBe(true);
    });

    test("returns false for invalid URLs", () => {
      expect(isValidUrl("not a url")).toBe(false);
      expect(isValidUrl("example.com")).toBe(false);
      expect(isValidUrl("//example.com")).toBe(false);
      expect(isValidUrl("javascript:alert(1)")).toBe(false);
      expect(isValidUrl("http://example..com")).toBe(false);
      expect(isValidUrl("")).toBe(false);
    });

    test("type narrows to URL", () => {
      const input: string = "https://example.com";
      if (isValidUrl(input)) {
        // TypeScript should recognize input as URL here
        expect(input).toBe("https://example.com");
      }
    });
  });

  describe("isSlug", () => {
    test("returns true for valid slugs", () => {
      expect(isSlug("hello-world")).toBe(true);
      expect(isSlug("my-awesome-post-123")).toBe(true);
      expect(isSlug("product")).toBe(true);
      expect(isSlug("2024-update")).toBe(true);
      expect(isSlug("a-b-c-d-e")).toBe(true);
    });

    test("returns false for non-slug strings", () => {
      expect(isSlug("Hello World")).toBe(false);
      expect(isSlug("hello_world")).toBe(false);
      expect(isSlug("UPPERCASE")).toBe(false);
      expect(isSlug("hello--world")).toBe(false);
      expect(isSlug("-start")).toBe(false);
      expect(isSlug("end-")).toBe(false);
      expect(isSlug("special!char")).toBe(false);
      expect(isSlug("")).toBe(false);
    });

    test("type narrows to Slug", () => {
      const input: string = "hello-world";
      if (isSlug(input)) {
        // TypeScript should recognize input as Slug here
        expect(input).toBe("hello-world");
      }
    });
  });

  describe("isValidHexColor", () => {
    test("returns true for valid hex colors", () => {
      expect(isValidHexColor("#fff")).toBe(true);
      expect(isValidHexColor("#ffffff")).toBe(true);
      expect(isValidHexColor("#fff8")).toBe(true);
      expect(isValidHexColor("#ffffff80")).toBe(true);
      expect(isValidHexColor("#FFF")).toBe(true);
      expect(isValidHexColor("#FF5733")).toBe(true);
    });

    test("returns false for invalid hex colors", () => {
      expect(isValidHexColor("fff")).toBe(false);
      expect(isValidHexColor("#gggggg")).toBe(false);
      expect(isValidHexColor("#ff")).toBe(false);
      expect(isValidHexColor("# fff")).toBe(false);
      expect(isValidHexColor("")).toBe(false);
    });

    test("type narrows to HexColor", () => {
      const input: string = "#ff5733";
      if (isValidHexColor(input)) {
        // TypeScript should recognize input as HexColor here
        expect(input).toBe("#ff5733");
      }
    });
  });
});
