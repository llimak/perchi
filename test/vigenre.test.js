const expect = require("chai").expect;
const { VigenereCipher } = require("./../src/vigenere.js");

describe("vigenre cipher", () => {
  describe("encrypt", () => {
    it("simple case", () => {
      expect(VigenereCipher.encrypt("ATTACKATDAWN", "LEMONLEMONLE")).to.equal(
        "LXFOPVEFRNHR"
      );
    });
    it("key is shorter than plaintext", () => {
      expect(VigenereCipher.encrypt("ATTACKATDAWN", "LEMON")).to.equal(
        "LXFOPVEFRNHR"
      );
    });
    it("plaintext has space", () => {
      expect(VigenereCipher.encrypt("CIPHERJS IS COOL", "UNITEST")).to.equal(
        "WVXAIJCM QL UHIY"
      );
    });
    it("plaintext has space", () => {
      expect(VigenereCipher.encrypt("CIPHERJS IS COOL", "UNITEST")).to.equal(
        "WVXAIJCM QL UHIY"
      );
    });
    it("respect letter case", () => {
      expect(VigenereCipher.encrypt("CIPHERJS is COOL", "UNITEST")).to.equal(
        "WVXAIJCM ql UHIY"
      );
    });
  });
  describe("decrypt", () => {
    it("simple case", () => {
      expect(VigenereCipher.decrypt("LXFOPVEFRNHR", "LEMONLEMONLE")).to.equal(
        "ATTACKATDAWN"
      );
    });
    it("key is shorter than plaintext", () => {
      expect(VigenereCipher.decrypt("LXFOPVEFRNHR", "LEMON")).to.equal(
        "ATTACKATDAWN"
      );
    });
    it("plaintext has space", () => {
      expect(VigenereCipher.decrypt("WVXAIJCM QL UHIY", "UNITEST")).to.equal(
        "CIPHERJS IS COOL"
      );
    });
  });
});
