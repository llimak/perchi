/**
 * Abstract Class Cipher.
 *
 * @class Cipher
 */
class Cipher {
  static alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  static encrypt() {}

  static decrypt() {}

  static async encryptAsync(plainText, configShift, configAlphabet) {
    return this.encrypt(plainText, configShift, configAlphabet);
  }

  static async decryptAsync(cipherText, configShift, configAlphabet) {
    return this.decrypt(cipherText, configShift, configAlphabet);
  }
}

module.exports = { Cipher };
