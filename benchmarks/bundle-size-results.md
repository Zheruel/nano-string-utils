# Bundle Size Comparison

## Overview

- **Total Functions**: 46
- **Nano Wins**: 39/46
- **Average Size Reduction**: -48%

## Detailed Comparison

Sizes shown are minified (gzipped). For nano-string-utils, tree-shaken size is shown when different from bundled.

| Function              | nano-string-utils | lodash        | es-toolkit  | Winner     | Savings |
| --------------------- | ----------------- | ------------- | ----------- | ---------- | ------- |
| camelCase             | 1.6KB (827B)      | 8.3KB (3.4KB) | 367B (273B) | es-toolkit | -203%   |
| capitalize            | 1.4KB (696B)      | 3.7KB (1.7KB) | 97B (107B)  | es-toolkit | -550%   |
| classifyText          | 2.4KB (986B)      | -             | -           | nano 🏆    | -       |
| codePoints            | 1.4KB (728B)      | -             | -           | nano 🏆    | -       |
| constantCase          | 1.6KB (805B)      | -             | -           | nano 🏆    | -       |
| deburr                | 1.6KB (880B)      | 4.6KB (1.8KB) | 544B (332B) | es-toolkit | -165%   |
| detectScript          | 2.3KB (1.1KB)     | -             | -           | nano 🏆    | -       |
| diff                  | 1.8KB (863B)      | -             | -           | nano 🏆    | -       |
| dotCase               | 1.6KB (786B)      | -             | -           | nano 🏆    | -       |
| escapeHtml            | 1.4KB (741B)      | -             | -           | nano 🏆    | -       |
| excerpt               | 1.6KB (840B)      | -             | -           | nano 🏆    | -       |
| extractEntities       | 2.3KB (1.1KB)     | -             | -           | nano 🏆    | -       |
| fuzzyMatch            | 2.4KB (1.2KB)     | -             | -           | nano 🏆    | -       |
| graphemes             | 1.5KB (759B)      | -             | -           | nano 🏆    | -       |
| hashString            | 1.5KB (760B)      | -             | -           | nano 🏆    | -       |
| highlight             | 1.9KB (1.0KB)     | -             | -           | nano 🏆    | -       |
| humanizeList          | 1.6KB (857B)      | -             | -           | nano 🏆    | -       |
| isASCII               | 1.4KB (721B)      | -             | -           | nano 🏆    | -       |
| isEmail               | 1.3KB (665B)      | -             | -           | nano 🏆    | -       |
| isUrl                 | 1.3KB (665B)      | -             | -           | nano 🏆    | -       |
| kebabCase             | 1.6KB (792B)      | 6.7KB (2.8KB) | 238B (197B) | es-toolkit | -302%   |
| levenshtein           | 2.0KB (1.0KB)     | -             | -           | nano 🏆    | -       |
| levenshteinNormalized | 2.2KB (1.1KB)     | -             | -           | nano 🏆    | -       |
| memoize               | 1.8KB (929B)      | -             | -           | nano 🏆    | -       |
| normalizeWhitespace   | 1.8KB (860B)      | -             | -           | nano 🏆    | -       |
| pad                   | 1.7KB (895B)      | 5.8KB (2.6KB) | 109B (118B) | es-toolkit | -658%   |
| padEnd                | 1.5KB (788B)      | 5.7KB (2.5KB) | -           | nano 🏆    | 70%     |
| padStart              | 1.5KB (785B)      | 5.7KB (2.5KB) | -           | nano 🏆    | 70%     |
| pascalCase            | 1.6KB (821B)      | -             | 299B (231B) | es-toolkit | -255%   |
| pathCase              | 1.6KB (785B)      | -             | -           | nano 🏆    | -       |
| pluralize             | 2.2KB (1.0KB)     | -             | -           | nano 🏆    | -       |
| randomString          | 1.5KB (821B)      | -             | -           | nano 🏆    | -       |
| removeNonPrintable    | 1.7KB (918B)      | -             | -           | nano 🏆    | -       |
| reverse               | 1.4KB (687B)      | -             | -           | nano 🏆    | -       |
| sentenceCase          | 2.1KB (992B)      | -             | -           | nano 🏆    | -       |
| singularize           | 2.6KB (1.1KB)     | -             | -           | nano 🏆    | -       |
| slugify               | 1.3KB (667B)      | -             | -           | nano 🏆    | -       |
| smartSplit            | 2.3KB (1.1KB)     | -             | -           | nano 🏆    | -       |
| snakeCase             | 1.6KB (793B)      | 6.7KB (2.8KB) | 238B (197B) | es-toolkit | -303%   |
| stripHtml             | 1.4KB (689B)      | -             | -           | nano 🏆    | -       |
| template              | 1.7KB (887B)      | 13KB (5.7KB)  | -           | nano 🏆    | 85%     |
| templateSafe          | 2.1KB (1.0KB)     | -             | -           | nano 🏆    | -       |
| titleCase             | 2.3KB (1.1KB)     | -             | -           | nano 🏆    | -       |
| toASCII               | 4.6KB (1.8KB)     | -             | -           | nano 🏆    | -       |
| truncate              | 1.5KB (781B)      | 6.4KB (2.9KB) | -           | nano 🏆    | 73%     |
| wordCount             | 1.4KB (713B)      | -             | -           | nano 🏆    | -       |
