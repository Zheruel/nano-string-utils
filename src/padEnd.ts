/**
 * Pads a string to a given length by adding characters to the right
 * @param str - The string to pad
 * @param length - The target length
 * @param chars - The characters to use for padding (default: ' ')
 * @returns The padded string
 * @example
 * ```ts
 * // Basic usage
 * padEnd('Hi', 5, '.') // 'Hi...'
 * padEnd('5', 3, '0') // '500'
 *
 * // Left-aligned table columns
 * const name = padEnd('John', 20) // 'John                '
 * const status = padEnd('Active', 15) // 'Active         '
 *
 * // Log formatting with consistent column widths
 * const level = padEnd('[INFO]', 10) // '[INFO]    '
 * const module = padEnd('auth', 15) // 'auth           '
 * console.log(level + module + 'User logged in')
 *
 * // Invoice line items
 * const item = padEnd('Widget A', 30, '.') // 'Widget A......................'
 * ```
 */
export function padEnd(str: string, length: number): string;
export function padEnd(str: string, length: number, chars: string): string;
export function padEnd(str: string, length: number, chars = " "): string {
  if (str == null) return str;

  const strLen = Array.from(str).length;

  if (length <= strLen || length <= 0) {
    return str;
  }

  const padding = chars || " ";
  const padArray = Array.from(padding);
  const padLen = padArray.length;
  const needed = length - strLen;

  // Build padding by repeating visual units
  const padUnits = [];
  for (let i = 0; i < needed; i++) {
    padUnits.push(padArray[i % padLen]);
  }
  const pad = padUnits.join("");

  return str + pad;
}
