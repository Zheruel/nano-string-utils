/**
 * Core branded type system for compile-time type safety.
 * Branded types provide nominal typing in TypeScript's structural type system.
 */

/**
 * Generic brand type that creates a nominal type by intersecting
 * with a unique brand property that only exists at the type level.
 */
export type Brand<K, T> = K & { __brand: T };

/**
 * Email branded type - represents a validated email address string.
 * Use with type guards and builder functions for type safety.
 * @example
 * const email: Email = toEmail('user@example.com')!;
 */
export type Email = Brand<string, "Email">;

/**
 * URL branded type - represents a validated URL string.
 * Use with type guards and builder functions for type safety.
 * @example
 * const url: URL = toUrl('https://example.com')!;
 */
export type URL = Brand<string, "URL">;

/**
 * Slug branded type - represents a URL-safe slug string.
 * Use with type guards and builder functions for type safety.
 * @example
 * const slug: Slug = toSlug('Hello World'); // 'hello-world'
 */
export type Slug = Brand<string, "Slug">;

/**
 * SafeHTML branded type - represents sanitized HTML safe for rendering.
 * Guarantees XSS prevention through sanitization.
 * Use with builder functions for type safety.
 * @example
 * const safe: SafeHTML = toSafeHTML('<script>alert("xss")</script>Hello'); // 'Hello'
 */
export type SafeHTML = Brand<string, "SafeHTML">;

/**
 * HexColor branded type - represents a validated hexadecimal color code.
 * Use with type guards and builder functions for type safety.
 * @example
 * const color: HexColor = toHexColor('#ff5733')!;
 */
export type HexColor = Brand<string, "HexColor">;

/**
 * NumericString branded type - represents a validated numeric string.
 * Use with type guards and builder functions for type safety.
 * @example
 * const num: NumericString = toNumericString('42')!;
 */
export type NumericString = Brand<string, "NumericString">;

/**
 * AlphanumericString branded type - represents a validated alphanumeric string.
 * Use with type guards and builder functions for type safety.
 * @example
 * const username: AlphanumericString = toAlphanumericString('user123')!;
 */
export type AlphanumericString = Brand<string, "AlphanumericString">;

/**
 * UUID branded type - represents a validated UUID string.
 * Use with type guards and builder functions for type safety.
 * @example
 * const id: UUID = toUUID('550e8400-e29b-41d4-a716-446655440000')!;
 */
export type UUID = Brand<string, "UUID">;

/**
 * IntegerString branded type - represents a validated integer string (whole number without decimals).
 * Use with type guards and builder functions for type safety.
 * @example
 * const age: IntegerString = toIntegerString('42')!;
 * const quantity: IntegerString = toIntegerString('10')!;
 */
export type IntegerString = Brand<string, "IntegerString">;

/**
 * Type guard result type for better type inference
 */
export type ValidationResult<T> = T | null;

/**
 * Assertion error for branded type validation failures
 */
export class BrandedTypeError extends Error {
  constructor(type: string, value: string) {
    super(`Invalid ${type}: "${value}"`);
    this.name = "BrandedTypeError";
  }
}
