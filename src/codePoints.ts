/**
 * Converts a string into an array of Unicode code points for character analysis
 * @param str - The input string
 * @returns An array of Unicode code point numbers
 * @example
 * ```ts
 * // Basic usage
 * codePoints('hello') // [104, 101, 108, 108, 111]
 * codePoints('€') // [8364]
 * codePoints('👍') // [128077]
 *
 * // Character validation and filtering
 * const input = 'Hello123'
 * const points = codePoints(input)
 * const hasNumbers = points.some(p => p >= 48 && p <= 57) // true
 * const hasSpecialChars = points.some(p => p > 127) // false
 *
 * // Emoji detection
 * const text = 'Hello 👋'
 * const points = codePoints(text)
 * const hasEmoji = points.some(p => p > 0x1F000) // true
 *
 * // Character encoding analysis
 * const str = 'café'
 * const points = codePoints(str)
 * // [99, 97, 102, 233] - can determine encoding needs
 *
 * // Security: detect potentially dangerous characters
 * const suspicious = codePoints(userInput).some(p =>
 *   p === 0x200B || // Zero-width space
 *   p === 0xFEFF    // Byte order mark
 * )
 * ```
 */
export function codePoints(str: string): number[] {
  if (!str) return [];

  const points: number[] = [];
  for (const char of str) {
    const point = char.codePointAt(0);
    if (point !== undefined) {
      points.push(point);
    }
  }
  return points;
}
