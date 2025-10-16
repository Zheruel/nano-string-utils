import { describe, it, expect } from "vitest";
import { truncate } from "../src/truncate";

describe("truncate", () => {
  it("truncates long strings", () => {
    expect(truncate("Long text here", 10)).toBe("Long te...");
  });

  it("does not truncate short strings", () => {
    expect(truncate("Short", 10)).toBe("Short");
  });

  it("handles exact length strings", () => {
    expect(truncate("Exactly10!", 10)).toBe("Exactly10!");
  });

  it("uses custom suffix", () => {
    expect(truncate("Long text here", 10, "…")).toBe("Long text…");
  });

  it("handles empty suffix", () => {
    expect(truncate("Long text here", 10, "")).toBe("Long text ");
  });

  it("handles very small length", () => {
    expect(truncate("Hello World", 3)).toBe("...");
  });

  it("handles length smaller than suffix", () => {
    expect(truncate("Hello World", 2)).toBe("...");
  });

  it("handles empty string", () => {
    expect(truncate("", 10)).toBe("");
  });

  it("preserves string when length equals string length", () => {
    expect(truncate("Test", 4)).toBe("Test");
  });

  it("handles long custom suffix", () => {
    expect(truncate("Hello World", 10, " [...]")).toBe("Hell [...]");
  });

  it("handles single character truncation", () => {
    expect(truncate("Hello", 4)).toBe("H...");
  });

  it("handles unicode characters", () => {
    // Emoji at the end gets preserved if there's room
    expect(truncate("Test 👍", 10)).toBe("Test 👍");

    // Simple emoji truncation
    expect(truncate("Hello 👋 World", 10)).toBe("Hello 👋...");
  });

  describe("Complex Unicode handling", () => {
    it("truncates at grapheme cluster boundaries (ZWJ emojis)", () => {
      // Family emoji should stay intact (counts as 1 grapheme)
      expect(truncate("Family 👨‍👩‍👧‍👦 photo", 11)).toBe("Family 👨‍👩‍👧‍👦...");
      expect(truncate("👨‍👩‍👧‍👦", 2)).toBe("👨‍👩‍👧‍👦");
      // "A 👨‍👩‍👧‍👦 B" = 5 graphemes, no truncation needed
      expect(truncate("A 👨‍👩‍👧‍👦 B", 5)).toBe("A 👨‍👩‍👧‍👦 B");
      // Truncating the same to 4 should remove the B
      expect(truncate("A 👨‍👩‍👧‍👦 B", 4)).toBe("A...");
    });

    it("handles emoji with skin tone modifiers", () => {
      // "Hello 👍🏽 World" = 13 graphemes: H,e,l,l,o,space,👍🏽,space,W,o,r,l,d
      // Truncate to 10: take 7 graphemes (10-3) = "Hello 👍🏽"
      expect(truncate("Hello 👍🏽 World", 10)).toBe("Hello 👍🏽...");
      expect(truncate("👋🏾", 2)).toBe("👋🏾");
      expect(truncate("Test 👋🏾 more", 9)).toBe("Test 👋🏾...");
    });

    it("handles flag emojis correctly", () => {
      // "USA 🇺🇸 flag" = 9 graphemes: U,S,A,space,🇺🇸,space,f,l,a,g
      // Truncate to 8: take 5 graphemes (8-3) = "USA 🇺🇸"
      expect(truncate("USA 🇺🇸 flag", 8)).toBe("USA 🇺🇸...");
      // "🏴‍☠️ Pirates" = 9 graphemes
      // Truncate to 4: take 1 grapheme (4-3) = "🏴‍☠️"
      expect(truncate("🏴‍☠️ Pirates", 4)).toBe("🏴‍☠️...");
    });

    it("preserves diacritics when truncating", () => {
      // "café résumé" = 11 graphemes: c,a,f,é,space,r,é,s,u,m,é
      // Truncate to 8: take 5 graphemes (8-3) = "café "
      expect(truncate("café résumé", 8)).toBe("café ...");
      // "Malmö Sweden" = 12 graphemes: M,a,l,m,ö,space,S,w,e,e,d,e,n
      // Truncate to 8: take 5 graphemes = "Malmö"
      expect(truncate("Malmö Sweden", 8)).toBe("Malmö...");
      // "naïve approach" = 14 graphemes: n,a,ï,v,e,space,a,p,p,r,o,a,c,h
      // Truncate to 8: take 5 graphemes = "naïve"
      expect(truncate("naïve approach", 8)).toBe("naïve...");
    });

    it("handles combining characters properly", () => {
      // e + combining acute accent (decomposed)
      const decomposed = "cafe\u0301"; // café with combining accent (4 graphemes)
      expect(truncate(decomposed, 6)).toBe(decomposed);
      // "café test" = 9 graphemes
      // Truncate to 8: take 5 graphemes (8-3) = "café "
      expect(truncate(decomposed + " test", 8)).toBe(decomposed + " ...");
    });

    it("handles mixed content with custom suffix", () => {
      // "Hello 👨‍👩‍👧‍👦 café" = 13 graphemes: H,e,l,l,o,space,👨‍👩‍👧‍👦,space,c,a,f,é
      // Truncate to 11 with "…" (1): take 10 graphemes = "Hello 👨‍👩‍👧‍👦 ca"
      expect(truncate("Hello 👨‍👩‍👧‍👦 café", 11, "…")).toBe("Hello 👨‍👩‍👧‍👦 ca…");
      // "Test 👍🏽 data" = 11 graphemes. " [more]" = 7 graphemes
      // Truncate to 9 with " [more]": take 2 graphemes = "Te"
      expect(truncate("Test 👍🏽 data", 9, " [more]")).toBe("Te [more]");
    });

    it("handles profession emojis (ZWJ sequences)", () => {
      // "Doctor 👨‍⚕️ here" = 13 graphemes
      // Truncate to 11: take 8 graphemes = "Doctor 👨‍⚕️"
      expect(truncate("Doctor 👨‍⚕️ here", 11)).toBe("Doctor 👨‍⚕️...");
      // "👩‍🚀 Astronaut" = 11 graphemes
      // Truncate to 6: take 3 graphemes = "👩‍🚀 A"
      expect(truncate("👩‍🚀 Astronaut", 6)).toBe("👩‍🚀 A...");
    });

    it("handles multiple complex emojis", () => {
      // "👨‍👩‍👧‍👦👨‍👩‍👧 families" = 12 graphemes
      // Truncate to 5: take 2 graphemes = "👨‍👩‍👧‍👦👨‍👩‍👧"
      expect(truncate("👨‍👩‍👧‍👦👨‍👩‍👧 families", 5)).toBe("👨‍👩‍👧‍👦👨‍👩‍👧...");
      expect(truncate("👍🏽👋🏾 hello", 7)).toBe("👍🏽👋🏾 h...");
    });

    it("handles edge case with very short length", () => {
      expect(truncate("👨‍👩‍👧‍👦 test", 4)).toBe("👨‍👩‍👧‍👦...");
      expect(truncate("café", 3)).toBe("...");
    });

    it("preserves string when length equals grapheme count", () => {
      expect(truncate("👨‍👩‍👧‍👦", 1)).toBe("👨‍👩‍👧‍👦");
      expect(truncate("café", 4)).toBe("café");
    });

    it("works with long custom suffix and Unicode", () => {
      expect(truncate("Hello 👍🏽 world", 10, " [...]")).toBe("Hell [...]");
      expect(truncate("café test", 8, " [more]")).toBe("c [more]");
    });
  });
});
