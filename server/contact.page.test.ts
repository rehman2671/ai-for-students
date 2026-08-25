import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = readFileSync(resolve(process.cwd(), "client/src/pages/ContactPage.tsx"), "utf8");

describe("contact page contract", () => {
  it("uses the confirmed support mailbox and protects sensitive information", () => {
    expect(source).toContain('const SUPPORT_EMAIL = "auth@aiforstudents.in"');
    expect(source).toContain("Please do not include passwords, authentication codes or sensitive personal information.");
    expect(source).toContain('type="email"');
    expect(source).toContain('name="message"');
    expect(source).toContain('role="status"');
    expect(source).toContain("mailto:${SUPPORT_EMAIL}");
  });
});
