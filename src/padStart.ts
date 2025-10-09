/**
 * Pads a string to a given length by adding characters to the left
 * @param str - The string to pad
 * @param length - The target length
 * @param chars - The characters to use for padding (default: ' ')
 * @returns The padded string
 * @example
 * ```ts
 * // Basic usage
 * padStart('5', 3, '0') // '005'
 * padStart('Hi', 5, '.') // '...Hi'
 *
 * // Zero-padding IDs and numbers
 * const orderId = padStart(String(42), 8, '0') // '00000042'
 * const invoice = padStart(String(123), 6, '0') // '000123'
 *
 * // Right-aligned table columns
 * const price = padStart('$99.99', 15) // '         $99.99'
 * const quantity = padStart('42', 10) // '        42'
 *
 * // Log timestamps alignment
 * const seconds = padStart(String(7), 2, '0') // '07'
 * const minutes = padStart(String(5), 2, '0') // '05'
 * // Result: '05:07'
 * ```
 */
export function padStart(str: string, length: number): string;
export function padStart(str: string, length: number, chars: string): string;
export function padStart(str: string, length: number, chars = " "): string {
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

  return pad + str;
}
