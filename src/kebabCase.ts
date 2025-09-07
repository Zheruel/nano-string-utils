import { words } from "./words.js";
import type { KebabCase } from "./types/string-literals.js";

/**
 * Converts a string to kebab-case
 * @param str - The input string to convert
 * @returns A kebab-case string
 * @example
 * kebabCase('Hello World') // 'hello-world'
 * kebabCase('helloWorld') // 'hello-world'
 * kebabCase('hello_world') // 'hello-world'
 *
 * // With template literal types
 * const result = kebabCase('helloWorld'); // type: "hello-world"
 */
export function kebabCase<T extends string>(str: T): KebabCase<T>;
export function kebabCase(str: string): string;
export function kebabCase(str: string): string {
  const wordList = words(str);

  if (wordList.length === 0) return "";

  return wordList.map((word) => word.toLowerCase()).join("-");
}
