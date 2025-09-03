import { describe, it, expect } from "vitest";
import { singularize } from "../src/singularize";

describe("singularize", () => {
  describe("basic singularization", () => {
    it("removes s from regular plurals", () => {
      expect(singularize("cats")).toBe("cat");
      expect(singularize("dogs")).toBe("dog");
      expect(singularize("books")).toBe("book");
      expect(singularize("cars")).toBe("car");
    });

    it("removes es from words ending in ses, xes, ches, shes, zes", () => {
      expect(singularize("buses")).toBe("bus");
      expect(singularize("classes")).toBe("class");
      expect(singularize("dishes")).toBe("dish");
      expect(singularize("churches")).toBe("church");
      expect(singularize("boxes")).toBe("box");
      expect(singularize("sizes")).toBe("size");
    });

    it("handles words ending in ies", () => {
      expect(singularize("cities")).toBe("city");
      expect(singularize("babies")).toBe("baby");
      expect(singularize("countries")).toBe("country");
      expect(singularize("parties")).toBe("party");
    });

    it("handles words ending in ves", () => {
      expect(singularize("leaves")).toBe("leaf");
      expect(singularize("knives")).toBe("knife");
      expect(singularize("lives")).toBe("life");
      expect(singularize("wives")).toBe("wife");
      expect(singularize("shelves")).toBe("shelf");
      expect(singularize("calves")).toBe("calf");
      expect(singularize("halves")).toBe("half");
    });

    it("handles words ending in oes", () => {
      expect(singularize("heroes")).toBe("hero");
      expect(singularize("tomatoes")).toBe("tomato");
      expect(singularize("potatoes")).toBe("potato");
    });

    it("handles words ending in s (but not es)", () => {
      expect(singularize("toys")).toBe("toy");
      expect(singularize("days")).toBe("day");
      expect(singularize("keys")).toBe("key");
      expect(singularize("boys")).toBe("boy");
      expect(singularize("photos")).toBe("photo");
      expect(singularize("pianos")).toBe("piano");
    });
  });

  describe("irregular singulars", () => {
    it("handles common irregular words", () => {
      expect(singularize("people")).toBe("person");
      expect(singularize("children")).toBe("child");
      expect(singularize("men")).toBe("man");
      expect(singularize("women")).toBe("woman");
      expect(singularize("teeth")).toBe("tooth");
      expect(singularize("feet")).toBe("foot");
      expect(singularize("mice")).toBe("mouse");
      expect(singularize("geese")).toBe("goose");
    });

    it("handles unchanged singulars", () => {
      expect(singularize("sheep")).toBe("sheep");
      expect(singularize("deer")).toBe("deer");
      expect(singularize("fish")).toBe("fish");
      expect(singularize("series")).toBe("series");
    });

    it("handles Latin/Greek words", () => {
      expect(singularize("data")).toBe("datum");
      expect(singularize("indices")).toBe("index");
      expect(singularize("analyses")).toBe("analysis");
      expect(singularize("crises")).toBe("crisis");
      expect(singularize("bases")).toBe("basis");
      expect(singularize("theses")).toBe("thesis");
    });

    it("handles Latin words ending in i", () => {
      expect(singularize("cacti")).toBe("cactus");
      expect(singularize("fungi")).toBe("fungus");
      expect(singularize("nuclei")).toBe("nucleus");
      expect(singularize("alumni")).toBe("alumnus");
    });
  });

  describe("case preservation", () => {
    it("preserves capitalization", () => {
      expect(singularize("Boxes")).toBe("Box");
      expect(singularize("Cities")).toBe("City");
      expect(singularize("People")).toBe("Person");
      expect(singularize("Children")).toBe("Child");
    });

    it("preserves all caps", () => {
      expect(singularize("BOXES")).toBe("BOX");
      expect(singularize("CITIES")).toBe("CITY");
      expect(singularize("PEOPLE")).toBe("PERSON");
      expect(singularize("CHILDREN")).toBe("CHILD");
    });
  });

  describe("words that should not change", () => {
    it("handles words ending in ss", () => {
      expect(singularize("glass")).toBe("glass");
      expect(singularize("grass")).toBe("grass");
      expect(singularize("pass")).toBe("pass");
      expect(singularize("brass")).toBe("brass");
    });

    it("handles already singular words", () => {
      expect(singularize("person")).toBe("person");
      expect(singularize("child")).toBe("child");
      expect(singularize("house")).toBe("house");
    });
  });

  describe("edge cases", () => {
    it("handles words ending in ses", () => {
      expect(singularize("analyses")).toBe("analysis");
      expect(singularize("crises")).toBe("crisis");
      expect(singularize("buses")).toBe("bus");
      expect(singularize("glasses")).toBe("glass");
    });

    it("handles words ending in zes", () => {
      expect(singularize("sizes")).toBe("size");
      expect(singularize("prizes")).toBe("prize");
      expect(singularize("quizzes")).toBe("quiz");
    });

    it("handles single letter words", () => {
      expect(singularize("as")).toBe("a");
      expect(singularize("Is")).toBe("I");
    });

    it("handles empty string", () => {
      expect(singularize("")).toBe("");
    });

    it("handles words ending in es but not ies/oes/ses", () => {
      expect(singularize("watches")).toBe("watch");
      expect(singularize("dishes")).toBe("dish");
      expect(singularize("bushes")).toBe("bush");
    });
  });
});
