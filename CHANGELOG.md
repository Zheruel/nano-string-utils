# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.24.0] - 2025-11-07

### Added

- **New Function: `isInteger()`** - Validates if a string represents an integer value (whole number without decimals)
  - Handles positive and negative integers (`42`, `-17`)
  - Rejects decimal numbers (`3.14`, `42.0`) - key difference from `isNumeric`
  - Automatic whitespace trimming
  - Rejects empty strings, `Infinity`, and scientific notation
  - Bundle size: 120 bytes gzipped
  - 100% test coverage with 80+ test scenarios
  - Use cases: age validation, pagination parameters, database ID validation, e-commerce quantities

- **Branded Type Integration for IntegerString** - Full type-safe integer string handling
  - New `IntegerString` branded type for compile-time safety
  - Type guard: `isValidInteger()` for type narrowing
  - Builder function: `toIntegerString()` returns `IntegerString | null` with validation
  - Assertion function: `assertIntegerString()` throws `BrandedTypeError` on invalid input
  - Unsafe cast: `unsafeIntegerString()` for trusted input (no validation)
  - Zero runtime overhead - type safety enforced at compile time

- **CLI Support** - `isInteger` available via `nano-string` command
  - `nano-string isInteger "42"` - returns true/false with proper exit codes
  - Pipe support for Unix-style command chaining

### Enhanced

- **Whitespace Handling** - Consistent trimming across validation functions
  - Updated 6 existing validation functions to trim leading/trailing whitespace before validation
  - Functions enhanced: `isASCII`, `isAlphanumeric`, `isEmail`, `isHexColor`, `isUUID`, `isUrl`
  - Quality-of-life improvement that handles common user input patterns (e.g., `"  user@email.com  "`)
  - All functions now document whitespace trimming behavior in JSDoc
  - Additional test coverage for whitespace handling in each function

### Improved

- **Code Consistency** - Standardized variable naming patterns
  - All validation functions now use consistent `const trimmed = str.trim()` pattern instead of reassignment
  - More explicit code that avoids parameter mutation
  - Better maintainability across the codebase
  - Follows best practices established in `isInteger` and `isNumeric`

### Documentation

- Updated function count from 51 to 52 utilities
- Added comprehensive JSDoc documentation for `isInteger` with real-world usage examples
- Updated README with function descriptions, comparison table vs `isNumeric`, examples, and bundle sizes
- Added metadata and playground examples to documentation site
- Regenerated bundle size and performance benchmark data

## [0.23.0] - 2025-10-21

### Added

- **New Function: `isNumeric()`** - Validates if a string represents a numeric value (integer or decimal)

  - Handles positive and negative integers (`42`, `-17`)
  - Supports decimal numbers (`3.14`, `-0.5`)
  - Automatic whitespace trimming
  - Rejects empty strings, `Infinity`, and scientific notation
  - Bundle size: 122 bytes gzipped
  - 100% test coverage
  - Use cases: form validation, CSV parsing, API input validation

- **New Function: `isAlphanumeric()`** - Validates if a string contains only alphanumeric characters (a-z, A-Z, 0-9)

  - Strict ASCII validation (no Unicode, special characters, or whitespace)
  - Perfect for username validation, identifiers, and tokens
  - Bundle size: 88 bytes gzipped
  - 100% test coverage
  - Use cases: username validation, identifier validation, input sanitization

- **New Function: `isUUID()`** - Validates if a string is a valid UUID in standard 8-4-4-4-12 format

  - Supports all UUID versions (v1-v5)
  - Accepts NIL UUID (`00000000-0000-0000-0000-000000000000`)
  - Case-insensitive validation
  - Bundle size: 89 bytes gzipped
  - 100% test coverage
  - Use cases: API identifier validation, session token validation, database ID validation

