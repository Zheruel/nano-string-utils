/**
 * Validates if a string is a valid UUID (Universally Unique Identifier).
 *
 * This function validates UUIDs in the standard 8-4-4-4-12 format with hyphens.
 * It accepts all UUID versions (v1-v5) and the NIL UUID, and is case-insensitive.
 * Perfect for validating API identifiers, session tokens, and database IDs.
 *
 * @param str - The string to validate (leading/trailing whitespace is automatically trimmed)
 * @returns `true` if the string is a valid UUID, `false` otherwise
 *
 * @example
 * ```typescript
 * // Valid UUIDs
 * isUUID('550e8400-e29b-41d4-a716-446655440000'); // true (v4)
 * isUUID('6ba7b810-9dad-11d1-80b4-00c04fd430c8'); // true (v1)
 * isUUID('00000000-0000-0000-0000-000000000000'); // true (NIL UUID)
 * isUUID('550E8400-E29B-41D4-A716-446655440000'); // true (uppercase)
 *
 * // Invalid UUIDs
 * isUUID('550e8400e29b41d4a716446655440000');     // false (no hyphens)
 * isUUID('550e8400-e29b-41d4-a716');              // false (too short)
 * isUUID('not-a-uuid');                           // false (invalid format)
 * isUUID('550e8400-e29b-41d4-a716-44665544000g'); // false (invalid char 'g')
 * isUUID('');                                     // false (empty string)
 * ```
 *
 * @example
 * ```typescript
 * // Validate API identifier
 * const sessionId = '550e8400-e29b-41d4-a716-446655440000';
 * if (isUUID(sessionId)) {
 *   console.log('Valid session token');
 * }
 *
 * // Validate database ID
 * const userId = request.params.id;
 * if (isUUID(userId)) {
 *   // Fetch user from database
 *   const user = await db.users.findById(userId);
 * }
 * ```
 */
export const isUUID = (str: string): boolean => {
  if (!str) return false;
  const trimmed = str.trim();
  if (!trimmed) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    trimmed
  );
};
