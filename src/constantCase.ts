import type { ConstantCase } from "./types/string-literals.js";

// Pre-compiled regex patterns for better performance
const CONST_ACRONYM = /([A-Z]+)([A-Z][a-z])/g;
const CONST_LOWERCASE_UPPER = /([a-z0-9])([A-Z])/g;
const CONST_LETTER_NUMBER = /([a-zA-Z])([0-9])/g;
const CONST_NUMBER_LETTER = /([0-9])([a-zA-Z])/g;
const CONST_NON_ALNUM = /[^a-z0-9]+/gi;
const CONST_SPLIT = /\s+/;

/**
 * Converts a string to CONSTANT_CASE
 * @param str - The input string to convert
 * @returns A CONSTANT_CASE string
 * @example
 * constantCase('hello world') // 'HELLO_WORLD'
 * constantCase('helloWorld') // 'HELLO_WORLD'
 * constantCase('hello-world') // 'HELLO_WORLD'
 * constantCase('__hello__world__') // 'HELLO_WORLD'
 *
 * // With template literal types
 * const result = constantCase('helloWorld'); // type: "HELLO_WORLD"
 */
export function constantCase<T extends string>(str: T): ConstantCase<T>;
export function constantCase(str: string): string;
export function constantCase(str: string): string {
  if (!str) return str;

  // Handle camelCase/PascalCase by adding spaces before capitals
  let result = str
    .trim()
    // Handle consecutive uppercase letters (acronyms)
    .replace(CONST_ACRONYM, "$1 $2")
    // Handle lowercase or number followed by uppercase
    .replace(CONST_LOWERCASE_UPPER, "$1 $2")
    // Add space between letter and number
    .replace(CONST_LETTER_NUMBER, "$1 $2")
    // Add space between number and letter
    .replace(CONST_NUMBER_LETTER, "$1 $2")
    // Replace any non-alphanumeric character with space
    .replace(CONST_NON_ALNUM, " ")
    // Trim and split by spaces
    .trim()
    .split(CONST_SPLIT)
    // Filter empty strings
    .filter(Boolean)
    // Convert to uppercase
    .map((word) => word.toUpperCase())
    // Join with underscores
    .join("_");

  return result;
}
