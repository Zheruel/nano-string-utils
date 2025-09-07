/**
 * Validates if a string is a valid URL format
 * @param str - The input string to validate
 * @returns True if the string is a valid URL format, false otherwise
 * @example
 * isUrl('https://example.com') // true
 * isUrl('http://localhost:3000') // true
 * isUrl('not a url') // false
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
