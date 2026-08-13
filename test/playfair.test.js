const expect = require("chai").expect;
const { PlayfairCipher } = require("./../src/playfair.js");

describe("PlayfairCipher", () => {
  const key = "PLAYFAIR EXAMPLE";
  const plainText = "HIDETHEGOLDINTHETREESTUMP";
  const cipherText = "BMODZBXDNABEKUDMUIXMMOUVIF";

  it("encrypts a standard example", () => {
    expect(PlayfairCipher.encrypt(plainText, key)).to.equal(cipherText);
  });

  it("decrypts a standard example", () => {
    expect(PlayfairCipher.decrypt(cipherText, key)).to.equal(
      "HIDETHEGOLDINTHETREXESTUMP"
    );
  });

  it("inserts a filler between repeated letters", () => {
    const encrypted = PlayfairCipher.encrypt("BALLOON", "MONARCHY");
    expect(PlayfairCipher.decrypt(encrypted, "MONARCHY")).to.equal("BALXLOON");
  });

  it("normalizes J to I with the default alphabet", () => {
    expect(PlayfairCipher.encrypt("JAM", key)).to.equal(
      PlayfairCipher.encrypt("IAM", key)
    );
  });

  it("rejects ciphertext with an incomplete digraph", () => {
    expect(() => PlayfairCipher.decrypt("ABC", key)).to.throw(RangeError);
  });
});
