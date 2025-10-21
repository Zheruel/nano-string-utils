// Pre-compiled regex for better performance
const NUMERIC_REGEX = /^-?\d+(\.\d+)?$/;

/**
 * Validates if a string represents a numeric value (integer or decimal)
 * @param str - The input string to validate
 * @returns True if the string is a valid numeric value, false otherwise
 * @example
 * ```ts
 * // Basic validation
 * isNumeric('42') // true (integer)
 * isNumeric('-17') // true (negative integer)
 * isNumeric('3.14') // true (decimal)
 * isNumeric('-0.5') // true (negative decimal)
 * isNumeric('  42  ') // true (whitespace trimmed)
 * isNumeric('abc') // false (non-numeric)
 * isNumeric('') // false (empty string)
 * isNumeric('Infinity') // false (special value)
 * isNumeric('1e5') // false (scientific notation)
 *
 * // Real-world usage in form validation
 * const validateAge = (input: string) => {
 *   if (!isNumeric(input)) {
 *     throw new Error('Please enter a valid number')
 *   }
 *   const age = parseInt(input, 10)
 *   return age >= 0 && age <= 150
 * }
 *
 * // CSV data parsing
 * const parseCSVRow = (row: string[]) => {
 *   return row.map(cell => {
 *     if (isNumeric(cell)) {
 *       return parseFloat(cell)
 *     }
 *     return cell
 *   })
 * }
 *
 * // API validation
 * app.post('/price', (req, res) => {
 *   const { price } = req.body
 *   if (!isNumeric(price)) {
 *     return res.status(400).json({ error: 'Invalid price format' })
 *   }
 *   const priceValue = parseFloat(price)
 *   if (priceValue < 0) {
 *     return res.status(400).json({ error: 'Price must be positive' })
 *   }
 *   // Process valid price...
 * })
 *
 * // Using with branded types for type safety
 * import { isValidNumeric, toNumericString, type NumericString } from 'nano-string-utils/types'
 *
 * // Type guard approach
 * const userInput: string = getFormValue()
 * if (isValidNumeric(userInput)) {
 *   // userInput is now typed as NumericString
 *   processNumericValue(userInput) // function expects NumericString type
 * }
 *
 * // Builder function approach
 * const numericStr = toNumericString('123.45')
 * if (numericStr) {
 *   // numericStr is typed as NumericString | null
 *   saveToDatabase(numericStr) // Safe to use
 * }
 *
 * // Type-safe data processing
 * interface DataRow {
 *   id: NumericString
 *   quantity: NumericString
 *   price: NumericString
 * }
 *
 * const parseDataRow = (raw: Record<string, string>): DataRow | null => {
 *   const id = toNumericString(raw.id)
 *   const quantity = toNumericString(raw.quantity)
 *   const price = toNumericString(raw.price)
 *
 *   if (!id || !quantity || !price) return null
 *
 *   return { id, quantity, price }
 * }
 * ```
 */
export const isNumeric = (str: string): boolean => {
  if (!str) return false;
  const trimmed = str.trim();
  if (!trimmed) return false;
  return NUMERIC_REGEX.test(trimmed);
};
