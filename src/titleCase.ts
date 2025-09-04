// Pre-compiled regex patterns for better performance
const TITLE_SPLIT = /(\s+|[^\s\w'-]+)/g;
const TITLE_HAS_LETTER = /[A-Za-z]/;
const TITLE_ACRONYM = /^[A-Z]{2,4}$/;

/**
 * Converts a string to title case with proper capitalization rules
 * @param str - The string to convert
 * @param options - Optional configuration
 * @returns The title-cased string
 * @example
 * titleCase('the quick brown fox') // 'The Quick Brown Fox'
 * titleCase('a tale of two cities') // 'A Tale of Two Cities'
 * titleCase('mother-in-law') // 'Mother-in-Law'
 */

const DEFAULT_EXCEPTIONS = new Set([
  "a",
  "an",
  "the",
  "and",
  "but",
  "or",
  "nor",
  "for",
  "yet",
  "so",
  "at",
  "by",
  "in",
  "of",
  "on",
  "to",
  "up",
  "as",
  "from",
  "with",
  "into",
  "onto",
  "upon",
  "about",
  "after",
  "against",
  "along",
  "among",
  "around",
  "before",
  "behind",
  "below",
  "beneath",
  "beside",
  "between",
  "beyond",
  "during",
  "except",
  "inside",
  "outside",
  "over",
  "through",
  "under",
  "until",
  "without",
]);

export interface TitleCaseOptions {
  exceptions?: string[];
}

export function titleCase(str: string, options: TitleCaseOptions = {}): string {
  if (!str || !str.trim()) return "";

  const exceptions = options.exceptions
    ? new Set([
        ...DEFAULT_EXCEPTIONS,
        ...options.exceptions.map((w) => w.toLowerCase()),
      ])
    : DEFAULT_EXCEPTIONS;

  // Split into tokens preserving delimiters
  const tokens = str.split(TITLE_SPLIT).filter(Boolean);

  let wordIndex = 0;
  const wordCount = tokens.filter((t) => TITLE_HAS_LETTER.test(t)).length;

  return tokens
    .map((token) => {
      // If it's not a word (space or punctuation), return as-is
      if (!TITLE_HAS_LETTER.test(token)) {
        return token;
      }

      const isFirstWord = wordIndex === 0;
      const isLastWord = wordIndex === wordCount - 1;
      wordIndex++;

      // Check if it's likely an acronym (all uppercase with 2-4 letters)
      // Common acronyms are typically short (FBI, CIA, USA, NASA, etc.)
      if (TITLE_ACRONYM.test(token)) {
        return token;
      }

      // Handle hyphenated words
      if (token.includes("-")) {
        return token
          .split("-")
          .map((part) => {
            if (!part) return part;
            return capitalizeWord(part);
          })
          .join("-");
      }

      // Handle contractions
      if (token.includes("'")) {
        const parts = token.split("'");
        const firstPart = parts[0] || "";
        const secondPart = parts[1] || "";
        return capitalizeWord(firstPart) + "'" + secondPart.toLowerCase();
      }

      const lowerToken = token.toLowerCase();

      // Check if it's an exception word (but not first or last)
      if (!isFirstWord && !isLastWord && exceptions.has(lowerToken)) {
        return lowerToken;
      }

      return capitalizeWord(token);
    })
    .join("");
}

function capitalizeWord(word: string): string {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
