/**
 * Type-level tests for template literal case conversions
 * These tests verify compile-time type transformations
 */

import { expectType } from "../test-utils.js";
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
} from "../../src/index.js";

// CamelCase tests
{
  // Literal string returns literal type
  const result1 = camelCase("hello-world");
  expectType<"helloWorld">(result1);

  const result2 = camelCase("hello_world");
  expectType<"helloWorld">(result2);

  const result3 = camelCase("hello world");
  expectType<"helloWorld">(result3);

  const result4 = camelCase("HelloWorld");
  expectType<"helloWorld">(result4);

  // Runtime string returns string
  const runtimeStr: string = "hello-world";
  const result5 = camelCase(runtimeStr);
  expectType<string>(result5);

  // Empty string
  const result6 = camelCase("");
  expectType<"">(result6);
}

// KebabCase tests
{
  const result1 = kebabCase("helloWorld");
  expectType<"hello-world">(result1);

  const result2 = kebabCase("HelloWorld");
  expectType<"hello-world">(result2);

  const result3 = kebabCase("hello_world");
  expectType<"hello-world">(result3);

  const result4 = kebabCase("hello world");
  expectType<"hello-world">(result4);

  const result5 = kebabCase("HELLO_WORLD");
  expectType<"hello-world">(result5);

  // Runtime string
  const runtimeStr: string = "helloWorld";
  const result6 = kebabCase(runtimeStr);
  expectType<string>(result6);
}

// SnakeCase tests
{
  const result1 = snakeCase("helloWorld");
  expectType<"hello_world">(result1);

  const result2 = snakeCase("HelloWorld");
  expectType<"hello_world">(result2);

  const result3 = snakeCase("hello-world");
  expectType<"hello_world">(result3);

  const result4 = snakeCase("hello world");
  expectType<"hello_world">(result4);

  // Runtime string
  const runtimeStr: string = "helloWorld";
  const result5 = snakeCase(runtimeStr);
  expectType<string>(result5);
}

// PascalCase tests
{
  const result1 = pascalCase("hello-world");
  expectType<"HelloWorld">(result1);

  const result2 = pascalCase("hello_world");
  expectType<"HelloWorld">(result2);

  const result3 = pascalCase("hello world");
  expectType<"HelloWorld">(result3);

  const result4 = pascalCase("helloWorld");
  expectType<"HelloWorld">(result4);

  // Runtime string
  const runtimeStr: string = "hello-world";
  const result5 = pascalCase(runtimeStr);
  expectType<string>(result5);
}

// ConstantCase tests
{
  const result1 = constantCase("helloWorld");
  expectType<"HELLO_WORLD">(result1);

  const result2 = constantCase("hello-world");
  expectType<"HELLO_WORLD">(result2);

  const result3 = constantCase("hello world");
  expectType<"HELLO_WORLD">(result3);

  const result4 = constantCase("HelloWorld");
  expectType<"HELLO_WORLD">(result4);

  // Runtime string
  const runtimeStr: string = "helloWorld";
  const result5 = constantCase(runtimeStr);
  expectType<string>(result5);
}

// DotCase tests
{
  const result1 = dotCase("helloWorld");
  expectType<"hello.world">(result1);

  const result2 = dotCase("hello-world");
  expectType<"hello.world">(result2);

  const result3 = dotCase("hello_world");
  expectType<"hello.world">(result3);

  const result4 = dotCase("HelloWorld");
  expectType<"hello.world">(result4);

  // Runtime string
  const runtimeStr: string = "helloWorld";
  const result5 = dotCase(runtimeStr);
  expectType<string>(result5);
}

// PathCase tests
{
  const result1 = pathCase("helloWorld");
  expectType<"hello/world">(result1);

  const result2 = pathCase("hello-world");
  expectType<"hello/world">(result2);

  const result3 = pathCase("hello_world");
  expectType<"hello/world">(result3);

  const result4 = pathCase("HelloWorld");
  expectType<"hello/world">(result4);

  // Runtime string
  const runtimeStr: string = "helloWorld";
  const result5 = pathCase(runtimeStr);
  expectType<string>(result5);
}

