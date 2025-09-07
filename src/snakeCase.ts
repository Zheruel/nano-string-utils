import { words } from "./words.js";
import type { SnakeCase } from "./types/string-literals.js";

/**
 * Converts a string to snake_case
 * @param str - The input string to convert
 * @returns A snake_case string
 * @example
 * ```ts
 * // Basic usage
 * snakeCase('Hello World') // 'hello_world'
 * snakeCase('helloWorld') // 'hello_world'
 * snakeCase('hello-world') // 'hello_world'
 * snakeCase('HelloWorld') // 'hello_world'
 *
 * // TypeScript template literal types
 * const result = snakeCase('helloWorld')
 * // result type: "hello_world" (literal type)
 *
 * // Database column naming with type safety
 * type EntityField = 'firstName' | 'lastName' | 'createdAt'
 * function getColumnName(field: EntityField): SnakeCase<EntityField> {
 *   return snakeCase(field) as SnakeCase<EntityField>
 * }
 * const column = getColumnName('firstName')
 * // column type: "first_name"
 *
 * // Python interop
 * const pythonVar = snakeCase('jsVariable' as const)
 * // pythonVar type: "js_variable"
 * ```
 */
export function snakeCase<T extends string>(str: T): SnakeCase<T>;
export function snakeCase(str: string): string;
export function snakeCase(str: string): string {
  if (!str) return str;

  const wordList = words(str);

  if (wordList.length === 0) return "";

  return wordList.map((word) => word.toLowerCase()).join("_");
}
