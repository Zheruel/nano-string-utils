import { slugify } from "../slugify.js";
import { sanitize, type SanitizeOptions } from "../sanitize.js";
import type {
  Email,
  URL,
  Slug,
  SafeHTML,
  HexColor,
  ValidationResult,
} from "./branded.js";
import { isValidEmail, isValidUrl, isSlug, isValidHexColor } from "./guards.js";

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

/**
 * Sanitizes a string and creates a SafeHTML branded type.
 * Uses opinionated defaults for XSS prevention: strips all HTML,
 * removes scripts, and removes non-printable characters.
 * @param str - The string to sanitize
 * @param options - Optional sanitization options to override defaults
 * @returns SafeHTML branded type
 * @example
 * // Basic usage with safe defaults
 * const safe = toSafeHTML('<script>alert("xss")</script>Hello');
 * // Returns 'Hello' as SafeHTML
 *
 * // Allow specific HTML tags
 * const formatted = toSafeHTML('<b>Bold</b> and <script>bad</script>', {
 *   allowedTags: ['b', 'i', 'em', 'strong']
 * });
 * // Returns '<b>Bold</b> and ' as SafeHTML
 *
 * // Custom sanitization
 * const custom = toSafeHTML(userInput, {
 *   stripHtml: false,
 *   escapeHtml: true
 * });
 */
export function toSafeHTML(str: string, options?: SanitizeOptions): SafeHTML {
  const sanitized = sanitize(str, {
    stripHtml: true,
    removeScripts: true,
    removeNonPrintable: true,
    ...options,
  });
  return sanitized as SafeHTML;
}

/**
 * Creates a SafeHTML branded type without sanitization.
 * Use only when you're certain the input is already safe.
 * WARNING: Bypassing sanitization can lead to XSS vulnerabilities!
 * @param str - The string to cast as SafeHTML
 * @returns SafeHTML branded type without sanitization
 * @example
 * // Only use when you're absolutely certain the input is safe
 * const trustedHtml = unsafeSafeHTML('<p>Server-generated content</p>');
 */
export function unsafeSafeHTML(str: string): SafeHTML {
  return str as SafeHTML;
}

/**
 * Validates and creates a HexColor branded type.
 * Returns null if the string is not a valid hex color.
 * @param str - The string to validate and convert
 * @returns HexColor branded type or null if invalid
 * @example
 * const color = toHexColor('#ff5733');
 * if (color) {
 *   setThemeColor(color); // color is typed as HexColor
 * }
 *
 * // Design system usage
 * const theme = {
 *   primary: toHexColor('#2563eb'),
 *   secondary: toHexColor('#7c3aed'),
 *   accent: toHexColor('#f59e0b')
 * };
 */
export function toHexColor(str: string): ValidationResult<HexColor> {
  return isValidHexColor(str) ? (str as HexColor) : null;
}

/**
 * Creates a HexColor branded type without validation.
 * Use only when you're certain the input is a valid hex color.
 * @param str - The string to cast as HexColor
 * @returns HexColor branded type without validation
 * @example
 * // Only use when you're certain the input is valid
 * const trustedColor = unsafeHexColor('#ffffff');
 */
export function unsafeHexColor(str: string): HexColor {
  return str as HexColor;
}
