import {
  BrandedTypeError,
  type Email,
  type URL,
  type Slug,
  type HexColor,
  type NumericString,
  type AlphanumericString,
  type UUID,
  type IntegerString,
} from "./branded.js";
import {
  isValidEmail,
  isValidUrl,
  isSlug,
  isValidHexColor,
  isValidNumeric,
  isValidAlphanumeric,
  isValidUUID,
  isValidInteger,
} from "./guards.js";

/**
 * Asserts that a string is a valid Email, throwing if validation fails.
 * After this assertion, TypeScript knows the value is an Email.
 * @param str - The string to validate
 * @param message - Optional custom error message
 * @throws {BrandedTypeError} If the string is not a valid email
 * @example
 * const input: string = getUserInput();
 * assertEmail(input);
 * // input is now typed as Email
 * sendEmail(input);
 */
export function assertEmail(
  str: string,
  message?: string
): asserts str is Email {
  if (!isValidEmail(str)) {
    throw new BrandedTypeError(message || "Email", str);
  }
}

/**
 * Asserts that a string is a valid URL, throwing if validation fails.
 * After this assertion, TypeScript knows the value is a URL.
 * @param str - The string to validate
 * @param message - Optional custom error message
 * @throws {BrandedTypeError} If the string is not a valid URL
 * @example
 * const input: string = getUserInput();
 * assertUrl(input);
 * // input is now typed as URL
 * fetch(input);
 */
export function assertUrl(str: string, message?: string): asserts str is URL {
  if (!isValidUrl(str)) {
    throw new BrandedTypeError(message || "URL", str);
  }
}

/**
 * Asserts that a string is a valid Slug, throwing if validation fails.
 * After this assertion, TypeScript knows the value is a Slug.
 * @param str - The string to validate
 * @param message - Optional custom error message
 * @throws {BrandedTypeError} If the string is not a valid slug
 * @example
 * const input: string = 'hello-world';
 * assertSlug(input);
 * // input is now typed as Slug
 * createRoute(input);
 */
export function assertSlug(str: string, message?: string): asserts str is Slug {
  if (!isSlug(str)) {
    throw new BrandedTypeError(message || "Slug", str);
  }
}

/**
 * Asserts that a string is a valid HexColor, throwing if validation fails.
 * After this assertion, TypeScript knows the value is a HexColor.
 * @param str - The string to validate
 * @param message - Optional custom error message
 * @throws {BrandedTypeError} If the string is not a valid hex color
 * @example
 * const input: string = getUserInput();
 * assertHexColor(input);
 * // input is now typed as HexColor
 * setThemeColor(input);
 */
export function assertHexColor(
  str: string,
  message?: string
): asserts str is HexColor {
  if (!isValidHexColor(str)) {
    throw new BrandedTypeError(message || "HexColor", str);
  }
}

/**
 * Asserts that a string is a valid NumericString, throwing if validation fails.
 * After this assertion, TypeScript knows the value is a NumericString.
 * @param str - The string to validate
 * @param message - Optional custom error message
 * @throws {BrandedTypeError} If the string is not a valid numeric string
 * @example
 * const input: string = getUserInput();
 * assertNumericString(input);
 * // input is now typed as NumericString
 * processNumber(input);
 */
export function assertNumericString(
  str: string,
  message?: string
): asserts str is NumericString {
  if (!isValidNumeric(str)) {
    throw new BrandedTypeError(message || "NumericString", str);
  }
}

/**
 * Asserts that a string is a valid AlphanumericString, throwing if validation fails.
 * After this assertion, TypeScript knows the value is an AlphanumericString.
 * @param str - The string to validate
 * @param message - Optional custom error message
 * @throws {BrandedTypeError} If the string is not a valid alphanumeric string
 * @example
 * const input: string = getUserInput();
 * assertAlphanumericString(input);
 * // input is now typed as AlphanumericString
 * createUsername(input);
 */
export function assertAlphanumericString(
  str: string,
  message?: string
): asserts str is AlphanumericString {
  if (!isValidAlphanumeric(str)) {
    throw new BrandedTypeError(message || "AlphanumericString", str);
  }
}

/**
 * Asserts that a string is a valid UUID, throwing if validation fails.
 * After this assertion, TypeScript knows the value is a UUID.
 * @param str - The string to validate
 * @param message - Optional custom error message
 * @throws {BrandedTypeError} If the string is not a valid UUID
 * @example
 * const input: string = getUserInput();
 * assertUUID(input);
 * // input is now typed as UUID
 * fetchRecord(input);
 */
export function assertUUID(str: string, message?: string): asserts str is UUID {
  if (!isValidUUID(str)) {
    throw new BrandedTypeError(message || "UUID", str);
  }
}

/**
 * Asserts that a string is a valid IntegerString, throwing if validation fails.
 * After this assertion, TypeScript knows the value is an IntegerString.
 * @param str - The string to validate
 * @param message - Optional custom error message
 * @throws {BrandedTypeError} If the string is not a valid integer string
 * @example
 * const input: string = getUserInput();
 * assertIntegerString(input);
 * // input is now typed as IntegerString
 * processInteger(input);
 */
export function assertIntegerString(
  str: string,
  message?: string
): asserts str is IntegerString {
  if (!isValidInteger(str)) {
    throw new BrandedTypeError(message || "IntegerString", str);
  }
}
