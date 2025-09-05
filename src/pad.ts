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
export function pad(str: string, length: number, chars = " "): string {
  // Quick check for Unicode (emoji, combining chars, etc)
  const hasUnicode =
    /[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}]|[\u{FE00}-\u{FE0F}]|[\u{1F900}-\u{1F9FF}]|[\u200D]/u.test(
      str
    );
  const strLen = hasUnicode ? Array.from(str).length : str.length;

  if (length <= strLen) return str;

  const fillChars = chars || " ";
  const totalPad = length - strLen;
  const leftPad = Math.floor(totalPad / 2);
  const rightPad = totalPad - leftPad;

  // For single-char padding, use repeat (fastest)
  if (fillChars.length === 1) {
    return fillChars.repeat(leftPad) + str + fillChars.repeat(rightPad);
  }

  // For multi-char padding, build the pattern
  const leftStr = fillChars
    .repeat(Math.ceil(leftPad / fillChars.length))
    .slice(0, leftPad);
  const rightStr = fillChars
    .repeat(Math.ceil(rightPad / fillChars.length))
    .slice(0, rightPad);

  return leftStr + str + rightStr;
}
