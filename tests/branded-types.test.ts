import { describe, test, expectTypeOf } from "vitest";
import {
  toEmail,
  toUrl,
  toSlug,
  toSafeHTML,
  isValidEmail,
  isValidUrl,
  isSlug,
  assertEmail,
  unsafeEmail,
  unsafeUrl,
  unsafeSlug,
  unsafeSafeHTML,
  ensureSlug,
} from "../src/index.js";
import type {
  Email,
  URL,
  Slug,
  SafeHTML,
  Brand,
  ValidationResult,
} from "../src/types/index.js";

describe("Branded Types - Type Level Tests", () => {
  test("Email type is distinct from string", () => {
    const email = toEmail("user@example.com");

    if (email) {
      expectTypeOf(email).toEqualTypeOf<Email>();
      expectTypeOf(email).toMatchTypeOf<string>(); // Email extends string

      // Note: Branded types can be used as strings due to structural typing
      const _plainString: string = email;

      // But can be used where string is expected due to structural compatibility
      const length = email.length;
      expectTypeOf(length).toBeNumber();
    }
  });

  test("URL type is distinct from string", () => {
    const url = toUrl("https://example.com");

    if (url) {
      expectTypeOf(url).toEqualTypeOf<URL>();
      expectTypeOf(url).toMatchTypeOf<string>();

      // Note: Branded types can be used as strings due to structural typing
      const _plainString: string = url;
    }
  });

  test("Slug type is distinct from string", () => {
    const slug = toSlug("Hello World");

    expectTypeOf(slug).toEqualTypeOf<Slug>();
    expectTypeOf(slug).toMatchTypeOf<string>();

    // Note: Branded types can be used as strings due to structural typing
    const _plainString: string = slug;
  });

  test("SafeHTML type is distinct from string", () => {
    const safe = toSafeHTML("<script>alert('xss')</script>Hello");

    expectTypeOf(safe).toEqualTypeOf<SafeHTML>();
    expectTypeOf(safe).toMatchTypeOf<string>();

    // Note: Branded types can be used as strings due to structural typing
    const _plainString: string = safe;
  });

  test("Type guards narrow types correctly", () => {
    const input: string = "test@example.com";

    if (isValidEmail(input)) {
      expectTypeOf(input).toEqualTypeOf<Email>();
    } else {
      expectTypeOf(input).toEqualTypeOf<string>();
    }

    if (isValidUrl(input)) {
      expectTypeOf(input).toEqualTypeOf<URL>();
    }

    if (isSlug(input)) {
      expectTypeOf(input).toEqualTypeOf<Slug>();
    }
  });

  test("Assertion functions assert types correctly", () => {
    const input: string = "test@example.com";

    // Before assertion
    expectTypeOf(input).toEqualTypeOf<string>();

    // This would throw at runtime if invalid, but type system assumes success
    try {
      assertEmail(input);
      // After assertion, TypeScript knows input is Email
      expectTypeOf(input).toEqualTypeOf<Email>();
    } catch {
      // In catch block, type remains string
      expectTypeOf(input).toEqualTypeOf<string>();
    }
  });

  test("Builder functions return correct types", () => {
    const email = toEmail("user@example.com");
    expectTypeOf(email).toEqualTypeOf<Email | null>();

    const url = toUrl("https://example.com");
    expectTypeOf(url).toEqualTypeOf<URL | null>();

    const slug = toSlug("Hello World");
    expectTypeOf(slug).toEqualTypeOf<Slug>(); // Always returns Slug, never null

    const safe = toSafeHTML("<div>content</div>");
    expectTypeOf(safe).toEqualTypeOf<SafeHTML>(); // Always returns SafeHTML, never null
  });

  test("Unsafe functions return branded types directly", () => {
    const email = unsafeEmail("anything");
    expectTypeOf(email).toEqualTypeOf<Email>();

    const url = unsafeUrl("anything");
    expectTypeOf(url).toEqualTypeOf<URL>();

    const slug = unsafeSlug("anything");
    expectTypeOf(slug).toEqualTypeOf<Slug>();

    const html = unsafeSafeHTML("anything");
    expectTypeOf(html).toEqualTypeOf<SafeHTML>();
  });

  test("ensureSlug always returns Slug", () => {
    const slug1 = ensureSlug("already-a-slug");
    expectTypeOf(slug1).toEqualTypeOf<Slug>();

    const slug2 = ensureSlug("Not A Slug");
    expectTypeOf(slug2).toEqualTypeOf<Slug>();
  });

  test("Branded types cannot be assigned to each other", () => {
    const email = unsafeEmail("test@example.com");
    const url = unsafeUrl("https://example.com");
    const slug = unsafeSlug("test-slug");
    const safe = unsafeSafeHTML("<div>content</div>");

    // @ts-expect-error - Email cannot be assigned to URL
    const _urlFromEmail: URL = email;

    // @ts-expect-error - URL cannot be assigned to Email
    const _emailFromUrl: Email = url;

    // @ts-expect-error - Slug cannot be assigned to Email
    const _emailFromSlug: Email = slug;

    // @ts-expect-error - Email cannot be assigned to Slug
    const _slugFromEmail: Slug = email;

    // @ts-expect-error - SafeHTML cannot be assigned to Email
    const _emailFromSafe: Email = safe;

    // @ts-expect-error - Email cannot be assigned to SafeHTML
    const _safeFromEmail: SafeHTML = email;
  });

  test("Brand type utility works correctly", () => {
    type TestBrand = Brand<string, "Test">;
    const testValue = "test" as TestBrand;

    expectTypeOf(testValue).toMatchTypeOf<string>();
    expectTypeOf(testValue).toEqualTypeOf<TestBrand>();

    // Note: Branded types can be used as strings due to structural typing
    const _plain: string = testValue;
  });

  test("ValidationResult type works correctly", () => {
    type TestResult = ValidationResult<Email>;

    const result1: TestResult = null;
    const result2: TestResult = unsafeEmail("test@example.com");

    expectTypeOf(result1).toEqualTypeOf<null>();
    expectTypeOf(result2).toEqualTypeOf<Email>();
  });
});
