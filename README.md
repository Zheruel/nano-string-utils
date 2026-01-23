# nano-string-utils

Ultra-lightweight string utilities with zero dependencies. Tree-shakeable, fully typed, and optimized for modern JavaScript.

[![npm version](https://img.shields.io/npm/v/nano-string-utils.svg)](https://www.npmjs.com/package/nano-string-utils)
[![JSR](https://jsr.io/badges/@zheruel/nano-string-utils)](https://jsr.io/@zheruel/nano-string-utils)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/nano-string-utils)](https://bundlephobia.com/package/nano-string-utils)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue.svg)](https://www.typescriptlang.org/)
[![CI/CD](https://github.com/Zheruel/nano-string-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/Zheruel/nano-string-utils/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-≥18-brightgreen.svg)](https://nodejs.org/)
[![Deno](https://img.shields.io/badge/Deno-✓-blue.svg)](https://deno.land)
[![Bun](https://img.shields.io/badge/Bun-✓-orange.svg)](https://bun.sh)

## Documentation

📚 **[View Full API Documentation](https://zheruel.github.io/nano-string-utils/)**

🚀 **[Migration Guide](https://zheruel.github.io/nano-string-utils/#migration)** - Step-by-step guide for migrating from lodash/underscore

## Features

- 🚀 **Zero dependencies** - No bloat, just pure functions
- 📦 **< 1KB per function** - Minimal bundle impact
- 🌳 **Tree-shakeable** - Only import what you need
- 💪 **Fully typed** - Complete TypeScript support with function overloads and template literal types
- ⚡ **Fast performance** - 2-25x faster than lodash for many operations
- ⚡ **ESM & CJS** - Works everywhere
- 🧪 **100% tested** - Reliable and production-ready
- 🔒 **Type-safe** - Written in strict TypeScript with enhanced type inference and compile-time transformations
- 🛡️ **Null-safe** - All functions handle null/undefined gracefully without throwing errors
- 📝 **Well documented** - JSDoc comments for all functions

## Runtime Compatibility

nano-string-utils works seamlessly across all modern JavaScript runtimes:

| Runtime     | Support | Installation                          | CLI |
| ----------- | ------- | ------------------------------------- | --- |
| Node.js ≥18 | ✅ Full | `npm install nano-string-utils`       | ✅  |
| Deno        | ✅ Full | `deno add @zheruel/nano-string-utils` | ✅  |
| Bun         | ✅ Full | `bun add nano-string-utils`           | ✅  |
| Browser     | ✅ Full | Via bundler or CDN                    | ❌  |

All core functions use standard JavaScript APIs and work identically across runtimes. The CLI tool supports Node.js, Deno, and Bun.

## Installation

### Node.js

```bash
npm install nano-string-utils
# or
yarn add nano-string-utils
# or
pnpm add nano-string-utils
```

### Deno

```typescript
// From JSR (recommended)
import { slugify } from "jsr:@zheruel/nano-string-utils";

// Or add to your project
deno add @zheruel/nano-string-utils
```

### Bun

```bash
bun add nano-string-utils
```

### Browser (CDN)

```html
<!-- Latest version -->
<script src="https://unpkg.com/nano-string-utils/dist/index.iife.js"></script>

<!-- Or specific version -->
<script src="https://cdn.jsdelivr.net/npm/nano-string-utils@0.16.0/dist/index.iife.js"></script>

<script>
  // All functions available on global nanoStringUtils object
  const slug = nanoStringUtils.slugify("Hello World!");
  console.log(slug); // 'hello-world'
</script>
```

For modern browsers with ES modules:

```html
<script type="module">
  import {
    slugify,
    camelCase,
  } from "https://unpkg.com/nano-string-utils/dist/index.js";

  console.log(slugify("Hello World")); // 'hello-world'
  console.log(camelCase("hello-world")); // 'helloWorld'
</script>
```

## Quick Start

```javascript
import {
  slugify,
  camelCase,
  truncate,
  isEmail,
  fuzzyMatch,
} from "nano-string-utils";

// Transform strings with ease
slugify("Hello World!"); // 'hello-world'
camelCase("hello-world"); // 'helloWorld'
truncate("Long text here", 10); // 'Long te...'

// Validate inputs
isEmail("user@example.com"); // true
isEmail("invalid.email"); // false

// Advanced string matching
fuzzyMatch("gto", "goToLine"); // { matched: true, score: 0.546 }
fuzzyMatch("abc", "xyz"); // null (no match)
```

### Most Popular Functions

#### `slugify(str: string): string`

Convert any string to a URL-safe slug.

```javascript
slugify("Hello World!"); // 'hello-world'
slugify("  Multiple   Spaces  "); // 'multiple-spaces'
slugify("Special@#Characters!"); // 'special-characters'
```

#### `camelCase(str: string): string`

Convert strings to camelCase for JavaScript variables.

```javascript
camelCase("hello-world"); // 'helloWorld'
camelCase("HELLO_WORLD"); // 'helloWorld'
camelCase("Hello World"); // 'helloWorld'
```

#### `truncate(str: string, length: number, suffix?: string): string`

Intelligently truncate text with customizable suffix.

```javascript
truncate("Long text here", 10); // 'Long te...'
truncate("Long text here", 10, "→"); // 'Long tex→'
```

#### `isEmail(str: string, options?: { allowInternational?: boolean }): boolean`

Validate email addresses with a robust regex. Supports apostrophes by default (for names like O'Connor). International characters require opt-in.

```javascript
isEmail("user@example.com"); // true
isEmail("test@sub.domain.com"); // true
isEmail("o'connor@example.com"); // true (apostrophes supported)
isEmail("invalid.email"); // false

// International support (opt-in)
isEmail("josé@example.com"); // false
isEmail("josé@example.com", { allowInternational: true }); // true
```

#### `fuzzyMatch(query: string, target: string): FuzzyMatchResult | null`

Perform fuzzy string matching for search features.

```javascript
fuzzyMatch("usrctrl", "userController.js"); // { matched: true, score: 0.444 }
fuzzyMatch("of", "openFile"); // { matched: true, score: 0.75 }
```

> 📖 **See all 60 functions in the API Reference below**

## CLI

Nano String Utils includes a command-line interface for quick string transformations directly in your terminal. The CLI works with Node.js, Deno, and Bun!

### Installation & Usage

#### Node.js

```bash
# Global installation
npm install -g nano-string-utils
nano-string slugify "Hello World"

# Using npx (no installation required)
npx nano-string-utils slugify "Hello World"
```

#### Deno

```bash
# Direct execution (no installation required)
deno run --allow-read https://unpkg.com/nano-string-utils/bin/nano-string.js slugify "Hello World"

# Or if installed locally
deno run --allow-read node_modules/nano-string-utils/bin/nano-string.js slugify "Hello World"
```

#### Bun

```bash
# Using bunx (no installation required)
bunx nano-string-utils slugify "Hello World"

# Or if installed
bun run nano-string-utils slugify "Hello World"
```

### Basic Usage

```bash
nano-string <function> <input> [options]
```

### Examples

#### Simple transformations

```bash
nano-string slugify "Hello World!"           # hello-world
nano-string camelCase "hello-world"          # helloWorld
nano-string kebabCase "hello_world"          # hello-world
nano-string capitalize "hello"               # Hello
nano-string reverse "hello"                  # olleh
```

#### Using pipes

```bash
echo "Hello World" | nano-string slugify     # hello-world
cat file.txt | nano-string truncate --length 50
```

#### Functions with options

```bash
# Truncate with custom length
nano-string truncate "Long text here" --length 10  # Long te...

# Template interpolation
nano-string template "Hello {{name}}" --data '{"name":"World"}'  # Hello World

# Pad strings
nano-string padStart "hi" --length 5 --char "*"  # ***hi

# Generate random strings
nano-string randomString --length 10  # Generates 10-character string

# Text processing
nano-string smartSplit "Dr. Smith went to the store. He bought milk."  # ['Dr. Smith went to the store.', 'He bought milk.']
nano-string humanizeList "apple,banana,orange" --conjunction "or"  # apple, banana, or orange
```

#### Validation functions

```bash
nano-string isEmail "test@example.com"              # true
nano-string isUrl "https://example.com"             # true
nano-string isASCII "hello"                         # true
nano-string isHexColor "#ff5733"                    # true
nano-string isNumeric "42"                          # true
nano-string isInteger "42"                          # true
nano-string isAlphanumeric "user123"                # true
nano-string isUUID "550e8400-e29b-41d4-a716-446655440000"  # true
```

#### Analysis functions

```bash
nano-string wordCount "hello world test"     # 3
nano-string levenshtein "kitten" "sitting"   # 3
nano-string diff "hello" "hallo"             # Shows differences
```

### Available Commands

To see all available functions:

```bash
nano-string --help
```

For help on a specific function:

```bash
nano-string slugify --help
```

## API Reference

The library provides 60 string utility functions organized by category. Click on any category to explore the available functions.

<details>
<summary><b>🔤 Case Conversion Functions (10 functions)</b></summary>

### Case Conversion

Transform strings between different naming conventions commonly used in programming.

#### `slugify(str: string): string`

Converts a string to a URL-safe slug.

```javascript
slugify("Hello World!"); // 'hello-world'
slugify("  Multiple   Spaces  "); // 'multiple-spaces'
```

#### `camelCase(str: string): string`

Converts a string to camelCase.

```javascript
camelCase("hello world"); // 'helloWorld'
camelCase("hello-world"); // 'helloWorld'
camelCase("hello_world"); // 'helloWorld'
```

#### `snakeCase(str: string): string`

Converts a string to snake_case.

```javascript
snakeCase("hello world"); // 'hello_world'
snakeCase("helloWorld"); // 'hello_world'
snakeCase("hello-world"); // 'hello_world'
```

#### `kebabCase(str: string): string`

Converts a string to kebab-case.

```javascript
kebabCase("hello world"); // 'hello-world'
kebabCase("helloWorld"); // 'hello-world'
kebabCase("hello_world"); // 'hello-world'
```

#### `pascalCase(str: string): string`

Converts a string to PascalCase.

```javascript
pascalCase("hello world"); // 'HelloWorld'
pascalCase("hello-world"); // 'HelloWorld'
pascalCase("hello_world"); // 'HelloWorld'
```

#### `constantCase(str: string): string`

Converts a string to CONSTANT_CASE.

```javascript
constantCase("hello world"); // 'HELLO_WORLD'
constantCase("helloWorld"); // 'HELLO_WORLD'
constantCase("hello-world"); // 'HELLO_WORLD'
constantCase("XMLHttpRequest"); // 'XML_HTTP_REQUEST'
```

#### `dotCase(str: string): string`

Converts a string to dot.case.

```javascript
dotCase("hello world"); // 'hello.world'
dotCase("helloWorld"); // 'hello.world'
dotCase("hello-world"); // 'hello.world'
dotCase("XMLHttpRequest"); // 'xml.http.request'
dotCase("com/example/package"); // 'com.example.package'
```

#### `pathCase(str: string): string`

Converts a string to path/case (forward slash separated).

```javascript
pathCase("hello world"); // 'hello/world'
pathCase("helloWorld"); // 'hello/world'
pathCase("hello-world"); // 'hello/world'
pathCase("hello_world"); // 'hello/world'
pathCase("XMLHttpRequest"); // 'xml/http/request'
pathCase("src.components.Header"); // 'src/components/header'
pathCase("com.example.package"); // 'com/example/package'
```

#### `titleCase(str: string, options?: { exceptions?: string[] }): string`

Converts a string to title case with proper capitalization rules.

```javascript
titleCase("the quick brown fox"); // 'The Quick Brown Fox'
titleCase("a tale of two cities"); // 'A Tale of Two Cities'
titleCase("mother-in-law"); // 'Mother-in-Law'
titleCase("don't stop believing"); // "Don't Stop Believing"
titleCase("NASA launches rocket"); // 'NASA Launches Rocket'
titleCase("2001: a space odyssey"); // '2001: A Space Odyssey'

// With custom exceptions
titleCase("the lord of the rings", {
  exceptions: ["versus"],
}); // 'The Lord of the Rings'
```

#### `sentenceCase(str: string): string`

Converts a string to sentence case (first letter of each sentence capitalized).

```javascript
sentenceCase("hello world"); // 'Hello world'
sentenceCase("HELLO WORLD"); // 'Hello world'
sentenceCase("hello. world! how are you?"); // 'Hello. World! How are you?'
sentenceCase("this is the first. this is the second."); // 'This is the first. This is the second.'
sentenceCase("the u.s.a. is large"); // 'The u.s.a. is large'
sentenceCase("i love javascript"); // 'I love javascript'
sentenceCase("what? when? where?"); // 'What? When? Where?'
```

</details>

<details>
<summary><b>✂️ String Manipulation (16 functions)</b></summary>

### String Manipulation

Essential functions for transforming and manipulating text content.

#### `capitalize(str: string): string`

Capitalizes the first letter of a string and lowercases the rest.

```javascript
capitalize("hello world"); // 'Hello world'
capitalize("HELLO"); // 'Hello'
```

#### `reverse(str: string): string`

Reverses a string.

```javascript
reverse("hello"); // 'olleh'
reverse("world"); // 'dlrow'
```

#### `truncate(str: string, length: number, suffix?: string): string`

Truncates a string to a specified length with an optional suffix.

```javascript
truncate("Long text here", 10); // 'Long te...'
truncate("Long text here", 10, "→"); // 'Long tex→'
```

#### `excerpt(str: string, length: number, suffix?: string): string`

Creates a smart excerpt from text with word boundary awareness.

```javascript
excerpt("The quick brown fox jumps over the lazy dog", 20); // 'The quick brown fox...'
excerpt("Hello world. This is a test.", 15); // 'Hello world...'
excerpt("Long technical documentation text here", 25, "…"); // 'Long technical…'
excerpt("Supercalifragilisticexpialidocious", 10); // 'Supercalif...'
```

#### `pad(str: string, length: number, chars?: string): string`

Pads a string to a given length by adding characters to both sides (centers the string).

```javascript
pad("Hi", 6); // '  Hi  '
pad("Hi", 6, "-"); // '--Hi--'
pad("Hi", 7, "-"); // '--Hi---'
```

#### `padStart(str: string, length: number, chars?: string): string`

Pads a string to a given length by adding characters to the left.

```javascript
padStart("5", 3, "0"); // '005'
padStart("Hi", 5, "."); // '...Hi'
padStart("Hi", 6, "=-"); // '=-=-Hi'
```

#### `padEnd(str: string, length: number, chars?: string): string`

Pads a string to a given length by adding characters to the right.

```javascript
padEnd("Hi", 5, "."); // 'Hi...'
padEnd("Hi", 6, "=-"); // 'Hi=-=-'
padEnd("5", 3, "0"); // '500'
```

#### `trim(str: string, chars?: string): string`

Removes specified characters from both ends of a string.

```javascript
trim("  hello  "); // 'hello'
trim("///path///", "/"); // 'path'
trim("---title---", "-"); // 'title'
trim('"hello"', '"'); // 'hello'
trim("[content]", "[]"); // 'content'
```

#### `trimStart(str: string, chars?: string): string`

Removes specified characters from the start of a string.

```javascript
trimStart("  hello"); // 'hello'
trimStart("///path", "/"); // 'path'
trimStart("00042", "0"); // '42'
trimStart("---title", "-"); // 'title'
```

#### `trimEnd(str: string, chars?: string): string`

Removes specified characters from the end of a string.

```javascript
trimEnd("hello  "); // 'hello'
trimEnd("path///", "/"); // 'path'
trimEnd("title---", "-"); // 'title'
trimEnd("Hello!!!", "!"); // 'Hello'
```

#### `mask(str: string, options?: MaskOptions | number): string`

Masks a string, showing only a portion of the original characters.

```javascript
mask("4532123456789010"); // '************9010'
mask("secretpassword"); // '**********word'
mask("user@example.com", { showStart: true }); // 'user************'
mask("password", { show: 2 }); // '******rd'
mask("secret", { maskChar: "•" }); // '••cret'
mask("secret", { show: 0 }); // '******'
```

#### `wrap(str: string, options?: WrapOptions | number): string`

Word-wraps text to a specified width.

```javascript
wrap("Hello world, how are you today?", 15);
// 'Hello world,\nhow are you\ntoday?'

wrap("one two three", 7); // 'one two\nthree'

wrap("Supercalifragilisticexpialidocious", { width: 10, breakWords: true });
// 'Supercalif\nragilistic\nexpialidoc\nious'

wrap("text", { width: 40, separator: "<br>" }); // Uses <br> instead of \n
```

#### `deburr(str: string): string`

Removes diacritics/accents from Latin characters.

```javascript
deburr("café"); // 'cafe'
deburr("naïve"); // 'naive'
deburr("Bjørn"); // 'Bjorn'
deburr("São Paulo"); // 'Sao Paulo'
deburr("Müller"); // 'Muller'
```

#### `wordCount(str: string): number`

Counts the number of words in a string.

```javascript
wordCount("Hello world test"); // 3
wordCount("One-word counts as one"); // 5
```

#### `randomString(length: number, charset?: string): string`

Generates a random string of specified length.

```javascript
randomString(10); // 'aBc123XyZ9'
randomString(5, "abc"); // 'abcab'
randomString(8, "0123456789"); // '42318765'
```

#### `hashString(str: string): number`

Generates a simple hash from a string (non-cryptographic).

```javascript
hashString("hello"); // 99162322
hashString("world"); // 113318802
```

</details>

<details>
<summary><b>📝 Text Processing (14 functions)</b></summary>

### Text Processing

Advanced text processing utilities for handling HTML, whitespace, special characters, and entity extraction.

#### `stripHtml(str: string): string`

Removes HTML tags from a string.

```javascript
stripHtml("<p>Hello <b>world</b>!</p>"); // 'Hello world!'
stripHtml("<div>Text</div>"); // 'Text'
```

#### `sanitize(str: string, options?: SanitizeOptions): string`

Security-focused string sanitization for safe use in web applications by removing or escaping dangerous content.

```javascript
sanitize("<script>alert('xss')</script>Hello"); // 'Hello'
sanitize("<b>Bold</b> text", { allowedTags: ["b"] }); // '<b>Bold</b> text'
sanitize("javascript:alert(1)"); // ''
sanitize("<div onclick='alert(1)'>Click</div>"); // 'Click'
```

#### `redact(text: string, options?: RedactOptions): string`

Redacts sensitive information from text for UI/logging purposes. Supports SSN, credit cards, emails, and phone numbers with customizable redaction strategies.

**⚠️ Security Notice**: This is for UI/logging purposes to prevent accidental exposure. Not a substitute for proper data security practices or encryption.

```javascript
// Default: redact all types with partial strategy (show last 4)
redact("My SSN is 123-45-6789"); // 'My SSN is ***-**-6789'
redact("Card: 4532-1234-5678-9010"); // 'Card: **** **** **** 9010'
redact("Email: user@example.com"); // 'Email: use***@example.com'
redact("Phone: (555) 123-4567"); // 'Phone: (***) ***-4567'

// Selective type redaction
redact("Email: user@example.com, SSN: 123-45-6789", {
  types: ["email"], // Only redact emails
}); // 'Email: use***@example.com, SSN: 123-45-6789'

// Full redaction (no partial reveal)
redact("SSN: 123-45-6789", { strategy: "full" }); // 'SSN: ***-**-****'

// Custom patterns
redact("Secret: ABC-123", {
  customPatterns: [{ pattern: /[A-Z]{3}-\d{3}/g, replacement: "[REDACTED]" }],
}); // 'Secret: [REDACTED]'
```

#### `escapeHtml(str: string): string`

Escapes HTML special characters.

```javascript
escapeHtml('<div>Hello & "world"</div>'); // '&lt;div&gt;Hello &amp; &quot;world&quot;&lt;/div&gt;'
escapeHtml("It's <b>bold</b>"); // 'It&#x27;s &lt;b&gt;bold&lt;/b&gt;'
```

#### `normalizeWhitespace(str: string, options?: NormalizeWhitespaceOptions): string`

Normalizes various Unicode whitespace characters to regular spaces.

```javascript
normalizeWhitespace("hello   world"); // 'hello world'
normalizeWhitespace("hello\u00A0world"); // 'hello world' (non-breaking space)
normalizeWhitespace("  hello  "); // 'hello'
normalizeWhitespace("hello\n\nworld"); // 'hello world'

// With options
normalizeWhitespace("  hello  ", { trim: false }); // ' hello '
normalizeWhitespace("a    b", { collapse: false }); // 'a    b'
normalizeWhitespace("hello\n\nworld", { preserveNewlines: true }); // 'hello\n\nworld'

// Handles various Unicode spaces
normalizeWhitespace("café\u2003test"); // 'café test' (em space)
normalizeWhitespace("hello\u200Bworld"); // 'hello world' (zero-width space)
normalizeWhitespace("日本\u3000語"); // '日本 語' (ideographic space)
```

#### `removeNonPrintable(str: string, options?: RemoveNonPrintableOptions): string`

Removes non-printable control characters and formatting characters from strings.

```javascript
removeNonPrintable("hello\x00world"); // 'helloworld' (removes NULL character)
removeNonPrintable("hello\nworld"); // 'helloworld' (removes newline by default)
removeNonPrintable("hello\u200Bworld"); // 'helloworld' (removes zero-width space)
removeNonPrintable("hello\u202Dworld"); // 'helloworld' (removes directional override)

// With options
removeNonPrintable("hello\nworld", { keepNewlines: true }); // 'hello\nworld'
removeNonPrintable("hello\tworld", { keepTabs: true }); // 'hello\tworld'
removeNonPrintable("hello\r\nworld", { keepCarriageReturns: true }); // 'hello\rworld'

// Preserves emoji with zero-width joiners
removeNonPrintable("👨‍👩‍👧‍👦"); // '👨‍👩‍👧‍👦' (family emoji preserved)
removeNonPrintable("text\x1B[32mgreen\x1B[0m"); // 'text[32mgreen[0m' (ANSI escapes removed)
```

#### `toASCII(str: string, options?: { placeholder?: string }): string`

Converts a string to ASCII-safe representation by removing diacritics, converting common Unicode symbols, and optionally replacing non-ASCII characters.

```javascript
toASCII("café"); // 'cafe'
toASCII("Hello "world""); // 'Hello "world"'
toASCII("em—dash"); // 'em-dash'
toASCII("€100"); // 'EUR100'
toASCII("½ + ¼ = ¾"); // '1/2 + 1/4 = 3/4'
toASCII("→ ← ↑ ↓"); // '-> <- ^ v'
toASCII("α β γ"); // 'a b g'
toASCII("Привет"); // 'Privet'
toASCII("你好"); // '' (removes non-convertible characters)
toASCII("你好", { placeholder: "?" }); // '??'
toASCII("Hello 世界", { placeholder: "?" }); // 'Hello ??'
toASCII("© 2024 Müller™"); // '(c) 2024 Muller(TM)'
```

#### `pluralize(word: string, count?: number): string`

Converts a singular word to its plural form using English pluralization rules. Optionally takes a count to conditionally pluralize.

```javascript
pluralize("box"); // 'boxes'
pluralize("baby"); // 'babies'
pluralize("person"); // 'people'
pluralize("analysis"); // 'analyses'
pluralize("cactus"); // 'cacti'

// With count parameter
pluralize("item", 1); // 'item' (singular for count of 1)
pluralize("item", 0); // 'items' (plural for count of 0)
pluralize("item", 5); // 'items' (plural for count > 1)

// Preserves casing
pluralize("Box"); // 'Boxes'
pluralize("PERSON"); // 'PEOPLE'
```

#### `singularize(word: string): string`

Converts a plural word to its singular form using English singularization rules.

```javascript
singularize("boxes"); // 'box'
singularize("babies"); // 'baby'
singularize("people"); // 'person'
singularize("analyses"); // 'analysis'
singularize("cacti"); // 'cactus'
singularize("data"); // 'datum'

// Preserves casing
singularize("Boxes"); // 'Box'
singularize("PEOPLE"); // 'PERSON'
```

#### `extractEntities(text: string): ExtractedEntities`

Extracts various entities from text including emails, URLs, mentions, hashtags, phones, dates, and prices.

```javascript
// Extract from mixed content
const text =
  "Contact @john at john@example.com or call (555) 123-4567. Check #updates at https://example.com. Price: $99.99";
const entities = extractEntities(text);
// Returns:
// {
//   emails: ['john@example.com'],
//   urls: ['https://example.com'],
//   mentions: ['@john'],
//   hashtags: ['#updates'],
//   phones: ['(555) 123-4567'],
//   dates: [],
//   prices: ['$99.99']
// }

// Extract from social media content
const tweet =
  "Hey @alice and @bob! Check out #javascript #typescript at https://github.com/example";
const social = extractEntities(tweet);
// social.mentions: ['@alice', '@bob']
// social.hashtags: ['#javascript', '#typescript']
// social.urls: ['https://github.com/example']

// Extract contact information
const contact = "Email: support@company.com, Phone: +1-800-555-0100";
const info = extractEntities(contact);
// info.emails: ['support@company.com']
// info.phones: ['+1-800-555-0100']

// Extract dates and prices
const invoice = "Invoice Date: 2024-01-15, Due: 01/30/2024, Amount: $1,234.56";
const billing = extractEntities(invoice);
// billing.dates: ['2024-01-15', '01/30/2024']
// billing.prices: ['$1,234.56']
```

#### `smartSplit(text: string): string[]`

Intelligently splits text into sentences while properly handling abbreviations, ellipses, and decimal numbers.

```javascript
// Basic sentence splitting
smartSplit("Hello world. How are you? I'm fine!");
// ['Hello world.', 'How are you?', "I'm fine!"]

// Handles abbreviations correctly
smartSplit("Dr. Smith went to the store. He bought milk.");
// ['Dr. Smith went to the store.', 'He bought milk.']

// Preserves decimal numbers
smartSplit("The price is $10.50. That's expensive!");
// ['The price is $10.50.', "That's expensive!"]

// Handles multiple abbreviations
smartSplit(
  "Mr. and Mrs. Johnson live on St. Paul Ave. They moved from the U.S.A. last year."
);
// ['Mr. and Mrs. Johnson live on St. Paul Ave.', 'They moved from the U.S.A. last year.']

// Handles ellipses
smartSplit("I was thinking... Maybe we should go. What do you think?");
// ['I was thinking...', 'Maybe we should go.', 'What do you think?']
```

#### `humanizeList(items: unknown[], options?: HumanizeListOptions): string`

Converts an array into a grammatically correct, human-readable list with proper conjunctions and optional Oxford comma.

```javascript
// Basic usage
humanizeList(["apple", "banana", "orange"]);
// 'apple, banana, and orange'

// Two items
humanizeList(["yes", "no"]);
// 'yes and no'

// With custom conjunction
humanizeList(["red", "green", "blue"], { conjunction: "or" });
// 'red, green, or blue'

// Without Oxford comma
humanizeList(["a", "b", "c"], { oxford: false });
// 'a, b and c'

// With quotes
humanizeList(["run", "jump", "swim"], { quotes: true });
// '"run", "jump", and "swim"'

// Handles mixed types and nulls
humanizeList([1, null, "text", undefined, true]);
// '1, text, and true'

// Empty arrays
humanizeList([]);
// ''
```

</details>

<details>
<summary><b>✅ Validation Functions (9 functions)</b></summary>

### String Validation

Utilities for validating string formats and content.

#### `isEmail(str: string, options?: { allowInternational?: boolean }): boolean`

Validates if a string is a valid email format. Supports apostrophes by default (useful for names like O'Connor, D'Angelo). International (Unicode) characters require opt-in via the `allowInternational` option.

```javascript
isEmail("user@example.com"); // true
isEmail("invalid.email"); // false
isEmail("test@sub.domain.com"); // true

// Apostrophes supported by default
isEmail("o'connor@example.com"); // true
isEmail("d'angelo@test.co"); // true

// International characters require opt-in
isEmail("josé@example.com"); // false (default behavior)
isEmail("josé@example.com", { allowInternational: true }); // true
isEmail("müller@domain.de", { allowInternational: true }); // true
isEmail("user@café.com", { allowInternational: true }); // true
```

#### `isUrl(str: string): boolean`

Validates if a string is a valid URL format.

```javascript
isUrl("https://example.com"); // true
isUrl("http://localhost:3000"); // true
isUrl("not a url"); // false
isUrl("ftp://files.com/file.zip"); // true
```

#### `isASCII(str: string): boolean`

Checks if a string contains only ASCII characters (code points 0-127).

```javascript
isASCII("Hello World!"); // true
isASCII("café"); // false
isASCII("👍"); // false
isASCII("abc123!@#"); // true
isASCII(""); // true
```

#### `isHexColor(str: string): boolean`

Validates if a string is a valid hexadecimal color code.

```javascript
isHexColor("#fff"); // true (3-digit)
isHexColor("#ffffff"); // true (6-digit)
isHexColor("#fff8"); // true (4-digit with alpha)
isHexColor("#ffffff80"); // true (8-digit with alpha)
isHexColor("#FFF"); // true (case-insensitive)
isHexColor("fff"); // false (missing #)
isHexColor("#gggggg"); // false (invalid characters)
```

#### `isNumeric(str: string): boolean`

Validates if a string represents a numeric value (integer or decimal).

```javascript
isNumeric("42"); // true
isNumeric("-17"); // true
isNumeric("3.14"); // true
isNumeric("-0.5"); // true
isNumeric("  42  "); // true (whitespace trimmed)
isNumeric("abc"); // false
isNumeric(""); // false
isNumeric("Infinity"); // false
isNumeric("1e5"); // false (scientific notation not supported)
```

#### `isInteger(str: string): boolean`

Validates if a string represents an integer value (whole number without decimals). Useful for validating age fields, quantities, IDs, pagination parameters, and other inputs that should only accept whole numbers.

```javascript
isInteger("42"); // true
isInteger("-17"); // true
isInteger("0"); // true
isInteger("  42  "); // true (whitespace trimmed)
isInteger("007"); // true (leading zeros allowed)
isInteger("3.14"); // false (decimal number)
isInteger("42.0"); // false (contains decimal point)
isInteger("abc"); // false
isInteger(""); // false
isInteger("Infinity"); // false
isInteger("1e5"); // false (scientific notation not supported)
```

#### `isAlphanumeric(str: string): boolean`

Validates if a string contains only alphanumeric characters (a-z, A-Z, 0-9). Useful for validating usernames, identifiers, and other inputs that should not contain special characters or whitespace.

```javascript
isAlphanumeric("user123"); // true
isAlphanumeric("HelloWorld"); // true
isAlphanumeric("ABC123XYZ"); // true
isAlphanumeric("test"); // true
isAlphanumeric("123"); // true
isAlphanumeric("hello_world"); // false (underscore not allowed)
isAlphanumeric("hello world"); // false (whitespace not allowed)
isAlphanumeric("test-123"); // false (hyphen not allowed)
isAlphanumeric("café"); // false (Unicode not allowed)
isAlphanumeric(""); // false (empty string)
```

#### `isUUID(str: string): boolean`

Validates if a string is a valid UUID (Universally Unique Identifier) in the standard 8-4-4-4-12 format. Accepts all UUID versions (v1-v5), the NIL UUID, and is case-insensitive. Perfect for validating API identifiers, session tokens, and database IDs.

```javascript
isUUID("550e8400-e29b-41d4-a716-446655440000"); // true (v4)
isUUID("6ba7b810-9dad-11d1-80b4-00c04fd430c8"); // true (v1)
isUUID("00000000-0000-0000-0000-000000000000"); // true (NIL UUID)
isUUID("550E8400-E29B-41D4-A716-446655440000"); // true (uppercase)
isUUID("550e8400e29b41d4a716446655440000"); // false (no hyphens)
isUUID("550e8400-e29b-41d4-a716"); // false (too short)
isUUID("not-a-uuid"); // false (invalid format)
isUUID(""); // false (empty string)
```

#### `detectScript(str: string): 'latin' | 'cjk' | 'arabic' | 'cyrillic' | 'hebrew' | 'devanagari' | 'greek' | 'thai' | 'unknown'`

Detects the dominant writing system (script) in a text string.

```javascript
detectScript("Hello World"); // 'latin'
detectScript("你好世界"); // 'cjk'
detectScript("مرحبا بالعالم"); // 'arabic'
detectScript("Привет мир"); // 'cyrillic'
detectScript("שלום עולם"); // 'hebrew'
detectScript("नमस्ते दुनिया"); // 'devanagari'
detectScript("Γειά σου κόσμε"); // 'greek'
detectScript("สวัสดีชาวโลก"); // 'thai'
detectScript(""); // 'unknown'
```

#### `classifyText(str: string): { type: string, confidence: number }`

Classifies text content by type (URL, email, code, JSON, markdown, HTML, question, phone, numeric, or plain text) with confidence scoring.

```javascript
classifyText("https://example.com"); // { type: 'url', confidence: 1 }
classifyText("user@example.com"); // { type: 'email', confidence: 1 }
classifyText("What is TypeScript?"); // { type: 'question', confidence: 1 }
classifyText('{"key": "value"}'); // { type: 'json', confidence: 1 }
classifyText("function hello() { return 42; }"); // { type: 'code', confidence: 0.85 }
classifyText("<div>Hello</div>"); // { type: 'html', confidence: 0.9 }
classifyText("# Title\n\nText"); // { type: 'markdown', confidence: 0.7 }
classifyText("+1-555-123-4567"); // { type: 'phone', confidence: 0.95 }
classifyText("42 + 17 = 59"); // { type: 'numeric', confidence: 0.8 }
classifyText("Just plain text"); // { type: 'text', confidence: 0.7 }
```

</details>

<details>
<summary><b>🔍 String Analysis & Comparison (6 functions)</b></summary>

### String Analysis & Comparison

Advanced utilities for analyzing and comparing strings.

#### `diff(oldStr: string, newStr: string): string`

Computes a simple string diff comparison showing additions and deletions.

```javascript
diff("hello world", "hello beautiful world"); // 'hello {+beautiful +}world'
diff("goodbye world", "hello world"); // '[-goodbye-]{+hello+} world'
diff("v1.0.0", "v1.1.0"); // 'v1.[-0-]{+1+}.0'
diff("debug: false", "debug: true"); // 'debug: [-fals-]{+tru+}e'
diff("user@example.com", "admin@example.com"); // '[-user-]{+admin+}@example.com'

// Form field changes
diff("John Doe", "Jane Doe"); // 'J[-ohn-]{+ane+} Doe'

// Configuration changes
diff("port: 3000", "port: 8080"); // 'port: [-300-]{+808+}0'

// File extension changes
diff("app.js", "app.ts"); // 'app.[-j-]{+t+}s'

// No changes
diff("test", "test"); // 'test'

// Complete replacement
diff("hello", "world"); // '[-hello-]{+world+}'
```

Uses a simple prefix/suffix algorithm optimized for readability. The output format uses:

- `[-text-]` for deleted text
- `{+text+}` for added text

#### `levenshtein(a: string, b: string, maxDistance?: number): number`

Calculates the Levenshtein distance (edit distance) between two strings. Optimized with space-efficient algorithm and early termination support.

```javascript
levenshtein("cat", "bat"); // 1 (substitution)
levenshtein("cat", "cats"); // 1 (insertion)
levenshtein("cats", "cat"); // 1 (deletion)
levenshtein("kitten", "sitting"); // 3
levenshtein("example", "exmaple"); // 2 (transposition)

// With maxDistance for early termination
levenshtein("hello", "helicopter", 3); // Infinity (exceeds max)
levenshtein("hello", "hallo", 3); // 1 (within max)

// Unicode support
levenshtein("café", "cafe"); // 1
levenshtein("😀", "😃"); // 1
```

#### `levenshteinNormalized(a: string, b: string): number`

Calculates normalized Levenshtein similarity score between 0 and 1. Perfect for fuzzy matching and similarity scoring.

```javascript
levenshteinNormalized("hello", "hello"); // 1 (identical)
levenshteinNormalized("cat", "bat"); // 0.667 (fairly similar)
levenshteinNormalized("hello", "world"); // 0.2 (dissimilar)
levenshteinNormalized("", "abc"); // 0 (completely different)

// Real-world typo detection
levenshteinNormalized("necessary", "neccessary"); // 0.9
levenshteinNormalized("example", "exmaple"); // 0.714

// Fuzzy matching (common threshold: 0.8)
const threshold = 0.8;
levenshteinNormalized("test", "tests") >= threshold; // true (0.8)
levenshteinNormalized("hello", "goodbye") >= threshold; // false (0.143)
```

#### `fuzzyMatch(query: string, target: string, options?: FuzzyMatchOptions): FuzzyMatchResult | null`

Performs fuzzy string matching with a similarity score, ideal for command palettes, file finders, and search-as-you-type features.

```javascript
// Basic usage
fuzzyMatch("gto", "goToLine"); // { matched: true, score: 0.546 }
fuzzyMatch("usrctrl", "userController.js"); // { matched: true, score: 0.444 }
fuzzyMatch("abc", "xyz"); // null (no match)

// Command palette style matching
fuzzyMatch("of", "openFile"); // { matched: true, score: 0.75 }
fuzzyMatch("svf", "saveFile"); // { matched: true, score: 0.619 }

// File finder matching
fuzzyMatch("index", "src/components/index.html"); // { matched: true, score: 0.262 }
fuzzyMatch("app.js", "src/app.js"); // { matched: true, score: 0.85 }

// Case sensitivity
fuzzyMatch("ABC", "abc"); // { matched: true, score: 0.95 }
fuzzyMatch("ABC", "abc", { caseSensitive: true }); // null

// Minimum score threshold
fuzzyMatch("ab", "a" + "x".repeat(50) + "b", { threshold: 0.5 }); // null (score too low)

// Acronym matching (matches at word boundaries score higher)
fuzzyMatch("uc", "UserController"); // { matched: true, score: 0.75 }
fuzzyMatch("gc", "getUserController"); // { matched: true, score: 0.75 }
```

Options:

- `caseSensitive` - Enable case-sensitive matching (default: false)
- `threshold` - Minimum score to consider a match (default: 0)

Returns:

- `{ matched: true, score: number }` - When match found (score between 0-1)
- `{ matched: false, score: 0 }` - For empty query
- `null` - When no match found or score below threshold

Scoring algorithm prioritizes:

- Exact matches (1.0)
- Prefix matches (≥0.85)
- Consecutive character matches
- Matches at word boundaries (camelCase, snake_case, kebab-case, etc.)
- Early matches in the string
- Acronym-style matches

#### `highlight(str: string, terms: string | string[], options?: HighlightOptions): string`

Highlights search terms in text by wrapping them with markers.

```javascript
highlight("The quick brown fox", "quick"); // 'The <mark>quick</mark> brown fox'
highlight("Hello WORLD", "world"); // '<mark>Hello</mark> <mark>WORLD</mark>' (case-insensitive by default)

// Multiple terms
highlight("The quick brown fox", ["quick", "fox"]); // 'The <mark>quick</mark> brown <mark>fox</mark>'

// Custom wrapper
highlight("Error: Connection failed", ["error", "failed"], {
  wrapper: ["**", "**"],
}); // '**Error**: Connection **failed**'

// Whole word matching
highlight("Java and JavaScript", "Java", { wholeWord: true }); // '<mark>Java</mark> and JavaScript'

// With CSS class
highlight("Hello world", "Hello", { className: "highlight" }); // '<mark class="highlight">Hello</mark> world'

// HTML escaping for security
highlight("<div>Hello</div>", "Hello", { escapeHtml: true }); // '&lt;div&gt;<mark>Hello</mark>&lt;/div&gt;'

// Case-sensitive matching
highlight("Hello hello", "hello", { caseSensitive: true }); // 'Hello <mark>hello</mark>'
```

Options:

- `caseSensitive` - Enable case-sensitive matching (default: false)
- `wholeWord` - Match whole words only (default: false)
- `wrapper` - Custom wrapper tags (default: ['<mark>', '</mark>'])
- `className` - CSS class for mark tags
- `escapeHtml` - Escape HTML in text before highlighting (default: false)

</details>

<details>
<summary><b>🌍 Unicode & International (5 functions)</b></summary>

### Unicode & International

Handle complex Unicode characters, emoji, and international text.

#### `graphemes(str: string): string[]`

Splits a string into an array of grapheme clusters, properly handling emojis, combining characters, and complex Unicode.

```javascript
graphemes("hello"); // ['h', 'e', 'l', 'l', 'o']
graphemes("👨‍👩‍👧‍👦🎈"); // ['👨‍👩‍👧‍👦', '🎈']
graphemes("café"); // ['c', 'a', 'f', 'é']
graphemes("👍🏽"); // ['👍🏽'] - emoji with skin tone
graphemes("🇺🇸"); // ['🇺🇸'] - flag emoji
graphemes("hello👋world"); // ['h', 'e', 'l', 'l', 'o', '👋', 'w', 'o', 'r', 'l', 'd']
```

#### `codePoints(str: string): number[]`

Converts a string into an array of Unicode code points, properly handling surrogate pairs and complex characters.

```javascript
codePoints("hello"); // [104, 101, 108, 108, 111]
codePoints("👍"); // [128077]
codePoints("€"); // [8364]
codePoints("Hello 👋"); // [72, 101, 108, 108, 111, 32, 128075]
codePoints("a👍b"); // [97, 128077, 98]
codePoints("👨‍👩‍👧‍👦"); // [128104, 8205, 128105, 8205, 128103, 8205, 128102]
```

</details>

<details>
<summary><b>🎯 Templates & Interpolation (2 functions)</b></summary>

### Templates & Interpolation

Safe and flexible string template interpolation.

#### `template(str: string, data: Record<string, any>, options?: TemplateOptions): string`

Interpolates variables in a template string.

```javascript
template("Hello {{name}}!", { name: "World" }); // 'Hello World!'
template("{{user.name}} is {{user.age}}", {
  user: { name: "Alice", age: 30 },
}); // 'Alice is 30'
template(
  "Hello ${name}!",
  { name: "World" },
  {
    delimiters: ["${", "}"],
  }
); // 'Hello World!'
```

#### `templateSafe(str: string, data: Record<string, any>, options?: TemplateOptions): string`

Interpolates variables with HTML escaping for safe output.

```javascript
templateSafe("Hello {{name}}!", {
  name: '<script>alert("XSS")</script>',
}); // 'Hello &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;!'
```

</details>

<details>
<summary><b>⚡ Performance Utilities (1 function)</b></summary>

### Performance Utilities

Optimize expensive string operations with caching.

#### `memoize<T>(fn: T, options?: MemoizeOptions): T`

Creates a memoized version of a function with LRU (Least Recently Used) cache eviction. Ideal for optimizing expensive string operations like `levenshtein`, `fuzzyMatch`, or `diff` when processing repetitive data.

```javascript
import { levenshtein, memoize } from "nano-string-utils";

// Basic usage - memoize expensive string operations
const memoizedLevenshtein = memoize(levenshtein);

// First call computes the result
memoizedLevenshtein("kitten", "sitting"); // 3 (computed)

// Subsequent calls with same arguments return cached result
memoizedLevenshtein("kitten", "sitting"); // 3 (cached - instant)

// Custom cache size (default is 100)
const limited = memoize(levenshtein, { maxSize: 50 });

// Custom key generation for complex arguments
const processUser = (user) => expensive(user);
const memoizedProcess = memoize(processUser, {
  getKey: (user) => user.id, // Cache by user ID only
});

// Real-world example: Fuzzy search with caching
import { fuzzyMatch, memoize } from "nano-string-utils";

const cachedFuzzyMatch = memoize(fuzzyMatch);
const searchResults = items.map((item) => cachedFuzzyMatch(query, item.name));

// Batch processing with deduplication benefits
const words = ["hello", "world", "hello", "test", "world"];
const distances = words.map((word) => memoizedLevenshtein("example", word)); // Only computes 3 times instead of 5
```

Features:

- **LRU cache eviction** - Keeps most recently used results
- **Configurable cache size** - Control memory usage (default: 100 entries)
- **Custom key generation** - Support for complex argument types
- **Type-safe** - Preserves function signatures and types
- **Zero dependencies** - Pure JavaScript implementation

Best used with:

- `levenshtein()` - Expensive O(n×m) algorithm
- `fuzzyMatch()` - Complex scoring with boundary detection
- `diff()` - Character-by-character comparison
- Any custom expensive string operations

Options:

- `maxSize` - Maximum cached results (default: 100)
- `getKey` - Custom cache key generator function

</details>

<details>
<summary><b>🔧 TypeScript Utilities</b></summary>

### Branded Types (TypeScript)

Nano-string-utils provides branded types for compile-time type safety with validated strings. These types add zero runtime overhead and are fully tree-shakeable.

```typescript
import { branded } from "nano-string-utils";
```

#### Type Guards

Type guards narrow string types to branded types:

```typescript
const input: string = getUserInput();

if (branded.isValidEmail(input)) {
  // input is now typed as Email
  sendEmail(input);
}

if (branded.isValidUrl(input)) {
  // input is now typed as URL
  fetch(input);
}

if (branded.isSlug(input)) {
  // input is now typed as Slug
  useAsRoute(input);
}
```

#### Builder Functions

Safely create branded types with validation:

```typescript
// Returns Email | null
const email = branded.toEmail("user@example.com");
if (email) {
  sendEmail(email); // email is typed as Email
}

// Returns URL | null
const url = branded.toUrl("https://example.com");
if (url) {
  fetch(url); // url is typed as URL
}

// Always returns Slug (transforms input)
const slug = branded.toSlug("Hello World!"); // 'hello-world' as Slug
createRoute(slug);

// Smart slug handling
const slug2 = branded.ensureSlug("already-a-slug"); // returns as-is if valid
const slug3 = branded.ensureSlug("Not A Slug!"); // transforms to 'not-a-slug'
```

#### Assertion Functions

Assert types with runtime validation:

```typescript
const input: string = getUserInput();

// Throws BrandedTypeError if invalid
branded.assertEmail(input);
// input is now typed as Email
sendEmail(input);

// Custom error messages
branded.assertUrl(input, "Invalid webhook URL");

// All assertion functions available
branded.assertEmail(str);
branded.assertUrl(str);
branded.assertSlug(str);
```

#### Unsafe Variants

For trusted inputs where validation isn't needed:

```typescript
// Use only when you're certain the input is valid
const trustedEmail = branded.unsafeEmail("admin@system.local");
const trustedUrl = branded.unsafeUrl("https://internal.api");
const trustedSlug = branded.unsafeSlug("already-valid-slug");
```

#### Available Types

- `Email` - Validated email addresses
- `URL` - Validated URLs (http/https/ftp/ftps)
- `Slug` - URL-safe slugs (lowercase, hyphenated)
- `Brand<T, K>` - Generic branding utility for custom types

#### Benefits

- **Zero runtime overhead** - Types are erased at compilation
- **Type safety** - Prevent passing unvalidated strings to functions
- **IntelliSense support** - Full autocomplete and type hints
- **Tree-shakeable** - Only imported if used
- **Composable** - Works with existing string functions

```typescript
// Example: Type-safe API
function sendNewsletter(email: branded.Email) {
  // Can only be called with validated emails
  api.send(email);
}

// Won't compile without validation
const userInput = "maybe@email.com";
// sendNewsletter(userInput); // ❌ Type error!

// Must validate first
const validated = branded.toEmail(userInput);
if (validated) {
  sendNewsletter(validated); // ✅ Type safe!
}
```

#### Extending with Custom Branded Types

The `Brand<T, K>` utility allows you to create your own custom branded types beyond the built-in ones. This is perfect for domain-specific validation without bloating the library.

```typescript
import type { Brand } from "nano-string-utils";
import { sanitize } from "nano-string-utils";

// Create custom branded types for your domain
type PhoneNumber = Brand<string, "PhoneNumber">;
type PostalCode = Brand<string, "PostalCode">;
type CreditCard = Brand<string, "CreditCard">;

// Build type-safe constructors
function toPhoneNumber(str: string): PhoneNumber | null {
  const cleaned = str.replace(/\D/g, "");
  if (cleaned.length === 10 || cleaned.length === 11) {
    return cleaned as PhoneNumber;
  }
  return null;
}

function toPostalCode(str: string): PostalCode | null {
  // US ZIP code validation
  if (/^\d{5}(-\d{4})?$/.test(str)) {
    return str as PostalCode;
  }
  return null;
}

// Type guards for runtime checking
function isPhoneNumber(str: string): str is PhoneNumber {
  return toPhoneNumber(str) !== null;
}

// Use in your application
function sendSMS(phone: PhoneNumber, message: string) {
  // Can only be called with validated phone numbers
  console.log(`Sending to ${phone}: ${message}`);
}

const userInput = "(555) 123-4567";
const phone = toPhoneNumber(userInput);
if (phone) {
  sendSMS(phone); // ✅ Type safe!
}
// sendSMS(userInput); // ❌ Type error - string is not PhoneNumber
```

This pattern gives you:

- **Compile-time safety** - Prevent using unvalidated data
- **Zero bundle cost** - Only import what you use from the library
- **Domain modeling** - Express business rules in the type system
- **Composability** - Mix custom types with built-in branded types

### Template Literal Types (TypeScript)

Case conversion functions now provide precise type inference for literal strings at compile time. This feature enhances IDE support with exact type transformations while maintaining full backward compatibility.

```typescript
import { camelCase, kebabCase, snakeCase } from "nano-string-utils";

// Literal strings get exact transformed types
const endpoint = kebabCase("getUserProfile");
// Type: "get-user-profile" (not just string!)

const column = snakeCase("firstName");
// Type: "first_name"

const methodName = camelCase("fetch-user-data");
// Type: "fetchUserData"

// Runtime strings still return regular string type
const userInput: string = getUserInput();
const result = camelCase(userInput);
// Type: string (backward compatible)
```

#### All Case Conversions Support Template Literals

```typescript
camelCase("hello-world"); // Type: "helloWorld"
kebabCase("helloWorld"); // Type: "hello-world"
snakeCase("HelloWorld"); // Type: "hello_world"
pascalCase("hello-world"); // Type: "HelloWorld"
constantCase("helloWorld"); // Type: "HELLO_WORLD"
dotCase("HelloWorld"); // Type: "hello.world"
pathCase("helloWorld"); // Type: "hello/world"
sentenceCase("hello-world"); // Type: "Hello world"
titleCase("hello-world"); // Type: "Hello World"
```

#### Type-Safe Configuration Objects

Transform configuration keys between naming conventions:

```typescript
const config = {
  "api-base-url": "https://api.example.com",
  "max-retries": 3,
} as const;

// Convert keys to camelCase at type level
type ConfigCamelCase = {
  [K in keyof typeof config as CamelCase<K>]: (typeof config)[K];
};
// Type: { apiBaseUrl: string; maxRetries: number; }
```

#### API Route Mapping

Create type-safe method names from API routes:

```typescript
type ApiRoutes = "user-profile" | "user-settings" | "admin-panel";

type MethodNames = {
  [K in ApiRoutes as `fetch${PascalCase<K>}`]: () => Promise<void>;
};
// Creates: fetchUserProfile(), fetchUserSettings(), fetchAdminPanel()
```

Benefits:

- ✅ **Zero runtime cost** - All transformations happen at compile time
- ✅ **Better IDE support** - Autocomplete shows exact transformed strings
- ✅ **Type safety** - Catch typos and incorrect transformations during development
- ✅ **Backward compatible** - Runtime strings work exactly as before

</details>

### Null/Undefined Safety

All functions in nano-string-utils handle null and undefined inputs gracefully:

```typescript
// No more runtime errors!
slugify(null); // Returns: null
slugify(undefined); // Returns: undefined
slugify(""); // Returns: ""

// Consistent behavior across all functions
isEmail(null); // Returns: false (validation functions)
words(null); // Returns: [] (array functions)
wordCount(null); // Returns: 0 (counting functions)

// Safe to use without defensive checks
const userInput = getUserInput(); // might be null/undefined
const slug = slugify(userInput); // Won't throw!
```

This means:

- ✅ **No TypeErrors** - Functions never throw on null/undefined
- ✅ **Predictable behavior** - Consistent handling across all utilities
- ✅ **Cleaner code** - No need for defensive checks before calling functions
- ✅ **Zero performance cost** - Minimal overhead from null checks

## Bundle Size

Each utility is optimized to be as small as possible:

| Function              | Size (gzipped) |
| --------------------- | -------------- |
| slugify               | 138 bytes      |
| camelCase             | 232 bytes      |
| snakeCase             | 197 bytes      |
| kebabCase             | 197 bytes      |
| pascalCase            | 219 bytes      |
| constantCase          | 228 bytes      |
| dotCase               | 207 bytes      |
| pathCase              | 207 bytes      |
| sentenceCase          | 414 bytes      |
| titleCase             | 562 bytes      |
| capitalize            | 99 bytes       |
| truncate              | 180 bytes      |
| stripHtml             | 85 bytes       |
| sanitize              | 812 bytes      |
| redact                | 727 bytes      |
| escapeHtml            | 136 bytes      |
| excerpt               | 261 bytes      |
| randomString          | 219 bytes      |
| hashString            | 155 bytes      |
| reverse               | 82 bytes       |
| deburr                | 273 bytes      |
| isEmail               | 148 bytes      |
| isUrl                 | 155 bytes      |
| isASCII               | 128 bytes      |
| isHexColor            | 103 bytes      |
| isNumeric             | 122 bytes      |
| isInteger             | 120 bytes      |
| isAlphanumeric        | 88 bytes       |
| isUUID                | 89 bytes       |
| toASCII               | 1.3 KB         |
| wordCount             | 123 bytes      |
| normalizeWhitespace   | 268 bytes      |
| removeNonPrintable    | 304 bytes      |
| template              | 302 bytes      |
| templateSafe          | 502 bytes      |
| pad                   | 209 bytes      |
| padStart              | 179 bytes      |
| padEnd                | 183 bytes      |
| graphemes             | 171 bytes      |
| codePoints            | 131 bytes      |
| highlight             | 461 bytes      |
| diff                  | 265 bytes      |
| levenshtein           | 413 bytes      |
| levenshteinNormalized | 471 bytes      |
| fuzzyMatch            | 613 bytes      |
| pluralize             | 459 bytes      |
| singularize           | 562 bytes      |
| smartSplit            | 566 bytes      |
| humanizeList          | 251 bytes      |
| memoize               | 334 bytes      |
| extractEntities       | 573 bytes      |
| detectScript          | 540 bytes      |
| classifyText          | 898 bytes      |

Total package size: **< 12KB** minified + gzipped

## Requirements

- Node.js >= 18
- TypeScript >= 5.0 (for TypeScript users)

## Development

```bash
# Clone the repository
git clone https://github.com/Zheruel/nano-string-utils.git
cd nano-string-utils

# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build the library
npm run build

# Type check
npm run typecheck
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Zheruel]

---

## Why nano-string-utils?

In a world of bloated dependencies, `nano-string-utils` stands out by providing exactly what you need and nothing more:

- **Security First**: Zero dependencies means zero supply chain vulnerabilities
- **Performance**: Optimized for both speed and size
  - Ultra-fast case conversions (3.4M-4.3M ops/s)
  - Efficient truncate operations (23.4M ops/s)
  - Fast template interpolation (998K ops/s)
- **Developer Experience**: Full TypeScript support with comprehensive JSDoc comments
- **Production Ready**: 100% test coverage with extensive edge case handling
- **Modern**: Built for ES2022+ with full ESM support and CommonJS compatibility

## Benchmarks

We continuously benchmark nano-string-utils against popular alternatives (lodash and es-toolkit) to ensure optimal performance and bundle size.

### Running Benchmarks

```bash
# Run vitest benchmark tests
npm run bench

# Generate benchmark data for docs website
npm run bench:data
```

### Latest Results

#### Bundle Size Comparison (gzipped)

| Function   | nano-string-utils | lodash | es-toolkit | Winner  |
| ---------- | ----------------- | ------ | ---------- | ------- |
| camelCase  | 232B              | 3.4KB  | 273B       | nano ✅ |
| capitalize | 99B               | 1.7KB  | 107B       | nano ✅ |
| kebabCase  | 197B              | 2.8KB  | 197B       | tied    |
| truncate   | 180B              | 2.9KB  | -          | nano ✅ |

#### Performance Comparison

| Function   | nano-string-utils | lodash | es-toolkit  | Winner     |
| ---------- | ----------------- | ------ | ----------- | ---------- |
| capitalize | 21.3M ops/s       | -      | 21.3M ops/s | tied ✅    |
| truncate   | 23.4M ops/s       | -      | -           | nano ✅    |
| deburr     | 2.25M ops/s       | -      | 2.34M ops/s | es-toolkit |
| escapeHtml | 2.28M ops/s       | -      | 2.26M ops/s | nano ✅    |
| camelCase  | 3.40M ops/s       | -      | 3.35M ops/s | nano ✅    |
| kebabCase  | 4.32M ops/s       | -      | 4.34M ops/s | es-toolkit |
| snakeCase  | 4.34M ops/s       | -      | 4.33M ops/s | nano ✅    |
| pascalCase | 3.97M ops/s       | -      | 3.95M ops/s | nano ✅    |
| pad        | 11.7M ops/s       | -      | 18.6M ops/s | es-toolkit |
| padStart   | 7.97M ops/s       | -      | -           | nano ✅    |
| padEnd     | 7.97M ops/s       | -      | -           | nano ✅    |
| template   | 998K ops/s        | -      | -           | nano ✅    |

**[📊 View full interactive performance benchmarks](https://zheruel.github.io/nano-string-utils/#performance)**

### Key Findings

- 🏆 **Smallest bundle sizes**: nano-string-utils wins 47 out of 48 tested functions (98% win rate)
- ⚡ **Competitive performance**: Wins 10 out of 14 benchmarked functions against es-toolkit
- 📊 **[View full interactive benchmarks](https://zheruel.github.io/nano-string-utils/#bundle-size)** with detailed comparison
- ⚡ **Optimized performance**:
  - **Case conversions**: 3.4M-4.3M ops/s, competitive with es-toolkit
  - **Truncate**: 23.4M ops/s for fast string truncation
  - **Template**: 998K ops/s for string interpolation
- 🌳 **Superior tree-shaking**: Each function is independently importable with minimal overhead

## Comparison with Alternatives

| Library           | Bundle Size | Dependencies | Tree-shakeable        | TypeScript |
| ----------------- | ----------- | ------------ | --------------------- | ---------- |
| nano-string-utils | < 12KB      | 0            | ✅                    | ✅         |
| lodash            | ~70KB       | 0            | ⚠️ Requires lodash-es | ✅         |
| underscore.string | ~20KB       | 0            | ❌                    | ❌         |
| voca              | ~30KB       | 0            | ❌                    | ✅         |

## Support

- 🐛 [Report bugs](https://github.com/Zheruel/nano-string-utils/issues)
- 💡 [Request features](https://github.com/Zheruel/nano-string-utils/issues)
- 📖 [Read the docs](https://github.com/Zheruel/nano-string-utils#api-reference)
- ⭐ [Star on GitHub](https://github.com/Zheruel/nano-string-utils)
