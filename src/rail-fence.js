const { Cipher } = require("./cipher.js");

class RailFenceCipher extends Cipher {
  static encrypt(plainText, railCount) {
    this.#validateRailCount(railCount);
    if (plainText.length <= railCount) {
      return plainText;
    }

    const rails = Array.from({ length: railCount }, () => "");
    let railIndex = 0;
    let direction = 1;
    for (const character of plainText) {
      rails[railIndex] += character;
      if (railIndex === 0) {
        direction = 1;
      } else if (railIndex === railCount - 1) {
        direction = -1;
      }
      railIndex += direction;
    }
    return rails.join("");
  }

  static decrypt(cipherText, railCount) {
    this.#validateRailCount(railCount);
    if (cipherText.length <= railCount) {
      return cipherText;
    }

    const railPattern = [];
    let railIndex = 0;
    let direction = 1;
    for (let index = 0; index < cipherText.length; index++) {
      railPattern.push(railIndex);
      if (railIndex === 0) {
        direction = 1;
      } else if (railIndex === railCount - 1) {
        direction = -1;
      }
      railIndex += direction;
    }

    const railLengths = Array(railCount).fill(0);
    for (const rail of railPattern) {
      railLengths[rail]++;
    }
    const rails = [];
    let offset = 0;
    for (const length of railLengths) {
      rails.push(cipherText.slice(offset, offset + length));
      offset += length;
    }

    const railOffsets = Array(railCount).fill(0);
    return railPattern
      .map((rail) => rails[rail][railOffsets[rail]++])
      .join("");
  }

  static #validateRailCount(railCount) {
    if (!Number.isInteger(railCount) || railCount < 2) {
      throw new RangeError("Rail count must be an integer of at least 2");
    }
  }
}

module.exports = { RailFenceCipher };
