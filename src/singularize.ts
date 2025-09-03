/**
 * Convert a plural word to singular form using English singularization rules.
 *
 * @param word - The word to singularize
 * @returns The singularized word
 * @example
 * singularize('boxes') // 'box'
 * singularize('items') // 'item'
 * singularize('people') // 'person'
 * singularize('sheep') // 'sheep'
 */
export function singularize(word: string): string {
  // Handle empty string
  if (!word) return word;

  // Preserve original casing
  const isUpperCase = word === word.toUpperCase();
  const isCapitalized = word[0] === word[0]?.toUpperCase();
  const lowerWord = word.toLowerCase();

  // Common irregular plurals to singulars (reversed from pluralize)
  const irregulars: Record<string, string> = {
    people: "person",
    children: "child",
    men: "man",
    women: "woman",
    teeth: "tooth",
    feet: "foot",
    mice: "mouse",
    geese: "goose",
    // Unchanged forms (return as-is)
    sheep: "sheep",
    deer: "deer",
    fish: "fish",
    series: "series",
    // Latin/Greek (essential for tech)
    data: "datum",
    indices: "index",
  };

  // Check for irregular singular
  const irregular = irregulars[lowerWord];
  if (irregular) {
    if (isUpperCase) return irregular.toUpperCase();
    if (isCapitalized && irregular[0])
      return irregular[0].toUpperCase() + irregular.slice(1);
    return irregular;
  }

  let result = word;

  // Apply singularization rules (reverse of pluralization)
  if (lowerWord.endsWith("ies") && lowerWord.length > 4) {
    // Words ending in ies: change to y (cities -> city)
    if (isUpperCase) {
      result = word.slice(0, -3) + "Y";
    } else {
      result = word.slice(0, -3) + "y";
    }
  } else if (lowerWord.endsWith("ves")) {
    // Words ending in ves: change to f or fe
    const stem = word.slice(0, -3);
    // Check if it was originally 'fe' (knife -> knives -> knife)
    if (["kni", "wi", "li"].includes(stem.toLowerCase())) {
      result = stem + "fe";
    } else {
      result = stem + "f";
    }
  } else if (lowerWord.endsWith("sses")) {
    // Words ending in sses (classes -> class)
    result = word.slice(0, -2);
  } else if (lowerWord.endsWith("zzes")) {
    // Words ending in zzes from doubled z (quizzes -> quiz, fizzes -> fizz)
    result = word.slice(0, -3);
  } else if (lowerWord.endsWith("zes")) {
    // Words ending in zes but not zzes (sizes -> size, prizes -> prize)
    result = word.slice(0, -1);
  } else if (
    lowerWord.endsWith("oes") ||
    lowerWord.endsWith("xes") ||
    lowerWord.endsWith("ches") ||
    lowerWord.endsWith("shes")
  ) {
    // Words ending in es after certain letters
    result = word.slice(0, -2);
  } else if (lowerWord.endsWith("ses") && !lowerWord.endsWith("sses")) {
    // Words ending in ses but not sses
    const stem = word.slice(0, -2);
    // Check if it's likely from -is -> -es pattern (analyses, bases, crises, theses)
    // These typically have 'y', 'a', 'i', or 'e' before the 'ses'
    if (
      ["lyses", "ases", "ises", "eses", "oses"].some((end) =>
        lowerWord.endsWith(end)
      )
    ) {
      result = stem + "is";
    } else {
      // Regular ses removal (buses -> bus, uses -> use)
      result = stem;
    }
  } else if (
    lowerWord.endsWith("i") &&
    lowerWord.length > 2 &&
    !["ski", "taxi", "chi", "hi"].includes(lowerWord)
  ) {
    // Words ending in i: likely Latin plural (cacti -> cactus, fungi -> fungus)
    result = word.slice(0, -1) + "us";
  } else if (
    lowerWord.endsWith("a") &&
    (lowerWord.endsWith("ta") || lowerWord.endsWith("ia")) &&
    lowerWord.length > 3
  ) {
    // Words ending in a: likely Greek/Latin (criteria -> criterion)
    result = word.slice(0, -1) + "on";
  } else if (
    lowerWord.endsWith("es") &&
    lowerWord.length > 3 &&
    !lowerWord.endsWith("ies") &&
    !lowerWord.endsWith("oes")
  ) {
    // General 'es' removal
    result = word.slice(0, -1);
  } else if (lowerWord === "as") {
    // Special case for single letter plural
    result = "a";
    if (isUpperCase) result = "A";
    if (isCapitalized) result = "A";
  } else if (lowerWord === "is") {
    // Special case for 'Is' -> 'I'
    result = "i";
    if (isUpperCase) result = "I";
    if (isCapitalized) result = "I";
  } else if (
    lowerWord.endsWith("s") &&
    !lowerWord.endsWith("ss") &&
    lowerWord.length > 2
  ) {
    // Default: remove 's' if not double 's'
    result = word.slice(0, -1);
  }

  return result;
}
