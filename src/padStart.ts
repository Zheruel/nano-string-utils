/**
 * Pads a string to a given length by adding characters to the left
 * @param str - The string to pad
 * @param length - The target length
 * @param chars - The characters to use for padding (default: ' ')
 * @returns The padded string
 * @example
 * padStart('5', 3, '0') // '005'
 * padStart('Hi', 5, '.') // '...Hi'
 * padStart('Hi', 6, '=-') // '=-=-Hi'
 */
export function padStart(str: string, length: number, chars = " "): string {
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
