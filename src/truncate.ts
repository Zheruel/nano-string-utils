/**
 * Truncates a string to a specified length and adds ellipsis
 * @param str - The input string to truncate
 * @param length - The maximum length of the output string (including ellipsis)
 * @param suffix - The suffix to append (default: '...')
 * @returns A truncated string with ellipsis
 * @example
 * truncate('Long text here', 10) // 'Long te...'
 * truncate('Short', 10) // 'Short'
 */
export const truncate = (
  str: string,
  length: number,
  suffix: string = "..."
): string => {
  // Early return for strings that don't need truncation
  if (str.length <= length) return str;

  // Handle edge case where length is too small
  if (length <= suffix.length) return suffix;

  const targetLength = length - suffix.length;

  // Fast check: if target is >= string length, no unicode issues
  if (targetLength >= str.length) {
    return str.slice(0, targetLength) + suffix;
  }

  // Only check for surrogates at the cut point, not the whole string
  const cutPoint = targetLength;
  const code = str.charCodeAt(cutPoint - 1);

  // If we're cutting in the middle of a surrogate pair, back up one
  if (code >= 0xd800 && code <= 0xdbff && cutPoint < str.length) {
    const nextCode = str.charCodeAt(cutPoint);
    if (nextCode >= 0xdc00 && nextCode <= 0xdfff) {
      return str.slice(0, cutPoint - 1) + suffix;
    }
  }

  return str.slice(0, targetLength) + suffix;
};
