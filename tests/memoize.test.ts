import { describe, it, expect, vi } from "vitest";
import { memoize } from "../src/memoize";

describe("memoize", () => {
  it("should cache function results", () => {
    let callCount = 0;
    const fn = (n: number) => {
      callCount++;
      return n * 2;
    };

    const memoized = memoize(fn);

    expect(memoized(5)).toBe(10);
    expect(callCount).toBe(1);

    expect(memoized(5)).toBe(10);
    expect(callCount).toBe(1); // Not called again

    expect(memoized(10)).toBe(20);
    expect(callCount).toBe(2);
  });

  it("should handle multiple arguments", () => {
    let callCount = 0;
    const fn = (a: number, b: number) => {
      callCount++;
      return a + b;
    };

    const memoized = memoize(fn);

    expect(memoized(2, 3)).toBe(5);
    expect(callCount).toBe(1);

    expect(memoized(2, 3)).toBe(5);
    expect(callCount).toBe(1); // Cached

    expect(memoized(3, 2)).toBe(5);
    expect(callCount).toBe(2); // Different args order
  });

  it("should handle string arguments", () => {
    let callCount = 0;
    const fn = (str: string) => {
      callCount++;
      return str.toUpperCase();
    };

    const memoized = memoize(fn);

    expect(memoized("hello")).toBe("HELLO");
    expect(callCount).toBe(1);

    expect(memoized("hello")).toBe("HELLO");
    expect(callCount).toBe(1); // Cached

    expect(memoized("world")).toBe("WORLD");
    expect(callCount).toBe(2);
  });

  it("should respect maxSize option", () => {
    let callCount = 0;
    const fn = (n: number) => {
      callCount++;
      return n * 2;
    };

    const memoized = memoize(fn, { maxSize: 2 });

    expect(memoized(1)).toBe(2); // Cache: [1]
    expect(callCount).toBe(1);

    expect(memoized(2)).toBe(4); // Cache: [1, 2]
    expect(callCount).toBe(2);

    expect(memoized(3)).toBe(6); // Cache: [2, 3] (1 evicted)
    expect(callCount).toBe(3);

    expect(memoized(1)).toBe(2); // Should recompute (was evicted)
    expect(callCount).toBe(4);

    expect(memoized(2)).toBe(4); // Should recompute (was evicted when 1 was added)
    expect(callCount).toBe(5);

    expect(memoized(3)).toBe(6); // Should recompute (was evicted when 2 was added)
    expect(callCount).toBe(6);
  });

  it("should use LRU eviction strategy", () => {
    let callCount = 0;
    const fn = (n: number) => {
      callCount++;
      return n * 10;
    };

    const memoized = memoize(fn, { maxSize: 3 });

    expect(memoized(1)).toBe(10); // Cache: [1]
    expect(memoized(2)).toBe(20); // Cache: [1, 2]
    expect(memoized(3)).toBe(30); // Cache: [1, 2, 3]
    expect(callCount).toBe(3);

    expect(memoized(1)).toBe(10); // Cache: [2, 3, 1] (1 moved to end)
    expect(callCount).toBe(3); // Still cached

    expect(memoized(4)).toBe(40); // Cache: [3, 1, 4] (2 evicted as LRU)
    expect(callCount).toBe(4);

    expect(memoized(2)).toBe(20); // Should recompute (was evicted)
    expect(callCount).toBe(5);

    expect(memoized(3)).toBe(30); // Should recompute (was also evicted when 2 was added)
    expect(callCount).toBe(6);
  });

  it("should handle custom getKey function", () => {
    interface User {
      id: number;
      name: string;
      age: number;
    }

    let callCount = 0;
    const fn = (user: User) => {
      callCount++;
      return `${user.name} is ${user.age}`;
    };

    const memoized = memoize(fn, {
      getKey: (user) => user.id.toString(),
    });

    const user1 = { id: 1, name: "Alice", age: 30 };
    const user2 = { id: 1, name: "Alice Updated", age: 31 }; // Same ID
    const user3 = { id: 2, name: "Bob", age: 25 };

    expect(memoized(user1)).toBe("Alice is 30");
    expect(callCount).toBe(1);

    // Same ID, should return cached value despite different properties
    expect(memoized(user2)).toBe("Alice is 30");
    expect(callCount).toBe(1);

    expect(memoized(user3)).toBe("Bob is 25");
    expect(callCount).toBe(2);
  });

  it("should handle no arguments", () => {
    let callCount = 0;
    const fn = () => {
      callCount++;
      return Math.random();
    };

    const memoized = memoize(fn);
    const first = memoized();
    const second = memoized();

    expect(first).toBe(second); // Same cached value
    expect(callCount).toBe(1);
  });

  it("should handle boolean arguments", () => {
    let callCount = 0;
    const fn = (flag: boolean) => {
      callCount++;
      return flag ? "yes" : "no";
    };

    const memoized = memoize(fn);

    expect(memoized(true)).toBe("yes");
    expect(memoized(false)).toBe("no");
    expect(memoized(true)).toBe("yes");
    expect(callCount).toBe(2); // Only computed twice
  });

  it("should handle null and undefined", () => {
    let callCount = 0;
    const fn = (value: any) => {
      callCount++;
      return value === null
        ? "null"
        : value === undefined
        ? "undefined"
        : "other";
    };

    const memoized = memoize(fn);

    expect(memoized(null)).toBe("null");
    expect(callCount).toBe(1);

    expect(memoized(undefined)).toBe("undefined");
    expect(callCount).toBe(2);

    expect(memoized(null)).toBe("null"); // cached
    expect(callCount).toBe(2);

    expect(memoized(undefined)).toBe("undefined"); // cached
    expect(callCount).toBe(2);
  });

  it("should maintain function signature and type safety", () => {
    const fn = (a: number, b: string): string => `${a}-${b}`;
    const memoized = memoize(fn);

    // This should type-check correctly
    const result: string = memoized(1, "test");
    expect(result).toBe("1-test");

    // TypeScript will catch type errors at compile time
    // Runtime JavaScript doesn't enforce types
    const result2 = memoized(2, "demo");
    expect(result2).toBe("2-demo");
  });

  it("should work with real string utilities", () => {
    // Simulate an expensive string operation
    let callCount = 0;
    const expensiveStringOp = (str: string) => {
      callCount++;
      // Simulate expensive work
      return str.split("").sort().join("");
    };

    const memoized = memoize(expensiveStringOp);

    // Test with duplicates
    expect(memoized("hello")).toBe("ehllo");
    expect(callCount).toBe(1);

    expect(memoized("world")).toBe("dlorw");
    expect(callCount).toBe(2);

    expect(memoized("hello")).toBe("ehllo"); // cached
    expect(callCount).toBe(2);

    expect(memoized("test")).toBe("estt");
    expect(callCount).toBe(3);

    expect(memoized("world")).toBe("dlorw"); // cached
    expect(callCount).toBe(3);
  });

  it("should handle objects with circular references gracefully", () => {
    const fn = (obj: any) => obj.value;
    const memoized = memoize(fn);

    const circular: any = { value: 42 };
    circular.self = circular; // Create circular reference

    // Should not throw and should use fallback key generation
    expect(memoized(circular)).toBe(42);
    expect(memoized(circular)).toBe(42); // Cached
  });

  it("should properly isolate different memoized instances", () => {
    let count1 = 0;
    let count2 = 0;

    const fn1 = (n: number) => {
      count1++;
      return n * 2;
    };

    const fn2 = (n: number) => {
      count2++;
      return n * 3;
    };

    const memoized1 = memoize(fn1);
    const memoized2 = memoize(fn2);

    expect(memoized1(5)).toBe(10);
    expect(memoized2(5)).toBe(15);
    expect(memoized1(5)).toBe(10);
    expect(memoized2(5)).toBe(15);

    expect(count1).toBe(1);
    expect(count2).toBe(1);
  });

  it("should handle array arguments correctly", () => {
    let callCount = 0;
    const fn = (arr: number[]) => {
      callCount++;
      return arr.reduce((sum, n) => sum + n, 0);
    };

    const memoized = memoize(fn);

    expect(memoized([1, 2, 3])).toBe(6);
    expect(memoized([1, 2, 3])).toBe(6);
    expect(callCount).toBe(1);

    expect(memoized([3, 2, 1])).toBe(6);
    expect(callCount).toBe(2); // Different array order
  });
});