// SentenceCase tests
{
  const result1 = sentenceCase("hello-world");
  expectType<"Hello world">(result1);

  const result2 = sentenceCase("helloWorld");
  expectType<"Hello world">(result2);

  const result3 = sentenceCase("hello_world");
  expectType<"Hello world">(result3);

  const result4 = sentenceCase("HELLO WORLD");
  expectType<"Hello world">(result4);

  // Runtime string
  const runtimeStr: string = "hello-world";
  const result5 = sentenceCase(runtimeStr);
  expectType<string>(result5);
}

// TitleCase tests
{
  const result1 = titleCase("hello-world");
  expectType<"Hello World">(result1);

  const result2 = titleCase("helloWorld");
  expectType<"Hello World">(result2);

  const result3 = titleCase("hello_world");
  expectType<"Hello World">(result3);

  const result4 = titleCase("hello world");
  expectType<"Hello World">(result4);

  // With options
  const result5 = titleCase("hello-world", { exceptions: ["hello"] });
  expectType<"Hello World">(result5);

  // Runtime string
  const runtimeStr: string = "hello-world";
  const result6 = titleCase(runtimeStr);
  expectType<string>(result6);
}

// Complex transformations
{
  // Chain of transformations
  const kebab = "hello-world" as const;
  const camel = camelCase(kebab);
  expectType<"helloWorld">(camel);

  const pascal = pascalCase(camel);
  expectType<"HelloWorld">(pascal);

  const snake = snakeCase(pascal);
  expectType<"hello_world">(snake);

  const constant = constantCase(snake);
  expectType<"HELLO_WORLD">(constant);

  const dot = dotCase(constant);
  expectType<"hello.world">(dot);

  const path = pathCase(dot);
  expectType<"hello/world">(path);

  const sentence = sentenceCase(path);
  expectType<"Hello world">(sentence);

  const title = titleCase(sentence);
  expectType<"Hello World">(title);
}

// Edge cases
{
  // Single word
  const result1 = camelCase("hello");
  expectType<"hello">(result1);

  const result2 = pascalCase("hello");
  expectType<"Hello">(result2);

  // Numbers
  const result3 = kebabCase("hello123world");
  expectType<"hello-123-world">(result3);

  // Special characters
  const result4 = snakeCase("hello@world");
  expectType<"hello_world">(result4);

  // Multiple separators
  const result5 = camelCase("hello--world__test");
  expectType<"helloWorldTest">(result5);
}

// Verify backward compatibility with non-literal strings
{
  function processString(input: string): string {
    // All these should return string type for runtime values
    const camelResult = camelCase(input);
    const kebabResult = kebabCase(input);
    const snakeResult = snakeCase(input);
    const pascalResult = pascalCase(input);
    const constantResult = constantCase(input);
    const dotResult = dotCase(input);
    const pathResult = pathCase(input);
    const sentenceResult = sentenceCase(input);
    const titleResult = titleCase(input);

    expectType<string>(camelResult);
    expectType<string>(kebabResult);
    expectType<string>(snakeResult);
    expectType<string>(pascalResult);
    expectType<string>(constantResult);
    expectType<string>(dotResult);
    expectType<string>(pathResult);
    expectType<string>(sentenceResult);
    expectType<string>(titleResult);

    return camelResult;
  }
}

// Test with template literals
{
  const prefix = "hello" as const;
  const suffix = "world" as const;
  const combined = `${prefix}-${suffix}` as const;

  const result = camelCase(combined);
  expectType<"helloWorld">(result);
}

// Ensure type errors for invalid inputs
{
  // @ts-expect-error - number is not assignable to string
  camelCase(123);

  // @ts-expect-error - null is not assignable to string
  kebabCase(null);

  // @ts-expect-error - undefined is not assignable to string
  snakeCase(undefined);
}