- **Branded Type Integration** - Full type-safe handling for all three validation functions

  - New branded types: `NumericString`, `AlphanumericString`, `UUID`
  - Type guards: `isValidNumeric()`, `isValidAlphanumeric()`, `isValidUUID()`
  - Builder functions: `toNumericString()`, `toAlphanumericString()`, `toUUID()`
  - Assertion functions: `assertNumericString()`, `assertAlphanumericString()`, `assertUUID()`
  - Unsafe casts: `unsafeNumericString()`, `unsafeAlphanumericString()`, `unsafeUUID()`
  - Zero runtime overhead - type safety enforced at compile time

- **CLI Support** - All three functions available via `nano-string` command
  - `nano-string isNumeric "42"` - returns true/false with proper exit codes
  - `nano-string isAlphanumeric "user123"` - validates alphanumeric strings
  - `nano-string isUUID "550e8400-e29b-41d4-a716-446655440000"` - validates UUIDs
  - Pipe support for Unix-style command chaining

### Documentation

- Updated function count from 48 to 51 utilities
- Added comprehensive JSDoc documentation with real-world usage examples
- Updated README with function descriptions, examples, and bundle sizes
- Added metadata and playground examples to documentation site
- Regenerated bundle size and performance benchmark data
- Updated CLI help with new validation functions

## [0.22.0] - 2025-10-16

### Improved

- **Enhanced Unicode Support for `reverse()` and `truncate()`** - Production-grade grapheme cluster handling
  - Both functions now properly handle complex Unicode characters using `Intl.Segmenter`
  - ZWJ (Zero-Width Joiner) emoji sequences preserved: family emojis (👨‍👩‍👧‍👦), flags (🏴‍☠️, 🇺🇸), professions (👨‍⚕️, 👩‍🚀)
  - Emoji with skin tone modifiers correctly handled (👍🏽, 👋🏾)
  - Diacritics and combining marks preserved (café, Malmö, naïve, decomposed Unicode)
  - ASCII fast-path optimization maintains performance for simple strings (no performance regression)
  - `reverse()`: Now uses grapheme-aware reversal via `graphemes()` helper
  - `truncate()`: Counts grapheme clusters instead of code units for accurate character-based truncation

### Performance

- **Bundle Size Impact** - Minimal increase for significant correctness improvement
  - `reverse()`: 67B → 307B (+240B for full Unicode support)
  - `truncate()`: 226B → 477B (+251B for full Unicode support)
  - Total bundle: 8.99 KB → 8.92 KB (slight decrease due to optimizations)
  - ASCII strings maintain original performance through fast-path checks
  - Unicode strings now correctly handle all grapheme cluster types

### Added

- **Comprehensive Unicode Test Coverage** - 26 new test cases
  - 11 tests for `reverse()` covering ZWJ sequences, skin tones, diacritics, and mixed content
  - 15 tests for `truncate()` covering grapheme boundaries, emoji preservation, and edge cases
  - All tests validate both correctness and boundary conditions
  - 100% code coverage maintained across all functions

### Documentation

- Updated JSDoc examples to demonstrate Unicode handling capabilities
- Enhanced `docs-src/src/metadata.ts` with Unicode examples for both functions
- Regenerated benchmark data reflecting new bundle sizes

## [0.21.0] - 2025-10-15

### Added

- **New Function: `isHexColor()`** - Validates hexadecimal color codes with comprehensive format support

  - Supports 3-digit (`#fff`), 6-digit (`#ffffff`), 4-digit with alpha (`#fff8`), and 8-digit with alpha (`#ffffff80`) formats
  - Case-insensitive validation for all formats
  - Pre-compiled regex for optimal performance
  - Bundle size: 118 bytes raw, 103 bytes gzipped
  - 100% test coverage with 32 test cases
  - Use cases: design systems, theme validation, color picker validation, form validation

- **Branded Type Integration for HexColor** - Full type-safe color handling
  - New `HexColor` branded type for compile-time safety
  - Type guard: `isValidHexColor()` for type narrowing
  - Builder function: `toHexColor()` returns `HexColor | null` with validation
  - Assertion function: `assertHexColor()` throws `BrandedTypeError` on invalid input
  - Unsafe cast: `unsafeHexColor()` for trusted input (no validation)
  - Integrates seamlessly with existing branded type system

### Improved

