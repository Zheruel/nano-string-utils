/**
 * Removes specified characters from both ends of a string
 * @param str - The string to trim
 * @param chars - Characters to remove (default: whitespace)
 * @returns The trimmed string
 * @example
 * ```ts
 * // Basic usage - remove whitespace
 * trim('  hello  ') // 'hello'
 * trim('\t\nhello\t\n') // 'hello'
 *
 * // Remove custom characters
 * trim('///path///', '/') // 'path'
 * trim('---title---', '-') // 'title'
 * trim('...dots...', '.') // 'dots'
 *
 * // Remove multiple character types
 * trim('_-_name_-_', '_-') // 'name'
 *
 * // Clean quoted strings
 * const unquoted = trim('"hello"', '"') // 'hello'
 *
 * // Remove brackets
 * const content = trim('[content]', '[]') // 'content'
 * ```
 */
export function trim(str: string, chars?: string): string;
export function trim(str: string, chars = " \t\n\r"): string {
  if (str == null) return str;
  if (!str) return str;

  const charSet = new Set(Array.from(chars));
  const arr = Array.from(str);
  let start = 0;
  let end = arr.length;

  while (start < end && charSet.has(arr[start]!)) {
    start++;
  }

  while (end > start && charSet.has(arr[end - 1]!)) {
    end--;
  }

  return arr.slice(start, end).join("");
}
