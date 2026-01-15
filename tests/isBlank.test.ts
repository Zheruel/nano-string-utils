import { describe, it, expect } from "vitest";
import { isBlank } from "../src/isBlank";

describe("isBlank", () => {
  it("returns true for empty string", () => {
    expect(isBlank("")).toBe(true);
  });

  it("returns true for whitespace-only strings", () => {
    expect(isBlank(" ")).toBe(true);
    expect(isBlank("   ")).toBe(true);
    expect(isBlank("\t")).toBe(true);
    expect(isBlank("\n")).toBe(true);
    expect(isBlank("\r")).toBe(true);
    expect(isBlank("\t\n\r ")).toBe(true);
  });

  it("returns false for non-empty strings", () => {
    expect(isBlank("hello")).toBe(false);
    expect(isBlank("a")).toBe(false);
    expect(isBlank("0")).toBe(false);
  });

  it("returns false for strings with leading/trailing whitespace", () => {
    expect(isBlank(" hello ")).toBe(false);
    expect(isBlank("  x")).toBe(false);
    expect(isBlank("y  ")).toBe(false);
  });

  it("returns false for strings with only special characters", () => {
    expect(isBlank(".")).toBe(false);
    expect(isBlank("!")).toBe(false);
    expect(isBlank("-")).toBe(false);
  });

  it("returns true for Unicode whitespace characters", () => {
    expect(isBlank("\u00A0")).toBe(true); // non-breaking space
    expect(isBlank("\u2003")).toBe(true); // em space
    expect(isBlank("\u2002")).toBe(true); // en space
    expect(isBlank("\u2009")).toBe(true); // thin space
    expect(isBlank("\u3000")).toBe(true); // ideographic space
    expect(isBlank("\uFEFF")).toBe(true); // BOM / zero-width no-break space
  });

  it("returns false for zero-width space (formatting character, not whitespace)", () => {
    // Zero-width space (\u200B) is a formatting character, not whitespace
    // JavaScript's trim() correctly does not remove it
    expect(isBlank("\u200B")).toBe(false);
  });
});
