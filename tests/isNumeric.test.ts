import { describe, it, expect } from "vitest";
import { isNumeric } from "../src/isNumeric";

describe("isNumeric", () => {
  // Valid integers
  it("validates positive integers", () => {
    expect(isNumeric("0")).toBe(true);
  });

  it("validates single digit positive integers", () => {
    expect(isNumeric("5")).toBe(true);
  });

  it("validates multi-digit positive integers", () => {
    expect(isNumeric("42")).toBe(true);
  });

  it("validates large positive integers", () => {
    expect(isNumeric("123456789")).toBe(true);
  });

  it("validates negative integers", () => {
    expect(isNumeric("-17")).toBe(true);
  });

  it("validates negative zero", () => {
    expect(isNumeric("-0")).toBe(true);
  });

  it("validates large negative integers", () => {
    expect(isNumeric("-987654321")).toBe(true);
  });

  // Valid decimals
  it("validates positive decimals", () => {
    expect(isNumeric("3.14")).toBe(true);
  });

  it("validates decimals starting with zero", () => {
    expect(isNumeric("0.5")).toBe(true);
  });

  it("validates negative decimals", () => {
    expect(isNumeric("-0.5")).toBe(true);
  });

  it("validates decimals with multiple decimal places", () => {
    expect(isNumeric("123.456789")).toBe(true);
  });

  it("validates very small decimals", () => {
    expect(isNumeric("0.001")).toBe(true);
  });

  it("validates negative decimals with zero", () => {
    expect(isNumeric("-0.999")).toBe(true);
  });

  // Whitespace handling
  it("validates integers with leading whitespace", () => {
    expect(isNumeric("  42")).toBe(true);
  });

  it("validates integers with trailing whitespace", () => {
    expect(isNumeric("42  ")).toBe(true);
  });

  it("validates integers with leading and trailing whitespace", () => {
    expect(isNumeric("  42  ")).toBe(true);
  });

  it("validates decimals with whitespace", () => {
    expect(isNumeric("  3.14  ")).toBe(true);
  });

  it("validates negative numbers with whitespace", () => {
    expect(isNumeric("  -17  ")).toBe(true);
  });

  // Invalid cases - empty and whitespace only
  it("rejects empty string", () => {
    expect(isNumeric("")).toBe(false);
  });

  it("rejects whitespace only", () => {
    expect(isNumeric("   ")).toBe(false);
  });

  it("rejects single space", () => {
    expect(isNumeric(" ")).toBe(false);
  });

  // Invalid cases - letters
  it("rejects alphabetic characters", () => {
    expect(isNumeric("abc")).toBe(false);
  });

  it("rejects mixed letters and numbers", () => {
    expect(isNumeric("123abc")).toBe(false);
  });

  it("rejects numbers with letters at end", () => {
    expect(isNumeric("42x")).toBe(false);
  });

  it("rejects letters before numbers", () => {
    expect(isNumeric("x42")).toBe(false);
  });

  // Invalid cases - special values
  it("rejects Infinity", () => {
    expect(isNumeric("Infinity")).toBe(false);
  });

  it("rejects negative Infinity", () => {
    expect(isNumeric("-Infinity")).toBe(false);
  });

  it("rejects NaN", () => {
    expect(isNumeric("NaN")).toBe(false);
  });

  // Invalid cases - scientific notation
  it("rejects scientific notation with lowercase e", () => {
    expect(isNumeric("1e5")).toBe(false);
  });

  it("rejects scientific notation with uppercase E", () => {
    expect(isNumeric("1E5")).toBe(false);
  });

  it("rejects scientific notation with negative exponent", () => {
    expect(isNumeric("2.5e-3")).toBe(false);
  });

  it("rejects scientific notation with positive exponent", () => {
    expect(isNumeric("1.5e+10")).toBe(false);
  });

  // Invalid cases - special characters
  it("rejects numbers with commas", () => {
    expect(isNumeric("1,000")).toBe(false);
  });

  it("rejects numbers with underscores", () => {
    expect(isNumeric("1_000")).toBe(false);
  });

  it("rejects numbers with dollar sign", () => {
    expect(isNumeric("$42")).toBe(false);
  });

  it("rejects numbers with percent sign", () => {
    expect(isNumeric("42%")).toBe(false);
  });

  it("rejects numbers with plus sign", () => {
    expect(isNumeric("+42")).toBe(false);
  });

  // Invalid cases - multiple decimals
  it("rejects numbers with multiple decimal points", () => {
    expect(isNumeric("3.14.159")).toBe(false);
  });

  it("rejects decimal point only", () => {
    expect(isNumeric(".")).toBe(false);
  });

  it("rejects decimal with no digits before", () => {
    expect(isNumeric(".5")).toBe(false);
  });

  it("rejects decimal with no digits after", () => {
    expect(isNumeric("5.")).toBe(false);
  });

  // Invalid cases - multiple minus signs
  it("rejects multiple minus signs", () => {
    expect(isNumeric("--5")).toBe(false);
  });

  it("rejects minus sign in middle", () => {
    expect(isNumeric("5-5")).toBe(false);
  });

  it("rejects minus sign at end", () => {
    expect(isNumeric("5-")).toBe(false);
  });

  // Invalid cases - spaces within number
  it("rejects numbers with internal spaces", () => {
    expect(isNumeric("4 2")).toBe(false);
  });

  it("rejects decimals with spaces around point", () => {
    expect(isNumeric("3 . 14")).toBe(false);
  });

  // Edge cases - leading zeros
  it("validates numbers with leading zeros", () => {
    expect(isNumeric("007")).toBe(true);
  });

  it("validates decimals with leading zeros", () => {
    expect(isNumeric("00.5")).toBe(true);
  });

  // Edge cases - hexadecimal
  it("rejects hexadecimal with 0x prefix", () => {
    expect(isNumeric("0x1F")).toBe(false);
  });

  it("rejects hexadecimal with 0X prefix", () => {
    expect(isNumeric("0X1F")).toBe(false);
  });

  // Edge cases - octal
  it("validates numbers that look like octal (but are treated as decimal)", () => {
    expect(isNumeric("0777")).toBe(true); // Treated as decimal 777
  });

  // Edge cases - binary
  it("rejects binary with 0b prefix", () => {
    expect(isNumeric("0b101")).toBe(false);
  });

  it("rejects binary with 0B prefix", () => {
    expect(isNumeric("0B101")).toBe(false);
  });
});
