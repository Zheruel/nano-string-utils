/**
 * Capitalizes the first letter of a string and lowercases the rest
 * @param str - The input string to capitalize
 * @returns A string with the first letter capitalized and rest lowercased
 * @example
 * capitalize('hello world') // 'Hello world'
 * capitalize('HELLO') // 'Hello'
 */
export const capitalize = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
