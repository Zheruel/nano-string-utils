/**
 * Converts a string to path/case
 * @param str - The input string to convert
 * @returns A path/case string
 * @example
 * pathCase('hello world') // 'hello/world'
 * pathCase('helloWorld') // 'hello/world'
 * pathCase('hello-world') // 'hello/world'
 * pathCase('hello_world') // 'hello/world'
 * pathCase('XMLHttpRequest') // 'xml/http/request'
 */
export const pathCase = (str: string): string => {
  if (!str) return str;

  return (
    str
      .trim()
      // Handle consecutive uppercase letters (acronyms)
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1/$2")
      // Add slash between lowercase/number and uppercase
      .replace(/([a-z0-9])([A-Z])/g, "$1/$2")
      // Add slash between letter and number
      .replace(/([a-zA-Z])([0-9])/g, "$1/$2")
      // Add slash between number and letter
      .replace(/([0-9])([a-zA-Z])/g, "$1/$2")
      // Replace non-alphanumeric with slash
      .replace(/[^a-z0-9]+/gi, "/")
      // Remove leading/trailing slashes
      .replace(/^\/+|\/+$/g, "")
      // Replace multiple slashes with single
      .replace(/\/+/g, "/")
      .toLowerCase()
  );
};
