import { describe, it, expect } from "vitest";
import { hashString } from "../src/hashString";

describe("hashString", () => {
  it("generates consistent hash for same input", () => {
    const hash1 = hashString("test");
    const hash2 = hashString("test");
    expect(hash1).toBe(hash2);
  });

  it("generates different hashes for different inputs", () => {
    const hash1 = hashString("test1");
    const hash2 = hashString("test2");
    expect(hash1).not.toBe(hash2);
  });

  it("returns FNV offset basis for empty string", () => {
    expect(hashString("")).toBe(2166136261);
  });

  it("returns positive number for non-empty strings", () => {
    expect(hashString("hello")).toBeGreaterThanOrEqual(0);
  });

  it("handles single character", () => {
    const hash = hashString("a");
    expect(typeof hash).toBe("number");
    expect(hash).toBeGreaterThan(0);
  });

  it("handles long strings", () => {
    const longString = "a".repeat(1000);
    const hash = hashString(longString);
    expect(typeof hash).toBe("number");
    expect(hash).toBeGreaterThanOrEqual(0);
  });

  it("handles special characters", () => {
    const hash = hashString("!@#$%^&*()");
    expect(typeof hash).toBe("number");
    expect(hash).toBeGreaterThanOrEqual(0);
  });

  it("handles unicode characters", () => {
    const hash = hashString("Hello 👋 世界");
    expect(typeof hash).toBe("number");
    expect(hash).toBeGreaterThanOrEqual(0);
  });

  it("case sensitive hashing", () => {
    const hash1 = hashString("Test");
    const hash2 = hashString("test");
    expect(hash1).not.toBe(hash2);
  });

  it("handles whitespace differently", () => {
    const hash1 = hashString("hello world");
    const hash2 = hashString("helloworld");
    expect(hash1).not.toBe(hash2);
  });

  it("generates reasonably distributed hashes", () => {
    const hashes = ["test1", "test2", "test3", "test4", "test5"].map(
      hashString
    );
    const uniqueHashes = new Set(hashes);
    expect(uniqueHashes.size).toBe(5);
  });

  it("demonstrates better avalanche effect with FNV-1a", () => {
    // Similar strings should produce very different hashes
    const hash1 = hashString("test");
    const hash2 = hashString("tess");
    const hash3 = hashString("testa");

    // Check that changing one character produces significantly different hash
    expect(Math.abs(hash1 - hash2)).toBeGreaterThan(1000000);
    expect(Math.abs(hash1 - hash3)).toBeGreaterThan(1000000);
  });

  it("produces full 32-bit range hashes", () => {
    // Test that we can get hashes across the full unsigned 32-bit range
    const hashes = [
      hashString("abc"),
      hashString("xyz"),
      hashString("Hello World!"),
      hashString("🎉🎊🎈"),
    ];

    // All should be valid unsigned 32-bit integers
    hashes.forEach((hash) => {
      expect(hash).toBeGreaterThanOrEqual(0);
      expect(hash).toBeLessThanOrEqual(4294967295); // 2^32 - 1
    });
  });

  it("handles hash collision resistance better", () => {
    // Test common patterns that often collide with simple hash functions
    const patterns = [
      ["abc", "bac", "cab"],
      ["123", "132", "213", "231", "312", "321"],
      ["aa", "bb", "cc", "dd"],
    ];

    patterns.forEach((group) => {
      const hashes = group.map(hashString);
      const uniqueHashes = new Set(hashes);
      // All hashes should be unique
      expect(uniqueHashes.size).toBe(group.length);
    });
  });
});
