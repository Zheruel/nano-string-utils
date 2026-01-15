const HTML_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
};

/**
 * Decodes HTML entities back to their original characters
 * @param str - The input string containing HTML entities
 * @returns The string with HTML entities decoded
 * @example
 * ```ts
 * // Basic decoding
 * unescapeHtml('&lt;div&gt;Hello&lt;/div&gt;') // '<div>Hello</div>'
 *
 * // All supported entities (including &apos; for HTML5/XML compatibility)
 * unescapeHtml('&amp;&lt;&gt;&quot;&#39;') // '&<>"\''
 * unescapeHtml('&apos;') // "'" (HTML5/XML single quote)
 *
 * // Mixed content
 * unescapeHtml('Hello &amp; World') // 'Hello & World'
 *
 * // Processing API responses
 * const apiResponse = '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;';
 * const decoded = unescapeHtml(apiResponse); // '<script>alert("XSS")</script>'
 *
 * // Roundtrip with escapeHtml
 * unescapeHtml(escapeHtml('<div>')) === '<div>' // true
 * ```
 */
export const unescapeHtml = (str: string): string => {
  if (!str) return str;
  return str.replace(/&(?:amp|lt|gt|quot|#39|apos);/g, (m) => HTML_ENTITIES[m] ?? m);
};
