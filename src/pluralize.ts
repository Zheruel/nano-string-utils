/**
 * Convert a singular word to plural form using English pluralization rules.
 * Optionally takes a count to conditionally pluralize based on the number.
 *
 * @param word - The word to pluralize
 * @param count - Optional count to determine if pluralization is needed
 * @returns The pluralized word (or original if count is 1)
 * @example
 * pluralize('box') // 'boxes'
 * pluralize('item', 1) // 'item'
 * pluralize('item', 2) // 'items'
 * pluralize('person') // 'people'
 */
export function pluralize(word: string, count?: number): string {
  if (count === 1) return word;

  // Handle empty string
  if (!word) return word + "s";

  // Preserve original casing
  const isUpperCase = word === word.toUpperCase();
  const isCapitalized = word[0] === word[0]?.toUpperCase();
  const lowerWord = word.toLowerCase();

  // Common irregular plurals (minimal set for size)
  const irregulars: Record<string, string> = {
    person: "people",
    child: "children",
    man: "men",
    woman: "women",
    tooth: "teeth",
    foot: "feet",
    mouse: "mice",
    goose: "geese",
    // Unchanged plurals
    sheep: "sheep",
    deer: "deer",
    fish: "fish",
    series: "series",
    // Latin/Greek (essential for tech)
    datum: "data",
    index: "indices",
  };

  // Check for irregular plural
  const irregular = irregulars[lowerWord];
  if (irregular) {
    if (isUpperCase) return irregular.toUpperCase();
    if (isCapitalized && irregular[0])
      return irregular[0].toUpperCase() + irregular.slice(1);
    return irregular;
  }

  let result = word;

  // Apply pluralization rules
  if (lowerWord.endsWith("is")) {
    // Words ending in -is: change to -es (analysis->analyses, crisis->crises)
    result = word.slice(0, -2) + "es";
  } else if (lowerWord.endsWith("us") && !["bus", "plus"].includes(lowerWord)) {
    // Words ending in -us: change to -i (cactus->cacti, fungus->fungi) except common exceptions
    result = word.slice(0, -2) + "i";
  } else if (
    lowerWord.endsWith("s") ||
    lowerWord.endsWith("ss") ||
    lowerWord.endsWith("sh") ||
    lowerWord.endsWith("ch") ||
    lowerWord.endsWith("x") ||
    lowerWord.endsWith("z") ||
    (lowerWord.endsWith("o") && !["photo", "piano", "halo"].includes(lowerWord))
  ) {
    // Add 'es' to words ending in s, ss, sh, ch, x, z, or o (with exceptions)
    if (isUpperCase) {
      result = word + "ES";
    } else {
      result = word + "es";
    }
  } else if (lowerWord.endsWith("y") && !/[aeiou]y$/.test(lowerWord)) {
    // Words ending in consonant + y: change y to ies
    if (isUpperCase) {
      result = word.slice(0, -1) + "IES";
    } else {
      result = word.slice(0, -1) + "ies";
    }
  } else if (lowerWord.endsWith("f")) {
    // Words ending in f: change to ves
    result = word.slice(0, -1) + "ves";
  } else if (lowerWord.endsWith("fe")) {
    // Words ending in fe: change to ves
    result = word.slice(0, -2) + "ves";
  } else {
    // Default: just add 's'
    if (isUpperCase && word.length === 1) {
      // Special case for single letters - preserve original case style
      result = word + "s";
    } else if (isUpperCase) {
      result = word + "S";
    } else {
      result = word + "s";
    }
  }

  return result;
}
