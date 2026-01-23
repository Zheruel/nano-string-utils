/**
 * Options for string masking
 */
export interface MaskOptions {
  /** Number of characters to show (default: 4) */
  show?: number;
  /** Show characters from start instead of end (default: false) */
  showStart?: boolean;
  /** Character to use for masking (default: '*') */
  maskChar?: string;
}

/**
 * Masks a string, showing only a portion of the original characters
 * @param str - The string to mask
 * @param options - Masking options or number of characters to show
 * @returns The masked string
 * @example
 * ```ts
 * // Basic usage - show last 4 characters
 * mask('4532123456789010') // '************9010'
 * mask('secret-password') // '************word'
 *
 * // Show first characters instead
 * mask('john@example.com', { showStart: true }) // 'john************'
 * mask('1234567890', { show: 3, showStart: true }) // '123*******'
 *
 * // Custom mask character
 * mask('password123', { maskChar: '•' }) // '•••••••d123'
 * mask('secret', { maskChar: 'X' }) // 'XXcret'
 *
 * // Show specific number of characters
 * mask('4532123456789010', { show: 6 }) // '**********789010'
 *
 * // Short strings (show > length returns original)
 * mask('abc', { show: 5 }) // 'abc'
 *
 * // Mask entire string
 * mask('secret', { show: 0 }) // '******'
 *
 * // Credit card masking
 * const cardNum = mask('4532-1234-5678-9010'.replace(/-/g, ''))
 * // '************9010'
 *
 * // Email masking
 * const email = mask('user@example.com', { show: 4, showStart: true })
 * // 'user************'
 * ```
 */
export function mask(str: string, options?: MaskOptions | number): string {
  if (str == null) return str;
  if (!str) return str;

  const opts: MaskOptions =
    typeof options === "number" ? { show: options } : options || {};

  const show = opts.show ?? 4;
  const showStart = opts.showStart ?? false;
  const maskChar = (opts.maskChar ?? "*").charAt(0) || "*";

  const arr = Array.from(str);
  const len = arr.length;

  if (show >= len) return str;

  const maskLen = len - show;
  const masked = maskChar.repeat(maskLen);

  if (showStart) {
    return arr.slice(0, show).join("") + masked;
  } else {
    return masked + arr.slice(len - show).join("");
  }
}
