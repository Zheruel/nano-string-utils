/**
 * Options for humanizing a list
 */
export interface HumanizeListOptions {
  /** The conjunction to use between the last two items. Default: "and" */
  conjunction?: string;
  /** Whether to use Oxford comma (comma before conjunction in lists of 3+). Default: true */
  oxford?: boolean;
  /** Whether to wrap items in double quotes. Default: false */
  quotes?: boolean;
}

/**
 * Converts an array into a human-readable list with proper grammar
 * @param items - Array of items to convert to a human-readable list
 * @param options - Options for customizing the output format
 * @returns A grammatically correct human-readable string
 * @example
 * humanizeList(['apple', 'banana', 'orange']) // 'apple, banana, and orange'
 * humanizeList(['red', 'blue'], { conjunction: 'or' }) // 'red or blue'
 * humanizeList(['a', 'b', 'c'], { oxford: false }) // 'a, b and c'
 * humanizeList([1, 2, 3], { quotes: true }) // '"1", "2", and "3"'
 */
export const humanizeList = (
  items: unknown[],
  options: HumanizeListOptions = {}
): string => {
  const { conjunction = "and", oxford = true, quotes = false } = options;

  // Filter out null/undefined and convert to strings
  const stringItems = items
    .filter((item) => item != null)
    .map((item) => String(item));

  // Apply quotes if requested
  const finalItems = quotes
    ? stringItems.map((item) => `"${item}"`)
    : stringItems;

  const len = finalItems.length;

  // Handle different lengths
  if (len === 0) return "";
  if (len === 1) return finalItems[0]!;
  if (len === 2) return `${finalItems[0]} ${conjunction} ${finalItems[1]}`;

  // For 3+ items
  const allButLast = finalItems.slice(0, -1);
  const last = finalItems[len - 1];
  const oxfordComma = oxford ? "," : "";

  return `${allButLast.join(", ")}${oxfordComma} ${conjunction} ${last}`;
};
