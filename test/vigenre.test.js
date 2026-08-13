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
    it("accepts lowercase plaintext and key", () => {
      expect(VigenereCipher.encrypt("attack", "lemon")).to.equal("lxfopv");
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
    it("decrypts lowercase ciphertext", () => {
      expect(VigenereCipher.decrypt("lxfopv", "lemon")).to.equal("attack");
    });
    it("round-trips lowercase plaintext and key", () => {
      const plainText = "attack at dawn";
      const key = "lemon";
      expect(VigenereCipher.decrypt(VigenereCipher.encrypt(plainText, key), key)).to.equal(
        plainText
      );
    });
  });
  describe("async methods", () => {
    it("preserves Vigenere key alignment across long text", async () => {
      const plainText = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".repeat(3);
      const key = "LEMON";
      expect(await VigenereCipher.encryptAsync(plainText, key)).to.equal(
        VigenereCipher.encrypt(plainText, key)
      );
    });
  });
});
