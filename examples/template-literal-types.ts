/**
 * Examples demonstrating template literal types for case conversions
 * These provide compile-time type transformations for better type safety
 */

import {
  camelCase,
  kebabCase,
  snakeCase,
  pascalCase,
  constantCase,
  dotCase,
  pathCase,
  sentenceCase,
  titleCase,
} from "../src/index.js";

import type {
  CamelCase,
  KebabCase,
  SnakeCase,
  PascalCase,
  ConstantCase,
  DotCase,
  PathCase,
  SentenceCase,
  TitleCase,
} from "../src/types/string-literals.js";

// ============================================
// 1. Basic Usage - Literal strings get literal types
// ============================================

// When you pass a literal string, you get the exact transformed type back
const apiEndpoint = kebabCase("getUserProfile");
// Type: "get-user-profile" (not just string!)

const dbColumn = snakeCase("firstName");
// Type: "first_name"

const componentName = pascalCase("user-avatar");
// Type: "UserAvatar"

const envVar = constantCase("apiKey");
// Type: "API_KEY"

// ============================================
// 2. Type-safe API Routes
// ============================================

// Define your routes with literal types
type ApiRoutes = "user-profile" | "user-settings" | "admin-panel";

// Convert to camelCase for JavaScript method names
type MethodNames = {
  [K in ApiRoutes as `fetch${PascalCase<K>}`]: () => Promise<void>;
};

// This creates an interface with:
// fetchUserProfile(): Promise<void>
// fetchUserSettings(): Promise<void>
// fetchAdminPanel(): Promise<void>

// ============================================
// 3. Configuration Objects
// ============================================

// Convert between different naming conventions in configs
const config = {
  "api-base-url": "https://api.example.com",
  "max-retries": 3,
  "timeout-ms": 5000,
} as const;

// Transform keys to camelCase for JavaScript usage
type ConfigCamelCase = {
  [K in keyof typeof config as CamelCase<K>]: (typeof config)[K];
};

// Now you have type-safe camelCase keys:
// apiBaseUrl: "https://api.example.com"
// maxRetries: 3
// timeoutMs: 5000

// ============================================
// 4. Database Schema Mapping
// ============================================

// Map JavaScript property names to database columns
class User {
  firstName: string = "";
  lastName: string = "";
  emailAddress: string = "";

  // Get the database column name with compile-time safety
  getColumn<T extends keyof this & string>(prop: T): SnakeCase<T> {
    return snakeCase(prop) as SnakeCase<T>;
  }
}

const user = new User();
const column = user.getColumn("firstName");
// Type: "first_name"

// ============================================
// 5. Event Handler Names
// ============================================

// Convert event names to handler method names
type EventName = "user-clicked" | "form-submitted" | "data-loaded";

type HandlerName<T extends EventName> = `on${PascalCase<T>}`;

function createHandler<T extends EventName>(event: T): HandlerName<T> {
  return `on${pascalCase(event)}` as HandlerName<T>;
}

const clickHandler = createHandler("user-clicked");
// Type: "onUserClicked"

// ============================================
// 6. CSS Class Names
// ============================================

// Convert component names to BEM-style CSS classes
type ComponentName = "UserProfile" | "NavigationMenu" | "SearchBar";

function getCssClass<T extends ComponentName>(component: T): KebabCase<T> {
  return kebabCase(component) as KebabCase<T>;
}

const cssClass = getCssClass("UserProfile");
// Type: "user-profile"

// ============================================
// 7. Backward Compatibility
// ============================================

// Runtime strings still work exactly as before
function processUserInput(input: string): string {
  // Returns regular string type for runtime values
  return camelCase(input);
}

const userInput = "some-runtime-value";
const result = camelCase(userInput);
// Type: string (not a literal type)

// ============================================
// 8. Chaining Transformations
// ============================================

// Chain multiple transformations with type safety
const original = "hello-world" as const;

const camel = camelCase(original);
// Type: "helloWorld"

const pascal = pascalCase(camel);
// Type: "HelloWorld"

const constant = constantCase(pascal);
// Type: "HELLO_WORLD"

const sentence = sentenceCase(constant);
// Type: "Hello world"

// ============================================
// 9. Template Literal Composition
// ============================================

const prefix = "get" as const;
const entity = "user-profile" as const;
const methodName = camelCase(`${prefix}-${entity}`);
// Type: "getUserProfile"

// ============================================
// 10. Type Guards with Literal Types
// ============================================

type KebabString = `${string}-${string}`;

function isKebabCase(str: string): str is KebabString {
  return str.includes("-") && str === str.toLowerCase();
}

function processKebab(str: string) {
  if (isKebabCase(str)) {
    // TypeScript knows str matches kebab pattern
    const camelVersion = camelCase(str);
    // Gets more precise type inference
    return camelVersion;
  }
  return str;
}

// ============================================
// Export for demonstration
// ============================================

export {
  apiEndpoint,
  dbColumn,
  componentName,
  envVar,
  clickHandler,
  cssClass,
  methodName,
};