- **Benchmark Infrastructure** - Enhanced function extraction for more accurate metrics
  - Added exclusion list for 26 branded type system helpers
  - Separates core utilities (49 functions) from type system infrastructure
  - Prevents metric inflation in bundle size and performance benchmarks
  - More accurate representation of library capabilities
  - Better comparison with other libraries (lodash, es-toolkit)

### Documentation

- Updated total function count from 48 to 49 core utilities
- Added `isHexColor` to documentation site with interactive playground examples
- Updated bundle size references to accurately reflect package size (< 12KB)
- Regenerated benchmark data with new function

## [0.20.0] - 2025-10-09

### Added

- **New Branded Type: `SafeHTML`** - Compile-time XSS prevention with type-safe HTML sanitization

  - New `toSafeHTML()` builder function creates sanitized HTML with opinionated secure defaults
    - Strips all HTML by default for maximum security
    - Removes script tags and dangerous content
    - Removes non-printable characters
    - Optional configuration to allow specific safe tags
  - New `unsafeSafeHTML()` for trusted input bypass (use with caution)
  - Zero runtime overhead - type safety enforced at compile time
  - Full test coverage with 11 comprehensive tests
  - Integrates with existing branded type system alongside `Email`, `URL`, and `Slug`

- **Brand Pattern Documentation** - Comprehensive guide for extending the type system

  - Added "Extending with Custom Branded Types" section to README
  - Examples showing how to create custom branded types (PhoneNumber, PostalCode, CreditCard)
  - Pattern demonstrates type-safe constructors and validation without bloating the library
  - Shows composability of custom types with built-in branded types

