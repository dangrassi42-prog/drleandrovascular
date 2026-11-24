import { describe, expect, it } from "vitest";
import { formatPhoneBR, whatsappLink } from "./whatsapp";

describe("whatsapp booking link", () => {
  it("points to the doctor's number +55 74 99933-1012", () => {
    expect(whatsappLink("+55 74 99933-1012")).toBe("https://wa.me/5574999331012");
  });

  it("returns no link when the number is empty", () => {
    expect(whatsappLink("")).toBeNull();
  });

  it("formats the number for display", () => {
    expect(formatPhoneBR("5574999331012")).toBe("(74) 99933-1012");
  });
});
