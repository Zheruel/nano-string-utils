import { describe, it, expect } from "vitest";
import { capitalize } from "../src/capitalize";

describe("capitalize", () => {
  it("capitalizes first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("handles already capitalized strings", () => {
    expect(capitalize("Hello")).toBe("Hello");
  });

  it("handles all uppercase strings", () => {
    expect(capitalize("HELLO")).toBe("Hello");
  });

  it("handles mixed case strings", () => {
    expect(capitalize("hELLO wORLD")).toBe("Hello world");
  });

  it("handles empty string", () => {
    expect(capitalize("")).toBe("");
  });

  it("handles single character", () => {
    expect(capitalize("a")).toBe("A");
  });

  it("handles single uppercase character", () => {
    expect(capitalize("A")).toBe("A");
  });

  it("preserves spaces", () => {
    expect(capitalize("  hello")).toBe("  hello");
  });

  it("handles strings starting with numbers", () => {
    expect(capitalize("123abc")).toBe("123abc");
  });

  it("handles strings starting with special characters", () => {
    expect(capitalize("!hello")).toBe("!hello");
  });

  it("handles strings with only spaces", () => {
    expect(capitalize("   ")).toBe("   ");
  });

  it("handles strings with unicode characters", () => {
    expect(capitalize("über")).toBe("Über");
  });
});
