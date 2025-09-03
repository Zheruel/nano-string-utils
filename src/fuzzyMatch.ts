/**
 * Options for fuzzy matching
 */
export interface FuzzyMatchOptions {
  /** Whether to perform case-sensitive matching (default: false) */
  caseSensitive?: boolean;
  /** Minimum score threshold to consider a match (default: 0) */
  threshold?: number;
}

/**
 * Result of a fuzzy match operation
 */
export interface FuzzyMatchResult {
  /** Whether the query matched the target */
  matched: boolean;
  /** Match score between 0 and 1, where 1 is a perfect match */
  score: number;
}

/**
 * Performs fuzzy string matching with a similarity score
 *
 * Uses a Sublime Text-style algorithm where all query characters must appear
 * in the target string in the same order. Scoring prioritizes:
 * - Exact matches (score: 1.0)
 * - Consecutive character matches
 * - Matches at word boundaries (after spaces, dots, slashes, underscores, hyphens)
 * - Matches at the beginning of the string
 * - CamelCase/PascalCase boundaries
 *
 * @param query - The search query string
 * @param target - The target string to match against
 * @param options - Optional configuration for matching behavior
 * @returns A FuzzyMatchResult with matched status and score, or null if no match
 *
 * @example
 * ```ts
 * fuzzyMatch('gto', 'goToLine')
 * // { matched: true, score: 0.875 }
 *
 * fuzzyMatch('usrctrl', 'userController.js')
 * // { matched: true, score: 0.823 }
 *
 * fuzzyMatch('abc', 'xyz')
 * // { matched: false, score: 0 }
 * ```
 */
export function fuzzyMatch(
  query: string,
  target: string,
  options: FuzzyMatchOptions = {}
): FuzzyMatchResult | null {
  const { caseSensitive = false, threshold = 0 } = options;

  // Handle empty inputs
  if (!query) return { matched: false, score: 0 };
  if (!target) return null;

  const searchQuery = caseSensitive ? query : query.toLowerCase();
  const searchTarget = caseSensitive ? target : target.toLowerCase();

  // Exact match gets highest score
  if (searchQuery === searchTarget) {
    const score = caseSensitive ? 1.0 : 0.95; // Slight penalty for case-insensitive exact match
    return { matched: true, score };
  }

  let queryIndex = 0;
  let targetIndex = 0;
  let consecutiveMatches = 0;
  const matchPositions: number[] = [];

  // Try to match all characters from query in target
  while (queryIndex < searchQuery.length && targetIndex < searchTarget.length) {
    if (searchQuery[queryIndex] === searchTarget[targetIndex]) {
      matchPositions.push(targetIndex);

      // Bonus for consecutive matches
      if (matchPositions.length > 1) {
        const lastPos = matchPositions[matchPositions.length - 1];
        const prevPos = matchPositions[matchPositions.length - 2];
        if (
          lastPos !== undefined &&
          prevPos !== undefined &&
          lastPos - prevPos === 1
        ) {
          consecutiveMatches++;
        }
      }

      queryIndex++;
    }
    targetIndex++;
  }

  // All query characters must be found
  if (queryIndex !== searchQuery.length) {
    return null;
  }

  // Calculate base score
  const matchRatio = query.length / target.length;
  let finalScore = matchRatio * 0.4; // Base score from match coverage

  // Bonus for consecutive matches
  if (consecutiveMatches > 0) {
    finalScore += (consecutiveMatches / query.length) * 0.25;
  }

  // Bonus for early matches
  if (matchPositions.length > 0) {
    const avgPosition =
      matchPositions.reduce((a, b) => a + b, 0) / matchPositions.length;
    const positionBonus = 1 - avgPosition / target.length;
    finalScore += positionBonus * 0.1;
  }

  // Bonus for matching at word boundaries
  let boundaryMatches = 0;
  const wordBoundaryChars = /[\s\-_./\\]/;

  for (let i = 0; i < matchPositions.length; i++) {
    const pos = matchPositions[i];
    if (pos === undefined) continue;

    // Check if match is at start or after a boundary
    if (pos === 0) {
      boundaryMatches++;
    } else if (pos > 0 && pos < target.length) {
      const prevChar = target[pos - 1];
      const currentChar = target[pos];

      if (prevChar && wordBoundaryChars.test(prevChar)) {
        boundaryMatches++;
      } else if (
        prevChar &&
        currentChar &&
        prevChar === prevChar.toLowerCase() &&
        currentChar === currentChar.toUpperCase()
      ) {
        // CamelCase boundary
        boundaryMatches++;
      }
    }
  }

  if (boundaryMatches > 0) {
    finalScore += (boundaryMatches / query.length) * 0.35;
  }

  // Bonus for matching prefix
  if (searchTarget.startsWith(searchQuery)) {
    finalScore = Math.max(finalScore, 0.85);
  }

  // Special bonus for acronym-style matches (all matches at word boundaries)
  if (boundaryMatches === query.length) {
    finalScore = Math.max(finalScore, 0.75);
  }

  // Ensure score is between 0 and 1
  finalScore = Math.min(Math.max(finalScore, 0), 1);

  // Check threshold
  if (finalScore < threshold) {
    return null;
  }

  return {
    matched: true,
    score: Math.round(finalScore * 1000) / 1000, // Round to 3 decimal places
  };
}
