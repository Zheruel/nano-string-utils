# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.16.0] - 2025-09-22

### Added

- **New Functions** - Three powerful text processing utilities
  - `extractEntities()` - Extract emails, URLs, mentions, hashtags, phones, dates, and prices from text
  - `smartSplit()` - Intelligently split text into sentences with abbreviation handling
  - `humanizeList()` - Convert arrays to grammatically correct human-readable lists with Oxford comma support

### Changed

- **Bundle Size** - Increased size limit from 6.5KB to 7.5KB to accommodate new features
- **Documentation** - Updated function count from 41 to 44 functions

## [0.15.0] - 2025-09-21

### Added

- **CDN Optimization** - Full support for CDN usage via unpkg and jsDelivr
  - Added IIFE/UMD build format that exposes `nanoStringUtils` global variable
  - Added `unpkg`, `jsdelivr`, and `browser` fields to package.json for optimal CDN serving
  - Browser users can now use the library via `<script>` tags without any build tools
  - Support for both classic script tags and ES modules from CDN
  - Created comprehensive CDN test page (`test-cdn.html`) for validation
  - Updated README with detailed CDN usage examples

### Improved

- **Build System** - Enhanced tsup configuration for triple output format (ESM, CJS, IIFE)
  - IIFE build automatically minified and tree-shaken
  - Source maps generated for all build formats
  - Global namespace properly configured as `nanoStringUtils`

## [0.14.0] - 2025-09-21

### Added

- **Full Deno and Bun Runtime Support** - nano-string-utils now works seamlessly across all modern JavaScript runtimes
  - CLI tool now runs natively in Deno and Bun without any modifications
  - Added runtime abstraction layer (`bin/runtime-utils.js`) for unified cross-runtime behavior
  - New runtime compatibility tests for Deno (`tests/runtime-tests/deno-test.ts`) and Bun (`tests/runtime-tests/bun-test.ts`)
  - CI/CD pipeline extended with automated runtime compatibility testing
  - All 41 utility functions verified to work identically across Node.js, Deno, and Bun

### Improved

- **CLI Tool** - Enhanced with multi-runtime support

  - Automatic runtime detection (Node.js, Deno, or Bun)
  - Unified stdin handling across all runtimes
  - Cross-runtime path resolution and dynamic imports
  - Works with `deno run`, `bun run`, and Node.js execution
  - Maintains zero runtime dependencies

- **Documentation** - Updated README with runtime compatibility matrix
  - Added runtime badges (Node.js, Deno, Bun) to showcase support
  - Installation instructions for each runtime
  - CLI usage examples for Node.js, Deno, and Bun
  - Clear compatibility matrix showing full support across all runtimes

### Technical

- GitHub Actions workflow now includes runtime compatibility job
- Tests run against Deno v2.x and latest Bun version
- CLI tested with both core functionality and pipe operations in all runtimes

## [0.13.0] - 2025-09-19

### Added

- **Detailed Bundle Size Analysis** - Comprehensive per-function bundle size comparison tool
  - New `benchmarks/bundle-size.ts` tool for measuring and comparing bundle sizes across all 41 functions
  - Automated extraction of all available functions from the library
  - Tree-shaking analysis showing both bundled and tree-shaken sizes for nano-string-utils
  - Side-by-side comparison with lodash and es-toolkit for equivalent functions
  - Visual bundle size viewer integrated into documentation site with interactive charts
  - JSON report generation with detailed metrics for each function
  - Shows winner and percentage savings for each function comparison
  - Interactive sorting, filtering, and comparison features in the documentation

### Improved

- **Documentation Site** - Enhanced with bundle size visualization
  - Added interactive bundle size comparison table with sorting capabilities
  - Visual size comparison bars showing relative sizes between libraries
  - Real-time function search and filtering in bundle size viewer
  - Consolidated CSS files for better maintainability (merged migration-improvements.css into migration.css)
  - Fixed TypeScript warnings in bundle-size.ts (removed unused variables)

### Technical

- Benchmark infrastructure now includes full function inventory extraction
- Bundle size reports include both markdown and JSON output formats
- Added public serving of bundle size data for documentation site consumption

## [0.12.0] - 2025-09-17

### Added

- **CLI Tool** - Zero-dependency command-line interface for string utilities
  - New `nano-string` command available via `npx nano-string-utils` or global installation
  - Support for all 40+ library functions directly from the terminal
  - Pipe support for Unix-style command chaining
  - Options handling for complex functions (template, truncate, pad, etc.)
  - Comprehensive help system with global and per-function documentation
  - Smart argument parsing with JSON support for complex data
  - Boolean output with proper exit codes for validation functions
  - Full test coverage with 39 CLI-specific test cases
  - Examples: `nano-string slugify "Hello World"`, `echo "text" | nano-string kebabCase`

## [0.11.0] - 2025-09-17

### Added

- **Interactive Migration Guide** - Comprehensive guide for migrating from lodash/underscore

  - Interactive documentation site with migration guide section
  - Complete function mapping table showing lodash → nano-string-utils equivalents
  - Step-by-step migration instructions with code examples
  - Automated migration script for large codebases
  - Bundle size comparison demonstrating 96% reduction (73KB → 6.5KB)
  - Search and filtering for function mappings
  - Three-panel navigation: Overview, Function Mapping, Migration Steps
  - Integration with existing documentation site at GitHub Pages

