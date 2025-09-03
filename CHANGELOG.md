# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2025-09-03

### Added
- `codePoints` - Convert strings into arrays of Unicode code points
- `graphemes` - Split strings into grapheme clusters (emoji-aware)
- `isASCII` - Check if string contains only ASCII characters
- `toASCII` - Convert strings to ASCII-safe representation with transliteration
- `normalizeWhitespace` - Normalize various Unicode whitespace characters
- `removeNonPrintable` - Remove control and formatting characters

### Enhanced
- Comprehensive Unicode support across all new utilities
- Support for complex emoji sequences and combining characters
- Configurable options for whitespace normalization and character removal
- Greek and Cyrillic transliteration in toASCII
- Smart symbol conversion (quotes, dashes, fractions, currency)

## [0.2.0] - 2025-09-02

### Added
- `template` - String interpolation with variables and nested object support
- `templateSafe` - HTML-escaped version of template for safe rendering
- `pad` - Pad string on both sides to target length
- `padStart` - Pad string on the left to target length
- `padEnd` - Pad string on the right to target length
- `deburr` - Remove diacritics/accents from Latin characters
- `titleCase` - Proper title capitalization with customizable exceptions
- `constantCase` - Convert to CONSTANT_CASE format
- `dotCase` - Convert to dot.case format
- `pathCase` - Convert to path/case format
- `sentenceCase` - Capitalize first letter of each sentence

## [0.1.0] - 2025-09-01

### Added
- Initial release with 15 essential string utilities
- `slugify` - Convert strings to URL-safe slugs
- `truncate` - Truncate strings with ellipsis
- `capitalize` - Capitalize first letter
- `camelCase` - Convert to camelCase
- `snakeCase` - Convert to snake_case
- `kebabCase` - Convert to kebab-case
- `pascalCase` - Convert to PascalCase
- `stripHtml` - Remove HTML tags from strings
- `escapeHtml` - Escape HTML special characters
- `randomString` - Generate random strings
- `hashString` - Simple string hashing
- `reverse` - Reverse string characters
- `isEmail` - Email validation
- `isUrl` - URL validation
- `wordCount` - Count words in text
- Full TypeScript support with type definitions
- Dual ESM/CJS builds for maximum compatibility
- Tree-shakeable exports for optimal bundle size
- Zero runtime dependencies
- Comprehensive test suite with 202 tests
- Detailed JSDoc documentation for all functions

### Technical Details
- Built with TypeScript 5.9
- Supports Node.js 18+
- Bundle size < 1KB (minified + gzipped)
- 100% test coverage for utility functions
- Modern build tooling with tsup and Vitest

[0.3.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.3.0
[0.2.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.2.0
[0.1.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.1.0