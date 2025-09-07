/**
 * Template literal types for compile-time string transformations
 * These types provide type-safe string case conversions at compile time
 */

// Helper type to split string by delimiter
type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ""
  ? []
  : S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S];

// Helper to join array of strings with delimiter
type Join<T extends readonly string[], D extends string> = T extends readonly []
  ? ""
  : T extends readonly [string]
  ? T[0]
  : T extends readonly [string, ...infer R]
  ? R extends readonly string[]
    ? `${T[0]}${D}${Join<R, D>}`
    : never
  : string;

// Capitalize first letter
type CapitalizeFirst<S extends string> = S extends `${infer F}${infer R}`
  ? `${Uppercase<F>}${R}`
  : S;

// Uncapitalize first letter
type UncapitalizeFirst<S extends string> = S extends `${infer F}${infer R}`
  ? `${Lowercase<F>}${R}`
  : S;

// Helper to check if a character is a digit
type IsDigit<C extends string> = C extends
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  ? true
  : false;

// Helper to check if a character is a letter
type IsLetter<C extends string> = Uppercase<C> extends Lowercase<C>
  ? false
  : true;

// Split camelCase/PascalCase/ALLCAPS into words
type SplitByCase<S extends string> = S extends ""
  ? []
  : S extends `${infer C1}${infer C2}${infer Rest}`
  ? // Check for uppercase followed by lowercase (word boundary)
    C1 extends Uppercase<C1>
    ? C2 extends Lowercase<C2>
      ? IsLetter<C1> extends true
        ? IsLetter<C2> extends true
          ? // Start of new word (e.g., "World" in "HelloWorld")
            SplitByCase<`${C1}${C2}${Rest}`> extends [
              infer First,
              ...infer Tail
            ]
            ? First extends string
              ? Tail extends string[]
                ? [First, ...Tail]
                : [S]
              : [S]
            : [S]
          : SplitByCase<`${C2}${Rest}`> extends string[]
          ? [C1, ...SplitByCase<`${C2}${Rest}`>]
          : [S]
        : SplitByCase<`${C2}${Rest}`> extends string[]
        ? [C1, ...SplitByCase<`${C2}${Rest}`>]
        : [S]
      : // Check for lowercase followed by uppercase (word boundary)
      C1 extends Lowercase<C1>
      ? C2 extends Uppercase<C2>
        ? IsLetter<C1> extends true
          ? IsLetter<C2> extends true
            ? // Word boundary (e.g., between "hello" and "World")
              SplitByCase<`${C2}${Rest}`> extends [infer First, ...infer Tail]
              ? First extends string
                ? Tail extends string[]
                  ? [C1, `${C2}${First extends "" ? "" : First}`, ...Tail]
                  : [C1, S]
                : [C1, S]
              : [C1, `${C2}${Rest}`]
            : [`${C1}${C2}`, ...SplitByCase<Rest>]
          : [`${C1}${C2}`, ...SplitByCase<Rest>]
        : [`${C1}${C2}`, ...SplitByCase<Rest>]
      : [`${C1}${C2}`, ...SplitByCase<Rest>]
    : [`${C1}${C2}`, ...SplitByCase<Rest>]
  : // Single or two characters left
  S extends `${infer C}${infer R}`
  ? R extends ""
    ? [S]
    : [`${C}`, ...SplitByCase<R>]
  : [S];

// Helper to check if string is all digits
type IsAllDigits<S extends string> = S extends ""
  ? false
  : S extends `${infer C}${infer Rest}`
  ? IsDigit<C> extends true
    ? Rest extends ""
      ? true
      : IsAllDigits<Rest>
    : false
  : false;

// Helper to check if string contains lowercase letters
type HasLowercase<S extends string> = Lowercase<S> extends S
  ? Uppercase<S> extends S
    ? false
    : true
  : false;

// Simplified word splitter that preserves all-caps words and groups consecutive digits
type SplitWords<S extends string, Acc extends string = ""> = S extends ""
  ? Acc extends ""
    ? []
    : [Acc]
  : S extends `${infer C}${infer Rest}`
  ? // Non-letter characters are word boundaries
    IsLetter<C> extends false
    ? IsDigit<C> extends true
      ? // Current char is a digit
        IsAllDigits<Acc> extends true
        ? // Accumulator has only digits, continue accumulating
          SplitWords<Rest, `${Acc}${C}`>
        : Acc extends ""
        ? // Start new digit sequence
          SplitWords<Rest, C>
        : // Acc has letters, flush and start digit sequence
          [Acc, ...SplitWords<Rest, C>]
      : // Non-letter, non-digit - word boundary
      Acc extends ""
      ? SplitWords<Rest, "">
      : [Acc, ...SplitWords<Rest, "">]
    : // Letter character
    IsAllDigits<Acc> extends true
    ? // Acc has digits, flush and start letter sequence
      [Acc, ...SplitWords<`${C}${Rest}`, "">]
    : C extends Uppercase<C>
    ? // Current character is uppercase
      Acc extends ""
      ? // No accumulator, start new word with uppercase
        Rest extends `${infer Next}${infer After}`
        ? Next extends Lowercase<Next>
          ? IsLetter<Next> extends true
            ? // Uppercase followed by lowercase - capture both
              SplitWords<After, `${C}${Next}`>
            : SplitWords<Rest, C>
          : SplitWords<Rest, C>
        : [C]
      : // Have accumulator
      HasLowercase<Acc> extends true
      ? // Accumulator has lowercase, this uppercase starts new word
        Rest extends `${infer Next}${infer After}`
        ? Next extends Lowercase<Next>
          ? IsLetter<Next> extends true
            ? // Uppercase followed by lowercase - new word
              [Acc, ...SplitWords<After, `${C}${Next}`>]
            : [Acc, ...SplitWords<Rest, C>]
          : [Acc, ...SplitWords<Rest, C>]
        : [Acc, C]
      : // Accumulator is all uppercase
      Rest extends `${infer Next}${infer After}`
      ? Next extends Lowercase<Next>
        ? IsLetter<Next> extends true
          ? // CAPS followed by lowercase - new word starts at current uppercase
            Acc extends `${infer AccPrefix}${string}`
            ? AccPrefix extends ""
              ? SplitWords<After, `${C}${Next}`>
              : [Acc, ...SplitWords<After, `${C}${Next}`>]
            : [Acc, ...SplitWords<After, `${C}${Next}`>]
          : SplitWords<Rest, `${Acc}${C}`>
        : // Uppercase followed by uppercase - continue caps word
          SplitWords<Rest, `${Acc}${C}`>
      : [`${Acc}${C}`]
    : // Lowercase letter - continue current word
      SplitWords<Rest, `${Acc}${C}`>
  : [];

