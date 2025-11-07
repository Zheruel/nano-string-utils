/**
 * Options for email validation
 */
export interface EmailValidationOptions {
  /**
   * Allow international (Unicode) characters in email addresses
   * @default false
   */
  readonly allowInternational?: boolean;
}

// Pre-compiled regex for better performance
const EMAIL_REGEX = /^[a-zA-Z0-9._+'-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const EMAIL_REGEX_INTERNATIONAL =
  /^[\p{L}\p{N}._+'-]+@[\p{L}\p{N}.-]+\.[\p{L}]{2,}$/u;

/**
 * Validates if a string is a valid email format
 * @param str - The input string to validate (leading/trailing whitespace is automatically trimmed)
 * @param options - Optional configuration for validation
 * @returns True if the string is a valid email format, false otherwise
 * @example
 * ```ts
 * // Basic validation
 * isEmail('user@example.com') // true
 * isEmail('invalid.email') // false
 * isEmail('test@domain.co.uk') // true
 *
 * // Apostrophes are supported by default
 * isEmail("o'connor@example.com") // true
 * isEmail("d'angelo@test.co") // true
 *
 * // International characters require opt-in
 * isEmail('josé@example.com') // false
 * isEmail('josé@example.com', { allowInternational: true }) // true
 * isEmail('müller@domain.de', { allowInternational: true }) // true
 *
 * // Using with branded types for type safety
 * import { isValidEmail, toEmail, type Email } from 'nano-string-utils/types'
 *
 * // Type guard approach
 * const userInput: string = getFormInput()
 * if (isValidEmail(userInput)) {
 *   // userInput is now typed as Email
 *   sendWelcomeEmail(userInput) // function expects Email type
 * }
 *
 * // Builder function approach
 * const email = toEmail('admin@company.com')
 * if (email) {
 *   // email is typed as Email | null
 *   updateUserEmail(email) // Safe to use
 * }
 *
 * // Type-safe email storage
 * interface User {
 *   id: string
 *   email: Email // Branded type ensures only valid emails
 * }
 *
 * const createUser = (email: string): User | null => {
 *   const validEmail = toEmail(email)
 *   if (!validEmail) return null
 *   return { id: generateId(), email: validEmail }
 * }
 * ```
 */
export const isEmail = (
  str: string,
  options?: EmailValidationOptions
): boolean => {
  if (!str) return false;
  const trimmed = str.trim();
  if (!trimmed) return false;

  // More strict email validation
  // - No consecutive dots
  // - Limited special characters in local part
  // - No trailing dots

  // Select regex based on international option
  const regex = options?.allowInternational
    ? EMAIL_REGEX_INTERNATIONAL
    : EMAIL_REGEX;

  // Additional checks
  if (!regex.test(trimmed)) return false;
  if (trimmed.includes("..")) return false;
  if (trimmed.endsWith(".")) return false;
  if (trimmed.includes("#") || trimmed.includes("$") || trimmed.includes("%"))
    return false;

  return true;
};
