const { Cipher } = require("./../src/cipher.js");

class BaconCipher extends Cipher {
  static makeCipher(configAlphabet) {
    const alphabet = configAlphabet || this.alphabet;
    const result = [];
    for (let letterIndex = 0; letterIndex < alphabet.length; letterIndex++) {
      let binaryRepresentation = Number(letterIndex).toString(2);
      while (binaryRepresentation.length < 5) {
        binaryRepresentation = "0" + binaryRepresentation;
      }
      result.push(binaryRepresentation.replace(/0/g, "a").replace(/1/g, "b"));
    }
    return result;
  }

  static encrypt(plainText, configAlphabet) {
    const alphabet = configAlphabet || this.alphabet;
    const cipher = this.makeCipher(alphabet);
    const cleanPlainText = configAlphabet
      ? plainText
      : plainText.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    let cipherText = "";
    for (const letter of cleanPlainText) {
      const indexOfLetter = alphabet
        .toUpperCase()
        .indexOf(letter.toUpperCase());
      if (indexOfLetter < 0) {
        cipherText += letter;
      } else {
        const selectedLetter = cipher[indexOfLetter];
        cipherText +=
          letter === letter.toUpperCase()
            ? selectedLetter.toUpperCase()
            : selectedLetter.toLowerCase();
      }
    }
    return cipherText;
  }

  static decrypt(cipherText, configAlphabet) {
    const alphabet = configAlphabet || this.alphabet;
    const cipher = this.makeCipher(alphabet);
    let plainText = "";
    const chunkedCipherText = [];
    function checkIfCipherMember(character) {
      return ["A", "a", "B", "b"].indexOf(character) >= 0 ? true : false;
    }
    for (const character of cipherText) {
      if (
        !checkIfCipherMember(character) ||
        chunkedCipherText.length === 0 ||
        chunkedCipherText[chunkedCipherText.length - 1].length === 5 ||
        (chunkedCipherText[chunkedCipherText.length - 1].length === 1 &&
          !checkIfCipherMember(chunkedCipherText[chunkedCipherText.length - 1]))
      ) {
        chunkedCipherText.push(character);
      } else if (chunkedCipherText[chunkedCipherText.length - 1].length < 5) {
        chunkedCipherText[chunkedCipherText.length - 1] += character;
      }
    }

    for (const chunk of chunkedCipherText) {
      const indexOfLetter = cipher.findIndex(
        (x) => x.toUpperCase() === chunk.toUpperCase()
      );
      // plainText += chunkedWord[chunkIdx] === chunkedWord[chunkIdx].toUpperCase() ? alphabet[]
      if (indexOfLetter < 0) {
        plainText += chunk;
      } else {
        const selectedLetter = alphabet[indexOfLetter];
        plainText +=
          chunk === chunk.toUpperCase()
            ? selectedLetter.toUpperCase()
            : selectedLetter.toLowerCase();
      }
    }

    return plainText;
  }
}

module.exports = { BaconCipher };