// Helper to extract words from any case
export type ExtractWords<S extends string> = string extends S
  ? string[]
  : S extends `${infer W}-${infer R}`
  ? [...SplitWords<W>, ...ExtractWords<R>]
  : S extends `${infer W}_${infer R}`
  ? [...SplitWords<W>, ...ExtractWords<R>]
  : S extends `${infer W} ${infer R}`
  ? [...SplitWords<W>, ...ExtractWords<R>]
  : S extends `${infer W}.${infer R}`
  ? [...SplitWords<W>, ...ExtractWords<R>]
  : S extends `${infer W}/${infer R}`
  ? [...SplitWords<W>, ...ExtractWords<R>]
  : SplitWords<S>;

// Helper to transform word arrays
type TransformWords<
  Words extends readonly string[],
  Transform extends "lower" | "upper" | "capital"
> = Words extends readonly []
  ? []
  : Words extends readonly [infer H, ...infer R]
  ? H extends string
    ? R extends readonly string[]
      ? Transform extends "lower"
        ? [Lowercase<H>, ...TransformWords<R, Transform>]
        : Transform extends "upper"
        ? [Uppercase<H>, ...TransformWords<R, Transform>]
        : [CapitalizeFirst<Lowercase<H>>, ...TransformWords<R, Transform>]
      : []
    : []
  : [];

/**
 * Convert string to camelCase at type level
 * @example
 * type Result = CamelCase<"hello-world"> // "helloWorld"
 */
export type CamelCase<S extends string> = string extends S
  ? string
  : ExtractWords<S> extends readonly [infer F, ...infer R]
  ? F extends string
    ? R extends readonly string[]
      ? `${Lowercase<F>}${Join<TransformWords<R, "capital">, "">}`
      : Lowercase<S>
    : ""
  : "";

/**
 * Convert string to kebab-case at type level
 * @example
 * type Result = KebabCase<"helloWorld"> // "hello-world"
 */
export type KebabCase<S extends string> = string extends S
  ? string
  : ExtractWords<S> extends readonly string[]
  ? Join<TransformWords<ExtractWords<S>, "lower">, "-">
  : string;

/**
 * Convert string to snake_case at type level
 * @example
 * type Result = SnakeCase<"helloWorld"> // "hello_world"
 */
export type SnakeCase<S extends string> = string extends S
  ? string
  : ExtractWords<S> extends readonly string[]
  ? Join<TransformWords<ExtractWords<S>, "lower">, "_">
  : string;

/**
 * Convert string to PascalCase at type level
 * @example
 * type Result = PascalCase<"hello-world"> // "HelloWorld"
 */
export type PascalCase<S extends string> = string extends S
  ? string
  : ExtractWords<S> extends readonly string[]
  ? Join<TransformWords<ExtractWords<S>, "capital">, "">
  : string;

/**
 * Convert string to CONSTANT_CASE at type level
 * @example
 * type Result = ConstantCase<"helloWorld"> // "HELLO_WORLD"
 */
export type ConstantCase<S extends string> = string extends S
  ? string
  : ExtractWords<S> extends readonly string[]
  ? Join<TransformWords<ExtractWords<S>, "upper">, "_">
  : string;

/**
 * Convert string to dot.case at type level
 * @example
 * type Result = DotCase<"helloWorld"> // "hello.world"
 */
export type DotCase<S extends string> = string extends S
  ? string
  : ExtractWords<S> extends readonly string[]
  ? Join<TransformWords<ExtractWords<S>, "lower">, ".">
  : string;

/**
 * Convert string to path/case at type level
 * @example
 * type Result = PathCase<"helloWorld"> // "hello/world"
 */
export type PathCase<S extends string> = string extends S
  ? string
  : ExtractWords<S> extends readonly string[]
  ? Join<TransformWords<ExtractWords<S>, "lower">, "/">
  : string;

/**
 * Convert string to Sentence case at type level
 * @example
 * type Result = SentenceCase<"helloWorld"> // "Hello world"
 */
export type SentenceCase<S extends string> = string extends S
  ? string
  : ExtractWords<S> extends readonly [infer F, ...infer R]
  ? F extends string
    ? R extends readonly string[]
      ? `${CapitalizeFirst<Lowercase<F>>}${R extends readonly []
          ? ""
          : " "}${Join<TransformWords<R, "lower">, " ">}`
      : CapitalizeFirst<Lowercase<S>>
    : ""
  : "";

/**
 * Convert string to Title Case at type level
 * @example
 * type Result = TitleCase<"hello-world"> // "Hello World"
 */
export type TitleCase<S extends string> = string extends S
  ? string
  : ExtractWords<S> extends readonly string[]
  ? Join<TransformWords<ExtractWords<S>, "capital">, " ">
  : string;
