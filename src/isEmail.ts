// Pre-compiled regex for better performance
const EMAIL_REGEX = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Validates if a string is a valid email format
 * @param str - The input string to validate
 * @returns True if the string is a valid email format, false otherwise
 * @example
 * isEmail('user@example.com') // true
 * isEmail('invalid.email') // false
 * isEmail('test@domain.co.uk') // true
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
