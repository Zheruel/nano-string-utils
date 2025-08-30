/**
 * Escapes HTML special characters in a string
 * @param str - The input string to escape
 * @returns A string with HTML entities escaped
 * @example
 * escapeHtml('<div>Hello & "World"</div>') // '&lt;div&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;'
 * escapeHtml("It's <script>") // 'It&#39;s &lt;script&gt;'
 */
export const escapeHtml = (str: string): string => {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  
  return str.replace(/[&<>"']/g, (match) => htmlEntities[match] ?? match);
};