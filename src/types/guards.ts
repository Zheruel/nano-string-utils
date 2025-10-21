import { isEmail } from "../isEmail.js";
import { isUrl } from "../isUrl.js";
import { isHexColor } from "../isHexColor.js";
import { isNumeric } from "../isNumeric.js";
import { isAlphanumeric } from "../isAlphanumeric.js";
import { isUUID } from "../isUUID.js";
import type {
  Email,
  URL,
  Slug,
  HexColor,
  NumericString,
  AlphanumericString,
  UUID,
} from "./branded.js";

// Pre-compiled regex for slug validation
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Type guard that checks if a string is a valid Email.
 * Uses the existing isEmail validator internally.
 * @param str - The string to validate
 * @returns True if the string is a valid Email, allowing type narrowing
 * @example
 * const input: string = getUserInput();
 * if (isValidEmail(input)) {
 *   // input is now typed as Email
 *   sendEmail(input);
 * }
 */
export function isValidEmail(str: string): str is Email {
  return isEmail(str);
}

/**
 * Type guard that checks if a string is a valid URL.
 * Uses the existing isUrl validator internally.
 * @param str - The string to validate
 * @returns True if the string is a valid URL, allowing type narrowing
 * @example
 * const input: string = getUserInput();
 * if (isValidUrl(input)) {
 *   // input is now typed as URL
 *   fetch(input);
 * }
 */
export function isValidUrl(str: string): str is URL {
  return isUrl(str);
}

/**
 * Type guard that checks if a string is already a valid slug.
 * A valid slug contains only lowercase letters, numbers, and hyphens.
 * @param str - The string to validate
 * @returns True if the string is a valid Slug, allowing type narrowing
 * @example
 * const input: string = 'hello-world';
 * if (isSlug(input)) {
 *   // input is now typed as Slug
 *   createRoute(input);
 * }
 */
export function isSlug(str: string): str is Slug {
  return SLUG_REGEX.test(str);
}

/**
 * Type guard that checks if a string is a valid hexadecimal color code.
 * Uses the existing isHexColor validator internally.
 * @param str - The string to validate
 * @returns True if the string is a valid HexColor, allowing type narrowing
 * @example
 * const input: string = getUserInput();
 * if (isValidHexColor(input)) {
 *   // input is now typed as HexColor
 *   setThemeColor(input);
 * }
 */
export function isValidHexColor(str: string): str is HexColor {
  return isHexColor(str);
}

/**
 * Type guard that checks if a string is a valid numeric string.
 * Uses the existing isNumeric validator internally.
 * @param str - The string to validate
 * @returns True if the string is a valid NumericString, allowing type narrowing
 * @example
 * const input: string = getUserInput();
 * if (isValidNumeric(input)) {
 *   // input is now typed as NumericString
 *   processNumericValue(input);
 * }
 */
export function isValidNumeric(str: string): str is NumericString {
  return isNumeric(str);
}

/**
 * Type guard that checks if a string is a valid alphanumeric string.
 * Uses the existing isAlphanumeric validator internally.
 * @param str - The string to validate
 * @returns True if the string is a valid AlphanumericString, allowing type narrowing
 * @example
 * const input: string = getUserInput();
 * if (isValidAlphanumeric(input)) {
 *   // input is now typed as AlphanumericString
 *   createUsername(input);
 * }
 */
export function isValidAlphanumeric(str: string): str is AlphanumericString {
  return isAlphanumeric(str);
}

/**
 * Type guard that checks if a string is a valid UUID.
 * Uses the existing isUUID validator internally.
 * @param str - The string to validate
 * @returns True if the string is a valid UUID, allowing type narrowing
 * @example
 * const input: string = getUserInput();
 * if (isValidUUID(input)) {
 *   // input is now typed as UUID
 *   fetchRecord(input);
 * }
 */
export function isValidUUID(str: string): str is UUID {
  return isUUID(str);
}
