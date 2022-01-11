const expect = require("chai").expect;
const { AtbashCipher } = require("./../src/atbash.js");

describe("AtbashCipher cipher", () => {
  const polishAlphabet = "aąbcćdeęfghijklłmnńoóprsśtuwyzźż";
  describe("encrypt", () => {
    it("simple case", () => {
      expect(AtbashCipher.encrypt("Atbash is simple.")).to.equal(
        "Zgyzhs rh hrnkov."
      );
    });
    it("custom alphabet", () => {
      expect(
        AtbashCipher.encrypt("Zażółć gęślą jaźń", polishAlphabet)
      ).to.equal("Bżaimw rśęnź ożąk");
    });
  });
  describe("decrypt", () => {
    it("simple case", () => {
      expect(AtbashCipher.decrypt("Zgyzhs rh hrnkov.")).to.equal(
        "Atbash is simple."
      );
    });
    it("custom alphabet", () => {
      expect(
        AtbashCipher.decrypt("Zażółć gęślą jaźń", polishAlphabet)
      ).to.equal("Bżaimw rśęnź ożąk");
    });
  });
});
