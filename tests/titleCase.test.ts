import { describe, it, expect } from "vitest";
import { titleCase } from "../src/titleCase";

describe("titleCase", () => {
  it("should handle empty string", () => {
    expect(titleCase("")).toBe("");
  });

  it("should capitalize basic words", () => {
    expect(titleCase("hello world")).toBe("Hello World");
    expect(titleCase("HELLO WORLD")).toBe("Hello World");
    expect(titleCase("HeLLo WoRLd")).toBe("Hello World");
  });

  it("should handle articles, conjunctions, and prepositions", () => {
    expect(titleCase("the quick brown fox")).toBe("The Quick Brown Fox");
    expect(titleCase("a tale of two cities")).toBe("A Tale of Two Cities");
    expect(titleCase("war and peace")).toBe("War and Peace");
    expect(titleCase("the cat in the hat")).toBe("The Cat in the Hat");
    expect(titleCase("to be or not to be")).toBe("To Be or Not to Be");
  });

  it("should always capitalize first and last words", () => {
    expect(titleCase("of mice and men")).toBe("Of Mice and Men");
    expect(titleCase("gone with the wind")).toBe("Gone with the Wind");
    expect(titleCase("the lord of the rings")).toBe("The Lord of the Rings");
    expect(titleCase("a journey to")).toBe("A Journey To");
  });

  it("should handle hyphenated words", () => {
    expect(titleCase("mother-in-law")).toBe("Mother-In-Law");
    expect(titleCase("x-ray")).toBe("X-Ray");
    expect(titleCase("merry-go-round")).toBe("Merry-Go-Round");
    expect(titleCase("state-of-the-art")).toBe("State-Of-The-Art");
  });

  it("should handle contractions", () => {
    expect(titleCase("don't stop believing")).toBe("Don't Stop Believing");
    expect(titleCase("it's a wonderful life")).toBe("It's a Wonderful Life");
    expect(titleCase("you're the best")).toBe("You're the Best");
    expect(titleCase("we'll be there")).toBe("We'll Be There");
  });

  it("should preserve acronyms", () => {
    expect(titleCase("NASA launches rocket")).toBe("NASA Launches Rocket");
    expect(titleCase("FBI and CIA investigate")).toBe(
      "FBI and CIA Investigate"
    );
    expect(titleCase("working at IBM")).toBe("Working at IBM");
  });

  it("should handle mixed punctuation", () => {
    expect(titleCase("hello, world!")).toBe("Hello, World!");
    expect(titleCase("what is this?")).toBe("What Is This?");
    expect(titleCase('"the great gatsby"')).toBe('"The Great Gatsby"');
  });

  it("should handle single word", () => {
    expect(titleCase("hello")).toBe("Hello");
    expect(titleCase("HELLO")).toBe("Hello");
    expect(titleCase("a")).toBe("A");
  });

  it("should handle numbers", () => {
    expect(titleCase("2001: a space odyssey")).toBe("2001: A Space Odyssey");
    expect(titleCase("the 39 steps")).toBe("The 39 Steps");
  });

  it("should use custom exceptions", () => {
    expect(titleCase("versus the world", { exceptions: ["versus"] })).toBe(
      "Versus the World"
    );
    expect(titleCase("the versus game", { exceptions: ["versus"] })).toBe(
      "The versus Game"
    );
    expect(titleCase("game versus", { exceptions: ["versus"] })).toBe(
      "Game Versus"
    );
  });

  it("should handle edge cases", () => {
    expect(titleCase("   ")).toBe("");
    expect(titleCase("a")).toBe("A");
    expect(titleCase("I")).toBe("I");
    expect(titleCase("123")).toBe("123");
  });

  it("should handle long prepositions and conjunctions", () => {
    expect(titleCase("through the looking glass")).toBe(
      "Through the Looking Glass"
    );
    expect(titleCase("around the world in 80 days")).toBe(
      "Around the World in 80 Days"
    );
    expect(titleCase("before the dawn")).toBe("Before the Dawn");
    expect(titleCase("the world without end")).toBe("The World without End");
  });
});
