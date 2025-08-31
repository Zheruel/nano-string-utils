/**
 * Converts a string to camelCase
 * @param str - The input string to convert
 * @returns A camelCase string
 * @example
 * camelCase('hello world') // 'helloWorld'
 * camelCase('hello-world') // 'helloWorld'
 * camelCase('hello_world') // 'helloWorld'
 */
export const camelCase = (str: string): string => {
  // First, handle camelCase and PascalCase by adding spaces before capitals
  let result = str
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    // Add space between number and letter
    .replace(/([0-9])([a-zA-Z])/g, "$1 $2")
    .toLowerCase();

  // Then capitalize letters after non-alphanumeric characters
  result = result.replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase());

  // Remove all non-alphanumeric characters
  result = result.replace(/[^a-z0-9]/gi, "");

  // Ensure first letter is lowercase
  return result.charAt(0).toLowerCase() + result.slice(1);
};
