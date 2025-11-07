// Pre-compiled regex for better performance
const INTEGER_REGEX = /^-?\d+$/;

/**
 * Validates if a string represents an integer value (whole number without decimals)
 * @param str - The input string to validate
 * @returns True if the string is a valid integer, false otherwise
 * @example
 * ```ts
 * // Basic validation
 * isInteger('42') // true (positive integer)
 * isInteger('-17') // true (negative integer)
 * isInteger('0') // true (zero)
 * isInteger('  42  ') // true (whitespace trimmed)
 * isInteger('007') // true (leading zeros allowed)
 * isInteger('3.14') // false (decimal number)
 * isInteger('42.0') // false (contains decimal point)
 * isInteger('abc') // false (non-numeric)
 * isInteger('') // false (empty string)
 * isInteger('Infinity') // false (special value)
 * isInteger('1e5') // false (scientific notation)
 *
 * // Real-world usage in age validation
 * const validateAge = (input: string) => {
 *   if (!isInteger(input)) {
 *     throw new Error('Age must be a whole number')
 *   }
 *   const age = parseInt(input, 10)
 *   if (age < 0 || age > 150) {
 *     throw new Error('Age must be between 0 and 150')
 *   }
 *   return age
 * }
 *
 * // Quantity validation for e-commerce
 * const validateQuantity = (input: string) => {
 *   if (!isInteger(input)) {
 *     return { valid: false, error: 'Quantity must be a whole number' }
 *   }
 *   const quantity = parseInt(input, 10)
 *   if (quantity < 1) {
 *     return { valid: false, error: 'Quantity must be at least 1' }
 *   }
 *   return { valid: true, value: quantity }
 * }
 *
 * // Pagination validation
 * const getPaginationParams = (pageStr: string, limitStr: string) => {
 *   if (!isInteger(pageStr) || !isInteger(limitStr)) {
 *     throw new Error('Page and limit must be integers')
 *   }
 *   const page = parseInt(pageStr, 10)
 *   const limit = parseInt(limitStr, 10)
 *
 *   if (page < 1) throw new Error('Page must be >= 1')
 *   if (limit < 1 || limit > 100) throw new Error('Limit must be 1-100')
 *
 *   return { page, limit, offset: (page - 1) * limit }
 * }
 *
 * // ID validation for database queries
 * app.get('/users/:id', (req, res) => {
 *   const { id } = req.params
 *   if (!isInteger(id)) {
 *     return res.status(400).json({ error: 'Invalid user ID format' })
 *   }
 *   const userId = parseInt(id, 10)
 *   if (userId < 1) {
 *     return res.status(400).json({ error: 'User ID must be positive' })
 *   }
 *   // Query database with userId...
 * })
 *
 * // Form input validation
 * const processFormData = (data: Record<string, string>) => {
 *   const errors: string[] = []
 *
 *   if (!isInteger(data.age)) {
 *     errors.push('Age must be a whole number')
 *   }
 *   if (!isInteger(data.quantity)) {
 *     errors.push('Quantity must be a whole number')
 *   }
 *
 *   return errors.length > 0 ? { valid: false, errors } : { valid: true }
 * }
 *
 * // Using with branded types for type safety
 * import { isValidInteger, toIntegerString, type IntegerString } from 'nano-string-utils/types'
 *
 * // Type guard approach
 * const userInput: string = getFormValue()
 * if (isValidInteger(userInput)) {
 *   // userInput is now typed as IntegerString
 *   processIntegerValue(userInput) // function expects IntegerString type
 * }
 *
 * // Builder function approach
 * const integerStr = toIntegerString('123')
 * if (integerStr) {
 *   // integerStr is typed as IntegerString | null
 *   saveToDatabase(integerStr) // Safe to use
 * }
 *
 * // Type-safe pagination
 * interface PaginationParams {
 *   page: IntegerString
 *   limit: IntegerString
 * }
 *
 * const parsePagination = (raw: Record<string, string>): PaginationParams | null => {
 *   const page = toIntegerString(raw.page)
 *   const limit = toIntegerString(raw.limit)
 *
 *   if (!page || !limit) return null
 *
 *   return { page, limit }
 * }
 * ```
 */
export const isInteger = (str: string): boolean => {
  if (!str) return false;
  const trimmed = str.trim();
  if (!trimmed) return false;
  return INTEGER_REGEX.test(trimmed);
};
