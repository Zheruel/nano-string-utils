import { describe, it, expect } from "vitest";
import { isUrl } from "../src/isUrl";

describe("isUrl", () => {
  it("validates http URL", () => {
    expect(isUrl("http://example.com")).toBe(true);
  });

  it("validates https URL", () => {
    expect(isUrl("https://example.com")).toBe(true);
  });

  it("validates URL with www", () => {
    expect(isUrl("https://www.example.com")).toBe(true);
  });

  it("validates URL with path", () => {
    expect(isUrl("https://example.com/path/to/page")).toBe(true);
  });

  it("validates URL with query parameters", () => {
    expect(isUrl("https://example.com?foo=bar&baz=qux")).toBe(true);
  });

  it("validates URL with hash", () => {
    expect(isUrl("https://example.com#section")).toBe(true);
  });

  it("validates URL with port", () => {
    expect(isUrl("http://example.com:8080")).toBe(true);
  });

  it("validates URL with subdomain", () => {
    expect(isUrl("https://api.example.com")).toBe(true);
  });

  it("validates ftp URL", () => {
    expect(isUrl("ftp://example.com")).toBe(true);
  });

  it("validates URL with authentication", () => {
    expect(isUrl("https://user:pass@example.com")).toBe(true);
  });

  it("rejects URL without protocol", () => {
    expect(isUrl("example.com")).toBe(false);
  });

  it("rejects URL with invalid protocol", () => {
    expect(isUrl("htttp://example.com")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(isUrl("")).toBe(false);
  });

  it("rejects URL with spaces", () => {
    expect(isUrl("https://example .com")).toBe(false);
  });

  it("rejects URL without domain", () => {
    expect(isUrl("https://")).toBe(false);
  });

  it("validates localhost URL", () => {
    expect(isUrl("http://localhost:3000")).toBe(true);
  });

  it("validates IP address URL", () => {
    expect(isUrl("http://192.168.1.1")).toBe(true);
  });

  it("validates complex URL", () => {
    expect(
      isUrl("https://sub.example.com:8080/path/to/page?query=1#hash")
    ).toBe(true);
  });

  it("rejects malformed URL", () => {
    expect(isUrl("https://example..com")).toBe(false);
  });
});
