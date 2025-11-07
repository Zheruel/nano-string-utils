#!/usr/bin/env node

import {
  runtime,
  getArgs,
  exit,
  readStdin as getStdinData,
  resolvePath,
  dynamicImport,
  log,
  error as logError
} from './runtime-utils.js';

// Function registry with metadata
const FUNCTIONS = {
  // Case conversions
  slugify: { desc: 'Convert to URL-safe slug', example: 'slugify "Hello World"' },
  camelCase: { desc: 'Convert to camelCase', example: 'camelCase "hello world"' },
  snakeCase: { desc: 'Convert to snake_case', example: 'snakeCase "hello world"' },
  kebabCase: { desc: 'Convert to kebab-case', example: 'kebabCase "hello world"' },
  pascalCase: { desc: 'Convert to PascalCase', example: 'pascalCase "hello world"' },
  constantCase: { desc: 'Convert to CONSTANT_CASE', example: 'constantCase "hello world"' },
  dotCase: { desc: 'Convert to dot.case', example: 'dotCase "hello world"' },
  pathCase: { desc: 'Convert to path/case', example: 'pathCase "hello world"' },
  sentenceCase: { desc: 'Convert to Sentence case', example: 'sentenceCase "hello WORLD"' },
  titleCase: { desc: 'Convert to Title Case', example: 'titleCase "hello world"', hasOptions: true },

  // String manipulation
  capitalize: { desc: 'Capitalize first letter', example: 'capitalize "hello"' },
  reverse: { desc: 'Reverse string', example: 'reverse "hello"' },
  truncate: { desc: 'Truncate string', example: 'truncate "long text" --length 5', hasOptions: true },
  excerpt: { desc: 'Create excerpt', example: 'excerpt "long text" --length 50', hasOptions: true },
  pad: { desc: 'Pad string', example: 'pad "hi" --length 5', hasOptions: true },
  padStart: { desc: 'Pad start of string', example: 'padStart "hi" --length 5', hasOptions: true },
  padEnd: { desc: 'Pad end of string', example: 'padEnd "hi" --length 5', hasOptions: true },

  // Text processing
  stripHtml: { desc: 'Remove HTML tags', example: 'stripHtml "<p>Hello</p>"' },
  escapeHtml: { desc: 'Escape HTML entities', example: 'escapeHtml "<div>"' },
  deburr: { desc: 'Remove diacritics', example: 'deburr "héllo"' },
  normalizeWhitespace: { desc: 'Normalize whitespace', example: 'normalizeWhitespace "hello   world"', hasOptions: true },
  removeNonPrintable: { desc: 'Remove non-printable chars', example: 'removeNonPrintable "hello\\x00world"', hasOptions: true },
  toASCII: { desc: 'Convert to ASCII', example: 'toASCII "héllo"', hasOptions: true },

  // Validation
  isEmail: { desc: 'Check if valid email', example: 'isEmail "test@example.com"' },
  isUrl: { desc: 'Check if valid URL', example: 'isUrl "https://example.com"' },
  isASCII: { desc: 'Check if ASCII only', example: 'isASCII "hello"' },
  isHexColor: { desc: 'Check if valid hex color', example: 'isHexColor "#ff5733"' },
  isNumeric: { desc: 'Check if numeric string', example: 'isNumeric "42"' },
  isInteger: { desc: 'Check if integer string', example: 'isInteger "42"' },
  isAlphanumeric: { desc: 'Check if alphanumeric', example: 'isAlphanumeric "user123"' },
  isUUID: { desc: 'Check if valid UUID', example: 'isUUID "550e8400-e29b-41d4-a716-446655440000"' },

  // Analysis
  wordCount: { desc: 'Count words', example: 'wordCount "hello world"' },
  levenshtein: { desc: 'Calculate edit distance', example: 'levenshtein "kitten" "sitting"', needsTwo: true },
  levenshteinNormalized: { desc: 'Normalized edit distance', example: 'levenshteinNormalized "kitten" "sitting"', needsTwo: true },
  diff: { desc: 'Show string difference', example: 'diff "hello" "hallo"', needsTwo: true },

  // Generation
  randomString: { desc: 'Generate random string', example: 'randomString --length 10', hasOptions: true },
  hashString: { desc: 'Create hash of string', example: 'hashString "hello"' },

  // Unicode
  graphemes: { desc: 'Split into graphemes', example: 'graphemes "👨‍👩‍👧‍👦"' },
  codePoints: { desc: 'Get Unicode code points', example: 'codePoints "hello"' },

  // Pluralization
  pluralize: { desc: 'Convert to plural', example: 'pluralize "cat"' },
  singularize: { desc: 'Convert to singular', example: 'singularize "cats"' },

  // Complex functions (with required options)
  template: { desc: 'Interpolate template', example: 'template "Hello {{name}}" --data \'{"name":"World"}\'', hasOptions: true },
  templateSafe: { desc: 'Safe template interpolation', example: 'templateSafe "Hello {{name}}" --data \'{"name":"World"}\'', hasOptions: true },
  highlight: { desc: 'Highlight search terms', example: 'highlight "hello world" --query "world"', hasOptions: true },
  fuzzyMatch: { desc: 'Fuzzy string matching', example: 'fuzzyMatch "hello" "helo"', needsTwo: true, hasOptions: true },
};

