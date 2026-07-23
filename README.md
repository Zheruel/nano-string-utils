<p align="center">
  <img src="https://raw.githubusercontent.com/Zheruel/nano-string-utils/main/assets/mark.png" width="76" alt="nano-string-utils logo: a tangled string threading a precision node and leaving as ordered lines" />
</p>

<h1 align="center">nano-string-utils</h1>

<p align="center">
  <strong>61 string utilities for TypeScript and JavaScript.</strong><br>
  Zero dependencies, tree-shakeable, under 1 KB each.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/nano-string-utils"><img alt="npm version" src="https://img.shields.io/npm/v/nano-string-utils.svg?color=60a5fa"></a>
  <a href="https://jsr.io/@zheruel/nano-string-utils"><img alt="JSR" src="https://jsr.io/badges/@zheruel/nano-string-utils"></a>
  <a href="https://bundlephobia.com/package/nano-string-utils"><img alt="minzipped size" src="https://img.shields.io/bundlephobia/minzip/nano-string-utils?color=34d399"></a>
  <a href="https://github.com/Zheruel/nano-string-utils/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/Zheruel/nano-string-utils/actions/workflows/ci.yml/badge.svg"></a>
  <a href="https://opensource.org/licenses/MIT"><img alt="MIT license" src="https://img.shields.io/badge/license-MIT-64748b.svg"></a>
  <img alt="dependencies: zero" src="https://img.shields.io/badge/dependencies-0-34d399.svg">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-3178c6.svg?logo=typescript&logoColor=white">
</p>

