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

  // Quick check for Unicode (emoji, combining chars, etc)
  const hasUnicode =
    /[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}]|[\u{FE00}-\u{FE0F}]|[\u{1F900}-\u{1F9FF}]|[\u200D]/u.test(
      str
    );
  const strLen = hasUnicode ? Array.from(str).length : str.length;

  if (length <= strLen) return str;

  const fillChars = chars || " ";
  const fillArray = Array.from(fillChars);
  const fillLen = fillArray.length;
  const totalPad = length - strLen;
  const leftPad = Math.floor(totalPad / 2);
  const rightPad = totalPad - leftPad;

  // For single-char padding, use repeat (fastest)
  if (fillLen === 1) {
    return fillChars.repeat(leftPad) + str + fillChars.repeat(rightPad);
  }

  // For multi-char padding, build the pattern by visual characters
  const leftUnits = [];
  for (let i = 0; i < leftPad; i++) {
    leftUnits.push(fillArray[i % fillLen]);
  }
  const leftStr = leftUnits.join("");

  const rightUnits = [];
  for (let i = 0; i < rightPad; i++) {
    rightUnits.push(fillArray[i % fillLen]);
  }
  const rightStr = rightUnits.join("");

  return leftStr + str + rightStr;
}
