import { describe, it, expect } from "vitest";
import { diff } from "../src/diff";

describe("diff", () => {
  describe("basic operations", () => {
    it("returns unchanged string when both are identical", () => {
      expect(diff("abc", "abc")).toBe("abc");
      expect(diff("hello world", "hello world")).toBe("hello world");
    });

    it("handles substitution", () => {
      expect(diff("abc", "aXc")).toBe("a[-b-]{+X+}c");
      expect(diff("test", "best")).toBe("[-t-]{+b+}est");
    });

    it("handles addition at end", () => {
      expect(diff("abc", "abcd")).toBe("abc{+d+}");
      expect(diff("hello", "hello world")).toBe("hello{+ world+}");
    });

    it("handles deletion at end", () => {
      expect(diff("abcd", "abc")).toBe("abc[-d-]");
      expect(diff("hello world", "hello")).toBe("hello[- world-]");
    });

    it("handles addition at beginning", () => {
      expect(diff("world", "hello world")).toBe("{+hello +}world");
      expect(diff("bc", "abc")).toBe("{+a+}bc");
    });

    it("handles deletion at beginning", () => {
      expect(diff("hello world", "world")).toBe("[-hello -]world");
      expect(diff("abc", "bc")).toBe("[-a-]bc");
    });

    it("handles addition in middle", () => {
      expect(diff("hello world", "hello beautiful world")).toBe(
        "hello {+beautiful +}world"
      );
      expect(diff("ac", "abc")).toBe("a{+b+}c");
    });

    it("handles deletion in middle", () => {
      expect(diff("hello beautiful world", "hello world")).toBe(
        "hello [-beautiful -]world"
      );
      expect(diff("abc", "ac")).toBe("a[-b-]c");
    });
  });

  describe("real-world scenarios", () => {
    it("handles email changes", () => {
      expect(diff("user@example.com", "admin@example.com")).toBe(
        "[-user-]{+admin+}@example.com"
      );
    });

    it("handles version bumps", () => {
      expect(diff("v1.0.0", "v1.1.0")).toBe("v1.[-0-]{+1+}.0");
      expect(diff("2.4.8", "3.0.0")).toBe("[-2.4.8-]{+3.0.0+}");
    });

    it("handles case changes", () => {
      expect(diff("hello world", "Hello World")).toBe(
        "[-hello w-]{+Hello W+}orld"
      );
    });

    it("handles whitespace normalization", () => {
      expect(diff("test  space", "test space")).toBe("test [- -]space");
      expect(diff("line1\nline2", "line1 line2")).toBe("line1[-\n-]{+ +}line2");
    });

    it("handles path changes", () => {
      // The algorithm finds 's.js' as common suffix
      expect(diff("/src/utils.js", "/src/helpers.js")).toBe(
        "/src/[-util-]{+helper+}s.js"
      );
    });

    it("handles URL parameter changes", () => {
      // The algorithm finds 'sc' as common suffix
      expect(diff("?page=1&sort=asc", "?page=2&sort=desc")).toBe(
        "?page=[-1&sort=a-]{+2&sort=de+}sc"
      );
    });

    it("handles configuration changes", () => {
      expect(diff("debug: false", "debug: true")).toBe(
        "debug: [-fals-]{+tru+}e"
      );
      expect(diff("port: 3000", "port: 8080")).toBe("port: [-300-]{+808+}0");
    });

    it("handles JSON property changes", () => {
      expect(diff('"name": "John"', '"name": "Jane"')).toBe(
        '"name": "J[-ohn-]{+ane+}"'
      );
    });
  });

  describe("edge cases", () => {
    it("handles both empty strings", () => {
      expect(diff("", "")).toBe("");
    });

    it("handles complete deletion", () => {
      expect(diff("abc", "")).toBe("[-abc-]");
      expect(diff("hello world", "")).toBe("[-hello world-]");
    });

    it("handles complete addition", () => {
      expect(diff("", "abc")).toBe("{+abc+}");
      expect(diff("", "hello world")).toBe("{+hello world+}");
    });

    it("handles complete replacement", () => {
      expect(diff("abc", "xyz")).toBe("[-abc-]{+xyz+}");
      expect(diff("hello", "world")).toBe("[-hello-]{+world+}");
    });

    it("handles single character strings", () => {
      expect(diff("a", "b")).toBe("[-a-]{+b+}");
      expect(diff("x", "x")).toBe("x");
    });
  });

  describe("unicode handling", () => {
    it("handles emoji correctly", () => {
      expect(diff("😀 hello", "😀 hi")).toBe("😀 h[-ello-]{+i+}");
      expect(diff("👍", "👎")).toBe("[-👍-]{+👎+}");
    });

    it("handles multi-byte characters", () => {
      expect(diff("café", "cafe")).toBe("caf[-é-]{+e+}");
      expect(diff("你好", "您好")).toBe("[-你-]{+您+}好");
    });

    it("handles combining characters", () => {
      expect(diff("e\u0301", "é")).toBe("[-e\u0301-]{+é+}");
    });

    it("handles zero-width characters", () => {
      const zwj = "\u200d";
      expect(diff(`test${zwj}`, "test")).toBe(`test[-${zwj}-]`);
    });
  });

  describe("practical use cases", () => {
    it("shows form field changes", () => {
      expect(diff("John Doe", "Jane Doe")).toBe("J[-ohn-]{+ane+} Doe");
    });

    it("shows file extension changes", () => {
      expect(diff("app.js", "app.ts")).toBe("app.[-j-]{+t+}s");
      expect(diff("style.css", "style.scss")).toBe("style.{+s+}css");
    });

    it("shows timestamp changes", () => {
      expect(diff("2024-01-01", "2024-01-02")).toBe("2024-01-0[-1-]{+2+}");
      expect(diff("10:30", "10:45")).toBe("10:[-30-]{+45+}");
    });

    it("shows simple text edits", () => {
      expect(diff("The quick brown fox", "The quick red fox")).toBe(
        "The quick [-brown-]{+red+} fox"
      );
      expect(diff("Hello world!", "Hello World!")).toBe(
        "Hello [-w-]{+W+}orld!"
      );
    });
  });

  describe("performance", () => {
    it("handles long identical strings efficiently", () => {
      const long = "a".repeat(1000);
      expect(diff(long, long)).toBe(long);
    });

    it("handles long strings with small changes", () => {
      const base = "prefix" + "a".repeat(100) + "suffix";
      const modified =
        "prefix" + "a".repeat(50) + "b" + "a".repeat(50) + "suffix";
      const result = diff(base, modified);
      // The algorithm finds large prefix and suffix of 'a's
      expect(result).toContain("{+b+}");
      expect(result).toContain("prefix");
      expect(result).toContain("suffix");
    });
  });
});