![Abstract illustration: a tangle of chaotic grey threads enters a small precision mechanism and leaves as evenly spaced blue and green ribbons](https://raw.githubusercontent.com/Zheruel/nano-string-utils/main/assets/hero.png)

**nano-string-utils** is a modern string utility library for JavaScript and TypeScript: case conversion (`camelCase`, `kebabCase`, `snake_case`, `PascalCase`), `slugify`, `truncate`, email and URL validation, HTML escaping and XSS sanitization, fuzzy matching, Levenshtein distance, pluralization, Unicode and emoji-safe helpers, and more. It has **no runtime dependencies**, ships **ESM and CommonJS**, and every function is independently importable — so a lodash or underscore.string replacement costs you bytes, not kilobytes.

Works in Node.js, Deno, Bun, browsers, and edge runtimes.

> **[Interactive playground and API docs →](https://zheruel.github.io/nano-string-utils/)** · **[Migrating from lodash →](https://zheruel.github.io/nano-string-utils/#migration)**

## Why nano-string-utils

- **Nothing you didn't ask for.** Zero runtime dependencies means zero transitive supply-chain surface. The whole library is 9.6 KB brotlied; a typical import is a few hundred bytes.
- **Real tree-shaking.** Every function lives in its own module and is marked side-effect free, so bundlers drop what you don't reference.
- **Types that do work.** Branded types make a validated `Email` or `URL` unforgeable, and template literal types compute exact return values at compile time.
- **Null-safe by default.** Almost every function takes `null` or `undefined` and passes it straight through instead of throwing. See [Null safety](#null-safety) for the four that don't.
- **Unicode-aware where it counts.** `graphemes`, `codePoints`, `reverse`, and `toASCII` handle emoji, combining marks, and surrogate pairs correctly.
- **Batteries for real apps.** XSS sanitization, PII redaction, fuzzy search scoring, and sentence splitting are in the box, not in three more dependencies.
- **1,686 tests** across 69 files, run in CI on Node 20, 22, and 24.

![Diagram: importing slugify, camelCase and isEmail ships 595 bytes gzipped, while the other 58 functions in the library contribute zero bytes because they are never referenced](https://raw.githubusercontent.com/Zheruel/nano-string-utils/main/assets/tree-shaking.png)

## Install

```bash
npm install nano-string-utils
pnpm add nano-string-utils
yarn add nano-string-utils
bun add nano-string-utils
```

```bash
# Deno, from JSR
deno add jsr:@zheruel/nano-string-utils
```

<details>
<summary>Browser via CDN</summary>

```html
<!-- ES modules -->
<script type="module">
  import {
    slugify,
    camelCase,
  } from "https://unpkg.com/nano-string-utils/dist/index.js";

  slugify("Hello World"); // 'hello-world'
</script>

<!-- Or a global build -->
<script src="https://unpkg.com/nano-string-utils/dist/index.iife.js"></script>
<script>
  nanoStringUtils.slugify("Hello World!"); // 'hello-world'
</script>
```

</details>

## Quick start

```javascript
import {
  slugify,
  camelCase,
  truncate,
  isEmail,
  fuzzyMatch,
  sanitize,
} from "nano-string-utils";

// Reshape
slugify("Hello World!"); // 'hello-world'
camelCase("hello-world"); // 'helloWorld'
truncate("Long text here", 10); // 'Long te...'

// Validate
isEmail("user@example.com"); // true
isEmail("invalid.email"); // false

// Search
fuzzyMatch("gto", "goToLine"); // { matched: true, score: 0.546 }
fuzzyMatch("abc", "xyz"); // null

// Make safe
sanitize("<script>alert('xss')</script>Hello"); // 'Hello'
sanitize("<b>Bold</b> text", { allowedTags: ["b"] }); // '<b>Bold</b> text'

// Null-safe, always
slugify(null); // null — no throw
```

## The 61 functions

Every function links to a live, editable example in the [playground](https://zheruel.github.io/nano-string-utils/). Sizes are gzipped, measured per function with the rest of the library tree-shaken away.

### Case conversion

| Function | What it does | Gzipped |
| --- | --- | --- |
| [`camelCase`](https://zheruel.github.io/nano-string-utils/#camelCase) | Convert to `camelCase` | 235 B |
| [`pascalCase`](https://zheruel.github.io/nano-string-utils/#pascalCase) | Convert to `PascalCase` | 222 B |
| [`kebabCase`](https://zheruel.github.io/nano-string-utils/#kebabCase) | Convert to `kebab-case` | 201 B |
| [`snakeCase`](https://zheruel.github.io/nano-string-utils/#snakeCase) | Convert to `snake_case` | 200 B |
| [`constantCase`](https://zheruel.github.io/nano-string-utils/#constantCase) | Convert to `CONSTANT_CASE` | 228 B |
| [`dotCase`](https://zheruel.github.io/nano-string-utils/#dotCase) | Convert to `dot.case` | 207 B |
| [`pathCase`](https://zheruel.github.io/nano-string-utils/#pathCase) | Convert to `path/case` | 207 B |
| [`sentenceCase`](https://zheruel.github.io/nano-string-utils/#sentenceCase) | Convert to `Sentence case` | 414 B |
| [`titleCase`](https://zheruel.github.io/nano-string-utils/#titleCase) | Convert to `Title Case`, keeping small words lowercase | 561 B |

### String manipulation

| Function | What it does | Gzipped |
| --- | --- | --- |
| [`slugify`](https://zheruel.github.io/nano-string-utils/#slugify) | Turn any string into a URL-safe slug | 138 B |
| [`truncate`](https://zheruel.github.io/nano-string-utils/#truncate) | Cut a string to a max length and append a suffix | 276 B |
| [`excerpt`](https://zheruel.github.io/nano-string-utils/#excerpt) | Truncate at a word boundary instead of mid-word | 261 B |
| [`capitalize`](https://zheruel.github.io/nano-string-utils/#capitalize) | Uppercase the first character | 99 B |
| [`reverse`](https://zheruel.github.io/nano-string-utils/#reverse) | Reverse a string, surrogate-pair safe | 229 B |
| [`pad`](https://zheruel.github.io/nano-string-utils/#pad) | Pad both ends to a target length | 214 B |
| [`padStart`](https://zheruel.github.io/nano-string-utils/#padStart) | Pad the start to a target length | 176 B |
| [`padEnd`](https://zheruel.github.io/nano-string-utils/#padEnd) | Pad the end to a target length | 180 B |
| [`trim`](https://zheruel.github.io/nano-string-utils/#trim) | Trim arbitrary characters from both ends | 179 B |
| [`trimStart`](https://zheruel.github.io/nano-string-utils/#trimStart) | Trim arbitrary characters from the start | 165 B |
| [`trimEnd`](https://zheruel.github.io/nano-string-utils/#trimEnd) | Trim arbitrary characters from the end | 170 B |
| [`mask`](https://zheruel.github.io/nano-string-utils/#mask) | Mask characters, e.g. for card or phone numbers | 229 B |
| [`wrap`](https://zheruel.github.io/nano-string-utils/#wrap) | Word-wrap text to a given column width | 329 B |
| [`randomString`](https://zheruel.github.io/nano-string-utils/#randomString) | Generate a random string of a given length | 227 B |
| [`wordCount`](https://zheruel.github.io/nano-string-utils/#wordCount) | Count words | 123 B |
| [`countSubstrings`](https://zheruel.github.io/nano-string-utils/#countSubstrings) | Count non-overlapping occurrences of a substring | 134 B |

### Validation

| Function | What it does | Gzipped |
| --- | --- | --- |
| [`isEmail`](https://zheruel.github.io/nano-string-utils/#isEmail) | Validate an email address, with opt-in international support | 222 B |
| [`isUrl`](https://zheruel.github.io/nano-string-utils/#isUrl) | Validate a URL | 168 B |
| [`isUUID`](https://zheruel.github.io/nano-string-utils/#isUUID) | Validate a UUID | 123 B |
| [`isHexColor`](https://zheruel.github.io/nano-string-utils/#isHexColor) | Validate a hex colour such as `#ff5733` | 138 B |
| [`isNumeric`](https://zheruel.github.io/nano-string-utils/#isNumeric) | Check the string represents a number | 122 B |
| [`isInteger`](https://zheruel.github.io/nano-string-utils/#isInteger) | Check the string represents an integer | 115 B |
| [`isAlphanumeric`](https://zheruel.github.io/nano-string-utils/#isAlphanumeric) | Check the string is letters and digits only | 123 B |
| [`isASCII`](https://zheruel.github.io/nano-string-utils/#isASCII) | Check the string is pure ASCII | 145 B |
| [`isBlank`](https://zheruel.github.io/nano-string-utils/#isBlank) | Check the string is empty or only whitespace | 65 B |
| [`detectScript`](https://zheruel.github.io/nano-string-utils/#detectScript) | Detect the dominant writing system, e.g. Latin or Cyrillic | 540 B |
| [`classifyText`](https://zheruel.github.io/nano-string-utils/#classifyText) | Classify text as prose, code, an identifier and more | 897 B |

### Security and escaping

| Function | What it does | Gzipped |
| --- | --- | --- |
| [`sanitize`](https://zheruel.github.io/nano-string-utils/#sanitize) | Strip dangerous HTML to prevent XSS | 811 B |
| [`stripHtml`](https://zheruel.github.io/nano-string-utils/#stripHtml) | Remove every HTML tag | 85 B |
| [`escapeHtml`](https://zheruel.github.io/nano-string-utils/#escapeHtml) | Escape `&`, `<`, `>`, `"` and `'` | 136 B |
| [`unescapeHtml`](https://zheruel.github.io/nano-string-utils/#unescapeHtml) | Decode HTML entities back to characters | 155 B |
| [`redact`](https://zheruel.github.io/nano-string-utils/#redact) | Redact emails, phone numbers, cards and other PII | 728 B |
| [`templateSafe`](https://zheruel.github.io/nano-string-utils/#templateSafe) | Interpolate a template with automatic HTML escaping | 501 B |

### Search, diff and matching

| Function | What it does | Gzipped |
| --- | --- | --- |
| [`fuzzyMatch`](https://zheruel.github.io/nano-string-utils/#fuzzyMatch) | Fuzzy match with a relevance score, for command palettes | 595 B |
| [`levenshtein`](https://zheruel.github.io/nano-string-utils/#levenshtein) | Edit distance between two strings | 413 B |
| [`levenshteinNormalized`](https://zheruel.github.io/nano-string-utils/#levenshteinNormalized) | Edit distance normalised to a 0–1 similarity | 472 B |
| [`diff`](https://zheruel.github.io/nano-string-utils/#diff) | Character-level diff between two strings | 265 B |
| [`highlight`](https://zheruel.github.io/nano-string-utils/#highlight) | Wrap search terms in markup for result highlighting | 461 B |
| [`template`](https://zheruel.github.io/nano-string-utils/#template) | Interpolate `{{placeholders}}` from an object | 302 B |
| [`hashString`](https://zheruel.github.io/nano-string-utils/#hashString) | Fast non-cryptographic string hash | 155 B |
| [`memoize`](https://zheruel.github.io/nano-string-utils/#memoize) | Memoise a string function with an LRU-bounded cache | 334 B |

### Unicode and international

| Function | What it does | Gzipped |
| --- | --- | --- |
| [`graphemes`](https://zheruel.github.io/nano-string-utils/#graphemes) | Split into user-perceived characters, emoji-aware | 171 B |
| [`codePoints`](https://zheruel.github.io/nano-string-utils/#codePoints) | Split into Unicode code points | 131 B |
| [`deburr`](https://zheruel.github.io/nano-string-utils/#deburr) | Strip accents and diacritics, `café` becomes `cafe` | 273 B |
| [`toASCII`](https://zheruel.github.io/nano-string-utils/#toASCII) | Transliterate to an ASCII-safe representation | 1.2 KB |
| [`normalizeWhitespace`](https://zheruel.github.io/nano-string-utils/#normalizeWhitespace) | Collapse exotic Unicode spaces into plain spaces | 268 B |
| [`removeNonPrintable`](https://zheruel.github.io/nano-string-utils/#removeNonPrintable) | Strip control and non-printable characters | 304 B |

### Natural language

| Function | What it does | Gzipped |
| --- | --- | --- |
| [`pluralize`](https://zheruel.github.io/nano-string-utils/#pluralize) | Pluralise an English word, with irregulars | 459 B |
| [`singularize`](https://zheruel.github.io/nano-string-utils/#singularize) | Singularise an English word | 562 B |
| [`humanizeList`](https://zheruel.github.io/nano-string-utils/#humanizeList) | Join a list as `a, b, and c` | 251 B |
| [`smartSplit`](https://zheruel.github.io/nano-string-utils/#smartSplit) | Split into sentences without breaking on `Dr.` or `3.5` | 586 B |
| [`extractEntities`](https://zheruel.github.io/nano-string-utils/#extractEntities) | Pull emails, URLs, mentions, hashtags and dates out of text | 572 B |

## Size and speed

![Chart comparing gzipped bundle cost per function on a log scale: nano-string-utils and es-toolkit sit between 99 and 331 bytes while lodash ranges from 1.7 KB to 3.4 KB](https://raw.githubusercontent.com/Zheruel/nano-string-utils/main/assets/bundle-size.png)

The whole library is **9.6 KB brotlied** with every function included. In practice you import a handful and ship a few hundred bytes.

### Against lodash and es-toolkit

Numbers below are gzipped bytes, generated by `npm run bench:data`.

| Function     | nano  | es-toolkit | lodash |
| ------------ | ----- | ---------- | ------ |
| `capitalize` | 99 B  | 107 B      | 1.7 KB |
| `kebabCase`  | 201 B | 197 B      | 2.8 KB |
| `snakeCase`  | 200 B | 197 B      | 2.8 KB |
| `pascalCase` | 222 B | 231 B      | —      |
| `camelCase`  | 235 B | 273 B      | 3.5 KB |
| `deburr`     | 273 B | 332 B      | 1.8 KB |
| `truncate`   | 276 B | —          | 2.9 KB |
| `template`   | 302 B | —          | 5.6 KB |

Against **lodash**, nano is 7–19× smaller on every function both libraries ship. Against **es-toolkit**, sizes are within a few bytes either way — the difference there is scope, not weight: validation, sanitization, PII redaction, fuzzy matching, and Unicode helpers have no es-toolkit equivalent.

### Throughput

Operations per second, higher is better. Across the 16 benchmarked functions nano leads on 8, lodash on 4, and es-toolkit on 4.

| Function     | nano   | lodash | es-toolkit |
| ------------ | ------ | ------ | ---------- |
| `capitalize` | 21.2M  | 16.2M  | 21.2M      |
| `snakeCase`  | 4.2M   | 3.1M   | 4.1M       |
| `camelCase`  | 3.3M   | 2.2M   | 3.3M       |
| `template`   | 996K   | 53K    | —          |
| `padStart`   | 7.9M   | 18.8M  | —          |
| `deburr`     | 2.3M   | 2.9M   | 2.3M       |

Case conversion is on par with es-toolkit and roughly 1.4× faster than lodash; `template` is about 19× faster than lodash's. lodash is genuinely faster at padding and at truncating long strings. Run `npm run bench` to reproduce any of this on your own machine.

**[Full interactive benchmarks →](https://zheruel.github.io/nano-string-utils/#performance)**

## Type safety

![Diagram showing two TypeScript panels: branded types reject a raw string where an Email is required until isValidEmail narrows it, and template literal types resolve camelCase of hello-world to the literal type helloWorld](https://raw.githubusercontent.com/Zheruel/nano-string-utils/main/assets/type-safety.png)

### Branded types

A `string` that has been validated is a different type from one that hasn't, so you can't lose the validation on the way through your code.

```typescript
import { toEmail, isValidEmail, assertEmail } from "nano-string-utils";
import type { Email } from "nano-string-utils";

declare function sendWelcome(to: Email): void;

const input: string = form.get("email");

sendWelcome(input); // ✗ Type error: string is not assignable to Email

// Narrow it — type guard
if (isValidEmail(input)) {
  sendWelcome(input); // ✓ input is Email here
}

// Or convert — returns Email | null
const email = toEmail(input);
if (email) sendWelcome(email);

// Or assert — throws BrandedTypeError on invalid input
assertEmail(input);
sendWelcome(input); // ✓
```

`Email`, `URL`, `Slug`, `SafeHTML`, `HexColor`, `NumericString`, `AlphanumericString`, `UUID`, and `IntegerString` each come with a `toX` converter, an `isValidX` guard, an `assertX` assertion, and an `unsafeX` escape hatch for values you have already validated elsewhere.

### Template literal types

When the compiler knows the input string, it knows the exact output string.

```typescript
const a = camelCase("hello-world");
//    ^? const a: "helloWorld"

const b = kebabCase("backgroundColor");
//    ^? const b: "background-color"

const c = constantCase("user id");
//    ^? const c: "USER_ID"
```

Pass a runtime `string` and you get `string` back — no cost, no ceremony.

## Null safety

Almost every function tolerates `null` and `undefined` rather than throwing, so you can drop them into pipelines handling untrusted input. The input type flows through: `string` in, `string` out; `null` in, `null` out.

```javascript
slugify(null); // null
camelCase(undefined); // undefined
truncate(null, 10); // null
isEmail(null); // false
wordCount(undefined); // 0
```

Four functions are the exception and will throw on a nullish argument — guard them yourself:

| Function                | Throws on             |
| ----------------------- | --------------------- |
| `levenshtein`           | either argument       |
| `levenshteinNormalized` | either argument       |
| `redact`                | the input string      |
| `humanizeList`          | the input array       |

## CLI

```bash
npx nano-string-utils slugify "Hello World"   # hello-world
```

Install it globally for everyday use, or reach for `npx`, `deno run`, or `bunx` on demand.

```bash
npm install -g nano-string-utils

nano-string camelCase "hello-world"          # helloWorld
nano-string truncate "Long text here" --length 10
nano-string template "Hello {{name}}" --data '{"name":"World"}'
nano-string isEmail "test@example.com"       # true
nano-string levenshtein "kitten" "sitting"   # 3

# Reads stdin, so it pipes
echo "Hello World" | nano-string slugify     # hello-world
cat post.md | nano-string excerpt --length 160
```

`nano-string --help` lists every command; `nano-string <function> --help` explains one.

## Runtime compatibility

| Runtime      | Supported | Install                               | CLI |
| ------------ | --------- | ------------------------------------- | --- |
| Node.js ≥ 18 | ✅        | `npm install nano-string-utils`       | ✅  |
| Deno         | ✅        | `deno add jsr:@zheruel/nano-string-utils` | ✅  |
| Bun          | ✅        | `bun add nano-string-utils`           | ✅  |
| Browsers     | ✅        | bundler or CDN                        | —   |
| Edge / workers | ✅      | bundler                               | —   |

Only standard JavaScript APIs are used, so behaviour is identical everywhere. Both ESM and CommonJS builds ship in the package, with full type definitions for each.

## Compared with the alternatives

| Library             | Full size | Dependencies | Tree-shakeable        | TypeScript | Scope                              |
| ------------------- | --------- | ------------ | --------------------- | ---------- | ---------------------------------- |
| `nano-string-utils` | 9.6 KB    | 0            | ✅                    | ✅ strict  | Strings only, 61 functions         |
| `lodash`            | ~70 KB    | 0            | ⚠️ needs `lodash-es`  | ✅ via DT  | General purpose                    |
| `es-toolkit`        | ~30 KB    | 0            | ✅                    | ✅         | General purpose                    |
| `underscore.string` | ~20 KB    | 0            | ❌                    | ❌         | Strings only                       |
| `voca`              | ~30 KB    | 0            | ❌                    | ✅ via DT  | Strings only                       |

If you already use es-toolkit for arrays and objects, nano-string-utils composes with it — the two overlap on seven functions and disagree on almost nothing.

**[Step-by-step lodash migration guide →](https://zheruel.github.io/nano-string-utils/#migration)**

## Documentation

- **[Interactive playground](https://zheruel.github.io/nano-string-utils/)** — run any function against your own input in the browser
- **[Bundle size explorer](https://zheruel.github.io/nano-string-utils/#bundle-size)** — per-function comparison against lodash and es-toolkit
- **[Performance benchmarks](https://zheruel.github.io/nano-string-utils/#performance)**
- **[Migration guide](https://zheruel.github.io/nano-string-utils/#migration)** — lodash and underscore.string equivalents
- **[JSR package](https://jsr.io/@zheruel/nano-string-utils)** — TypeScript source, published for Deno

## Development

```bash
git clone https://github.com/Zheruel/nano-string-utils.git
cd nano-string-utils
npm install

npm test              # watch mode
npm run test:coverage # once, with coverage
npm run typecheck
npm run build
npm run size          # enforce the bundle budget
npm run bench         # performance benchmarks
```

Adding a function means a module in `src/`, a test file in `tests/`, an export from `src/index.ts`, and an entry in `docs-src/src/metadata.ts`. `CLAUDE.md` has the full checklist.

## Contributing

Issues and pull requests are welcome. For anything substantial, open an issue first so we can agree on the shape of it.

1. Fork and branch (`git checkout -b feature/thing`)
2. Add tests — every function has a matching file in `tests/`
3. Run `npm run typecheck && npm run test:coverage && npm run build && npm run size`
4. Open a pull request

## License

MIT © [Zheruel](https://github.com/Zheruel)

---

<p align="center">
  <a href="https://github.com/Zheruel/nano-string-utils/issues">Report a bug</a> ·
  <a href="https://github.com/Zheruel/nano-string-utils/issues">Request a feature</a> ·
  <a href="https://zheruel.github.io/nano-string-utils/">Docs</a> ·
  <a href="https://github.com/Zheruel/nano-string-utils">Star on GitHub</a>
</p>
