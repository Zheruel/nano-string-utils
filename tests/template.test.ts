import { describe, it, expect } from "vitest";
import { template } from "../src/template";

describe("template", () => {
  describe("basic interpolation", () => {
    it("replaces simple variables", () => {
      expect(template("Hello {{name}}!", { name: "World" })).toBe(
        "Hello World!"
      );
    });

    it("replaces multiple variables", () => {
      expect(
        template("{{greeting}} {{name}}!", { greeting: "Hello", name: "World" })
      ).toBe("Hello World!");
    });

    it("handles empty string values", () => {
      expect(template("Value: {{val}}", { val: "" })).toBe("Value: ");
    });

    it("handles numeric values", () => {
      expect(template("Count: {{count}}", { count: 42 })).toBe("Count: 42");
    });

    it("handles boolean values", () => {
      expect(template("Active: {{active}}", { active: true })).toBe(
        "Active: true"
      );
      expect(template("Active: {{active}}", { active: false })).toBe(
        "Active: false"
      );
    });

    it("handles zero", () => {
      expect(template("Value: {{val}}", { val: 0 })).toBe("Value: 0");
    });

    it("handles whitespace around variable names", () => {
      expect(template("Hello {{ name }}!", { name: "World" })).toBe(
        "Hello World!"
      );
      expect(template("Hello {{  name  }}!", { name: "World" })).toBe(
        "Hello World!"
      );
    });
  });

  describe("nested properties", () => {
    it("accesses nested object properties", () => {
      expect(
        template("{{user.name}} is {{user.age}} years old", {
          user: { name: "Alice", age: 30 },
        })
      ).toBe("Alice is 30 years old");
    });

    it("handles deeply nested properties", () => {
      expect(
        template("City: {{user.address.city}}", {
          user: { address: { city: "New York" } },
        })
      ).toBe("City: New York");
    });

    it("accesses array elements by index", () => {
      expect(
        template("First: {{items.0}}, Second: {{items.1}}", {
          items: ["apple", "banana"],
        })
      ).toBe("First: apple, Second: banana");
    });

    it("handles nested arrays", () => {
      expect(
        template("Value: {{data.0.name}}", {
          data: [{ name: "Item1" }],
        })
      ).toBe("Value: Item1");
    });
  });

  describe("missing values", () => {
    it("replaces missing values with empty string by default", () => {
      expect(template("Hello {{name}}!", {})).toBe("Hello !");
    });

    it("handles undefined nested properties", () => {
      expect(template("Value: {{user.name}}", { user: {} })).toBe("Value: ");
    });

    it("handles null values", () => {
      expect(template("Value: {{val}}", { val: null })).toBe("Value: ");
    });

    it("handles undefined values", () => {
      expect(template("Value: {{val}}", { val: undefined })).toBe("Value: ");
    });
  });

  describe("custom options", () => {
    describe("custom delimiters", () => {
      it("uses custom delimiters", () => {
        expect(
          template(
            "Hello ${name}!",
            { name: "World" },
            {
              delimiters: ["${", "}"],
            }
          )
        ).toBe("Hello World!");
      });

      it("handles bracket delimiters", () => {
        expect(
          template(
            "Hello [name]!",
            { name: "World" },
            {
              delimiters: ["[", "]"],
            }
          )
        ).toBe("Hello World!");
      });

      it("handles multi-character delimiters", () => {
        expect(
          template(
            "Hello <%=name%>!",
            { name: "World" },
            {
              delimiters: ["<%=", "%>"],
            }
          )
        ).toBe("Hello World!");
      });

      it("handles regex special characters in delimiters", () => {
        expect(
          template(
            "Hello ${{name}}!",
            { name: "World" },
            {
              delimiters: ["${{", "}}"],
            }
          )
        ).toBe("Hello World!");
      });
    });

    describe("fallback option", () => {
      it("uses custom fallback for missing values", () => {
        expect(template("Hello {{name}}!", {}, { fallback: "Guest" })).toBe(
          "Hello Guest!"
        );
      });

      it("uses null fallback", () => {
        expect(template("Hello {{name}}!", {}, { fallback: null })).toBe(
          "Hello !"
        );
      });

      it("uses fallback for undefined nested properties", () => {
        expect(
          template("User: {{user.name}}", { user: {} }, { fallback: "Unknown" })
        ).toBe("User: Unknown");
      });
    });

    describe("keepUnmatched option", () => {
      it("keeps unmatched placeholders", () => {
        expect(template("Hello {{name}}!", {}, { keepUnmatched: true })).toBe(
          "Hello {{name}}!"
        );
      });

      it("keeps some unmatched placeholders while replacing others", () => {
        expect(
          template(
            "{{greeting}} {{name}}!",
            { greeting: "Hello" },
            { keepUnmatched: true }
          )
        ).toBe("Hello {{name}}!");
      });

      it("keeps unmatched nested properties", () => {
        expect(
          template("User: {{user.name}}", { user: {} }, { keepUnmatched: true })
        ).toBe("User: {{user.name}}");
      });
    });
  });

  describe("edge cases", () => {
    it("handles empty template string", () => {
      expect(template("", { name: "World" })).toBe("");
    });

    it("handles template with no placeholders", () => {
      expect(template("Hello World!", { name: "Test" })).toBe("Hello World!");
    });

    it("handles empty data object", () => {
      expect(template("Plain text", {})).toBe("Plain text");
    });

    it("handles consecutive placeholders", () => {
      expect(template("{{a}}{{b}}{{c}}", { a: "1", b: "2", c: "3" })).toBe(
        "123"
      );
    });

    it("handles placeholders with special characters in names", () => {
      expect(template("Value: {{data-id}}", { "data-id": "123" })).toBe(
        "Value: 123"
      );
    });

    it("handles object toString representations", () => {
      const obj = { toString: () => "custom string" };
      expect(template("Value: {{val}}", { val: obj })).toBe(
        "Value: custom string"
      );
    });

    it("handles arrays as values", () => {
      expect(template("Items: {{items}}", { items: ["a", "b", "c"] })).toBe(
        "Items: a,b,c"
      );
    });

    it("handles plain objects as values", () => {
      expect(template("Object: {{obj}}", { obj: { key: "value" } })).toBe(
        "Object: [object Object]"
      );
    });

    it("handles functions as values", () => {
      const fn = () => "result";
      const result = template("Value: {{fn}}", { fn });
      expect(result).toMatch(/Value: (\(\)|function)/);
    });

    it("handles same placeholder multiple times", () => {
      expect(
        template("{{name}} says hello to {{name}}", { name: "Alice" })
      ).toBe("Alice says hello to Alice");
    });

    it("handles properties that look like array indices", () => {
      expect(template("Value: {{0}}", { "0": "zero" })).toBe("Value: zero");
    });
  });

  describe("performance", () => {
    it("handles large templates efficiently", () => {
      const data: Record<string, string> = {};
      let template_str = "";
      for (let i = 0; i < 100; i++) {
        data[`var${i}`] = `value${i}`;
        template_str += `{{var${i}}} `;
      }

      const result = template(template_str, data);
      expect(result).toContain("value0");
      expect(result).toContain("value99");
    });

    it("handles deeply nested paths", () => {
      const deepObj: any = { a: { b: { c: { d: { e: { f: "deep" } } } } } };
      expect(template("Value: {{a.b.c.d.e.f}}", deepObj)).toBe("Value: deep");
    });
  });
});
