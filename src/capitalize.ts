/**
 * Capitalizes the first letter of a string
 * @param str - The input string to capitalize
 * @returns A string with the first letter capitalized
 * @example
 * capitalize('hello world') // 'Hello world'
 * capitalize('HELLO') // 'HELLO'
 */
export const capitalize = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};