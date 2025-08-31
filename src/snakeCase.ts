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
      .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
      // Add underscore between number and letter
      .replace(/([0-9])([a-zA-Z])/g, "$1_$2")
      // Replace non-alphanumeric with underscore
      .replace(/[^a-z0-9]+/gi, "_")
      // Remove leading/trailing underscores
      .replace(/^_+|_+$/g, "")
      // Replace multiple underscores with single
      .replace(/_+/g, "_")
      .toLowerCase()
  );
};
