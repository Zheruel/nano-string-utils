import { graphemes } from "./graphemes";

/**
 * Truncates a string to a specified length and adds ellipsis
 * @param str - The input string to truncate
 * @param length - The maximum length of the output string (including ellipsis)
 * @param suffix - The suffix to append (default: '...')
 * @returns A truncated string with ellipsis
 * @example
 * ```ts
 * // Basic usage
 * truncate('Long text here', 10) // 'Long te...'
 * truncate('Short', 10) // 'Short'
 *
 * // Function overloads for different signatures
 * const text = 'This is a very long string that needs truncation'
 * truncate(text, 20) // Uses default '...' suffix
 * truncate(text, 20, '…') // Custom suffix with single character
 * truncate(text, 25, ' [more]') // Custom suffix with text
 *
 * // Strict null checking in TypeScript
 * const maybeString: string | null = getUserInput()
 * if (maybeString) {
 *   // TypeScript knows maybeString is string here
 *   const truncated = truncate(maybeString, 50)
 * }
 *
 * // Safe handling with nullish coalescing
 * const description = truncate(product.description ?? '', 100)
 *
 * // Type-safe truncation in components
 * interface CardProps {
 *   title: string
 *   body: string | undefined
 * }
 * function Card({ title, body }: CardProps) {
 *   return (
 *     <div>
 *       <h3>{truncate(title, 50)}</h3>
 *       <p>{body ? truncate(body, 200) : 'No description'}</p>
 *     </div>
 *   )
 * }
 *
 * // Emoji-safe truncation (handles complex graphemes)
 * truncate('Hello 👋 World 🌍!', 10) // 'Hello 👋...'
 * truncate('Family 👨‍👩‍👧‍👦 photo', 12) // 'Family 👨‍👩‍👧‍👦...' (ZWJ emoji stays intact)
 * truncate('café résumé', 8) // 'café...' (diacritics preserved)
 * ```
 */
export function truncate(str: string, length: number): string;
export function truncate(str: string, length: number, suffix: string): string;
export function truncate(
  str: string,
  length: number,
  suffix: string = "..."
): string {
  // Handle null/undefined
  if (!str) return str;

  // Fast path for ASCII-only strings (most common case)
  if (!/[^\x00-\x7F]/.test(str)) {
    // Early return for strings that don't need truncation
    if (str.length <= length) return str;

    // Handle edge case where length is too small
    if (length <= suffix.length) return suffix;

    const targetLength = length - suffix.length;
    return str.slice(0, targetLength) + suffix;
  }

  // Proper grapheme handling for Unicode strings
  const chars = graphemes(str);

  // Early return for strings that don't need truncation
  if (chars.length <= length) return str;

  // Handle edge case where length is too small
  if (length <= suffix.length) return suffix;

  const targetLength = length - suffix.length;
  return chars.slice(0, targetLength).join("") + suffix;
}
