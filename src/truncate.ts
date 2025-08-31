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
  const chars = Array.from(str);
  if (chars.length <= length) return str;
  if (length <= suffix.length) return suffix;
  const truncatedChars = chars.slice(0, length - suffix.length);
  return truncatedChars.join("") + suffix;
};
