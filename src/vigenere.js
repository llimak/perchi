const { Cipher } = require("./../src/cipher.js");

class VigenereCipher extends Cipher {
  static encrypt(plainText, key, configAlphabet) {
    const alphabet = configAlphabet || this.alphabet;
    const normalizedAlphabet = alphabet.toUpperCase();
    const cleanPlainText = configAlphabet
      ? plainText
      : plainText.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    let cipherText = "";
    for (
      let letterIndex = 0;
      letterIndex < cleanPlainText.length;
      letterIndex++
    ) {
      const indexOfLetterInAlphabet = normalizedAlphabet.indexOf(
        cleanPlainText[letterIndex].toUpperCase()
      );
      const indexOfLetterInKey = normalizedAlphabet.indexOf(
        key[letterIndex % key.length].toUpperCase()
      );
      if (indexOfLetterInAlphabet < 0) {
        cipherText += cleanPlainText[letterIndex];
      } else {
        const selectedLetter =
          alphabet[
            (indexOfLetterInAlphabet + indexOfLetterInKey) % alphabet.length
          ];
        if (selectedLetter) {
          cipherText +=
            cleanPlainText[letterIndex] ===
            cleanPlainText[letterIndex].toUpperCase()
              ? selectedLetter.toUpperCase()
              : selectedLetter.toLowerCase();
        }
      }
    }
    return cipherText;
  }

  static decrypt(cipherText, key, configAlphabet) {
    const alphabet = configAlphabet || this.alphabet;
    const normalizedAlphabet = alphabet.toUpperCase();
    let plainText = "";
    for (let letterIndex = 0; letterIndex < cipherText.length; letterIndex++) {
      const indexOfLetterInAlphabet = normalizedAlphabet.indexOf(
        cipherText[letterIndex].toUpperCase()
      );
      const indexOfLetterInKey = normalizedAlphabet.indexOf(
        key[letterIndex % key.length].toUpperCase()
      );
      if (indexOfLetterInAlphabet < 0) {
        plainText += cipherText[letterIndex];
      } else {
        const selectedLetter =
          alphabet[
            (indexOfLetterInAlphabet - indexOfLetterInKey + alphabet.length) %
              alphabet.length
          ];
        plainText +=
          cipherText[letterIndex] === cipherText[letterIndex].toUpperCase()
            ? selectedLetter.toUpperCase()
            : selectedLetter.toLowerCase();
      }
    }
    return plainText;
  }
}

module.exports = { VigenereCipher };
