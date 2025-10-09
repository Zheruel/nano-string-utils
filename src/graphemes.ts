/**
 * Split a string into an array of grapheme clusters (user-perceived characters)
 * Handles emojis, combining characters, and other complex Unicode properly
 * @param str - The string to split
 * @returns Array of grapheme clusters
 * @example
 * ```ts
 * // Basic usage
 * graphemes('hello') // ['h', 'e', 'l', 'l', 'o']
 * graphemes('café') // ['c', 'a', 'f', 'é']
 *
 * // Complex emoji handling (families, skin tones, flags)
 * graphemes('👨‍👩‍👧‍👦🎈') // ['👨‍👩‍👧‍👦', '🎈']
 * graphemes('👍🏽') // ['👍🏽'] (emoji + skin tone = 1 grapheme)
 *
 * // Accurate character counting for limits
 * const tweet = 'Hello 👋 World 🌍'
 * const charCount = graphemes(tweet).length // 13 (not 15)
 * const remaining = 280 - charCount
 *
 * // Text truncation preserving emojis
 * const text = 'React ⚛️ is awesome!'
 * const chars = graphemes(text)
 * const truncated = chars.slice(0, 10).join('') // 'React ⚛️ i'
 *
 * // Reverse text correctly
 * const reversed = graphemes('Hello 👨‍👩‍👧').reverse().join('')
 * // '👨‍👩‍👧 olleH' (family emoji stays intact)
 * ```
 */
export function graphemes(str: string): string[] {
  if (!str) return [];

  // Use Intl.Segmenter for proper grapheme cluster splitting
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(undefined, {
      granularity: "grapheme",
    });
    return Array.from(segmenter.segment(str), (segment) => segment.segment);
  }

  // Simple fallback for environments without Intl.Segmenter
  // This won't handle complex emojis properly but works for basic text
  return Array.from(str);
}
