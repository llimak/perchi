const { Cipher } = require("./../src/cipher.js");

class AtbashCipher extends Cipher {
  static encrypt(plainText, configAlphabet) {
    const alphabet = configAlphabet || this.alphabet;
    const reversedAlphabet = alphabet.split("").reverse().join("");
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
        const selectedLetter = reversedAlphabet[indexOfLetter];
        cipherText +=
          letter === letter.toUpperCase()
            ? selectedLetter.toUpperCase()
            : selectedLetter.toLowerCase();
      }
    }
    return cipherText;
  }

  static decrypt(plainText, configAlphabet) {
    return this.encrypt(plainText, configAlphabet);
  }
}

module.exports = { AtbashCipher };
