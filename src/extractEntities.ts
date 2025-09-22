/**
 * Represents extracted entities from text
 */
export interface ExtractedEntities {
  /** Email addresses found in the text */
  emails: string[];
  /** URLs found in the text */
  urls: string[];
  /** Social media mentions (@username) */
  mentions: string[];
  /** Hashtags (#topic) */
  hashtags: string[];
  /** Phone numbers in various formats */
  phones: string[];
  /** Dates in common formats */
  dates: string[];
  /** Currency amounts ($99.99, €50, etc.) */
  prices: string[];
}

// Pre-compiled regex patterns for performance
const EMAIL_PATTERN = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g;
const URL_PATTERN = /https?:\/\/[^\s<>"\{\}\|\\^\[\]`]+/g;
const MENTION_PATTERN = /@[a-zA-Z0-9_]+\b/g;
const HASHTAG_PATTERN = /#[a-zA-Z0-9_]+\b/g;
const PHONE_PATTERN =
  /(?:\+?[1-9]\d{0,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}\b/g;
const DATE_PATTERN =
  /\b(?:\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}|\d{4}[-\/]\d{1,2}[-\/]\d{1,2}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2},? \d{4})\b/gi;
const PRICE_PATTERN =
  /[$€£¥₹]\s?\d{1,3}(?:[,.\s]\d{3})*(?:[.,]\d{1,2})?(?:[kKmMbB])?(?!\w)/g;

/**
 * Extracts various entities from text including emails, URLs, mentions, hashtags, phones, dates, and prices
 * @param text - The text to extract entities from
 * @returns An object containing arrays of extracted entities
 * @example
 * ```ts
 * // Extract from mixed content
 * const text = 'Contact @john at john@example.com or call (555) 123-4567. Check #updates at https://example.com. Price: $99.99';
 * const entities = extractEntities(text);
 * // Returns:
 * // {
 * //   emails: ['john@example.com'],
 * //   urls: ['https://example.com'],
 * //   mentions: ['@john'],
 * //   hashtags: ['#updates'],
 * //   phones: ['(555) 123-4567'],
 * //   dates: [],
 * //   prices: ['$99.99']
 * // }
 *
 * // Extract from social media content
 * const tweet = 'Hey @alice and @bob! Check out #javascript #typescript at https://github.com/example';
 * const social = extractEntities(tweet);
 * // social.mentions: ['@alice', '@bob']
 * // social.hashtags: ['#javascript', '#typescript']
 *
 * // Extract contact information
 * const contact = 'Email: support@company.com, Phone: +1-800-555-0100';
 * const info = extractEntities(contact);
 * // info.emails: ['support@company.com']
 * // info.phones: ['+1-800-555-0100']
 *
 * // Extract dates and prices
 * const invoice = 'Invoice Date: 2024-01-15, Due: 01/30/2024, Amount: $1,234.56';
 * const billing = extractEntities(invoice);
 * // billing.dates: ['2024-01-15', '01/30/2024']
 * // billing.prices: ['$1,234.56']
 * ```
 */
export const extractEntities = (text: string): ExtractedEntities => {
  if (!text) {
    return {
      emails: [],
      urls: [],
      mentions: [],
      hashtags: [],
      phones: [],
      dates: [],
      prices: [],
    };
  }

  // Extract and deduplicate each entity type
  const emails = [...new Set(text.match(EMAIL_PATTERN) || [])];
  const urls = [...new Set(text.match(URL_PATTERN) || [])];
  const mentions = [...new Set(text.match(MENTION_PATTERN) || [])];
  const hashtags = [...new Set(text.match(HASHTAG_PATTERN) || [])];

  // Extract phone numbers and clean them up
  const phoneMatches = text.match(PHONE_PATTERN) || [];
  const phones = [
    ...new Set(
      phoneMatches
        .map((p) => p.trim())
        .filter((p) => {
          // Filter out numbers that are too short or just single digits
          const digits = p.replace(/\D/g, "");
          return digits.length >= 7 && digits.length <= 15;
        })
    ),
  ];

  // Extract dates and filter obvious false positives
  const dateMatches = text.match(DATE_PATTERN) || [];
  const dates = [
    ...new Set(
      dateMatches.filter((d) => {
        // Basic validation to avoid matching random number patterns
        return (
          !d.match(/^\d{1,4}$/) && // Not just a year
          !d.match(/^\d{1,2}[-\/]\d{1,2}$/)
        ); // Not just month/day
      })
    ),
  ];

  // Extract prices
  const prices = [...new Set(text.match(PRICE_PATTERN) || [])];

  return {
    emails,
    urls,
    mentions,
    hashtags,
    phones,
    dates,
    prices,
  };
};
