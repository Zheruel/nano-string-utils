/**
 * Options for word wrapping
 */
export interface WrapOptions {
  /** Maximum line width (default: 80) */
  width?: number;
  /** Line separator (default: '\n') */
  separator?: string;
  /** Break words that exceed width (default: false) */
  breakWords?: boolean;
}

/**
 * Word-wraps text to a specified width
 * @param str - The string to wrap
 * @param options - Wrap options or width number
 * @returns The wrapped string
 * @example
 * ```ts
 * // Basic usage with default width (80)
 * wrap('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
 *
 * // Specify width
 * wrap('Hello world, how are you today?', 15)
 * // 'Hello world,\nhow are you\ntoday?'
 *
 * // With options object
 * wrap('Hello world, how are you today?', { width: 15 })
 * // 'Hello world,\nhow are you\ntoday?'
 *
 * // Custom separator
 * wrap('Hello world, how are you?', { width: 15, separator: '<br>' })
 * // 'Hello world,<br>how are you?'
 *
 * // Break long words
 * wrap('Supercalifragilisticexpialidocious', { width: 10, breakWords: true })
 * // 'Supercalif\nragilistic\nexpialidoc\nious'
 *
 * // Preserve long words (default)
 * wrap('Supercalifragilisticexpialidocious is awesome', { width: 10 })
 * // 'Supercalifragilisticexpialidocious\nis awesome'
 *
 * // Preserve existing newlines
 * wrap('Line 1\nLine 2 is longer', { width: 10 })
 * // 'Line 1\nLine 2 is\nlonger'
 *
 * // Terminal/console output formatting
 * const helpText = wrap(longDescription, { width: 80 })
 *
 * // HTML formatting
 * const htmlWrapped = wrap(text, { width: 60, separator: '<br>\n' })
 * ```
 */
export function wrap(str: string, options?: WrapOptions | number): string {
  if (str == null) return str;
  if (!str) return str;

  const opts: WrapOptions =
    typeof options === "number" ? { width: options } : options || {};

  const width = opts.width ?? 80;
  const separator = opts.separator ?? "\n";
  const breakWords = opts.breakWords ?? false;

  if (width <= 0) return str;

  // Split by existing newlines first, then process each line
  const lines = str.split("\n");
  const result: string[] = [];

  for (const line of lines) {
    if (!line) {
      result.push("");
      continue;
    }

    const words = line.split(/\s+/);
    let currentLine = "";

    for (const word of words) {
      if (!word) continue;

      // Handle words longer than width
      if (word.length > width) {
        if (currentLine) {
          result.push(currentLine);
          currentLine = "";
        }

        if (breakWords) {
          // Break the word into chunks
          let remaining = word;
          while (remaining.length > width) {
            result.push(remaining.slice(0, width));
            remaining = remaining.slice(width);
          }
          if (remaining) {
            currentLine = remaining;
          }
        } else {
          // Keep word intact
          result.push(word);
        }
        continue;
      }

      // Normal word processing
      if (!currentLine) {
        currentLine = word;
      } else if (currentLine.length + 1 + word.length <= width) {
        currentLine += " " + word;
      } else {
        result.push(currentLine);
        currentLine = word;
      }
    }

    if (currentLine) {
      result.push(currentLine);
    }
  }

  return result.join(separator);
}
