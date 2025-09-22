import { describe, it, expect } from "vitest";
import { humanizeList } from "../src/humanizeList";

describe("humanizeList", () => {
  it("handles empty array", () => {
    expect(humanizeList([])).toBe("");
  });

  it("handles single item", () => {
    expect(humanizeList(["apple"])).toBe("apple");
    expect(humanizeList([42])).toBe("42");
    expect(humanizeList([true])).toBe("true");
  });

  it("handles two items", () => {
    expect(humanizeList(["apple", "banana"])).toBe("apple and banana");
    expect(humanizeList([1, 2])).toBe("1 and 2");
  });

  it("handles three items with Oxford comma", () => {
    expect(humanizeList(["apple", "banana", "orange"])).toBe(
      "apple, banana, and orange"
    );
  });

  it("handles multiple items", () => {
    expect(humanizeList(["a", "b", "c", "d", "e"])).toBe("a, b, c, d, and e");
  });

  it("filters out null and undefined", () => {
    expect(humanizeList([null, "apple", undefined, "banana"])).toBe(
      "apple and banana"
    );
    expect(humanizeList([null, undefined])).toBe("");
    expect(humanizeList([null, "single", undefined])).toBe("single");
  });

  it("handles mixed types", () => {
    expect(humanizeList(["text", 123, true, false])).toBe(
      "text, 123, true, and false"
    );
  });

  it("uses custom conjunction", () => {
    expect(humanizeList(["red", "blue"], { conjunction: "or" })).toBe(
      "red or blue"
    );
    expect(humanizeList(["a", "b", "c"], { conjunction: "or" })).toBe(
      "a, b, or c"
    );
    expect(humanizeList(["x", "y", "z"], { conjunction: "nor" })).toBe(
      "x, y, nor z"
    );
  });

  it("handles Oxford comma option", () => {
    expect(humanizeList(["a", "b", "c"], { oxford: true })).toBe("a, b, and c");
    expect(humanizeList(["a", "b", "c"], { oxford: false })).toBe("a, b and c");
    // Oxford comma doesn't apply to 2-item lists
    expect(humanizeList(["a", "b"], { oxford: false })).toBe("a and b");
  });

  it("handles quotes option", () => {
    expect(humanizeList(["red", "blue"], { quotes: true })).toBe(
      '"red" and "blue"'
    );
    expect(humanizeList(["a", "b", "c"], { quotes: true })).toBe(
      '"a", "b", and "c"'
    );
    expect(humanizeList([1, 2, 3], { quotes: true })).toBe('"1", "2", and "3"');
    expect(humanizeList(["single"], { quotes: true })).toBe('"single"');
  });

  it("combines multiple options", () => {
    expect(
      humanizeList(["apples", "oranges", "bananas"], {
        conjunction: "or",
        oxford: false,
        quotes: true,
      })
    ).toBe('"apples", "oranges" or "bananas"');

    expect(
      humanizeList(["yes", "no"], {
        conjunction: "or",
        quotes: true,
      })
    ).toBe('"yes" or "no"');
  });

  it("handles objects by converting to string", () => {
    const items: unknown[] = [{ toString: () => "obj1" }, { x: 1 }, "text"];
    expect(humanizeList(items)).toBe("obj1, [object Object], and text");
  });

  it("handles arrays with only null/undefined", () => {
    expect(humanizeList([null, null, undefined])).toBe("");
  });

  it("handles empty strings", () => {
    expect(humanizeList(["", "a", ""])).toBe(", a, and ");
    expect(humanizeList(["a", "", "b"])).toBe("a, , and b");
  });

  it("handles special characters in conjunction", () => {
    expect(humanizeList(["a", "b"], { conjunction: "&" })).toBe("a & b");
    expect(humanizeList(["x", "y", "z"], { conjunction: "+" })).toBe(
      "x, y, + z"
    );
  });

  it("handles long lists efficiently", () => {
    const items = Array.from({ length: 100 }, (_, i) => `item${i + 1}`);
    const result = humanizeList(items);
    expect(result).toContain("item1, item2,");
    expect(result).toContain(", and item100");
    expect(result.split(",").length).toBe(100); // 99 commas between items + 1 Oxford comma
  });
});
