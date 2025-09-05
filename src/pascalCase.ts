import { words } from "./words.js";

/**
 * Converts a string to PascalCase
 * @param str - The input string to convert
 * @returns A PascalCase string
 * @example
 * pascalCase('hello world') // 'HelloWorld'
 * pascalCase('hello-world') // 'HelloWorld'
 * pascalCase('hello_world') // 'HelloWorld'
 */
export const pascalCase = (str: string): string => {
  const wordList = words(str);

  if (wordList.length === 0) return "";

  // Capitalize first letter of each word
  return wordList
    .map((word) => {
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("");
};
