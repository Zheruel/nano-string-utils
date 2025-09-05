## Bundle Size Comparison

Sizes shown are for minified (gzipped) bundles when importing a single function.

| Function   | nano-string-utils | lodash        | es-toolkit  | Winner     |
| ---------- | ----------------- | ------------- | ----------- | ---------- |
| camelCase  | 275B (193B)       | 8.3KB (3.4KB) | 359B (269B) | nano       |
| capitalize | 79B (90B)         | 3.7KB (1.7KB) | 88B (99B)   | nano       |
| deburr     | 344B (266B)       | 4.5KB (1.8KB) | 539B (328B) | nano       |
| kebabCase  | 214B (161B)       | 6.7KB (2.8KB) | 230B (193B) | nano       |
| pad        | 285B (208B)       | 5.8KB (2.6KB) | 107B (117B) | es-toolkit |
| padEnd     | 202B (171B)       | 5.7KB (2.5KB) | -           | nano       |
| padStart   | 194B (166B)       | 5.7KB (2.5KB) | -           | nano       |
| pascalCase | 275B (191B)       | -             | 290B (225B) | nano       |
| snakeCase  | 214B (163B)       | 6.7KB (2.8KB) | 230B (193B) | nano       |
| template   | 407B (290B)       | 13KB (5.7KB)  | -           | nano       |
| truncate   | 127B (125B)       | 6.4KB (2.9KB) | -           | nano       |
