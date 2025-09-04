/**
 * Options for memoization
 */
export interface MemoizeOptions {
  /**
   * Maximum number of cached results to store
   * @default 100
   */
  maxSize?: number;
  /**
   * Custom key generator for cache keys
   * @default JSON.stringify for multiple args, toString for single arg
   */
  getKey?: (...args: any[]) => string;
}

/**
 * Creates a memoized version of a function with LRU cache eviction.
 * Useful for expensive operations like levenshtein distance or fuzzy matching.
 *
 * @param fn - The function to memoize
 * @param options - Optional configuration for memoization behavior
 * @returns A memoized version of the input function
 *
 * @example
 * ```ts
 * // Basic usage
 * const expensiveFn = (n: number) => {
 *   console.log('Computing...');
 *   return n * n;
 * };
 * const memoized = memoize(expensiveFn);
 * memoized(5); // Computing... → 25
 * memoized(5); // → 25 (cached, no "Computing...")
 *
 * // With string utilities
 * import { levenshtein, memoize } from 'nano-string-utils';
 * const fastLevenshtein = memoize(levenshtein);
 *
 * // Process many comparisons efficiently
 * const words = ['hello', 'hallo', 'hola'];
 * words.forEach(word => {
 *   fastLevenshtein('hello', word); // Cached after first call
 * });
 *
 * // Custom cache size
 * const limited = memoize(expensiveFn, { maxSize: 10 });
 *
 * // Custom key generation (for objects)
 * const processUser = (user: { id: number; name: string }) => {
 *   return `User: ${user.name}`;
 * };
 * const memoizedUser = memoize(processUser, {
 *   getKey: (user) => user.id.toString()
 * });
 * ```
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  options: MemoizeOptions = {}
): T {
  const { maxSize = 100, getKey } = options;

  // Use Map for O(1) lookups with insertion order tracking
  const cache = new Map<string, any>();

  // Default key generator
  const generateKey =
    getKey ||
    ((...args: any[]): string => {
      if (args.length === 0) return "";
      if (args.length === 1) {
        const arg = args[0];
        // Handle null and undefined specially
        if (arg === null) return "__null__";
        if (arg === undefined) return "__undefined__";
        // Fast path for primitives
        if (
          typeof arg === "string" ||
          typeof arg === "number" ||
          typeof arg === "boolean"
        ) {
          return String(arg);
        }
      }
      // Fallback to JSON for complex cases
      try {
        return JSON.stringify(args);
      } catch {
        // If circular reference or non-serializable, use simple toString
        return args.map(String).join("|");
      }
    });

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = generateKey(...args);

    // Check cache hit
    if (cache.has(key)) {
      // Move to end (most recently used) by deleting and re-adding
      const cached = cache.get(key);
      cache.delete(key);
      cache.set(key, cached);
      return cached;
    }

    // Compute result
    const result = fn(...args);

    // Check cache size limit
    if (cache.size >= maxSize) {
      // Remove least recently used (first item)
      const firstKey = cache.keys().next().value;
      if (firstKey !== undefined) {
        cache.delete(firstKey);
      }
    }

    // Store in cache
    cache.set(key, result);
    return result;
  }) as T;
}
