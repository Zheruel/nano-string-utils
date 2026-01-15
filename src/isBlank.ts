/**
 * Checks if a string is empty or contains only whitespace characters
 * @param str - The input string to check
 * @returns True if the string is empty or whitespace-only, false otherwise
 * @example
 * ```ts
 * // Empty strings
 * isBlank('') // true
 * isBlank('   ') // true
 * isBlank('\t\n') // true
 *
 * // Non-empty strings
 * isBlank('hello') // false
 * isBlank(' x ') // false
 *
 * // Form validation
 * const name = formData.get('name') as string;
 * if (isBlank(name)) {
 *   errors.push('Name is required');
 * }
 * ```
 */
export const isBlank = (str: string): boolean => !str || !str.trim();
