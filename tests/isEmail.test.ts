import { describe, it, expect } from "vitest";
import { isEmail } from "../src/isEmail";

describe("isEmail", () => {
  it("validates simple email", () => {
    expect(isEmail("test@example.com")).toBe(true);
  });

  it("validates email with subdomain", () => {
    expect(isEmail("user@mail.example.com")).toBe(true);
  });

  it("validates email with numbers", () => {
    expect(isEmail("user123@example123.com")).toBe(true);
  });

  it("validates email with dots in local part", () => {
    expect(isEmail("first.last@example.com")).toBe(true);
  });

  it("validates email with hyphens in domain", () => {
    expect(isEmail("user@example-domain.com")).toBe(true);
  });

  it("validates email with plus sign", () => {
    expect(isEmail("user+tag@example.com")).toBe(true);
  });

  it("rejects email without @", () => {
    expect(isEmail("userexample.com")).toBe(false);
  });

  it("rejects email without domain", () => {
    expect(isEmail("user@")).toBe(false);
  });

  it("rejects email without local part", () => {
    expect(isEmail("@example.com")).toBe(false);
  });

  it("rejects email with spaces", () => {
    expect(isEmail("user @example.com")).toBe(false);
  });

  it("rejects email with double @", () => {
    expect(isEmail("user@@example.com")).toBe(false);
  });

  it("rejects email with invalid characters", () => {
    expect(isEmail("user#$%@example.com")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(isEmail("")).toBe(false);
  });

  it("rejects email without TLD", () => {
    expect(isEmail("user@example")).toBe(false);
  });

  it("rejects email with trailing dot", () => {
    expect(isEmail("user@example.com.")).toBe(false);
  });

  it("validates email with underscores", () => {
    expect(isEmail("user_name@example.com")).toBe(true);
  });

  it("validates long TLDs", () => {
    expect(isEmail("user@example.technology")).toBe(true);
  });

  it("rejects email with consecutive dots", () => {
    expect(isEmail("user..name@example.com")).toBe(false);
  });

  it("trims leading and trailing whitespace", () => {
    expect(isEmail(" test@example.com")).toBe(true);
    expect(isEmail("test@example.com ")).toBe(true);
    expect(isEmail("  user@domain.com  ")).toBe(true);
  });

  // Apostrophe support (default behavior)
  it("validates email with apostrophe in local part", () => {
    expect(isEmail("o'connor@example.com")).toBe(true);
    expect(isEmail("d'angelo@test.co")).toBe(true);
    expect(isEmail("user'name@domain.org")).toBe(true);
  });

  it("validates email with multiple apostrophes", () => {
    expect(isEmail("o'neil'patrick@example.com")).toBe(true);
  });

  // International character support (opt-in)
  it("rejects international characters by default", () => {
    expect(isEmail("josé@example.com")).toBe(false);
    expect(isEmail("müller@domain.de")).toBe(false);
    expect(isEmail("user@éxample.com")).toBe(false);
    expect(isEmail("françois@test.fr")).toBe(false);
  });

  it("validates international characters when allowInternational is true", () => {
    expect(isEmail("josé@example.com", { allowInternational: true })).toBe(
      true
    );
    expect(isEmail("müller@domain.de", { allowInternational: true })).toBe(
      true
    );
    expect(isEmail("user@éxample.com", { allowInternational: true })).toBe(
      true
    );
    expect(isEmail("françois@test.fr", { allowInternational: true })).toBe(
      true
    );
  });

  it("validates international characters in domain", () => {
    expect(isEmail("user@münchen.de", { allowInternational: true })).toBe(true);
    expect(isEmail("test@café.fr", { allowInternational: true })).toBe(true);
  });

  it("still rejects invalid formats with allowInternational", () => {
    expect(isEmail("invalid", { allowInternational: true })).toBe(false);
    expect(isEmail("@example.com", { allowInternational: true })).toBe(false);
    expect(isEmail("user@", { allowInternational: true })).toBe(false);
    expect(
      isEmail("user..name@example.com", { allowInternational: true })
    ).toBe(false);
  });

  it("validates international emails with apostrophes", () => {
    expect(isEmail("o'josé@example.com", { allowInternational: true })).toBe(
      true
    );
    expect(isEmail("d'müller@domain.de", { allowInternational: true })).toBe(
      true
    );
    expect(isEmail("user'françois@test.fr", { allowInternational: true })).toBe(
      true
    );
  });
});
