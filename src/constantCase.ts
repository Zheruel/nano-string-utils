/**
 * Converts a string to CONSTANT_CASE
 * @param str - The input string to convert
 * @returns A CONSTANT_CASE string
 * @example
 * constantCase('hello world') // 'HELLO_WORLD'
 * constantCase('helloWorld') // 'HELLO_WORLD'
 * constantCase('hello-world') // 'HELLO_WORLD'
 * constantCase('__hello__world__') // 'HELLO_WORLD'
 */
export const constantCase = (str: string): string => {
  if (!str) return str;

  // Handle camelCase/PascalCase by adding spaces before capitals
  let result = str
    .trim()
    // Handle consecutive uppercase letters (acronyms)
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    // Handle lowercase or number followed by uppercase
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    // Add space between letter and number
    .replace(/([a-zA-Z])([0-9])/g, "$1 $2")
    // Add space between number and letter
    .replace(/([0-9])([a-zA-Z])/g, "$1 $2")
    // Replace any non-alphanumeric character with space
    .replace(/[^a-z0-9]+/gi, " ")
    // Trim and split by spaces
    .trim()
    .split(/\s+/)
    // Filter empty strings
    .filter(Boolean)
    // Convert to uppercase
    .map((word) => word.toUpperCase())
    // Join with underscores
    .join("_");

  return result;
};
