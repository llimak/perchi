const expect = require("chai").expect;
const { RailFenceCipher } = require("./../src/rail-fence.js");

describe("RailFenceCipher", () => {
  const plainText = "WEAREDISCOVEREDFLEEATONCE";
  const cipherText = "WECRLTEERDSOEEFEAOCAIVDEN";

  it("encrypts a standard three-rail example", () => {
    expect(RailFenceCipher.encrypt(plainText, 3)).to.equal(cipherText);
  });

  it("decrypts a standard three-rail example", () => {
    expect(RailFenceCipher.decrypt(cipherText, 3)).to.equal(plainText);
  });

  it("rejects invalid rail counts", () => {
    expect(() => RailFenceCipher.encrypt("text", 1)).to.throw(RangeError);
  });
});
