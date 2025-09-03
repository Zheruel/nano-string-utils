/**
 * Calculates the Levenshtein distance between two strings.
 * Uses space-optimized dynamic programming with O(min(m,n)) space complexity.
 *
 * @param a - First string to compare
 * @param b - Second string to compare
 * @param maxDistance - Optional maximum distance threshold. Returns Infinity if exceeded.
 * @returns The minimum number of single-character edits (insertions, deletions, substitutions)
 *          required to change one string into the other, or Infinity if it exceeds maxDistance
 *
 * @example
 * ```ts
 * levenshtein('cat', 'bat') // 1 (substitution)
 * levenshtein('cat', 'cats') // 1 (insertion)
 * levenshtein('example', 'exmaple') // 2 (transposition)
 * levenshtein('hello', 'helicopter', 3) // Infinity (exceeds max distance)
 * ```
 */
export function levenshtein(
  a: string,
  b: string,
  maxDistance?: number
): number {
  // Fast path: identical strings
  if (a === b) return 0;

  let aLen = a.length;
  let bLen = b.length;

  // Fast path: empty string cases
  if (aLen === 0) return bLen;
  if (bLen === 0) return aLen;

  // Early exit if minimum possible distance exceeds maxDistance
  if (maxDistance !== undefined) {
    const minDistance = Math.abs(aLen - bLen);
    if (minDistance > maxDistance) return Infinity;
  }

  // Trim common prefix
  let prefixLen = 0;
  const minLen = Math.min(aLen, bLen);
  while (
    prefixLen < minLen &&
    a.charCodeAt(prefixLen) === b.charCodeAt(prefixLen)
  ) {
    prefixLen++;
  }

  // If one string is a prefix of the other
  if (prefixLen === minLen) {
    return Math.abs(aLen - bLen);
  }

  // Trim common suffix after prefix
  let suffixLen = 0;
  const maxSuffixLen = Math.min(aLen - prefixLen, bLen - prefixLen);
  while (
    suffixLen < maxSuffixLen &&
    a.charCodeAt(aLen - 1 - suffixLen) === b.charCodeAt(bLen - 1 - suffixLen)
  ) {
    suffixLen++;
  }

  // Extract the different middle parts
  const aStart = prefixLen;
  const aEnd = aLen - suffixLen;
  const bStart = prefixLen;
  const bEnd = bLen - suffixLen;

  aLen = aEnd - aStart;
  bLen = bEnd - bStart;

  // If the middle parts are empty, strings are equal
  if (aLen === 0) return bLen;
  if (bLen === 0) return aLen;

  // Swap to ensure we use less memory (iterate over shorter string)
  let shorter = a;
  let longer = b;
  let shorterStart = aStart;
  let shorterLen = aLen;
  let longerStart = bStart;
  let longerLen = bLen;

  if (aLen > bLen) {
    shorter = b;
    longer = a;
    shorterStart = bStart;
    shorterLen = bLen;
    longerStart = aStart;
    longerLen = aLen;
  }

  // Single row for space optimization
  const prevRow = Array(shorterLen + 1);

  // Initialize first row
  for (let i = 0; i <= shorterLen; i++) {
    prevRow[i] = i;
  }

  // Fill the matrix row by row
  for (let j = 1; j <= longerLen; j++) {
    let prevDiagonal = prevRow[0];
    prevRow[0] = j;

    let minInRow = j;

    for (let i = 1; i <= shorterLen; i++) {
      const currentDiagonal = prevRow[i];

      // Calculate cost (0 if characters match, 1 if substitution needed)
      const cost =
        shorter.charCodeAt(shorterStart + i - 1) ===
        longer.charCodeAt(longerStart + j - 1)
          ? 0
          : 1;

      // Take minimum of three operations
      prevRow[i] = Math.min(
        prevRow[i] + 1, // deletion
        prevRow[i - 1] + 1, // insertion
        prevDiagonal + cost // substitution
      );

      minInRow = Math.min(minInRow, prevRow[i]);
      prevDiagonal = currentDiagonal;
    }

    // Early termination if minimum value in row exceeds maxDistance
    if (maxDistance !== undefined && minInRow > maxDistance) {
      return Infinity;
    }
  }

  return prevRow[shorterLen];
}
