/**
 * Splits text into sentences while intelligently handling abbreviations and edge cases
 * @param text - The input text to split into sentences
 * @returns An array of sentences extracted from the text
 * @example
 * smartSplit('Hello world. How are you?') // ['Hello world.', 'How are you?']
 * smartSplit('Dr. Smith went to the store. He bought milk.') // ['Dr. Smith went to the store.', 'He bought milk.']
 * smartSplit('The price is $3.50. What a deal!') // ['The price is $3.50.', 'What a deal!']
 */
export const smartSplit = (text: string): string[] => {
  if (!text) return [];

  // Markers for protecting special patterns
  const ELLIPSIS_BREAK = "\x00"; // Ellipsis that should break sentences
  const ELLIPSIS_KEEP = "\x01"; // Ellipsis that should not break
  const DECIMAL = "\x02";
  const ABBREV = "\x03";

  let processed = text;

  // Handle ellipsis - check if it's followed by space + capital (sentence break)
  processed = processed.replace(/\.{3}(\s+)([A-Z])/g, `${ELLIPSIS_BREAK}$1$2`);
  processed = processed.replace(/\.{3}/g, ELLIPSIS_KEEP);

  // Protect decimal numbers
  processed = processed.replace(/(\d)\.(\d)/g, `$1${DECIMAL}$2`);

  // Protect common abbreviations
  const abbrevs = [
    "Dr",
    "Mr",
    "Mrs",
    "Ms",
    "Prof",
    "Sr",
    "Jr",
    "Ph\\.D",
    "M\\.D",
    "B\\.A",
    "M\\.A",
    "B\\.S",
    "M\\.S",
    "M\\.I\\.T",
    "U\\.S",
    "U\\.K",
    "Inc",
    "Ltd",
    "Co",
    "Corp",
  ];

  // Common words that typically start sentences
  const sentenceStarters = [
    "The",
    "He",
    "She",
    "It",
    "They",
    "We",
    "I",
    "You",
    "This",
    "That",
    "These",
    "Those",
    "There",
    "Here",
  ];
  const startersPattern = sentenceStarters.join("|");

  abbrevs.forEach((abbrev) => {
    // Protect abbreviation, but if followed by common sentence starters, treat as sentence end
    const regex = new RegExp(
      `\\b(${abbrev})\\.(?!\\s+(${startersPattern})\\b)`,
      "gi"
    );
    processed = processed.replace(regex, `$1${ABBREV}`);
  });

  // Split on sentence boundaries: [.!?] + optional quotes/brackets + space + capital letter
  // or [.!?] at end of string
  const sentences: string[] = [];
  let currentSentence = "";

  for (let i = 0; i < processed.length; i++) {
    currentSentence += processed[i];

    // Check if we're at a potential sentence boundary
    if (
      processed[i] === "." ||
      processed[i] === "!" ||
      processed[i] === "?" ||
      processed[i] === ELLIPSIS_BREAK
    ) {
      // Look ahead for optional quotes/brackets and space
      let j = i + 1;
      let extras = "";

      // Collect any trailing punctuation (quotes, brackets, etc)
      while (
        j < processed.length &&
        /["\'\)\]]*/.test(processed[j]!) &&
        processed[j] !== " "
      ) {
        extras += processed[j]!;
        j++;
      }

      // Check for space followed by capital letter (new sentence)
      if (j < processed.length && processed[j] === " ") {
        let k = j + 1;
        // Skip multiple spaces
        while (k < processed.length && processed[k] === " ") {
          k++;
        }

        // If followed by capital letter, it's a sentence boundary
        if (k < processed.length && /[A-Z]/.test(processed[k]!)) {
          currentSentence += extras;
          sentences.push(currentSentence.trim());
          currentSentence = "";
          i = j; // Skip the space(s)
          continue;
        }
      }

      // Not a sentence boundary, add the extras back
      currentSentence += extras;
      i = j - 1;
    }
  }

  // Add any remaining text as the last sentence
  if (currentSentence.trim()) {
    sentences.push(currentSentence.trim());
  }

  // Restore protected patterns
  return sentences.map((s) =>
    s
      .replace(new RegExp(ELLIPSIS_BREAK, "g"), "...")
      .replace(new RegExp(ELLIPSIS_KEEP, "g"), "...")
      .replace(new RegExp(DECIMAL, "g"), ".")
      .replace(new RegExp(ABBREV, "g"), ".")
  );
};
