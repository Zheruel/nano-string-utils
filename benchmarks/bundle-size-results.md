# Bundle Size Comparison

## Overview

- **Total Functions**: 48
- **Nano Wins**: 45/48
- **Average Size Reduction**: 7%

## Detailed Comparison

Sizes shown are minified (gzipped). For nano-string-utils, tree-shaken size is shown when different from bundled.

| Function              | nano-string-utils | lodash        | es-toolkit  | Winner     | Savings |
| --------------------- | ----------------- | ------------- | ----------- | ---------- | ------- |
| camelCase             | 301B (235B)       | 8.3KB (3.4KB) | 367B (273B) | nano 🏆    | 14%     |
| capitalize            | 88B (99B)         | 3.7KB (1.7KB) | 97B (107B)  | nano 🏆    | 7%      |
| classifyText          | 1.8KB (898B)      | -             | -           | nano 🏆    | -       |
| codePoints            | 133B (131B)       | -             | -           | nano 🏆    | -       |
| constantCase          | 341B (228B)       | -             | -           | nano 🏆    | -       |
| deburr                | 352B (273B)       | 4.6KB (1.8KB) | 544B (332B) | nano 🏆    | 18%     |
| detectScript          | 1.0KB (540B)      | -             | -           | nano 🏆    | -       |
| diff                  | 472B (265B)       | -             | -           | nano 🏆    | -       |
| dotCase               | 329B (207B)       | -             | -           | nano 🏆    | -       |
| escapeHtml            | 137B (136B)       | -             | -           | nano 🏆    | -       |
| excerpt               | 343B (261B)       | -             | -           | nano 🏆    | -       |
| extractEntities       | 1.0KB (573B)      | -             | -           | nano 🏆    | -       |
| fuzzyMatch            | 1.2KB (613B)      | -             | -           | nano 🏆    | -       |
| graphemes             | 217B (171B)       | -             | -           | nano 🏆    | -       |
| hashString            | 174B (155B)       | -             | -           | nano 🏆    | -       |
| highlight             | 665B (461B)       | -             | -           | nano 🏆    | -       |
| humanizeList          | 328B (251B)       | -             | -           | nano 🏆    | -       |
| isASCII               | 124B (128B)       | -             | -           | nano 🏆    | -       |
| isEmail               | 187B (148B)       | -             | -           | nano 🏆    | -       |
| isUrl                 | 175B (155B)       | -             | -           | nano 🏆    | -       |
| kebabCase             | 241B (201B)       | 6.7KB (2.8KB) | 238B (197B) | es-toolkit | -2%     |
| levenshtein           | 759B (413B)       | -             | -           | nano 🏆    | -       |
| levenshteinNormalized | 919B (471B)       | -             | -           | nano 🏆    | -       |
| memoize               | 555B (334B)       | -             | -           | nano 🏆    | -       |
| normalizeWhitespace   | 487B (268B)       | -             | -           | nano 🏆    | -       |
| pad                   | 307B (215B)       | 5.8KB (2.6KB) | 109B (118B) | es-toolkit | -82%    |
| padEnd                | 227B (183B)       | 5.7KB (2.5KB) | -           | nano 🏆    | 93%     |
| padStart              | 221B (179B)       | 5.7KB (2.5KB) | -           | nano 🏆    | 93%     |
| pascalCase            | 276B (222B)       | -             | 299B (231B) | nano 🏆    | 4%      |
| pathCase              | 330B (207B)       | -             | -           | nano 🏆    | -       |
| pluralize             | 932B (459B)       | -             | -           | nano 🏆    | -       |
| randomString          | 235B (219B)       | -             | -           | nano 🏆    | -       |
| redact                | 1.5KB (727B)      | -             | -           | nano 🏆    | -       |
| removeNonPrintable    | 426B (304B)       | -             | -           | nano 🏆    | -       |
| reverse               | 67B (82B)         | -             | -           | nano 🏆    | -       |
| sanitize              | 1.7KB (812B)      | -             | -           | nano 🏆    | -       |
| sentenceCase          | 824B (414B)       | -             | -           | nano 🏆    | -       |
| singularize           | 1.3KB (563B)      | -             | -           | nano 🏆    | -       |
| slugify               | 140B (138B)       | -             | -           | nano 🏆    | -       |
| smartSplit            | 1.0KB (566B)      | -             | -           | nano 🏆    | -       |
| snakeCase             | 241B (200B)       | 6.7KB (2.8KB) | 238B (197B) | es-toolkit | -2%     |
| stripHtml             | 65B (85B)         | -             | -           | nano 🏆    | -       |
| template              | 429B (302B)       | 13KB (5.7KB)  | -           | nano 🏆    | 95%     |
| templateSafe          | 818B (502B)       | -             | -           | nano 🏆    | -       |
| titleCase             | 991B (562B)       | -             | -           | nano 🏆    | -       |
| toASCII               | 3.3KB (1.2KB)     | -             | -           | nano 🏆    | -       |
| truncate              | 226B (180B)       | 6.4KB (2.9KB) | -           | nano 🏆    | 94%     |
| wordCount             | 110B (123B)       | -             | -           | nano 🏆    | -       |
