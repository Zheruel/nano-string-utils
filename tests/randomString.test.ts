import { describe, it, expect } from "vitest";
import { randomString } from "../src/randomString";

describe("randomString", () => {
  it("generates string of specified length", () => {
    const result = randomString(10);
    expect(result).toHaveLength(10);
  });

  it("generates different strings on subsequent calls", () => {
    const str1 = randomString(10);
    const str2 = randomString(10);
    expect(str1).not.toBe(str2);
  });

  it("generates empty string for length 0", () => {
    expect(randomString(0)).toBe("");
  });

  it("generates single character for length 1", () => {
    const result = randomString(1);
    expect(result).toHaveLength(1);
    expect(result).toMatch(/^[A-Za-z0-9]$/);
  });

  it("contains only alphanumeric characters", () => {
    const result = randomString(100);
    expect(result).toMatch(/^[A-Za-z0-9]+$/);
  });

  it("handles large lengths", () => {
    const result = randomString(1000);
    expect(result).toHaveLength(1000);
    expect(result).toMatch(/^[A-Za-z0-9]+$/);
  });

  it("handles negative length by returning empty string", () => {
    expect(randomString(-5)).toBe("");
  });

  it("generates strings with expected character set", () => {
    const result = randomString(100);
    const hasLowercase = /[a-z]/.test(result);
    const hasUppercase = /[A-Z]/.test(result);
    const hasNumbers = /[0-9]/.test(result);
    // At least one of these should be true for a 100-char string
    expect(hasLowercase || hasUppercase || hasNumbers).toBe(true);
  });

  it("generates consistent length strings", () => {
    const lengths = [5, 10, 15, 20];
    lengths.forEach((length) => {
      const result = randomString(length);
      expect(result).toHaveLength(length);
    });
  });

  it("handles decimal lengths by flooring", () => {
    const result = randomString(5.7);
    expect(result).toHaveLength(5);
  });
});
