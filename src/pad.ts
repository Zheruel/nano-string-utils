/**
 * Pads a string to a given length by adding characters to both sides
 * @param str - The string to pad
 * @param length - The target length
 * @param chars - The characters to use for padding (default: ' ')
 * @returns The padded string
 * @example
 * pad('Hi', 6) // '  Hi  '
 * pad('Hi', 6, '-') // '--Hi--'
 * pad('Hi', 7, '-') // '--Hi---'
 */
export function pad(str: string, length: number): string;
export function pad(str: string, length: number, chars: string): string;
export function pad(str: string, length: number, chars = " "): string {
  if (str == null) return str;
  const strLen = Array.from(str).length;
  if (length <= strLen) return str;

  const padding = chars || " ";
  const padChars = Array.from(padding);
  const padLen = padChars.length;
  const totalPad = length - strLen;
  const leftPad = Math.floor(totalPad / 2);
  const rightPad = totalPad - leftPad;

  if (padLen === 1) {
    return padding.repeat(leftPad) + str + padding.repeat(rightPad);
  }

  let left = "";
  for (let i = 0; i < leftPad; i++) left += padChars[i % padLen];

  let right = "";
  for (let i = 0; i < rightPad; i++) right += padChars[i % padLen];

  return left + str + right;
}
