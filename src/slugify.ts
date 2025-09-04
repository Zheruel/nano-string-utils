// Pre-compiled regex patterns for better performance
const SLUG_NON_WORD = /[^\w\s-]/g;
const SLUG_SPACES = /[\s_-]+/g;
const SLUG_TRIM = /^-+|-+$/g;

/**
 * Converts a string to a URL-safe slug
 * @param str - The input string to slugify
 * @returns A URL-safe slug
 * @example
 * slugify('Hello World!') // 'hello-world'
 * slugify('  Multiple   Spaces  ') // 'multiple-spaces'
 */
export const slugify = (str: string): string =>
  str
    .toLowerCase()
    .trim()
    .replace(SLUG_NON_WORD, "")
    .replace(SLUG_SPACES, "-")
    .replace(SLUG_TRIM, "");
