/**
 * Options for configuring the normalizeWhitespace function behavior
 */
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

// Pre-compiled regex patterns for better performance
// Unicode whitespace characters to normalize:
// \u00A0 - Non-breaking space
// \u1680 - Ogham space mark
// \u2000-\u200B - Various spaces (en space, em space, thin space, etc.)
// \u2028 - Line separator
// \u2029 - Paragraph separator
// \u202F - Narrow non-breaking space
// \u205F - Medium mathematical space
// \u3000 - Ideographic space
// \uFEFF - Zero-width non-breaking space (BOM)

// Single-pass regex: collapse all whitespace including Unicode
const COLLAPSE_ALL_WHITESPACE =
  /[\s\u00A0\u1680\u2000-\u200B\u2028\u2029\u202F\u205F\u3000\uFEFF]+/g;

// Just replace Unicode spaces (no collapse)
const UNICODE_SPACES =
  /[\s\u00A0\u1680\u2000-\u200B\u2028\u2029\u202F\u205F\u3000\uFEFF]/g;

// Preserve newlines: collapse all non-newline whitespace
const COLLAPSE_NON_NEWLINE = /[^\S\n]+/g;

// Replace Unicode spaces except newlines
const UNICODE_SPACES_NO_NEWLINE =
  /[\u00A0\u1680\u2000-\u200B\u2028\u2029\u202F\u205F\u3000\uFEFF\t\r\f\v]/g;

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

  let result: string;

  // Optimize for common cases with single-pass regex
  if (preserveNewlines) {
    if (collapse) {
      // Single pass: replace Unicode spaces AND collapse non-newline whitespace
      result = str
        .replace(UNICODE_SPACES_NO_NEWLINE, " ")
        .replace(COLLAPSE_NON_NEWLINE, " ");
    } else {
      // Just replace Unicode spaces, preserve spacing
      result = str.replace(UNICODE_SPACES_NO_NEWLINE, " ");
    }
  } else {
    if (collapse) {
      // Most common case: single-pass regex to collapse all whitespace
      result = str.replace(COLLAPSE_ALL_WHITESPACE, " ");
    } else {
      // Replace Unicode spaces without collapsing
      result = str.replace(UNICODE_SPACES, " ");
    }
  }

  if (trim) {
    result = result.trim();
  }

  return result;
}
