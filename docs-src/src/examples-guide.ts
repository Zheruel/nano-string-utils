export interface Recipe {
  id: string;
  title: string;
  category: "forms" | "content" | "security" | "api" | "search";
  description: string;
  problem: string;
  code: string;
  explanation: string;
  functions: string[];
}

export const recipes: Recipe[] = [
  {
    id: "user-registration",
    title: "User Registration Form",
    category: "forms",
    description: "Complete form validation and data processing for user registration",
    problem: "You need to validate email, generate a unique username from a full name, and sanitize user bio input while enforcing length limits.",
    code: `import { isEmail, slugify, sanitize, truncate } from 'nano-string-utils';

// User registration handler
function processRegistration(formData: {
  email: string;
  fullName: string;
  bio: string;
}) {
  // Validate email format
  if (!isEmail(formData.email)) {
    throw new Error('Invalid email address');
  }

  // Generate username from full name
  // "John O'Brien" → "john-obrien"
  const username = slugify(formData.fullName, {
    lowercase: true,
    strict: true, // Remove special chars
  });

  // Sanitize and truncate bio
  const safeBio = sanitize(formData.bio);
  const displayBio = truncate(safeBio, 200, '...');

  return {
    email: formData.email,
    username,
    bio: displayBio,
  };
}

// Usage
const result = processRegistration({
  email: 'john.obrien@example.com',
  fullName: "John O'Brien",
  bio: '<script>alert("xss")</script>I love coding!',
});

console.log(result);
// {
//   email: 'john.obrien@example.com',
//   username: 'john-obrien',
//   bio: 'I love coding!'
// }`,
    explanation: "This recipe combines validation, slug generation, and sanitization to safely process user input. The username is generated using strict mode to ensure it's URL-safe.",
    functions: ["isEmail", "slugify", "sanitize", "truncate"],
  },
  {
    id: "seo-blog-urls",
    title: "SEO-Friendly Blog URLs",
    category: "content",
    description: "Generate clean, SEO-optimized URLs from blog post titles with multi-language support",
    problem: "You need to create URL slugs from blog titles that may contain special characters, accents, emojis, or non-Latin scripts.",
    code: `import { slugify, deburr, truncate } from 'nano-string-utils';

function generateBlogUrl(title: string, options = {}) {
  const {
    maxLength = 60,
    preserveCase = false,
  } = options;

  // Remove accents: "Café" → "Cafe"
  const normalized = deburr(title);

  // Create URL-safe slug
  const slug = slugify(normalized, {
    lowercase: !preserveCase,
    strict: true, // Remove special characters
    trim: true,
  });

  // Enforce max length for SEO
  // Truncate at word boundary by removing trailing incomplete word
  const truncated = truncate(slug, maxLength, '');
  const cleanSlug = truncated.replace(/-+$/, ''); // Remove trailing dashes

  return \`/blog/\${cleanSlug}\`;
}

// Usage examples
console.log(generateBlogUrl('10 Tips for Better JavaScript! 🚀'));
// '/blog/10-tips-for-better-javascript'

console.log(generateBlogUrl('Café & Restaurant Guide in Zürich'));
// '/blog/cafe-restaurant-guide-in-zurich'

console.log(generateBlogUrl(
  'This is a Very Long Blog Post Title That Should Be Truncated for SEO',
  { maxLength: 40 }
));
// '/blog/this-is-a-very-long-blog-post-title'`,
    explanation: "Combines deburr for accent removal and slugify with strict mode for URL safety. Truncation ensures URLs stay SEO-friendly without breaking words.",
    functions: ["slugify", "deburr", "truncate"],
  },
  {
    id: "comment-moderation",
    title: "Comment System with Moderation",
    category: "security",
    description: "Safely handle user comments with HTML stripping, sanitization, and entity extraction",
    problem: "You need to process user comments by removing HTML, detecting links/emails, creating previews, and flagging potential spam.",
    code: `import {
  stripHtml,
  sanitize,
  excerpt,
  extractEntities,
  isUrl,
} from 'nano-string-utils';

interface ProcessedComment {
  content: string;
  preview: string;
  entities: {
    emails: string[];
    urls: string[];
    hashtags: string[];
  };
  flags: string[];
}

function processComment(rawComment: string): ProcessedComment {
  // Remove HTML tags
  const noHtml = stripHtml(rawComment);

  // Sanitize remaining content
  const cleaned = sanitize(noHtml);

  // Create preview for listings
  const preview = excerpt(cleaned, 150);

  // Extract entities for analysis
  const entities = extractEntities(cleaned);

  // Flag suspicious patterns
  const flags: string[] = [];
  if (entities.urls.length > 3) {
    flags.push('excessive-links');
  }
  if (entities.emails.length > 0) {
    flags.push('contains-email');
  }
  if (/buy now|click here|limited time/i.test(cleaned)) {
    flags.push('spam-keywords');
  }

  return {
    content: cleaned,
    preview,
    entities,
    flags,
  };
}

// Usage
const comment = \`
  <b>Great post!</b> Check out my site at https://example.com
  and email me at spam@example.com for amazing deals!
  #coding #javascript
\`;

const result = processComment(comment);
console.log(result);
// {
//   content: 'Great post! Check out my site at...',
//   preview: 'Great post! Check out my site at https://example.com...',
//   entities: {
//     emails: ['spam@example.com'],
//     urls: ['https://example.com'],
//     hashtags: ['#coding', '#javascript']
//   },
//   flags: ['contains-email', 'spam-keywords']
// }`,
    explanation: "This pipeline demonstrates multi-layer security: strip HTML to prevent XSS, sanitize for additional safety, extract entities for spam detection, and flag suspicious patterns.",
    functions: ["stripHtml", "sanitize", "excerpt", "extractEntities"],
  },
  {
    id: "email-notifications",
    title: "Email Notification Templates",
    category: "api",
    description: "Render safe, formatted email notifications with template variables",
    problem: "You need to generate personalized email notifications with user data, format lists naturally, and prevent injection attacks.",
    code: `import {
  templateSafe,
  humanizeList,
  capitalize,
  pluralize,
} from 'nano-string-utils';

interface NotificationData {
  userName: string;
  items: string[];
  count: number;
  action: string;
}

function generateEmailNotification(data: NotificationData): string {
  const { userName, items, count, action } = data;

  // Safely interpolate user data (auto-escapes HTML)
  const greeting = templateSafe(
    'Hello {name}!',
    { name: userName } // Even if userName contains <script>, it's escaped
  );

  // Format list naturally with Oxford comma
  const itemList = humanizeList(items, { conjunction: 'and', oxford: true });

  // Proper pluralization
  const itemWord = pluralize('item', count);

  // Capitalize action for subject line
  const subject = capitalize(action);

  // Compose email
  return \`
Subject: \${subject} - \${count} \${itemWord}

\${greeting}

You have \${count} new \${itemWord}: \${itemList}.

Thanks,
The Team
  \`.trim();
}

// Usage
const email = generateEmailNotification({
  userName: '<script>alert("xss")</script>John',
  items: ['project proposal', 'code review', 'meeting notes'],
  count: 3,
  action: 'new notifications',
});

console.log(email);
// Subject: New notifications - 3 items
//
// Hello &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;John!
//
// You have 3 new items: project proposal, code review, and meeting notes.
//
// Thanks,
// The Team`,
    explanation: "Uses templateSafe to prevent XSS attacks by auto-escaping HTML in user data. Combines with humanizeList for natural language formatting and proper pluralization.",
    functions: ["templateSafe", "humanizeList", "capitalize", "pluralize"],
  },
  {
    id: "search-autocomplete",
    title: "Fuzzy Search with Highlighting",
    category: "search",
    description: "Implement fuzzy search with ranked results and match highlighting",
    problem: "You need to build a search feature that handles typos, ranks results by relevance, and highlights matching terms.",
    code: `import {
  fuzzyMatch,
  highlight,
  normalizeWhitespace,
} from 'nano-string-utils';

interface SearchResult {
  id: string;
  title: string;
  score: number;
  highlighted: string;
}

function searchItems(
  query: string,
  items: Array<{ id: string; title: string }>
): SearchResult[] {
  // Normalize query (remove extra spaces)
  const cleanQuery = normalizeWhitespace(query);

  const results: SearchResult[] = [];

  for (const item of items) {
    // Fuzzy match with scoring
    const match = fuzzyMatch(cleanQuery, item.title);

    if (match.matches) {
      // Highlight matching characters
      const highlighted = highlight(
        item.title,
        cleanQuery,
        '<mark>',
        '</mark>'
      );

      results.push({
        id: item.id,
        title: item.title,
        score: match.score,
        highlighted,
      });
    }
  }

  // Sort by relevance (higher score = better match)
  return results.sort((a, b) => b.score - a.score);
}

// Usage
const products = [
  { id: '1', title: 'JavaScript: The Good Parts' },
  { id: '2', title: 'Learning JavaScript Design Patterns' },
  { id: '3', title: 'Eloquent JavaScript' },
  { id: '4', title: 'Python Crash Course' },
];

const results = searchItems('javasrip', products); // Note the typo!

console.log(results);
// [
//   {
//     id: '1',
//     title: 'JavaScript: The Good Parts',
//     score: 0.85,
//     highlighted: '<mark>Java</mark>Script: The Good Parts'
//   },
//   {
//     id: '3',
//     title: 'Eloquent JavaScript',
//     score: 0.82,
//     highlighted: 'Eloquent <mark>Java</mark>Script'
//   },
//   // ... more results
// ]`,
    explanation: "Fuzzy matching handles typos and ranks results by similarity score. The highlight function wraps matches in HTML tags for UI display. Normalize whitespace ensures consistent matching.",
    functions: ["fuzzyMatch", "highlight", "normalizeWhitespace"],
  },
  {
    id: "data-normalization",
    title: "API Data Normalization Pipeline",
    category: "api",
    description: "Clean and format messy API or user data for consistent display",
    problem: "You receive data from multiple sources with inconsistent formatting, extra whitespace, and mixed cases that need standardization.",
    code: `import {
  normalizeWhitespace,
  titleCase,
  toASCII,
  removeNonPrintable,
  extractEntities,
} from 'nano-string-utils';

interface RawUserData {
  name: string;
  company: string;
  bio: string;
}

interface NormalizedUserData {
  displayName: string;
  companyName: string;
  bio: string;
  mentions: string[];
}

function normalizeUserData(raw: RawUserData): NormalizedUserData {
  // Remove extra whitespace and non-printable chars
  const cleanName = removeNonPrintable(
    normalizeWhitespace(raw.name)
  );

  // Convert to ASCII (handle unicode edge cases)
  const asciiName = toASCII(cleanName);

  // Apply proper title casing for display
  const displayName = titleCase(asciiName);

  // Normalize company name
  const companyName = titleCase(
    normalizeWhitespace(raw.company)
  );

  // Clean bio and extract mentions
  const cleanBio = normalizeWhitespace(raw.bio);
  const { mentions } = extractEntities(cleanBio);

  return {
    displayName,
    companyName,
    bio: cleanBio,
    mentions,
  };
}

// Usage with messy data
const rawData = {
  name: '  john   doe\\n\\r',  // Extra spaces and newlines
  company: 'ACME   corporation',
  bio: 'Software engineer @CompanyA, formerly @CompanyB. Loves @javascript!',
};

const normalized = normalizeUserData(rawData);
console.log(normalized);
// {
//   displayName: 'John Doe',
//   companyName: 'Acme Corporation',
//   bio: 'Software engineer @CompanyA, formerly @CompanyB. Loves @javascript!',
//   mentions: ['@CompanyA', '@CompanyB', '@javascript']
// }`,
    explanation: "This pipeline handles real-world messy data by normalizing whitespace, removing control characters, converting to ASCII for compatibility, and applying proper casing. Entity extraction identifies structured data within text.",
    functions: ["normalizeWhitespace", "titleCase", "toASCII", "removeNonPrintable", "extractEntities"],
  },
];

export const categories = [
  { id: "all", name: "All Recipes", icon: "📚" },
  { id: "forms", name: "Form Validation", icon: "📝" },
  { id: "content", name: "Content & SEO", icon: "🔗" },
  { id: "security", name: "Security", icon: "🔒" },
  { id: "api", name: "API & Data", icon: "⚡" },
  { id: "search", name: "Search & Filter", icon: "🔍" },
];
