// Pre-compiled regex for better performance
const EMAIL_REGEX = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Validates if a string is a valid email format
 * @param str - The input string to validate
 * @returns True if the string is a valid email format, false otherwise
 * @example
 * ```ts
 * // Basic validation
 * isEmail('user@example.com') // true
 * isEmail('invalid.email') // false
 * isEmail('test@domain.co.uk') // true
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
export const isEmail = (str: string): boolean => {
  if (!str) return false;

  // More strict email validation
  // - No consecutive dots
  // - Limited special characters in local part
  // - No trailing dots

  // Additional checks
  if (!EMAIL_REGEX.test(str)) return false;
  if (str.includes("..")) return false;
  if (str.endsWith(".")) return false;
  if (str.includes("#") || str.includes("$") || str.includes("%")) return false;

  return true;
};
