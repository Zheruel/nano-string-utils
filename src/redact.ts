/**
 * Redacts sensitive information from text strings.
 *
 * **SECURITY NOTICE**: This function is designed for UI/logging purposes to prevent
 * accidental exposure of sensitive data. It is NOT a substitute for proper data
 * security practices, encryption, or compliance controls. Do not rely on this as
 * your primary security layer.
 *
 * Supports built-in patterns for common sensitive data types:
 * - `ssn`: Social Security Numbers (US format)
 * - `creditCard`: Credit card numbers (Visa, MasterCard, Amex, Discover)
 * - `email`: Email addresses
 * - `phone`: Phone numbers (US formats)
 *
 * @param text - The text to redact sensitive information from
 * @param options - Configuration options for redaction behavior
 * @param options.types - Array of built-in redaction types to apply (default: all types)
 * @param options.customPatterns - Array of custom patterns with replacement functions
 * @param options.strategy - Redaction strategy: 'full' (complete masking) or 'partial' (show last N chars)
 * @param options.partialLength - Number of characters to show when using 'partial' strategy (default: 4)
 * @returns The text with sensitive information redacted
 *
 * @example
 * // Redact all types with partial strategy
 * redact('My SSN is 123-45-6789')
 * // => 'My SSN is ***-**-6789'
 *
 * @example
 * // Full redaction
 * redact('Card: 4532-1234-5678-9010', { strategy: 'full' })
 * // => 'Card: ****************'
 *
 * @example
 * // Specific types only
 * redact('Email: user@example.com, SSN: 123-45-6789', { types: ['email'] })
 * // => 'Email: u***@example.com, SSN: 123-45-6789'
 *
 * @example
 * // Custom patterns
 * redact('Secret: ABC-123', {
 *   customPatterns: [{ pattern: /[A-Z]{3}-\d{3}/g, replacement: '[REDACTED]' }]
 * })
 * // => 'Secret: [REDACTED]'
 */
export function redact(
  text: string,
  options: {
    types?: ("ssn" | "creditCard" | "email" | "phone")[];
    customPatterns?: Array<{
      pattern: RegExp;
      replacement: string | ((match: string) => string);
    }>;
    strategy?: "full" | "partial";
    partialLength?: number;
  } = {}
): string {
  const {
    types = ["ssn", "creditCard", "email", "phone"],
    customPatterns = [],
    strategy = "partial",
    partialLength = 4,
  } = options;

  let result = text;

  // Built-in redaction patterns
  const patterns: Record<
    string,
    { pattern: RegExp; replacer: (match: string) => string }
  > = {
    ssn: {
      // Matches: 123-45-6789, 123 45 6789, 123456789
      pattern: /\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/g,
      replacer: (match: string) => {
        if (strategy === "full") return "***-**-****";
        const cleaned = match.replace(/[-\s]/g, "");
        const lastN = cleaned.slice(-partialLength);

        // Always use dash format for output
        if (partialLength >= 4) {
          // Show last 4+: ***-**-6789
          return `***-**-${lastN}`;
        } else if (partialLength === 3) {
          // Show last 3: ***-**-*789
          return `***-**-*${lastN}`;
        } else if (partialLength === 2) {
          // Show last 2: ***-**-**89
          return `***-**-**${lastN}`;
        } else {
          // Show last 1: ***-**-***9
          return `***-**-***${lastN}`;
        }
      },
    },
    creditCard: {
      // Matches: 4532-1234-5678-9010, 4532 1234 5678 9010, 4532123456789010
      // Also matches Amex: 3782-822463-10005 (15 digits)
      pattern: /\b\d{4}[-\s]?\d{4,6}[-\s]?\d{4,5}[-\s]?\d{0,4}\b/g,
      replacer: (match: string) => {
        if (strategy === "full") return "*".repeat(match.length);
        const cleaned = match.replace(/[-\s]/g, "");
        const last4 = cleaned.slice(-partialLength);
        const separator = match.includes("-")
          ? "-"
          : match.includes(" ")
          ? " "
          : "";
        if (separator) {
          const groups = Math.floor(cleaned.length / 4);
          return "**** ".repeat(groups - 1).trim() + ` ${last4}`;
        }
        return "*".repeat(cleaned.length - partialLength) + last4;
      },
    },
    email: {
      // Matches email addresses
      pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
      replacer: (match: string) => {
        if (strategy === "full") return "***@***.***";
        const parts = match.split("@");
        const username = parts[0];
        const domain = parts[1];
        if (!username || !domain) return match; // Shouldn't happen with valid regex match
        // Show first 1-3 characters: 1 char for length 2, 3 chars for length 3+
        const visibleChars =
          username.length === 2 ? 1 : Math.min(username.length, 3);
        const redactedUsername = username.slice(0, visibleChars) + "***";
        return `${redactedUsername}@${domain}`;
      },
    },
    phone: {
      // Matches: (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890, +1-123-456-7890
      pattern:
        /(?:\+?1[-.\s]?)?(\()?([0-9]{3})(\))?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})\b/g,
      replacer: (match: string) => {
        const cleaned = match.replace(/[^\d]/g, "");
        // Remove country code if present
        const digits =
          cleaned.length === 11 && cleaned.startsWith("1")
            ? cleaned.slice(1)
            : cleaned;
        const lastN = digits.slice(-partialLength);

        // Determine format based on original (check before country code)
        const hasParens = match.includes("(") && match.includes(")");
        const hasDots = /\d\.\d/.test(match); // Check if dots separate digits

        if (strategy === "full") {
          if (hasParens) return "(***) ***-****";
          if (hasDots) return "***.***.****";
          if (match.includes("-")) return "***-***-****";
          return "**********";
        }

        if (hasParens) {
          return `(***) ***-${lastN}`;
        } else if (hasDots) {
          return `***.***-${lastN}`;
        } else if (match.includes("-")) {
          return `***-***-${lastN}`;
        } else {
          // No separators
          const maskedLength = 10 - partialLength;
          return "*".repeat(maskedLength) + lastN;
        }
      },
    },
  };

  // Apply built-in patterns
  for (const type of types) {
    const patternConfig = patterns[type];
    if (patternConfig) {
      const { pattern, replacer } = patternConfig;
      result = result.replace(pattern, replacer);
    }
  }

  // Apply custom patterns
  for (const { pattern, replacement } of customPatterns) {
    if (typeof replacement === "function") {
      result = result.replace(pattern, replacement);
    } else {
      result = result.replace(pattern, replacement);
    }
  }

  return result;
}