- **Enhanced JSDoc Examples** - Real-world usage examples for better developer experience
  - Added comprehensive TypeScript examples to 20+ utility functions
  - All examples now use proper ```ts code blocks for syntax highlighting
  - Includes practical use cases: form validation, search normalization, file naming, etc.
  - Functions enhanced: `capitalize`, `codePoints`, `deburr`, `detectScript`, `escapeHtml`, `graphemes`, `hashString`, `pad`, `padEnd`, `padStart`, `pluralize`, `randomString`, `reverse`, `singularize`, `smartSplit`, `stripHtml`, `toASCII`

### Fixed

- **Type Safety** - Resolved TypeScript strict mode violations with array access
  - Added non-null assertions for mathematically guaranteed valid array access in `levenshtein`, `pad`, `fuzzyMatch`, `smartSplit`
  - Fixed `randomString` to handle empty charset edge case (early return)
  - Zero runtime cost fixes - all type assertions validated by algorithm guarantees
  - All 1207 tests passing

### Changed

- **Bundle Size Limits** - Increased to accommodate SafeHTML feature
  - ESM: 9.1 KB → 9.5 KB (+400 bytes headroom)
  - CJS: 9.5 KB → 10 KB (+500 bytes headroom)
  - Current actual size: 8.84 KB ESM / 9.36 KB CJS (well under new limits)
  - SafeHTML adds ~500 bytes for compile-time XSS prevention

### Security

- **XSS Prevention** - SafeHTML branded type provides compile-time protection against XSS attacks
  - Functions accepting user input can now require `SafeHTML` type
  - Compiler enforces sanitization before rendering untrusted content
  - Type system prevents accidentally using unvalidated strings in unsafe contexts

## [0.19.1] - 2025-10-07

### Changed

- **Package Metadata** - Enhanced NPM discoverability
  - Expanded description to highlight key features: "49 tree-shakeable string utilities with zero dependencies. TypeScript-first, <1KB per function. Case conversion, validation, sanitization, fuzzy matching & more."
  - Increased keywords from 9 to 20 for better search visibility
  - Added targeted keywords: `string-manipulation`, `text-processing`, `case-conversion`, `kebabCase`, `pascalCase`, `email-validation`, `url-validation`, `fuzzy-match`, `levenshtein`, `sanitize`, `tree-shakeable`, `micro`
  - Improved package findability for common use cases and search queries

## [0.19.0] - 2025-10-04

### Performance

- **Significant Bundle Size Reductions** - Achieved 98% win rate against competitors (47/48 functions)

  - Overall 7% average size reduction through code optimization
  - `camelCase`: 72% reduction (827B → 232B gzipped)
  - `capitalize`: 86% reduction (697B → 99B gzipped)
  - `truncate`: 94% smaller than lodash (180B vs 2.9KB)
  - `template`: 95% smaller than lodash (302B vs 5.7KB)
  - `padStart`/`padEnd`: 93% smaller than lodash
  - Package total: < 8.5KB minified + gzipped

- **Runtime Performance Improvements** - Competitive with industry-leading libraries
  - Wins 10 out of 14 benchmarked functions vs es-toolkit
  - Ultra-fast case conversions: 3.4M-4.3M ops/s
  - Efficient truncate: 23.4M ops/s
  - Fast template interpolation: 998K ops/s

### Added

- **Performance Benchmarking Infrastructure**

  - New `benchmarks/performance-benchmarks.ts` - comprehensive benchmark suite
  - Compares nano-string-utils against lodash and es-toolkit
  - Measures operations per second with statistical margins
  - Generates `performance-benchmarks.json` for documentation
  - Interactive performance visualization in documentation site

- **Interactive Documentation Enhancements**
  - New performance benchmark viewer with live charts
  - Added `docs-src/src/performance.ts` with visual performance comparisons
  - Enhanced bundle size display with better formatting
  - Link to interactive performance benchmarks in README

### Improved

- **Code Optimizations**

  - Simplified case conversion implementations (`camelCase`, `pascalCase`, `kebabCase`, `snakeCase`)
  - More concise mapping logic and removed redundant checks
  - Optimized `pad()` function with more efficient string concatenation
  - Unicode-aware word splitting engine - now properly handles emojis, extended pictographic characters, and Unicode letters from all scripts

- **Tree-Shaking Improvements**

  - Refactored branded types from namespace export to individual exports
  - Separately exports types, guards, assertions, and builders
  - Enables better dead code elimination - users only bundle what they import

- **Bundle Size Tracking**
  - Updated methodology to report gzipped sizes (more realistic)
  - Enhanced `bundle-size-results.md` with accurate metrics
  - Improved visual distinction between winners in comparisons

### Fixed

- **Null/Undefined Handling** - Restored proper null/undefined checks that were removed during optimization
  - `camelCase`, `kebabCase`, `snakeCase`, `pascalCase` now correctly handle null/undefined inputs
  - `pad()` now correctly handles null/undefined inputs
  - All 1195 tests passing

### Documentation

- **README Updates**
  - Replaced minified sizes with gzipped sizes for accuracy
  - Updated performance comparisons with real benchmark data
  - Improved comparison tables with latest metrics
  - Added comprehensive benchmark results and methodology

## [0.18.0] - 2025-10-01

### Added

- **New Function: `redact()`** - Redact sensitive information from text for UI/logging purposes
  - Built-in pattern support for SSN, credit cards, emails, and phone numbers
  - Multiple redaction strategies: `partial` (show last N chars) and `full` (complete masking)
  - Selective type redaction - choose which data types to redact
  - Custom pattern support with regex and replacement functions
  - Configurable partial length (default: 4 characters)
  - Smart format preservation for phone numbers (parentheses, dots, dashes)
  - Consistent output formatting (e.g., SSNs always use dash format)
  - Security notice in documentation emphasizing proper use cases
  - 42 comprehensive test cases covering all redaction types and edge cases
  - Bundle size: ~1.3KB gzipped

### Changed

- **Bundle Size** - Increased size limit from 9 KB to 9.1 KB to accommodate new redaction function
- **Documentation** - Updated function count from 47 to 48 functions
- **Interactive Playground** - Added `redact()` to documentation site with live examples

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

[0.21.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.21.0
[0.20.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.20.0
[0.19.1]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.19.1
[0.19.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.19.0
[0.18.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.18.0
[0.16.0]: https://github.com/Zheruel/nano-string-utils/releases/tag/v0.16.0
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
