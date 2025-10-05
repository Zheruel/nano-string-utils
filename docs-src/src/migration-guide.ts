interface MigrationMapping {
  lodash: string;
  nano: string | null;
  notes?: string;
  example?: {
    before: string;
    after: string;
  };
}

export const migrationMappings: MigrationMapping[] = [
  // Case conversion functions
  {
    lodash: "_.camelCase",
    nano: "camelCase",
  },
  {
    lodash: "_.kebabCase",
    nano: "kebabCase",
  },
  {
    lodash: "_.snakeCase",
    nano: "snakeCase",
  },
  {
    lodash: "_.startCase",
    nano: "titleCase",
    notes: "Similar but handles articles differently",
  },
  {
    lodash: "_.lowerCase",
    nano: "sentenceCase",
    notes: "Use sentenceCase for space-separated lowercase",
  },
  {
    lodash: "_.upperCase",
    nano: "constantCase",
    notes: "Use constantCase for UPPER_CASE format",
  },

  // String manipulation
  {
    lodash: "_.capitalize",
    nano: "capitalize",
  },
  {
    lodash: "_.upperFirst",
    nano: "capitalize",
  },
  {
    lodash: "_.lowerFirst",
    nano: null,
    notes: "Use native: str[0].toLowerCase() + str.slice(1)",
  },
  {
    lodash: "_.truncate",
    nano: "truncate",
    notes: "Simpler API - uses positional args instead of options",
  },
  {
    lodash: "_.pad",
    nano: "pad",
  },
  {
    lodash: "_.padEnd",
    nano: "padEnd",
  },
  {
    lodash: "_.padStart",
    nano: "padStart",
  },

  // HTML/Special characters
  {
    lodash: "_.escape",
    nano: "escapeHtml",
  },
  {
    lodash: "_.unescape",
    nano: null,
    notes: "Use DOMParser or dedicated library",
  },
  {
    lodash: "_.escapeRegExp",
    nano: null,
    notes: 'Use: str.replace(/[.*+?^${}()|[]\\]/g, "\\\\$&")',
  },

  // Template functions
  {
    lodash: "_.template",
    nano: "template",
    notes: "Different syntax: {var} instead of <%= var %>",
  },

  // Character manipulation
  {
    lodash: "_.deburr",
    nano: "deburr",
  },
  {
    lodash: "_.words",
    nano: null,
    notes: "Use native: str.split(/\\s+/) or str.match(/\\w+/g)",
  },

  // Native replacements
  {
    lodash: "_.toLower",
    nano: null,
    notes: "Use native toLowerCase()",
  },
  {
    lodash: "_.toUpper",
    nano: null,
    notes: "Use native toUpperCase()",
  },
  {
    lodash: "_.trim",
    nano: null,
    notes: "Use native trim()",
  },
  {
    lodash: "_.trimEnd",
    nano: null,
    notes: "Use native trimEnd()",
  },
  {
    lodash: "_.trimStart",
    nano: null,
    notes: "Use native trimStart()",
  },
  {
    lodash: "_.repeat",
    nano: null,
    notes: "Use native repeat()",
  },
  {
    lodash: "_.replace",
    nano: null,
    notes: "Use native replace()",
  },
  {
    lodash: "_.split",
    nano: null,
    notes: "Use native split()",
  },
  {
    lodash: "_.endsWith",
    nano: null,
    notes: "Use native endsWith()",
  },
  {
    lodash: "_.startsWith",
    nano: null,
    notes: "Use native startsWith()",
  },
  {
    lodash: "_.includes",
    nano: null,
    notes: "Use native includes()",
  },
  {
    lodash: "_.indexOf",
    nano: null,
    notes: "Use native indexOf()",
  },
  {
    lodash: "_.lastIndexOf",
    nano: null,
    notes: "Use native lastIndexOf()",
  },

  // Parsing
  {
    lodash: "_.parseInt",
    nano: null,
    notes: "Use native parseInt()",
  },
  {
    lodash: "_.toNumber",
    nano: null,
    notes: "Use native Number() or parseFloat()",
  },
  {
    lodash: "_.toString",
    nano: null,
    notes: "Use native toString() or String()",
  },
  {
    lodash: "_.toFinite",
    nano: null,
    notes: "Use Number.isFinite() with conversion",
  },
  {
    lodash: "_.toInteger",
    nano: null,
    notes: "Use Math.trunc() or Math.floor()",
  },
  {
    lodash: "_.toLength",
    nano: null,
    notes: "Use Math.min(Math.max(0, Math.floor(n)), MAX_SAFE_INTEGER)",
  },
  {
    lodash: "_.toSafeInteger",
    nano: null,
    notes:
      "Use Math.min(Math.max(MIN_SAFE_INTEGER, Math.trunc(n)), MAX_SAFE_INTEGER)",
  },
];

