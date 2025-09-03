# nano-string-utils

Ultra-lightweight string utilities with zero dependencies. Tree-shakeable, fully typed, and optimized for modern JavaScript.

[![npm version](https://img.shields.io/npm/v/nano-string-utils.svg)](https://www.npmjs.com/package/nano-string-utils)
[![JSR](https://jsr.io/badges/@zheruel/nano-string-utils)](https://jsr.io/@zheruel/nano-string-utils)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/nano-string-utils)](https://bundlephobia.com/package/nano-string-utils)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue.svg)](https://www.typescriptlang.org/)
[![CI/CD](https://github.com/Zheruel/nano-string-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/Zheruel/nano-string-utils/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🚀 **Zero dependencies** - No bloat, just pure functions
- 📦 **< 1KB per function** - Minimal bundle impact
- 🌳 **Tree-shakeable** - Only import what you need
- 💪 **Fully typed** - Complete TypeScript support
- ⚡ **ESM & CJS** - Works everywhere
- 🧪 **100% tested** - Reliable and production-ready
- 🔒 **Type-safe** - Written in strict TypeScript
- 📝 **Well documented** - JSDoc comments for all functions

## Installation

### From npm

```bash
npm install nano-string-utils
```

```bash
yarn add nano-string-utils
```

```bash
pnpm add nano-string-utils
```

### From JSR

```bash
npx jsr add @zheruel/nano-string-utils
```

```bash
deno add @zheruel/nano-string-utils
```

## Usage

### ESM

```javascript
import { slugify, camelCase, truncate } from "nano-string-utils";

slugify("Hello World!"); // 'hello-world'
camelCase("hello-world"); // 'helloWorld'
truncate("Long text here", 10); // 'Long te...'
```

### CommonJS

```javascript
const { slugify, camelCase, truncate } = require("nano-string-utils");

slugify("Hello World!"); // 'hello-world'
camelCase("hello-world"); // 'helloWorld'
truncate("Long text here", 10); // 'Long te...'
```

## API Reference

### String Transformation

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

#### `deburr(str: string): string`

Removes diacritics/accents from Latin characters.

```javascript
deburr("café"); // 'cafe'
deburr("naïve"); // 'naive'
deburr("Bjørn"); // 'Bjorn'
deburr("São Paulo"); // 'Sao Paulo'
deburr("Müller"); // 'Muller'
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

### String Manipulation

#### `truncate(str: string, length: number, suffix?: string): string`

Truncates a string to a specified length with an optional suffix.

```javascript
truncate("Long text here", 10); // 'Long te...'
truncate("Long text here", 10, "→"); // 'Long tex→'
```

#### `stripHtml(str: string): string`

Removes HTML tags from a string.

```javascript
stripHtml("<p>Hello <b>world</b>!</p>"); // 'Hello world!'
stripHtml("<div>Text</div>"); // 'Text'
```

#### `escapeHtml(str: string): string`

Escapes HTML special characters.

```javascript
escapeHtml('<div>Hello & "world"</div>'); // '&lt;div&gt;Hello &amp; &quot;world&quot;&lt;/div&gt;'
escapeHtml("It's <b>bold</b>"); // 'It&#x27;s &lt;b&gt;bold&lt;/b&gt;'
```

#### `wordCount(str: string): number`

Counts the number of words in a string.

```javascript
wordCount("Hello world test"); // 3
wordCount("One-word counts as one"); // 5
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

### String Generation

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

### String Validation

#### `isEmail(str: string): boolean`

Validates if a string is a valid email format.

```javascript
isEmail("user@example.com"); // true
isEmail("invalid.email"); // false
isEmail("test@sub.domain.com"); // true
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

Features:

- Removes diacritics/accents (café → cafe)
- Converts smart quotes to regular quotes
- Converts Unicode dashes to hyphens
- Converts mathematical symbols (≈ → ~, ≠ → !=)
- Converts currency symbols (€ → EUR, £ → GBP)
- Converts fractions (½ → 1/2)
- Transliterates common Greek and Cyrillic letters
- Handles emojis and multi-byte Unicode correctly
- Optional placeholder for non-convertible characters

## Bundle Size

Each utility is optimized to be as small as possible:

| Function            | Size (minified) |
| ------------------- | --------------- |
| slugify             | ~200 bytes      |
| camelCase           | ~250 bytes      |
| snakeCase           | ~220 bytes      |
| kebabCase           | ~200 bytes      |
| pascalCase          | ~180 bytes      |
| constantCase        | ~230 bytes      |
| dotCase             | ~210 bytes      |
| pathCase            | ~210 bytes      |
| sentenceCase        | ~280 bytes      |
| titleCase           | ~320 bytes      |
| capitalize          | ~100 bytes      |
| truncate            | ~150 bytes      |
| stripHtml           | ~120 bytes      |
| escapeHtml          | ~180 bytes      |
| randomString        | ~200 bytes      |
| hashString          | ~150 bytes      |
| reverse             | ~80 bytes       |
| deburr              | ~200 bytes      |
| isEmail             | ~180 bytes      |
| isUrl               | ~200 bytes      |
| isASCII             | ~100 bytes      |
| toASCII             | ~450 bytes      |
| wordCount           | ~100 bytes      |
| normalizeWhitespace | ~280 bytes      |
| removeNonPrintable  | ~200 bytes      |
| template            | ~350 bytes      |
| templateSafe        | ~400 bytes      |
| pad                 | ~180 bytes      |
| padStart            | ~150 bytes      |
| padEnd              | ~150 bytes      |
| graphemes           | ~250 bytes      |
| codePoints          | ~120 bytes      |

Total package size: **< 5KB** minified + gzipped

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
- **Performance**: Each function is optimized for speed and size
- **Developer Experience**: Full TypeScript support with comprehensive JSDoc comments
- **Production Ready**: 100% test coverage with extensive edge case handling
- **Modern**: Built for ES2022+ with full ESM support and CommonJS compatibility

## Comparison with Alternatives

| Library           | Bundle Size | Dependencies | Tree-shakeable        | TypeScript |
| ----------------- | ----------- | ------------ | --------------------- | ---------- |
| nano-string-utils | < 5KB       | 0            | ✅                    | ✅         |
| lodash            | ~70KB       | 0            | ⚠️ Requires lodash-es | ✅         |
| underscore.string | ~20KB       | 0            | ❌                    | ❌         |
| voca              | ~30KB       | 0            | ❌                    | ✅         |

## Support

- 🐛 [Report bugs](https://github.com/Zheruel/nano-string-utils/issues)
- 💡 [Request features](https://github.com/Zheruel/nano-string-utils/issues)
- 📖 [Read the docs](https://github.com/Zheruel/nano-string-utils#api-reference)
- ⭐ [Star on GitHub](https://github.com/Zheruel/nano-string-utils)
