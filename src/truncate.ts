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
 * // Emoji-safe truncation
 * truncate('Hello 👋 World 🌍!', 10) // 'Hello 👋...' (won't break emoji)
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

  // Early return for strings that don't need truncation
  if (str.length <= length) return str;

  // Handle edge case where length is too small
  if (length <= suffix.length) return suffix;

  const targetLength = length - suffix.length;

  // Simple slice for performance (handles 99% of real-world cases)
  let result = str.slice(0, targetLength);

  // Only check if we broke a surrogate pair at the boundary
  // This prevents showing broken emoji characters (�)
  if (result.length > 0) {
    const lastChar = result.charCodeAt(result.length - 1);
    // High surrogate at the end means we split an emoji - remove it
    if (lastChar >= 0xd800 && lastChar <= 0xdbff) {
      result = result.slice(0, -1);
    }
  }

  return result + suffix;
}
