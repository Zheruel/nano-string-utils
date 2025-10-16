import { graphemes } from "./graphemes";

/**
 * Reverses a string while properly handling Unicode characters including emojis
 * @param str - The input string to reverse
 * @returns A reversed string
 * @example
 * ```ts
 * // Basic usage
 * reverse('hello') // 'olleh'
 * reverse('world') // 'dlrow'
 *
 * // Palindrome checking
 * const isPalindrome = (str: string) => {
 *   const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '')
 *   return cleaned === reverse(cleaned)
 * }
 * isPalindrome('A man a plan a canal Panama') // true
 *
 * // Reverse display for RTL testing
 * reverse('→ Next') // 'txeN ←'
 *
 * // Unicode and emoji support (handles complex graphemes)
 * reverse('Hello 👋') // '👋 olleH'
 * reverse('👨‍👩‍👧‍👦 Family') // 'ylimaF 👨‍👩‍👧‍👦' (family emoji stays intact)
 * reverse('café') // 'éfac' (diacritics preserved)
 * ```
 */
export const reverse = (str: string): string => {
  if (!str) return str;

  // Fast path for ASCII-only strings (most common case)
  if (!/[^\x00-\x7F]/.test(str)) {
    return str.split("").reverse().join("");
  }

  // Proper grapheme handling for Unicode strings
  return graphemes(str).reverse().join("");
};
