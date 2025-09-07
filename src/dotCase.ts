import type { DotCase } from "./types/string-literals.js";

// Pre-compiled regex patterns for better performance
const DOT_ACRONYM = /([A-Z]+)([A-Z][a-z])/g;
const DOT_LOWERCASE_UPPER = /([a-z0-9])([A-Z])/g;
const DOT_LETTER_NUMBER = /([a-zA-Z])([0-9])/g;
const DOT_NUMBER_LETTER = /([0-9])([a-zA-Z])/g;
const DOT_NON_ALNUM = /[^a-z0-9]+/gi;
const DOT_TRIM = /^\.+|\.+$/g;
const DOT_MULTIPLE = /\.+/g;

/**
 * Converts a string to dot.case
 * @param str - The input string to convert
 * @returns A dot.case string
 * @example
 * ```ts
 * // Basic usage
 * dotCase('hello world') // 'hello.world'
 * dotCase('helloWorld') // 'hello.world'
 * dotCase('hello-world') // 'hello.world'
 * dotCase('hello_world') // 'hello.world'
 * dotCase('XMLHttpRequest') // 'xml.http.request'
 *
 * // TypeScript template literal types
 * const result = dotCase('helloWorld')
 * // result type: "hello.world" (literal type)
 *
 * // Object path notation
 * type NestedKey = 'userName' | 'userEmail' | 'userSettings'
 * function getObjectPath(key: NestedKey): DotCase<NestedKey> {
 *   return dotCase(key) as DotCase<NestedKey>
 * }
 * const path = getObjectPath('userName')
 * // path type: "user.name"
 *
 * // Config file keys
 * const configKey = dotCase('databaseHost' as const)
 * // configKey type: "database.host"
 * const value = config[configKey] // TypeScript knows this is config["database.host"]
 * ```
 */
export function dotCase<T extends string>(str: T): DotCase<T>;
export function dotCase(str: string): string;
export function dotCase(str: string): string {
  if (!str) return str;

  return (
    str
      .trim()
      // Handle consecutive uppercase letters (acronyms)
      .replace(DOT_ACRONYM, "$1.$2")
      // Add dot between lowercase/number and uppercase
      .replace(DOT_LOWERCASE_UPPER, "$1.$2")
      // Add dot between letter and number
      .replace(DOT_LETTER_NUMBER, "$1.$2")
      // Add dot between number and letter
      .replace(DOT_NUMBER_LETTER, "$1.$2")
      // Replace non-alphanumeric with dot
      .replace(DOT_NON_ALNUM, ".")
      // Remove leading/trailing dots
      .replace(DOT_TRIM, "")
      // Replace multiple dots with single
      .replace(DOT_MULTIPLE, ".")
      .toLowerCase()
  );
}
