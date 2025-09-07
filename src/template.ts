/**
 * Options for template function
 */
export interface TemplateOptions {
  /** Custom delimiters for placeholders. Default: ['{{', '}}'] */
  delimiters?: [string, string];
  /** Value to use for missing variables. Default: '' */
  fallback?: string | null;
  /** Keep unmatched placeholders in output. Default: false */
  keepUnmatched?: boolean;
}

/**
 * Get nested property value from an object
 */
function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((current, key) => current?.[key], obj);
}

/**
 * Escape regex special characters
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Interpolates variables in a template string
 * @param str - Template string with placeholders
 * @param data - Data object with values to interpolate
 * @param options - Optional configuration
 * @returns Processed string with interpolated values
 * @example
 * ```ts
 * // Basic usage with type inference
 * template('Hello {{name}}!', { name: 'World' })
 * // 'Hello World!'
 *
 * // Nested object access with type safety
 * interface User {
 *   name: string
 *   age: number
 *   address: { city: string }
 * }
 * const user: User = {
 *   name: 'Alice',
 *   age: 30,
 *   address: { city: 'NYC' }
 * }
 * template('{{name}} from {{address.city}}', user)
 * // 'Alice from NYC'
 *
 * // Function overloads - without options
 * const result1 = template('Hi {{name}}', { name: 'Bob' })
 * // TypeScript knows: (str: string, data: Record<string, any>) => string
 *
 * // Function overloads - with options interface
 * const options: TemplateOptions = {
 *   delimiters: ['${', '}'],
 *   fallback: 'N/A',
 *   keepUnmatched: false
 * }
 * const result2 = template('Hello ${name}!', { name: 'Eve' }, options)
 * // TypeScript knows: (str: string, data: Record<string, any>, options: TemplateOptions) => string
 *
 * // Type-safe template data
 * type Config = { apiUrl: string; timeout: number }
 * const config: Config = { apiUrl: 'https://api.example.com', timeout: 5000 }
 * const url = template('{{apiUrl}}/users', config)
 * // TypeScript ensures config has required properties
 * ```
 */
export function template(str: string, data: Record<string, any>): string;
export function template(
  str: string,
  data: Record<string, any>,
  options: TemplateOptions
): string;
export function template(
  str: string,
  data: Record<string, any>,
  options?: TemplateOptions
): string {
  if (!str) return str;

  const opts: Required<TemplateOptions> = {
    delimiters: ["{{", "}}"],
    fallback: "",
    keepUnmatched: false,
    ...options,
  };

  const [open, close] = opts.delimiters;
  const pattern = new RegExp(
    `${escapeRegex(open)}\\s*([^${escapeRegex(close)}]+?)\\s*${escapeRegex(
      close
    )}`,
    "g"
  );

  return str.replace(pattern, (match, path) => {
    const trimmedPath = path.trim();
    const value = getNestedValue(data, trimmedPath);

    if (value === undefined || value === null) {
      if (opts.keepUnmatched) return match;
      return opts.fallback ?? "";
    }

    return String(value);
  });
}
