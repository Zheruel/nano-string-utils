import { describe, it, expect } from "vitest";
import { excerpt } from "../src/excerpt";

describe("excerpt", () => {
  // Basic functionality
  it("should return full text if shorter than limit", () => {
    expect(excerpt("Hello world", 20)).toBe("Hello world");
    expect(excerpt("Short", 100)).toBe("Short");
  });

  it("should handle empty or null input", () => {
    expect(excerpt("", 10)).toBe("");
    expect(excerpt(null as any, 10)).toBe(null);
    expect(excerpt(undefined as any, 10)).toBe(undefined);
  });

  // Word boundary tests
  it("should break at word boundaries", () => {
    expect(excerpt("The quick brown fox jumps over the lazy dog", 20)).toBe(
      "The quick brown fox..."
    );
    expect(excerpt("Hello wonderful world today", 15)).toBe(
      "Hello wonderful..."
    );
  });

  it("should handle long first words gracefully", () => {
    const text = "Supercalifragilisticexpialidocious is quite a long word";
    // If first word is too long, it should cut it
    const result = excerpt(text, 10);
    expect(result).toBe("Supercalif...");
  });

  // Basic sentence handling
  it("should create clean excerpts with sentences", () => {
    expect(excerpt("Hello world. This is a test.", 15)).toBe("Hello world...");
    expect(excerpt("First sentence! Second one here.", 25)).toBe(
      "First sentence! Second..."
    );
  });

  // Custom suffix tests
  it("should use custom suffix when provided", () => {
    expect(excerpt("The quick brown fox jumps", 10, "…")).toBe("The quick…");
    expect(excerpt("Hello world this is a test", 15, " [more]")).toBe(
      "Hello world [more]"
    );
    expect(excerpt("Testing custom suffix", 7, "")).toBe("Testing");
  });

  // Trailing punctuation handling
  it("should remove trailing punctuation before adding suffix", () => {
    expect(excerpt("Hello, world, how are you", 13)).toBe("Hello, world...");
    expect(excerpt("Test string; another part", 12)).toBe("Test string...");
    expect(excerpt("Dash test - here we go", 10)).toBe("Dash test...");
  });

  // Edge cases with spaces
  it("should handle multiple spaces correctly", () => {
    expect(excerpt("Hello    world    test", 10)).toBe("Hello...");
    const trimmed = excerpt("   Trimmed   text   here   ", 20);
    expect(trimmed).toBe("Trimmed   text...");
  });

  it("should handle text with no spaces", () => {
    const singleWord = "verylongwordwithoutanyspaces";
    expect(excerpt(singleWord, 10)).toBe("verylongwo...");
  });

  // Unicode and special characters
  it("should handle unicode characters", () => {
    expect(excerpt("Hello 世界 test text", 10)).toBe("Hello 世界...");
    expect(excerpt("Emoji 😀 test string here", 15)).toBe("Emoji 😀 test...");
  });

  it("should handle various dash types", () => {
    expect(excerpt("Test – en dash here", 10)).toBe("Test – en...");
    expect(excerpt("Test — em dash here", 10)).toBe("Test — em...");
  });

  // Real-world examples
  it("should handle real-world text examples", () => {
    const article =
      "The JavaScript ecosystem has evolved significantly over the past decade. Modern frameworks like React, Vue, and Angular have transformed how we build web applications.";
    expect(excerpt(article, 60)).toBe(
      "The JavaScript ecosystem has evolved significantly over the..."
    );
    expect(excerpt(article, 100)).toBe(
      "The JavaScript ecosystem has evolved significantly over the past decade. Modern frameworks like..."
    );
  });

  it("should handle markdown-like text", () => {
    const markdown =
      "# Title Here\n\nThis is a paragraph. Another sentence follows.";
    expect(excerpt(markdown, 30)).toBe("# Title Here\n\nThis is a...");
  });

  it("should handle text with mixed punctuation", () => {
    const text =
      "Items: apples, oranges, bananas; also vegetables: carrots, peas.";
    expect(excerpt(text, 35)).toBe("Items: apples, oranges, bananas...");
  });

  // Performance edge cases
  it("should handle very long text efficiently", () => {
    const longText = "word ".repeat(1000) + "end";
    const result = excerpt(longText, 50);
    expect(result.length).toBeLessThanOrEqual(53); // Some flexibility
    expect(result).toContain("...");
  });

  it("should handle exact length match", () => {
    expect(excerpt("Hello world test", 16)).toBe("Hello world test");
    expect(excerpt("Hello world test", 11)).toBe("Hello world...");
  });

  // Additional practical cases
  it("should handle code snippets", () => {
    const code = "function calculateSum(a, b) { return a + b; }";
    expect(excerpt(code, 30)).toBe("function calculateSum(a, b) {...");
  });

  it("should handle URLs", () => {
    // URLs don't have spaces, so they get truncated at the limit
    const url = "https://www.example.com/very/long/path/to/resource";
    expect(excerpt(url, 30)).toBe("https://www.example.com/very/l...");
  });

  it("should handle sentences at exact boundaries", () => {
    expect(excerpt("End here. More text", 9)).toBe("End here...");
    expect(excerpt("Perfect fit.", 12)).toBe("Perfect fit.");
  });
});
