/**
 * Removes HTML tags from a string
 * @param str - The input string containing HTML
 * @returns A string with HTML tags removed
 * @example
 * stripHtml('<p>Hello <b>World</b></p>') // 'Hello World'
 * stripHtml('<div>Test</div>') // 'Test'
 */
export const stripHtml = (str: string): string => {
  return str.replace(/<[^>]*>/g, "");
};
