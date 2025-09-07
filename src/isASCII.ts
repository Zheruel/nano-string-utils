/**
 * Checks if a string contains only ASCII characters (code points 0-127)
 * @param str - The input string to check
 * @returns True if the string contains only ASCII characters, false otherwise
 * @example
 * isASCII('Hello World!') // true
 * isASCII('café') // false
 * isASCII('👍') // false
 * isASCII('abc123!@#') // true
 * isASCII('') // true
 */
export function isASCII(str: string): boolean {
  if (str == null) return false;

  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127) {
      return false;
    }
  }
  return true;
}
