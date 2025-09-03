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

  let result = str;

  // Build the regex pattern based on options
  // ASCII control characters: 0x00-0x1F and 0x7F
  // We'll handle space (0x20), tab (0x09), newline (0x0A), and carriage return (0x0D) separately

  // First, remove all control characters including Unicode ones
  // Unicode categories:
  // \p{Cc} - Control characters
  // \p{Cf} - Format characters (like zero-width spaces, directional marks)
  // We'll use individual character ranges for broader compatibility

  // ASCII control characters (0x00-0x1F, 0x7F)
  const asciiControlChars = [];
  for (let i = 0; i <= 31; i++) {
    // Skip characters we might want to keep
    if (i === 9 && keepTabs) continue; // Tab
    if (i === 10 && keepNewlines) continue; // Newline
    if (i === 13 && keepCarriageReturns) continue; // Carriage return
    if (i === 32 && keepSpace) continue; // Space (though it's 0x20, not in 0x00-0x1F)
    asciiControlChars.push(String.fromCharCode(i));
  }
  asciiControlChars.push(String.fromCharCode(127)); // DEL character

  // Remove ASCII control characters
  const asciiPattern = new RegExp(
    `[${asciiControlChars
      .map(
        (c) => c.replace(/[\\\]\[]/g, "\\$&") // Escape special regex characters
      )
      .join("")}]`,
    "g"
  );
  result = result.replace(asciiPattern, "");

  // Remove Unicode control and format characters
  // These include:
  // U+200B-U+200C (zero-width space, zero-width non-joiner)
  // U+200E-U+200F (directional marks)
  // U+202A-U+202E (directional formatting)
  // U+2060-U+206F (word joiners, invisible characters)
  // U+FFF0-U+FFFF (specials)
  // U+FEFF (zero-width no-break space / BOM)
  // Note: We keep U+200D (zero-width joiner) as it's used in emoji sequences
  result = result.replace(
    /[\u200B\u200C\u200E\u200F\u202A-\u202E\u2060-\u206F\uFFF0-\uFFFF\uFEFF]/g,
    ""
  );

  // Remove other Unicode control characters (C0 and C1 control codes)
  // C1 control codes: U+0080-U+009F
  result = result.replace(/[\u0080-\u009F]/g, "");

  // Remove soft hyphen
  result = result.replace(/\u00AD/g, "");

  return result;
}
