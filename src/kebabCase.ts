import { words } from "./words.js";

/**
 * Converts a string to kebab-case
 * @param str - The input string to convert
 * @returns A kebab-case string
 * @example
 * kebabCase('Hello World') // 'hello-world'
 * kebabCase('helloWorld') // 'hello-world'
 * kebabCase('hello_world') // 'hello-world'
 */
export const kebabCase = (str: string): string => {
  const wordList = words(str);

  if (wordList.length === 0) return "";

  return wordList.map((word) => word.toLowerCase()).join("-");
};
