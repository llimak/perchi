const { Cipher } = require("./cipher.js");

class ColumnarTranspositionCipher extends Cipher {
  static encrypt(plainText, key) {
    const order = this.#columnOrder(key);
    const columns = Array.from({ length: key.length }, () => "");
    for (let index = 0; index < plainText.length; index++) {
      columns[index % key.length] += plainText[index];
    }
    return order.map((index) => columns[index]).join("");
  }

  static decrypt(cipherText, key) {
    const order = this.#columnOrder(key);
    const fullRows = Math.floor(cipherText.length / key.length);
    const remainder = cipherText.length % key.length;
    const columnLengths = Array.from(
      { length: key.length },
      (_, index) => fullRows + (index < remainder ? 1 : 0)
    );
    const columns = Array(key.length);
    let offset = 0;
    for (const index of order) {
      columns[index] = cipherText.slice(offset, offset + columnLengths[index]);
      offset += columnLengths[index];
    }

    let plainText = "";
    for (let row = 0; row <= fullRows; row++) {
      for (let column = 0; column < key.length; column++) {
        plainText += columns[column][row] || "";
      }
    }
    return plainText;
  }

  static #columnOrder(key) {
    if (typeof key !== "string" || key.length === 0) {
      throw new TypeError("Columnar transposition key must be a non-empty string");
    }
    return [...key]
      .map((character, index) => ({ character, index }))
      .sort((left, right) => {
        if (left.character === right.character) {
          return left.index - right.index;
        }
        return left.character < right.character ? -1 : 1;
      })
      .map(({ index }) => index);
  }
}

module.exports = { ColumnarTranspositionCipher };
