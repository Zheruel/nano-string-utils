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
  const strLen = Array.from(str).length;

  if (length <= strLen || length <= 0) {
    return str;
  }

  const padding = chars || " ";
  const padArray = Array.from(padding);
  const padLen = padArray.length;
  const totalPad = length - strLen;

  // Distribute by visual characters
  const leftPad = Math.floor(totalPad / 2);
  const rightPad = totalPad - leftPad;

  // Build padding by repeating visual units
  const leftUnits = [];
  for (let i = 0; i < leftPad; i++) {
    leftUnits.push(padArray[i % padLen]);
  }
  const left = leftUnits.join("");

  const rightUnits = [];
  for (let i = 0; i < rightPad; i++) {
    rightUnits.push(padArray[i % padLen]);
  }
  const right = rightUnits.join("");

  return left + str + right;
}
