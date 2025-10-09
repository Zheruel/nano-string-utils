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
 * // Unicode and emoji support
 * reverse('Hello 👋') // '👋 olleH'
 * ```
 */
export const reverse = (str: string): string => {
  if (!str) return str;
  return Array.from(str).reverse().join("");
};
