import { describe, it, expect } from "vitest";
import { isUUID } from "../src/isUUID.js";
import {
  isValidUUID,
  toUUID,
  unsafeUUID,
  assertUUID,
  BrandedTypeError,
  type UUID,
} from "../src/types/index.js";

describe("isUUID", () => {
  describe("valid UUIDs", () => {
    it("should return true for valid UUID v4", () => {
      expect(isUUID("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
      expect(isUUID("6ba7b810-9dad-11d1-80b4-00c04fd430c8")).toBe(true);
      expect(isUUID("f47ac10b-58cc-4372-a567-0e02b2c3d479")).toBe(true);
    });

    it("should return true for valid UUID v1", () => {
      expect(isUUID("6ba7b810-9dad-11d1-80b4-00c04fd430c8")).toBe(true);
      expect(isUUID("c232ab00-9414-11ec-b3c8-9f6bdeced846")).toBe(true);
    });

    it("should return true for NIL UUID", () => {
      expect(isUUID("00000000-0000-0000-0000-000000000000")).toBe(true);
    });

    it("should return true for UUID v3 (MD5)", () => {
      expect(isUUID("a3bb189e-8bf9-3888-9912-ace4e6543002")).toBe(true);
    });

    it("should return true for UUID v5 (SHA-1)", () => {
      expect(isUUID("886313e1-3b8a-5372-9b90-0c9aee199e5d")).toBe(true);
    });

    it("should accept uppercase UUIDs", () => {
      expect(isUUID("550E8400-E29B-41D4-A716-446655440000")).toBe(true);
      expect(isUUID("6BA7B810-9DAD-11D1-80B4-00C04FD430C8")).toBe(true);
    });

    it("should accept mixed case UUIDs", () => {
      expect(isUUID("550e8400-E29B-41d4-A716-446655440000")).toBe(true);
      expect(isUUID("6BA7b810-9dad-11D1-80b4-00c04FD430c8")).toBe(true);
    });

    it("should accept all hex digits", () => {
      expect(isUUID("0123456789abcdef-0123-4567-89ab-cdef01234567")).toBe(
        false
      ); // wrong format
      expect(isUUID("01234567-89ab-cdef-0123-456789abcdef")).toBe(true);
      expect(isUUID("fedcba98-7654-3210-fedc-ba9876543210")).toBe(true);
    });
  });

  describe("invalid UUIDs", () => {
    it("should return false for empty string", () => {
      expect(isUUID("")).toBe(false);
    });

    it("should return false for UUIDs without hyphens", () => {
      expect(isUUID("550e8400e29b41d4a716446655440000")).toBe(false);
    });

    it("should return false for UUIDs with incorrect hyphen positions", () => {
      expect(isUUID("550e84-00e29b-41d4a7-16446655440000")).toBe(false);
      expect(isUUID("550e840-0e29b-41d4-a716-446655440000")).toBe(false);
    });

    it("should return false for UUIDs that are too short", () => {
      expect(isUUID("550e8400-e29b-41d4-a716")).toBe(false);
      expect(isUUID("550e8400-e29b-41d4")).toBe(false);
      expect(isUUID("550e8400-e29b")).toBe(false);
    });

    it("should return false for UUIDs that are too long", () => {
      expect(isUUID("550e8400-e29b-41d4-a716-446655440000-extra")).toBe(false);
      expect(isUUID("550e8400-e29b-41d4-a716-446655440000a")).toBe(false);
    });

    it("should return false for UUIDs with invalid characters", () => {
      expect(isUUID("550e8400-e29b-41d4-a716-44665544000g")).toBe(false); // 'g' not hex
      expect(isUUID("550e8400-e29b-41d4-a716-44665544000z")).toBe(false); // 'z' not hex
      expect(isUUID("550e8400-e29b-41d4-a716-44665544000!")).toBe(false); // special char
    });

    it("should return false for strings with spaces", () => {
      expect(isUUID("550e8400 e29b 41d4 a716 446655440000")).toBe(false);
      expect(isUUID(" 550e8400-e29b-41d4-a716-446655440000")).toBe(false);
      expect(isUUID("550e8400-e29b-41d4-a716-446655440000 ")).toBe(false);
    });

    it("should return false for non-UUID strings", () => {
      expect(isUUID("not-a-uuid")).toBe(false);
      expect(isUUID("hello-world-test-data-string")).toBe(false);
      expect(isUUID("123-456-789")).toBe(false);
    });

    it("should return false for partial UUIDs", () => {
      expect(isUUID("550e8400-e29b-41d4-a716-4466554400")).toBe(false); // missing 2 chars
      expect(isUUID("550e8400-e29b-41d4-a71-446655440000")).toBe(false); // 4th group too short
    });
  });

  describe("branded type integration", () => {
    describe("isValidUUID type guard", () => {
      it("should narrow type for valid UUIDs", () => {
        const input: string = "550e8400-e29b-41d4-a716-446655440000";
        if (isValidUUID(input)) {
          const id: UUID = input;
          expect(id).toBe("550e8400-e29b-41d4-a716-446655440000");
        }
      });

      it("should return true for valid UUIDs", () => {
        expect(isValidUUID("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
        expect(isValidUUID("00000000-0000-0000-0000-000000000000")).toBe(true);
      });

      it("should return false for invalid UUIDs", () => {
        expect(isValidUUID("not-a-uuid")).toBe(false);
        expect(isValidUUID("550e8400e29b41d4a716446655440000")).toBe(false);
        expect(isValidUUID("")).toBe(false);
      });
    });

    describe("toUUID builder", () => {
      it("should return UUID for valid input", () => {
        const result = toUUID("550e8400-e29b-41d4-a716-446655440000");
        expect(result).toBe("550e8400-e29b-41d4-a716-446655440000");
        if (result) {
          const id: UUID = result;
          expect(id).toBe("550e8400-e29b-41d4-a716-446655440000");
        }
      });

      it("should return null for invalid input", () => {
        expect(toUUID("not-a-uuid")).toBeNull();
        expect(toUUID("550e8400e29b41d4a716446655440000")).toBeNull();
        expect(toUUID("")).toBeNull();
        expect(toUUID("550e8400-e29b-41d4-a716-44665544000g")).toBeNull();
      });

      it("should work with various valid UUID formats", () => {
        expect(toUUID("550e8400-e29b-41d4-a716-446655440000")).toBe(
          "550e8400-e29b-41d4-a716-446655440000"
        );
        expect(toUUID("00000000-0000-0000-0000-000000000000")).toBe(
          "00000000-0000-0000-0000-000000000000"
        );
        expect(toUUID("550E8400-E29B-41D4-A716-446655440000")).toBe(
          "550E8400-E29B-41D4-A716-446655440000"
        );
      });
    });

    describe("unsafeUUID", () => {
      it("should create UUID without validation", () => {
        const result = unsafeUUID("550e8400-e29b-41d4-a716-446655440000");
        const id: UUID = result;
        expect(id).toBe("550e8400-e29b-41d4-a716-446655440000");
      });

      it("should not validate input", () => {
        // This is unsafe and bypasses validation
        const invalid = unsafeUUID("not-a-uuid");
        expect(invalid).toBe("not-a-uuid");
      });
    });

    describe("assertUUID", () => {
      it("should not throw for valid UUIDs", () => {
        expect(() =>
          assertUUID("550e8400-e29b-41d4-a716-446655440000")
        ).not.toThrow();
        expect(() =>
          assertUUID("00000000-0000-0000-0000-000000000000")
        ).not.toThrow();
      });

      it("should throw BrandedTypeError for invalid UUIDs", () => {
        expect(() => assertUUID("not-a-uuid")).toThrow(BrandedTypeError);
        expect(() => assertUUID("550e8400e29b41d4a716446655440000")).toThrow(
          BrandedTypeError
        );
        expect(() => assertUUID("")).toThrow(BrandedTypeError);
      });

      it("should throw with correct error message", () => {
        expect(() => assertUUID("not-a-uuid")).toThrow(
          'Invalid UUID: "not-a-uuid"'
        );
      });

      it("should support custom error message", () => {
        expect(() => assertUUID("not-a-uuid", "Session ID")).toThrow(
          'Invalid Session ID: "not-a-uuid"'
        );
      });

      it("should narrow type after assertion", () => {
        const input: string = "550e8400-e29b-41d4-a716-446655440000";
        assertUUID(input);
        const id: UUID = input;
        expect(id).toBe("550e8400-e29b-41d4-a716-446655440000");
      });
    });
  });

  describe("edge cases", () => {
    it("should handle all zeros UUID", () => {
      expect(isUUID("00000000-0000-0000-0000-000000000000")).toBe(true);
    });

    it("should handle all fs UUID", () => {
      expect(isUUID("ffffffff-ffff-ffff-ffff-ffffffffffff")).toBe(true);
      expect(isUUID("FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF")).toBe(true);
    });

    it("should reject UUIDs with only some hyphens", () => {
      expect(isUUID("550e8400e29b-41d4-a716-446655440000")).toBe(false);
      expect(isUUID("550e8400-e29b41d4-a716-446655440000")).toBe(false);
    });

    it("should reject UUIDs with extra hyphens", () => {
      expect(isUUID("550e-8400-e29b-41d4-a716-446655440000")).toBe(false);
      expect(isUUID("550e8400--e29b-41d4-a716-446655440000")).toBe(false);
    });

    it("should reject strings that look similar to UUIDs", () => {
      expect(isUUID("XXXX8400-e29b-41d4-a716-446655440000")).toBe(false);
      expect(isUUID("550e8400-XXXX-41d4-a716-446655440000")).toBe(false);
    });
  });
});
