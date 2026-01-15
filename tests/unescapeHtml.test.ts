import { describe, it, expect } from "vitest";
import { unescapeHtml } from "../src/unescapeHtml";
import { escapeHtml } from "../src/escapeHtml";

describe("unescapeHtml", () => {
  it("decodes less than and greater than", () => {
    expect(unescapeHtml("&lt;div&gt;Hello&lt;/div&gt;")).toBe(
      "<div>Hello</div>"
    );
  });

  it("decodes ampersand", () => {
    expect(unescapeHtml("Hello &amp; World")).toBe("Hello & World");
  });

  it("decodes double quotes", () => {
    expect(unescapeHtml("&quot;quoted&quot;")).toBe('"quoted"');
  });

  it("decodes single quotes (&#39;)", () => {
    expect(unescapeHtml("&#39;apostrophe&#39;")).toBe("'apostrophe'");
  });

  it("decodes single quotes (&apos; - HTML5/XML)", () => {
    expect(unescapeHtml("&apos;apostrophe&apos;")).toBe("'apostrophe'");
  });

  it("decodes both single quote formats", () => {
    expect(unescapeHtml("&#39;and&apos;")).toBe("'and'");
  });

  it("decodes all entities together", () => {
    expect(unescapeHtml("&amp;&lt;&gt;&quot;&#39;")).toBe("&<>\"'");
  });

  it("handles mixed content", () => {
    expect(unescapeHtml("Hello &amp; &lt;World&gt;")).toBe("Hello & <World>");
  });

  it("returns unchanged string when no entities present", () => {
    expect(unescapeHtml("plain text")).toBe("plain text");
    expect(unescapeHtml("hello world")).toBe("hello world");
  });

  it("handles empty string", () => {
    expect(unescapeHtml("")).toBe("");
  });

  it("is the inverse of escapeHtml (roundtrip)", () => {
    const original = '<div class="test">Hello & World</div>';
    expect(unescapeHtml(escapeHtml(original))).toBe(original);
  });

  it("handles multiple occurrences of same entity", () => {
    expect(unescapeHtml("&amp;&amp;&amp;")).toBe("&&&");
    expect(unescapeHtml("&lt;&lt;&lt;")).toBe("<<<");
  });

  it("handles complex HTML content", () => {
    const input =
      '&lt;a href=&quot;/path&quot;&gt;Link &amp; Text&lt;/a&gt;';
    expect(unescapeHtml(input)).toBe('<a href="/path">Link & Text</a>');
  });
});
