import { describe, it } from "vitest";
import { createPaddedText } from "./createPaddedText";

describe("Text is padded", () => {
  it.concurrent("Simple text is padded", async ({ expect }) => {
    const input = "Hello notHello Hello";
    const padded = createPaddedText(input);
    expect(padded).toBe("fooHellobar notHello fooHellobar");
  });

  it.concurrent("Different casing is padded", async ({ expect }) => {
    const input = "DifferentCasing somethingelse diFFerentcasing";
    const padded = createPaddedText(input);
    expect(padded).toBe(
      "fooDifferentCasingbar somethingelse foodiFFerentcasingbar"
    );
  });

  it.concurrent(
    "Different white space delimiters is padded",
    async ({ expect }) => {
      const input = "hej\thej\nhej hej";
      const padded = createPaddedText(input);
      expect(padded).toBe("foohejbar\tfoohejbar\nfoohejbar foohejbar");
    }
  );

  it.concurrent("Word can end with punctuation mark", async ({ expect }) => {
    const input = "hej, hej. hej? hej!";
    const padded = createPaddedText(input);
    expect(padded).toBe("foohejbar, foohejbar. foohejbar? foohejbar!");
  });

  it.concurrent(
    "Ignores strings that do not contain any letters",
    async ({ expect }) => {
      const input = "hej ! ! _ _ % %";
      const padded = createPaddedText(input);
      expect(padded).toBe("foohejbar ! ! _ _ % %");
    }
  );
});
