import { bench, describe } from "vitest";
import { classifyText } from "../src/classifyText.js";

describe("classifyText", () => {
  const url = "https://github.com/user/repo";
  const email = "user@example.com";
  const question = "What is TypeScript and how does it work?";
  const code =
    "function greet(name: string): string { return `Hello ${name}`; }";
  const json =
    '{"user": {"name": "John", "age": 30, "roles": ["admin", "user"]}}';
  const markdown =
    "# Title\n\nThis is **bold** and [link](https://example.com)";
  const html = '<div class="container"><h1>Title</h1><p>Content here</p></div>';
  const phone = "+1-555-123-4567";
  const numeric = "3.14159 * 2.0 = 6.28318";
  const plainText = "The quick brown fox jumps over the lazy dog.";

  bench("classify URL", () => {
    classifyText(url);
  });

  bench("classify email", () => {
    classifyText(email);
  });

  bench("classify question", () => {
    classifyText(question);
  });

  bench("classify code", () => {
    classifyText(code);
  });

  bench("classify JSON", () => {
    classifyText(json);
  });

  bench("classify markdown", () => {
    classifyText(markdown);
  });

  bench("classify HTML", () => {
    classifyText(html);
  });

  bench("classify phone", () => {
    classifyText(phone);
  });

  bench("classify numeric", () => {
    classifyText(numeric);
  });

  bench("classify plain text", () => {
    classifyText(plainText);
  });

  bench("classify mixed content (worst case)", () => {
    // This tests all patterns without matching any definitively
    classifyText(
      "Some text with a bit of code: var x = 10; and maybe a question?"
    );
  });
});
