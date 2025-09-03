import { describe, it, expect } from "vitest";
import { codePoints } from "../src/codePoints";

describe("codePoints", () => {
  it("should convert ASCII characters to code points", () => {
    expect(codePoints("abc")).toEqual([97, 98, 99]);
    expect(codePoints("ABC")).toEqual([65, 66, 67]);
    expect(codePoints("123")).toEqual([49, 50, 51]);
  });

  it("should handle emojis correctly", () => {
    expect(codePoints("👍")).toEqual([128077]);
    expect(codePoints("😀")).toEqual([128512]);
    expect(codePoints("🔥")).toEqual([128293]);
  });

  it("should handle mixed content", () => {
    expect(codePoints("a👍b")).toEqual([97, 128077, 98]);
    expect(codePoints("Hello 👋")).toEqual([
      72, 101, 108, 108, 111, 32, 128075,
    ]);
  });

  it("should handle complex emoji sequences", () => {
    // Family emoji with ZWJ sequences
    expect(codePoints("👨‍👩‍👧‍👦")).toEqual([
      128104, 8205, 128105, 8205, 128103, 8205, 128102,
    ]);
    // Flag emoji (regional indicators)
    expect(codePoints("🇺🇸")).toEqual([127482, 127480]);
  });

  it("should handle special Unicode characters", () => {
    expect(codePoints("€")).toEqual([8364]);
    expect(codePoints("©")).toEqual([169]);
    expect(codePoints("™")).toEqual([8482]);
    expect(codePoints("♥")).toEqual([9829]);
  });

  it("should handle non-BMP characters", () => {
    expect(codePoints("𝄞")).toEqual([119070]); // Musical symbol
    expect(codePoints("𝕳")).toEqual([120179]); // Mathematical double-struck
    expect(codePoints("𐍈")).toEqual([66376]); // Gothic letter
  });

  it("should handle combining characters", () => {
    expect(codePoints("é")).toEqual([233]); // Precomposed
    expect(codePoints("e\u0301")).toEqual([101, 769]); // e + combining acute accent
  });

  it("should handle empty string", () => {
    expect(codePoints("")).toEqual([]);
  });

  it("should handle whitespace and control characters", () => {
    expect(codePoints(" \t\n")).toEqual([32, 9, 10]);
    expect(codePoints("\u0000")).toEqual([0]);
  });

  it("should handle very long strings", () => {
    const longString = "a".repeat(1000);
    const result = codePoints(longString);
    expect(result.length).toBe(1000);
    expect(result.every((code) => code === 97)).toBe(true);
  });
});
