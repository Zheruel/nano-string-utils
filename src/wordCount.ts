// Pre-compiled regex for better performance
const WORD_SPLIT = /\s+/;

/**
 * Counts the number of words in a string
 * @param str - The input string to count words from
 * @returns The number of words in the string
 * @example
 * ```ts
 * // Basic usage
 * wordCount('Hello world') // 2
 * wordCount('  Multiple   spaces  ') // 2
 *
 * // Reading time estimation
 * const article = 'Your blog post content here...'
 * const words = wordCount(article)
 * const readingTime = Math.ceil(words / 200) // Assuming 200 words per minute
 * // Display: `${readingTime} min read`
 *
 * // Content validation
 * const description = 'Product description text'
 * if (wordCount(description) < 10) {
 *   console.log('Description too short')
 * }
 *
 * // Twitter/social media character validation
 * const tweet = 'Your tweet here'
 * const words = wordCount(tweet)
 * console.log(`${words} words`)
 * ```
 */
export const wordCount = (str: string): number => {
  if (!str) return 0;

  const words = str.trim().split(WORD_SPLIT);
  return words[0] === "" ? 0 : words.length;
};
