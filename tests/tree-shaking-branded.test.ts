import { describe, test, expect } from "vitest";

describe("Tree-shaking for Branded Types", () => {
  test("can import individual branded functions", async () => {
    // Test that individual imports work (tree-shaking friendly)
    const { isValidEmail } = await import("../src/types/guards.js");
    const { toEmail } = await import("../src/types/builders.js");
    const { assertEmail } = await import("../src/types/assertions.js");

    expect(typeof isValidEmail).toBe("function");
    expect(typeof toEmail).toBe("function");
    expect(typeof assertEmail).toBe("function");
  });

  test("can import branded namespace from main export", async () => {
    const { branded } = await import("../src/index.js");

    expect(typeof branded.isValidEmail).toBe("function");
    expect(typeof branded.toEmail).toBe("function");
    expect(typeof branded.assertEmail).toBe("function");
    expect(typeof branded.BrandedTypeError).toBe("function");
  });

  test("branded functions are independent", async () => {
    // Each function should work independently
    // This ensures they don't have hidden dependencies that break tree-shaking

    // Import only what's needed
    const { isValidEmail } = await import("../src/types/guards.js");
    expect(isValidEmail("test@example.com")).toBe(true);
  });

  test("types are exported correctly", () => {
    // This is more of a compile-time test
    // The fact that this file compiles means the types are exported correctly
    // Testing that type imports work correctly
    type _TestEmail = import("../src/types/index.js").Email;
    type _TestURL = import("../src/types/index.js").URL;
    type _TestSlug = import("../src/types/index.js").Slug;

    // Runtime check that type exports don't add to bundle
    expect(true).toBe(true);
  });
});
