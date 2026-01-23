/**
 * Removes specified characters from the start of a string
 * @param str - The string to trim
 * @param chars - Characters to remove (default: whitespace)
 * @returns The trimmed string
 * @example
 * ```ts
 * // Basic usage - remove whitespace
 * trimStart('  hello') // 'hello'
 * trimStart('\t\nhello') // 'hello'
 *
 * // Remove custom characters
 * trimStart('///path', '/') // 'path'
 * trimStart('---title', '-') // 'title'
 * trimStart('...dots...', '.') // 'dots...'
 *
 * // Remove multiple character types
 * trimStart('_-_name', '_-') // 'name'
 *
 * // Path cleaning
 * const cleanPath = trimStart('/api/users', '/') // 'api/users'
 * ```
 */
export function trimStart(str: string, chars?: string): string;
export function trimStart(str: string, chars = " \t\n\r"): string {
  if (str == null) return str;
  if (!str) return str;

  const charSet = new Set(Array.from(chars));
  const arr = Array.from(str);
  let start = 0;

  while (start < arr.length && charSet.has(arr[start]!)) {
    start++;
  }

  return arr.slice(start).join("");
}
