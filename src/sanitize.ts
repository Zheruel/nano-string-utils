/**
 * Options for string sanitization
 */
export interface SanitizeOptions {
  /** HTML tags to preserve (default: none) */
  allowedTags?: string[];
  /** HTML attributes to keep (default: none) */
  allowedAttributes?: string[];
  /** Remove all HTML tags (default: true) */
  stripHtml?: boolean;
  /** Escape HTML entities instead of stripping (default: false) */
  escapeHtml?: boolean;
  /** Remove script tags and JavaScript events (default: true) */
  removeScripts?: boolean;
  /** Remove non-printable/control characters (default: true) */
  removeNonPrintable?: boolean;
  /** Normalize whitespace characters (default: false) */
  normalizeWhitespace?: boolean;
  /** Maximum allowed length (default: none) */
  maxLength?: number;
  /** Custom patterns to remove */
  removePatterns?: RegExp[];
}

/**
 * Sanitizes a string for safe use in web applications by removing or escaping potentially dangerous content
 * @param str - The string to sanitize
 * @param options - Sanitization options
 * @returns Sanitized string
 * @example
 * sanitize("<script>alert('xss')</script>Hello") // "Hello"
 * @example
 * sanitize("<b>Bold</b> text", { allowedTags: ["b"] }) // "<b>Bold</b> text"
 * @example
 * sanitize("Hello\x00World") // "HelloWorld"
 * @example
 * sanitize("<img src=x onerror=alert(1)>") // ""
 * @example
 * sanitize("javascript:alert(1)") // ""
 * @example
 * sanitize("<div onclick='alert(1)'>Click</div>") // "Click"
 * @example
 * sanitize("Hello   World", { normalizeWhitespace: true }) // "Hello World"
 * @example
 * sanitize("Long text here", { maxLength: 10 }) // "Long text "
 */
export function sanitize(str: string, options: SanitizeOptions = {}): string {
  if (!str || typeof str !== "string") {
    return "";
  }

  const {
    allowedTags = [],
    allowedAttributes = [],
    stripHtml = true,
    escapeHtml = false,
    removeScripts = true,
    removeNonPrintable = true,
    normalizeWhitespace = false,
    maxLength,
    removePatterns = [],
  } = options;

  let result = str;

  // Remove custom patterns first
  for (const pattern of removePatterns) {
    result = result.replace(pattern, "");
  }

  // Remove dangerous URI schemes (but not when inside HTML attributes)
  if (removeScripts) {
    // Match standalone URIs (not inside HTML attributes)
    // This only matches URIs that are standalone (start of string, after whitespace, or after non-attribute context)
    result = result.replace(
      /(?:^|\s|[^=\s])(?:javascript|data|vbscript|mhtml|x-javascript|mocha|livescript):[^\s<>]*/gi,
      (match, offset, string) => {
        // Check if this is inside an HTML attribute by looking backwards for '='
        const beforeMatch = string.substring(0, offset);
        const lastEquals = beforeMatch.lastIndexOf("=");
        const lastSpace = beforeMatch.lastIndexOf(" ");
        const lastGt = beforeMatch.lastIndexOf(">");

        // If there's an '=' after the last '>' or at the start, this might be an attribute
        // Let the HTML attribute removal handle it instead
        if (lastEquals > Math.max(lastGt, -1) && lastEquals > lastSpace) {
          return match; // Keep it, let HTML attribute removal handle it
        }

        return match.replace(
          /(?:javascript|data|vbscript|mhtml|x-javascript|mocha|livescript):[^\s<>]*/gi,
          ""
        );
      }
    );
  }

  // Handle HTML content
  if ((stripHtml || removeScripts) && !(escapeHtml && !stripHtml)) {
    // Remove script tags and their content
    if (removeScripts) {
      // Remove complete script tags
      result = result.replace(
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        ""
      );
      // Remove malformed/unclosed script tags
      result = result.replace(/<script\b[^>]*>.*$/gi, "");
      // Remove style tags
      result = result.replace(
        /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,
        ""
      );
    }

    if (stripHtml) {
      if (allowedTags.length > 0) {
        // Keep allowed tags but strip others
        const allowedTagsPattern = allowedTags.join("|");
        const tagRegex = new RegExp(
          `<(?!\\/?(?:${allowedTagsPattern})\\b)[^>]+>`,
          "gi"
        );
        result = result.replace(tagRegex, "");

        // Remove dangerous attributes from allowed tags
        if (removeScripts && allowedTags.length > 0) {
          // Remove event handlers (onclick, onmouseover, etc.)
          result = result.replace(/\son\w+\s*=\s*["'][^"']*["']/gi, "");
          result = result.replace(/\son\w+\s*=\s*[^\s>]*/gi, "");

          // Remove javascript: in href/src (remove the whole attribute)
          // Must handle both quoted and unquoted attributes
          result = result.replace(
            /\s(href|src|action)\s*=\s*["'](?:javascript|data|vbscript):[^"']*["']/gi,
            ""
          );
          result = result.replace(
            /\s(href|src|action)\s*=\s*(?:javascript|data|vbscript):[^\s>]*/gi,
            ""
          );
        }

        // Remove attributes not in allowedAttributes
        if (allowedAttributes.length > 0) {
          const allowedAttrsPattern = allowedAttributes.join("|");
          const attrRegex = new RegExp(
            `\\s(?!(?:${allowedAttrsPattern})\\s*=)[a-zA-Z-]+\\s*=\\s*["'][^"']*["']`,
            "gi"
          );
          result = result.replace(attrRegex, "");
        }
      } else {
        // Strip all HTML
        result = result.replace(/<[^>]+>/g, "");
      }

      // Decode HTML entities that might have been used to bypass filters
      result = result
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .replace(/&#x2F;/g, "/")
        .replace(/&amp;/g, "&");
    }
  }

  // Escape HTML if requested (and not already stripped)
  if (escapeHtml && !stripHtml) {
    result = result
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  }

  // Remove non-printable characters
  if (removeNonPrintable) {
    // Remove control characters (0x00-0x1F, 0x7F-0x9F) except tab, newline, carriage return
    result = result.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, "");
  }

  // Normalize whitespace
  if (normalizeWhitespace) {
    // Replace multiple spaces, tabs, and newlines with single space
    result = result.replace(/\s+/g, " ").trim();
  }

  // Enforce max length
  if (maxLength && maxLength > 0) {
    result = result.slice(0, maxLength);
  }

  return result;
}
