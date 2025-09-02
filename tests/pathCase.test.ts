import { describe, it, expect } from "vitest";
import { pathCase } from "../src/pathCase";

describe("pathCase", () => {
  // Basic conversions
  it("should convert space-separated words to path/case", () => {
    expect(pathCase("hello world")).toBe("hello/world");
    expect(pathCase("the quick brown fox")).toBe("the/quick/brown/fox");
  });

  it("should convert camelCase to path/case", () => {
    expect(pathCase("helloWorld")).toBe("hello/world");
    expect(pathCase("theQuickBrownFox")).toBe("the/quick/brown/fox");
    expect(pathCase("myVariableName")).toBe("my/variable/name");
  });

  it("should convert PascalCase to path/case", () => {
    expect(pathCase("HelloWorld")).toBe("hello/world");
    expect(pathCase("TheQuickBrownFox")).toBe("the/quick/brown/fox");
    expect(pathCase("MyClassName")).toBe("my/class/name");
  });

  it("should convert kebab-case to path/case", () => {
    expect(pathCase("hello-world")).toBe("hello/world");
    expect(pathCase("the-quick-brown-fox")).toBe("the/quick/brown/fox");
    expect(pathCase("my-variable-name")).toBe("my/variable/name");
  });

  it("should convert snake_case to path/case", () => {
    expect(pathCase("hello_world")).toBe("hello/world");
    expect(pathCase("the_quick_brown_fox")).toBe("the/quick/brown/fox");
    expect(pathCase("my_variable_name")).toBe("my/variable/name");
  });

  it("should convert CONSTANT_CASE to path/case", () => {
    expect(pathCase("HELLO_WORLD")).toBe("hello/world");
    expect(pathCase("THE_QUICK_BROWN_FOX")).toBe("the/quick/brown/fox");
  });

  it("should handle already path/case strings", () => {
    expect(pathCase("hello/world")).toBe("hello/world");
    expect(pathCase("the/quick/brown/fox")).toBe("the/quick/brown/fox");
  });

  // Mixed formats
  it("should handle mixed formatting", () => {
    expect(pathCase("hello-World_TEST")).toBe("hello/world/test");
    expect(pathCase("XML-Http-Request")).toBe("xml/http/request");
    expect(pathCase("get_XMLHttpRequest")).toBe("get/xml/http/request");
    expect(pathCase("hello/world-TEST")).toBe("hello/world/test");
  });

  // Numbers
  it("should handle strings with numbers", () => {
    expect(pathCase("hello2world")).toBe("hello/2/world");
    expect(pathCase("hello2World")).toBe("hello/2/world");
    expect(pathCase("2hello")).toBe("2/hello");
    expect(pathCase("hello2")).toBe("hello/2");
    expect(pathCase("h3ll0W0rld")).toBe("h/3/ll/0/w/0/rld");
    expect(pathCase("version1.2.3")).toBe("version/1/2/3");
  });

  // Special characters
  it("should handle special characters", () => {
    expect(pathCase("hello@world")).toBe("hello/world");
    expect(pathCase("hello#world")).toBe("hello/world");
    expect(pathCase("hello.world")).toBe("hello/world");
    expect(pathCase("hello\\world")).toBe("hello/world");
    expect(pathCase("hello$world")).toBe("hello/world");
    expect(pathCase("hello%world")).toBe("hello/world");
    expect(pathCase("hello&world")).toBe("hello/world");
    expect(pathCase("hello*world")).toBe("hello/world");
    expect(pathCase("hello(world)")).toBe("hello/world");
    expect(pathCase("hello[world]")).toBe("hello/world");
  });

  // Multiple delimiters
  it("should handle multiple consecutive delimiters", () => {
    expect(pathCase("hello///world")).toBe("hello/world");
    expect(pathCase("hello___world")).toBe("hello/world");
    expect(pathCase("hello---world")).toBe("hello/world");
    expect(pathCase("hello   world")).toBe("hello/world");
    expect(pathCase("//hello//world//")).toBe("hello/world");
    expect(pathCase("__hello__world__")).toBe("hello/world");
    expect(pathCase("--hello--world--")).toBe("hello/world");
  });

  // Edge cases
  it("should handle edge cases", () => {
    expect(pathCase("")).toBe("");
    expect(pathCase(" ")).toBe("");
    expect(pathCase("/")).toBe("");
    expect(pathCase("_")).toBe("");
    expect(pathCase("-")).toBe("");
    expect(pathCase("///")).toBe("");
    expect(pathCase("___")).toBe("");
    expect(pathCase("---")).toBe("");
  });

  it("should handle single words", () => {
    expect(pathCase("hello")).toBe("hello");
    expect(pathCase("HELLO")).toBe("hello");
    expect(pathCase("Hello")).toBe("hello");
    expect(pathCase("h")).toBe("h");
  });

  it("should handle whitespace", () => {
    expect(pathCase("  hello  world  ")).toBe("hello/world");
    expect(pathCase("\thello\tworld\t")).toBe("hello/world");
    expect(pathCase("\nhello\nworld\n")).toBe("hello/world");
    expect(pathCase("  \t\n  hello  \t\n  world  \t\n  ")).toBe("hello/world");
  });

  // Acronyms
  it("should handle acronyms", () => {
    expect(pathCase("XMLHttpRequest")).toBe("xml/http/request");
    expect(pathCase("IOError")).toBe("io/error");
    expect(pathCase("HTTPSConnection")).toBe("https/connection");
    expect(pathCase("URLParser")).toBe("url/parser");
    expect(pathCase("APIKey")).toBe("api/key");
    expect(pathCase("HTMLElement")).toBe("html/element");
  });

  // Unicode and special characters
  it("should handle unicode characters", () => {
    expect(pathCase("café_münchën")).toBe("caf/m/nch/n");
    expect(pathCase("hello€world")).toBe("hello/world");
    expect(pathCase("price$100")).toBe("price/100");
  });

  // Falsy values
  it("should handle falsy values correctly", () => {
    expect(pathCase("")).toBe("");
    // TypeScript will catch null/undefined at compile time, but test runtime behavior
    expect(pathCase(null as any)).toBe(null);
    expect(pathCase(undefined as any)).toBe(undefined);
  });

  // Long strings
  it("should handle long strings", () => {
    const longString =
      "this is a very long string with many words that should be converted to path case format correctly";
    expect(pathCase(longString)).toBe(
      "this/is/a/very/long/string/with/many/words/that/should/be/converted/to/path/case/format/correctly"
    );
  });

  // Real-world examples
  it("should handle real-world variable names and paths", () => {
    expect(pathCase("getUserById")).toBe("get/user/by/id");
    expect(pathCase("MAX_RETRY_COUNT")).toBe("max/retry/count");
    expect(pathCase("api-key-value")).toBe("api/key/value");
    expect(pathCase("Content-Type")).toBe("content/type");
    expect(pathCase("x-auth-token")).toBe("x/auth/token");
    expect(pathCase("__private_variable")).toBe("private/variable");
    expect(pathCase("$rootScope")).toBe("root/scope");
    expect(pathCase("_lodash")).toBe("lodash");
    expect(pathCase("src/components/Header")).toBe("src/components/header");
    expect(pathCase("user/profile/settings")).toBe("user/profile/settings");
  });

  // File paths and URL paths
  it("should handle file paths and URL paths", () => {
    expect(pathCase("src.components.Header")).toBe("src/components/header");
    expect(pathCase("api.v1.users")).toBe("api/v/1/users");
    expect(pathCase("MyApp::Controllers::UserController")).toBe(
      "my/app/controllers/user/controller"
    );
    expect(pathCase("app\\controllers\\user")).toBe("app/controllers/user");
  });

  // Dot notation to path conversion
  it("should convert dot notation to path/case", () => {
    expect(pathCase("com.example.package")).toBe("com/example/package");
    expect(pathCase("org.springframework.boot")).toBe(
      "org/springframework/boot"
    );
    expect(pathCase("java.util.ArrayList")).toBe("java/util/array/list");
  });
});
