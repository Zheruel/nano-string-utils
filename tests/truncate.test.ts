import { describe, it, expect } from "vitest";
import { truncate } from "../src/truncate";

describe("truncate", () => {
  it("truncates long strings", () => {
    expect(truncate("Long text here", 10)).toBe("Long te...");
  });

  it("does not truncate short strings", () => {
    expect(truncate("Short", 10)).toBe("Short");
  });

  it("handles exact length strings", () => {
    expect(truncate("Exactly10!", 10)).toBe("Exactly10!");
  });

  it("uses custom suffix", () => {
    expect(truncate("Long text here", 10, "…")).toBe("Long text…");
  });

  it("handles empty suffix", () => {
    expect(truncate("Long text here", 10, "")).toBe("Long text ");
  });

  it("handles very small length", () => {
    expect(truncate("Hello World", 3)).toBe("...");
  });

  it("handles length smaller than suffix", () => {
    expect(truncate("Hello World", 2)).toBe("...");
  });

  it("handles empty string", () => {
    expect(truncate("", 10)).toBe("");
  });

  it("preserves string when length equals string length", () => {
    expect(truncate("Test", 4)).toBe("Test");
  });

  it("handles long custom suffix", () => {
    expect(truncate("Hello World", 10, " [...]")).toBe("Hell [...]");
  });

  it("handles single character truncation", () => {
    expect(truncate("Hello", 4)).toBe("H...");
  });

  it("handles unicode characters", () => {
    // Byte-based truncation: "Hello " (6) + "..." (3) = 9 bytes
    // This prevents broken emoji display while maintaining performance
    expect(truncate("Hello 👋 World", 10)).toBe("Hello ...");

    // Emoji at the end gets preserved if there's room
    expect(truncate("Test 👍", 10)).toBe("Test 👍");

    // Broken surrogate pairs are cleaned up
    const withEmoji = "Hi 👋 there";
    // Truncating to 6 chars total: "Hi " (3) + "..." (3) = 6
    expect(truncate(withEmoji, 6)).toBe("Hi ...");

    // Truncating right before emoji - prevents broken display
    expect(truncate(withEmoji, 7)).toBe("Hi ...");
  });
});
