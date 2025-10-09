/**
 * Capitalizes the first letter of a string and lowercases the rest
 * @param str - The input string to capitalize
 * @returns A string with the first letter capitalized and rest lowercased
 * @example
 * ```ts
 * // Basic usage
 * capitalize('hello world') // 'Hello world'
 * capitalize('HELLO') // 'Hello'
 *
 * // Form labels and UI text
 * const label = capitalize('email address') // 'Email address'
 * const field = capitalize('firstName') // 'Firstname'
 *
 * // Sentence starting in text editors
 * const sentence = capitalize('the quick brown fox...') // 'The quick brown fox...'
 *
 * // CSV header normalization
 * const headers = ['NAME', 'EMAIL', 'PHONE'].map(capitalize)
 * // ['Name', 'Email', 'Phone']
 * ```
 */
export const capitalize = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
