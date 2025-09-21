/**
 * Runtime abstraction layer for multi-runtime CLI support
 * Provides unified interface for Node.js, Deno, and Bun
 */

// Detect runtime
export const runtime = typeof globalThis.Deno !== 'undefined' ? 'deno'
                      : typeof globalThis.Bun !== 'undefined' ? 'bun'
                      : 'node';

/**
 * Get command line arguments (excluding runtime and script path)
 */
export const getArgs = () => {
  if (runtime === 'deno') return Deno.args;
  if (runtime === 'bun') return Bun.argv.slice(2);
  return process.argv.slice(2);
};

/**
 * Exit the process with given code
 */
export const exit = (code = 0) => {
  if (runtime === 'deno') {
    Deno.exit(code);
  } else {
    process.exit(code);
  }
};

/**
 * Read from stdin with timeout
 * Returns empty string if no data available
 */
export const readStdin = async () => {
  if (runtime === 'deno') {
    // Deno stdin handling
    try {
      const decoder = new TextDecoder();
      const data = await Promise.race([
        Deno.stdin.readable.getReader().read().then(({ value }) =>
          value ? decoder.decode(value) : ''
        ),
        new Promise(resolve => setTimeout(() => resolve(''), 10))
      ]);
      return data.trim();
    } catch {
      return '';
    }
  } else if (runtime === 'bun') {
    // Bun stdin handling
    return new Promise((resolve) => {
      let data = '';
      let timeout;

      const stdin = Bun.stdin.stream();
      const reader = stdin.getReader();

      const readData = async () => {
        try {
          const result = await Promise.race([
            reader.read(),
            new Promise(resolve => {
              timeout = setTimeout(() => resolve({ done: true }), 10);
            })
          ]);

          if (result.done || !result.value) {
            clearTimeout(timeout);
            resolve(data.trim());
          } else {
            const text = new TextDecoder().decode(result.value);
            data += text;
            await readData();
          }
        } catch {
          clearTimeout(timeout);
          resolve(data.trim());
        }
      };

      readData();
    });
  } else {
    // Node.js stdin handling
    const { stdin } = await import('process');
    return new Promise((resolve) => {
      let data = '';
      let timeout;

      stdin.on('readable', () => {
        clearTimeout(timeout);
        let chunk;
        while ((chunk = stdin.read()) !== null) {
          data += chunk;
        }
      });

      stdin.on('end', () => {
        clearTimeout(timeout);
        resolve(data.trim());
      });

      // Set a short timeout to check if stdin has data
      timeout = setTimeout(() => {
        stdin.pause();
        resolve('');
      }, 10);
    });
  }
};

/**
 * Resolve file paths relative to the script location
 */
export const resolvePath = async (metaUrl, ...paths) => {
  if (runtime === 'deno') {
    const url = new URL(metaUrl);
    const dir = url.pathname.substring(0, url.pathname.lastIndexOf('/'));
    return paths.reduce((acc, p) => {
      if (p === '..') {
        return acc.substring(0, acc.lastIndexOf('/'));
      }
      return `${acc}/${p}`;
    }, dir);
  } else if (runtime === 'bun') {
    // Bun supports Node.js path module
    const { dirname, join } = await import('path');
    const { fileURLToPath } = await import('url');
    const __dirname = dirname(fileURLToPath(metaUrl));
    return join(__dirname, ...paths);
  } else {
    // Node.js
    const { dirname, join } = await import('path');
    const { fileURLToPath } = await import('url');
    const __dirname = dirname(fileURLToPath(metaUrl));
    return join(__dirname, ...paths);
  }
};

/**
 * Dynamic import with runtime-specific handling
 */
export const dynamicImport = async (path) => {
  if (runtime === 'deno') {
    // Deno needs file:// URLs for local imports
    if (!path.startsWith('file://') && !path.startsWith('http')) {
      path = `file://${path}`;
    }
  }
  return import(path);
};

/**
 * Log to console (unified across runtimes)
 */
export const log = console.log;
export const error = console.error;
