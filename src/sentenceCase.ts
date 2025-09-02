/**
 * Converts a string to sentence case (first letter of each sentence capitalized)
 * @param str - The input string to convert
 * @returns A sentence case string
 * @example
 * sentenceCase('hello world') // 'Hello world'
 * sentenceCase('HELLO WORLD') // 'Hello world'
 * sentenceCase('hello. world! how are you?') // 'Hello. World! How are you?'
 * sentenceCase('this is a test.this is another.') // 'This is a test. This is another.'
 */
export const sentenceCase = (str: string): string => {
  if (!str) return str;

  // Keep original for reference
  const original = str;

  // Convert to lowercase first
  let result = str.toLowerCase();

  // Capitalize first letter of the string (including if it starts with a quote)
  result = result.replace(/^(\s*["']?\s*)([a-z])/, (_match, prefix, letter) => {
    return prefix + letter.toUpperCase();
  });

  // Capitalize first letter after sentence endings (. ! ?)
  // But be smart about abbreviations
  result = result.replace(
    /([.!?])\s+([a-z])/g,
    (match, punctuation, letter, offset) => {
      if (punctuation === ".") {
        // Check if the period is at the end of a multi-letter abbreviation pattern
        const beforePeriod = result.substring(Math.max(0, offset - 10), offset);

        // Multi-letter abbreviation patterns: x.x.x or x.x.
        const isMultiLetterAbbrev =
          /\b([a-z]\.)+[a-z]$/.test(beforePeriod) ||
          /\b([a-z]\.){2,}$/.test(beforePeriod);

        if (isMultiLetterAbbrev) {
          // It's an abbreviation like u.s.a. or e.g.
          // Check if the original had uppercase after the space (indicating new sentence)
          const originalLetter = original[offset + match.indexOf(letter)];
          if (originalLetter && /[A-Z]/.test(originalLetter)) {
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
    /([.!?])\s*(['"])\s*([a-z])/g,
    (match, punctuation, _quote, letter) => {
      return (
        punctuation +
        match.slice(punctuation.length).replace(letter, letter.toUpperCase())
      );
    }
  );

  // Handle sentences without space after punctuation (but not abbreviations)
  result = result.replace(
    /([.!?])([a-z])/g,
    (match, punctuation, letter, offset) => {
      if (punctuation === ".") {
        const beforeChar = result[offset - 1];
        const afterNextChar = result[offset + 2];

        // Check if we're in the middle of an abbreviation pattern (e.g., u.s.a.)
        if (beforeChar && /[a-z]/i.test(beforeChar) && afterNextChar === ".") {
          return match; // Don't capitalize - we're in an abbreviation
        }
      }
      return punctuation + letter.toUpperCase();
    }
  );

  // Handle the special case of 'i' as a pronoun
  result = result.replace(/\bi\b/g, "I");

  // Handle common contractions with 'I'
  result = result.replace(/\bi'([a-z])/g, (_match, letter) => {
    return "I'" + letter;
  });

  return result;
};
