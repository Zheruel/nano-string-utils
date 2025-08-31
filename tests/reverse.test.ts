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
});
