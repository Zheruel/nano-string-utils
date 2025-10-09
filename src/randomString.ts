/**
 * Generates a random alphanumeric string
 * @param length - The length of the random string
 * @param charset - Optional character set to use (default: alphanumeric)
 * @returns A random string of specified length
 * @example
 * ```ts
 * // Basic usage
 * randomString(10) // 'a3B9x2Kp1m'
 * randomString(5, 'abc123') // '3a1bc'
 *
 * // API key generation
 * const apiKey = `sk_${randomString(32)}`
 * // 'sk_X8mK2pL9vQwR3tY6uZ1aB4cD5eF7gH8i'
 *
 * // Session ID generation
 * const sessionId = randomString(64)
 * // Store in cookie or database
 *
 * // CSRF token generation
 * const csrfToken = randomString(40)
 * // Use in forms for security
 *
 * // Test fixture IDs
 * const userId = `user_${randomString(12)}`
 * const orderId = `order_${randomString(16)}`
 *
 * // Short codes and invite codes
 * const inviteCode = randomString(8, 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789')
 * // 'K3P9M7Q2' (omits confusing characters like 0/O, 1/I)
 *
 * // File upload temporary names
 * const tempFile = `upload_${randomString(16)}.tmp`
 * ```
 */
export function randomString(length: number): string;
export function randomString(length: number, charset: string): string;
export function randomString(
  length: number,
  charset: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
): string {
  const len = Math.floor(length);
  if (len <= 0) return "";
  if (charset.length === 0) return "";

  let result = "";
  const charsetLength = charset.length;

  for (let i = 0; i < len; i++) {
    result += charset.charAt(Math.floor(Math.random() * charsetLength));
  }

  return result;
}
