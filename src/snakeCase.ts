// Pre-compiled regex patterns for better performance
const SNAKE_LOWERCASE_UPPER = /([a-z0-9])([A-Z])/g;
const SNAKE_NUMBER_LETTER = /([0-9])([a-zA-Z])/g;
const SNAKE_NON_ALNUM = /[^a-z0-9]+/gi;
const SNAKE_TRIM = /^_+|_+$/g;
const SNAKE_MULTIPLE = /_+/g;

/**
 * Converts a string to snake_case
 * @param str - The input string to convert
 * @returns A snake_case string
 * @example
 * snakeCase('Hello World') // 'hello_world'
 * snakeCase('helloWorld') // 'hello_world'
 * snakeCase('hello-world') // 'hello_world'
 */
export const snakeCase = (str: string): string => {
  return (
    str
      .trim()
      // Add underscore between lowercase/number and uppercase
      .replace(SNAKE_LOWERCASE_UPPER, "$1_$2")
      // Add underscore between number and letter
      .replace(SNAKE_NUMBER_LETTER, "$1_$2")
      // Replace non-alphanumeric with underscore
      .replace(SNAKE_NON_ALNUM, "_")
      // Remove leading/trailing underscores
      .replace(SNAKE_TRIM, "")
      // Replace multiple underscores with single
      .replace(SNAKE_MULTIPLE, "_")
      .toLowerCase()
  );
};
