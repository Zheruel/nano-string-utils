import { describe, it, expect } from "vitest";
import { removeNonPrintable } from "../src/removeNonPrintable";

describe("removeNonPrintable", () => {
  describe("ASCII control characters", () => {
    it("should remove NULL character", () => {
      expect(removeNonPrintable("hello\x00world")).toBe("helloworld");
      expect(removeNonPrintable("\x00start")).toBe("start");
      expect(removeNonPrintable("end\x00")).toBe("end");
    });

    it("should remove various ASCII control characters", () => {
      expect(removeNonPrintable("hello\x01world")).toBe("helloworld"); // SOH
      expect(removeNonPrintable("hello\x02world")).toBe("helloworld"); // STX
      expect(removeNonPrintable("hello\x03world")).toBe("helloworld"); // ETX
      expect(removeNonPrintable("hello\x04world")).toBe("helloworld"); // EOT
      expect(removeNonPrintable("hello\x05world")).toBe("helloworld"); // ENQ
      expect(removeNonPrintable("hello\x06world")).toBe("helloworld"); // ACK
      expect(removeNonPrintable("hello\x07world")).toBe("helloworld"); // BEL
      expect(removeNonPrintable("hello\x08world")).toBe("helloworld"); // BS
      expect(removeNonPrintable("hello\x0Bworld")).toBe("helloworld"); // VT
      expect(removeNonPrintable("hello\x0Cworld")).toBe("helloworld"); // FF
      expect(removeNonPrintable("hello\x0Eworld")).toBe("helloworld"); // SO
      expect(removeNonPrintable("hello\x0Fworld")).toBe("helloworld"); // SI
    });

    it("should remove control characters in 0x10-0x1F range", () => {
      expect(removeNonPrintable("hello\x10world")).toBe("helloworld"); // DLE
      expect(removeNonPrintable("hello\x11world")).toBe("helloworld"); // DC1
      expect(removeNonPrintable("hello\x12world")).toBe("helloworld"); // DC2
      expect(removeNonPrintable("hello\x13world")).toBe("helloworld"); // DC3
      expect(removeNonPrintable("hello\x14world")).toBe("helloworld"); // DC4
      expect(removeNonPrintable("hello\x15world")).toBe("helloworld"); // NAK
      expect(removeNonPrintable("hello\x16world")).toBe("helloworld"); // SYN
      expect(removeNonPrintable("hello\x17world")).toBe("helloworld"); // ETB
      expect(removeNonPrintable("hello\x18world")).toBe("helloworld"); // CAN
      expect(removeNonPrintable("hello\x19world")).toBe("helloworld"); // EM
      expect(removeNonPrintable("hello\x1Aworld")).toBe("helloworld"); // SUB
      expect(removeNonPrintable("hello\x1Bworld")).toBe("helloworld"); // ESC
      expect(removeNonPrintable("hello\x1Cworld")).toBe("helloworld"); // FS
      expect(removeNonPrintable("hello\x1Dworld")).toBe("helloworld"); // GS
      expect(removeNonPrintable("hello\x1Eworld")).toBe("helloworld"); // RS
      expect(removeNonPrintable("hello\x1Fworld")).toBe("helloworld"); // US
    });

    it("should remove DEL character", () => {
      expect(removeNonPrintable("hello\x7Fworld")).toBe("helloworld");
    });

    it("should remove tab by default", () => {
      expect(removeNonPrintable("hello\tworld")).toBe("helloworld");
      expect(removeNonPrintable("\t\tindented")).toBe("indented");
    });

    it("should remove newline by default", () => {
      expect(removeNonPrintable("hello\nworld")).toBe("helloworld");
      expect(removeNonPrintable("line1\nline2\nline3")).toBe("line1line2line3");
    });

    it("should remove carriage return by default", () => {
      expect(removeNonPrintable("hello\rworld")).toBe("helloworld");
      expect(removeNonPrintable("hello\r\nworld")).toBe("helloworld");
    });

    it("should handle multiple control characters", () => {
      expect(removeNonPrintable("\x00hello\x01world\x7F")).toBe("helloworld");
      expect(removeNonPrintable("\t\n\rhello\x00world\x1B")).toBe("helloworld");
    });
  });

  describe("Unicode control characters", () => {
    it("should remove C1 control codes (U+0080-U+009F)", () => {
      expect(removeNonPrintable("hello\u0080world")).toBe("helloworld");
      expect(removeNonPrintable("hello\u0085world")).toBe("helloworld"); // NEL
      expect(removeNonPrintable("hello\u0090world")).toBe("helloworld");
      expect(removeNonPrintable("hello\u009Fworld")).toBe("helloworld");
    });

    it("should remove zero-width spaces but preserve zero-width joiner", () => {
      expect(removeNonPrintable("hello\u200Bworld")).toBe("helloworld"); // Zero-width space
      expect(removeNonPrintable("hello\u200Cworld")).toBe("helloworld"); // Zero-width non-joiner
      expect(removeNonPrintable("hello\u200Dworld")).toBe("hello\u200Dworld"); // Zero-width joiner (preserved for emoji)
      expect(removeNonPrintable("hello\uFEFFworld")).toBe("helloworld"); // Zero-width no-break space
    });

    it("should remove directional marks", () => {
      expect(removeNonPrintable("hello\u200Eworld")).toBe("helloworld"); // Left-to-right mark
      expect(removeNonPrintable("hello\u200Fworld")).toBe("helloworld"); // Right-to-left mark
      expect(removeNonPrintable("hello\u202Aworld")).toBe("helloworld"); // Left-to-right embedding
      expect(removeNonPrintable("hello\u202Bworld")).toBe("helloworld"); // Right-to-left embedding
      expect(removeNonPrintable("hello\u202Cworld")).toBe("helloworld"); // Pop directional formatting
      expect(removeNonPrintable("hello\u202Dworld")).toBe("helloworld"); // Left-to-right override
      expect(removeNonPrintable("hello\u202Eworld")).toBe("helloworld"); // Right-to-left override
    });

    it("should remove word joiners and invisible characters", () => {
      expect(removeNonPrintable("hello\u2060world")).toBe("helloworld"); // Word joiner
      expect(removeNonPrintable("hello\u2061world")).toBe("helloworld"); // Function application
      expect(removeNonPrintable("hello\u2062world")).toBe("helloworld"); // Invisible times
      expect(removeNonPrintable("hello\u2063world")).toBe("helloworld"); // Invisible separator
      expect(removeNonPrintable("hello\u2064world")).toBe("helloworld"); // Invisible plus
      expect(removeNonPrintable("hello\u206Fworld")).toBe("helloworld"); // Nominal digit shapes
    });

    it("should remove soft hyphen", () => {
      expect(removeNonPrintable("hello\u00ADworld")).toBe("helloworld");
      expect(removeNonPrintable("com\u00ADpound")).toBe("compound");
    });

    it("should remove special characters in FFF0-FFFF range", () => {
      expect(removeNonPrintable("hello\uFFF0world")).toBe("helloworld");
      expect(removeNonPrintable("hello\uFFFEworld")).toBe("helloworld");
      expect(removeNonPrintable("hello\uFFFFworld")).toBe("helloworld");
    });
  });

  describe("keepNewlines option", () => {
    it("should preserve newlines when keepNewlines is true", () => {
      expect(removeNonPrintable("hello\nworld", { keepNewlines: true })).toBe(
        "hello\nworld"
      );
      expect(
        removeNonPrintable("line1\nline2\nline3", { keepNewlines: true })
      ).toBe("line1\nline2\nline3");
    });

    it("should still remove other control characters with keepNewlines", () => {
      expect(
        removeNonPrintable("hello\n\x00world", { keepNewlines: true })
      ).toBe("hello\nworld");
      expect(
        removeNonPrintable("\x01hello\nworld\x7F", { keepNewlines: true })
      ).toBe("hello\nworld");
    });
  });

  describe("keepTabs option", () => {
    it("should preserve tabs when keepTabs is true", () => {
      expect(removeNonPrintable("hello\tworld", { keepTabs: true })).toBe(
        "hello\tworld"
      );
      expect(removeNonPrintable("\tindented\ttext", { keepTabs: true })).toBe(
        "\tindented\ttext"
      );
    });

    it("should still remove other control characters with keepTabs", () => {
      expect(removeNonPrintable("hello\t\x00world", { keepTabs: true })).toBe(
        "hello\tworld"
      );
      expect(
        removeNonPrintable("\x01hello\tworld\x7F", { keepTabs: true })
      ).toBe("hello\tworld");
    });
  });

  describe("keepCarriageReturns option", () => {
    it("should preserve carriage returns when keepCarriageReturns is true", () => {
      expect(
        removeNonPrintable("hello\rworld", { keepCarriageReturns: true })
      ).toBe("hello\rworld");
      expect(
        removeNonPrintable("hello\r\nworld", { keepCarriageReturns: true })
      ).toBe("hello\rworld");
    });

    it("should still remove other control characters with keepCarriageReturns", () => {
      expect(
        removeNonPrintable("hello\r\x00world", { keepCarriageReturns: true })
      ).toBe("hello\rworld");
      expect(
        removeNonPrintable("\x01hello\rworld\x7F", {
          keepCarriageReturns: true,
        })
      ).toBe("hello\rworld");
    });
  });

  describe("combined options", () => {
    it("should preserve multiple whitespace types when specified", () => {
      const options = {
        keepNewlines: true,
        keepTabs: true,
        keepCarriageReturns: true,
      };
      expect(removeNonPrintable("hello\n\t\rworld", options)).toBe(
        "hello\n\t\rworld"
      );
      expect(removeNonPrintable("\thello\r\nworld", options)).toBe(
        "\thello\r\nworld"
      );
    });

    it("should still remove control characters with all preserve options", () => {
      const options = {
        keepNewlines: true,
        keepTabs: true,
        keepCarriageReturns: true,
      };
      expect(removeNonPrintable("\x00hello\n\t\r\x01world\x7F", options)).toBe(
        "hello\n\t\rworld"
      );
    });
  });

  describe("edge cases", () => {
    it("should handle empty string", () => {
      expect(removeNonPrintable("")).toBe("");
    });

    it("should handle string with only control characters", () => {
      expect(removeNonPrintable("\x00\x01\x02\x03")).toBe("");
      expect(removeNonPrintable("\n\t\r")).toBe("");
      expect(removeNonPrintable("\u200B\u200C")).toBe(""); // Zero-width space and non-joiner
      expect(removeNonPrintable("\u200D")).toBe("\u200D"); // Zero-width joiner is preserved
    });

    it("should handle string without any control characters", () => {
      expect(removeNonPrintable("Hello World!")).toBe("Hello World!");
      expect(removeNonPrintable("1234567890")).toBe("1234567890");
      expect(removeNonPrintable("!@#$%^&*()")).toBe("!@#$%^&*()");
    });

    it("should preserve spaces by default", () => {
      expect(removeNonPrintable("hello world")).toBe("hello world");
      expect(removeNonPrintable("  spaced  text  ")).toBe("  spaced  text  ");
    });

    it("should handle null/undefined gracefully", () => {
      expect(removeNonPrintable(null as any)).toBe(null);
      expect(removeNonPrintable(undefined as any)).toBe(undefined);
    });

    it("should handle Unicode text properly", () => {
      expect(removeNonPrintable("Hello 世界 🌍")).toBe("Hello 世界 🌍");
      expect(removeNonPrintable("café")).toBe("café");
      expect(removeNonPrintable("Привет мир")).toBe("Привет мир");
    });

    it("should handle emojis properly", () => {
      expect(removeNonPrintable("Hello 👋 World 🌍")).toBe("Hello 👋 World 🌍");
      expect(removeNonPrintable("👨‍👩‍👧‍👦")).toBe("👨‍👩‍👧‍👦");
    });
  });

  describe("real-world scenarios", () => {
    it("should clean terminal output", () => {
      const text = "\x1B[32mSuccess!\x1B[0m\n\x07Task completed";
      expect(removeNonPrintable(text)).toBe("[32mSuccess![0mTask completed");
      expect(removeNonPrintable(text, { keepNewlines: true })).toBe(
        "[32mSuccess![0m\nTask completed"
      );
    });

    it("should clean copy-pasted text with invisible characters", () => {
      const text = "Check\u200Bout\u200Bthis\u200Blink";
      expect(removeNonPrintable(text)).toBe("Checkoutthislink");
    });

    it("should clean text with directional overrides", () => {
      const text = "Hello\u202Dملاس\u202Cworld";
      expect(removeNonPrintable(text)).toBe("Helloملاسworld");
    });

    it("should clean text with soft hyphens", () => {
      const text = "This is a very long com\u00ADpound word that might break";
      expect(removeNonPrintable(text)).toBe(
        "This is a very long compound word that might break"
      );
    });

    it("should clean malformed Unicode text", () => {
      const text = "Hello\uFEFF\u200B\u200Cworld\u00AD\u202E";
      expect(removeNonPrintable(text)).toBe("Helloworld");
    });

    it("should handle log file content", () => {
      const log =
        "[INFO]\x00 Process started\n[ERROR]\x07 Failed to connect\r\n[DEBUG]\x1B Testing";
      expect(removeNonPrintable(log, { keepNewlines: true })).toBe(
        "[INFO] Process started\n[ERROR] Failed to connect\n[DEBUG] Testing"
      );
    });

    it("should clean data from serial communication", () => {
      const data = "AT+CMD\r\nOK\r\n\x00\x00\x03DATA\x04";
      expect(
        removeNonPrintable(data, {
          keepNewlines: true,
          keepCarriageReturns: true,
        })
      ).toBe("AT+CMD\r\nOK\r\nDATA");
    });

    it("should handle CSV with hidden characters", () => {
      const csv = "Name,Age\nJohn\u200B,30\nJane\u00AD,25";
      expect(removeNonPrintable(csv, { keepNewlines: true })).toBe(
        "Name,Age\nJohn,30\nJane,25"
      );
    });
  });
});
