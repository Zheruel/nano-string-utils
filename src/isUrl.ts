/**
 * Validates if a string is a valid URL format
 * @param str - The input string to validate
 * @returns True if the string is a valid URL format, false otherwise
 * @example
 * isUrl('https://example.com') // true
 * isUrl('http://localhost:3000') // true
 * isUrl('not a url') // false
 */
export const isUrl = (str: string): boolean => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};