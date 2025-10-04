import { words } from "./words.js";
import type { CamelCase } from "./types/string-literals.js";

/**
 * Converts a string to camelCase
 * @param str - The input string to convert
 * @returns A camelCase string
 * @example
 * ```ts
 * // Basic usage
 * camelCase('hello world') // 'helloWorld'
 * camelCase('hello-world') // 'helloWorld'
 * camelCase('hello_world') // 'helloWorld'
 * camelCase('HELLO_WORLD') // 'helloWorld'
 *
 * // TypeScript template literal types
 * const result = camelCase('hello-world')
 * // result type: "helloWorld" (literal type)
 *
 * // Type inference with const assertions
 * const input = 'user-profile' as const
 * const output = camelCase(input)
 * // output type: "userProfile" (literal type preserved)
 *
 * // Works with function parameters
 * function processField<T extends string>(field: T): CamelCase<T> {
 *   return camelCase(field) as CamelCase<T>
 * }
 * const fieldName = processField('first-name')
 * // fieldName type: "firstName"
 * ```
 */
export function camelCase<T extends string>(str: T): CamelCase<T>;
export function camelCase(str: string): string;
export function camelCase(str: string): string {
  if (!str) return str;
  const wordList = words(str);
  return wordList
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
}
