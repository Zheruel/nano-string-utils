import { describe, it, expect } from "vitest";
import { constantCase } from "../src/constantCase";

describe("constantCase", () => {
  // Basic conversions
  it("should convert space-separated words to CONSTANT_CASE", () => {
    expect(constantCase("hello world")).toBe("HELLO_WORLD");
    expect(constantCase("the quick brown fox")).toBe("THE_QUICK_BROWN_FOX");
  });

  it("should convert camelCase to CONSTANT_CASE", () => {
    expect(constantCase("helloWorld")).toBe("HELLO_WORLD");
    expect(constantCase("theQuickBrownFox")).toBe("THE_QUICK_BROWN_FOX");
    expect(constantCase("myVariableName")).toBe("MY_VARIABLE_NAME");
  });

  it("should convert PascalCase to CONSTANT_CASE", () => {
    expect(constantCase("HelloWorld")).toBe("HELLO_WORLD");
    expect(constantCase("TheQuickBrownFox")).toBe("THE_QUICK_BROWN_FOX");
    expect(constantCase("MyClassName")).toBe("MY_CLASS_NAME");
  });

  it("should convert kebab-case to CONSTANT_CASE", () => {
    expect(constantCase("hello-world")).toBe("HELLO_WORLD");
    expect(constantCase("the-quick-brown-fox")).toBe("THE_QUICK_BROWN_FOX");
    expect(constantCase("my-variable-name")).toBe("MY_VARIABLE_NAME");
  });

  it("should convert snake_case to CONSTANT_CASE", () => {
    expect(constantCase("hello_world")).toBe("HELLO_WORLD");
    expect(constantCase("the_quick_brown_fox")).toBe("THE_QUICK_BROWN_FOX");
    expect(constantCase("my_variable_name")).toBe("MY_VARIABLE_NAME");
  });

  it("should handle already CONSTANT_CASE strings", () => {
    expect(constantCase("HELLO_WORLD")).toBe("HELLO_WORLD");
    expect(constantCase("THE_QUICK_BROWN_FOX")).toBe("THE_QUICK_BROWN_FOX");
  });

  // Mixed formats
  it("should handle mixed formatting", () => {
    expect(constantCase("hello-World_TEST")).toBe("HELLO_WORLD_TEST");
    expect(constantCase("XML-Http-Request")).toBe("XML_HTTP_REQUEST");
    expect(constantCase("get_XMLHttpRequest")).toBe("GET_XML_HTTP_REQUEST");
  });

  // Numbers
  it("should handle strings with numbers", () => {
    expect(constantCase("hello2world")).toBe("HELLO_2_WORLD");
    expect(constantCase("hello2World")).toBe("HELLO_2_WORLD");
    expect(constantCase("2hello")).toBe("2_HELLO");
    expect(constantCase("hello2")).toBe("HELLO_2");
    expect(constantCase("h3ll0W0rld")).toBe("H_3_LL_0_W_0_RLD");
  });

  // Special characters
  it("should handle special characters", () => {
    expect(constantCase("hello@world")).toBe("HELLO_WORLD");
    expect(constantCase("hello#world")).toBe("HELLO_WORLD");
    expect(constantCase("hello.world")).toBe("HELLO_WORLD");
    expect(constantCase("hello/world")).toBe("HELLO_WORLD");
    expect(constantCase("hello\\world")).toBe("HELLO_WORLD");
    expect(constantCase("hello$world")).toBe("HELLO_WORLD");
    expect(constantCase("hello%world")).toBe("HELLO_WORLD");
    expect(constantCase("hello&world")).toBe("HELLO_WORLD");
    expect(constantCase("hello*world")).toBe("HELLO_WORLD");
  });

  // Multiple delimiters
  it("should handle multiple consecutive delimiters", () => {
    expect(constantCase("hello___world")).toBe("HELLO_WORLD");
    expect(constantCase("hello---world")).toBe("HELLO_WORLD");
    expect(constantCase("hello   world")).toBe("HELLO_WORLD");
    expect(constantCase("__hello__world__")).toBe("HELLO_WORLD");
    expect(constantCase("--hello--world--")).toBe("HELLO_WORLD");
  });

  // Edge cases
  it("should handle edge cases", () => {
    expect(constantCase("")).toBe("");
    expect(constantCase(" ")).toBe("");
    expect(constantCase("_")).toBe("");
    expect(constantCase("-")).toBe("");
    expect(constantCase("___")).toBe("");
    expect(constantCase("---")).toBe("");
  });

  it("should handle single words", () => {
    expect(constantCase("hello")).toBe("HELLO");
    expect(constantCase("HELLO")).toBe("HELLO");
    expect(constantCase("Hello")).toBe("HELLO");
    expect(constantCase("h")).toBe("H");
  });

  it("should handle whitespace", () => {
    expect(constantCase("  hello  world  ")).toBe("HELLO_WORLD");
    expect(constantCase("\thello\tworld\t")).toBe("HELLO_WORLD");
    expect(constantCase("\nhello\nworld\n")).toBe("HELLO_WORLD");
    expect(constantCase("  \t\n  hello  \t\n  world  \t\n  ")).toBe(
      "HELLO_WORLD"
    );
  });

  // Acronyms
  it("should handle acronyms", () => {
    expect(constantCase("XMLHttpRequest")).toBe("XML_HTTP_REQUEST");
    expect(constantCase("IOError")).toBe("IO_ERROR");
    expect(constantCase("HTTPSConnection")).toBe("HTTPS_CONNECTION");
    expect(constantCase("URLParser")).toBe("URL_PARSER");
  });

  // Unicode and special characters
  it("should handle unicode characters", () => {
    expect(constantCase("café_münchën")).toBe("CAF_M_NCH_N");
    expect(constantCase("hello(world)")).toBe("HELLO_WORLD");
    expect(constantCase("[hello]world")).toBe("HELLO_WORLD");
    expect(constantCase("{hello}world")).toBe("HELLO_WORLD");
  });

  // Falsy values
  it("should handle falsy values correctly", () => {
    expect(constantCase("")).toBe("");
    // TypeScript will catch null/undefined at compile time, but test runtime behavior
    expect(constantCase(null as any)).toBe(null);
    expect(constantCase(undefined as any)).toBe(undefined);
  });

  // Long strings
  it("should handle long strings", () => {
    const longString =
      "this is a very long string with many words that should be converted to constant case format correctly";
    expect(constantCase(longString)).toBe(
      "THIS_IS_A_VERY_LONG_STRING_WITH_MANY_WORDS_THAT_SHOULD_BE_CONVERTED_TO_CONSTANT_CASE_FORMAT_CORRECTLY"
    );
  });

  // Real-world examples
  it("should handle real-world variable names", () => {
    expect(constantCase("getUserById")).toBe("GET_USER_BY_ID");
    expect(constantCase("MAX_RETRY_COUNT")).toBe("MAX_RETRY_COUNT");
    expect(constantCase("api-key-value")).toBe("API_KEY_VALUE");
    expect(constantCase("Content-Type")).toBe("CONTENT_TYPE");
    expect(constantCase("x-auth-token")).toBe("X_AUTH_TOKEN");
    expect(constantCase("__private_variable")).toBe("PRIVATE_VARIABLE");
    expect(constantCase("$rootScope")).toBe("ROOT_SCOPE");
    expect(constantCase("_lodash")).toBe("LODASH");
  });
});
