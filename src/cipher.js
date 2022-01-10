/**
 * Abstract Class Cipher.
 *
 * @class Cipher
 */
class Cipher {
  static alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  static encrypt() {}

  static decrypt() {}

  static #chunkSubstr(str, size) {
    const numChunks = Math.ceil(str.length / size);
    const chunks = new Array(numChunks);

    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
      chunks[i] = str.substr(o, size);
    }

    return chunks;
  }

  static async encryptAsync(plainText, configShift, configAlphabet) {
    const plainTextChunks = Cipher.#chunkSubstr(plainText, 32);
    const cipherTextChunks = await Promise.all(
      plainTextChunks.map((plainTextChunk) =>
        this.encrypt(plainTextChunk, configShift, configAlphabet)
      )
    );
    return cipherTextChunks.join("");
  }

  static async decryptAsync(cipherText, configShift, configAlphabet) {
    const cipherTextChunks = Cipher.#chunkSubstr(cipherText, 32);
    const plainTextChunks = await Promise.all(
      cipherTextChunks.map((cipherTextChunk) =>
        this.decrypt(cipherTextChunk, configShift, configAlphabet)
      )
    );
    return plainTextChunks.join("");
  }
}

module.exports = { Cipher };
