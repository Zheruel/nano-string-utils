// Pre-compiled regex patterns for better performance
const SLUG_NON_WORD = /[^\w\s-]/g;
const SLUG_SPACES = /[\s_-]+/g;
const SLUG_TRIM = /^-+|-+$/g;

/**
 * Converts a string to a URL-safe slug
 * @param str - The input string to slugify
 * @returns A URL-safe slug
 * @example
 * ```ts
 * // Basic usage
 * slugify('Hello World!') // 'hello-world'
 * slugify('  Multiple   Spaces  ') // 'multiple-spaces'
 * slugify('Special #@! Characters') // 'special-characters'
 *
 * // Using with branded Slug type for type safety
 * import { toSlug, ensureSlug, type Slug } from 'nano-string-utils/types'
 *
 * // Create type-safe slugs
 * const slug: Slug = toSlug('Blog Post Title!')
 * // slug is 'blog-post-title' with Slug branded type
 *
 * // Type-safe routing
 * interface Route {
 *   path: Slug
 *   component: React.FC
 * }
 *
 * const routes: Route[] = [
 *   { path: toSlug('About Us'), component: AboutPage },
 *   { path: toSlug('Contact'), component: ContactPage }
 * ]
 *
 * // Ensure slug with validation
 * const userInput = 'already-slugified'
 * const slug2 = ensureSlug(userInput)
 * // If already a valid slug, returns as-is; otherwise slugifies
 *
 * // Database schema with branded types
 * interface BlogPost {
 *   id: string
 *   title: string
 *   slug: Slug // Ensures only valid slugs in DB
 * }
 *
 * const createPost = (title: string): BlogPost => ({
 *   id: generateId(),
 *   title,
 *   slug: toSlug(title)
 * })
 * ```
 */
export const slugify = (str: string): string => {
  if (!str) return str;

  return str
    .toLowerCase()
    .trim()
    .replace(SLUG_NON_WORD, "")
    .replace(SLUG_SPACES, "-")
    .replace(SLUG_TRIM, "");
};
