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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str);
};