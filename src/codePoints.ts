/**
 * Converts a string into an array of Unicode code points
 * @param str - The input string
 * @returns An array of Unicode code point numbers
 * @example
 * codePoints('hello') // [104, 101, 108, 108, 111]
 * codePoints('👍') // [128077]
 * codePoints('€') // [8364]
 * codePoints('a👍b') // [97, 128077, 98]
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
