// Pre-compiled regex and lookup table for better performance
const HTML_ESCAPE_REGEX = /[&<>"']/g;
const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/**
 * Escapes HTML special characters in a string to prevent XSS attacks
 * @param str - The input string to escape
 * @returns A string with HTML entities escaped
 * @example
 * ```ts
 * // Basic usage
 * escapeHtml('<div>Hello & "World"</div>')
 * // '&lt;div&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;'
 *
 * // XSS prevention in user input
 * const userInput = '<script>alert("xss")</script>'
 * const safe = escapeHtml(userInput)
 * // '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 *
 * // Displaying user-generated content safely
 * const comment = userComment.replace(/</g, '&lt;')
 * // Better: const safe = escapeHtml(userComment)
 * document.getElementById('comment').innerHTML = escapeHtml(userComment)
 *
 * // Template safety (use with template strings)
 * const name = '<img src=x onerror=alert(1)>'
 * const html = `<div>Hello ${escapeHtml(name)}</div>`
 * // '<div>Hello &lt;img src=x onerror=alert(1)&gt;</div>'
 *
 * // Escaping attributes
 * const title = 'Click "here" & learn more'
 * const attr = `<button title="${escapeHtml(title)}">Click</button>`
 * // Safe attribute value
 * ```
 */
export const escapeHtml = (str: string): string => {
  if (!str) return str;
  return str.replace(
    HTML_ESCAPE_REGEX,
    (match) => HTML_ENTITIES[match] ?? match
  );
};
