import { describe, it, expect } from "vitest";
import { redact } from "../src/redact";

describe("redact", () => {
  describe("SSN redaction", () => {
    it("should redact SSN with dashes (partial)", () => {
      expect(redact("My SSN is 123-45-6789")).toBe("My SSN is ***-**-6789");
    });

    it("should redact SSN with spaces", () => {
      expect(redact("SSN: 123 45 6789")).toBe("SSN: ***-**-6789");
    });

    it("should redact SSN without separators", () => {
      expect(redact("SSN: 123456789")).toBe("SSN: ***-**-6789");
    });

    it("should redact SSN with full strategy", () => {
      expect(redact("My SSN is 123-45-6789", { strategy: "full" })).toBe(
        "My SSN is ***-**-****"
      );
    });

    it("should redact multiple SSNs", () => {
      expect(redact("SSN1: 123-45-6789, SSN2: 987-65-4321")).toBe(
        "SSN1: ***-**-6789, SSN2: ***-**-4321"
      );
    });
  });

  describe("Credit card redaction", () => {
    it("should redact credit card with dashes (partial)", () => {
      expect(redact("Card: 4532-1234-5678-9010")).toBe(
        "Card: **** **** **** 9010"
      );
    });

    it("should redact credit card with spaces", () => {
      expect(redact("Card: 4532 1234 5678 9010")).toBe(
        "Card: **** **** **** 9010"
      );
    });

    it("should redact credit card without separators", () => {
      expect(redact("Card: 4532123456789010")).toBe("Card: ************9010");
    });

    it("should redact Amex card (15 digits)", () => {
      expect(redact("Amex: 3782-822463-10005")).toBe("Amex: **** **** 0005");
    });

    it("should redact credit card with full strategy", () => {
      expect(redact("Card: 4532-1234-5678-9010", { strategy: "full" })).toBe(
        "Card: *******************"
      );
    });

    it("should redact multiple credit cards", () => {
      expect(redact("Card1: 4532123456789010, Card2: 5105105105105100")).toBe(
        "Card1: ************9010, Card2: ************5100"
      );
    });
  });

  describe("Email redaction", () => {
    it("should redact email (partial)", () => {
      expect(redact("Email: user@example.com")).toBe(
        "Email: use***@example.com"
      );
    });

    it("should redact short email", () => {
      expect(redact("Email: ab@example.com")).toBe("Email: a***@example.com");
    });

    it("should redact email with full strategy", () => {
      expect(redact("Email: user@example.com", { strategy: "full" })).toBe(
        "Email: ***@***.***"
      );
    });

    it("should redact email with dots and special chars", () => {
      expect(redact("john.doe+tag@example.co.uk")).toBe("joh***@example.co.uk");
    });

    it("should redact multiple emails", () => {
      expect(redact("Emails: alice@test.com, bob@example.org")).toBe(
        "Emails: ali***@test.com, bob***@example.org"
      );
    });
  });

  describe("Phone number redaction", () => {
    it("should redact phone with parentheses", () => {
      expect(redact("Phone: (123) 456-7890")).toBe("Phone: (***) ***-7890");
    });

    it("should redact phone with dashes", () => {
      expect(redact("Phone: 123-456-7890")).toBe("Phone: ***-***-7890");
    });

    it("should redact phone with dots", () => {
      expect(redact("Phone: 123.456.7890")).toBe("Phone: ***.***-7890");
    });

    it("should redact phone without separators", () => {
      expect(redact("Phone: 1234567890")).toBe("Phone: ******7890");
    });

    it("should redact phone with country code", () => {
      expect(redact("Phone: +1-123-456-7890")).toBe("Phone: ***-***-7890");
    });

    it("should redact phone with full strategy", () => {
      expect(redact("Phone: (123) 456-7890", { strategy: "full" })).toBe(
        "Phone: (***) ***-****"
      );
    });
  });

  describe("Custom patterns", () => {
    it("should apply custom pattern with string replacement", () => {
      const result = redact("Secret: ABC-123", {
        types: [],
        customPatterns: [
          { pattern: /[A-Z]{3}-\d{3}/g, replacement: "[REDACTED]" },
        ],
      });
      expect(result).toBe("Secret: [REDACTED]");
    });

    it("should apply custom pattern with function replacement", () => {
      const result = redact("Secret: ABC-123", {
        types: [],
        customPatterns: [
          {
            pattern: /[A-Z]{3}-\d{3}/g,
            replacement: (match: string) => `[${match.length} chars]`,
          },
        ],
      });
      expect(result).toBe("Secret: [7 chars]");
    });

    it("should apply multiple custom patterns", () => {
      const result = redact("Secret1: ABC-123, Secret2: XYZ-789", {
        types: [],
        customPatterns: [
          { pattern: /ABC-\d{3}/g, replacement: "[A]" },
          { pattern: /XYZ-\d{3}/g, replacement: "[X]" },
        ],
      });
      expect(result).toBe("Secret1: [A], Secret2: [X]");
    });

    it("should combine built-in and custom patterns", () => {
      const result = redact("SSN: 123-45-6789, Code: ABC-123", {
        types: ["ssn"],
        customPatterns: [{ pattern: /[A-Z]{3}-\d{3}/g, replacement: "[CODE]" }],
      });
      expect(result).toBe("SSN: ***-**-6789, Code: [CODE]");
    });
  });

  describe("Selective type redaction", () => {
    it("should only redact specified types", () => {
      const text =
        "Email: user@example.com, SSN: 123-45-6789, Card: 4532123456789010";
      const result = redact(text, { types: ["email", "ssn"] });
      expect(result).toBe(
        "Email: use***@example.com, SSN: ***-**-6789, Card: 4532123456789010"
      );
    });

    it("should redact single type", () => {
      const text = "Email: user@example.com, SSN: 123-45-6789";
      const result = redact(text, { types: ["email"] });
      expect(result).toBe("Email: use***@example.com, SSN: 123-45-6789");
    });

    it("should not redact if types array is empty", () => {
      const text = "Email: user@example.com, SSN: 123-45-6789";
      const result = redact(text, { types: [] });
      expect(result).toBe(text);
    });
  });

  describe("Partial length options", () => {
    it("should respect custom partialLength for SSN", () => {
      expect(redact("SSN: 123-45-6789", { partialLength: 2 })).toBe(
        "SSN: ***-**-**89"
      );
    });

    it("should respect custom partialLength for credit card", () => {
      expect(redact("Card: 4532123456789010", { partialLength: 6 })).toBe(
        "Card: **********789010"
      );
    });

    it("should respect custom partialLength for phone", () => {
      expect(redact("Phone: 1234567890", { partialLength: 3 })).toBe(
        "Phone: *******890"
      );
    });
  });

  describe("Edge cases", () => {
    it("should handle empty string", () => {
      expect(redact("")).toBe("");
    });

    it("should handle text with no sensitive data", () => {
      const text = "This is a normal sentence with no sensitive information.";
      expect(redact(text)).toBe(text);
    });

    it("should not redact invalid SSN-like patterns", () => {
      expect(redact("Not an SSN: 12-345-6789")).toBe("Not an SSN: 12-345-6789");
      expect(redact("Not an SSN: 1234-56-789")).toBe("Not an SSN: 1234-56-789");
    });

    it("should not redact invalid credit card-like patterns", () => {
      expect(redact("Not a card: 123-456-789")).toBe("Not a card: 123-456-789");
    });

    it("should handle text with only sensitive data", () => {
      expect(redact("123-45-6789")).toBe("***-**-6789");
    });

    it("should preserve surrounding whitespace", () => {
      expect(redact("  SSN: 123-45-6789  ")).toBe("  SSN: ***-**-6789  ");
    });

    it("should handle mixed sensitive data", () => {
      const text =
        "Contact: user@example.com, Phone: (555) 123-4567, SSN: 123-45-6789, Card: 4532-1234-5678-9010";
      const result = redact(text);
      expect(result).toBe(
        "Contact: use***@example.com, Phone: (***) ***-4567, SSN: ***-**-6789, Card: **** **** **** 9010"
      );
    });
  });

  describe("Type safety", () => {
    it("should accept valid options", () => {
      expect(() =>
        redact("test", {
          types: ["ssn", "creditCard", "email", "phone"],
          strategy: "full",
          partialLength: 4,
          customPatterns: [],
        })
      ).not.toThrow();
    });

    it("should work with minimal options", () => {
      expect(() => redact("test")).not.toThrow();
    });

    it("should work with partial options", () => {
      expect(() => redact("test", { strategy: "full" })).not.toThrow();
      expect(() => redact("test", { types: ["ssn"] })).not.toThrow();
    });
  });
});
