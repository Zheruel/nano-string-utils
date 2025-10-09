/**
 * Generates a simple hash from a string using FNV-1a algorithm (non-cryptographic)
 * @param str - The input string to hash
 * @returns A numeric hash value
 * @example
 * ```ts
 * // Basic usage
 * hashString('hello') // 1335831723
 * hashString('world') // 3582672807
 *
 * // Cache key generation
 * const cacheKey = hashString(JSON.stringify(queryParams))
 * cache.set(cacheKey, result)
 *
 * // Map key for complex objects
 * const userKey = hashString(`${user.id}:${user.email}`)
 * const userMap = new Map<number, User>()
 * userMap.set(userKey, user)
 *
 * // Simple deduplication
 * const seen = new Set<number>()
 * for (const item of items) {
 *   const hash = hashString(item.content)
 *   if (!seen.has(hash)) {
 *     seen.add(hash)
 *     uniqueItems.push(item)
 *   }
 * }
 *
 * // Quick checksum for content comparison
 * const hash1 = hashString(fileContent1)
 * const hash2 = hashString(fileContent2)
 * if (hash1 === hash2) console.log('Likely identical')
 * ```
 */
export const hashString = (str: string): number => {
  if (str == null) return 0;

  let hash = 2166136261; // FNV offset basis

  if (str.length === 0) return hash >>> 0;

  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = (hash * 16777619) >>> 0; // FNV prime with unsigned right shift
  }

  return hash;
};
