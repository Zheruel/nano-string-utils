import { describe, it, expect } from "vitest";
import { mask } from "../src/mask";

describe("mask", () => {
  describe("basic masking (show end)", () => {
    it("masks with default show=4", () => {
      expect(mask("1234567890")).toBe("******7890");
    });

    it("masks credit card number", () => {
      expect(mask("4532123456789010")).toBe("************9010");
    });

    it("masks password", () => {
      expect(mask("secretpassword")).toBe("**********word");
    });

    it("masks short string", () => {
      expect(mask("secret")).toBe("**cret");
    });
  });

  describe("show start option", () => {
    it("shows first 4 characters by default", () => {
      expect(mask("john@example.com", { showStart: true })).toBe(
        "john************",
      );
    });

    it("shows specified number of start characters", () => {
      expect(mask("1234567890", { show: 3, showStart: true })).toBe(
        "123*******",
      );
    });

    it("masks API key showing prefix", () => {
      expect(mask("sk-abc123xyz789", { show: 3, showStart: true })).toBe(
        "sk-************",
      );
    });
  });

  describe("custom mask character", () => {
    it("uses custom mask character", () => {
      expect(mask("password123", { maskChar: "•" })).toBe("•••••••d123");
    });

    it("uses X as mask character", () => {
      expect(mask("secret", { maskChar: "X" })).toBe("XXcret");
    });

    it("uses # as mask character", () => {
      expect(mask("12345678", { maskChar: "#" })).toBe("####5678");
    });

    it("uses first char of multi-char maskChar", () => {
      expect(mask("secret", { maskChar: "XY" })).toBe("XXcret");
    });
  });

  describe("show count variations", () => {
    it("shows 6 characters", () => {
      expect(mask("4532123456789010", { show: 6 })).toBe("**********789010");
    });

    it("shows 2 characters", () => {
      expect(mask("password", { show: 2 })).toBe("******rd");
    });

    it("shows 0 characters (mask entire string)", () => {
      expect(mask("secret", { show: 0 })).toBe("******");
    });

    it("accepts number shorthand for show", () => {
      expect(mask("1234567890", 3)).toBe("*******890");
    });
  });

  describe("edge cases", () => {
    it("returns empty string for empty input", () => {
      expect(mask("")).toBe("");
    });

    it("handles null input", () => {
      expect(mask(null as any)).toBe(null);
    });

    it("handles undefined input", () => {
      expect(mask(undefined as any)).toBe(undefined);
    });

    it("returns original when show >= length", () => {
      expect(mask("abc", { show: 5 })).toBe("abc");
    });

    it("returns original when show equals length", () => {
      expect(mask("abcd", { show: 4 })).toBe("abcd");
    });

    it("handles single character string", () => {
      expect(mask("x")).toBe("x");
    });

    it("handles single character with show: 0", () => {
      expect(mask("x", { show: 0 })).toBe("*");
    });

    it("handles empty maskChar", () => {
      expect(mask("secret", { maskChar: "" })).toBe("**cret");
    });
  });

  describe("Unicode handling", () => {
    it("handles emoji in string", () => {
      expect(mask("hello🎉world")).toBe("*******orld");
    });

    it("handles string with only emoji", () => {
      // 5 emoji, show last 4
      expect(mask("🎉🎊🎁🎂🎄")).toBe("*🎊🎁🎂🎄");
    });

    it("handles emoji at mask boundary", () => {
      expect(mask("1234🎉", { show: 1 })).toBe("****🎉");
    });

    it("handles multi-codepoint emoji", () => {
      const str = "hello👨‍👩‍👧‍👦end";
      const result = mask(str, { show: 3 });
      expect(result.endsWith("end")).toBe(true);
    });

    it("handles CJK characters", () => {
      // 4 characters, show last 4 = no masking needed
      expect(mask("你好世界")).toBe("你好世界");
      // With 5 characters, masks first
      expect(mask("你好世界啊", { show: 4 })).toBe("*好世界啊");
    });

    it("handles right-to-left text", () => {
      // "مرحبا" is 5 characters, show last 4
      expect(mask("مرحبا")).toBe("*رحبا");
    });
  });

  describe("real-world use cases", () => {
    it("masks SSN", () => {
      const ssn = "123456789";
      expect(mask(ssn)).toBe("*****6789");
    });

    it("masks phone number", () => {
      const phone = "5551234567";
      expect(mask(phone)).toBe("******4567");
    });

    it("masks email showing domain", () => {
      const email = "user@example.com";
      expect(mask(email, { show: 11 })).toBe("*****example.com");
    });

    it("masks API key showing prefix", () => {
      const apiKey = "sk_live_abc123xyz";
      // 17 chars total, show 7 = 10 masked
      expect(mask(apiKey, { show: 7, showStart: true })).toBe(
        "sk_live**********",
      );
    });

    it("masks bank account", () => {
      const account = "123456789012";
      expect(mask(account, { show: 4, maskChar: "X" })).toBe("XXXXXXXX9012");
    });
  });

  describe("combined options", () => {
    it("combines showStart with custom maskChar", () => {
      expect(
        mask("1234567890", { show: 3, showStart: true, maskChar: "#" }),
      ).toBe("123#######");
    });

    it("combines show with custom maskChar", () => {
      expect(mask("password", { show: 2, maskChar: "•" })).toBe("••••••rd");
    });
  });
});
