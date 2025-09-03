import { describe, expect, it } from "vitest";
import { graphemes } from "../src/graphemes";

describe("graphemes", () => {
  it("should split basic ASCII text", () => {
    expect(graphemes("hello")).toEqual(["h", "e", "l", "l", "o"]);
    expect(graphemes("abc")).toEqual(["a", "b", "c"]);
  });

  it("should handle empty strings", () => {
    expect(graphemes("")).toEqual([]);
  });

  it("should handle single character", () => {
    expect(graphemes("a")).toEqual(["a"]);
  });

  it("should handle combining characters", () => {
    expect(graphemes("é")).toEqual(["é"]); // precomposed
    expect(graphemes("e\u0301")).toEqual(["e\u0301"]); // e + combining acute stays as is
    expect(graphemes("n\u0303")).toEqual(["n\u0303"]); // n + combining tilde stays as is
  });

  it("should handle emojis correctly", () => {
    expect(graphemes("🎈")).toEqual(["🎈"]);
    expect(graphemes("👍🏽")).toEqual(["👍🏽"]); // emoji with skin tone
    expect(graphemes("👨‍👩‍👧‍👦")).toEqual(["👨‍👩‍👧‍👦"]); // family emoji (ZWJ sequence)
    expect(graphemes("🇺🇸")).toEqual(["🇺🇸"]); // flag emoji (regional indicators)
  });

  it("should handle mixed content", () => {
    expect(graphemes("hello👋world")).toEqual([
      "h",
      "e",
      "l",
      "l",
      "o",
      "👋",
      "w",
      "o",
      "r",
      "l",
      "d",
    ]);
    expect(graphemes("café☕")).toEqual(["c", "a", "f", "é", "☕"]);
  });

  it("should handle multiple emojis", () => {
    expect(graphemes("🎈🎉🎊")).toEqual(["🎈", "🎉", "🎊"]);
    expect(graphemes("👨‍👩‍👧‍👦👨‍👩‍👧👩‍👩‍👦‍👦")).toEqual(["👨‍👩‍👧‍👦", "👨‍👩‍👧", "👩‍👩‍👦‍👦"]);
  });

  it("should handle special Unicode characters", () => {
    expect(graphemes("한글")).toEqual(["한", "글"]); // Korean
    expect(graphemes("नमस्ते")).toEqual(["न", "म", "स्ते"]); // Hindi with conjunct character
    expect(graphemes("مرحبا")).toEqual(["م", "ر", "ح", "ب", "ا"]); // Arabic
  });

  it("should handle numbers and symbols", () => {
    expect(graphemes("123")).toEqual(["1", "2", "3"]);
    expect(graphemes("!@#")).toEqual(["!", "@", "#"]);
  });

  it("should handle newlines and whitespace", () => {
    expect(graphemes("a\nb")).toEqual(["a", "\n", "b"]);
    expect(graphemes("a b")).toEqual(["a", " ", "b"]);
    expect(graphemes("\t")).toEqual(["\t"]);
  });
});
