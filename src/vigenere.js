const { Cipher } = require("./../src/cipher.js");

class VigenereCipher extends Cipher {
  static encrypt(plainText, key, configAlphabet) {
    const alphabet = configAlphabet || this.alphabet;
    const cleanPlainText = configAlphabet
      ? plainText
      : plainText.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    let cipherText = "";
    for (
      let letterIndex = 0;
      letterIndex < cleanPlainText.length;
      letterIndex++
    ) {
      const indexOfLetterInAlphabet = alphabet
        .toUpperCase()
        .indexOf(cleanPlainText[letterIndex].toUpperCase());
      const indexOfLetterInKey = alphabet.indexOf(
        key[letterIndex % key.length]
      );
      if (indexOfLetterInAlphabet < 0) {
        cipherText += cleanPlainText[letterIndex];
      } else {
        const selectedLetter =
          alphabet[
            (indexOfLetterInAlphabet + indexOfLetterInKey) % alphabet.length
          ];
        cipherText +=
          plainText[letterIndex] === plainText[letterIndex].toUpperCase()
            ? selectedLetter.toUpperCase()
            : selectedLetter.toLowerCase();
      }
    }
    return cipherText;
  }

  static decrypt(cipherText, key, configAlphabet) {
    const alphabet = configAlphabet || this.alphabet;
    let plainText = "";
    for (let letterIndex = 0; letterIndex < cipherText.length; letterIndex++) {
      const indexOfLetterInAlphabet = alphabet.indexOf(cipherText[letterIndex]);
      const indexOfLetterInKey = alphabet.indexOf(
        key[letterIndex % key.length]
      );
      if (indexOfLetterInAlphabet < 0) {
        plainText += cipherText[letterIndex];
      } else {
        plainText +=
          alphabet[
            (indexOfLetterInAlphabet - indexOfLetterInKey + alphabet.length) %
              alphabet.length
          ];
      }
    }
    return plainText;
  }
}

module.exports = { VigenereCipher };