// Read stdin if available (delegates to runtime-utils)
const readStdin = getStdinData;

// Parse command line options
function parseOptions(args) {
  const options = {};
  const positional = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const nextArg = args[i + 1];

      if (nextArg && !nextArg.startsWith('--')) {
        // Try to parse as JSON first, then as string
        try {
          options[key] = JSON.parse(nextArg);
        } catch {
          options[key] = nextArg;
        }
        i++; // Skip next arg
      } else {
        options[key] = true;
      }
    } else {
      positional.push(arg);
    }
  }

  return { options, positional };
}

// Show help
function showHelp(functionName = null) {
  if (functionName && FUNCTIONS[functionName]) {
    const fn = FUNCTIONS[functionName];
    log(`\nUsage: nano-string ${functionName} ${fn.needsTwo ? '<string1> <string2>' : '<input>'} ${fn.hasOptions ? '[options]' : ''}`);
    log(`\nDescription: ${fn.desc}`);
    log(`\nExample:\n  nano-string ${fn.example}`);

    if (fn.hasOptions) {
      log('\nNote: Options can be passed as --key value pairs');
      log('      Complex data can be passed as JSON: --data \'{"key":"value"}\'');
    }

    log('\nPipe support:\n  echo "text" | nano-string ' + functionName);
    log(`\nRuntime: ${runtime}`);
  } else {
    log('\nUsage: nano-string <function> [input] [options]');
    log('\nAvailable functions:\n');

    const categories = {
      'Case Conversions': ['slugify', 'camelCase', 'snakeCase', 'kebabCase', 'pascalCase', 'constantCase', 'dotCase', 'pathCase', 'sentenceCase', 'titleCase'],
      'String Manipulation': ['capitalize', 'reverse', 'truncate', 'excerpt', 'pad', 'padStart', 'padEnd'],
      'Text Processing': ['stripHtml', 'escapeHtml', 'deburr', 'normalizeWhitespace', 'removeNonPrintable', 'toASCII'],
      'Validation': ['isEmail', 'isUrl', 'isASCII', 'isHexColor', 'isNumeric', 'isInteger', 'isAlphanumeric', 'isUUID'],
      'Analysis': ['wordCount', 'levenshtein', 'levenshteinNormalized', 'diff'],
      'Generation': ['randomString', 'hashString'],
      'Unicode': ['graphemes', 'codePoints'],
      'Pluralization': ['pluralize', 'singularize'],
      'Templates': ['template', 'templateSafe', 'highlight', 'fuzzyMatch']
    };

    for (const [category, funcs] of Object.entries(categories)) {
      log(`  ${category}:`);
      for (const func of funcs) {
        if (FUNCTIONS[func]) {
          log(`    ${func.padEnd(20)} ${FUNCTIONS[func].desc}`);
        }
      }
      log();
    }

    log('Examples:');
    log('  nano-string slugify "Hello World"');
    log('  echo "Hello World" | nano-string kebabCase');
    log('  nano-string truncate "Long text here" --length 10');
    log('  nano-string template "Hello {{name}}" --data \'{"name":"World"}\'');
    log('\nFor help on a specific function:');
    log('  nano-string <function> --help');
    log(`\nRuntime: ${runtime}`);
  }
}

