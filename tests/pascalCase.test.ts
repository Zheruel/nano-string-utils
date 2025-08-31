import { describe, it, expect } from "vitest";
import { pascalCase } from "../src/pascalCase";

describe("pascalCase", () => {
  it("converts space separated words", () => {
    expect(pascalCase("hello world")).toBe("HelloWorld");
  });

  it("converts hyphenated words", () => {
    expect(pascalCase("hello-world")).toBe("HelloWorld");
  });

  it("converts snake_case", () => {
    expect(pascalCase("hello_world")).toBe("HelloWorld");
  });

  it("converts camelCase to PascalCase", () => {
    expect(pascalCase("helloWorld")).toBe("HelloWorld");
  });

  it("handles already PascalCase", () => {
    expect(pascalCase("HelloWorld")).toBe("HelloWorld");
  });

  it("handles all lowercase", () => {
    expect(pascalCase("hello")).toBe("Hello");
  });

  it("handles all uppercase", () => {
    expect(pascalCase("HELLO WORLD")).toBe("HelloWorld");
  });

  it("handles empty string", () => {
    expect(pascalCase("")).toBe("");
  });

  it("handles mixed separators", () => {
    expect(pascalCase("hello-world_test case")).toBe("HelloWorldTestCase");
  });

  it("handles numbers", () => {
    expect(pascalCase("hello2world")).toBe("Hello2World");
  });

  it("removes special characters", () => {
    expect(pascalCase("hello@world#test")).toBe("HelloWorldTest");
  });

  it("handles multiple spaces", () => {
    expect(pascalCase("hello   world")).toBe("HelloWorld");
  });

  it("handles leading/trailing spaces", () => {
    expect(pascalCase("  hello world  ")).toBe("HelloWorld");
  });

  it("handles single letter words", () => {
    expect(pascalCase("a b c")).toBe("ABC");
  });
});
