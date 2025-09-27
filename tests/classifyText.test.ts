import { describe, expect, it } from "vitest";
import { classifyText } from "../src/classifyText";

describe("classifyText", () => {
  describe("URL classification", () => {
    it("should classify HTTP URLs", () => {
      const result = classifyText("https://example.com");
      expect(result.type).toBe("url");
      expect(result.confidence).toBe(1);
    });

    it("should classify HTTPS URLs with paths", () => {
      const result = classifyText("https://github.com/user/repo");
      expect(result.type).toBe("url");
      expect(result.confidence).toBe(1);
    });

    it("should classify FTP URLs", () => {
      const result = classifyText("ftp://ftp.example.com/file.txt");
      expect(result.type).toBe("url");
      expect(result.confidence).toBe(1);
    });

    it("should classify URLs with query parameters", () => {
      const result = classifyText("http://example.com?foo=bar&baz=qux");
      expect(result.type).toBe("url");
      expect(result.confidence).toBe(1);
    });
  });

  describe("Email classification", () => {
    it("should classify simple emails", () => {
      const result = classifyText("user@example.com");
      expect(result.type).toBe("email");
      expect(result.confidence).toBe(1);
    });

    it("should classify emails with dots", () => {
      const result = classifyText("first.last@company.co.uk");
      expect(result.type).toBe("email");
      expect(result.confidence).toBe(1);
    });

    it("should classify emails with plus addressing", () => {
      const result = classifyText("user+tag@gmail.com");
      expect(result.type).toBe("email");
      expect(result.confidence).toBe(1);
    });
  });

  describe("JSON classification", () => {
    it("should classify valid JSON objects", () => {
      const result = classifyText('{"key": "value", "number": 42}');
      expect(result.type).toBe("json");
      expect(result.confidence).toBe(1);
    });

    it("should classify valid JSON arrays", () => {
      const result = classifyText('[1, 2, 3, "four"]');
      expect(result.type).toBe("json");
      expect(result.confidence).toBe(1);
    });

    it("should classify nested JSON", () => {
      const result = classifyText('{"user": {"name": "John", "age": 30}}');
      expect(result.type).toBe("json");
      expect(result.confidence).toBe(1);
    });

    it("should not classify invalid JSON", () => {
      const result = classifyText("{key: value}");
      expect(result.type).not.toBe("json");
    });
  });

  describe("Phone number classification", () => {
    it("should classify US phone numbers", () => {
      const result = classifyText("+1-555-123-4567");
      expect(result.type).toBe("phone");
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    it("should classify phone numbers with parentheses", () => {
      const result = classifyText("(555) 123-4567");
      expect(result.type).toBe("phone");
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    it("should classify international phone numbers", () => {
      const result = classifyText("+44 20 7123 4567");
      expect(result.type).toBe("phone");
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    it("should classify phone numbers with dots", () => {
      const result = classifyText("555.123.4567");
      expect(result.type).toBe("phone");
      expect(result.confidence).toBeGreaterThan(0.9);
    });
  });

  describe("Question classification", () => {
    it("should classify questions starting with interrogatives", () => {
      const result = classifyText("What is TypeScript?");
      expect(result.type).toBe("question");
      expect(result.confidence).toBe(1);
    });

    it('should classify "how" questions', () => {
      const result = classifyText("How does this work?");
      expect(result.type).toBe("question");
      expect(result.confidence).toBe(1);
    });

    it('should classify "why" questions', () => {
      const result = classifyText("Why is the sky blue?");
      expect(result.type).toBe("question");
      expect(result.confidence).toBe(1);
    });

    it("should classify yes/no questions", () => {
      const result = classifyText("Is this a good idea?");
      expect(result.type).toBe("question");
      expect(result.confidence).toBe(1);
    });

    it("should classify questions ending with ?", () => {
      const result = classifyText("You understand?");
      expect(result.type).toBe("question");
      expect(result.confidence).toBe(0.8);
    });
  });

  describe("HTML classification", () => {
    it("should classify HTML documents", () => {
      const result = classifyText(
        "<!DOCTYPE html><html><head><title>Test</title></head></html>"
      );
      expect(result.type).toBe("html");
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    it("should classify HTML fragments", () => {
      const result = classifyText('<div class="container"><p>Hello</p></div>');
      expect(result.type).toBe("html");
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    it("should classify single HTML tags", () => {
      const result = classifyText('<img src="image.png" alt="description">');
      expect(result.type).toBe("html");
      expect(result.confidence).toBeGreaterThan(0.6);
    });
  });

  describe("Markdown classification", () => {
    it("should classify markdown headers", () => {
      const result = classifyText("# Hello World\n\nThis is a paragraph.");
      expect(result.type).toBe("markdown");
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    it("should classify markdown with bold and italic", () => {
      const result = classifyText("This is **bold** and this is *italic*");
      expect(result.type).toBe("markdown");
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    it("should classify markdown links", () => {
      const result = classifyText(
        "Check out [my website](https://example.com)"
      );
      expect(result.type).toBe("markdown");
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    it("should classify markdown lists", () => {
      const result = classifyText("- Item 1\n- Item 2\n- Item 3");
      expect(result.type).toBe("markdown");
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    it("should classify markdown code blocks", () => {
      const result = classifyText('```javascript\nconsole.log("Hello");\n```');
      expect(result.type).toBe("markdown");
      expect(result.confidence).toBeGreaterThan(0.6);
    });
  });

  describe("Code classification", () => {
    it("should classify JavaScript functions", () => {
      const result = classifyText(
        'function greet(name) { return "Hello " + name; }'
      );
      expect(result.type).toBe("code");
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    it("should classify arrow functions", () => {
      const result = classifyText(
        "const greet = (name) => { return `Hello ${name}`; };"
      );
      expect(result.type).toBe("code");
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    it("should classify variable declarations", () => {
      const result = classifyText("const x = 10; let y = 20; var z = x + y;");
      expect(result.type).toBe("code");
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    it("should classify control flow statements", () => {
      const result = classifyText(
        'if (x > 0) { console.log("positive"); } else { console.log("not positive"); }'
      );
      expect(result.type).toBe("code");
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    it("should classify TypeScript code", () => {
      const result = classifyText(
        "interface User { name: string; age: number; }"
      );
      expect(result.type).toBe("code");
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    it("should classify import statements", () => {
      const result = classifyText('import { useState } from "react";');
      expect(result.type).toBe("code");
      expect(result.confidence).toBeGreaterThan(0.7);
    });
  });

  describe("Numeric classification", () => {
    it("should classify calculations", () => {
      const result = classifyText("42 + 17 = 59");
      expect(result.type).toBe("numeric");
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    it("should classify decimal numbers", () => {
      const result = classifyText("3.14159 * 2.0 = 6.28318");
      expect(result.type).toBe("numeric");
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    it("should classify lists of numbers", () => {
      const result = classifyText("1, 2, 3, 4, 5, 6, 7, 8, 9, 10");
      expect(result.type).toBe("numeric");
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    it("should classify percentages", () => {
      const result = classifyText("75% of 200 = 150");
      expect(result.type).toBe("numeric");
      expect(result.confidence).toBeGreaterThan(0.6);
    });
  });

  describe("Plain text classification", () => {
    it("should classify regular sentences", () => {
      const result = classifyText("This is just a regular sentence.");
      expect(result.type).toBe("text");
      expect(result.confidence).toBe(0.7);
    });

    it("should classify paragraphs", () => {
      const result = classifyText(
        "The quick brown fox jumps over the lazy dog. This pangram contains all letters."
      );
      expect(result.type).toBe("text");
      expect(result.confidence).toBe(0.7);
    });

    it("should classify single words", () => {
      const result = classifyText("Hello");
      expect(result.type).toBe("text");
      expect(result.confidence).toBe(0.7);
    });
  });

  describe("Edge cases", () => {
    it("should handle empty string", () => {
      const result = classifyText("");
      expect(result.type).toBe("text");
      expect(result.confidence).toBe(0.5);
    });

    it("should handle null input", () => {
      const result = classifyText(null as any);
      expect(result.type).toBe("text");
      expect(result.confidence).toBe(0.5);
    });

    it("should handle undefined input", () => {
      const result = classifyText(undefined as any);
      expect(result.type).toBe("text");
      expect(result.confidence).toBe(0.5);
    });

    it("should handle whitespace only", () => {
      const result = classifyText("   \n\t   ");
      expect(result.type).toBe("text");
      expect(result.confidence).toBe(0.5);
    });

    it("should handle strings with leading/trailing whitespace", () => {
      const result = classifyText("  https://example.com  ");
      expect(result.type).toBe("url");
      expect(result.confidence).toBe(1);
    });
  });

  describe("Priority order", () => {
    it("should prioritize URL over question", () => {
      const result = classifyText("https://example.com?query=value");
      expect(result.type).toBe("url");
    });

    it("should prioritize email over text with @", () => {
      const result = classifyText("contact@company.com");
      expect(result.type).toBe("email");
    });

    it("should prioritize JSON over code-like text", () => {
      const result = classifyText('{"function": "test", "value": 123}');
      expect(result.type).toBe("json");
    });
  });
});
