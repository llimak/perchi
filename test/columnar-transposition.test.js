const expect = require("chai").expect;
const {
  ColumnarTranspositionCipher,
} = require("./../src/columnar-transposition.js");

describe("ColumnarTranspositionCipher", () => {
  const plainText = "WEAREDISCOVEREDFLEEATONCE";
  const key = "ZEBRAS";
  const cipherText = "EVLNACDTESEAROFODEECWIREE";

  it("encrypts a standard example", () => {
    expect(ColumnarTranspositionCipher.encrypt(plainText, key)).to.equal(cipherText);
  });

  it("decrypts a standard example", () => {
    expect(ColumnarTranspositionCipher.decrypt(cipherText, key)).to.equal(plainText);
  });

  it("uses key position to break ties for duplicate key symbols", () => {
    const text = "A message with spaces.";
    const duplicateKey = "LETTER";
    expect(
      ColumnarTranspositionCipher.decrypt(
        ColumnarTranspositionCipher.encrypt(text, duplicateKey),
        duplicateKey
      )
    ).to.equal(text);
  });

  it("rejects an empty key", () => {
    expect(() => ColumnarTranspositionCipher.encrypt("text", "")).to.throw(TypeError);
  });
});
