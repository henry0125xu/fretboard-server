import { FullNote } from "../../src/models/note";
import * as parsers from "../../src/utils/stringParsers";

describe("parseNumber function", () => {
  it("should return correct numbers", () => {
    expect(parsers.parseNumber("20")).toBe(20);
    expect(parsers.parseNumber("+2")).toBe(2);
    expect(parsers.parseNumber("-15")).toBe(-15);
    expect(parsers.parseNumber("+0")).toBe(0);
    expect(parsers.parseNumber("0")).toBe(0);
    expect(parsers.parseNumber("-0")).toBe(0);
    expect(parsers.parseNumber("066")).toBe(66);
    expect(parsers.parseNumber("+0066")).toBe(66);
    expect(parsers.parseNumber("-00066")).toBe(-66);
    expect(parsers.parseNumber("80000")).toBe(80000);
    expect(parsers.parseNumber("+6666")).toBe(6666);
    expect(parsers.parseNumber("-100000")).toBe(-100000);
    expect(parsers.parseNumber("0.25")).toBe(0.25);
    expect(parsers.parseNumber("+000.250")).toBe(0.25);
    expect(parsers.parseNumber("-0000.25000")).toBe(-0.25);
  });
  it("should throw errors", () => {
    expect(() => parsers.parseNumber("zxc")).toThrow(
      new Error("Invalid format: zxc")
    );
    expect(() => parsers.parseNumber("@#%qwe")).toThrow(
      new Error("Invalid format: @#%qwe")
    );
    expect(() => parsers.parseNumber("PG13")).toThrow(
      new Error("Invalid format: PG13")
    );
    expect(() => parsers.parseNumber("123xyz")).toThrow(
      new Error("Invalid format: 123xyz")
    );
    expect(() => parsers.parseNumber("+-55")).toThrow(
      new Error("Invalid format: +-55")
    );
    expect(() => parsers.parseNumber("-+55")).toThrow(
      new Error("Invalid format: -+55")
    );
    expect(() => parsers.parseNumber("++55")).toThrow(
      new Error("Invalid format: ++55")
    );
    expect(() => parsers.parseNumber("--55")).toThrow(
      new Error("Invalid format: --55")
    );
    expect(() => parsers.parseNumber("0..5")).toThrow(
      new Error("Invalid format: 0..5")
    );
    expect(() => parsers.parseNumber("0+0.5")).toThrow(
      new Error("Invalid format: 0+0.5")
    );
  });
});

describe("parseBasicNote function", () => {
  it("should parse correcly", () => {
    expect(() => parsers.parseBasicNote("C")).not.toThrow();
    expect(() => parsers.parseBasicNote("G")).not.toThrow();
    expect(() => parsers.parseBasicNote("C#")).not.toThrow();
    expect(() => parsers.parseBasicNote("Bb")).not.toThrow();
    expect(() => parsers.parseBasicNote("D##")).not.toThrow();
    expect(() => parsers.parseBasicNote("Cbb")).not.toThrow();
    expect(() => parsers.parseBasicNote("A")).not.toThrow();
  });
  it("should throw errors", () => {
    expect(() => parsers.parseBasicNote("C4")).toThrow(
      new Error("Invalid format: C4")
    );
    expect(() => parsers.parseBasicNote("#C")).toThrow(
      new Error("Invalid format: #C")
    );
    expect(() => parsers.parseBasicNote("#G7")).toThrow(
      new Error("Invalid format: #G7")
    );
    expect(() => parsers.parseBasicNote("g#7")).toThrow(
      new Error("Invalid format: g#7")
    );
    expect(() => parsers.parseBasicNote("C###4")).toThrow(
      new Error("Invalid format: C###4")
    );
    expect(() => parsers.parseBasicNote("Bbbb0")).toThrow(
      new Error("Invalid format: Bbbb0")
    );
    expect(() => parsers.parseBasicNote("##D")).toThrow(
      new Error("Invalid format: ##D")
    );
    expect(() => parsers.parseBasicNote("D9##")).toThrow(
      new Error("Invalid format: D9##")
    );
    expect(() => parsers.parseBasicNote("1Cbb")).toThrow(
      new Error("Invalid format: 1Cbb")
    );
    expect(() => parsers.parseBasicNote("4A")).toThrow(
      new Error("Invalid format: 4A")
    );
    expect(() => parsers.parseBasicNote("a3")).toThrow(
      new Error("Invalid format: a3")
    );
  });
});

describe("parseFullNote function", () => {
  it("should parse correcly", () => {
    expect(() => parsers.parseFullNote("C4")).not.toThrow();
    expect(() => parsers.parseFullNote("G7")).not.toThrow();
    expect(() => parsers.parseFullNote("C#4")).not.toThrow();
    expect(() => parsers.parseFullNote("Bb0")).not.toThrow();
    expect(() => parsers.parseFullNote("D##2")).not.toThrow();
    expect(() => parsers.parseFullNote("D##9")).not.toThrow();
    expect(() => parsers.parseFullNote("Cbb1")).not.toThrow();
    expect(() => parsers.parseFullNote("A4")).not.toThrow();
  });
  it("should throw errors", () => {
    expect(() => parsers.parseFullNote("C")).toThrow(
      new Error("Invalid format: C")
    );
    expect(() => parsers.parseFullNote("#G7")).toThrow(
      new Error("Invalid format: #G7")
    );
    expect(() => parsers.parseFullNote("g#7")).toThrow(
      new Error("Invalid format: g#7")
    );
    expect(() => parsers.parseFullNote("C###4")).toThrow(
      new Error("Invalid format: C###4")
    );
    expect(() => parsers.parseFullNote("Bbbb0")).toThrow(
      new Error("Invalid format: Bbbb0")
    );
    expect(() => parsers.parseFullNote("##D2")).toThrow(
      new Error("Invalid format: ##D2")
    );
    expect(() => parsers.parseFullNote("D9##")).toThrow(
      new Error("Invalid format: D9##")
    );
    expect(() => parsers.parseFullNote("1Cbb")).toThrow(
      new Error("Invalid format: 1Cbb")
    );
    expect(() => parsers.parseFullNote("4A")).toThrow(
      new Error("Invalid format: 4A")
    );
    expect(() => parsers.parseFullNote("a3")).toThrow(
      new Error("Invalid format: a3")
    );
  });
});
