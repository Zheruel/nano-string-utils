// Pre-compiled regex for better performance
const HEX_COLOR_REGEX =
  /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

/**
 * Validates if a string is a valid hexadecimal color code
 * @param str - The input string to validate (leading/trailing whitespace is automatically trimmed)
 * @returns True if the string is a valid hex color format, false otherwise
 * @example
 * ```ts
 * // Basic validation
 * isHexColor('#fff') // true (3-digit)
 * isHexColor('#ffffff') // true (6-digit)
 * isHexColor('#fff8') // true (4-digit with alpha)
 * isHexColor('#ffffff80') // true (8-digit with alpha)
 * isHexColor('#FFF') // true (case-insensitive)
 * isHexColor('fff') // false (missing #)
 * isHexColor('#gggggg') // false (invalid characters)
 *
 * // Real-world usage in design systems
 * const validateThemeColor = (color: string) => {
 *   if (!isHexColor(color)) {
 *     throw new Error(`Invalid color: ${color}`)
 *   }
 *   return color
 * }
 *
 * // Form validation for color picker
 * const colorInput = document.getElementById('color')
 * colorInput.addEventListener('change', (e) => {
 *   const value = e.target.value
 *   if (isHexColor(value)) {
 *     applyColor(value)
 *   } else {
 *     showError('Please enter a valid hex color')
 *   }
 * })
 *
 * // Using with branded types for type safety
 * import { isValidHexColor, toHexColor, type HexColor } from 'nano-string-utils/types'
 *
 * // Type guard approach
 * const userColor: string = getUserInput()
 * if (isValidHexColor(userColor)) {
 *   // userColor is now typed as HexColor
 *   setThemeColor(userColor) // function expects HexColor type
 * }
 *
 * // Builder function approach
 * const color = toHexColor('#ff5733')
 * if (color) {
 *   // color is typed as HexColor | null
 *   updateBrandColor(color) // Safe to use
 * }
 *
 * // Type-safe design system
 * interface Theme {
 *   primary: HexColor
 *   secondary: HexColor
 *   accent: HexColor
 * }
 *
 * const createTheme = (colors: Record<string, string>): Theme | null => {
 *   const primary = toHexColor(colors.primary)
 *   const secondary = toHexColor(colors.secondary)
 *   const accent = toHexColor(colors.accent)
 *
 *   if (!primary || !secondary || !accent) return null
 *
 *   return { primary, secondary, accent }
 * }
 * ```
 */
export const isHexColor = (str: string): boolean => {
  if (!str) return false;
  const trimmed = str.trim();
  if (!trimmed) return false;
  return HEX_COLOR_REGEX.test(trimmed);
};
