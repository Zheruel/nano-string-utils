// Pre-compiled regex and map for special characters that don't decompose with NFD
const SPECIAL_CHARS_PATTERN = /[øØłŁđĐðÐþÞßæÆœŒ]/g;
const SPECIAL_CHARS_MAP: Record<string, string> = {
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

/**
 * Removes diacritics/accents from Latin characters for search normalization and URL safety
 * @param str - The input string to deburr
 * @returns String with diacritics removed
 * @example
 * ```ts
 * // Basic usage
 * deburr('café') // 'cafe'
 * deburr('naïve') // 'naive'
 * deburr('Bjørn') // 'Bjorn'
 * deburr('São Paulo') // 'Sao Paulo'
 *
 * // Search normalization - matching with/without accents
 * const searchTerm = deburr(userInput.toLowerCase())
 * const results = items.filter(item =>
 *   deburr(item.name.toLowerCase()).includes(searchTerm)
 * )
 * // Finds "café" when searching for "cafe"
 *
 * // URL-friendly slugs
 * const title = 'Crème Brûlée Recipe'
 * const slug = deburr(title).toLowerCase().replace(/\s+/g, '-')
 * // 'creme-brulee-recipe'
 *
 * // File naming from international text
 * const filename = deburr('Ångström_Café.pdf')
 * // 'Angstrom_Cafe.pdf'
 *
 * // Database search optimization
 * const normalized = deburr(userQuery)
 * // Match against pre-normalized database columns
 * ```
 */
export function deburr(str: string): string {
  if (!str) return str;

  // Replace special characters with single regex pass
  const result = str.replace(
    SPECIAL_CHARS_PATTERN,
    (char) => SPECIAL_CHARS_MAP[char] || char
  );

  // Use NFD normalization to decompose characters, then remove combining marks
  // Finally apply NFC to recompose any non-Latin scripts that were decomposed
  return result
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .normalize("NFC");
}
