/**
 * Counts the number of words in a string
 * @param str - The input string to count words from
 * @returns The number of words in the string
 * @example
 * wordCount('Hello world') // 2
 * wordCount('  Multiple   spaces  ') // 2
 * wordCount('One-word') // 1
 */
export const wordCount = (str: string): number => {
  const words = str.trim().split(/\s+/);
  return words[0] === "" ? 0 : words.length;
};
