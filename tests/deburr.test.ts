import { describe, it, expect } from "vitest";
import { deburr } from "../src/deburr";

describe("deburr", () => {
  it("removes common accents", () => {
    expect(deburr("café")).toBe("cafe");
    expect(deburr("naïve")).toBe("naive");
    expect(deburr("résumé")).toBe("resume");
    expect(deburr("piñata")).toBe("pinata");
  });

  it("handles uppercase accents", () => {
    expect(deburr("CAFÉ")).toBe("CAFE");
    expect(deburr("NAÏVE")).toBe("NAIVE");
    expect(deburr("RÉSUMÉ")).toBe("RESUME");
  });

  it("removes German umlauts and special characters", () => {
    expect(deburr("Müller")).toBe("Muller");
    expect(deburr("größer")).toBe("grosser");
    expect(deburr("über")).toBe("uber");
    expect(deburr("Straße")).toBe("Strasse");
    expect(deburr("Köln")).toBe("Koln");
  });

  it("handles Spanish and Portuguese diacritics", () => {
    expect(deburr("señor")).toBe("senor");
    expect(deburr("São Paulo")).toBe("Sao Paulo");
    expect(deburr("açúcar")).toBe("acucar");
    expect(deburr("coração")).toBe("coracao");
    expect(deburr("José")).toBe("Jose");
  });

  it("handles Nordic characters", () => {
    expect(deburr("Bjørn")).toBe("Bjorn");
    expect(deburr("Åse")).toBe("Ase");
    expect(deburr("Ørsted")).toBe("Orsted");
    expect(deburr("København")).toBe("Kobenhavn");
    expect(deburr("Malmö")).toBe("Malmo");
  });

  it("handles Polish characters", () => {
    expect(deburr("Wałęsa")).toBe("Walesa");
    expect(deburr("Łódź")).toBe("Lodz");
    expect(deburr("Kraków")).toBe("Krakow");
    expect(deburr("Gdańsk")).toBe("Gdansk");
    expect(deburr("żółć")).toBe("zolc");
  });

  it("handles French accents", () => {
    expect(deburr("château")).toBe("chateau");
    expect(deburr("crème brûlée")).toBe("creme brulee");
    expect(deburr("où êtes-vous")).toBe("ou etes-vous");
    expect(deburr("François")).toBe("Francois");
  });

  it("handles ligatures", () => {
    expect(deburr("æther")).toBe("aether");
    expect(deburr("Æsop")).toBe("Aesop");
    expect(deburr("œuvre")).toBe("oeuvre");
    expect(deburr("Œdipus")).toBe("Oedipus");
  });

  it("handles mixed text", () => {
    expect(deburr("Héllö Wørld!")).toBe("Hello World!");
    expect(deburr("Café São José")).toBe("Cafe Sao Jose");
    expect(deburr("München über Köln")).toBe("Munchen uber Koln");
  });

  it("preserves non-Latin scripts", () => {
    expect(deburr("Москва")).toBe("Москва"); // Cyrillic
    expect(deburr("北京")).toBe("北京"); // Chinese
    expect(deburr("東京")).toBe("東京"); // Japanese
    expect(deburr("서울")).toBe("서울"); // Korean
    expect(deburr("مصر")).toBe("مصر"); // Arabic
  });

  it("preserves numbers and symbols", () => {
    expect(deburr("123")).toBe("123");
    expect(deburr("!@#$%")).toBe("!@#$%");
    expect(deburr("hello@example.com")).toBe("hello@example.com");
  });

  it("handles empty string", () => {
    expect(deburr("")).toBe("");
  });

  it("handles strings without diacritics", () => {
    expect(deburr("Hello World")).toBe("Hello World");
    expect(deburr("test123")).toBe("test123");
  });

  it("handles combining diacritics", () => {
    // Using combining diacritical marks directly
    expect(deburr("e\u0301")).toBe("e"); // é using combining acute
    expect(deburr("a\u0300")).toBe("a"); // à using combining grave
    expect(deburr("n\u0303")).toBe("n"); // ñ using combining tilde
    expect(deburr("o\u0308")).toBe("o"); // ö using combining diaeresis
  });

  it("handles multiple diacritics on same letter", () => {
    expect(deburr("ṍ")).toBe("o"); // o with tilde and acute
    expect(deburr("ḗ")).toBe("e"); // e with macron and acute
  });

  it("handles real-world names", () => {
    expect(deburr("François Müller")).toBe("Francois Muller");
    expect(deburr("José García")).toBe("Jose Garcia");
    expect(deburr("Søren Kierkegaard")).toBe("Soren Kierkegaard");
    expect(deburr("Antonín Dvořák")).toBe("Antonin Dvorak");
  });

  it("handles URLs and slugs", () => {
    expect(deburr("café-société")).toBe("cafe-societe");
    expect(deburr("björk_guðmundsdóttir")).toBe("bjork_gudmundsdottir");
  });
});
