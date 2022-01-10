const { Cipher } = require("./../src/cipher.js");

class CaesarCipher extends Cipher {
  static makeCipher(alphabet, shiftConfig) {
    const shift =
      (shiftConfig < 0 ? alphabet.length + shiftConfig : shiftConfig) %
      alphabet.length;
    return (
      alphabet.substring(shift, alphabet.length) + alphabet.substring(0, shift)
    );
  }

  static encrypt(plainText, configShift, configAlphabet) {
    const alphabet = configAlphabet || this.alphabet;
    const cipher = this.makeCipher(alphabet, configShift);
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

  static decrypt(cipherText, configShift, configAlphabet) {
    return this.encrypt(cipherText, -configShift, configAlphabet);
  }

  static async breakCipher(cipherText, configAlphabet) {
    const alphabet = configAlphabet || this.alphabet;
    const resultPromises = [];
    for (let shift = 1; shift < alphabet.length; shift++) {
      resultPromises.push(this.decryptAsync(cipherText, shift, configAlphabet));
    }
    return Promise.all(resultPromises);
  }
}

module.exports = { CaesarCipher };
