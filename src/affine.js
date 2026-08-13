const { Cipher } = require("./cipher.js");

class AffineCipher extends Cipher {
  static encrypt(plainText, multiplier, shift, configAlphabet) {
    const alphabet = configAlphabet || this.alphabet;
    const normalizedAlphabet = alphabet.toUpperCase();
    this.#validateMultiplier(multiplier, alphabet.length);
    const cleanPlainText = configAlphabet
      ? plainText
      : plainText.normalize("NFD").replace(/\p{Diacritic}/gu, "");

    return [...cleanPlainText]
      .map((character) => {
        const index = normalizedAlphabet.indexOf(character.toUpperCase());
        if (index < 0) {
          return character;
        }
        const selectedLetter = alphabet[this.#mod(multiplier * index + shift, alphabet.length)];
        return character === character.toUpperCase()
          ? selectedLetter.toUpperCase()
          : selectedLetter.toLowerCase();
      })
      .join("");
  }

  static decrypt(cipherText, multiplier, shift, configAlphabet) {
    const alphabet = configAlphabet || this.alphabet;
    const normalizedAlphabet = alphabet.toUpperCase();
    this.#validateMultiplier(multiplier, alphabet.length);
    const inverse = this.#multiplicativeInverse(multiplier, alphabet.length);

    return [...cipherText]
      .map((character) => {
        const index = normalizedAlphabet.indexOf(character.toUpperCase());
        if (index < 0) {
          return character;
        }
        const selectedLetter =
          alphabet[this.#mod(inverse * (index - shift), alphabet.length)];
        return character === character.toUpperCase()
          ? selectedLetter.toUpperCase()
          : selectedLetter.toLowerCase();
      })
      .join("");
  }

  static #validateMultiplier(multiplier, alphabetLength) {
    if (!Number.isInteger(multiplier) || this.#gcd(multiplier, alphabetLength) !== 1) {
      throw new RangeError("Multiplier must be coprime with the alphabet length");
    }
  }

  static #multiplicativeInverse(multiplier, modulus) {
    for (let candidate = 1; candidate < modulus; candidate++) {
      if (this.#mod(multiplier * candidate, modulus) === 1) {
        return candidate;
      }
    }
  }

  static #gcd(left, right) {
    let a = Math.abs(left);
    let b = Math.abs(right);
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  }

  static #mod(value, modulus) {
    return ((value % modulus) + modulus) % modulus;
  }
}

module.exports = { AffineCipher };
