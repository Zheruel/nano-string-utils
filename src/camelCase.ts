// Pre-compiled regex patterns for better performance
const CAMEL_LOWERCASE_UPPER = /([a-z0-9])([A-Z])/g;
const CAMEL_NUMBER_LETTER = /([0-9])([a-zA-Z])/g;
const CAMEL_NON_ALNUM_CHAR = /[^a-z0-9]+(.)/g;
const CAMEL_NON_ALNUM = /[^a-z0-9]/gi;

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
    .replace(CAMEL_LOWERCASE_UPPER, "$1 $2")
    // Add space between number and letter
    .replace(CAMEL_NUMBER_LETTER, "$1 $2")
    .toLowerCase();

  // Then capitalize letters after non-alphanumeric characters
  result = result.replace(CAMEL_NON_ALNUM_CHAR, (_, chr) => chr.toUpperCase());

  // Remove all non-alphanumeric characters
  result = result.replace(CAMEL_NON_ALNUM, "");

  // Ensure first letter is lowercase
  return result.charAt(0).toLowerCase() + result.slice(1);
};
