/**
 * Splits a string into words for case conversions
 * Handles camelCase, PascalCase, kebab-case, snake_case, and regular spaces
 * @internal
 */

// Unicode-aware word splitting pattern
// Matches: uppercase followed by lowercase, numbers, consecutive uppercase (acronyms),
// emojis, and any other unicode letters
const WORD_PATTERN =
  /\p{Lu}?\p{Ll}+|[0-9]+|\p{Lu}+(?!\p{Ll})|\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{L}+/gu;

/**
 * Splits a string into an array of words
 * @param str - The input string to split
 * @returns An array of words
 * @internal
 */
export function words(str: string): string[] {
  return Array.from(str.match(WORD_PATTERN) ?? []);
}
