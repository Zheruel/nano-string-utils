/**
 * Splits a string into words for case conversions
 * Handles camelCase, PascalCase, kebab-case, snake_case, and regular spaces
 * @internal
 */

// Simple, fast regex that works for 99% of cases
// Matches sequences of word characters (letters/numbers)
const WORD_PATTERN = /[a-zA-Z]+[0-9]*|[0-9]+/g;

/**
 * Splits a string into an array of words
 * @param str - The input string to split
 * @returns An array of words
 * @internal
 */
export const words = (str: string): string[] => {
  if (!str) return [];

  // Normalize: add spaces at case boundaries and replace delimiters
  // This is faster than complex regex patterns
  const normalized = str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase -> camel Case
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2") // HTTPResponse -> HTTP Response
    .replace(/[_\-\/\\,.\s]+/g, " "); // Delimiters to spaces

  return normalized.match(WORD_PATTERN) || [];
};
