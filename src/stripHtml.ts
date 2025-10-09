// Pre-compiled regex for better performance
const HTML_TAG_REGEX = /<[^>]*>/g;

/**
 * Removes HTML tags from a string
 * @param str - The input string containing HTML
 * @returns A string with HTML tags removed
 * @example
 * ```ts
 * // Basic usage
 * stripHtml('<p>Hello <b>World</b></p>') // 'Hello World'
 * stripHtml('<div>Test</div>') // 'Test'
 *
 * // Email preview text generation
 * const emailBody = '<h1>Welcome!</h1><p>Thanks for signing up.</p>'
 * const preview = stripHtml(emailBody) // 'Welcome! Thanks for signing up.'
 *
 * // Notification sanitization
 * const notification = '<script>alert("xss")</script><p>New message</p>'
 * const safeText = stripHtml(notification) // 'alert("xss")New message'
 *
 * // Blog post excerpt for meta description
 * const post = '<article><p>This is a <strong>great</strong> post.</p></article>'
 * const excerpt = stripHtml(post).slice(0, 160) // 'This is a great post.'
 *
 * // Search indexing - extract text content
 * const htmlContent = '<div class="content"><p>Searchable text</p></div>'
 * const indexableText = stripHtml(htmlContent) // 'Searchable text'
 * ```
 */
export const stripHtml = (str: string): string => {
  if (!str) return str;
  return str.replace(HTML_TAG_REGEX, "");
};
