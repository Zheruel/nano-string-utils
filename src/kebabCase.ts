import { words } from "./words.js";
import type { KebabCase } from "./types/string-literals.js";

/**
 * Converts a string to kebab-case
 * @param str - The input string to convert
 * @returns A kebab-case string
 * @example
 * ```ts
 * // Basic usage
 * kebabCase('Hello World') // 'hello-world'
 * kebabCase('helloWorld') // 'hello-world'
 * kebabCase('hello_world') // 'hello-world'
 * kebabCase('HelloWorld') // 'hello-world'
 *
 * // TypeScript template literal types
 * const result = kebabCase('helloWorld')
 * // result type: "hello-world" (literal type)
 *
 * // CSS class name generation with type safety
 * type ComponentProps = 'primaryButton' | 'secondaryButton'
 * function getClassName(prop: ComponentProps): KebabCase<ComponentProps> {
 *   return kebabCase(prop) as KebabCase<ComponentProps>
 * }
 * const className = getClassName('primaryButton')
 * // className type: "primary-button"
 *
 * // API endpoint generation
 * const endpoint = kebabCase('getUserProfile' as const)
 * // endpoint type: "get-user-profile"
 * const url = `/api/${endpoint}` // type: "/api/get-user-profile"
 * ```
 */
export function kebabCase<T extends string>(str: T): KebabCase<T>;
export function kebabCase(str: string): string;
export function kebabCase(str: string): string {
  if (!str) return str;

  const wordList = words(str);

  if (wordList.length === 0) return "";

  return wordList.map((word) => word.toLowerCase()).join("-");
}
