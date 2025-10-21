export interface FunctionParam {
  name: string;
  type: string;
  optional?: boolean;
  default?: string;
}

export interface FunctionExample {
  code: string;
  result: string;
}

export interface FunctionMeta {
  description: string;
  size: string;
  params: FunctionParam[];
  examples: FunctionExample[];
}

export const functionMetadata: Record<string, FunctionMeta> = {
  // Case Conversion Functions
  camelCase: {
    description: "Converts a string to camelCase",
    size: "450B",
    params: [{ name: "str", type: "string", default: "hello-world" }],
    examples: [
      { code: 'camelCase("hello-world")', result: '"helloWorld"' },
      { code: 'camelCase("HELLO_WORLD")', result: '"helloWorld"' },
      { code: 'camelCase("Hello World")', result: '"helloWorld"' },
    ],
  },

  kebabCase: {
    description: "Converts a string to kebab-case",
    size: "450B",
    params: [{ name: "str", type: "string", default: "HelloWorld" }],
    examples: [
      { code: 'kebabCase("HelloWorld")', result: '"hello-world"' },
      { code: 'kebabCase("hello_world")', result: '"hello-world"' },
      { code: 'kebabCase("Hello World")', result: '"hello-world"' },
    ],
  },

  snakeCase: {
    description: "Converts a string to snake_case",
    size: "450B",
    params: [{ name: "str", type: "string", default: "HelloWorld" }],
    examples: [
      { code: 'snakeCase("HelloWorld")', result: '"hello_world"' },
      { code: 'snakeCase("hello-world")', result: '"hello_world"' },
      { code: 'snakeCase("Hello World")', result: '"hello_world"' },
    ],
  },

  pascalCase: {
    description: "Converts a string to PascalCase",
    size: "450B",
    params: [{ name: "str", type: "string", default: "hello-world" }],
    examples: [
      { code: 'pascalCase("hello-world")', result: '"HelloWorld"' },
      { code: 'pascalCase("hello_world")', result: '"HelloWorld"' },
      { code: 'pascalCase("hello world")', result: '"HelloWorld"' },
    ],
  },

  constantCase: {
    description: "Converts a string to CONSTANT_CASE",
    size: "500B",
    params: [{ name: "str", type: "string", default: "HelloWorld" }],
    examples: [
      { code: 'constantCase("HelloWorld")', result: '"HELLO_WORLD"' },
      { code: 'constantCase("hello-world")', result: '"HELLO_WORLD"' },
      { code: 'constantCase("Hello World")', result: '"HELLO_WORLD"' },
    ],
  },

  dotCase: {
    description: "Converts a string to dot.case",
    size: "450B",
    params: [{ name: "str", type: "string", default: "HelloWorld" }],
    examples: [
      { code: 'dotCase("HelloWorld")', result: '"hello.world"' },
      { code: 'dotCase("hello-world")', result: '"hello.world"' },
      { code: 'dotCase("Hello World")', result: '"hello.world"' },
    ],
  },

  pathCase: {
    description: "Converts a string to path/case",
    size: "450B",
    params: [{ name: "str", type: "string", default: "HelloWorld" }],
    examples: [
      { code: 'pathCase("HelloWorld")', result: '"hello/world"' },
      { code: 'pathCase("hello-world")', result: '"hello/world"' },
      { code: 'pathCase("Hello World")', result: '"hello/world"' },
    ],
  },

  sentenceCase: {
    description: "Converts a string to Sentence case",
    size: "400B",
    params: [{ name: "str", type: "string", default: "hello world" }],
    examples: [
      { code: 'sentenceCase("hello world")', result: '"Hello world"' },
      { code: 'sentenceCase("HELLO WORLD")', result: '"Hello world"' },
      { code: 'sentenceCase("hello-world")', result: '"Hello world"' },
    ],
  },

  titleCase: {
    description: "Converts a string to Title Case with smart capitalization",
    size: "600B",
    params: [{ name: "str", type: "string", default: "the quick brown fox" }],
    examples: [
      {
        code: 'titleCase("the quick brown fox")',
        result: '"The Quick Brown Fox"',
      },
      {
        code: 'titleCase("a tale of two cities")',
        result: '"A Tale of Two Cities"',
      },
      { code: 'titleCase("war and peace")', result: '"War and Peace"' },
    ],
  },

  // String Manipulation Functions
  slugify: {
    description: "Converts a string to a URL-friendly slug",
    size: "500B",
    params: [{ name: "str", type: "string", default: "Hello World!" }],
    examples: [
      { code: 'slugify("Hello World!")', result: '"hello-world"' },
      { code: 'slugify("This & That")', result: '"this-and-that"' },
      { code: 'slugify("100% Awesome!!")', result: '"100-awesome"' },
    ],
  },

  truncate: {
    description: "Truncates a string to a specified length with ellipsis",
    size: "477B",
    params: [
      {
        name: "str",
        type: "string",
        default: "The quick brown fox jumps over the lazy dog",
      },
      { name: "length", type: "number", default: "20" },
      { name: "ending", type: "string", optional: true, default: "..." },
    ],
    examples: [
      { code: 'truncate("Long text here", 10)', result: '"Long te..."' },
      { code: 'truncate("Short", 10)', result: '"Short"' },
      { code: 'truncate("Hello 👨‍👩‍👧‍👦 World", 10)', result: '"Hello 👨‍👩‍👧‍👦..."' },
      { code: 'truncate("Custom ending", 10, "…")', result: '"Custom en…"' },
    ],
  },

  capitalize: {
    description: "Capitalizes the first letter of a string",
    size: "200B",
    params: [{ name: "str", type: "string", default: "hello world" }],
    examples: [
      { code: 'capitalize("hello")', result: '"Hello"' },
      { code: 'capitalize("WORLD")', result: '"World"' },
      { code: 'capitalize("hello world")', result: '"Hello world"' },
    ],
  },

  reverse: {
    description: "Reverses a string",
    size: "307B",
    params: [{ name: "str", type: "string", default: "hello" }],
    examples: [
      { code: 'reverse("hello")', result: '"olleh"' },
      { code: 'reverse("12345")', result: '"54321"' },
      { code: 'reverse("café")', result: '"éfac"' },
      { code: 'reverse("Hello 👨‍👩‍👧‍👦")', result: '"👨‍👩‍👧‍👦 olleH"' },
    ],
  },

  pad: {
    description: "Pads a string on both sides to a target length",
    size: "400B",
    params: [
      { name: "str", type: "string", default: "hello" },
      { name: "length", type: "number", default: "10" },
      { name: "char", type: "string", optional: true, default: " " },
    ],
    examples: [
      { code: 'pad("hello", 10)', result: '"  hello   "' },
      { code: 'pad("hi", 6, "-")', result: '"--hi--"' },
      { code: 'pad("test", 8, "*")', result: '"**test**"' },
    ],
  },

  padStart: {
    description: "Pads the start of a string to a target length",
    size: "300B",
    params: [
      { name: "str", type: "string", default: "5" },
      { name: "length", type: "number", default: "3" },
      { name: "char", type: "string", optional: true, default: "0" },
    ],
    examples: [
      { code: 'padStart("5", 3, "0")', result: '"005"' },
      { code: 'padStart("hi", 5)', result: '"   hi"' },
      { code: 'padStart("1", 4, "0")', result: '"0001"' },
    ],
  },

  padEnd: {
    description: "Pads the end of a string to a target length",
    size: "300B",
    params: [
      { name: "str", type: "string", default: "hello" },
      { name: "length", type: "number", default: "10" },
      { name: "char", type: "string", optional: true, default: "." },
    ],
    examples: [
      { code: 'padEnd("hello", 10, ".")', result: '"hello....."' },
      { code: 'padEnd("hi", 5)', result: '"hi   "' },
      { code: 'padEnd("test", 6, "!")', result: '"test!!"' },
    ],
  },

  excerpt: {
    description: "Creates an excerpt from text with word boundary awareness",
    size: "600B",
    params: [
      {
        name: "text",
        type: "string",
        default:
          "The quick brown fox jumps over the lazy dog. It was a sunny day.",
      },
      { name: "length", type: "number", default: "30" },
      { name: "ending", type: "string", optional: true, default: "..." },
    ],
    examples: [
      {
        code: 'excerpt("Long text here with many words", 15)',
        result: '"Long text here..."',
      },
      { code: 'excerpt("Short text", 20)', result: '"Short text"' },
      { code: 'excerpt("Custom ending here", 10, "…")', result: '"Custom…"' },
    ],
  },

  // Validation Functions
  isEmail: {
    description: "Validates if a string is a valid email address",
    size: "400B",
    params: [{ name: "str", type: "string", default: "user@example.com" }],
    examples: [
      { code: 'isEmail("user@example.com")', result: "true" },
      { code: 'isEmail("invalid.email")', result: "false" },
      { code: 'isEmail("test@domain.co.uk")', result: "true" },
    ],
  },

  isUrl: {
    description: "Validates if a string is a valid URL",
    size: "450B",
    params: [{ name: "str", type: "string", default: "https://example.com" }],
    examples: [
      { code: 'isUrl("https://example.com")', result: "true" },
      { code: 'isUrl("not a url")', result: "false" },
      { code: 'isUrl("ftp://files.com")', result: "true" },
    ],
  },

  isASCII: {
    description: "Checks if a string contains only ASCII characters",
    size: "200B",
    params: [{ name: "str", type: "string", default: "Hello World" }],
    examples: [
      { code: 'isASCII("Hello")', result: "true" },
      { code: 'isASCII("Héllo")', result: "false" },
      { code: 'isASCII("🌍")', result: "false" },
    ],
  },

  isHexColor: {
    description: "Validates if a string is a valid hexadecimal color code",
    size: "180B",
    params: [{ name: "str", type: "string", default: "#ff5733" }],
    examples: [
      { code: 'isHexColor("#fff")', result: "true" },
      { code: 'isHexColor("#ffffff")', result: "true" },
      { code: 'isHexColor("#fff8")', result: "true" },
      { code: 'isHexColor("#ffffff80")', result: "true" },
      { code: 'isHexColor("fff")', result: "false" },
      { code: 'isHexColor("#gggggg")', result: "false" },
    ],
  },

  isNumeric: {
    description: "Validates if a string represents a numeric value",
    size: "120B",
    params: [{ name: "str", type: "string", default: "42" }],
    examples: [
      { code: 'isNumeric("42")', result: "true" },
      { code: 'isNumeric("-17")', result: "true" },
      { code: 'isNumeric("3.14")', result: "true" },
      { code: 'isNumeric("  42  ")', result: "true" },
      { code: 'isNumeric("abc")', result: "false" },
      { code: 'isNumeric("Infinity")', result: "false" },
    ],
  },

  isAlphanumeric: {
    description:
      "Validates if a string contains only alphanumeric characters (a-z, A-Z, 0-9)",
    size: "100B",
    params: [{ name: "str", type: "string", default: "user123" }],
    examples: [
      { code: 'isAlphanumeric("user123")', result: "true" },
      { code: 'isAlphanumeric("HelloWorld")', result: "true" },
      { code: 'isAlphanumeric("ABC123XYZ")', result: "true" },
      { code: 'isAlphanumeric("hello_world")', result: "false" },
      { code: 'isAlphanumeric("hello world")', result: "false" },
      { code: 'isAlphanumeric("test-123")', result: "false" },
    ],
  },

  isUUID: {
    description:
      "Validates if a string is a valid UUID (Universally Unique Identifier)",
    size: "180B",
    params: [
      {
        name: "str",
        type: "string",
        default: "550e8400-e29b-41d4-a716-446655440000",
      },
    ],
    examples: [
      {
        code: 'isUUID("550e8400-e29b-41d4-a716-446655440000")',
        result: "true",
      },
      {
        code: 'isUUID("00000000-0000-0000-0000-000000000000")',
        result: "true",
      },
      {
        code: 'isUUID("550E8400-E29B-41D4-A716-446655440000")',
        result: "true",
      },
      { code: 'isUUID("550e8400e29b41d4a716446655440000")', result: "false" },
      { code: 'isUUID("not-a-uuid")', result: "false" },
      { code: 'isUUID("550e8400-e29b-41d4-a716")', result: "false" },
    ],
  },

  detectScript: {
    description: "Detects the dominant writing system (script) in text",
    size: "1.1KB",
    params: [{ name: "str", type: "string", default: "Hello World" }],
    examples: [
      { code: 'detectScript("Hello World")', result: '"latin"' },
      { code: 'detectScript("你好世界")', result: '"cjk"' },
      { code: 'detectScript("مرحبا بالعالم")', result: '"arabic"' },
      { code: 'detectScript("Привет мир")', result: '"cyrillic"' },
      { code: 'detectScript("שלום עולם")', result: '"hebrew"' },
    ],
  },

  // Advanced Functions
  template: {
    description: "Interpolates variables in a template string",
    size: "800B",
    params: [
      {
        name: "template",
        type: "string",
        default: "Hello {{name}}, you are {{age}} years old!",
      },
      { name: "data", type: "object", default: '{"name": "Alice", "age": 30}' },
    ],
    examples: [
      {
        code: 'template("Hello {{name}}!", {name: "World"})',
        result: '"Hello World!"',
      },
      {
        code: 'template("{{a}} + {{b}} = {{c}}", {a: 1, b: 2, c: 3})',
        result: '"1 + 2 = 3"',
      },
    ],
  },

  templateSafe: {
    description: "Interpolates variables with HTML escaping",
    size: "900B",
    params: [
      { name: "template", type: "string", default: "Hello {{name}}!" },
      {
        name: "data",
        type: "object",
        default: '{"name": "<script>alert(1)</script>"}',
      },
    ],
    examples: [
      {
        code: 'templateSafe("{{html}}", {html: "<div>"})',
        result: '"&lt;div&gt;"',
      },
    ],
  },

  fuzzyMatch: {
    description: "Performs fuzzy string matching with scoring",
    size: "1.2KB",
    params: [
      { name: "pattern", type: "string", default: "qck" },
      { name: "text", type: "string", default: "quick" },
    ],
    examples: [
      {
        code: 'fuzzyMatch("qck", "quick")',
        result: "{matched: true, score: 0.8}",
      },
      {
        code: 'fuzzyMatch("foo", "bar")',
        result: "{matched: false, score: 0}",
      },
    ],
  },

  levenshtein: {
    description: "Calculates the Levenshtein distance between two strings",
    size: "600B",
    params: [
      { name: "str1", type: "string", default: "kitten" },
      { name: "str2", type: "string", default: "sitting" },
    ],
    examples: [
      { code: 'levenshtein("kitten", "sitting")', result: "3" },
      { code: 'levenshtein("hello", "hello")', result: "0" },
      { code: 'levenshtein("abc", "xyz")', result: "3" },
    ],
  },

  levenshteinNormalized: {
    description: "Calculates normalized Levenshtein similarity (0-1)",
    size: "700B",
    params: [
      { name: "str1", type: "string", default: "kitten" },
      { name: "str2", type: "string", default: "sitting" },
    ],
    examples: [
      { code: 'levenshteinNormalized("kitten", "sitting")', result: "0.571" },
      { code: 'levenshteinNormalized("hello", "hello")', result: "1" },
      { code: 'levenshteinNormalized("abc", "xyz")', result: "0" },
    ],
  },

  diff: {
    description: "Shows the differences between two strings",
    size: "800B",
    params: [
      { name: "str1", type: "string", default: "hello world" },
      { name: "str2", type: "string", default: "hello friend" },
    ],
    examples: [
      {
        code: 'diff("hello world", "hello friend")',
        result: '{added: "friend", removed: "world"}',
      },
    ],
  },

  highlight: {
    description: "Highlights search terms in text",
    size: "700B",
    params: [
      {
        name: "text",
        type: "string",
        default: "The quick brown fox jumps over the lazy dog",
      },
      { name: "search", type: "string", default: "quick" },
      { name: "tag", type: "string", optional: true, default: "mark" },
    ],
    examples: [
      {
        code: 'highlight("Hello world", "world")',
        result: '"Hello <mark>world</mark>"',
      },
      {
        code: 'highlight("Test text", "test", "em")',
        result: '"<em>Test</em> text"',
      },
    ],
  },

  deburr: {
    description: "Removes diacritics/accents from characters",
    size: "500B",
    params: [{ name: "str", type: "string", default: "Héllö Wørld" }],
    examples: [
      { code: 'deburr("Héllö")', result: '"Hello"' },
      { code: 'deburr("café")', result: '"cafe"' },
      { code: 'deburr("naïve")', result: '"naive"' },
    ],
  },

  escapeHtml: {
    description: "Escapes HTML special characters",
    size: "300B",
    params: [
      { name: "str", type: "string", default: '<div>Hello & "World"</div>' },
    ],
    examples: [
      { code: 'escapeHtml("<div>")', result: '"&lt;div&gt;"' },
      { code: 'escapeHtml("A & B")', result: '"A &amp; B"' },
      { code: 'escapeHtml("\\"quotes\\"")', result: '"&quot;quotes&quot;"' },
    ],
  },

  hashString: {
    description: "Generates a hash code for a string",
    size: "250B",
    params: [{ name: "str", type: "string", default: "hello world" }],
    examples: [
      { code: 'hashString("hello")', result: "99162322" },
      { code: 'hashString("world")', result: "113318802" },
      { code: 'hashString("test")', result: "3556498" },
    ],
  },

  // Unicode Functions
  graphemes: {
    description: "Splits string by grapheme clusters (emoji-aware)",
    size: "400B",
    params: [{ name: "str", type: "string", default: "Hello 👨‍👩‍👧‍👦 World 🌍" }],
    examples: [
      { code: 'graphemes("Hi👋")', result: '["H", "i", "👋"]' },
      { code: 'graphemes("👨‍👩‍👧‍👦")', result: '["👨‍👩‍👧‍👦"]' },
    ],
  },

  codePoints: {
    description: "Gets array of Unicode code points",
    size: "300B",
    params: [{ name: "str", type: "string", default: "Hello 🌍" }],
    examples: [
      { code: 'codePoints("AB")', result: "[65, 66]" },
      { code: 'codePoints("🌍")', result: "[127757]" },
    ],
  },

  normalizeWhitespace: {
    description: "Normalizes various Unicode spaces to regular spaces",
    size: "400B",
    params: [{ name: "str", type: "string", default: "Hello   World" }],
    examples: [
      { code: 'normalizeWhitespace("a  b")', result: '"a b"' },
      { code: 'normalizeWhitespace("\\t\\ntext\\r")', result: '" text "' },
    ],
  },

  removeNonPrintable: {
    description: "Removes control and non-printable characters",
    size: "300B",
    params: [{ name: "str", type: "string", default: "Hello\\x00World\\x01" }],
    examples: [
      { code: 'removeNonPrintable("Hello\\x00World")', result: '"HelloWorld"' },
    ],
  },

  toASCII: {
    description: "Converts string to ASCII-safe representation",
    size: "450B",
    params: [{ name: "str", type: "string", default: "Héllö Wørld 🌍" }],
    examples: [
      { code: 'toASCII("Héllö")', result: '"Hello"' },
      { code: 'toASCII("café ☕")', result: '"cafe "' },
    ],
  },

  // Text Processing
  pluralize: {
    description: "Basic pluralization of English words",
    size: "600B",
    params: [
      { name: "word", type: "string", default: "cat" },
      { name: "count", type: "number", default: "2" },
    ],
    examples: [
      { code: 'pluralize("cat", 2)', result: '"cats"' },
      { code: 'pluralize("box", 3)', result: '"boxes"' },
      { code: 'pluralize("child", 2)', result: '"children"' },
    ],
  },

  singularize: {
    description: "Basic singularization of English words",
    size: "600B",
    params: [{ name: "word", type: "string", default: "cats" }],
    examples: [
      { code: 'singularize("cats")', result: '"cat"' },
      { code: 'singularize("boxes")', result: '"box"' },
      { code: 'singularize("children")', result: '"child"' },
    ],
  },

  // New functions added
  stripHtml: {
    description: "Removes HTML tags from a string",
    size: "300B",
    params: [
      { name: "str", type: "string", default: "<p>Hello <b>World</b></p>" },
    ],
    examples: [
      { code: 'stripHtml("<p>Hello</p>")', result: '"Hello"' },
      { code: 'stripHtml("<div>Test<br/>Text</div>")', result: '"TestText"' },
      { code: 'stripHtml("No tags here")', result: '"No tags here"' },
    ],
  },

  randomString: {
    description: "Generates a random string of specified length",
    size: "400B",
    params: [
      { name: "length", type: "number", default: "10" },
      {
        name: "chars",
        type: "string",
        optional: true,
        default:
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      },
    ],
    examples: [
      { code: "randomString(8)", result: '"a7B9xK2m"' },
      { code: 'randomString(4, "ABC")', result: '"ABCA"' },
      { code: 'randomString(6, "0123456789")', result: '"738291"' },
    ],
  },

  wordCount: {
    description: "Counts the number of words in a string",
    size: "200B",
    params: [
      {
        name: "str",
        type: "string",
        default: "The quick brown fox jumps over the lazy dog",
      },
    ],
    examples: [
      { code: 'wordCount("Hello world")', result: "2" },
      { code: 'wordCount("One")', result: "1" },
      { code: 'wordCount("The quick brown fox")', result: "4" },
    ],
  },

  memoize: {
    description:
      "Creates a memoized version of a function with LRU cache. Note: Returns a new function that caches results.",
    size: "800B",
    params: [
      { name: "fn", type: "function", default: "(x) => x * 2" },
      {
        name: "options",
        type: "object",
        optional: true,
        default: "{ maxSize: 100 }",
      },
    ],
    examples: [
      { code: "memoize((x) => x * 2)", result: "[Function: memoized]" },
      {
        code: "memoize((n) => n * n, { maxSize: 50 })",
        result: "[Function: memoized]",
      },
      { code: "memoize((a, b) => a + b)", result: "[Function: memoized]" },
    ],
  },

  extractEntities: {
    description:
      "Extracts various entities from text including emails, URLs, mentions, hashtags, phones, dates, and prices",
    size: "1.1KB",
    params: [
      {
        name: "text",
        type: "string",
        default:
          "Contact @john at john@example.com or call (555) 123-4567. Check #updates at https://example.com. Price: $99.99",
      },
    ],
    examples: [
      {
        code: 'extractEntities("Contact @john at john@example.com")',
        result: '{ emails: ["john@example.com"], mentions: ["@john"], ... }',
      },
      {
        code: 'extractEntities("Visit https://example.com for $99.99 #deals")',
        result:
          '{ urls: ["https://example.com"], prices: ["$99.99"], hashtags: ["#deals"], ... }',
      },
      {
        code: 'extractEntities("Call (555) 123-4567 on 2024-01-15")',
        result: '{ phones: ["(555) 123-4567"], dates: ["2024-01-15"], ... }',
      },
    ],
  },
  smartSplit: {
    description:
      "Intelligently splits text into sentences while handling abbreviations, decimals, and edge cases",
    size: "0.8KB",
    params: [
      {
        name: "text",
        type: "string",
        default:
          "Dr. Smith went to the store. He bought milk for $3.50. What a deal!",
      },
    ],
    examples: [
      {
        code: 'smartSplit("Hello world. How are you?")',
        result: '["Hello world.", "How are you?"]',
      },
      {
        code: 'smartSplit("Dr. Smith arrived. He was late.")',
        result: '["Dr. Smith arrived.", "He was late."]',
      },
      {
        code: 'smartSplit("The price is $3.50. What a deal!")',
        result: '["The price is $3.50.", "What a deal!"]',
      },
    ],
  },
  humanizeList: {
    description:
      "Converts arrays into human-readable lists with proper grammar and Oxford comma",
    size: "0.5KB",
    params: [
      {
        name: "items",
        type: "unknown[]",
        default: '["apple", "banana", "orange"]',
      },
      {
        name: "options",
        type: "HumanizeListOptions",
        default: "{}",
      },
    ],
    examples: [
      {
        code: 'humanizeList(["apple", "banana", "orange"])',
        result: '"apple, banana, and orange"',
      },
      {
        code: 'humanizeList(["red", "blue"], { conjunction: "or" })',
        result: '"red or blue"',
      },
      {
        code: "humanizeList([1, 2, 3], { quotes: true })",
        result: '"\\"1\\", \\"2\\", and \\"3\\""',
      },
    ],
  },
  classifyText: {
    description:
      "Classifies text content by type (URL, email, code, JSON, markdown, HTML, question, phone, numeric, or plain text) with confidence scoring",
    size: "2.3KB",
    params: [
      {
        name: "text",
        type: "string",
        default: '"https://example.com"',
      },
    ],
    examples: [
      {
        code: 'classifyText("https://example.com")',
        result: '{ type: "url", confidence: 1 }',
      },
      {
        code: 'classifyText("What is TypeScript?")',
        result: '{ type: "question", confidence: 1 }',
      },
      {
        code: 'classifyText("function hello() { return 42; }")',
        result: '{ type: "code", confidence: 0.85 }',
      },
    ],
  },
  sanitize: {
    description:
      "Security-focused string sanitization for safe use in web applications by removing or escaping dangerous content",
    size: "2.5KB",
    params: [
      {
        name: "str",
        type: "string",
        default: "\"<script>alert('xss')</script>Hello\"",
      },
      {
        name: "options",
        type: "object",
        default: "{}",
      },
    ],
    examples: [
      {
        code: "sanitize(\"<script>alert('xss')</script>Hello\")",
        result: '"Hello"',
      },
      {
        code: 'sanitize("<b>Bold</b> text", { allowedTags: ["b"] })',
        result: '"<b>Bold</b> text"',
      },
      {
        code: 'sanitize("javascript:alert(1)")',
        result: '""',
      },
    ],
  },
  redact: {
    description:
      "Redacts sensitive information from text for UI/logging purposes (SSN, credit cards, emails, phone numbers)",
    size: "1.3KB",
    params: [
      {
        name: "text",
        type: "string",
        default: '"My SSN is 123-45-6789"',
      },
      {
        name: "options",
        type: "object",
        optional: true,
        default: "{}",
      },
    ],
    examples: [
      {
        code: 'redact("My SSN is 123-45-6789")',
        result: '"My SSN is ***-**-6789"',
      },
      {
        code: 'redact("Card: 4532-1234-5678-9010")',
        result: '"Card: **** **** **** 9010"',
      },
      {
        code: 'redact("Email: user@example.com", { types: ["email"] })',
        result: '"Email: use***@example.com"',
      },
      {
        code: 'redact("SSN: 123-45-6789", { strategy: "full" })',
        result: '"SSN: ***-**-****"',
      },
    ],
  },
};
