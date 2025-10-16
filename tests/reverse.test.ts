import { describe, it, expect } from "vitest";
import { reverse } from "../src/reverse";

describe("reverse", () => {
  it("reverses simple string", () => {
    expect(reverse("hello")).toBe("olleh");
  });

  it("reverses string with spaces", () => {
    expect(reverse("hello world")).toBe("dlrow olleh");
  });

  it("handles empty string", () => {
    expect(reverse("")).toBe("");
  });

  it("handles single character", () => {
    expect(reverse("a")).toBe("a");
  });

  it("handles palindrome", () => {
    expect(reverse("racecar")).toBe("racecar");
  });

  it("handles numbers in string", () => {
    expect(reverse("hello123")).toBe("321olleh");
  });

  it("handles special characters", () => {
    expect(reverse("!@#$%")).toBe("%$#@!");
  });

  it("handles mixed content", () => {
    expect(reverse("Hello World 123!")).toBe("!321 dlroW olleH");
  });

  it("handles unicode characters correctly", () => {
    expect(reverse("hello 👋")).toBe("👋 olleh");
  });

  it("handles newlines and tabs", () => {
    expect(reverse("hello\nworld\t!")).toBe("!\tdlrow\nolleh");
  });

  it("reverses twice to get original", () => {
    const original = "test string";
    expect(reverse(reverse(original))).toBe(original);
  });

  it("handles strings with only spaces", () => {
    expect(reverse("   ")).toBe("   ");
  });

  describe("Complex Unicode handling", () => {
    it("handles ZWJ emoji sequences (family emojis)", () => {
      expect(reverse("👨‍👩‍👧‍👦")).toBe("👨‍👩‍👧‍👦");
      expect(reverse("Family 👨‍👩‍👧‍👦")).toBe("👨‍👩‍👧‍👦 ylimaF");
      expect(reverse("👨‍👩‍👧")).toBe("👨‍👩‍👧");
    });

    it("handles emoji with skin tone modifiers", () => {
      expect(reverse("👍🏽")).toBe("👍🏽");
      expect(reverse("Hello 👍🏽")).toBe("👍🏽 olleH");
      expect(reverse("👋🏾")).toBe("👋🏾");
    });

    it("handles flag emojis (regional indicators)", () => {
      expect(reverse("🇺🇸")).toBe("🇺🇸");
      expect(reverse("Hello 🇺🇸")).toBe("🇺🇸 olleH");
      expect(reverse("🏴‍☠️")).toBe("🏴‍☠️"); // Pirate flag (ZWJ sequence)
    });

    it("handles strings with diacritics and combining marks", () => {
      expect(reverse("café")).toBe("éfac");
      expect(reverse("résumé")).toBe("émusér");
      expect(reverse("naïve")).toBe("evïan");
      expect(reverse("Malmö")).toBe("ömlaM");
    });

    it("handles combining characters (decomposed form)", () => {
      // e + combining acute accent
      expect(reverse("e\u0301")).toBe("e\u0301");
      expect(reverse("hello e\u0301")).toBe("e\u0301 olleh");
    });

    it("handles mixed ASCII and complex Unicode", () => {
      expect(reverse("Hello 👨‍👩‍👧‍👦 World 🌍")).toBe("🌍 dlroW 👨‍👩‍👧‍👦 olleH");
      expect(reverse("café ☕ 👍🏽")).toBe("👍🏽 ☕ éfac");
    });

    it("handles multiple complex emojis in sequence", () => {
      expect(reverse("👨‍👩‍👧‍👦👨‍👩‍👧")).toBe("👨‍👩‍👧👨‍👩‍👧‍👦");
      expect(reverse("👍🏽👋🏾")).toBe("👋🏾👍🏽");
    });

    it("preserves grapheme integrity with profession emojis", () => {
      expect(reverse("👨‍⚕️")).toBe("👨‍⚕️"); // Man health worker
      expect(reverse("👩‍🚀")).toBe("👩‍🚀"); // Woman astronaut
    });

    it("handles double-reversing with complex Unicode", () => {
      const original = "Hello 👨‍👩‍👧‍👦 café 👍🏽";
      expect(reverse(reverse(original))).toBe(original);
    });
  });
});
