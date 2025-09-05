import { words } from "./words.js";

/**
 * Converts a string to snake_case
 * @param str - The input string to convert
 * @returns A snake_case string
 * @example
 * snakeCase('Hello World') // 'hello_world'
 * snakeCase('helloWorld') // 'hello_world'
 * snakeCase('hello-world') // 'hello_world'
 */
export const snakeCase = (str: string): string => {
  const wordList = words(str);

  if (wordList.length === 0) return "";

  return wordList.map((word) => word.toLowerCase()).join("_");
};
