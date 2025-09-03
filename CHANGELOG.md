# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.1] - 2025-09-03

### Performance

- **hashString**: Replaced weak hash algorithm with FNV-1a implementation for better distribution
- **levenshtein**: Added prefix/suffix trimming optimization to reduce computation
- **deburr**: Consolidated 14+ regex operations into single pre-compiled pattern
- **fuzzyMatch**: Added progressive threshold checking and short-circuit evaluation
- **toASCII**: Replaced 155+ regex operations with single-pass Map lookup (O(n\*m) to O(n))
- **normalizeWhitespace**: Pre-compiled patterns and single-pass regex for common cases
- **removeNonPrintable**: Replaced 4 regex passes with single-pass range comparisons

### Changed

- Bundle size remains under 6KB (5.13 kB ESM / 5.48 kB CJS)
- All optimizations maintain backward compatibility

## [0.4.0] - 2025-09-03

### Added

- `excerpt` - Create smart text excerpts with word boundary awareness
- `highlight` - Highlight search terms in text with customizable wrappers
- `diff` - Compute simple string diffs showing additions and deletions
- `levenshtein` - Calculate edit distance between strings with early termination
- `levenshteinNormalized` - Normalized Levenshtein similarity score (0-1)
- `fuzzyMatch` - Sublime Text-style fuzzy string matching for command palettes
- `pluralize` - Convert singular words to plural with English grammar rules
- `singularize` - Convert plural words to singular with irregular forms support

### Enhanced

- Support for complex fuzzy matching with scoring algorithms
- Optimized Levenshtein implementation with O(min(m,n)) space complexity
- Smart excerpt generation with punctuation handling
- Configurable highlighting with HTML escaping and word boundary options
- Comprehensive pluralization rules including irregular forms

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

[0.4.1]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.4.1
[0.4.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.4.0
[0.3.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.3.0
[0.2.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.2.0
[0.1.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.1.0
