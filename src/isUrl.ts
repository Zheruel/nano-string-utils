/**
 * Validates if a string is a valid URL format
 * @param str - The input string to validate
 * @returns True if the string is a valid URL format, false otherwise
 * @example
 * ```ts
 * // Basic validation
 * isUrl('https://example.com') // true
 * isUrl('http://localhost:3000') // true
 * isUrl('not a url') // false
 *
 * // Using with branded types for type safety
 * import { isValidUrl, toUrl, type URL } from 'nano-string-utils/types'
 *
 * // Type guard for API configuration
 * const apiEndpoint: string = process.env.API_URL || ''
 * if (isValidUrl(apiEndpoint)) {
 *   // apiEndpoint is now typed as URL
 *   const client = createApiClient(apiEndpoint)
 * }
 *
 * // Builder function with null safety
 * const url = toUrl(userProvidedUrl)
 * if (url) {
 *   // url is typed as URL | null
 *   await fetch(url) // TypeScript ensures valid URL
 * } else {
 *   console.error('Invalid URL provided')
 * }
 *
 * // Type-safe configuration
 * interface ApiConfig {
 *   baseUrl: URL // Branded type ensures valid URL
 *   timeout: number
 * }
 *
 * const config: ApiConfig = {
 *   baseUrl: toUrl('https://api.example.com')!,
 *   timeout: 5000
 * }
 * ```
 */
export const isUrl = (str: string): boolean => {
  if (!str) return false;

  try {
    const url = new URL(str);

    // Check for valid protocols
    const validProtocols = ["http:", "https:", "ftp:", "ftps:"];
    if (!validProtocols.includes(url.protocol)) {
      return false;
    }

    // Check for consecutive dots in hostname
    if (url.hostname.includes("..")) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
};
