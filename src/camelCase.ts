import { words } from "./words.js";
import type { CamelCase } from "./types/string-literals.js";

/**
 * Converts a string to camelCase
 * @param str - The input string to convert
 * @returns A camelCase string
 * @example
 * camelCase('hello world') // 'helloWorld'
 * camelCase('hello-world') // 'helloWorld'
 * camelCase('hello_world') // 'helloWorld'
 *
 * // With template literal types
 * const result = camelCase('hello-world'); // type: "helloWorld"
 */
export function camelCase<T extends string>(str: T): CamelCase<T>;
export function camelCase(str: string): string;
export function camelCase(str: string): string {
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
}
