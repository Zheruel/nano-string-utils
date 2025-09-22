import { describe, it, expect } from "vitest";
import { extractEntities } from "../src/extractEntities.js";

describe("extractEntities", () => {
  it("should return empty arrays for empty string", () => {
    expect(extractEntities("")).toEqual({
      emails: [],
      urls: [],
      mentions: [],
      hashtags: [],
      phones: [],
      dates: [],
      prices: [],
    });
  });

  it("should extract emails", () => {
    const text = "Contact us at support@example.com or admin@company.org";
    const result = extractEntities(text);
    expect(result.emails).toEqual(["support@example.com", "admin@company.org"]);
  });

  it("should extract URLs", () => {
    const text = "Visit https://example.com and http://docs.example.org/api";
    const result = extractEntities(text);
    expect(result.urls).toEqual([
      "https://example.com",
      "http://docs.example.org/api",
    ]);
  });

  it("should extract mentions", () => {
    const text = "Hey @john_doe and @alice123, check this out!";
    const result = extractEntities(text);
    expect(result.mentions).toEqual(["@john_doe", "@alice123"]);
  });

  it("should extract hashtags", () => {
    const text = "Learning #javascript and #typescript is fun! #100DaysOfCode";
    const result = extractEntities(text);
    expect(result.hashtags).toEqual([
      "#javascript",
      "#typescript",
      "#100DaysOfCode",
    ]);
  });

  it("should extract phone numbers in various formats", () => {
    const text = "Call us at (555) 123-4567, +1-800-555-0100, or 555.123.4567";
    const result = extractEntities(text);
    expect(result.phones).toContain("(555) 123-4567");
    expect(result.phones).toContain("+1-800-555-0100");
    expect(result.phones).toContain("555.123.4567");
  });

  it("should extract dates in common formats", () => {
    const text =
      "Meeting on 2024-01-15, deadline is 12/31/2024, or January 5, 2024";
    const result = extractEntities(text);
    expect(result.dates).toContain("2024-01-15");
    expect(result.dates).toContain("12/31/2024");
    expect(result.dates).toContain("January 5, 2024");
  });

  it("should extract prices in different currencies", () => {
    const text = "Products cost $99.99, €50, £25.50, and $1,234.56";
    const result = extractEntities(text);
    expect(result.prices).toContain("$99.99");
    expect(result.prices).toContain("€50");
    expect(result.prices).toContain("£25.50");
    expect(result.prices).toContain("$1,234.56");
  });

  it("should handle mixed content with all entity types", () => {
    const text = `
      Contact @support at help@company.com or call (555) 123-4567.
      Visit https://example.com for more info.
      #CustomerService available 24/7.
      Invoice dated 2024-01-15 for $299.99.
    `;
    const result = extractEntities(text);

    expect(result.emails).toContain("help@company.com");
    expect(result.urls).toContain("https://example.com");
    expect(result.mentions).toContain("@support");
    expect(result.hashtags).toContain("#CustomerService");
    expect(result.phones).toContain("(555) 123-4567");
    expect(result.dates).toContain("2024-01-15");
    expect(result.prices).toContain("$299.99");
  });

  it("should deduplicate repeated entities", () => {
    const text =
      "Email john@example.com twice: john@example.com and john@example.com";
    const result = extractEntities(text);
    expect(result.emails).toEqual(["john@example.com"]);
    expect(result.emails).toHaveLength(1);
  });

  it("should handle edge cases in phone numbers", () => {
    const text = "Valid: 555-123-4567, Invalid: 123, 1, 123456";
    const result = extractEntities(text);
    expect(result.phones).toContain("555-123-4567");
    expect(result.phones).not.toContain("123");
    expect(result.phones).not.toContain("1");
    expect(result.phones).not.toContain("123456");
  });

  it("should handle international phone formats", () => {
    const text = "+44 20 7123 4567, +33 1 23 45 67 89";
    const result = extractEntities(text);
    expect(result.phones.length).toBeGreaterThan(0);
  });

  it("should extract prices with K/M/B suffixes", () => {
    const text = "Revenue: $1.5M, Budget: $250k, Market cap: $10B";
    const result = extractEntities(text);
    expect(result.prices).toContain("$1.5M");
    expect(result.prices).toContain("$250k");
    expect(result.prices).toContain("$10B");
  });

  it("should handle URLs with query parameters", () => {
    const text = "Search at https://google.com/search?q=test&lang=en";
    const result = extractEntities(text);
    expect(result.urls).toContain("https://google.com/search?q=test&lang=en");
  });

  it("should extract mentions and hashtags at boundaries", () => {
    const text = "@user, (#hashtag) [@mention] {#tag}";
    const result = extractEntities(text);
    expect(result.mentions).toContain("@user");
    expect(result.mentions).toContain("@mention");
    expect(result.hashtags).toContain("#hashtag");
    expect(result.hashtags).toContain("#tag");
  });

  it("should handle email-like patterns in URLs correctly", () => {
    const text =
      "URL: https://example.com/path@segment and email: test@example.com";
    const result = extractEntities(text);
    expect(result.urls).toContain("https://example.com/path@segment");
    expect(result.emails).toContain("test@example.com");
  });

  it("should extract various date formats", () => {
    const text = "Dates: Jan 1, 2024, February 28, 2024, Mar 15, 2024";
    const result = extractEntities(text);
    expect(result.dates).toContain("Jan 1, 2024");
    expect(result.dates).toContain("February 28, 2024");
    expect(result.dates).toContain("Mar 15, 2024");
  });

  it("should handle empty or whitespace-only text", () => {
    expect(extractEntities("   ")).toEqual({
      emails: [],
      urls: [],
      mentions: [],
      hashtags: [],
      phones: [],
      dates: [],
      prices: [],
    });
  });

  it("should extract entities from multiline text", () => {
    const text = `
      Line 1: @user1 #tag1
      Line 2: test@email.com
      Line 3: https://example.com
      Line 4: $99.99
    `;
    const result = extractEntities(text);
    expect(result.mentions).toContain("@user1");
    expect(result.hashtags).toContain("#tag1");
    expect(result.emails).toContain("test@email.com");
    expect(result.urls).toContain("https://example.com");
    expect(result.prices).toContain("$99.99");
  });
});
