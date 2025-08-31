import { describe, it, expect } from "vitest";
import { camelCase } from "../src/camelCase";

describe("camelCase", () => {
  it("converts space separated words", () => {
    expect(camelCase("hello world")).toBe("helloWorld");
  });

  it("converts hyphenated words", () => {
    expect(camelCase("hello-world")).toBe("helloWorld");
  });

  it("converts snake_case", () => {
    expect(camelCase("hello_world")).toBe("helloWorld");
  });

  it("handles mixed separators", () => {
    expect(camelCase("hello-world_test case")).toBe("helloWorldTestCase");
  });

  it("handles already camelCase strings", () => {
    expect(camelCase("helloWorld")).toBe("helloWorld");
  });

  it("handles PascalCase strings", () => {
    expect(camelCase("HelloWorld")).toBe("helloWorld");
  });

  it("handles all uppercase", () => {
    expect(camelCase("HELLO WORLD")).toBe("helloWorld");
  });

  it("handles empty string", () => {
    expect(camelCase("")).toBe("");
  });

  it("handles single word", () => {
    expect(camelCase("hello")).toBe("hello");
  });

  it("handles numbers", () => {
    expect(camelCase("hello2world")).toBe("hello2World");
  });

  it("handles special characters", () => {
    expect(camelCase("hello@world#test")).toBe("helloWorldTest");
  });

  it("handles multiple spaces", () => {
    expect(camelCase("hello   world")).toBe("helloWorld");
  });

  it("handles leading/trailing spaces", () => {
    expect(camelCase("  hello world  ")).toBe("helloWorld");
  });
});
