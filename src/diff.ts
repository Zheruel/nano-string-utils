/**
 * Computes a simple string diff comparison between two strings.
 * Returns a string with inline markers showing additions and deletions.
 * Uses a simple prefix/suffix algorithm optimized for readability over perfection.
 *
 * @param oldStr - The original string
 * @param newStr - The new string to compare against
 * @returns A string with diff markers: [-removed-] and {+added+}
 *
 * @example
 * ```typescript
 * diff('hello world', 'hello beautiful world')
 * // Returns: 'hello {+beautiful +}world'
 *
 * diff('goodbye world', 'hello world')
 * // Returns: '[-goodbye-]{+hello+} world'
 *
 * diff('test', 'test')
 * // Returns: 'test'
 *
 * diff('v1.0.0', 'v1.1.0')
 * // Returns: 'v1.[-0-]{+1+}.0'
 * ```
 */
export function diff(oldStr: string, newStr: string): string {
  if (oldStr === newStr) return oldStr;
  if (!oldStr) return `{+${newStr}+}`;
  if (!newStr) return `[-${oldStr}-]`;

  // Convert to character arrays for proper Unicode handling
  const oldChars = [...oldStr];
  const newChars = [...newStr];

  // Find common prefix
  let prefixLen = 0;
  const minLen = Math.min(oldChars.length, newChars.length);
  while (prefixLen < minLen && oldChars[prefixLen] === newChars[prefixLen]) {
    prefixLen++;
  }

  // Find common suffix from the remaining part
  let suffixLen = 0;
  const maxSuffixLen = Math.min(
    oldChars.length - prefixLen,
    newChars.length - prefixLen
  );

  while (
    suffixLen < maxSuffixLen &&
    oldChars[oldChars.length - 1 - suffixLen] ===
      newChars[newChars.length - 1 - suffixLen]
  ) {
    suffixLen++;
  }

  // Build result
  const prefix = oldChars.slice(0, prefixLen).join("");
  const suffix = oldChars.slice(oldChars.length - suffixLen).join("");

  const oldMiddle = oldChars
    .slice(prefixLen, oldChars.length - suffixLen)
    .join("");
  const newMiddle = newChars
    .slice(prefixLen, newChars.length - suffixLen)
    .join("");

  // Construct the diff
  if (!oldMiddle && !newMiddle) {
    return prefix + suffix;
  } else if (!oldMiddle) {
    return prefix + `{+${newMiddle}+}` + suffix;
  } else if (!newMiddle) {
    return prefix + `[-${oldMiddle}-]` + suffix;
  } else {
    return prefix + `[-${oldMiddle}-]{+${newMiddle}+}` + suffix;
  }
}
