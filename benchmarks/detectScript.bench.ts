import { describe, bench } from "vitest";
import { detectScript } from "../src/index.js";

describe("detectScript Benchmarks", () => {
  bench("detectScript - Latin text", () => {
    detectScript("The quick brown fox jumps over the lazy dog");
  });

  bench("detectScript - Chinese text", () => {
    detectScript("你好世界，这是一个测试文本");
  });

  bench("detectScript - Arabic text", () => {
    detectScript("مرحبا بالعالم هذا نص تجريبي");
  });

  bench("detectScript - Cyrillic text", () => {
    detectScript("Привет мир, это тестовый текст");
  });

  bench("detectScript - Mixed Latin/CJK", () => {
    detectScript("Hello 你好 World 世界");
  });

  bench("detectScript - Long Latin text", () => {
    detectScript(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
    );
  });

  bench("detectScript - Short text", () => {
    detectScript("Hi");
  });

  bench("detectScript - Empty string", () => {
    detectScript("");
  });

  bench("detectScript - Numbers and punctuation", () => {
    detectScript("123 !@# $%^ &*()");
  });

  bench("detectScript - Multiple scripts", () => {
    detectScript("English text followed by 中文 and العربية and русский");
  });
});
