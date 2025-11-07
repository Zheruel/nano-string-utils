/**
 * Validates if a string contains only alphanumeric characters (a-z, A-Z, 0-9).
 *
 * This function performs strict ASCII alphanumeric validation, making it ideal for
 * validating usernames, identifiers, and other inputs that should contain only
 * letters and numbers without special characters or whitespace.
 *
 * @param str - The string to validate (leading/trailing whitespace is automatically trimmed)
 * @returns `true` if the string contains only alphanumeric characters, `false` otherwise
 *
 * @example
 * ```typescript
 * isAlphanumeric('hello123');        // true
 * isAlphanumeric('HelloWorld');      // true
 * isAlphanumeric('test_user');       // false (underscore not allowed)
 * isAlphanumeric('hello world');     // false (whitespace not allowed)
 * isAlphanumeric('hello-world');     // false (hyphen not allowed)
 * isAlphanumeric('café');            // false (Unicode not allowed)
 * isAlphanumeric('');                // false (empty string)
 * isAlphanumeric('  abc  ');         // false (whitespace not allowed)
 * ```
 *
 * @example
 * ```typescript
 * // Validate username
 * const username = 'user123';
 * if (isAlphanumeric(username)) {
 *   console.log('Valid username');
 * }
 *
 * // Validate identifier
 * const id = 'ABC123XYZ';
 * if (isAlphanumeric(id)) {
 *   console.log('Valid identifier');
 * }
 * ```
 */
export const isAlphanumeric = (str: string): boolean => {
  if (!str) return false;
  str = str.trim();
  if (!str) return false;
  return /^[a-zA-Z0-9]+$/.test(str);
};
