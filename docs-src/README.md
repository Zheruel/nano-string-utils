# Documentation Site

This directory contains the documentation site for nano-string-utils. The site is built with Vite and can be used to preview documentation locally or serve as a landing page alongside the TypeDoc-generated API documentation.

## Structure

- `/src` - Source files for the documentation site
- `/index.html` - Main entry point
- TypeDoc API docs are generated to the `/docs` folder in the root directory

## Commands

```bash
# Development server
npm run docs:dev

# Build documentation site
npm run docs:build

# Preview built site
npm run docs:preview

# Generate TypeDoc API documentation
npm run docs
```

## API Documentation Generation

The API documentation is automatically generated from JSDoc comments in the source code using TypeDoc. When adding new functions or updating existing ones:

1. Ensure all functions have complete JSDoc comments with:

   - Description
   - `@param` tags for all parameters
   - `@returns` tag for return value
   - `@example` blocks showing usage

2. Run `npm run docs` to regenerate the API documentation

The TypeDoc output is configured to generate to `/docs` which is deployed to GitHub Pages automatically when changes are pushed to the main branch.
