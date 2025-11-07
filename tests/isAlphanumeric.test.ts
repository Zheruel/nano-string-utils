import { describe, it, expect } from "vitest";
import { isAlphanumeric } from "../src/isAlphanumeric.js";
import {
  isValidAlphanumeric,
  toAlphanumericString,
  unsafeAlphanumericString,
  assertAlphanumericString,
  BrandedTypeError,
  type AlphanumericString,
} from "../src/types/index.js";

describe("isAlphanumeric", () => {
  describe("valid alphanumeric strings", () => {
    it("should return true for lowercase letters", () => {
      expect(isAlphanumeric("abc")).toBe(true);
      expect(isAlphanumeric("hello")).toBe(true);
      expect(isAlphanumeric("xyz")).toBe(true);
    });

    it("should return true for uppercase letters", () => {
      expect(isAlphanumeric("ABC")).toBe(true);
      expect(isAlphanumeric("HELLO")).toBe(true);
      expect(isAlphanumeric("XYZ")).toBe(true);
    });

    it("should return true for mixed case letters", () => {
      expect(isAlphanumeric("Hello")).toBe(true);
      expect(isAlphanumeric("HeLLo")).toBe(true);
      expect(isAlphanumeric("AbCdEf")).toBe(true);
    });

    it("should return true for numbers only", () => {
      expect(isAlphanumeric("123")).toBe(true);
      expect(isAlphanumeric("0")).toBe(true);
      expect(isAlphanumeric("987654321")).toBe(true);
    });

    it("should return true for mixed alphanumeric", () => {
      expect(isAlphanumeric("abc123")).toBe(true);
      expect(isAlphanumeric("hello123")).toBe(true);
      expect(isAlphanumeric("123abc")).toBe(true);
      expect(isAlphanumeric("a1b2c3")).toBe(true);
      expect(isAlphanumeric("Test123")).toBe(true);
      expect(isAlphanumeric("ABC123XYZ")).toBe(true);
    });

    it("should return true for common username patterns", () => {
      expect(isAlphanumeric("user123")).toBe(true);
      expect(isAlphanumeric("admin2024")).toBe(true);
      expect(isAlphanumeric("JohnDoe42")).toBe(true);
    });

    it("should return true for common identifier patterns", () => {
      expect(isAlphanumeric("id123")).toBe(true);
      expect(isAlphanumeric("ABC123")).toBe(true);
      expect(isAlphanumeric("ref99999")).toBe(true);
    });
  });

  describe("invalid strings", () => {
    it("should return false for empty string", () => {
      expect(isAlphanumeric("")).toBe(false);
    });

    it("should return false for whitespace only", () => {
      expect(isAlphanumeric(" ")).toBe(false);
      expect(isAlphanumeric("  ")).toBe(false);
      expect(isAlphanumeric("\t")).toBe(false);
      expect(isAlphanumeric("\n")).toBe(false);
    });

    it("should trim leading whitespace", () => {
      expect(isAlphanumeric(" abc")).toBe(true);
      expect(isAlphanumeric("  hello123")).toBe(true);
      expect(isAlphanumeric("\tabc")).toBe(true);
    });

    it("should trim trailing whitespace", () => {
      expect(isAlphanumeric("abc ")).toBe(true);
      expect(isAlphanumeric("hello123  ")).toBe(true);
      expect(isAlphanumeric("abc\t")).toBe(true);
    });

    it("should return false for strings with internal whitespace", () => {
      expect(isAlphanumeric("hello world")).toBe(false);
      expect(isAlphanumeric("abc 123")).toBe(false);
      expect(isAlphanumeric("a b c")).toBe(false);
    });

    it("should return false for strings with hyphens", () => {
      expect(isAlphanumeric("hello-world")).toBe(false);
      expect(isAlphanumeric("user-123")).toBe(false);
      expect(isAlphanumeric("abc-def-123")).toBe(false);
    });

    it("should return false for strings with underscores", () => {
      expect(isAlphanumeric("hello_world")).toBe(false);
      expect(isAlphanumeric("user_123")).toBe(false);
      expect(isAlphanumeric("test_user_name")).toBe(false);
    });

    it("should return false for strings with special characters", () => {
      expect(isAlphanumeric("hello!")).toBe(false);
      expect(isAlphanumeric("test@example")).toBe(false);
      expect(isAlphanumeric("abc#123")).toBe(false);
      expect(isAlphanumeric("user$name")).toBe(false);
      expect(isAlphanumeric("hello%world")).toBe(false);
      expect(isAlphanumeric("test&test")).toBe(false);
      expect(isAlphanumeric("abc*xyz")).toBe(false);
    });

    it("should return false for strings with punctuation", () => {
      expect(isAlphanumeric("hello.world")).toBe(false);
      expect(isAlphanumeric("test,user")).toBe(false);
      expect(isAlphanumeric("abc;def")).toBe(false);
      expect(isAlphanumeric("hello:world")).toBe(false);
      expect(isAlphanumeric("test?")).toBe(false);
    });

    it("should return false for Unicode letters", () => {
      expect(isAlphanumeric("café")).toBe(false);
      expect(isAlphanumeric("héllo")).toBe(false);
      expect(isAlphanumeric("niño")).toBe(false);
      expect(isAlphanumeric("中文")).toBe(false);
      expect(isAlphanumeric("日本語")).toBe(false);
      expect(isAlphanumeric("Ελληνικά")).toBe(false);
    });

    it("should return false for emoji", () => {
      expect(isAlphanumeric("hello😀")).toBe(false);
      expect(isAlphanumeric("test👍")).toBe(false);
      expect(isAlphanumeric("🚀")).toBe(false);
    });

    it("should return false for mixed valid/invalid characters", () => {
      expect(isAlphanumeric("hello!world123")).toBe(false);
      expect(isAlphanumeric("test_123")).toBe(false);
      expect(isAlphanumeric("abc-xyz")).toBe(false);
    });
  });

  describe("branded type integration", () => {
    describe("isValidAlphanumeric type guard", () => {
      it("should narrow type for valid alphanumeric strings", () => {
        const input: string = "user123";
        if (isValidAlphanumeric(input)) {
          const username: AlphanumericString = input;
          expect(username).toBe("user123");
        }
      });

      it("should return true for valid alphanumeric", () => {
        expect(isValidAlphanumeric("abc123")).toBe(true);
        expect(isValidAlphanumeric("Hello123")).toBe(true);
      });

      it("should return false for invalid alphanumeric", () => {
        expect(isValidAlphanumeric("hello_world")).toBe(false);
        expect(isValidAlphanumeric("test-123")).toBe(false);
        expect(isValidAlphanumeric("hello world")).toBe(false);
      });
    });

    describe("toAlphanumericString builder", () => {
      it("should return AlphanumericString for valid input", () => {
        const result = toAlphanumericString("user123");
        expect(result).toBe("user123");
        if (result) {
          const username: AlphanumericString = result;
          expect(username).toBe("user123");
        }
      });

      it("should return null for invalid input", () => {
        expect(toAlphanumericString("hello_world")).toBeNull();
        expect(toAlphanumericString("test-123")).toBeNull();
        expect(toAlphanumericString("")).toBeNull();
        expect(toAlphanumericString("hello world")).toBeNull();
      });

      it("should work with various valid formats", () => {
        expect(toAlphanumericString("abc")).toBe("abc");
        expect(toAlphanumericString("ABC123")).toBe("ABC123");
        expect(toAlphanumericString("Test123")).toBe("Test123");
      });
    });

    describe("unsafeAlphanumericString", () => {
      it("should create AlphanumericString without validation", () => {
        const result = unsafeAlphanumericString("user123");
        const username: AlphanumericString = result;
        expect(username).toBe("user123");
      });

      it("should not validate input", () => {
        // This is unsafe and bypasses validation
        const invalid = unsafeAlphanumericString("hello_world");
        expect(invalid).toBe("hello_world");
      });
    });

    describe("assertAlphanumericString", () => {
      it("should not throw for valid alphanumeric strings", () => {
        expect(() => assertAlphanumericString("user123")).not.toThrow();
        expect(() => assertAlphanumericString("ABC123")).not.toThrow();
      });

      it("should throw BrandedTypeError for invalid strings", () => {
        expect(() => assertAlphanumericString("hello_world")).toThrow(
          BrandedTypeError
        );
        expect(() => assertAlphanumericString("test-123")).toThrow(
          BrandedTypeError
        );
        expect(() => assertAlphanumericString("")).toThrow(BrandedTypeError);
      });

      it("should throw with correct error message", () => {
        expect(() => assertAlphanumericString("hello_world")).toThrow(
          'Invalid AlphanumericString: "hello_world"'
        );
      });

      it("should support custom error message", () => {
        expect(() =>
          assertAlphanumericString("hello_world", "Username")
        ).toThrow('Invalid Username: "hello_world"');
      });

      it("should narrow type after assertion", () => {
        const input: string = "user123";
        assertAlphanumericString(input);
        const username: AlphanumericString = input;
        expect(username).toBe("user123");
      });
    });
  });

  describe("edge cases", () => {
    it("should handle single characters", () => {
      expect(isAlphanumeric("a")).toBe(true);
      expect(isAlphanumeric("Z")).toBe(true);
      expect(isAlphanumeric("5")).toBe(true);
      expect(isAlphanumeric("_")).toBe(false);
      expect(isAlphanumeric("-")).toBe(false);
    });

    it("should handle very long strings", () => {
      const longValid = "a".repeat(1000) + "123";
      expect(isAlphanumeric(longValid)).toBe(true);

      const longInvalid = "a".repeat(500) + "_" + "b".repeat(500);
      expect(isAlphanumeric(longInvalid)).toBe(false);
    });
  });
});
