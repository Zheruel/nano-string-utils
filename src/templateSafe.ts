import { template, type TemplateOptions } from "./template.js";
import { escapeHtml } from "./escapeHtml.js";

/**
 * Recursively escape HTML in string values
 */
function escapeData(data: any): any {
  if (typeof data === "string") {
    return escapeHtml(data);
  }

  if (Array.isArray(data)) {
    return data.map(escapeData);
  }

  if (data && typeof data === "object" && data.constructor === Object) {
    const escaped: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      escaped[key] = escapeData(value);
    }
    return escaped;
  }

  return data;
}

/**
 * Interpolates variables in a template string with HTML escaping
 * @param str - Template string with placeholders
 * @param data - Data object with values to interpolate (strings will be HTML-escaped)
 * @param options - Optional configuration
 * @returns Processed string with interpolated and escaped values
 * @example
 * templateSafe('Hello {{name}}!', { name: '<script>alert("XSS")</script>' })
 * // 'Hello &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;!'
 *
 * templateSafe('User: {{user.name}}', {
 *   user: { name: '<b>John</b>' }
 * })
 * // 'User: &lt;b&gt;John&lt;/b&gt;'
 */
export function templateSafe(
  str: string,
  data: Record<string, any>,
  options?: TemplateOptions
): string {
  const escapedData = escapeData(data);
  return template(str, escapedData, options);
}
