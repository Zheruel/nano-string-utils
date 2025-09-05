import { words } from "./words.js";

/**
 * Converts a string to camelCase
 * @param str - The input string to convert
 * @returns A camelCase string
 * @example
 * camelCase('hello world') // 'helloWorld'
 * camelCase('hello-world') // 'helloWorld'
 * camelCase('hello_world') // 'helloWorld'
 */
export const camelCase = (str: string): string => {
  const wordList = words(str);

  if (wordList.length === 0) return "";

  // First word is lowercase, rest are capitalized
  return wordList
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index === 0) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("");
};
