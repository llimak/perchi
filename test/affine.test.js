const expect = require("chai").expect;
const { AffineCipher } = require("./../src/affine.js");

describe("AffineCipher", () => {
  it("encrypts a standard example", () => {
    expect(AffineCipher.encrypt("AFFINE CIPHER", 5, 8)).to.equal("IHHWVC SWFRCP");
  });

  it("decrypts a standard example", () => {
    expect(AffineCipher.decrypt("IHHWVC SWFRCP", 5, 8)).to.equal("AFFINE CIPHER");
  });

  it("preserves letter case", () => {
    const cipherText = AffineCipher.encrypt("Affine cipher", 5, 8);
    expect(cipherText).to.equal("Ihhwvc swfrcp");
    expect(AffineCipher.decrypt(cipherText, 5, 8)).to.equal("Affine cipher");
  });

  it("rejects a multiplier without a modular inverse", () => {
    expect(() => AffineCipher.encrypt("text", 2, 8)).to.throw(RangeError);
  });
});
