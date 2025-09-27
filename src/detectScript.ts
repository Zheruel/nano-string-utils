/**
 * Detects the dominant writing system (script) used in a text string.
 *
 * @param text - The text to analyze
 * @returns The detected script type: 'latin', 'cjk', 'arabic', 'cyrillic', 'hebrew', 'devanagari', 'greek', 'thai', or 'unknown'
 *
 * @example
 * detectScript('Hello World') // returns 'latin'
 *
 * @example
 * detectScript('你好世界') // returns 'cjk'
 *
 * @example
 * detectScript('Привет мир') // returns 'cyrillic'
 *
 * @example
 * detectScript('مرحبا بالعالم') // returns 'arabic'
 *
 * @example
 * detectScript('') // returns 'unknown'
 */
export function detectScript(
  text: string
):
  | "latin"
  | "cjk"
  | "arabic"
  | "cyrillic"
  | "hebrew"
  | "devanagari"
  | "greek"
  | "thai"
  | "unknown" {
  if (!text || text.length === 0) {
    return "unknown";
  }

  const scriptCounts = {
    latin: 0,
    cjk: 0,
    arabic: 0,
    cyrillic: 0,
    hebrew: 0,
    devanagari: 0,
    greek: 0,
    thai: 0,
  };

  const maxChars = Math.min(text.length, 100);
  let significantChars = 0;

  for (let i = 0; i < maxChars; i++) {
    const code = text.charCodeAt(i);
    let weight = 1;

    if (
      (code >= 0x0041 && code <= 0x005a) ||
      (code >= 0x0061 && code <= 0x007a) ||
      (code >= 0x00c0 && code <= 0x00ff) ||
      (code >= 0x0100 && code <= 0x017f) ||
      (code >= 0x0180 && code <= 0x024f) ||
      (code >= 0x1e00 && code <= 0x1eff)
    ) {
      scriptCounts.latin += weight;
      significantChars++;
    } else if (
      (code >= 0x4e00 && code <= 0x9fff) ||
      (code >= 0x3400 && code <= 0x4dbf)
    ) {
      weight = 2;
      scriptCounts.cjk += weight;
      significantChars++;
    } else if (
      (code >= 0x3040 && code <= 0x309f) ||
      (code >= 0x30a0 && code <= 0x30ff) ||
      (code >= 0x31f0 && code <= 0x31ff) ||
      (code >= 0xac00 && code <= 0xd7af) ||
      (code >= 0x1100 && code <= 0x11ff) ||
      (code >= 0x3130 && code <= 0x318f)
    ) {
      weight = 2;
      scriptCounts.cjk += weight;
      significantChars++;
    } else if (
      (code >= 0x0600 && code <= 0x06ff) ||
      (code >= 0x0750 && code <= 0x077f) ||
      (code >= 0x08a0 && code <= 0x08ff) ||
      (code >= 0xfb50 && code <= 0xfdff) ||
      (code >= 0xfe70 && code <= 0xfeff)
    ) {
      weight = 2;
      scriptCounts.arabic += weight;
      significantChars++;
    } else if (
      (code >= 0x0400 && code <= 0x04ff) ||
      (code >= 0x0500 && code <= 0x052f) ||
      (code >= 0x2de0 && code <= 0x2dff) ||
      (code >= 0xa640 && code <= 0xa69f)
    ) {
      weight = 2;
      scriptCounts.cyrillic += weight;
      significantChars++;
    } else if (
      (code >= 0x0590 && code <= 0x05ff) ||
      (code >= 0xfb1d && code <= 0xfb4f)
    ) {
      weight = 2;
      scriptCounts.hebrew += weight;
      significantChars++;
    } else if (
      (code >= 0x0900 && code <= 0x097f) ||
      (code >= 0xa8e0 && code <= 0xa8ff)
    ) {
      weight = 2;
      scriptCounts.devanagari += weight;
      significantChars++;
    } else if (
      (code >= 0x0370 && code <= 0x03ff) ||
      (code >= 0x1f00 && code <= 0x1fff)
    ) {
      weight = 2;
      scriptCounts.greek += weight;
      significantChars++;
    } else if (code >= 0x0e00 && code <= 0x0e7f) {
      weight = 2;
      scriptCounts.thai += weight;
      significantChars++;
    }
  }

  if (significantChars === 0) {
    return "unknown";
  }

  let maxCount = 0;
  let detectedScript: string = "unknown";

  for (const [script, count] of Object.entries(scriptCounts)) {
    if (count > maxCount) {
      maxCount = count;
      detectedScript = script;
    }
  }

  return detectedScript as
    | "latin"
    | "cjk"
    | "arabic"
    | "cyrillic"
    | "hebrew"
    | "devanagari"
    | "greek"
    | "thai"
    | "unknown";
}
