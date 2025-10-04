import { describe, it, expect } from "vitest";
import { kebabCase } from "../src/kebabCase";

describe("kebabCase", () => {
  it("converts space separated words", () => {
    expect(kebabCase("Hello World")).toBe("hello-world");
  });

  it("converts camelCase", () => {
    expect(kebabCase("helloWorld")).toBe("hello-world");
  });

  it("converts PascalCase", () => {
    expect(kebabCase("HelloWorld")).toBe("hello-world");
  });

  it("converts snake_case", () => {
    expect(kebabCase("hello_world")).toBe("hello-world");
  });

  it("handles already kebab-case", () => {
    expect(kebabCase("hello-world")).toBe("hello-world");
  });

  it("handles mixed case and separators", () => {
    expect(kebabCase("HelloWorld_test-case")).toBe("hello-world-test-case");
  });

  it("handles all uppercase", () => {
    expect(kebabCase("HELLO WORLD")).toBe("hello-world");
  });

  it("handles empty string", () => {
    expect(kebabCase("")).toBe("");
  });

  it("handles single word", () => {
    expect(kebabCase("hello")).toBe("hello");
  });

  it("handles numbers", () => {
    expect(kebabCase("hello123World")).toBe("hello-123-world");
  });

  it("removes special characters", () => {
    expect(kebabCase("hello@world#test")).toBe("hello-world-test");
  });

  it("handles consecutive uppercase letters", () => {
    expect(kebabCase("HTTPResponse")).toBe("http-response");
  });

  it("handles leading/trailing spaces", () => {
    expect(kebabCase("  hello world  ")).toBe("hello-world");
  });

  it("handles multiple hyphens", () => {
    expect(kebabCase("hello---world")).toBe("hello-world");
  });
});