// Main CLI logic
async function main() {
  const args = getArgs();

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    showHelp();
    exit(0);
  }

  const functionName = args[0];

  // Check if function exists
  if (!FUNCTIONS[functionName]) {
    logError(`Error: Unknown function "${functionName}"`);
    logError('Run "nano-string --help" to see available functions');
    exit(1);
  }

  // Handle function-specific help
  if (args.includes('--help') || args.includes('-h')) {
    showHelp(functionName);
    exit(0);
  }

  const { options, positional } = parseOptions(args.slice(1));
  const fnMeta = FUNCTIONS[functionName];

  try {
    // Dynamically import the function
    const modulePath = await resolvePath(import.meta.url, '..', 'dist', 'index.js');
    const nanoStringUtils = await dynamicImport(modulePath);

    const fn = nanoStringUtils[functionName];
    if (!fn) {
      throw new Error(`Function ${functionName} not found in exports`);
    }

    // Get input
    let input = positional[0] || '';
    let secondInput = positional[1] || '';

    // Try to read from stdin if no input provided
    if (!input) {
      const stdinData = await readStdin();
      if (stdinData) {
        input = stdinData;
      }
    }

    // Validate input
    if (!input && functionName !== 'randomString') {
      logError('Error: No input provided');
      logError(`Usage: nano-string ${functionName} <input>`);
      exit(1);
    }

    // Execute function
    let result;

    if (fnMeta.needsTwo) {
      // Functions that need two strings
      if (!secondInput) {
        logError(`Error: ${functionName} requires two string arguments`);
        logError(`Usage: nano-string ${functionName} <string1> <string2>`);
        exit(1);
      }
      result = Object.keys(options).length > 0 ? fn(input, secondInput, options) : fn(input, secondInput);
    } else if (functionName === 'randomString') {
      // Special case for randomString
      const length = options.length || options.size || 10;
      result = options.charset ? fn(length, options.charset) : fn(length);
    } else if (functionName === 'template' || functionName === 'templateSafe') {
      // Template functions need data
      if (!options.data) {
        logError('Error: template functions require --data option');
        logError('Example: nano-string template "Hello {{name}}" --data \'{"name":"World"}\'');
        exit(1);
      }
      result = fn(input, options.data, options);
    } else if (functionName === 'highlight') {
      // Highlight needs query
      if (!options.query && !options.search) {
        logError('Error: highlight requires --query option');
        logError('Example: nano-string highlight "hello world" --query "world"');
        exit(1);
      }
      result = fn(input, options.query || options.search, options);
    } else if (Object.keys(options).length > 0) {
      // Functions with options
      if (functionName === 'truncate') {
        result = fn(input, options.length || 50, options.suffix || options.ellipsis);
      } else if (functionName === 'excerpt') {
        result = fn(input, options.length || 50, options.suffix || options.ellipsis);
      } else if (functionName === 'pad' || functionName === 'padStart' || functionName === 'padEnd') {
        result = fn(input, options.length || 0, options.char || ' ');
      } else {
        result = fn(input, options);
      }
    } else {
      // Simple functions
      result = fn(input);
    }

    // Output result
    if (typeof result === 'boolean') {
      log(result ? 'true' : 'false');
      exit(result ? 0 : 1);
    } else if (typeof result === 'object') {
      log(JSON.stringify(result, null, 2));
    } else {
      log(result);
    }
  } catch (err) {
    logError('Error:', err.message);

    // Provide helpful error messages
    if (err.message.includes('Cannot find module')) {
      logError('\nNote: Make sure to run "npm run build" first to generate the dist folder');
    }

    exit(1);
  }
}

// Run the CLI
main().catch(err => {
  logError('Unexpected error:', err);
  exit(1);
});