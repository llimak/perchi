const { Cipher } = require("./cipher.js");

class PlayfairCipher extends Cipher {
  static alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";

  static encrypt(plainText, key, configAlphabet) {
    const square = this.#makeSquare(key, configAlphabet);
    const digraphs = this.#makeDigraphs(this.#normalize(plainText, square.alphabet), square);
    return digraphs
      .map(([left, right]) => this.#transformPair(left, right, square, 1))
      .join("");
  }

  static decrypt(cipherText, key, configAlphabet) {
    const square = this.#makeSquare(key, configAlphabet);
    const characters = this.#normalize(cipherText, square.alphabet);
    if (characters.length % 2 !== 0) {
      throw new RangeError("Playfair ciphertext must contain an even number of symbols");
    }
    const result = [];
    for (let index = 0; index < characters.length; index += 2) {
      result.push(this.#transformPair(characters[index], characters[index + 1], square, -1));
    }
    return result.join("");
  }

  static #makeSquare(key, configAlphabet) {
    const alphabet = (configAlphabet || this.alphabet).toUpperCase();
    const sideLength = Math.sqrt(alphabet.length);
    if (!Number.isInteger(sideLength) || new Set(alphabet).size !== alphabet.length) {
      throw new RangeError("Playfair alphabet must contain unique symbols in a square length");
    }
    const symbols = [];
    for (const character of `${key || ""}${alphabet}`.toUpperCase()) {
      if (alphabet.includes(character) && !symbols.includes(character)) {
        symbols.push(character);
      }
    }
    const positions = new Map(
      symbols.map((character, index) => [
        character,
        { row: Math.floor(index / sideLength), column: index % sideLength },
      ])
    );
    return { alphabet, symbols, positions, sideLength };
  }

  static #normalize(text, alphabet) {
    return [...text.normalize("NFD").replace(/\p{Diacritic}/gu, "")]
      .map((character) => {
        const normalizedCharacter = character.toUpperCase();
        return normalizedCharacter === "J" && !alphabet.includes("J") && alphabet.includes("I")
          ? "I"
          : normalizedCharacter;
      })
      .filter((character) => alphabet.includes(character));
  }

  static #makeDigraphs(characters, square) {
    const digraphs = [];
    const filler = square.alphabet.includes("X") ? "X" : square.alphabet[0];
    for (let index = 0; index < characters.length; ) {
      const left = characters[index];
      const right = characters[index + 1];
      if (!right) {
        digraphs.push([left, filler === left ? square.alphabet[1] : filler]);
        index++;
      } else if (left === right) {
        digraphs.push([left, filler === left ? square.alphabet[1] : filler]);
        index++;
      } else {
        digraphs.push([left, right]);
        index += 2;
      }
    }
    return digraphs;
  }

  static #transformPair(left, right, square, direction) {
    const leftPosition = square.positions.get(left);
    const rightPosition = square.positions.get(right);
    if (leftPosition.row === rightPosition.row) {
      return (
        square.symbols[leftPosition.row * square.sideLength + ((leftPosition.column + direction + square.sideLength) % square.sideLength)] +
        square.symbols[rightPosition.row * square.sideLength + ((rightPosition.column + direction + square.sideLength) % square.sideLength)]
      );
    }
    if (leftPosition.column === rightPosition.column) {
      return (
        square.symbols[((leftPosition.row + direction + square.sideLength) % square.sideLength) * square.sideLength + leftPosition.column] +
        square.symbols[((rightPosition.row + direction + square.sideLength) % square.sideLength) * square.sideLength + rightPosition.column]
      );
    }
    return (
      square.symbols[leftPosition.row * square.sideLength + rightPosition.column] +
      square.symbols[rightPosition.row * square.sideLength + leftPosition.column]
    );
  }
}

module.exports = { PlayfairCipher };
