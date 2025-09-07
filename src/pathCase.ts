import type { PathCase } from "./types/string-literals.js";

// Pre-compiled regex patterns for better performance
const PATH_ACRONYM = /([A-Z]+)([A-Z][a-z])/g;
const PATH_LOWERCASE_UPPER = /([a-z0-9])([A-Z])/g;
const PATH_LETTER_NUMBER = /([a-zA-Z])([0-9])/g;
const PATH_NUMBER_LETTER = /([0-9])([a-zA-Z])/g;
const PATH_NON_ALNUM = /[^a-z0-9]+/gi;
const PATH_TRIM = /^\/+|\/+$/g;
const PATH_MULTIPLE = /\/+/g;

/**
 * Converts a string to path/case
 * @param str - The input string to convert
 * @returns A path/case string
 * @example
 * ```ts
 * // Basic usage
 * pathCase('hello world') // 'hello/world'
 * pathCase('helloWorld') // 'hello/world'
 * pathCase('hello-world') // 'hello/world'
 * pathCase('hello_world') // 'hello/world'
 * pathCase('XMLHttpRequest') // 'xml/http/request'
 *
 * // TypeScript template literal types
 * const result = pathCase('helloWorld')
 * // result type: "hello/world" (literal type)
 *
 * // URL path generation
 * type Route = 'userProfile' | 'accountSettings' | 'helpCenter'
 * function getPath(route: Route): PathCase<Route> {
 *   return pathCase(route) as PathCase<Route>
 * }
 * const urlPath = getPath('userProfile')
 * // urlPath type: "user/profile"
 * const fullUrl = `/app/${urlPath}` // "/app/user/profile"
 *
 * // File system paths
 * const filePath = pathCase('MyDocuments' as const)
 * // filePath type: "my/documents"
 * ```
 */
export function pathCase<T extends string>(str: T): PathCase<T>;
export function pathCase(str: string): string;
export function pathCase(str: string): string {
  if (!str) return str;

  return (
    str
      .trim()
      // Handle consecutive uppercase letters (acronyms)
      .replace(PATH_ACRONYM, "$1/$2")
      // Add slash between lowercase/number and uppercase
      .replace(PATH_LOWERCASE_UPPER, "$1/$2")
      // Add slash between letter and number
      .replace(PATH_LETTER_NUMBER, "$1/$2")
      // Add slash between number and letter
      .replace(PATH_NUMBER_LETTER, "$1/$2")
      // Replace non-alphanumeric with slash
      .replace(PATH_NON_ALNUM, "/")
      // Remove leading/trailing slashes
      .replace(PATH_TRIM, "")
      // Replace multiple slashes with single
      .replace(PATH_MULTIPLE, "/")
      .toLowerCase()
  );
}
