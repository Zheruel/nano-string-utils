import type { SentenceCase } from "./types/string-literals.js";

// Pre-compiled regex patterns for better performance
const SENTENCE_START = /^(\s*["']?\s*)([a-z])/;
const SENTENCE_AFTER_PUNCT = /([.!?])\s+([a-z])/g;
const SENTENCE_QUOTE_AFTER_PUNCT = /([.!?])\s*(['"])\s*([a-z])/g;
const SENTENCE_NO_SPACE = /([.!?])([a-z])/g;
const MULTI_LETTER_ABBREV1 = /\b([a-z]\.)+[a-z]$/;
const MULTI_LETTER_ABBREV2 = /\b([a-z]\.){2,}$/;
const I_PRONOUN = /\bi\b/g;
const I_CONTRACTION = /\bi'([a-z])/g;
const UPPERCASE_CHECK = /[A-Z]/;
const LETTER_CHECK = /[a-z]/i;

/**
 * Converts a string to sentence case (first letter of each sentence capitalized)
 * @param str - The input string to convert
 * @returns A sentence case string
 * @example
 * ```ts
 * // Basic usage
 * sentenceCase('hello world') // 'Hello world'
 * sentenceCase('HELLO WORLD') // 'Hello world'
 * sentenceCase('hello. world! how are you?') // 'Hello. World! How are you?'
 * sentenceCase('this is a test.this is another.') // 'This is a test. This is another.'
 *
 * // TypeScript template literal types
 * const result = sentenceCase('hello-world')
 * // result type: "Hello world" (literal type)
 *
 * // User-generated content normalization
 * type UserInput = 'SHOUTING TEXT' | 'normal text' | 'MiXeD cAsE'
 * function normalizeComment(input: UserInput): SentenceCase<UserInput> {
 *   return sentenceCase(input) as SentenceCase<UserInput>
 * }
 * const comment = normalizeComment('SHOUTING TEXT')
 * // comment type: "Shouting text"
 *
 * // Error message formatting
 * const errorMsg = sentenceCase('INVALID_USER_INPUT' as const)
 * // errorMsg type: "Invalid user input"
 * throw new Error(errorMsg) // Clean, readable error message
 * ```
 */
export function sentenceCase<T extends string>(str: T): SentenceCase<T>;
export function sentenceCase(str: string): string;
export function sentenceCase(str: string): string {
  if (!str) return str;

  // Keep original for reference
  const original = str;

  // Convert to lowercase first
  let result = str.toLowerCase();

  // Capitalize first letter of the string (including if it starts with a quote)
  result = result.replace(SENTENCE_START, (_match, prefix, letter) => {
    return prefix + letter.toUpperCase();
  });

  // Capitalize first letter after sentence endings (. ! ?)
  // But be smart about abbreviations
  result = result.replace(
    SENTENCE_AFTER_PUNCT,
    (match, punctuation, letter, offset) => {
      if (punctuation === ".") {
        // Check if the period is at the end of a multi-letter abbreviation pattern
        const beforePeriod = result.substring(Math.max(0, offset - 10), offset);

        // Multi-letter abbreviation patterns: x.x.x or x.x.
        const isMultiLetterAbbrev =
          MULTI_LETTER_ABBREV1.test(beforePeriod) ||
          MULTI_LETTER_ABBREV2.test(beforePeriod);

        if (isMultiLetterAbbrev) {
          // It's an abbreviation like u.s.a. or e.g.
          // Check if the original had uppercase after the space (indicating new sentence)
          const originalLetter = original[offset + match.indexOf(letter)];
          if (originalLetter && UPPERCASE_CHECK.test(originalLetter)) {
            // Original was uppercase - it's a new sentence after the abbreviation
            return (
              punctuation +
              match
                .slice(punctuation.length)
                .replace(letter, letter.toUpperCase())
            );
          }
          // Original was lowercase - continuation after abbreviation
          return match;
        }
      }
      // Normal sentence ending - capitalize
      return (
        punctuation +
        match.slice(punctuation.length).replace(letter, letter.toUpperCase())
      );
    }
  );

  // Handle quotes after sentence endings
  result = result.replace(
    SENTENCE_QUOTE_AFTER_PUNCT,
    (match, punctuation, _quote, letter) => {
      return (
        punctuation +
        match.slice(punctuation.length).replace(letter, letter.toUpperCase())
      );
    }
  );

  // Handle sentences without space after punctuation (but not abbreviations)
  result = result.replace(
    SENTENCE_NO_SPACE,
    (match, punctuation, letter, offset) => {
      if (punctuation === ".") {
        const beforeChar = result[offset - 1];
        const afterNextChar = result[offset + 2];

        // Check if we're in the middle of an abbreviation pattern (e.g., u.s.a.)
        if (
          beforeChar &&
          LETTER_CHECK.test(beforeChar) &&
          afterNextChar === "."
        ) {
          return match; // Don't capitalize - we're in an abbreviation
        }
      }
      return punctuation + letter.toUpperCase();
    }
  );

  // Handle the special case of 'i' as a pronoun
  result = result.replace(I_PRONOUN, "I");

  // Handle common contractions with 'I'
  result = result.replace(I_CONTRACTION, (_match, letter) => {
    return "I'" + letter;
  });

  return result;
}
