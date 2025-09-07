import { words } from "./words.js";
import type { SnakeCase } from "./types/string-literals.js";

/**
 * Converts a string to snake_case
 * @param str - The input string to convert
 * @returns A snake_case string
 * @example
 * snakeCase('Hello World') // 'hello_world'
 * snakeCase('helloWorld') // 'hello_world'
 * snakeCase('hello-world') // 'hello_world'
 *
 * // With template literal types
 * const result = snakeCase('helloWorld'); // type: "hello_world"
 */
export function snakeCase<T extends string>(str: T): SnakeCase<T>;
export function snakeCase(str: string): string;
export function snakeCase(str: string): string {
  if (!str) return str;

  const wordList = words(str);

  if (wordList.length === 0) return "";

  return wordList.map((word) => word.toLowerCase()).join("_");
}
