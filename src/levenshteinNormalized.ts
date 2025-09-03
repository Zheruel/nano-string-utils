import { levenshtein } from "./levenshtein.js";

/**
 * Calculates the normalized Levenshtein similarity score between two strings.
 * Returns a value between 0 and 1, where 1 indicates identical strings and 0 indicates maximum difference.
 *
 * @param a - First string to compare
 * @param b - Second string to compare
 * @returns A similarity score between 0 and 1, where higher values indicate greater similarity
 *
 * @example
 * ```ts
 * levenshteinNormalized('hello', 'hello') // 1 (identical)
 * levenshteinNormalized('cat', 'bat') // 0.667 (1 edit in 3 chars)
 * levenshteinNormalized('kitten', 'sitting') // 0.571 (3 edits in 7 chars)
 * levenshteinNormalized('', 'abc') // 0 (completely different)
 * levenshteinNormalized('hello', 'world') // 0.2 (4 edits in 5 chars)
 * ```
 */
export function levenshteinNormalized(a: string, b: string): number {
  // Handle empty strings
  if (a.length === 0 && b.length === 0) return 1;
  if (a.length === 0 || b.length === 0) return 0;

  const distance = levenshtein(a, b);
  const maxLength = Math.max(a.length, b.length);

  return 1 - distance / maxLength;
}
