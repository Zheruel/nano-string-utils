import { words } from "./words.js";
import type { PascalCase } from "./types/string-literals.js";

/**
 * Converts a string to PascalCase
 * @param str - The input string to convert
 * @returns A PascalCase string
 * @example
 * ```ts
 * // Basic usage
 * pascalCase('hello world') // 'HelloWorld'
 * pascalCase('hello-world') // 'HelloWorld'
 * pascalCase('hello_world') // 'HelloWorld'
 * pascalCase('HELLO_WORLD') // 'HelloWorld'
 *
 * // TypeScript template literal types
 * const result = pascalCase('hello-world')
 * // result type: "HelloWorld" (literal type)
 *
 * // React component naming
 * type ComponentName = 'user-profile' | 'nav-bar' | 'side-menu'
 * function getComponentName(name: ComponentName): PascalCase<ComponentName> {
 *   return pascalCase(name) as PascalCase<ComponentName>
 * }
 * const Component = getComponentName('user-profile')
 * // Component type: "UserProfile"
 *
 * // Class name generation
 * const className = pascalCase('base-controller' as const)
 * // className type: "BaseController"
 * class MyClass extends window[className] {} // TypeScript knows it's "BaseController"
 * ```
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
