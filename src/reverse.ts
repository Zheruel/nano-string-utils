/**
 * Reverses a string
 * @param str - The input string to reverse
 * @returns A reversed string
 * @example
 * reverse('hello') // 'olleh'
 * reverse('world') // 'dlrow'
 */
export const reverse = (str: string): string => {
  return Array.from(str).reverse().join("");
};
