import { describe, it, expect } from "vitest";
import { isHexColor } from "../src/isHexColor";

describe("isHexColor", () => {
  // 3-digit hex colors
  it("validates 3-digit hex color", () => {
    expect(isHexColor("#fff")).toBe(true);
  });

  it("validates 3-digit hex color with lowercase", () => {
    expect(isHexColor("#abc")).toBe(true);
  });

  it("validates 3-digit hex color with uppercase", () => {
    expect(isHexColor("#ABC")).toBe(true);
  });

  it("validates 3-digit hex color with mixed case", () => {
    expect(isHexColor("#aBc")).toBe(true);
  });

  // 6-digit hex colors
  it("validates 6-digit hex color", () => {
    expect(isHexColor("#ffffff")).toBe(true);
  });

  it("validates 6-digit hex color with lowercase", () => {
    expect(isHexColor("#ff5733")).toBe(true);
  });

  it("validates 6-digit hex color with uppercase", () => {
    expect(isHexColor("#FF5733")).toBe(true);
  });

  it("validates 6-digit hex color with mixed case", () => {
    expect(isHexColor("#Ff5733")).toBe(true);
  });

  // 4-digit hex colors with alpha
  it("validates 4-digit hex color with alpha", () => {
    expect(isHexColor("#fff8")).toBe(true);
  });

  it("validates 4-digit hex color with alpha lowercase", () => {
    expect(isHexColor("#abcd")).toBe(true);
  });

  it("validates 4-digit hex color with alpha uppercase", () => {
    expect(isHexColor("#ABCD")).toBe(true);
  });

  // 8-digit hex colors with alpha
  it("validates 8-digit hex color with alpha", () => {
    expect(isHexColor("#ffffff80")).toBe(true);
  });

  it("validates 8-digit hex color with alpha lowercase", () => {
    expect(isHexColor("#ff5733aa")).toBe(true);
  });

  it("validates 8-digit hex color with alpha uppercase", () => {
    expect(isHexColor("#FF5733AA")).toBe(true);
  });

  // Invalid cases
  it("rejects hex color without hash", () => {
    expect(isHexColor("ffffff")).toBe(false);
  });

  it("rejects hex color with invalid characters", () => {
    expect(isHexColor("#gggggg")).toBe(false);
  });

  it("rejects hex color with special characters", () => {
    expect(isHexColor("#ff@733")).toBe(false);
  });

  it("rejects hex color with wrong length (2 digits)", () => {
    expect(isHexColor("#ff")).toBe(false);
  });

  it("rejects hex color with wrong length (5 digits)", () => {
    expect(isHexColor("#fffff")).toBe(false);
  });

  it("rejects hex color with wrong length (7 digits)", () => {
    expect(isHexColor("#fffffff")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(isHexColor("")).toBe(false);
  });

  it("rejects string with only hash", () => {
    expect(isHexColor("#")).toBe(false);
  });

  it("rejects string with spaces", () => {
    expect(isHexColor("# fff")).toBe(false);
  });

  it("rejects hex color with trailing characters", () => {
    expect(isHexColor("#fffextra")).toBe(false);
  });

  it("rejects hex color with leading characters", () => {
    expect(isHexColor("extra#fff")).toBe(false);
  });
});