- **Dependabot Configuration** - Automated dependency management
  - Weekly dependency updates for all package ecosystems
  - Grouped minor/patch updates to reduce PR noise
  - Separate configurations for main project, documentation site, and GitHub Actions
  - Optimized PR limits: 5 for main project, 3 for docs, 2 for actions

## [0.10.0] - 2025-09-16

### Added

- **API Documentation Generation** - Comprehensive TypeDoc-powered API documentation
  - Added TypeDoc configuration for generating API documentation from JSDoc comments
  - Created GitHub Actions workflow for automatic deployment to GitHub Pages
  - Added documentation site structure with Vite for future enhancements
  - New npm scripts: `docs`, `docs:dev`, `docs:build`, `docs:preview`
  - All existing functions have complete JSDoc with descriptions, parameters, returns, and examples
  - Documentation automatically deployed at https://zheruel.github.io/nano-string-utils/
  - Added README to docs-src directory with documentation maintenance instructions
  - Updated CLAUDE.md with documentation generation guidelines for new functions

## [0.9.1] - 2025-09-07

### Documentation

- **Enhanced JSDoc with TypeScript Examples** - Comprehensive TypeScript usage examples
  - Added TypeScript-specific examples to 20+ utility functions
  - All examples now use proper ```ts code blocks for syntax highlighting
  - Showcased template literal types in case conversion functions
  - Demonstrated branded types usage with `isEmail`, `isUrl`, and `slugify`
  - Added function overload examples for `template`, `truncate`, and `excerpt`
  - Included generic constraint examples in `memoize` function
  - Showed interface usage with `FuzzyMatchOptions` and `FuzzyMatchResult`
  - Added strict null checking examples throughout
  - Enhanced interface documentation for `HighlightOptions`, `TitleCaseOptions`, `NormalizeWhitespaceOptions`, and `RemoveNonPrintableOptions`
  - All examples validated with TypeScript strict mode

## [0.9.0] - 2025-09-07

### Added

- **Comprehensive Null/Undefined Safety** - All functions now handle null/undefined gracefully
  - Added defensive null checks to 22+ functions that previously lacked them
  - Consistent behavior across all utilities: string functions preserve null/undefined, boolean functions return false, array functions return empty arrays
  - Zero runtime errors - functions no longer throw TypeErrors on null/undefined inputs
  - Maintains full backward compatibility for valid string inputs
  - Added 36 comprehensive tests for null/undefined handling
  - No performance impact - benchmarks show consistent speed
  - Minimal bundle size impact - only 0.02 kB increase

### Improved

- **Developer Experience** - Safer API with predictable edge case handling
  - Users no longer need defensive checks before calling functions
  - All functions behave consistently with falsy values
  - Better alignment with TypeScript's strict null checks

## [0.8.0] - 2025-09-07

### Added

- **Template Literal Types for Case Conversions** - Compile-time type transformations
  - Advanced TypeScript template literal types for all 9 case conversion functions
  - Precise type inference for literal strings (e.g., `kebabCase("helloWorld")` returns type `"hello-world"`)
  - Function overloads preserve literal types while maintaining backward compatibility
  - Complex type-level string parsing with proper word boundary detection
  - Handles camelCase, PascalCase, ALLCAPS, consecutive digits, and special characters
  - Zero runtime cost - all transformations happen at compile time
  - Runtime strings still return regular `string` type for backward compatibility
  - Comprehensive type-level tests and real-world usage examples
  - Enhanced IDE support with autocomplete showing exact transformed strings
  - No impact on bundle size (remains at 6.01 kB)

## [0.7.0] - 2025-09-06

### Added

- **Branded Types for TypeScript** - Compile-time type safety for validated strings
  - New `branded` namespace export with zero runtime overhead
  - Three branded types: `Email`, `URL`, `Slug`
  - **Type Guards**: `isValidEmail()`, `isValidUrl()`, `isSlug()` for type narrowing
  - **Builder Functions**: `toEmail()`, `toUrl()`, `toSlug()` for safe construction with validation
  - **Assertion Functions**: `assertEmail()`, `assertUrl()`, `assertSlug()` for runtime assertions with type narrowing
  - **Unsafe Variants**: `unsafeEmail()`, `unsafeUrl()`, `unsafeSlug()` for trusted inputs
  - **Utility Functions**: `ensureSlug()` for intelligent slug handling
  - **Custom Error Class**: `BrandedTypeError` for validation failures
  - Generic `Brand<K, T>` type utility for creating custom branded types
  - Full tree-shaking support - only imported when used
  - 100% test coverage with type-level tests using `expectTypeOf`
  - Comprehensive documentation with usage examples

### Performance

- Branded type guards have identical performance to base validators
- Unsafe variants operate at ~18M ops/sec (simple type casts)
- No impact on bundle size for non-TypeScript users
- Bundle size remains under 6.5KB limit (6.35KB CJS)

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

[0.13.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.13.0
[0.12.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.12.0
[0.11.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.11.0
[0.10.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.10.0
[0.9.1]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.9.1
[0.9.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.9.0
[0.8.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.8.0
[0.7.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.7.0
[0.6.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.6.0
[0.5.2]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.5.2
[0.5.1]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.5.1
[0.5.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.5.0
[0.4.1]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.4.1
[0.4.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.4.0
[0.3.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.3.0
[0.2.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.2.0
[0.1.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.1.0
