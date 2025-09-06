# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.6.0] - 2025-09-06

### Added

- **TypeScript Function Overloads** for improved type inference
  - Added overload signatures to 13 functions with optional parameters
  - Better IDE autocomplete and parameter hints
  - More precise return type inference based on arguments
  - Functions with overloads: `truncate`, `pad`, `padStart`, `padEnd`, `template`, `templateSafe`, `excerpt`, `highlight`, `fuzzyMatch`, `memoize`, `randomString`, `toASCII`, `removeNonPrintable`
  - No breaking changes - fully backward compatible

## [0.5.2] - 2025-09-06

### Added

- **Comprehensive Benchmarking System**
  - Bundle size analysis (`benchmarks/bundle-size.ts`) - measures minified + gzipped sizes across libraries
  - Performance benchmarks (`benchmarks/performance.bench.ts`) - operations-per-second comparisons using Vitest bench
  - Automated benchmark runner (`benchmarks/run-benchmarks.ts`) - generates markdown reports
  - CI integration (`.github/workflows/benchmark.yml`) - automated benchmark runs on GitHub Actions
  - Benchmark documentation (`benchmarks/benchmark-results.md`, `benchmarks/bundle-size-results.md`)

### Performance

- **Case Conversions**: Refactored `camelCase`, `kebabCase`, `snakeCase`, `pascalCase` to use new `words` utility
  - 30-40% performance improvement through unified word tokenization
  - Simplified regex operations from 5-6 passes to single word split + transform
- **truncate**: Optimized with byte-based truncation and surrogate pair protection
  - 97.6% performance improvement (now 2.1-2.6x faster than lodash)
  - Handles 99% of real-world cases efficiently
- **pad**: Optimized to use native `String.repeat()` for single-character padding
  - Competitive performance with es-toolkit
  - Proper visual character counting for emoji padding

### Fixed

- **truncate**: Fixed Unicode/emoji handling at truncation boundaries
- **pad**: Fixed multi-character emoji padding to count visual characters correctly

### Changed

- **words**: Added new internal utility for consistent word splitting across case conversions
- **Benchmark Results**: nano-string-utils wins 10 out of 11 functions for bundle size
  - `template`: 25x faster than lodash
  - `capitalize`: 2.4x faster than lodash
  - Case conversions: Within 2-3x of es-toolkit (acceptable tradeoff for 30x smaller bundle size)
- **Bundle Size**: Slightly increased to 5.97KB (CJS) / 5.64KB (ESM) due to new features and optimizations, still well under 6.5KB limit

## [0.5.1] - 2025-09-04

### Performance

- **Regex Optimization**: Pre-compiled all static regex patterns across 21 functions for 2-3x performance improvement
  - **Case Conversion** (8 functions): `camelCase`, `pascalCase`, `kebabCase`, `snakeCase`, `constantCase`, `dotCase`, `pathCase` - pre-compiled 5-7 patterns each
  - **HTML Processing** (4 functions): `escapeHtml`, `stripHtml`, `highlight` - optimized regex and lookup tables
  - **Text Processing** (6 functions): `sentenceCase` (10 patterns), `titleCase` (4 patterns), `fuzzyMatch`, `slugify`, `pluralize`, `deburr`
  - **Utilities** (3 functions): `wordCount`, `isEmail`, `excerpt` - eliminated regex recreation overhead
- Combined sequential replacements in `highlight` function for single-pass HTML escaping
- Bundle size maintained under 6KB (5.64 kB ESM, 5.97 kB CJS)

## [0.5.0] - 2025-09-04

### Added

- **`memoize`** - LRU cache wrapper for expensive string operations with configurable size and TTL
  - Configurable cache size (default: 100 entries)
  - Optional time-to-live (TTL) for cache entries
  - Support for multi-argument functions
  - Automatic cache eviction using LRU strategy

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
