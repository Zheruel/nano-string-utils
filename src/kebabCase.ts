// Pre-compiled regex patterns for better performance
const KEBAB_LOWERCASE_UPPER = /([a-z0-9])([A-Z])/g;
const KEBAB_NUMBER_LETTER = /([0-9])([a-zA-Z])/g;
const KEBAB_NON_ALNUM = /[^a-z0-9]+/gi;
const KEBAB_TRIM = /^-+|-+$/g;
const KEBAB_MULTIPLE = /-+/g;

/**
 * Converts a string to kebab-case
 * @param str - The input string to convert
 * @returns A kebab-case string
 * @example
 * kebabCase('Hello World') // 'hello-world'
 * kebabCase('helloWorld') // 'hello-world'
 * kebabCase('hello_world') // 'hello-world'
 */
export const kebabCase = (str: string): string => {
  return (
    str
      .trim()
      // Add hyphen between lowercase/number and uppercase
      .replace(KEBAB_LOWERCASE_UPPER, "$1-$2")
      // Add hyphen between number and letter
      .replace(KEBAB_NUMBER_LETTER, "$1-$2")
      // Replace non-alphanumeric with hyphen
      .replace(KEBAB_NON_ALNUM, "-")
      // Remove leading/trailing hyphens
      .replace(KEBAB_TRIM, "")
      // Replace multiple hyphens with single
      .replace(KEBAB_MULTIPLE, "-")
      .toLowerCase()
  );
};
