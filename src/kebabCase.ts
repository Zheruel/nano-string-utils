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
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      // Add hyphen between number and letter
      .replace(/([0-9])([a-zA-Z])/g, "$1-$2")
      // Replace non-alphanumeric with hyphen
      .replace(/[^a-z0-9]+/gi, "-")
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, "")
      // Replace multiple hyphens with single
      .replace(/-+/g, "-")
      .toLowerCase()
  );
};
