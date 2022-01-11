const expect = require("chai").expect;
const { BaconCipher } = require("./../src/bacon.js");

describe("BaconCipher cipher", () => {
  const polishAlphabet = "aąbcćdeęfghijklłmnńoóprsśtuwyzźż";
  describe("makeCipher", () => {
    it("default alphabet", () => {
      expect(BaconCipher.makeCipher()).to.deep.equal([
        "aaaaa",
        "aaaab",
        "aaaba",
        "aaabb",
        "aabaa",
        "aabab",
        "aabba",
        "aabbb",
        "abaaa",
        "abaab",
        "ababa",
        "ababb",
        "abbaa",
        "abbab",
        "abbba",
        "abbbb",
        "baaaa",
        "baaab",
        "baaba",
        "baabb",
        "babaa",
        "babab",
        "babba",
        "babbb",
        "bbaaa",
        "bbaab",
      ]);
    });
    it("custom alphabet", () => {
      expect(BaconCipher.makeCipher(polishAlphabet)).to.deep.equal([
        "aaaaa",
        "aaaab",
        "aaaba",
        "aaabb",
        "aabaa",
        "aabab",
        "aabba",
        "aabbb",
        "abaaa",
        "abaab",
        "ababa",
        "ababb",
        "abbaa",
        "abbab",
        "abbba",
        "abbbb",
        "baaaa",
        "baaab",
        "baaba",
        "baabb",
        "babaa",
        "babab",
        "babba",
        "babbb",
        "bbaaa",
        "bbaab",
        "bbaba",
        "bbabb",
        "bbbaa",
        "bbbab",
        "bbbba",
        "bbbbb",
      ]);
    });
  });
  describe("encrypt", () => {
    it("simple case", () => {
      expect(
        BaconCipher.encrypt(
          "To encode a message each letter of the plaintext is replaced by a group of five of the letters 'A' or 'B'."
        )
      ).to.equal(
        "BAABBabbba aabaaabbabaaabaabbbaaaabbaabaa aaaaa abbaaaabaabaababaabaaaaaaaabbaaabaa aabaaaaaaaaaabaaabbb ababbaabaabaabbbaabbaabaabaaab abbbaaabab baabbaabbbaabaa abbbbababbaaaaaabaaaabbabbaabbaabaababbbbaabb abaaabaaba baaabaabaaabbbbababbaaaaaaaabaaabaaaaabb aaaabbbaaa aaaaa aabbabaaababbbababaaabbbb abbbaaabab aabababaaabababaabaa abbbaaabab baabbaabbbaabaa ababbaabaabaabbbaabbaabaabaaabbaaba 'AAAAA' abbbabaaab 'AAAAB'."
      );
    });
    it("custom alphabet", () => {
      expect(BaconCipher.encrypt("Zażółć gęślą jaźń", polishAlphabet)).to.equal(
        "BBBABaaaaabbbbbbabaaabbbbaabaa abaabaabbbbbaaaabbbaaaaab abbaaaaaaabbbbabaaba"
      );
    });
  });
  describe("decrypt", () => {
    it("simple case", () => {
      expect(
        BaconCipher.decrypt(
          "BAABBabbba aabaaabbabaaabaabbbaaaabbaabaa aaaaa abbaaaabaabaababaabaaaaaaaabbaaabaa aabaaaaaaaaaabaaabbb ababbaabaabaabbbaabbaabaabaaab abbbaaabab baabbaabbbaabaa abbbbababbaaaaaabaaaabbabbaabbaabaababbbbaabb abaaabaaba baaabaabaaabbbbababbaaaaaaaabaaabaaaaabb aaaabbbaaa aaaaa aabbabaaababbbababaaabbbb abbbaaabab aabababaaabababaabaa abbbaaabab baabbaabbbaabaa ababbaabaabaabbbaabbaabaabaaabbaaba 'AAAAA' abbbabaaab 'AAAAB'."
        )
      ).to.equal(
        "To encode a message each letter of the plaintext is replaced by a group of five of the letters 'A' or 'B'."
      );
    });
    it("custom alphabet", () => {
      expect(
        BaconCipher.decrypt(
          "BBBABaaaaabbbbbbabaaabbbbaabaa abaabaabbbbbaaaabbbaaaaab abbaaaaaaabbbbabaaba",
          polishAlphabet
        )
      ).to.equal("Zażółć gęślą jaźń");
    });
  });
});
