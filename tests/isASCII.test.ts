import { describe, it, expect } from "vitest";
import { isASCII } from "../src/isASCII";

describe("isASCII", () => {
  it("should return true for basic ASCII text", () => {
    expect(isASCII("hello")).toBe(true);
    expect(isASCII("HELLO")).toBe(true);
    expect(isASCII("Hello World!")).toBe(true);
    expect(isASCII("abc123")).toBe(true);
    expect(isASCII("The quick brown fox jumps over the lazy dog")).toBe(true);
  });

  it("should return true for ASCII symbols and punctuation", () => {
    expect(isASCII("!@#$%^&*()")).toBe(true);
    expect(isASCII("[]{}|\\;:\"',.<>?/")).toBe(true);
    expect(isASCII("+-*/=")).toBe(true);
    expect(isASCII("`~_")).toBe(true);
  });

  it("should return true for ASCII control characters", () => {
    expect(isASCII("\t")).toBe(true); // Tab
    expect(isASCII("\n")).toBe(true); // Newline
    expect(isASCII("\r")).toBe(true); // Carriage return
    expect(isASCII("\0")).toBe(true); // Null
    expect(isASCII(" \t\n\r")).toBe(true); // Mixed whitespace
  });

  it("should return true for all printable ASCII characters", () => {
    // Test all printable ASCII characters (32-126)
    let printableASCII = "";
    for (let i = 32; i <= 126; i++) {
      printableASCII += String.fromCharCode(i);
    }
    expect(isASCII(printableASCII)).toBe(true);
  });

  it("should return true for DEL character (127)", () => {
    expect(isASCII("\x7F")).toBe(true);
    expect(isASCII("hello\x7Fworld")).toBe(true);
  });

  it("should return false for non-ASCII characters", () => {
    expect(isASCII("café")).toBe(false); // Accented e
    expect(isASCII("naïve")).toBe(false); // Diaeresis
    expect(isASCII("€")).toBe(false); // Euro symbol
    expect(isASCII("£")).toBe(false); // Pound symbol
    expect(isASCII("©")).toBe(false); // Copyright symbol
    expect(isASCII("®")).toBe(false); // Registered trademark
    expect(isASCII("™")).toBe(false); // Trademark
    expect(isASCII("°")).toBe(false); // Degree symbol
  });

  it("should return false for emojis", () => {
    expect(isASCII("👍")).toBe(false);
    expect(isASCII("😀")).toBe(false);
    expect(isASCII("🔥")).toBe(false);
    expect(isASCII("Hello 👋")).toBe(false);
    expect(isASCII("🇺🇸")).toBe(false); // Flag emoji
  });

  it("should return false for Unicode characters", () => {
    expect(isASCII("Привет")).toBe(false); // Cyrillic
    expect(isASCII("你好")).toBe(false); // Chinese
    expect(isASCII("こんにちは")).toBe(false); // Japanese
    expect(isASCII("مرحبا")).toBe(false); // Arabic
    expect(isASCII("🄀")).toBe(false); // Circled Latin
  });

  it("should return false for extended ASCII (128-255)", () => {
    expect(isASCII("À")).toBe(false); // 192
    expect(isASCII("ÿ")).toBe(false); // 255
    expect(isASCII("ñ")).toBe(false); // 241
    expect(isASCII("§")).toBe(false); // 167
  });

  it("should handle mixed ASCII and non-ASCII", () => {
    expect(isASCII("hello café")).toBe(false);
    expect(isASCII("test€test")).toBe(false);
    expect(isASCII("99¢")).toBe(false);
    expect(isASCII("temp=25°C")).toBe(false);
  });

  it("should return true for empty string", () => {
    expect(isASCII("")).toBe(true);
  });

  it("should handle very long ASCII strings", () => {
    const longString = "a".repeat(10000);
    expect(isASCII(longString)).toBe(true);
  });

  it("should handle very long non-ASCII strings", () => {
    const longString = "a".repeat(10000) + "é";
    expect(isASCII(longString)).toBe(false);
  });

  it("should handle strings with null bytes", () => {
    expect(isASCII("hello\0world")).toBe(true);
    expect(isASCII("\0\0\0")).toBe(true);
  });

  it("should trim leading and trailing whitespace", () => {
    expect(isASCII(" hello")).toBe(true);
    expect(isASCII("hello ")).toBe(true);
    expect(isASCII("  test  ")).toBe(true);
    expect(isASCII("  ")).toBe(true); // Whitespace-only becomes empty after trim
  });
});
