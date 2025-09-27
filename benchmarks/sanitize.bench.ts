import { bench, describe } from "vitest";
import { sanitize } from "../src/sanitize.js";

describe("sanitize", () => {
  const plainText = "Hello World, this is plain text";
  const htmlContent = "<div>Hello <b>World</b></div>";
  const scriptContent = "<script>alert('xss')</script>Hello World";
  const complexHtml = `
    <div class="container" onclick="alert(1)">
      <script>evil()</script>
      <p>Some <b>bold</b> and <i>italic</i> text</p>
      <img src="x" onerror="alert(1)" />
      <a href="javascript:void(0)">Link</a>
    </div>
  `;
  const withControlChars = "Hello\x00World\x1F\x7FText";
  const withWhitespace = "Hello   \n\n  World  \t\t  Text  ";

  bench("plain text (no changes needed)", () => {
    sanitize(plainText);
  });

  bench("strip HTML tags", () => {
    sanitize(htmlContent);
  });

  bench("remove script tags", () => {
    sanitize(scriptContent);
  });

  bench("complex HTML sanitization", () => {
    sanitize(complexHtml);
  });

  bench("remove control characters", () => {
    sanitize(withControlChars);
  });

  bench("with allowed tags", () => {
    sanitize(htmlContent, { allowedTags: ["b", "i", "p"] });
  });

  bench("escape HTML instead of strip", () => {
    sanitize(htmlContent, { stripHtml: false, escapeHtml: true });
  });

  bench("normalize whitespace", () => {
    sanitize(withWhitespace, { normalizeWhitespace: true });
  });

  bench("with max length", () => {
    sanitize(plainText, { maxLength: 10 });
  });

  bench("multiple options combined", () => {
    sanitize(complexHtml, {
      allowedTags: ["p", "b", "i"],
      removeNonPrintable: true,
      normalizeWhitespace: true,
      maxLength: 100,
    });
  });

  bench("custom patterns", () => {
    sanitize("Text with @mentions and #hashtags", {
      removePatterns: [/@\w+/g, /#\w+/g],
    });
  });

  bench("worst case - all options", () => {
    sanitize(complexHtml, {
      allowedTags: ["p", "b"],
      allowedAttributes: ["class"],
      removeScripts: true,
      removeNonPrintable: true,
      normalizeWhitespace: true,
      maxLength: 50,
      removePatterns: [/@\w+/g],
    });
  });
});
