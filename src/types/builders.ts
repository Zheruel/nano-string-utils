import { slugify } from "../slugify.js";
import type { Email, URL, Slug, ValidationResult } from "./branded.js";
import { isValidEmail, isValidUrl, isSlug } from "./guards.js";

/**
 * Validates and creates an Email branded type.
 * Returns null if the string is not a valid email.
 * @param str - The string to validate and convert
 * @returns Email branded type or null if invalid
 * @example
 * const email = toEmail('user@example.com');
 * if (email) {
 *   sendEmail(email); // email is typed as Email
 * }
 */
export function toEmail(str: string): ValidationResult<Email> {
  return isValidEmail(str) ? (str as Email) : null;
}

/**
 * Validates and creates a URL branded type.
 * Returns null if the string is not a valid URL.
 * @param str - The string to validate and convert
 * @returns URL branded type or null if invalid
 * @example
 * const url = toUrl('https://example.com');
 * if (url) {
 *   fetch(url); // url is typed as URL
 * }
 */
export function toUrl(str: string): ValidationResult<URL> {
  return isValidUrl(str) ? (str as URL) : null;
}

/**
 * Transforms a string into a Slug branded type.
 * Always succeeds by transforming the input using slugify.
 * @param str - The string to transform into a slug
 * @returns Slug branded type
 * @example
 * const slug = toSlug('Hello World!'); // 'hello-world' as Slug
 * createRoute(slug);
 */
export function toSlug(str: string): Slug {
  const slugified = slugify(str);
  return slugified as Slug;
}

/**
 * Creates an Email branded type without validation.
 * Use only when you're certain the input is valid.
 * @param str - The string to cast as Email
 * @returns Email branded type without validation
 * @example
 * // Only use when you're certain the input is valid
 * const trustedEmail = unsafeEmail('admin@system.local');
 */
export function unsafeEmail(str: string): Email {
  return str as Email;
}

/**
 * Creates a URL branded type without validation.
 * Use only when you're certain the input is valid.
 * @param str - The string to cast as URL
 * @returns URL branded type without validation
 * @example
 * // Only use when you're certain the input is valid
 * const trustedUrl = unsafeUrl('https://internal.api/endpoint');
 */
export function unsafeUrl(str: string): URL {
  return str as URL;
}

/**
 * Creates a Slug branded type without validation or transformation.
 * Use only when you're certain the input is already a valid slug.
 * @param str - The string to cast as Slug
 * @returns Slug branded type without validation
 * @example
 * // Only use when you're certain the input is valid
 * const trustedSlug = unsafeSlug('already-slugified');
 */
export function unsafeSlug(str: string): Slug {
  return str as Slug;
}

/**
 * Checks if a string is already slugified and returns it as a Slug,
 * otherwise transforms it using slugify.
 * @param str - The string to check or transform
 * @returns Slug branded type
 * @example
 * const slug1 = ensureSlug('hello-world'); // Already a slug, returns as-is
 * const slug2 = ensureSlug('Hello World!'); // Transforms to 'hello-world'
 */
export function ensureSlug(str: string): Slug {
  return isSlug(str) ? (str as Slug) : toSlug(str);
}
