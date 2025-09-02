import { describe, it, expect } from "vitest";
import { dotCase } from "../src/dotCase";

describe("dotCase", () => {
  // Basic conversions
  it("should convert space-separated words to dot.case", () => {
    expect(dotCase("hello world")).toBe("hello.world");
    expect(dotCase("the quick brown fox")).toBe("the.quick.brown.fox");
  });

  it("should convert camelCase to dot.case", () => {
    expect(dotCase("helloWorld")).toBe("hello.world");
    expect(dotCase("theQuickBrownFox")).toBe("the.quick.brown.fox");
    expect(dotCase("myVariableName")).toBe("my.variable.name");
  });

  it("should convert PascalCase to dot.case", () => {
    expect(dotCase("HelloWorld")).toBe("hello.world");
    expect(dotCase("TheQuickBrownFox")).toBe("the.quick.brown.fox");
    expect(dotCase("MyClassName")).toBe("my.class.name");
  });

  it("should convert kebab-case to dot.case", () => {
    expect(dotCase("hello-world")).toBe("hello.world");
    expect(dotCase("the-quick-brown-fox")).toBe("the.quick.brown.fox");
    expect(dotCase("my-variable-name")).toBe("my.variable.name");
  });

  it("should convert snake_case to dot.case", () => {
    expect(dotCase("hello_world")).toBe("hello.world");
    expect(dotCase("the_quick_brown_fox")).toBe("the.quick.brown.fox");
    expect(dotCase("my_variable_name")).toBe("my.variable.name");
  });

  it("should convert CONSTANT_CASE to dot.case", () => {
    expect(dotCase("HELLO_WORLD")).toBe("hello.world");
    expect(dotCase("THE_QUICK_BROWN_FOX")).toBe("the.quick.brown.fox");
  });

  it("should handle already dot.case strings", () => {
    expect(dotCase("hello.world")).toBe("hello.world");
    expect(dotCase("the.quick.brown.fox")).toBe("the.quick.brown.fox");
  });

  // Mixed formats
  it("should handle mixed formatting", () => {
    expect(dotCase("hello-World_TEST")).toBe("hello.world.test");
    expect(dotCase("XML-Http-Request")).toBe("xml.http.request");
    expect(dotCase("get_XMLHttpRequest")).toBe("get.xml.http.request");
    expect(dotCase("hello.world-TEST")).toBe("hello.world.test");
  });

  // Numbers
  it("should handle strings with numbers", () => {
    expect(dotCase("hello2world")).toBe("hello.2.world");
    expect(dotCase("hello2World")).toBe("hello.2.world");
    expect(dotCase("2hello")).toBe("2.hello");
    expect(dotCase("hello2")).toBe("hello.2");
    expect(dotCase("h3ll0W0rld")).toBe("h.3.ll.0.w.0.rld");
    expect(dotCase("version1.2.3")).toBe("version.1.2.3");
  });

  // Special characters
  it("should handle special characters", () => {
    expect(dotCase("hello@world")).toBe("hello.world");
    expect(dotCase("hello#world")).toBe("hello.world");
    expect(dotCase("hello/world")).toBe("hello.world");
    expect(dotCase("hello\\world")).toBe("hello.world");
    expect(dotCase("hello$world")).toBe("hello.world");
    expect(dotCase("hello%world")).toBe("hello.world");
    expect(dotCase("hello&world")).toBe("hello.world");
    expect(dotCase("hello*world")).toBe("hello.world");
    expect(dotCase("hello(world)")).toBe("hello.world");
    expect(dotCase("hello[world]")).toBe("hello.world");
  });

  // Multiple delimiters
  it("should handle multiple consecutive delimiters", () => {
    expect(dotCase("hello...world")).toBe("hello.world");
    expect(dotCase("hello___world")).toBe("hello.world");
    expect(dotCase("hello---world")).toBe("hello.world");
    expect(dotCase("hello   world")).toBe("hello.world");
    expect(dotCase("..hello..world..")).toBe("hello.world");
    expect(dotCase("__hello__world__")).toBe("hello.world");
    expect(dotCase("--hello--world--")).toBe("hello.world");
  });

  // Edge cases
  it("should handle edge cases", () => {
    expect(dotCase("")).toBe("");
    expect(dotCase(" ")).toBe("");
    expect(dotCase(".")).toBe("");
    expect(dotCase("_")).toBe("");
    expect(dotCase("-")).toBe("");
    expect(dotCase("...")).toBe("");
    expect(dotCase("___")).toBe("");
    expect(dotCase("---")).toBe("");
  });

  it("should handle single words", () => {
    expect(dotCase("hello")).toBe("hello");
    expect(dotCase("HELLO")).toBe("hello");
    expect(dotCase("Hello")).toBe("hello");
    expect(dotCase("h")).toBe("h");
  });

  it("should handle whitespace", () => {
    expect(dotCase("  hello  world  ")).toBe("hello.world");
    expect(dotCase("\thello\tworld\t")).toBe("hello.world");
    expect(dotCase("\nhello\nworld\n")).toBe("hello.world");
    expect(dotCase("  \t\n  hello  \t\n  world  \t\n  ")).toBe("hello.world");
  });

  // Acronyms
  it("should handle acronyms", () => {
    expect(dotCase("XMLHttpRequest")).toBe("xml.http.request");
    expect(dotCase("IOError")).toBe("io.error");
    expect(dotCase("HTTPSConnection")).toBe("https.connection");
    expect(dotCase("URLParser")).toBe("url.parser");
    expect(dotCase("APIKey")).toBe("api.key");
    expect(dotCase("HTMLElement")).toBe("html.element");
  });

  // Unicode and special characters
  it("should handle unicode characters", () => {
    expect(dotCase("café_münchën")).toBe("caf.m.nch.n");
    expect(dotCase("hello€world")).toBe("hello.world");
    expect(dotCase("price$100")).toBe("price.100");
  });

  // Falsy values
  it("should handle falsy values correctly", () => {
    expect(dotCase("")).toBe("");
    // TypeScript will catch null/undefined at compile time, but test runtime behavior
    expect(dotCase(null as any)).toBe(null);
    expect(dotCase(undefined as any)).toBe(undefined);
  });

  // Long strings
  it("should handle long strings", () => {
    const longString =
      "this is a very long string with many words that should be converted to dot case format correctly";
    expect(dotCase(longString)).toBe(
      "this.is.a.very.long.string.with.many.words.that.should.be.converted.to.dot.case.format.correctly"
    );
  });

  // Real-world examples
  it("should handle real-world variable names and paths", () => {
    expect(dotCase("getUserById")).toBe("get.user.by.id");
    expect(dotCase("MAX_RETRY_COUNT")).toBe("max.retry.count");
    expect(dotCase("api-key-value")).toBe("api.key.value");
    expect(dotCase("Content-Type")).toBe("content.type");
    expect(dotCase("x-auth-token")).toBe("x.auth.token");
    expect(dotCase("__private_variable")).toBe("private.variable");
    expect(dotCase("$rootScope")).toBe("root.scope");
    expect(dotCase("_lodash")).toBe("lodash");
    expect(dotCase("com.example.package")).toBe("com.example.package");
    expect(dotCase("org.springframework.boot")).toBe(
      "org.springframework.boot"
    );
  });

  // File paths and namespaces
  it("should handle file paths and namespaces", () => {
    expect(dotCase("src/components/Header")).toBe("src.components.header");
    expect(dotCase("MyApp::Controllers::UserController")).toBe(
      "my.app.controllers.user.controller"
    );
    expect(dotCase("java.util.ArrayList")).toBe("java.util.array.list");
  });
});
