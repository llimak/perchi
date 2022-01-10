const expect = require("chai").expect;
const { CaesarCipher } = require("./../src/caesar.js");

describe("CaesarCipher cipher", () => {
  describe("default alphabet", () => {
    describe("makeCipher", () => {
      it("right rotation of three places", () => {
        expect(
          CaesarCipher.makeCipher("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 3)
        ).to.equal("DEFGHIJKLMNOPQRSTUVWXYZABC");
      });
      it("right rotation of three places over alphabet length", () => {
        expect(
          CaesarCipher.makeCipher("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 29)
        ).to.equal("DEFGHIJKLMNOPQRSTUVWXYZABC");
      });
      it("left rotation of three places", () => {
        expect(
          CaesarCipher.makeCipher("ABCDEFGHIJKLMNOPQRSTUVWXYZ", -3)
        ).to.equal("XYZABCDEFGHIJKLMNOPQRSTUVW");
      });
    });
    describe("encrypt", () => {
      it("left rotation of three places", () => {
        expect(
          CaesarCipher.encrypt(
            "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG",
            -3
          )
        ).to.equal("QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD");
      });
      it("rotation of zero places", () => {
        expect(
          CaesarCipher.encrypt("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG", 0)
        ).to.equal("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG");
      });
      it("right rotation of three places", () => {
        expect(
          CaesarCipher.encrypt("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG", 3)
        ).to.equal("WKH TXLFN EURZQ IRA MXPSV RYHU WKH ODCB GRJ");
      });
      it("respect letter case", () => {
        expect(
          CaesarCipher.encrypt("The Quick BROWN FOX JUMPS OVER THE LAZY DOG", 3)
        ).to.equal("Wkh Txlfn EURZQ IRA MXPSV RYHU WKH ODCB GRJ");
      });
    });
    describe("decrypt", () => {
      it("left rotation of three places", () => {
        expect(
          CaesarCipher.decrypt(
            "QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD",
            -3
          )
        ).to.equal("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG");
      });
      it("rotation of zero places", () => {
        expect(
          CaesarCipher.decrypt("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG", 0)
        ).to.equal("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG");
      });
      it("right rotation of three places", () => {
        expect(
          CaesarCipher.decrypt("WKH TXLFN EURZQ IRA MXPSV RYHU WKH ODCB GRJ", 3)
        ).to.equal("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG");
      });
      it("respect letter case", () => {
        expect(
          CaesarCipher.decrypt("Wkh Txlfn EURZQ IRA MXPSV RYHU WKH ODCB GRJ", 3)
        ).to.equal("The Quick BROWN FOX JUMPS OVER THE LAZY DOG");
      });
    });
    describe("decrypt", () => {
      it("left rotation of three places", async () => {
        const result = await CaesarCipher.decrypt(
          "QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD",
          -3
        );
        expect(result).to.equal("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG");
      });
    });
    describe("breakCode", () => {
      it("left rotation of three places", async () => {
        const result = await CaesarCipher.breakCipher(
          "QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD"
        );
        expect(
          result.findIndex(
            (x) => x === "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG"
          )
        ).to.be.above(-1);
      });
      it("right rotation of three places", async () => {
        const result = await CaesarCipher.breakCipher(
          "WKH TXLFN EURZQ IRA MXPSV RYHU WKH ODCB GRJ"
        );
        expect(
          result.findIndex(
            (x) => x === "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG"
          )
        ).to.be.above(-1);
      });
    });
  });
  describe("custom alphabet - polish", () => {
    const polishAlphabet = "aąbcćdeęfghijklłmnńoóprsśtuwyzźż";
    it("left rotation of three places", () => {
      expect(
        CaesarCipher.encrypt("zażółć gęślą jaźń", -3, polishAlphabet)
      ).to.equal("uzynją ećpiź gzwł");
    });
    it("rotation of zero places", () => {
      expect(
        CaesarCipher.encrypt("zażółć gęślą jaźń", 0, polishAlphabet)
      ).to.equal("zażółć gęślą jaźń");
    });
    it("right rotation of three places", () => {
      expect(
        CaesarCipher.encrypt("zażółć gęślą jaźń", 3, polishAlphabet)
      ).to.equal("acbsńę jhwnć łcąp");
    });
  });
  describe("large text", () => {
    const example = require("./assets/caesar.json");
    it("async encrypt function", async () => {
      expect(
        await CaesarCipher.encryptAsync(example.loremipsum.plainText, 3)
      ).to.equal(example.loremipsum.encrypted);
    });
    it("async decrypt function", async () => {
      expect(
        await CaesarCipher.decryptAsync(example.loremipsum.encrypted, 3)
      ).to.equal(example.loremipsum.plainText);
    });
  });
});
