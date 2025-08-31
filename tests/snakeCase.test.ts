import { describe, it, expect } from "vitest";
import { snakeCase } from "../src/snakeCase";

describe("snakeCase", () => {
  it("converts space separated words", () => {
    expect(snakeCase("Hello World")).toBe("hello_world");
  });

  it("converts camelCase", () => {
    expect(snakeCase("helloWorld")).toBe("hello_world");
  });

  it("converts PascalCase", () => {
    expect(snakeCase("HelloWorld")).toBe("hello_world");
  });

  it("converts kebab-case", () => {
    expect(snakeCase("hello-world")).toBe("hello_world");
  });

  it("handles already snake_case", () => {
    expect(snakeCase("hello_world")).toBe("hello_world");
  });

  it("handles mixed case and separators", () => {
    expect(snakeCase("HelloWorld-test_case")).toBe("hello_world_test_case");
  });

  it("handles all uppercase", () => {
    expect(snakeCase("HELLO WORLD")).toBe("hello_world");
  });

  it("handles empty string", () => {
    expect(snakeCase("")).toBe("");
  });

  it("handles single word", () => {
    expect(snakeCase("hello")).toBe("hello");
  });

  it("handles numbers", () => {
    expect(snakeCase("hello123World")).toBe("hello123_world");
  });

  it("removes special characters", () => {
    expect(snakeCase("hello@world#test")).toBe("hello_world_test");
  });

  it("handles consecutive uppercase letters", () => {
    expect(snakeCase("HTTPResponse")).toBe("httpresponse");
  });

  it("handles leading/trailing spaces", () => {
    expect(snakeCase("  hello world  ")).toBe("hello_world");
  });

  it("handles multiple underscores", () => {
    expect(snakeCase("hello___world")).toBe("hello_world");
  });
});
