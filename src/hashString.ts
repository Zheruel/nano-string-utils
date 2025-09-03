/**
 * Generates a simple hash from a string (non-cryptographic)
 * @param str - The input string to hash
 * @returns A numeric hash value
 * @example
 * hashString('hello') // 1335831723
 * hashString('world') // 3582672807
 */
export const hashString = (str: string): number => {
  let hash = 2166136261; // FNV offset basis

  if (str.length === 0) return hash >>> 0;

  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = (hash * 16777619) >>> 0; // FNV prime with unsigned right shift
  }

  return hash;
};
