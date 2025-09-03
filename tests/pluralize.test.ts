import { describe, it, expect } from "vitest";
import { pluralize } from "../src/pluralize";

describe("pluralize", () => {
  describe("basic pluralization", () => {
    it("adds s to regular words", () => {
      expect(pluralize("cat")).toBe("cats");
      expect(pluralize("dog")).toBe("dogs");
      expect(pluralize("book")).toBe("books");
      expect(pluralize("car")).toBe("cars");
    });

    it("adds es to words ending in s, ss, sh, ch, x, z", () => {
      expect(pluralize("bus")).toBe("buses");
      expect(pluralize("class")).toBe("classes");
      expect(pluralize("dish")).toBe("dishes");
      expect(pluralize("church")).toBe("churches");
      expect(pluralize("box")).toBe("boxes");
      expect(pluralize("quiz")).toBe("quizes");
    });

    it("handles words ending in consonant + y", () => {
      expect(pluralize("city")).toBe("cities");
      expect(pluralize("baby")).toBe("babies");
      expect(pluralize("country")).toBe("countries");
      expect(pluralize("party")).toBe("parties");
    });

    it("handles words ending in vowel + y", () => {
      expect(pluralize("toy")).toBe("toys");
      expect(pluralize("day")).toBe("days");
      expect(pluralize("key")).toBe("keys");
      expect(pluralize("boy")).toBe("boys");
    });

    it("handles words ending in f or fe", () => {
      expect(pluralize("leaf")).toBe("leaves");
      expect(pluralize("knife")).toBe("knives");
      expect(pluralize("life")).toBe("lives");
      expect(pluralize("wife")).toBe("wives");
      expect(pluralize("shelf")).toBe("shelves");
    });

    it("handles words ending in o", () => {
      expect(pluralize("hero")).toBe("heroes");
      expect(pluralize("tomato")).toBe("tomatoes");
      expect(pluralize("potato")).toBe("potatoes");
      // Exceptions
      expect(pluralize("photo")).toBe("photos");
      expect(pluralize("piano")).toBe("pianos");
      expect(pluralize("halo")).toBe("halos");
    });
  });

  describe("irregular plurals", () => {
    it("handles common irregular words", () => {
      expect(pluralize("person")).toBe("people");
      expect(pluralize("child")).toBe("children");
      expect(pluralize("man")).toBe("men");
      expect(pluralize("woman")).toBe("women");
      expect(pluralize("tooth")).toBe("teeth");
      expect(pluralize("foot")).toBe("feet");
      expect(pluralize("mouse")).toBe("mice");
      expect(pluralize("goose")).toBe("geese");
    });

    it("handles unchanged plurals", () => {
      expect(pluralize("sheep")).toBe("sheep");
      expect(pluralize("deer")).toBe("deer");
      expect(pluralize("fish")).toBe("fish");
      expect(pluralize("series")).toBe("series");
    });

    it("handles Latin/Greek words", () => {
      expect(pluralize("datum")).toBe("data");
      expect(pluralize("index")).toBe("indices");
      expect(pluralize("analysis")).toBe("analyses");
      expect(pluralize("crisis")).toBe("crises");
      expect(pluralize("basis")).toBe("bases");
      expect(pluralize("thesis")).toBe("theses");
    });
  });

  describe("with count parameter", () => {
    it("returns singular when count is 1", () => {
      expect(pluralize("item", 1)).toBe("item");
      expect(pluralize("box", 1)).toBe("box");
      expect(pluralize("person", 1)).toBe("person");
    });

    it("returns plural when count is 0", () => {
      expect(pluralize("item", 0)).toBe("items");
      expect(pluralize("box", 0)).toBe("boxes");
      expect(pluralize("person", 0)).toBe("people");
    });

    it("returns plural when count is greater than 1", () => {
      expect(pluralize("item", 2)).toBe("items");
      expect(pluralize("item", 100)).toBe("items");
      expect(pluralize("person", 5)).toBe("people");
    });

    it("returns plural when count is negative", () => {
      expect(pluralize("item", -1)).toBe("items");
      expect(pluralize("item", -5)).toBe("items");
    });

    it("returns plural when count is undefined", () => {
      expect(pluralize("item")).toBe("items");
      expect(pluralize("box")).toBe("boxes");
    });
  });

  describe("case preservation", () => {
    it("preserves capitalization", () => {
      expect(pluralize("Box")).toBe("Boxes");
      expect(pluralize("City")).toBe("Cities");
      expect(pluralize("Person")).toBe("People");
      expect(pluralize("Child")).toBe("Children");
    });

    it("preserves all caps", () => {
      expect(pluralize("BOX")).toBe("BOXES");
      expect(pluralize("CITY")).toBe("CITIES");
      expect(pluralize("PERSON")).toBe("PEOPLE");
      expect(pluralize("CHILD")).toBe("CHILDREN");
    });
  });

  describe("edge cases", () => {
    it("handles words ending in us", () => {
      expect(pluralize("cactus")).toBe("cacti");
      expect(pluralize("fungus")).toBe("fungi");
      expect(pluralize("bus")).toBe("buses"); // exception
    });

    it("handles words ending in is", () => {
      expect(pluralize("analysis")).toBe("analyses");
      expect(pluralize("crisis")).toBe("crises");
    });

    it("handles single letter words", () => {
      expect(pluralize("a")).toBe("as");
      expect(pluralize("I")).toBe("Is");
    });

    it("handles empty string", () => {
      expect(pluralize("")).toBe("s");
    });
  });
});
