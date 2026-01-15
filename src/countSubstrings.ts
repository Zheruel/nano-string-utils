/**
 * Counts non-overlapping occurrences of a substring within a string
 * @param str - The input string to search in
 * @param sub - The substring to count
 * @returns The number of non-overlapping occurrences
 * @example
 * ```ts
 * // Basic counting
 * countSubstrings('hello hello hello', 'hello') // 3
 *
 * // Non-overlapping behavior
 * countSubstrings('ababa', 'aba') // 1 (not 2, as matches don't overlap)
 *
 * // No matches
 * countSubstrings('hello', 'xyz') // 0
 *
 * // Case sensitive
 * countSubstrings('Hello hello HELLO', 'hello') // 1
 *
 * // Text analysis
 * const logContent = 'ERROR: failed\nERROR: timeout\nWARN: slow';
 * countSubstrings(logContent, 'ERROR') // 2
 * ```
 */
export const countSubstrings = (str: string, sub: string): number => {
  if (!str || !sub) return 0;
  let count = 0;
  let pos = 0;
  while ((pos = str.indexOf(sub, pos)) !== -1) {
    count++;
    pos += sub.length;
  }
  return count;
};
