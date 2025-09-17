import { describe, it, expect } from "vitest";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CLI_PATH = join(__dirname, "..", "bin", "nano-string.js");

function runCLI(args: string): string {
  try {
    return execSync(`node ${CLI_PATH} ${args}`, { encoding: "utf8" }).trim();
  } catch (error: any) {
    return error.stdout ? error.stdout.trim() : error.message;
  }
}

describe("CLI", () => {
  describe("Help System", () => {
    it("should show help when no arguments provided", () => {
      const output = runCLI("");
      expect(output).toContain("Usage: nano-string <function>");
      expect(output).toContain("Available functions:");
    });

    it("should show help with --help flag", () => {
      const output = runCLI("--help");
      expect(output).toContain("Case Conversions:");
      expect(output).toContain("String Manipulation:");
    });

    it("should show function-specific help", () => {
      const output = runCLI("slugify --help");
      expect(output).toContain("Convert to URL-safe slug");
      expect(output).toContain("Example:");
    });
  });

  describe("Case Conversion Functions", () => {
    it("should convert to slug", () => {
      expect(runCLI('slugify "Hello World!"')).toBe("hello-world");
    });

    it("should convert to camelCase", () => {
      expect(runCLI('camelCase "hello world"')).toBe("helloWorld");
    });

    it("should convert to snake_case", () => {
      expect(runCLI('snakeCase "hello world"')).toBe("hello_world");
    });

    it("should convert to kebab-case", () => {
      expect(runCLI('kebabCase "hello world"')).toBe("hello-world");
    });

    it("should convert to PascalCase", () => {
      expect(runCLI('pascalCase "hello world"')).toBe("HelloWorld");
    });

    it("should convert to CONSTANT_CASE", () => {
      expect(runCLI('constantCase "hello world"')).toBe("HELLO_WORLD");
    });
  });

  describe("String Manipulation", () => {
    it("should capitalize string", () => {
      expect(runCLI('capitalize "hello"')).toBe("Hello");
    });

    it("should reverse string", () => {
      expect(runCLI('reverse "hello"')).toBe("olleh");
    });

    it("should truncate string with default length", () => {
      const output = runCLI(
        'truncate "This is a very long text that needs to be truncated to test default"'
      );
      expect(output).toContain("...");
      expect(output.length).toBeLessThanOrEqual(50);
    });

    it("should truncate string with custom length", () => {
      const output = runCLI('truncate "This is a very long text" --length 10');
      expect(output).toBe("This is...");
    });

    it("should truncate with custom suffix", () => {
      const output = runCLI(
        'truncate "This is a very long text" --length 10 --suffix "…"'
      );
      expect(output).toBe("This is a…");
    });
  });

  describe("Validation Functions", () => {
    it("should validate email", () => {
      expect(runCLI('isEmail "test@example.com"')).toBe("true");
      expect(runCLI('isEmail "invalid-email"')).toBe("false");
    });

    it("should validate URL", () => {
      expect(runCLI('isUrl "https://example.com"')).toBe("true");
      expect(runCLI('isUrl "not-a-url"')).toBe("false");
    });

    it("should check ASCII", () => {
      expect(runCLI('isASCII "hello"')).toBe("true");
      expect(runCLI('isASCII "héllo"')).toBe("false");
    });
  });

  describe("Text Processing", () => {
    it("should strip HTML", () => {
      expect(runCLI('stripHtml "<p>Hello</p>"')).toBe("Hello");
    });

    it("should escape HTML", () => {
      expect(runCLI('escapeHtml "<div>"')).toBe("&lt;div&gt;");
    });

    it("should deburr text", () => {
      expect(runCLI('deburr "héllö"')).toBe("hello");
    });

    it("should normalize whitespace", () => {
      expect(runCLI('normalizeWhitespace "hello    world"')).toBe(
        "hello world"
      );
    });
  });

  describe("Analysis Functions", () => {
    it("should count words", () => {
      expect(runCLI('wordCount "hello world test"')).toBe("3");
    });

    it("should calculate levenshtein distance", () => {
      expect(runCLI('levenshtein "kitten" "sitting"')).toBe("3");
    });

    it("should show diff", () => {
      const output = runCLI('diff "hello" "hallo"');
      expect(output).toContain("e");
      expect(output).toContain("a");
    });
  });

  describe("Template Functions", () => {
    it("should interpolate template", () => {
      const output = runCLI(
        'template "Hello {{name}}" --data \'{"name":"World"}\''
      );
      expect(output).toBe("Hello World");
    });

    it("should handle nested data in template", () => {
      const output = runCLI(
        'template "{{user.name}} from {{user.city}}" --data \'{"user":{"name":"Alice","city":"NYC"}}\''
      );
      expect(output).toBe("Alice from NYC");
    });
  });

  describe("Pipe Support", () => {
    it("should accept input from pipe", () => {
      const output = execSync(
        'echo "hello world" | node ' + CLI_PATH + " kebabCase",
        { encoding: "utf8" }
      ).trim();
      expect(output).toBe("hello-world");
    });

    it("should handle multiline pipe input", () => {
      const output = execSync(
        'echo "hello\\nworld" | node ' + CLI_PATH + " wordCount",
        { encoding: "utf8" }
      ).trim();
      expect(output).toBe("2");
    });
  });

  describe("Error Handling", () => {
    it("should error on unknown function", () => {
      const output = runCLI('unknownFunction "test"');
      expect(output).toContain("Unknown function");
    });

    it("should error when required input is missing", () => {
      const output = runCLI("slugify");
      expect(output).toContain("No input provided");
    });

    it("should error when template data is missing", () => {
      const output = runCLI('template "Hello {{name}}"');
      expect(output).toContain("template functions require --data");
    });

    it("should error when two strings required but only one provided", () => {
      const output = runCLI('levenshtein "hello"');
      expect(output).toContain("requires two string arguments");
    });
  });

  describe("Complex Options", () => {
    it("should handle pad with custom character", () => {
      const output = runCLI('padStart "hi" --length 5 --char "*"');
      expect(output).toBe("***hi");
    });

    it("should handle highlight with query", () => {
      const output = runCLI('highlight "hello world" --query "world"');
      expect(output).toContain("world");
    });

    it("should generate random string with custom length", () => {
      const output = runCLI("randomString --length 10");
      expect(output).toHaveLength(10);
    });
  });

  describe("Unicode Support", () => {
    it("should split graphemes", () => {
      const output = runCLI('graphemes "👨‍👩‍👧‍👦"');
      expect(output).toContain("👨‍👩‍👧‍👦");
    });

    it("should get code points", () => {
      const output = runCLI('codePoints "hello"');
      expect(output).toContain("104"); // 'h'
      expect(output).toContain("101"); // 'e'
    });
  });

  describe("Pluralization", () => {
    it("should pluralize words", () => {
      expect(runCLI('pluralize "cat"')).toBe("cats");
      expect(runCLI('pluralize "box"')).toBe("boxes");
    });

    it("should singularize words", () => {
      expect(runCLI('singularize "cats"')).toBe("cat");
      expect(runCLI('singularize "boxes"')).toBe("box");
    });
  });
});
