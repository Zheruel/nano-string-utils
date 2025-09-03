export interface HighlightOptions {
  caseSensitive?: boolean;
  wholeWord?: boolean;
  wrapper?: [string, string];
  className?: string;
  escapeHtml?: boolean;
}

/**
 * Highlights search terms in text by wrapping matches with markers
 * @param text - The text to search in
 * @param terms - The term(s) to highlight (string or array of strings)
 * @param options - Configuration options
 * @returns Text with highlighted terms
 * @example
 * highlight("The quick brown fox", "quick")
 * // => "The <mark>quick</mark> brown fox"
 *
 * highlight("Error: Connection failed", ["error", "failed"], { wrapper: ['**', '**'] })
 * // => "**Error**: Connection **failed**"
 */
export function highlight(
  text: string,
  terms: string | string[],
  options: HighlightOptions = {}
): string {
  if (!text || !terms || (Array.isArray(terms) && terms.length === 0)) {
    return text || "";
  }

  const {
    caseSensitive = false,
    wholeWord = false,
    wrapper = ["<mark>", "</mark>"],
    className,
    escapeHtml = false,
  } = options;

  const termsArray = Array.isArray(terms) ? terms : [terms];
  const uniqueTerms = [...new Set(termsArray.filter((term) => term))];

  if (uniqueTerms.length === 0) {
    return text;
  }

  // Sort terms by length (longest first) to handle overlapping terms correctly
  // This ensures "JavaScript" is matched before "Java"
  const sortedTerms = uniqueTerms.sort((a, b) => b.length - a.length);

  // Escape special regex characters in search terms
  const escapedTerms = sortedTerms.map((term) =>
    term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );

  // Build the regex pattern
  const boundary = wholeWord ? "\\b" : "";
  const pattern = escapedTerms
    .map((term) => `${boundary}(${term})${boundary}`)
    .join("|");

  const flags = caseSensitive ? "g" : "gi";
  const regex = new RegExp(pattern, flags);

  // Build the wrapper with optional className
  let openTag = wrapper[0];
  let closeTag = wrapper[1];

  if (className && wrapper[0] === "<mark>") {
    openTag = `<mark class="${className}">`;
  }

  // Optionally escape HTML in the text first
  let processedText = text;
  if (escapeHtml) {
    processedText = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Replace matches while preserving original case
  return processedText.replace(regex, (match) => {
    return `${openTag}${match}${closeTag}`;
  });
}
