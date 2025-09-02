/**
 * Removes diacritics/accents from Latin characters
 * @param str - The input string to deburr
 * @returns String with diacritics removed
 * @example
 * deburr('café') // 'cafe'
 * deburr('naïve') // 'naive'
 * deburr('Bjørn') // 'Bjorn'
 * deburr('São Paulo') // 'Sao Paulo'
 */
export function deburr(str: string): string {
  // Special characters that don't decompose with NFD
  const specialChars: Record<string, string> = {
    ø: "o",
    Ø: "O",
    ł: "l",
    Ł: "L",
    đ: "d",
    Đ: "D",
    ð: "d",
    Ð: "D",
    þ: "th",
    Þ: "Th",
    ß: "ss",
    æ: "ae",
    Æ: "Ae",
    œ: "oe",
    Œ: "Oe",
  };

  // Replace special characters first
  let result = str;
  for (const [char, replacement] of Object.entries(specialChars)) {
    result = result.replace(new RegExp(char, "g"), replacement);
  }

  // Use NFD normalization to decompose characters, then remove combining marks
  // Finally apply NFC to recompose any non-Latin scripts that were decomposed
  return result
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .normalize("NFC");
}
