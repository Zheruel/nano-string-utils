export interface NormalizeWhitespaceOptions {
  /**
   * Whether to trim leading and trailing whitespace
   * @default true
   */
  trim?: boolean;
  /**
   * Whether to collapse multiple consecutive spaces into one
   * @default true
   */
  collapse?: boolean;
  /**
   * Whether to preserve newlines (only converts them to regular spaces if false)
   * @default false
   */
  preserveNewlines?: boolean;
}

/**
 * Normalizes various Unicode whitespace characters to regular spaces
 * @param str - The string to normalize
 * @param options - Options for normalization behavior
 * @returns The normalized string
 * @example
 * normalizeWhitespace('hello   world')                   // 'hello world'
 * normalizeWhitespace('hello\u00A0world')               // 'hello world' (non-breaking space)
 * normalizeWhitespace('  hello  ')                      // 'hello'
 * normalizeWhitespace('hello\n\nworld')                 // 'hello world'
 * normalizeWhitespace('hello\n\nworld', { preserveNewlines: true }) // 'hello\n\nworld'
 * normalizeWhitespace('  hello  ', { trim: false })     // ' hello '
 * normalizeWhitespace('a    b', { collapse: false })    // 'a    b'
 */
export function normalizeWhitespace(
  str: string,
  options: NormalizeWhitespaceOptions = {}
): string {
  const { trim = true, collapse = true, preserveNewlines = false } = options;

  if (!str) return str;

  let result = str;

  // Unicode whitespace characters to normalize:
  // \u00A0 - Non-breaking space
  // \u1680 - Ogham space mark
  // \u2000-\u200A - Various spaces (en space, em space, thin space, etc.)
  // \u2028 - Line separator
  // \u2029 - Paragraph separator
  // \u202F - Narrow non-breaking space
  // \u205F - Medium mathematical space
  // \u3000 - Ideographic space
  // \uFEFF - Zero-width non-breaking space (BOM)
  // \u200B - Zero-width space

  if (preserveNewlines) {
    // Replace all Unicode spaces except newlines with regular space
    result = result.replace(
      /[\u00A0\u1680\u2000-\u200B\u2028\u2029\u202F\u205F\u3000\uFEFF\t\r\f\v]/g,
      " "
    );

    if (collapse) {
      // Collapse multiple spaces (but not newlines) into one
      result = result.replace(/[^\S\n]+/g, " ");
    }
  } else {
    // Replace all whitespace characters including newlines with regular space
    result = result.replace(
      /[\s\u00A0\u1680\u2000-\u200B\u2028\u2029\u202F\u205F\u3000\uFEFF]/g,
      " "
    );

    if (collapse) {
      // Collapse multiple spaces into one
      result = result.replace(/\s+/g, " ");
    }
  }

  if (trim) {
    result = result.trim();
  }

  return result;
}
