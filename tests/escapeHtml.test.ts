import { describe, it, expect } from "vitest";
import { escapeHtml } from "../src/escapeHtml";

describe("escapeHtml", () => {
  it("escapes less than and greater than", () => {
    expect(escapeHtml("<div>Hello</div>")).toBe("&lt;div&gt;Hello&lt;/div&gt;");
  });

  it("escapes ampersands", () => {
    expect(escapeHtml("Tom & Jerry")).toBe("Tom &amp; Jerry");
  });

  it("escapes double quotes", () => {
    expect(escapeHtml('He said "Hello"')).toBe("He said &quot;Hello&quot;");
  });

  it("escapes single quotes", () => {
    expect(escapeHtml("It's a test")).toBe("It&#39;s a test");
  });

  it("escapes all special characters together", () => {
    expect(escapeHtml('<p class="test">Tom & Jerry\'s "Adventure"</p>')).toBe(
      "&lt;p class=&quot;test&quot;&gt;Tom &amp; Jerry&#39;s &quot;Adventure&quot;&lt;/p&gt;"
    );
  });

  it("handles empty string", () => {
    expect(escapeHtml("")).toBe("");
  });

  it("preserves normal text", () => {
    expect(escapeHtml("Hello World 123")).toBe("Hello World 123");
  });

  it("handles already escaped entities", () => {
    expect(escapeHtml("&lt;div&gt;")).toBe("&amp;lt;div&amp;gt;");
  });

  it("handles multiple occurrences", () => {
    expect(escapeHtml("<<<>>>")).toBe("&lt;&lt;&lt;&gt;&gt;&gt;");
  });

  it("handles mixed content", () => {
    expect(escapeHtml('Normal text <script>alert("XSS")</script>')).toBe(
      "Normal text &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;"
    );
  });

  it("handles newlines and tabs", () => {
    expect(escapeHtml("<p>\n\tContent\n</p>")).toBe(
      "&lt;p&gt;\n\tContent\n&lt;/p&gt;"
    );
  });

  it("handles unicode characters", () => {
    expect(escapeHtml("<p>Hello 👋</p>")).toBe("&lt;p&gt;Hello 👋&lt;/p&gt;");
  });
});
