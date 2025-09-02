import { describe, it, expect } from "vitest";
import { sentenceCase } from "../src/sentenceCase";

describe("sentenceCase", () => {
  // Basic conversions
  it("should convert lowercase to sentence case", () => {
    expect(sentenceCase("hello world")).toBe("Hello world");
    expect(sentenceCase("this is a test")).toBe("This is a test");
  });

  it("should convert uppercase to sentence case", () => {
    expect(sentenceCase("HELLO WORLD")).toBe("Hello world");
    expect(sentenceCase("THIS IS A TEST")).toBe("This is a test");
  });

  it("should convert mixed case to sentence case", () => {
    expect(sentenceCase("hELLo WoRLd")).toBe("Hello world");
    expect(sentenceCase("ThIs Is A tEsT")).toBe("This is a test");
  });

  // Multiple sentences
  it("should handle multiple sentences with periods", () => {
    expect(sentenceCase("hello. world.")).toBe("Hello. World.");
    expect(sentenceCase("first sentence. second sentence.")).toBe(
      "First sentence. Second sentence."
    );
    expect(sentenceCase("one. two. three.")).toBe("One. Two. Three.");
  });

  it("should handle multiple sentences with exclamation marks", () => {
    expect(sentenceCase("hello! world!")).toBe("Hello! World!");
    expect(sentenceCase("wow! amazing!")).toBe("Wow! Amazing!");
    expect(sentenceCase("stop! go! wait!")).toBe("Stop! Go! Wait!");
  });

  it("should handle multiple sentences with question marks", () => {
    expect(sentenceCase("hello? world?")).toBe("Hello? World?");
    expect(sentenceCase("what? when? where?")).toBe("What? When? Where?");
    expect(sentenceCase("really? are you sure?")).toBe("Really? Are you sure?");
  });

  it("should handle mixed punctuation", () => {
    expect(sentenceCase("hello! how are you? i am fine.")).toBe(
      "Hello! How are you? I am fine."
    );
    expect(sentenceCase("wait. stop! go?")).toBe("Wait. Stop! Go?");
  });

  // Edge cases with spacing
  it("should handle sentences without spaces after punctuation", () => {
    expect(sentenceCase("hello.world")).toBe("Hello.World");
    expect(sentenceCase("one!two?three.")).toBe("One!Two?Three.");
  });

  it("should handle multiple spaces", () => {
    expect(sentenceCase("hello.  world")).toBe("Hello.  World");
    expect(sentenceCase("hello!   world")).toBe("Hello!   World");
    expect(sentenceCase("hello?    world")).toBe("Hello?    World");
  });

  it("should handle leading and trailing spaces", () => {
    expect(sentenceCase("  hello world  ")).toBe("  Hello world  ");
    expect(sentenceCase("  hello. world  ")).toBe("  Hello. World  ");
  });

  // Special cases
  it("should capitalize 'i' as a pronoun", () => {
    expect(sentenceCase("i am happy")).toBe("I am happy");
    expect(sentenceCase("you and i")).toBe("You and I");
    expect(sentenceCase("hello. i am here.")).toBe("Hello. I am here.");
  });

  it("should handle contractions with 'I'", () => {
    expect(sentenceCase("i'm happy")).toBe("I'm happy");
    expect(sentenceCase("i'll go")).toBe("I'll go");
    expect(sentenceCase("i'd like that")).toBe("I'd like that");
    expect(sentenceCase("i've been there")).toBe("I've been there");
  });

  it("should handle quotes after sentences", () => {
    expect(sentenceCase('he said. "hello"')).toBe('He said. "Hello"');
    expect(sentenceCase("stop! 'wait'")).toBe("Stop! 'Wait'");
    expect(sentenceCase('end. "new sentence"')).toBe('End. "New sentence"');
  });

  // Numbers and special characters
  it("should handle sentences starting with numbers", () => {
    expect(sentenceCase("123 hello world")).toBe("123 hello world");
    expect(sentenceCase("42 is the answer.")).toBe("42 is the answer.");
  });

  it("should handle special characters", () => {
    expect(sentenceCase("@hello world")).toBe("@hello world");
    expect(sentenceCase("#hashtag here")).toBe("#hashtag here");
    expect(sentenceCase("$100 dollars")).toBe("$100 dollars");
  });

  // Empty and edge cases
  it("should handle empty strings", () => {
    expect(sentenceCase("")).toBe("");
    expect(sentenceCase(" ")).toBe(" ");
    expect(sentenceCase("   ")).toBe("   ");
  });

  it("should handle single characters", () => {
    expect(sentenceCase("a")).toBe("A");
    expect(sentenceCase("A")).toBe("A");
    expect(sentenceCase("i")).toBe("I");
  });

  it("should handle only punctuation", () => {
    expect(sentenceCase(".")).toBe(".");
    expect(sentenceCase("!")).toBe("!");
    expect(sentenceCase("?")).toBe("?");
    expect(sentenceCase("...")).toBe("...");
  });

  // Falsy values
  it("should handle falsy values correctly", () => {
    expect(sentenceCase("")).toBe("");
    expect(sentenceCase(null as any)).toBe(null);
    expect(sentenceCase(undefined as any)).toBe(undefined);
  });

  // Real-world examples
  it("should handle real-world sentences", () => {
    expect(sentenceCase("lorem ipsum dolor sit amet.")).toBe(
      "Lorem ipsum dolor sit amet."
    );
    expect(sentenceCase("THE QUICK BROWN FOX JUMPS. over the lazy dog.")).toBe(
      "The quick brown fox jumps. Over the lazy dog."
    );
    expect(sentenceCase("welcome! please enter. thank you.")).toBe(
      "Welcome! Please enter. Thank you."
    );
  });

  it("should handle paragraphs", () => {
    const input =
      "this is the first sentence. this is the second. and this is the third!";
    const expected =
      "This is the first sentence. This is the second. And this is the third!";
    expect(sentenceCase(input)).toBe(expected);
  });

  it("should handle dialogue", () => {
    expect(sentenceCase('"hello," he said.')).toBe('"Hello," he said.');
    expect(sentenceCase('she replied, "yes!"')).toBe('She replied, "yes!"');
  });

  // Complex cases
  it("should handle abbreviations and acronyms", () => {
    // Multi-letter abbreviations (x.x.x pattern) should be preserved
    expect(sentenceCase("the u.s.a. is large.")).toBe("The u.s.a. is large.");
    expect(sentenceCase("see e.g. the example.")).toBe("See e.g. the example.");
    // Single-word abbreviations are harder to detect without a dictionary, so they follow normal rules
    expect(sentenceCase("dr. smith arrived.")).toBe("Dr. Smith arrived.");
    expect(sentenceCase("etc. and so on.")).toBe("Etc. And so on.");
    // But new sentences after abbreviations should still be capitalized
    expect(sentenceCase("the u.s.a. It is large.")).toBe(
      "The u.s.a. It is large."
    );
    expect(sentenceCase("see e.g. the example. New sentence here.")).toBe(
      "See e.g. the example. New sentence here."
    );
  });

  it("should handle ellipsis", () => {
    expect(sentenceCase("wait... what?")).toBe("Wait... What?");
    expect(sentenceCase("hmm... i see.")).toBe("Hmm... I see.");
  });

  it("should handle mixed languages (basic)", () => {
    expect(sentenceCase("bonjour. hello. hola.")).toBe("Bonjour. Hello. Hola.");
  });
});
