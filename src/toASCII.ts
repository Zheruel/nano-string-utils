import { deburr } from "./deburr";

/**
 * Options for the toASCII function
 */
export interface ToASCIIOptions {
  /**
   * Character to replace non-convertible characters with
   * If not provided, non-convertible characters are removed
   */
  placeholder?: string;
}

/**
 * Converts a string to ASCII-safe representation by removing diacritics,
 * converting common Unicode symbols, and optionally replacing non-ASCII characters
 * @param str - The input string to convert
 * @param options - Options for conversion
 * @returns ASCII-safe string
 * @example
 * toASCII('café') // 'cafe'
 * toASCII('Hello "world"') // 'Hello "world"'
 * toASCII('em—dash') // 'em-dash'
 * toASCII('α β γ') // 'a b g'
 * toASCII('привет', { placeholder: '?' }) // '??????'
 */
export function toASCII(str: string, options: ToASCIIOptions = {}): string {
  let result = str;

  // Map of common Unicode symbols to ASCII equivalents
  // Apply these BEFORE deburr since deburr might alter some symbols
  const symbolMap: Record<string, string> = {
    // Whitespace characters
    "\u00A0": " ", // Non-breaking space
    "\u2003": " ", // Em space
    "\u2002": " ", // En space
    "\u2009": " ", // Thin space
    "\u200B": "", // Zero-width space

    // Quotation marks
    "\u201C": '"', // Left double quotation mark
    "\u201D": '"', // Right double quotation mark
    "\u2018": "'", // Left single quotation mark
    "\u2019": "'", // Right single quotation mark
    "\u201A": ",", // Single low-9 quotation mark
    "\u201E": '"', // Double low-9 quotation mark
    "\u00AB": '"', // Left-pointing double angle quotation mark
    "\u00BB": '"', // Right-pointing double angle quotation mark
    "\u2039": "'", // Single left-pointing angle quotation mark
    "\u203A": "'", // Single right-pointing angle quotation mark

    // Dashes and hyphens
    "\u2013": "-", // En dash
    "\u2014": "-", // Em dash
    "\u2012": "-", // Figure dash
    "\u2015": "-", // Horizontal bar

    // Punctuation
    "\u2026": "...", // Horizontal ellipsis
    "\u2022": "*", // Bullet
    "\u00B7": ".", // Middle dot
    "\u00BF": "?", // Inverted question mark
    "\u00A1": "!", // Inverted exclamation mark

    // Mathematical symbols
    "\u00D7": "x", // Multiplication sign
    "\u00F7": "/", // Division sign
    "\u00B1": "+/-", // Plus-minus sign
    "\u2248": "~", // Almost equal to
    "\u2260": "!=", // Not equal to
    "\u2264": "<=", // Less than or equal to
    "\u2265": ">=", // Greater than or equal to
    "\u221E": "inf", // Infinity
    "\u221A": "sqrt", // Square root

    // Currency symbols (common ones)
    "\u20AC": "EUR", // Euro sign
    "\u00A3": "GBP", // Pound sign
    "\u00A5": "JPY", // Yen sign
    "\u00A2": "c", // Cent sign
    "\u20B9": "INR", // Indian Rupee sign
    "\u20BD": "RUB", // Russian Ruble sign

    // Common fractions
    "\u00BD": "1/2", // Vulgar fraction one half
    "\u00BC": "1/4", // Vulgar fraction one quarter
    "\u00BE": "3/4", // Vulgar fraction three quarters
    "\u2153": "1/3", // Vulgar fraction one third
    "\u2154": "2/3", // Vulgar fraction two thirds

    // Arrows
    "\u2192": "->", // Rightwards arrow
    "\u2190": "<-", // Leftwards arrow
    "\u2191": "^", // Upwards arrow
    "\u2193": "v", // Downwards arrow
    "\u2194": "<->", // Left right arrow

    // Other common symbols
    "\u00A9": "(c)", // Copyright sign
    "\u00AE": "(R)", // Registered sign
    "\u2122": "(TM)", // Trade mark sign
    "\u00B0": "deg", // Degree sign
    "\u00A7": "S", // Section sign
    "\u00B6": "P", // Pilcrow sign
    "\u2020": "+", // Dagger
    "\u2021": "++", // Double dagger
    "\u2116": "No", // Numero sign
  };

  // Basic transliteration for common Greek letters
  const greekMap: Record<string, string> = {
    Α: "A",
    α: "a",
    Β: "B",
    β: "b",
    Γ: "G",
    γ: "g",
    Δ: "D",
    δ: "d",
    Ε: "E",
    ε: "e",
    Ζ: "Z",
    ζ: "z",
    Η: "H",
    η: "h",
    Θ: "Th",
    θ: "th",
    Ι: "I",
    ι: "i",
    Κ: "K",
    κ: "k",
    Λ: "L",
    λ: "l",
    Μ: "M",
    μ: "m",
    Ν: "N",
    ν: "n",
    Ξ: "X",
    ξ: "x",
    Ο: "O",
    ο: "o",
    Π: "P",
    π: "p",
    Ρ: "R",
    ρ: "r",
    Σ: "S",
    σ: "s",
    ς: "s",
    Τ: "T",
    τ: "t",
    Υ: "Y",
    υ: "u",
    Φ: "Ph",
    φ: "ph",
    Χ: "Ch",
    χ: "ch",
    Ψ: "Ps",
    ψ: "ps",
    Ω: "O",
    ω: "o",
  };

  // Basic transliteration for common Cyrillic letters
  const cyrillicMap: Record<string, string> = {
    А: "A",
    а: "a",
    Б: "B",
    б: "b",
    В: "V",
    в: "v",
    Г: "G",
    г: "g",
    Д: "D",
    д: "d",
    Е: "E",
    е: "e",
    Ё: "E",
    ё: "e",
    Ж: "Zh",
    ж: "zh",
    З: "Z",
    з: "z",
    И: "I",
    и: "i",
    Й: "Y",
    й: "y",
    К: "K",
    к: "k",
    Л: "L",
    л: "l",
    М: "M",
    м: "m",
    Н: "N",
    н: "n",
    О: "O",
    о: "o",
    П: "P",
    п: "p",
    Р: "R",
    р: "r",
    С: "S",
    с: "s",
    Т: "T",
    т: "t",
    У: "U",
    у: "u",
    Ф: "F",
    ф: "f",
    Х: "Kh",
    х: "kh",
    Ц: "Ts",
    ц: "ts",
    Ч: "Ch",
    ч: "ch",
    Ш: "Sh",
    ш: "sh",
    Щ: "Sch",
    щ: "sch",
    Ъ: "",
    ъ: "",
    Ы: "Y",
    ы: "y",
    Ь: "",
    ь: "",
    Э: "E",
    э: "e",
    Ю: "Yu",
    ю: "yu",
    Я: "Ya",
    я: "ya",
  };

  // First replace symbols that might be affected by deburr
  for (const [char, replacement] of Object.entries(symbolMap)) {
    result = result.replace(new RegExp(char, "g"), replacement);
  }

  // Apply deburr to handle diacritics
  result = deburr(result);

  // Then apply Greek and Cyrillic transliterations
  const transliterationMaps = { ...greekMap, ...cyrillicMap };
  for (const [char, replacement] of Object.entries(transliterationMaps)) {
    result = result.replace(new RegExp(char, "g"), replacement);
  }

  // Remove control characters except tab, newline, and carriage return
  // Keep: \x09 (tab), \x0A (newline), \x0D (carriage return)
  result = result.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, "");

  // Handle remaining non-ASCII characters
  // Process string to handle multi-byte Unicode (emojis, etc.) correctly
  if (options.placeholder !== undefined) {
    // Convert string to array to handle surrogate pairs properly
    const chars = Array.from(result);
    result = chars
      .map((char) => {
        // Check if character is ASCII (including tab, newline, carriage return)
        const code = char.charCodeAt(0);
        if (
          code === 0x09 || // tab
          code === 0x0a || // newline
          code === 0x0d || // carriage return
          (code >= 0x20 && code <= 0x7e) // printable ASCII
        ) {
          return char;
        }
        // Replace non-ASCII character with placeholder
        return options.placeholder;
      })
      .join("");
  } else {
    // Remove non-ASCII characters
    const chars = Array.from(result);
    result = chars
      .filter((char) => {
        const code = char.charCodeAt(0);
        return (
          code === 0x09 || // tab
          code === 0x0a || // newline
          code === 0x0d || // carriage return
          (code >= 0x20 && code <= 0x7e) // printable ASCII
        );
      })
      .join("");
  }

  return result;
}
