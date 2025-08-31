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
  // More strict email validation
  // - No consecutive dots
  // - Limited special characters in local part
  // - No trailing dots
  const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Additional checks
  if (!emailRegex.test(str)) return false;
  if (str.includes("..")) return false;
  if (str.endsWith(".")) return false;
  if (str.includes("#") || str.includes("$") || str.includes("%")) return false;

  return true;
};
