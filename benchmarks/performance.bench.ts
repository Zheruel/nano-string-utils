import { bench, describe } from "vitest";
import * as nano from "../src/index.js";
import * as lodash from "lodash";
import * as esToolkit from "es-toolkit";

// Test data of various sizes
const shortString = "hello world";
const mediumString = "The quick brown fox jumps over the lazy dog. ".repeat(10);
const longString =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(100);
const veryLongString =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(1000);

const camelCaseInput = "hello_world_test_string";
const kebabCaseInput = "hello-world-test-string";
const snakeCaseInput = "hello_world_test_string";
const mixedCaseInput = "Hello World Test String";

describe("camelCase", () => {
  bench("nano-string-utils", () => {
    nano.camelCase(camelCaseInput);
  });

  bench("lodash", () => {
    lodash.camelCase(camelCaseInput);
  });

  bench("es-toolkit", () => {
    esToolkit.camelCase(camelCaseInput);
  });
});

describe("kebabCase", () => {
  bench("nano-string-utils", () => {
    nano.kebabCase(kebabCaseInput);
  });

  bench("lodash", () => {
    lodash.kebabCase(kebabCaseInput);
  });

  bench("es-toolkit", () => {
    esToolkit.kebabCase(kebabCaseInput);
  });
});

describe("snakeCase", () => {
  bench("nano-string-utils", () => {
    nano.snakeCase(snakeCaseInput);
  });

  bench("lodash", () => {
    lodash.snakeCase(snakeCaseInput);
  });

  bench("es-toolkit", () => {
    esToolkit.snakeCase(snakeCaseInput);
  });
});

describe("pascalCase", () => {
  bench("nano-string-utils", () => {
    nano.pascalCase(mixedCaseInput);
  });

  bench("lodash (startCase)", () => {
    lodash.startCase(mixedCaseInput);
  });

  bench("es-toolkit", () => {
    esToolkit.pascalCase(mixedCaseInput);
  });
});

describe("capitalize", () => {
  bench("nano-string-utils", () => {
    nano.capitalize(shortString);
  });

  bench("lodash", () => {
    lodash.capitalize(shortString);
  });

  bench("es-toolkit", () => {
    esToolkit.capitalize(shortString);
  });
});

describe("truncate (short string)", () => {
  bench("nano-string-utils", () => {
    nano.truncate(shortString, 10);
  });

  bench("lodash", () => {
    lodash.truncate(shortString, { length: 10 });
  });

  // es-toolkit doesn't have truncate
});

describe("truncate (long string)", () => {
  bench("nano-string-utils", () => {
    nano.truncate(longString, 100);
  });

  bench("lodash", () => {
    lodash.truncate(longString, { length: 100 });
  });
});

describe("deburr", () => {
  const accentedString = "déjà vu café résumé naïve Zürich";

  bench("nano-string-utils", () => {
    nano.deburr(accentedString);
  });

  bench("lodash", () => {
    lodash.deburr(accentedString);
  });

  bench("es-toolkit", () => {
    esToolkit.deburr(accentedString);
  });
});

describe("pad", () => {
  bench("nano-string-utils", () => {
    nano.pad("test", 10);
  });

  bench("lodash", () => {
    lodash.pad("test", 10);
  });

  bench("es-toolkit", () => {
    esToolkit.pad("test", 10);
  });
});

describe("padStart", () => {
  bench("nano-string-utils", () => {
    nano.padStart("test", 10);
  });

  bench("lodash", () => {
    lodash.padStart("test", 10);
  });

  // es-toolkit doesn't have padStart
});

describe("padEnd", () => {
  bench("nano-string-utils", () => {
    nano.padEnd("test", 10);
  });

  bench("lodash", () => {
    lodash.padEnd("test", 10);
  });

  // es-toolkit doesn't have padEnd
});

describe("template", () => {
  const templateString = "Hello ${name}, you have ${count} messages";
  const data = { name: "World", count: 5 };

  bench("nano-string-utils", () => {
    nano.template(templateString, data);
  });

  bench("lodash", () => {
    const compiled = lodash.template(templateString);
    compiled(data);
  });

  // es-toolkit doesn't have template
});

// Performance with different string sizes
describe("camelCase - performance by string size", () => {
  describe("short string", () => {
    bench("nano-string-utils", () => {
      nano.camelCase("hello_world");
    });

    bench("lodash", () => {
      lodash.camelCase("hello_world");
    });

    bench("es-toolkit", () => {
      esToolkit.camelCase("hello_world");
    });
  });

  describe("medium string", () => {
    const medium = "the_quick_brown_fox_jumps_over_the_lazy_dog";

    bench("nano-string-utils", () => {
      nano.camelCase(medium);
    });

    bench("lodash", () => {
      lodash.camelCase(medium);
    });

    bench("es-toolkit", () => {
      esToolkit.camelCase(medium);
    });
  });

  describe("long string", () => {
    const long = Array(100).fill("word").join("_");

    bench("nano-string-utils", () => {
      nano.camelCase(long);
    });

    bench("lodash", () => {
      lodash.camelCase(long);
    });

    bench("es-toolkit", () => {
      esToolkit.camelCase(long);
    });
  });
});

describe("escape", () => {
  const htmlString = '<div class="test">Hello & "world"</div>';

  bench("nano-string-utils (escapeHtml)", () => {
    nano.escapeHtml(htmlString);
  });

  bench("lodash", () => {
    lodash.escape(htmlString);
  });

  bench("es-toolkit", () => {
    esToolkit.escape(htmlString);
  });
});

describe("reverse", () => {
  const testString = "Hello World";

  bench("nano-string-utils", () => {
    nano.reverse(testString);
  });

  // lodash doesn't have reverse for strings

  bench("es-toolkit (reverseString)", () => {
    esToolkit.reverseString(testString);
  });
});

describe("slugify", () => {
  const testString = "Hello World! This is a Test String.";

  bench("nano-string-utils", () => {
    nano.slugify(testString);
  });

  bench("lodash (kebabCase)", () => {
    lodash.kebabCase(testString.toLowerCase());
  });

  // es-toolkit doesn't have slugify, but kebabCase is similar
  bench("es-toolkit (kebabCase)", () => {
    esToolkit.kebabCase(testString.toLowerCase());
  });
});

describe("isEmail", () => {
  const validEmail = "test@example.com";
  const invalidEmail = "not-an-email";

  bench("nano-string-utils (valid)", () => {
    nano.isEmail(validEmail);
  });

  bench("nano-string-utils (invalid)", () => {
    nano.isEmail(invalidEmail);
  });

  // lodash and es-toolkit don't have email validation
});

describe("isUrl", () => {
  const validUrl = "https://example.com/path";
  const invalidUrl = "not-a-url";

  bench("nano-string-utils (valid)", () => {
    nano.isUrl(validUrl);
  });

  bench("nano-string-utils (invalid)", () => {
    nano.isUrl(invalidUrl);
  });

  // lodash and es-toolkit don't have URL validation
});
