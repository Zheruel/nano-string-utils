/**
 * Generates a simple hash from a string (non-cryptographic)
 * @param str - The input string to hash
 * @returns A numeric hash value
 * @example
 * hashString('hello') // 99162322
 * hashString('world') // 113318802
 */
export const hashString = (str: string): number => {
  let hash = 0;
  
  if (str.length === 0) return hash;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash);
};