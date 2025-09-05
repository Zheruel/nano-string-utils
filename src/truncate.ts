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
  
  // Simple slice for performance (handles 99% of real-world cases)
  let result = str.slice(0, targetLength);
  
  // Only check if we broke a surrogate pair at the boundary
  // This prevents showing broken emoji characters (�)
  if (result.length > 0) {
    const lastChar = result.charCodeAt(result.length - 1);
    // High surrogate at the end means we split an emoji - remove it
    if (lastChar >= 0xD800 && lastChar <= 0xDBFF) {
      result = result.slice(0, -1);
    }
  }
  
  return result + suffix;
};