export const underscoreMappings: MigrationMapping[] = [
  {
    lodash: "_.escape",
    nano: "escapeHtml",
    example: {
      before: "_.escape('<script>')",
      after: "escapeHtml('<script>')",
    },
  },
  {
    lodash: "_.unescape",
    nano: null,
    notes: "Consider using DOMParser or a dedicated library",
  },
  {
    lodash: "_.template",
    nano: "template",
    notes: "Simpler API than underscore templates",
    example: {
      before: "_.template('hello <%= name %>')({ name: 'world' })",
      after: "template('hello {name}', { name: 'world' })",
    },
  },
];

export const additionalFeatures = [
  {
    name: "pascalCase / dotCase / pathCase",
    description: "Additional case conversions beyond lodash",
    example: "pascalCase('hello-world') // 'HelloWorld'",
  },
  {
    name: "slugify",
    description: "URL-safe string generation with extensive options",
    example: "slugify('Hello World!') // 'hello-world'",
  },
  {
    name: "hashString",
    description: "Fast 32-bit hash for strings",
    example: "hashString('hello') // 99162322",
  },
  {
    name: "fuzzyMatch",
    description: "Fuzzy string matching with scoring",
    example: "fuzzyMatch('helo', 'hello') // { score: 0.8, ... }",
  },
  {
    name: "levenshtein",
    description: "Edit distance calculation",
    example: "levenshtein('kitten', 'sitting') // 3",
  },
  {
    name: "stripHtml",
    description: "Remove HTML tags safely",
    example: "stripHtml('<p>Hello</p>') // 'Hello'",
  },
  {
    name: "sanitize",
    description: "Sanitize HTML content",
    example: "sanitize('<script>alert(1)</script>') // ''",
  },
  {
    name: "redact",
    description: "Mask sensitive data (SSN, credit cards)",
    example: "redact('SSN: 123-45-6789') // 'SSN: ***-**-****'",
  },
  {
    name: "isEmail / isUrl",
    description: "Email and URL validation",
    example: "isEmail('test@example.com') // true",
  },
  {
    name: "excerpt",
    description: "Smart text excerpts",
    example: "excerpt('Long text here', 10) // 'Long text...'",
  },
  {
    name: "randomString",
    description: "Generate random alphanumeric strings",
    example: "randomString(8) // 'a7b3x9k2'",
  },
  {
    name: "pluralize/singularize",
    description: "English pluralization rules",
    example: "pluralize('person') // 'people'",
  },
  {
    name: "extractEntities",
    description: "Extract emails, URLs, hashtags, mentions",
    example: "extractEntities('Email: test@example.com')",
  },
  {
    name: "detectScript",
    description: "Detect Unicode script types",
    example: "detectScript('こんにちは') // 'Hiragana'",
  },
];

export const bundleSizeComparison = {
  lodash: {
    full: "73.2 KB",
    string: "~25 KB",
    perFunction: "~4-6 KB",
  },
  underscore: {
    full: "68.8 KB",
    string: "N/A (no modular imports)",
  },
  nanoStringUtils: {
    full: "~9 KB",
    perFunction: "<1 KB",
    treeShakeable: true,
  },
};

export function generateMigrationExample(
  type: "lodash" | "underscore" = "lodash"
) {
  return `// Before: Using ${type}
import _ from '${type}';
// Or for lodash with individual imports:
import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';

const formatted = _.camelCase('hello-world');
const slugged = _.kebabCase('HelloWorld');

// After: Using nano-string-utils
import { camelCase, kebabCase } from 'nano-string-utils';

const formatted = camelCase('hello-world');
const slugged = kebabCase('HelloWorld');

// Bundle size reduction: ~73KB → ~9KB (88% smaller!)`;
}

export function getMigrationSteps() {
  return [
    {
      step: 1,
      title: "Install nano-string-utils",
      code: "npm install nano-string-utils\n# or\nyarn add nano-string-utils\n# or\npnpm add nano-string-utils",
    },
    {
      step: 2,
      title: "Update imports",
      code: `// Replace lodash imports
- import { camelCase, kebabCase } from 'lodash';
+ import { camelCase, kebabCase } from 'nano-string-utils';

// Or individual lodash imports
- import camelCase from 'lodash/camelCase';
+ import { camelCase } from 'nano-string-utils';`,
    },
    {
      step: 3,
      title: "Update function calls",
      code: `// Most functions are drop-in replacements
const result = camelCase('hello-world');

// Some require minor adjustments
- _.truncate(str, { length: 10, omission: '...' })
+ truncate(str, 10, '...')

// Template syntax differs
- _.template('Hello <%= name %>')({ name: 'World' })
+ template('Hello {name}', { name: 'World' })`,
    },
    {
      step: 4,
      title: "Replace missing functions with natives",
      code: `// Use native JavaScript methods where available
- _.toLower(str)
+ str.toLowerCase()

- _.trim(str)
+ str.trim()

- _.repeat(str, 3)
+ str.repeat(3)`,
    },
    {
      step: 5,
      title: "Test and verify",
      code: `// Run your tests to ensure everything works
npm test

// Check bundle size improvement
npm run build
npm run size`,
    },
  ];
}
