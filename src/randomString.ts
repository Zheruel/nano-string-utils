/**
 * Generates a random alphanumeric string
 * @param length - The length of the random string
 * @param charset - Optional character set to use (default: alphanumeric)
 * @returns A random string of specified length
 * @example
 * randomString(10) // 'a3B9x2Kp1m'
 * randomString(5, 'abc123') // '3a1bc'
 */
export const randomString = (
  length: number, 
  charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string => {
  let result = '';
  const charsetLength = charset.length;
  
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charsetLength));
  }
  
  return result;
};