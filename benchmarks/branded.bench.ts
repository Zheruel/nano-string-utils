import { bench, describe } from "vitest";
import { branded, isEmail, isUrl, slugify } from "../src/index";

describe("Branded Types Performance", () => {
  const validEmail = "user@example.com";
  const validUrl = "https://example.com";
  const textToSlug = "Hello World Example";

  bench("branded.isValidEmail", () => {
    branded.isValidEmail(validEmail);
  });

  bench("isEmail (baseline)", () => {
    isEmail(validEmail);
  });

  bench("branded.isValidUrl", () => {
    branded.isValidUrl(validUrl);
  });

  bench("isUrl (baseline)", () => {
    isUrl(validUrl);
  });

  bench("branded.isSlug", () => {
    branded.isSlug("hello-world");
  });

  bench("branded.toEmail", () => {
    branded.toEmail(validEmail);
  });

  bench("branded.toUrl", () => {
    branded.toUrl(validUrl);
  });

  bench("branded.toSlug", () => {
    branded.toSlug(textToSlug);
  });

  bench("slugify (baseline)", () => {
    slugify(textToSlug);
  });

  bench("branded.ensureSlug (already valid)", () => {
    branded.ensureSlug("already-a-slug");
  });

  bench("branded.ensureSlug (needs transform)", () => {
    branded.ensureSlug("Not A Slug");
  });

  bench("branded.unsafeEmail", () => {
    branded.unsafeEmail(validEmail);
  });

  bench("branded.unsafeUrl", () => {
    branded.unsafeUrl(validUrl);
  });

  bench("branded.unsafeSlug", () => {
    branded.unsafeSlug("test-slug");
  });
});
