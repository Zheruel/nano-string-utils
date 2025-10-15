#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.join(__dirname, '..', 'src', 'index.ts');
const content = fs.readFileSync(indexPath, 'utf-8');

const functions = [];

// Match all export statements
const exportRegex = /export\s+\{\s*([^}]+)\s*\}/g;
let match;

while ((match = exportRegex.exec(content)) !== null) {
  const exports = match[1];
  // Split by comma and extract function names (ignore type exports)
  const items = exports.split(',').map(item => {
    const trimmed = item.trim();
    // Extract the function name, ignoring type exports and aliases
    const functionMatch = trimmed.match(/^([a-zA-Z]+)(?:\s|,|$)/);
    if (functionMatch && !trimmed.includes('type ')) {
      return functionMatch[1];
    }
    return null;
  }).filter(Boolean);

  functions.push(...items);
}

// Functions to exclude from benchmarks (branded type system helpers)
const EXCLUDED_FUNCTIONS = new Set([
  // Type system infrastructure
  'BrandedTypeError',

  // Type assertions (throw on validation failure)
  'assertEmail',
  'assertHexColor',
  'assertSlug',
  'assertUrl',

  // Branded type guards (duplicates of core validators with type narrowing)
  'isValidEmail',    // wraps isEmail
  'isValidHexColor', // wraps isHexColor
  'isValidUrl',      // wraps isUrl
  'isSlug',          // internal helper, not a general utility

  // Branded type builders (validation + type casting)
  'toEmail',
  'toHexColor',
  'toSafeHTML',
  'toSlug',
  'toUrl',

  // Unsafe casts (no validation, just type casting)
  'unsafeEmail',
  'unsafeHexColor',
  'unsafeSafeHTML',
  'unsafeSlug',
  'unsafeUrl',

  // Utility helpers
  'ensureSlug',
]);

// Remove duplicates, filter excluded functions, and sort
const uniqueFunctions = [...new Set(functions)]
  .filter(fn => !EXCLUDED_FUNCTIONS.has(fn))
  .sort();

console.log('Core utility functions (excluding branded type helpers):');
console.log(uniqueFunctions);
console.log('\nTotal count:', uniqueFunctions.length);
console.log('Excluded:', EXCLUDED_FUNCTIONS.size, 'branded type helpers');

// Output as JSON for use in bundle-size.ts
fs.writeFileSync(
  path.join(__dirname, 'all-functions.json'),
  JSON.stringify(uniqueFunctions, null, 2)
);

console.log('\nSaved to benchmarks/all-functions.json');