import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

describe("mobile form controls", () => {
  it("keeps editable text at 16px to prevent iOS focus zoom", () => {
    const styles = readFileSync(new URL("./globals.css", import.meta.url), "utf8");

    expect(styles).toMatch(
      /@media \(max-width: 767px\) \{\s*input,\s*textarea,\s*select \{\s*font-size: 1rem;\s*\}\s*\}/,
    );
  });
});
