import { describe, it, expect } from "vitest";
import { slugify } from "../src/slugify";

describe("slugify", () => {
  it("converts string to slug", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
  });

  it("handles multiple spaces", () => {
    expect(slugify("  Multiple   Spaces  ")).toBe("multiple-spaces");
  });

  it("removes special characters", () => {
    expect(slugify("Hello@World#2025!")).toBe("helloworld2025");
  });

  it("handles underscores", () => {
    expect(slugify("hello_world_test")).toBe("hello-world-test");
  });

  it("handles mixed case", () => {
    expect(slugify("MiXeD CaSe TeXt")).toBe("mixed-case-text");
  });

  it("handles numbers", () => {
    expect(slugify("Product 123 Name")).toBe("product-123-name");
  });

  it("handles empty string", () => {
    expect(slugify("")).toBe("");
  });

  it("handles string with only special characters", () => {
    expect(slugify("@#$%^&*()")).toBe("");
  });

  it("removes leading and trailing hyphens", () => {
    expect(slugify("---test---")).toBe("test");
  });

  it("handles consecutive hyphens", () => {
    expect(slugify("test---multiple---hyphens")).toBe("test-multiple-hyphens");
  });

  it("handles accented characters by removing them", () => {
    expect(slugify("café résumé")).toBe("caf-rsum");
  });

  it("handles tabs and newlines", () => {
    expect(slugify("hello\tworld\ntest")).toBe("hello-world-test");
  });
});
