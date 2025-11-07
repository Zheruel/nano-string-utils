import { describe, it, expect } from "vitest";
import { isInteger } from "../src/isInteger";

describe("isInteger", () => {
  // Valid integers
  it("validates zero", () => {
    expect(isInteger("0")).toBe(true);
  });

  it("validates single digit positive integers", () => {
    expect(isInteger("5")).toBe(true);
  });

  it("validates multi-digit positive integers", () => {
    expect(isInteger("42")).toBe(true);
  });

  it("validates large positive integers", () => {
    expect(isInteger("123456789")).toBe(true);
  });

  it("validates negative integers", () => {
    expect(isInteger("-17")).toBe(true);
  });

  it("validates negative zero", () => {
    expect(isInteger("-0")).toBe(true);
  });

  it("validates large negative integers", () => {
    expect(isInteger("-987654321")).toBe(true);
  });

  it("validates single digit one", () => {
    expect(isInteger("1")).toBe(true);
  });

  it("validates negative one", () => {
    expect(isInteger("-1")).toBe(true);
  });

  // Whitespace handling
  it("validates integers with leading whitespace", () => {
    expect(isInteger("  42")).toBe(true);
  });

  it("validates integers with trailing whitespace", () => {
    expect(isInteger("42  ")).toBe(true);
  });

  it("validates integers with leading and trailing whitespace", () => {
    expect(isInteger("  42  ")).toBe(true);
  });

  it("validates negative integers with whitespace", () => {
    expect(isInteger("  -17  ")).toBe(true);
  });

  it("validates zero with whitespace", () => {
    expect(isInteger("  0  ")).toBe(true);
  });

  // Leading zeros
  it("validates integers with leading zeros", () => {
    expect(isInteger("007")).toBe(true);
  });

  it("validates integers with multiple leading zeros", () => {
    expect(isInteger("00042")).toBe(true);
  });

  it("validates zero with leading zeros", () => {
    expect(isInteger("000")).toBe(true);
  });

  it("validates negative integers with leading zeros", () => {
    expect(isInteger("-007")).toBe(true);
  });

  // Invalid cases - empty and whitespace only
  it("rejects empty string", () => {
    expect(isInteger("")).toBe(false);
  });

  it("rejects whitespace only", () => {
    expect(isInteger("   ")).toBe(false);
  });

  it("rejects single space", () => {
    expect(isInteger(" ")).toBe(false);
  });

  it("rejects tab character", () => {
    expect(isInteger("\t")).toBe(false);
  });

  // Invalid cases - decimals (KEY DIFFERENCE from isNumeric)
  it("rejects positive decimals", () => {
    expect(isInteger("3.14")).toBe(false);
  });

  it("rejects decimals starting with zero", () => {
    expect(isInteger("0.5")).toBe(false);
  });

  it("rejects negative decimals", () => {
    expect(isInteger("-0.5")).toBe(false);
  });

  it("rejects decimals with multiple decimal places", () => {
    expect(isInteger("123.456789")).toBe(false);
  });

  it("rejects very small decimals", () => {
    expect(isInteger("0.001")).toBe(false);
  });

  it("rejects negative decimals with zero", () => {
    expect(isInteger("-0.999")).toBe(false);
  });

  it("rejects integers with .0 suffix", () => {
    expect(isInteger("42.0")).toBe(false);
  });

  it("rejects integers with .00 suffix", () => {
    expect(isInteger("42.00")).toBe(false);
  });

  it("rejects decimal point only", () => {
    expect(isInteger(".")).toBe(false);
  });

  it("rejects decimal with no digits before", () => {
    expect(isInteger(".5")).toBe(false);
  });

  it("rejects decimal with no digits after", () => {
    expect(isInteger("5.")).toBe(false);
  });

  it("rejects numbers with multiple decimal points", () => {
    expect(isInteger("3.14.159")).toBe(false);
  });

  // Invalid cases - letters
  it("rejects alphabetic characters", () => {
    expect(isInteger("abc")).toBe(false);
  });

  it("rejects mixed letters and numbers", () => {
    expect(isInteger("123abc")).toBe(false);
  });

  it("rejects numbers with letters at end", () => {
    expect(isInteger("42x")).toBe(false);
  });

  it("rejects letters before numbers", () => {
    expect(isInteger("x42")).toBe(false);
  });

  it("rejects letters in the middle", () => {
    expect(isInteger("12a34")).toBe(false);
  });

  // Invalid cases - special values
  it("rejects Infinity", () => {
    expect(isInteger("Infinity")).toBe(false);
  });

  it("rejects negative Infinity", () => {
    expect(isInteger("-Infinity")).toBe(false);
  });

  it("rejects NaN", () => {
    expect(isInteger("NaN")).toBe(false);
  });

  // Invalid cases - scientific notation
  it("rejects scientific notation with lowercase e", () => {
    expect(isInteger("1e5")).toBe(false);
  });

  it("rejects scientific notation with uppercase E", () => {
    expect(isInteger("1E5")).toBe(false);
  });

  it("rejects scientific notation with negative exponent", () => {
    expect(isInteger("2.5e-3")).toBe(false);
  });

  it("rejects scientific notation with positive exponent", () => {
    expect(isInteger("1.5e+10")).toBe(false);
  });

  it("rejects scientific notation without decimal", () => {
    expect(isInteger("1e10")).toBe(false);
  });

  // Invalid cases - special characters
  it("rejects numbers with commas", () => {
    expect(isInteger("1,000")).toBe(false);
  });

  it("rejects numbers with underscores", () => {
    expect(isInteger("1_000")).toBe(false);
  });

  it("rejects numbers with dollar sign", () => {
    expect(isInteger("$42")).toBe(false);
  });

  it("rejects numbers with percent sign", () => {
    expect(isInteger("42%")).toBe(false);
  });

  it("rejects numbers with plus sign", () => {
    expect(isInteger("+42")).toBe(false);
  });

  it("rejects numbers with parentheses", () => {
    expect(isInteger("(42)")).toBe(false);
  });

  // Invalid cases - multiple minus signs
  it("rejects multiple minus signs", () => {
    expect(isInteger("--5")).toBe(false);
  });

  it("rejects minus sign in middle", () => {
    expect(isInteger("5-5")).toBe(false);
  });

  it("rejects minus sign at end", () => {
    expect(isInteger("5-")).toBe(false);
  });

  // Invalid cases - spaces within number
  it("rejects numbers with internal spaces", () => {
    expect(isInteger("4 2")).toBe(false);
  });

  it("rejects numbers with multiple internal spaces", () => {
    expect(isInteger("1 2 3")).toBe(false);
  });

  // Invalid cases - hexadecimal
  it("rejects hexadecimal with 0x prefix", () => {
    expect(isInteger("0x1F")).toBe(false);
  });

  it("rejects hexadecimal with 0X prefix", () => {
    expect(isInteger("0X1F")).toBe(false);
  });

  it("rejects hexadecimal digits", () => {
    expect(isInteger("ABCDEF")).toBe(false);
  });

  // Invalid cases - binary
  it("rejects binary with 0b prefix", () => {
    expect(isInteger("0b101")).toBe(false);
  });

  it("rejects binary with 0B prefix", () => {
    expect(isInteger("0B101")).toBe(false);
  });

  // Invalid cases - octal
  it("validates numbers that look like octal (treated as decimal)", () => {
    expect(isInteger("0777")).toBe(true); // Treated as decimal 777
  });

  it("rejects octal with 0o prefix", () => {
    expect(isInteger("0o777")).toBe(false);
  });

  it("rejects octal with 0O prefix", () => {
    expect(isInteger("0O777")).toBe(false);
  });

  // Edge cases - very large numbers
  it("validates very large positive integers", () => {
    expect(isInteger("999999999999999999999")).toBe(true);
  });

  it("validates very large negative integers", () => {
    expect(isInteger("-999999999999999999999")).toBe(true);
  });

  // Real-world use cases
  it("validates common age values", () => {
    expect(isInteger("25")).toBe(true);
    expect(isInteger("0")).toBe(true);
    expect(isInteger("120")).toBe(true);
  });

  it("rejects decimal age values", () => {
    expect(isInteger("25.5")).toBe(false);
  });

  it("validates common quantity values", () => {
    expect(isInteger("1")).toBe(true);
    expect(isInteger("10")).toBe(true);
    expect(isInteger("100")).toBe(true);
  });

  it("validates pagination parameters", () => {
    expect(isInteger("1")).toBe(true); // page 1
    expect(isInteger("10")).toBe(true); // limit 10
    expect(isInteger("50")).toBe(true); // limit 50
  });

  it("validates database IDs", () => {
    expect(isInteger("12345")).toBe(true);
    expect(isInteger("1")).toBe(true);
  });

  it("rejects fractional IDs", () => {
    expect(isInteger("123.45")).toBe(false);
  });
});
