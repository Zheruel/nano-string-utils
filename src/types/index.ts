/**
 * Branded types module for type-safe string validation.
 * Provides compile-time guarantees for validated strings.
 *
 * @module branded
 * @example
 * import { branded } from 'nano-string-utils';
 *
 * // Type guards
 * if (branded.isValidEmail(input)) {
 *   // input is now typed as Email
 * }
 *
 * // Builders
 * const email = branded.toEmail('user@example.com');
 * const url = branded.toUrl('https://example.com');
 * const slug = branded.toSlug('Hello World');
 *
 * // Assertions
 * branded.assertEmail(input);
 * // input is now typed as Email
 */

// Re-export types
export type { Brand, Email, URL, Slug, ValidationResult } from "./branded.js";
export { BrandedTypeError } from "./branded.js";

// Re-export type guards
export { isValidEmail, isValidUrl, isSlug } from "./guards.js";

// Re-export assertions
export { assertEmail, assertUrl, assertSlug } from "./assertions.js";

// Re-export builders
export {
  toEmail,
  toUrl,
  toSlug,
  unsafeEmail,
  unsafeUrl,
  unsafeSlug,
  ensureSlug,
} from "./builders.js";
