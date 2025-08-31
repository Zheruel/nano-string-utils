# nano-string-utils

Ultra-lightweight string utilities with zero dependencies. Tree-shakeable, fully typed, and optimized for modern JavaScript.

[![npm version](https://img.shields.io/npm/v/nano-string-utils.svg)](https://www.npmjs.com/package/nano-string-utils)
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

```bash
npm install nano-string-utils
```

```bash
yarn add nano-string-utils
```

```bash
pnpm add nano-string-utils
```

## Usage

### ESM

```javascript
import { slugify, camelCase, truncate } from 'nano-string-utils';

slugify('Hello World!');           // 'hello-world'
camelCase('hello-world');          // 'helloWorld'
truncate('Long text here', 10);    // 'Long te...'
```

### CommonJS

```javascript
const { slugify, camelCase, truncate } = require('nano-string-utils');

slugify('Hello World!');           // 'hello-world'
camelCase('hello-world');          // 'helloWorld'
truncate('Long text here', 10);    // 'Long te...'
```

## API Reference

### String Transformation

#### `slugify(str: string): string`
Converts a string to a URL-safe slug.
```javascript
slugify('Hello World!');           // 'hello-world'
slugify('  Multiple   Spaces  ');  // 'multiple-spaces'
```

#### `camelCase(str: string): string`
Converts a string to camelCase.
```javascript
camelCase('hello world');          // 'helloWorld'
camelCase('hello-world');          // 'helloWorld'
camelCase('hello_world');          // 'helloWorld'
```

#### `snakeCase(str: string): string`
Converts a string to snake_case.
```javascript
snakeCase('hello world');          // 'hello_world'
snakeCase('helloWorld');           // 'hello_world'
snakeCase('hello-world');          // 'hello_world'
```

#### `kebabCase(str: string): string`
Converts a string to kebab-case.
```javascript
kebabCase('hello world');          // 'hello-world'
kebabCase('helloWorld');           // 'hello-world'
kebabCase('hello_world');          // 'hello-world'
```

#### `pascalCase(str: string): string`
Converts a string to PascalCase.
```javascript
pascalCase('hello world');         // 'HelloWorld'
pascalCase('hello-world');         // 'HelloWorld'
pascalCase('hello_world');         // 'HelloWorld'
```

#### `capitalize(str: string): string`
Capitalizes the first letter of a string and lowercases the rest.
```javascript
capitalize('hello world');         // 'Hello world'
capitalize('HELLO');               // 'Hello'
```

#### `reverse(str: string): string`
Reverses a string.
```javascript
reverse('hello');                  // 'olleh'
reverse('world');                  // 'dlrow'
```

### String Manipulation

#### `truncate(str: string, length: number, suffix?: string): string`
Truncates a string to a specified length with an optional suffix.
```javascript
truncate('Long text here', 10);           // 'Long te...'
truncate('Long text here', 10, '→');      // 'Long tex→'
```

#### `stripHtml(str: string): string`
Removes HTML tags from a string.
```javascript
stripHtml('<p>Hello <b>world</b>!</p>');  // 'Hello world!'
stripHtml('<div>Text</div>');             // 'Text'
```

#### `escapeHtml(str: string): string`
Escapes HTML special characters.
```javascript
escapeHtml('<div>Hello & "world"</div>'); // '&lt;div&gt;Hello &amp; &quot;world&quot;&lt;/div&gt;'
escapeHtml("It's <b>bold</b>");           // 'It&#x27;s &lt;b&gt;bold&lt;/b&gt;'
```

#### `wordCount(str: string): number`
Counts the number of words in a string.
```javascript
wordCount('Hello world test');            // 3
wordCount('One-word counts as one');      // 5
```

### String Generation

#### `randomString(length: number, charset?: string): string`
Generates a random string of specified length.
```javascript
randomString(10);                          // 'aBc123XyZ9'
randomString(5, 'abc');                    // 'abcab'
randomString(8, '0123456789');             // '42318765'
```

#### `hashString(str: string): number`
Generates a simple hash from a string (non-cryptographic).
```javascript
hashString('hello');                       // 99162322
hashString('world');                       // 113318802
```

### String Validation

#### `isEmail(str: string): boolean`
Validates if a string is a valid email format.
```javascript
isEmail('user@example.com');              // true
isEmail('invalid.email');                 // false
isEmail('test@sub.domain.com');           // true
```

#### `isUrl(str: string): boolean`
Validates if a string is a valid URL format.
```javascript
isUrl('https://example.com');             // true
isUrl('http://localhost:3000');           // true
isUrl('not a url');                       // false
isUrl('ftp://files.com/file.zip');        // true
```

## Bundle Size

Each utility is optimized to be as small as possible:

| Function | Size (minified) |
|----------|----------------|
| slugify | ~200 bytes |
| camelCase | ~250 bytes |
| snakeCase | ~220 bytes |
| kebabCase | ~200 bytes |
| pascalCase | ~180 bytes |
| capitalize | ~100 bytes |
| truncate | ~150 bytes |
| stripHtml | ~120 bytes |
| escapeHtml | ~180 bytes |
| randomString | ~200 bytes |
| hashString | ~150 bytes |
| reverse | ~80 bytes |
| isEmail | ~180 bytes |
| isUrl | ~200 bytes |
| wordCount | ~100 bytes |

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

| Library | Bundle Size | Dependencies | Tree-shakeable | TypeScript |
|---------|------------|--------------|----------------|------------|
| nano-string-utils | < 5KB | 0 | ✅ | ✅ |
| lodash | ~70KB | 0 | ⚠️ Requires lodash-es | ✅ |
| underscore.string | ~20KB | 0 | ❌ | ❌ |
| voca | ~30KB | 0 | ❌ | ✅ |

## Support

- 🐛 [Report bugs](https://github.com/Zheruel/nano-string-utils/issues)
- 💡 [Request features](https://github.com/Zheruel/nano-string-utils/issues)
- 📖 [Read the docs](https://github.com/Zheruel/nano-string-utils#api-reference)
- ⭐ [Star on GitHub](https://github.com/Zheruel/nano-string-utils)