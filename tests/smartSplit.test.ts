import { describe, it, expect } from "vitest";
import { smartSplit } from "../src/smartSplit";

describe("smartSplit", () => {
  it("splits basic sentences", () => {
    expect(smartSplit("Hello world. How are you?")).toEqual([
      "Hello world.",
      "How are you?",
    ]);
  });

  it("handles exclamation marks", () => {
    expect(smartSplit("Amazing! This is great. Really!")).toEqual([
      "Amazing!",
      "This is great.",
      "Really!",
    ]);
  });

  it("handles question marks", () => {
    expect(smartSplit("What? Are you sure? Yes.")).toEqual([
      "What?",
      "Are you sure?",
      "Yes.",
    ]);
  });

  it("handles common abbreviations", () => {
    expect(smartSplit("Dr. Smith went to the store. He bought milk.")).toEqual([
      "Dr. Smith went to the store.",
      "He bought milk.",
    ]);

    expect(smartSplit("Mr. and Mrs. Johnson arrived. They were late.")).toEqual(
      ["Mr. and Mrs. Johnson arrived.", "They were late."]
    );
  });

  it("handles academic titles", () => {
    expect(smartSplit("Prof. Williams has a Ph.D. She teaches math.")).toEqual([
      "Prof. Williams has a Ph.D.",
      "She teaches math.",
    ]);
  });

  it("preserves decimal numbers", () => {
    expect(smartSplit("The price is $3.50. What a deal!")).toEqual([
      "The price is $3.50.",
      "What a deal!",
    ]);

    expect(smartSplit("Pi is approximately 3.14159. Remember that.")).toEqual([
      "Pi is approximately 3.14159.",
      "Remember that.",
    ]);
  });

  it("handles ellipsis", () => {
    expect(smartSplit("I'm not sure... Maybe tomorrow. We'll see.")).toEqual([
      "I'm not sure...",
      "Maybe tomorrow.",
      "We'll see.",
    ]);
  });

  it("handles mixed punctuation and abbreviations", () => {
    expect(smartSplit('Dr. Jones said, "Hello!" Then he left.')).toEqual([
      'Dr. Jones said, "Hello!"',
      "Then he left.",
    ]);
  });

  it("handles multiple spaces between sentences", () => {
    expect(smartSplit("First sentence.    Second sentence.")).toEqual([
      "First sentence.",
      "Second sentence.",
    ]);
  });

  it("handles sentences without spaces after punctuation", () => {
    expect(smartSplit("First.Second.Third.")).toEqual(["First.Second.Third."]);
  });

  it("handles lowercase after punctuation", () => {
    expect(smartSplit("This is a test. but this continues.")).toEqual([
      "This is a test. but this continues.",
    ]);
  });

  it("handles empty string", () => {
    expect(smartSplit("")).toEqual([]);
  });

  it("handles string with only whitespace", () => {
    expect(smartSplit("   ")).toEqual([]);
  });

  it("handles string without punctuation", () => {
    expect(smartSplit("Just some text without any punctuation")).toEqual([
      "Just some text without any punctuation",
    ]);
  });

  it("handles single word", () => {
    expect(smartSplit("Hello")).toEqual(["Hello"]);
  });

  it("handles single sentence", () => {
    expect(smartSplit("This is a single sentence.")).toEqual([
      "This is a single sentence.",
    ]);
  });

  it("handles Jr. and Sr. abbreviations", () => {
    expect(
      smartSplit("Martin Luther King Jr. was a leader. He inspired many.")
    ).toEqual(["Martin Luther King Jr. was a leader.", "He inspired many."]);

    expect(smartSplit("John Smith Sr. called. His son answered.")).toEqual([
      "John Smith Sr. called.",
      "His son answered.",
    ]);
  });

  it("handles degree abbreviations", () => {
    expect(
      smartSplit(
        "She has a B.A. in English. He has an M.S. in Computer Science."
      )
    ).toEqual([
      "She has a B.A. in English.",
      "He has an M.S. in Computer Science.",
    ]);
  });

  it("handles medical abbreviations", () => {
    expect(
      smartSplit("The M.D. prescribed medicine. The patient recovered.")
    ).toEqual(["The M.D. prescribed medicine.", "The patient recovered."]);
  });

  it("handles sentences ending with abbreviations", () => {
    expect(smartSplit("I met with Dr. The meeting went well.")).toEqual([
      "I met with Dr.",
      "The meeting went well.",
    ]);
  });

  it("handles complex real-world text", () => {
    const text =
      "Dr. Smith, who has a Ph.D. from M.I.T., said the cost is $10.50. Isn't that expensive? I think so... Maybe we should reconsider.";
    const result = smartSplit(text);
    expect(result).toEqual([
      "Dr. Smith, who has a Ph.D. from M.I.T., said the cost is $10.50.",
      "Isn't that expensive?",
      "I think so...",
      "Maybe we should reconsider.",
    ]);
  });
});
