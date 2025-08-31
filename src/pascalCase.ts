/**
 * Converts a string to PascalCase
 * @param str - The input string to convert
 * @returns A PascalCase string
 * @example
 * pascalCase('hello world') // 'HelloWorld'
 * pascalCase('hello-world') // 'HelloWorld'
 * pascalCase('hello_world') // 'HelloWorld'
 */
export const pascalCase = (str: string): string => {
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

  // Ensure first letter is uppercase
  return result.charAt(0).toUpperCase() + result.slice(1);
};
