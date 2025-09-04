// Pre-compiled regex patterns for better performance
const PASCAL_LOWERCASE_UPPER = /([a-z0-9])([A-Z])/g;
const PASCAL_NUMBER_LETTER = /([0-9])([a-zA-Z])/g;
const PASCAL_NON_ALNUM_CHAR = /[^a-z0-9]+(.)/g;
const PASCAL_NON_ALNUM = /[^a-z0-9]/gi;

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
    .replace(PASCAL_LOWERCASE_UPPER, "$1 $2")
    // Add space between number and letter
    .replace(PASCAL_NUMBER_LETTER, "$1 $2")
    .toLowerCase();

  // Then capitalize letters after non-alphanumeric characters
  result = result.replace(PASCAL_NON_ALNUM_CHAR, (_, chr) => chr.toUpperCase());

  // Remove all non-alphanumeric characters
  result = result.replace(PASCAL_NON_ALNUM, "");

  // Ensure first letter is uppercase
  return result.charAt(0).toUpperCase() + result.slice(1);
};
