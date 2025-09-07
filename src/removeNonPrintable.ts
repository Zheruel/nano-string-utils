/**
 * Options for configuring the removeNonPrintable function behavior
 */
export interface RemoveNonPrintableOptions {
  /**
   * Whether to preserve space character (U+0020)
   * @default true
   */
  keepSpace?: boolean;
  /**
   * Whether to preserve newline character (U+000A)
   * @default false
   */
  keepNewlines?: boolean;
  /**
   * Whether to preserve tab character (U+0009)
   * @default false
   */
  keepTabs?: boolean;
  /**
   * Whether to preserve carriage return character (U+000D)
   * @default false
   */
  keepCarriageReturns?: boolean;
}

/**
 * Removes non-printable control characters and formatting characters from strings
 * @param str - The string to clean
 * @param options - Options for preserving certain whitespace characters
 * @returns The string with control characters removed
 * @example
 * removeNonPrintable('hello\x00world')                  // 'helloworld'
 * removeNonPrintable('hello\nworld')                    // 'helloworld'
 * removeNonPrintable('hello\nworld', { keepNewlines: true }) // 'hello\nworld'
 * removeNonPrintable('hello\tworld', { keepTabs: true })     // 'hello\tworld'
 * removeNonPrintable('hello\u200Bworld')                // 'helloworld' (zero-width space removed)
 * removeNonPrintable('hello\u202Dworld')                // 'helloworld' (left-to-right override removed)
 * removeNonPrintable('👨‍👩‍👧‍👦')                       // '👨‍👩‍👧‍👦' (preserves emoji with ZWJ)
 */
export function removeNonPrintable(str: string): string;
export function removeNonPrintable(
  str: string,
  options: RemoveNonPrintableOptions
): string;
export function removeNonPrintable(
  str: string,
  options: RemoveNonPrintableOptions = {}
): string {
  const {
    keepSpace = true,
    keepNewlines = false,
    keepTabs = false,
    keepCarriageReturns = false,
  } = options;

  if (!str) return str;

  // Single-pass character filtering using range comparisons
  let result = "";

  for (const char of str) {
    const code = char.charCodeAt(0);

    // ASCII control characters (0x00-0x1F, 0x7F)
    if (code <= 0x1f || code === 0x7f) {
      // Check if we should keep specific characters
      if (code === 0x09 && keepTabs) {
        result += char; // Tab
      } else if (code === 0x0a && keepNewlines) {
        result += char; // Newline
      } else if (code === 0x0d && keepCarriageReturns) {
        result += char; // Carriage return
      }
      // Skip all other control characters
      continue;
    }

    // Space character (special case as it's technically printable)
    if (code === 0x20 && !keepSpace) {
      continue;
    }

    // C1 control codes: U+0080-U+009F
    if (code >= 0x80 && code <= 0x9f) {
      continue;
    }

    // Soft hyphen
    if (code === 0xad) {
      continue;
    }

    // Unicode control and format characters
    // U+200B-U+200C (zero-width space, zero-width non-joiner)
    if (code === 0x200b || code === 0x200c) {
      continue;
    }

    // Note: We keep U+200D (zero-width joiner) as it's used in emoji sequences

    // U+200E-U+200F (directional marks)
    if (code === 0x200e || code === 0x200f) {
      continue;
    }

    // U+202A-U+202E (directional formatting)
    if (code >= 0x202a && code <= 0x202e) {
      continue;
    }

    // U+2060-U+206F (word joiners, invisible characters)
    if (code >= 0x2060 && code <= 0x206f) {
      continue;
    }

    // U+FEFF (zero-width no-break space / BOM)
    if (code === 0xfeff) {
      continue;
    }

    // U+FFF0-U+FFFF (specials)
    if (code >= 0xfff0 && code <= 0xffff) {
      continue;
    }

    // Character is printable, add to result
    result += char;
  }

  return result;
}
