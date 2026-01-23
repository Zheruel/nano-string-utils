/**
 * Removes specified characters from the end of a string
 * @param str - The string to trim
 * @param chars - Characters to remove (default: whitespace)
 * @returns The trimmed string
 * @example
 * ```ts
 * // Basic usage - remove whitespace
 * trimEnd('hello  ') // 'hello'
 * trimEnd('hello\t\n') // 'hello'
 *
 * // Remove custom characters
 * trimEnd('path///', '/') // 'path'
 * trimEnd('title---', '-') // 'title'
 * trimEnd('...dots...', '.') // '...dots'
 *
 * // Remove multiple character types
 * trimEnd('name_-_', '_-') // 'name'
 *
 * // Clean trailing punctuation
 * const clean = trimEnd('Hello!!!', '!') // 'Hello'
 * ```
 */
export function trimEnd(str: string, chars?: string): string;
export function trimEnd(str: string, chars = " \t\n\r"): string {
  if (str == null) return str;
  if (!str) return str;

  const charSet = new Set(Array.from(chars));
  const arr = Array.from(str);
  let end = arr.length;

  while (end > 0 && charSet.has(arr[end - 1]!)) {
    end--;
  }

  return arr.slice(0, end).join("");
}
