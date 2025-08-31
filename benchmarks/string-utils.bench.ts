import { describe, bench } from 'vitest';
import { Bench } from 'tinybench';
import { 
  slugify, 
  camelCase, 
  snakeCase,
  kebabCase,
  pascalCase,
  capitalize,
  truncate, 
  escapeHtml,
  stripHtml,
  randomString,
  hashString,
  reverse,
  isEmail,
  isUrl,
  wordCount
} from '../src/index.js';

describe('String Transformation Benchmarks', () => {
  bench('slugify - simple string', () => {
    slugify('Hello World');
  });

  bench('slugify - complex string with special chars', () => {
    slugify('Hello World! @#$%^&*() This is a Test-String_123');
  });

  bench('camelCase - simple', () => {
    camelCase('hello world');
  });

  bench('camelCase - kebab-case input', () => {
    camelCase('hello-world-test-string');
  });

  bench('snakeCase - simple', () => {
    snakeCase('hello world');
  });

  bench('snakeCase - camelCase input', () => {
    snakeCase('helloWorldTestString');
  });

  bench('kebabCase - simple', () => {
    kebabCase('hello world');
  });

  bench('pascalCase - simple', () => {
    pascalCase('hello world test');
  });

  bench('capitalize - simple', () => {
    capitalize('hello world');
  });

  bench('reverse - short string', () => {
    reverse('hello');
  });

  bench('reverse - long string', () => {
    reverse('The quick brown fox jumps over the lazy dog');
  });
});

describe('String Manipulation Benchmarks', () => {
  bench('truncate - short string', () => {
    truncate('Hello World', 5);
  });

  bench('truncate - long string', () => {
    truncate('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 50);
  });

  bench('escapeHtml - simple', () => {
    escapeHtml('<div>Hello & "world"</div>');
  });

  bench('escapeHtml - complex HTML', () => {
    escapeHtml('<script>alert("XSS")</script><div class="test" data-value=\'test\'>&lt;Hello&gt;</div>');
  });

  bench('stripHtml - simple', () => {
    stripHtml('<p>Hello World</p>');
  });

  bench('stripHtml - complex HTML', () => {
    stripHtml('<div class="container"><h1>Title</h1><p>Paragraph with <strong>bold</strong> and <em>italic</em></p></div>');
  });

  bench('wordCount - short text', () => {
    wordCount('Hello world test');
  });

  bench('wordCount - long text', () => {
    wordCount('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.');
  });
});

describe('String Generation Benchmarks', () => {
  bench('randomString - length 10', () => {
    randomString(10);
  });

  bench('randomString - length 50', () => {
    randomString(50);
  });

  bench('randomString - custom charset', () => {
    randomString(20, '0123456789ABCDEF');
  });

  bench('hashString - short', () => {
    hashString('hello');
  });

  bench('hashString - long', () => {
    hashString('The quick brown fox jumps over the lazy dog. This is a longer string to hash.');
  });
});

describe('String Validation Benchmarks', () => {
  bench('isEmail - valid email', () => {
    isEmail('user@example.com');
  });

  bench('isEmail - invalid email', () => {
    isEmail('not.an.email');
  });

  bench('isUrl - valid URL', () => {
    isUrl('https://example.com/path?query=value');
  });

  bench('isUrl - invalid URL', () => {
    isUrl('not a url');
  });
});

// Standalone benchmark suite for detailed performance analysis
export async function runDetailedBenchmarks() {
  const bench = new Bench({ time: 100 });

  bench
    .add('slugify', () => {
      slugify('Hello World! This is a Test String-123_456');
    })
    .add('camelCase', () => {
      camelCase('hello-world-test-string');
    })
    .add('snakeCase', () => {
      snakeCase('helloWorldTestString');
    })
    .add('truncate', () => {
      truncate('Lorem ipsum dolor sit amet, consectetur adipiscing elit', 30);
    })
    .add('escapeHtml', () => {
      escapeHtml('<div>Hello & "world" <script>alert("test")</script></div>');
    })
    .add('randomString', () => {
      randomString(20);
    });

  await bench.warmup();
  await bench.run();

  console.table(bench.table());
  
  return bench;
}