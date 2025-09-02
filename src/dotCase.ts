/**
 * Converts a string to dot.case
 * @param str - The input string to convert
 * @returns A dot.case string
 * @example
 * dotCase('hello world') // 'hello.world'
 * dotCase('helloWorld') // 'hello.world'
 * dotCase('hello-world') // 'hello.world'
 * dotCase('hello_world') // 'hello.world'
 * dotCase('XMLHttpRequest') // 'xml.http.request'
 */
export const dotCase = (str: string): string => {
  if (!str) return str;

  return (
    str
      .trim()
      // Handle consecutive uppercase letters (acronyms)
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1.$2")
      // Add dot between lowercase/number and uppercase
      .replace(/([a-z0-9])([A-Z])/g, "$1.$2")
      // Add dot between letter and number
      .replace(/([a-zA-Z])([0-9])/g, "$1.$2")
      // Add dot between number and letter
      .replace(/([0-9])([a-zA-Z])/g, "$1.$2")
      // Replace non-alphanumeric with dot
      .replace(/[^a-z0-9]+/gi, ".")
      // Remove leading/trailing dots
      .replace(/^\.+|\.+$/g, "")
      // Replace multiple dots with single
      .replace(/\.+/g, ".")
      .toLowerCase()
  );
};
