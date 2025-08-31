import { describe, it, expect } from "vitest";
import { wordCount } from "../src/wordCount";

describe("wordCount", () => {
  it("counts simple words", () => {
    expect(wordCount("Hello world")).toBe(2);
  });

  it("handles multiple spaces", () => {
    expect(wordCount("  Multiple   spaces  ")).toBe(2);
  });

  it("counts hyphenated as one word", () => {
    expect(wordCount("One-word")).toBe(1);
  });

  it("handles empty string", () => {
    expect(wordCount("")).toBe(0);
  });

  it("handles string with only spaces", () => {
    expect(wordCount("   ")).toBe(0);
  });

  it("counts single word", () => {
    expect(wordCount("Hello")).toBe(1);
  });

  it("handles tabs and newlines", () => {
    expect(wordCount("Hello\tworld\ntest")).toBe(3);
  });

  it("counts numbers as words", () => {
    expect(wordCount("I have 5 apples")).toBe(4);
  });

  it("handles punctuation", () => {
    expect(wordCount("Hello, world! How are you?")).toBe(5);
  });

  it("handles multiple types of whitespace", () => {
    expect(wordCount("  Hello  \t  world  \n  test  ")).toBe(3);
  });

  it("counts contractions as single words", () => {
    expect(wordCount("Don't can't won't")).toBe(3);
  });

  it("handles long text", () => {
    const text = "The quick brown fox jumps over the lazy dog";
    expect(wordCount(text)).toBe(9);
  });

  it("handles special characters", () => {
    expect(wordCount("Hello@world #test $money")).toBe(3);
  });

  it("handles unicode characters", () => {
    expect(wordCount("Hello 👋 world")).toBe(3);
  });

  it("handles leading and trailing whitespace", () => {
    expect(wordCount("\n\t  Hello world  \n\t")).toBe(2);
  });
});
