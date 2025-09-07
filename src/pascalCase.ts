import { words } from "./words.js";
import type { PascalCase } from "./types/string-literals.js";

/**
 * Converts a string to PascalCase
 * @param str - The input string to convert
 * @returns A PascalCase string
 * @example
 * pascalCase('hello world') // 'HelloWorld'
 * pascalCase('hello-world') // 'HelloWorld'
 * pascalCase('hello_world') // 'HelloWorld'
 *
 * // With template literal types
 * const result = pascalCase('hello-world'); // type: "HelloWorld"
 */
export function pascalCase<T extends string>(str: T): PascalCase<T>;
export function pascalCase(str: string): string;
export function pascalCase(str: string): string {
  if (!str) return str;

  const wordList = words(str);

  if (wordList.length === 0) return "";

  // Capitalize first letter of each word
  return wordList
    .map((word) => {
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("");
}
