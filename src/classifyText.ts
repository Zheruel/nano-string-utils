/**
 * Classifies the type of text content with confidence scoring
 * @param text - The text to classify
 * @returns Classification object with type and confidence score
 * @example
 * classifyText('https://example.com') // { type: 'url', confidence: 1 }
 * @example
 * classifyText('user@example.com') // { type: 'email', confidence: 1 }
 * @example
 * classifyText('What is TypeScript?') // { type: 'question', confidence: 1 }
 * @example
 * classifyText('function foo() { return 42; }') // { type: 'code', confidence: 0.9 }
 * @example
 * classifyText('{"key": "value"}') // { type: 'json', confidence: 1 }
 * @example
 * classifyText('# Hello World') // { type: 'markdown', confidence: 0.8 }
 * @example
 * classifyText('<div>Hello</div>') // { type: 'html', confidence: 0.9 }
 * @example
 * classifyText('+1-555-123-4567') // { type: 'phone', confidence: 0.95 }
 * @example
 * classifyText('42.5 + 17.3 = 59.8') // { type: 'numeric', confidence: 0.85 }
 * @example
 * classifyText('Just plain text') // { type: 'text', confidence: 0.7 }
 */
export interface Classification {
  type:
    | "url"
    | "email"
    | "code"
    | "json"
    | "markdown"
    | "html"
    | "question"
    | "phone"
    | "numeric"
    | "text";
  confidence: number;
}

export function classifyText(text: string): Classification {
  if (!text || typeof text !== "string") {
    return { type: "text", confidence: 0.5 };
  }

  const trimmed = text.trim();

  // Handle empty or whitespace-only strings
  if (!trimmed) {
    return { type: "text", confidence: 0.5 };
  }

  // Check for URL (highest priority)
  if (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(trimmed)) {
    return { type: "url", confidence: 1 };
  }

  // Check for email
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { type: "email", confidence: 1 };
  }

  // Check for JSON (must be valid)
  if (trimmed[0] === "{" || trimmed[0] === "[") {
    try {
      JSON.parse(trimmed);
      return { type: "json", confidence: 1 };
    } catch {
      // Not valid JSON, continue checking
    }
  }

  // Check for phone number
  const phonePattern =
    /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,5}$/;
  if (phonePattern.test(trimmed.replace(/\s/g, ""))) {
    return { type: "phone", confidence: 0.95 };
  }

  // Check for question (interrogative)
  const questionPattern =
    /^(who|what|when|where|why|how|is|are|can|could|would|should|do|does|did|will|won't|isn't|aren't|wasn't|weren't|haven't|hasn't|hadn't|couldn't|wouldn't|shouldn't)[^.!]*\?$/i;
  if (questionPattern.test(trimmed) || /\?$/.test(trimmed)) {
    return {
      type: "question",
      confidence: trimmed.match(questionPattern) ? 1 : 0.8,
    };
  }

  // Check for HTML
  const htmlTags = (trimmed.match(/<[^>]+>/g) || []).length;
  const htmlScore = htmlTags / (trimmed.split(/\s+/).length || 1);
  if (htmlTags > 0 && (htmlScore > 0.2 || /^<!DOCTYPE|^<html/i.test(trimmed))) {
    return { type: "html", confidence: Math.min(0.6 + htmlScore * 0.4, 0.95) };
  }

  // Check for code first (before markdown since code can contain backticks)
  const codeIndicators = [
    /function\s+\w+\s*\(/,
    /const\s+\w+\s*=/,
    /let\s+\w+\s*=/,
    /var\s+\w+\s*=/,
    /if\s*\(/,
    /for\s*\(/,
    /while\s*\(/,
    /class\s+\w+/,
    /import\s+.*from/,
    /export\s+(default\s+)?/,
    /=>\s*{/,
    /\w+\s*:\s*\w+/, // Type annotations
    /[;{}()[\]]/, // Common code punctuation
  ];

  const codeMatches = codeIndicators.reduce(
    (count, pattern) => count + (pattern.test(trimmed) ? 1 : 0),
    0
  );

  const hasSemicolons = (trimmed.match(/;/g) || []).length > 1;
  const hasBraces = /[{}]/.test(trimmed);

  if (codeMatches > 2 || (codeMatches > 0 && (hasSemicolons || hasBraces))) {
    return {
      type: "code",
      confidence: Math.min(0.7 + codeMatches * 0.05, 0.95),
    };
  }

  // Check for Markdown (after code check)
  const markdownPatterns = [
    /^#{1,6}\s/m, // Headers
    /\*\*[^*]+\*\*/, // Bold
    /\*[^*]+\*/, // Italic
    /\[[^\]]+\]\([^)]+\)/, // Links
    /^[-*+]\s/m, // Lists
    /^>\s/m, // Blockquotes
    /```[\s\S]*```/, // Code blocks
    /`[^`]+`/, // Inline code (but only if not classified as code)
  ];
  const markdownMatches = markdownPatterns.reduce(
    (count, pattern) => count + (pattern.test(trimmed) ? 1 : 0),
    0
  );
  if (markdownMatches > 0) {
    return {
      type: "markdown",
      confidence: Math.min(0.6 + markdownMatches * 0.1, 0.9),
    };
  }

  // Check for numeric content
  const numbers = trimmed.match(/\d+\.?\d*/g) || [];
  const nonSpaceLength = trimmed.replace(/[\s,]/g, "").length;
  const numericRatio =
    nonSpaceLength > 0 ? numbers.join("").length / nonSpaceLength : 0;
  const hasOperators = /[+\-*/=%]/.test(trimmed);
  const isNumberList = /^[\d,.\s]+$/.test(trimmed) && numbers.length > 2;

  if (
    numericRatio > 0.5 ||
    (numericRatio > 0.3 && hasOperators) ||
    isNumberList
  ) {
    return {
      type: "numeric",
      confidence: Math.min(0.6 + numericRatio * 0.4, 0.9),
    };
  }

  // Default to plain text
  return { type: "text", confidence: 0.7 };
}
