import { describe, it, expect } from "vitest";
import { countSubstrings } from "../src/countSubstrings";

describe("countSubstrings", () => {
  it("counts single occurrence", () => {
    expect(countSubstrings("hello world", "hello")).toBe(1);
  });

  it("counts multiple occurrences", () => {
    expect(countSubstrings("hello hello hello", "hello")).toBe(3);
  });

  it("counts non-overlapping occurrences", () => {
    expect(countSubstrings("ababa", "aba")).toBe(1);
    expect(countSubstrings("aaaa", "aa")).toBe(2);
  });

  it("returns 0 when no matches found", () => {
    expect(countSubstrings("hello", "xyz")).toBe(0);
  });

  it("returns 0 for empty string", () => {
    expect(countSubstrings("", "test")).toBe(0);
  });

  it("returns 0 for empty substring", () => {
    expect(countSubstrings("hello", "")).toBe(0);
  });

  it("returns 0 when both are empty", () => {
    expect(countSubstrings("", "")).toBe(0);
  });

  it("is case sensitive", () => {
    expect(countSubstrings("Hello hello HELLO", "hello")).toBe(1);
    expect(countSubstrings("Hello hello HELLO", "Hello")).toBe(1);
  });

  it("counts single character substrings", () => {
    expect(countSubstrings("banana", "a")).toBe(3);
    expect(countSubstrings("mississippi", "s")).toBe(4);
  });

  it("handles substring longer than string", () => {
    expect(countSubstrings("hi", "hello")).toBe(0);
  });

  it("handles substring equal to string", () => {
    expect(countSubstrings("hello", "hello")).toBe(1);
  });

  it("handles special characters", () => {
    expect(countSubstrings("a.b.c.d", ".")).toBe(3);
    expect(countSubstrings("$100 + $200 = $300", "$")).toBe(3);
  });
});
