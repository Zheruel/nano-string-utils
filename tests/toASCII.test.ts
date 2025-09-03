import { describe, expect, it } from "vitest";
import { toASCII } from "../src/toASCII";

describe("toASCII", () => {
  it("should handle empty string", () => {
    expect(toASCII("")).toBe("");
  });

  it("should return ASCII strings unchanged", () => {
    expect(toASCII("Hello World")).toBe("Hello World");
    expect(toASCII("abc123!@#")).toBe("abc123!@#");
    expect(toASCII("test_file-2024.txt")).toBe("test_file-2024.txt");
  });

  it("should remove diacritics from Latin characters", () => {
    expect(toASCII("café")).toBe("cafe");
    expect(toASCII("naïve")).toBe("naive");
    expect(toASCII("Bjørn")).toBe("Bjorn");
    expect(toASCII("São Paulo")).toBe("Sao Paulo");
    expect(toASCII("Müller")).toBe("Muller");
    expect(toASCII("résumé")).toBe("resume");
    expect(toASCII("piñata")).toBe("pinata");
  });

  it("should convert smart quotes to regular quotes", () => {
    expect(toASCII("\u201CHello\u201D")).toBe('"Hello"');
    expect(toASCII("\u2018World\u2019")).toBe("'World'");
    expect(toASCII("It\u2019s a \u201Ctest\u201D")).toBe('It\'s a "test"');
    expect(toASCII("\u00ABFrench\u00BB quotes")).toBe('"French" quotes');
    expect(toASCII("\u201Abottom\u2019 quote")).toBe(",bottom' quote");
  });

  it("should convert dashes and hyphens", () => {
    expect(toASCII("em\u2014dash")).toBe("em-dash");
    expect(toASCII("en\u2013dash")).toBe("en-dash");
    expect(toASCII("figure\u2012dash")).toBe("figure-dash");
    expect(toASCII("horizontal\u2015bar")).toBe("horizontal-bar");
  });

  it("should convert punctuation marks", () => {
    expect(toASCII("Hello\u2026")).toBe("Hello...");
    expect(toASCII("\u2022 Bullet point")).toBe("* Bullet point");
    expect(toASCII("\u00B7Middle dot")).toBe(".Middle dot");
    expect(toASCII("\u00BFQuestion?")).toBe("?Question?");
    expect(toASCII("\u00A1Exclamation!")).toBe("!Exclamation!");
  });

  it("should convert mathematical symbols", () => {
    expect(toASCII("2 \u00D7 3")).toBe("2 x 3");
    expect(toASCII("10 \u00F7 2")).toBe("10 / 2");
    expect(toASCII("\u00B15")).toBe("+/-5");
    expect(toASCII("a \u2248 b")).toBe("a ~ b");
    expect(toASCII("x \u2260 y")).toBe("x != y");
    expect(toASCII("a \u2264 b \u2265 c")).toBe("a <= b >= c");
    expect(toASCII("\u221E loop")).toBe("inf loop");
    expect(toASCII("\u221A16")).toBe("sqrt16");
  });

  it("should convert currency symbols", () => {
    expect(toASCII("\u20AC100")).toBe("EUR100");
    expect(toASCII("\u00A350")).toBe("GBP50");
    expect(toASCII("\u00A51000")).toBe("JPY1000");
    expect(toASCII("50\u00A2")).toBe("50c");
    expect(toASCII("\u20B9500")).toBe("INR500");
    expect(toASCII("\u20BD100")).toBe("RUB100");
  });

  it("should convert common fractions", () => {
    expect(toASCII("\u00BD cup")).toBe("1/2 cup");
    expect(toASCII("\u00BC mile")).toBe("1/4 mile");
    expect(toASCII("\u00BE full")).toBe("3/4 full");
    expect(toASCII("\u2153 portion")).toBe("1/3 portion");
    expect(toASCII("\u2154 complete")).toBe("2/3 complete");
  });

  it("should convert arrows", () => {
    expect(toASCII("A \u2192 B")).toBe("A -> B");
    expect(toASCII("X \u2190 Y")).toBe("X <- Y");
    expect(toASCII("\u2191 up")).toBe("^ up");
    expect(toASCII("\u2193 down")).toBe("v down");
    expect(toASCII("A \u2194 B")).toBe("A <-> B");
  });

  it("should convert special symbols", () => {
    expect(toASCII("\u00A9 2024")).toBe("(c) 2024");
    expect(toASCII("Brand\u00AE")).toBe("Brand(R)");
    expect(toASCII("Product\u2122")).toBe("Product(TM)");
    expect(toASCII("90\u00B0")).toBe("90deg");
    expect(toASCII("\u00A7 Section")).toBe("S Section");
    expect(toASCII("\u00B6 Paragraph")).toBe("P Paragraph");
    expect(toASCII("Item \u2116 5")).toBe("Item No 5");
  });

  it("should transliterate Greek letters", () => {
    expect(toASCII("α β γ")).toBe("a b g");
    expect(toASCII("Δ delta")).toBe("D delta");
    expect(toASCII("π = 3.14")).toBe("p = 3.14");
    expect(toASCII("Σ sum")).toBe("S sum");
    expect(toASCII("Ω omega")).toBe("O omega");
    expect(toASCII("θ angle")).toBe("th angle");
    expect(toASCII("Φ phi")).toBe("Ph phi");
    expect(toASCII("λ lambda")).toBe("l lambda");
  });

  it("should transliterate Cyrillic letters", () => {
    expect(toASCII("Привет")).toBe("Privet");
    expect(toASCII("Москва")).toBe("Moskva");
    expect(toASCII("да")).toBe("da");
    expect(toASCII("нет")).toBe("net");
    expect(toASCII("хорошо")).toBe("khorosho");
    expect(toASCII("спасибо")).toBe("spasibo");
    expect(toASCII("Россия")).toBe("Rossiya");
  });

  it("should remove control characters", () => {
    expect(toASCII("Hello\x00World")).toBe("HelloWorld");
    expect(toASCII("Line\x1FBreak")).toBe("LineBreak");
    expect(toASCII("Tab\x09Here")).toBe("Tab\tHere"); // Tab is ASCII
    expect(toASCII("Bell\x07Sound")).toBe("BellSound");
    expect(toASCII("\x7FDelete")).toBe("Delete");
  });

  it("should handle non-convertible characters without placeholder", () => {
    expect(toASCII("你好")).toBe(""); // Chinese characters removed
    expect(toASCII("こんにちは")).toBe(""); // Japanese characters removed
    expect(toASCII("안녕하세요")).toBe(""); // Korean characters removed
    expect(toASCII("مرحبا")).toBe(""); // Arabic characters removed
    expect(toASCII("🙂 emoji")).toBe(" emoji"); // Emoji removed
    expect(toASCII("Hello 世界")).toBe("Hello "); // Mixed content
  });

  it("should replace non-convertible characters with placeholder", () => {
    expect(toASCII("你好", { placeholder: "?" })).toBe("??");
    expect(toASCII("こんにちは", { placeholder: "?" })).toBe("?????");
    expect(toASCII("안녕하세요", { placeholder: "?" })).toBe("?????");
    expect(toASCII("مرحبا", { placeholder: "?" })).toBe("?????");
    expect(toASCII("🙂 emoji", { placeholder: "?" })).toBe("? emoji");
    expect(toASCII("Hello 世界", { placeholder: "?" })).toBe("Hello ??");
  });

  it("should handle custom placeholders", () => {
    expect(toASCII("你好", { placeholder: "_" })).toBe("__");
    expect(toASCII("Hello 世界", { placeholder: "[?]" })).toBe("Hello [?][?]");
    expect(toASCII("Test 测试", { placeholder: "" })).toBe("Test ");
    expect(toASCII("emoji 😀", { placeholder: "(emoji)" })).toBe(
      "emoji (emoji)"
    );
  });

  it("should handle complex mixed content", () => {
    expect(
      toASCII(
        "Caf\u00E9 \u2192 \u201C\u041C\u043E\u0441\u043A\u0432\u0430\u201D \u20AC50"
      )
    ).toBe('Cafe -> "Moskva" EUR50');
    expect(toASCII("R\u00E9sum\u00E9: \u03B1=\u00BD, \u03B2\u2248\u00BE")).toBe(
      "Resume: a=1/2, b~3/4"
    );
    expect(toASCII("\u00A92024 M\u00FCller\u2122 \u2022 M\u00FCnchen")).toBe(
      "(c)2024 Muller(TM) * Munchen"
    );
    expect(toASCII("\u00BFSe\u00F1or? \u00A1S\u00ED! \u2026wait")).toBe(
      "?Senor? !Si! ...wait"
    );
  });

  it("should handle text with multiple conversions", () => {
    const input =
      "The \u201Csmart\u201D caf\u00E9\u2014located in M\u00FCnchen\u2014costs \u20AC20 (\u2248 $25).";
    const expected = 'The "smart" cafe-located in Munchen-costs EUR20 (~ $25).';
    expect(toASCII(input)).toBe(expected);
  });

  it("should preserve spaces and basic punctuation", () => {
    expect(toASCII("  spaced  out  ")).toBe("  spaced  out  ");
    expect(toASCII("line\nbreak")).toBe("line\nbreak");
    expect(toASCII("comma, period. semicolon;")).toBe(
      "comma, period. semicolon;"
    );
    expect(toASCII("question? exclamation!")).toBe("question? exclamation!");
  });

  it("should handle edge cases", () => {
    // Very long string
    const longStr = "café".repeat(1000);
    const expectedLong = "cafe".repeat(1000);
    expect(toASCII(longStr)).toBe(expectedLong);

    // String with only non-ASCII
    expect(toASCII("\u4F60\u597D\u4E16\u754C")).toBe("");
    expect(toASCII("\u4F60\u597D\u4E16\u754C", { placeholder: "X" })).toBe(
      "XXXX"
    );

    // Mixed whitespace
    expect(toASCII("hello\u00A0world")).toBe("hello world"); // Non-breaking space
    expect(toASCII("test\u2003here")).toBe("test here"); // Em space
  });

  it("should handle combining characters properly", () => {
    // These should be handled by deburr
    expect(toASCII("e\u0301")).toBe("e"); // é as combining character
    expect(toASCII("n\u0303")).toBe("n"); // ñ as combining character
    expect(toASCII("a\u0308")).toBe("a"); // ä as combining character
  });

  it("should be idempotent for ASCII strings", () => {
    const ascii = "Hello World 123 !@#$%^&*()";
    expect(toASCII(toASCII(ascii))).toBe(ascii);
    expect(toASCII(ascii)).toBe(ascii);
  });
});
