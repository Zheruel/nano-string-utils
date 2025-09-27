import { describe, it, expect } from "vitest";
import { detectScript } from "../src/detectScript";

describe("detectScript", () => {
  describe("Latin script detection", () => {
    it("should detect basic Latin text", () => {
      expect(detectScript("Hello World")).toBe("latin");
      expect(detectScript("The quick brown fox")).toBe("latin");
      expect(detectScript("abc123")).toBe("latin");
    });

    it("should detect Latin with diacritics", () => {
      expect(detectScript("Français")).toBe("latin");
      expect(detectScript("Español")).toBe("latin");
      expect(detectScript("Português")).toBe("latin");
      expect(detectScript("Čeština")).toBe("latin");
      expect(detectScript("Łódź")).toBe("latin");
      expect(detectScript("naïve résumé")).toBe("latin");
    });

    it("should detect Latin extended characters", () => {
      expect(detectScript("Ā ā Ē ē Ī ī")).toBe("latin");
      expect(detectScript("Ṃ ṃ Ṇ ṇ")).toBe("latin");
    });
  });

  describe("CJK script detection", () => {
    it("should detect Chinese characters", () => {
      expect(detectScript("你好世界")).toBe("cjk");
      expect(detectScript("中文测试")).toBe("cjk");
      expect(detectScript("简体中文")).toBe("cjk");
      expect(detectScript("繁體中文")).toBe("cjk");
    });

    it("should detect Japanese Hiragana", () => {
      expect(detectScript("こんにちは")).toBe("cjk");
      expect(detectScript("ありがとう")).toBe("cjk");
      expect(detectScript("さようなら")).toBe("cjk");
    });

    it("should detect Japanese Katakana", () => {
      expect(detectScript("コンピューター")).toBe("cjk");
      expect(detectScript("カタカナ")).toBe("cjk");
      expect(detectScript("アニメ")).toBe("cjk");
    });

    it("should detect Korean Hangul", () => {
      expect(detectScript("안녕하세요")).toBe("cjk");
      expect(detectScript("한국어")).toBe("cjk");
      expect(detectScript("감사합니다")).toBe("cjk");
    });

    it("should detect mixed CJK scripts", () => {
      expect(detectScript("日本語テスト")).toBe("cjk");
      expect(detectScript("韓国語한국어")).toBe("cjk");
    });
  });

  describe("Arabic script detection", () => {
    it("should detect Arabic text", () => {
      expect(detectScript("مرحبا بالعالم")).toBe("arabic");
      expect(detectScript("السلام عليكم")).toBe("arabic");
      expect(detectScript("اللغة العربية")).toBe("arabic");
    });

    it("should detect Persian/Farsi text", () => {
      expect(detectScript("سلام دنیا")).toBe("arabic");
      expect(detectScript("فارسی")).toBe("arabic");
    });

    it("should detect Urdu text", () => {
      expect(detectScript("اردو")).toBe("arabic");
      expect(detectScript("پاکستان")).toBe("arabic");
    });
  });

  describe("Cyrillic script detection", () => {
    it("should detect Russian text", () => {
      expect(detectScript("Привет мир")).toBe("cyrillic");
      expect(detectScript("Русский язык")).toBe("cyrillic");
      expect(detectScript("Здравствуйте")).toBe("cyrillic");
    });

    it("should detect Ukrainian text", () => {
      expect(detectScript("Українська мова")).toBe("cyrillic");
      expect(detectScript("Привіт світ")).toBe("cyrillic");
    });

    it("should detect Bulgarian text", () => {
      expect(detectScript("Здравей свят")).toBe("cyrillic");
      expect(detectScript("България")).toBe("cyrillic");
    });

    it("should detect Serbian Cyrillic", () => {
      expect(detectScript("Српски језик")).toBe("cyrillic");
      expect(detectScript("Ћирилица")).toBe("cyrillic");
    });
  });

  describe("Hebrew script detection", () => {
    it("should detect Hebrew text", () => {
      expect(detectScript("שלום עולם")).toBe("hebrew");
      expect(detectScript("עברית")).toBe("hebrew");
      expect(detectScript("תודה רבה")).toBe("hebrew");
    });

    it("should detect Hebrew with vowel points", () => {
      expect(detectScript("הָעִבְרִית")).toBe("hebrew");
    });
  });

  describe("Devanagari script detection", () => {
    it("should detect Hindi text", () => {
      expect(detectScript("नमस्ते दुनिया")).toBe("devanagari");
      expect(detectScript("हिन्दी")).toBe("devanagari");
      expect(detectScript("धन्यवाद")).toBe("devanagari");
    });

    it("should detect Marathi text", () => {
      expect(detectScript("मराठी भाषा")).toBe("devanagari");
    });

    it("should detect Nepali text", () => {
      expect(detectScript("नेपाली")).toBe("devanagari");
    });
  });

  describe("Greek script detection", () => {
    it("should detect modern Greek text", () => {
      expect(detectScript("Γειά σου κόσμε")).toBe("greek");
      expect(detectScript("Ελληνικά")).toBe("greek");
      expect(detectScript("Καλημέρα")).toBe("greek");
    });

    it("should detect Greek with diacritics", () => {
      expect(detectScript("άέήίόύώ")).toBe("greek");
    });

    it("should detect ancient Greek letters", () => {
      expect(detectScript("Ἀθῆναι")).toBe("greek");
    });
  });

  describe("Thai script detection", () => {
    it("should detect Thai text", () => {
      expect(detectScript("สวัสดีชาวโลก")).toBe("thai");
      expect(detectScript("ภาษาไทย")).toBe("thai");
      expect(detectScript("ขอบคุณ")).toBe("thai");
    });
  });

  describe("Mixed script handling", () => {
    it("should detect dominant script in mixed text", () => {
      expect(detectScript("Hello 你好")).toBe("latin");
      expect(detectScript("你好 Hello")).toBe("latin");
      expect(detectScript("Привет Hello Привет")).toBe("cyrillic");
    });

    it("should handle text with lots of Latin in non-Latin scripts", () => {
      expect(detectScript("iPhone のアプリ")).toBe("cjk");
      expect(detectScript("Google مترجم")).toBe("arabic");
    });

    it("should detect script when mixed with numbers and punctuation", () => {
      expect(detectScript("123 Hello! 456")).toBe("latin");
      expect(detectScript("¡Hola! ¿Cómo estás?")).toBe("latin");
      expect(detectScript("「こんにちは」")).toBe("cjk");
      expect(detectScript("123 مرحبا 456")).toBe("arabic");
    });
  });

  describe("Edge cases", () => {
    it("should return unknown for empty string", () => {
      expect(detectScript("")).toBe("unknown");
    });

    it("should return unknown for whitespace only", () => {
      expect(detectScript("   ")).toBe("unknown");
      expect(detectScript("\n\t")).toBe("unknown");
    });

    it("should return unknown for numbers only", () => {
      expect(detectScript("123456")).toBe("unknown");
      expect(detectScript("3.14159")).toBe("unknown");
    });

    it("should return unknown for punctuation only", () => {
      expect(detectScript("!@#$%^&*()")).toBe("unknown");
      expect(detectScript("...,,,;;;")).toBe("unknown");
    });

    it("should return unknown for emojis", () => {
      expect(detectScript("😀😃😄😁")).toBe("unknown");
      expect(detectScript("🌍🌎🌏")).toBe("unknown");
    });

    it("should handle single character input", () => {
      expect(detectScript("A")).toBe("latin");
      expect(detectScript("中")).toBe("cjk");
      expect(detectScript("א")).toBe("hebrew");
      expect(detectScript("Ω")).toBe("greek");
    });

    it("should handle very long text efficiently", () => {
      const longText = "Hello World ".repeat(1000);
      expect(detectScript(longText)).toBe("latin");
    });
  });

  describe("Real world examples", () => {
    it("should detect script in URLs with text", () => {
      expect(detectScript("Visit https://example.com for more info")).toBe(
        "latin"
      );
    });

    it("should detect script in email addresses with text", () => {
      expect(detectScript("Contact us at info@example.com")).toBe("latin");
    });

    it("should detect script in code comments", () => {
      expect(detectScript("// This is a comment")).toBe("latin");
      expect(detectScript("# Python注释")).toBe("latin");
    });

    it("should handle product names and brands", () => {
      expect(detectScript("iPhone 15 Pro")).toBe("latin");
      expect(detectScript("PlayStation 5")).toBe("latin");
    });

    it("should handle social media text", () => {
      expect(detectScript("@username Hello World #test")).toBe("latin");
      expect(detectScript("#こんにちは @user")).toBe("cjk");
    });
  });
});
