/**
 * Split a string into an array of grapheme clusters
 * Handles emojis, combining characters, and other complex Unicode properly
 * @param str - The string to split
 * @returns Array of grapheme clusters
 * @example
 * graphemes('👨‍👩‍👧‍👦🎈') // ['👨‍👩‍👧‍👦', '🎈']
 * graphemes('café') // ['c', 'a', 'f', 'é']
 * graphemes('hello') // ['h', 'e', 'l', 'l', 'o']
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
