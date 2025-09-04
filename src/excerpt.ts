// Pre-compiled regex for better performance
const TRAILING_PUNCT = /[,;:\-–—]+$/;

/**
 * Creates a smart excerpt from text with word boundary awareness
 * @param text - The text to create an excerpt from
 * @param length - Maximum length of the excerpt (approximate)
 * @param suffix - Suffix to append when text is truncated (default: '...')
 * @returns The excerpted text
 * @example
 * excerpt('The quick brown fox jumps over the lazy dog', 20) // 'The quick brown fox...'
 * excerpt('Hello world. This is a test.', 15) // 'Hello world...'
 */
export function excerpt(text: string, length: number, suffix = "..."): string {
  if (!text || text.length <= length) {
    return text;
  }

  // Find the last space at or before the limit
  let lastSpace = -1;

  // Check positions from length down to 0 for a space
  for (let i = length; i >= 0; i--) {
    if (text[i] === " ") {
      lastSpace = i;
      break;
    }
  }

  // If we found a space, use it as the cut point
  if (lastSpace > 0) {
    let result = text.slice(0, lastSpace).trim();

    // Clean up trailing punctuation
    // Remove commas, semicolons, colons, dashes
    result = result.replace(TRAILING_PUNCT, "");

    // If it ends with sentence punctuation, don't add suffix
    if (result.endsWith(".") || result.endsWith("!") || result.endsWith("?")) {
      return result + ".."; // Add only two dots to avoid "...."
    }

    return result + suffix;
  }

  // No space found - handle long words or URLs
  const firstSpace = text.indexOf(" ");

  if (firstSpace === -1 || firstSpace > length) {
    // Single word or first word longer than limit - truncate
    return text.slice(0, length) + suffix;
  }

  // Include the first word if it's close
  return text.slice(0, firstSpace) + suffix;
}
