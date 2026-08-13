# perchi

<br/>

perchi is the implementation of ciphers like Caesar or Vigenère in JavaScript.

Name 'perchi' is anagram: **'perchi' = 'cipher'**

## Install

```
$ npm install perchi
```

<br/>

## Available ciphers

- CaesarCipher
- VigenereCipher
- AtbashCipher
- BaconCipher
- RailFenceCipher
- AffineCipher
- PlayfairCipher
- ColumnarTranspositionCipher

## Usage

You can use the perchi by`import`-ing the module:

```js
import CaesarCipher from "perchi";
```

or use `require`:

```js
const { CaesarCipher } = require("perchi");
```

It returns collections of utility `classes`. Each cipher implementation has `encrypt` and `decrypt` methods which are synchronous. For large input, use `encryptAsync` and `decryptAsync`; they run in a Node.js worker thread and return a `Promise`. Some of ciphers has implemented `breakCipher` functions that break the code for example by brute-force atack. By default ciphers implementations use the following alphabet: `ABCDEFGHIJKLMNOPQRSTUVWXYZ`.

Example of Caesar cipher with left shift of 3:

```js
CaesarCipher.encrypt("perchi is cool", -3);
// mbozef fp zlli

CaesarCipher.decrypt("mbozef fp zlli", -3);
// perchi is cool
```

Example of Atbash cipher with custom alphabet:

```js
const polishAlphabet = "aąbcćdeęfghijklłmnńoóprsśtuwyzźż";

AtbashCipher.encrypt("Zażółć gęślą jaźń", polishAlphabet);
// Bżaimw rśęnź ożąk

AtbashCipher.decrypt("Bżaimw rśęnź ożąk", polishAlphabet);
// Zażółć gęślą jaźń
```

## Additional ciphers

All ciphers in this package are educational classical ciphers, not secure encryption.

```js
const {
  RailFenceCipher,
  AffineCipher,
  PlayfairCipher,
  ColumnarTranspositionCipher,
} = require("perchi");

RailFenceCipher.encrypt("WEAREDISCOVEREDFLEEATONCE", 3);
// WECRLTEERDSOEEFEAOCAIVDEN

AffineCipher.encrypt("AFFINE CIPHER", 5, 8);
// IHHWVC SWFRCP

PlayfairCipher.encrypt("HIDETHEGOLDINTHETREESTUMP", "PLAYFAIR EXAMPLE");
// BMODZBXDNABEKUDMUIXMMOUVIF

ColumnarTranspositionCipher.encrypt("WEAREDISCOVEREDFLEEATONCE", "ZEBRAS");
// EVLNACDTESEAROFODEECWIREE
```

`RailFenceCipher` takes an integer rail count. `AffineCipher` takes a multiplier that must be coprime with the alphabet length and a shift. `ColumnarTranspositionCipher` preserves every input character and uses a non-empty key.

`PlayfairCipher` uses the standard 25-letter alphabet (`I` and `J` share a position), converts text to uppercase, ignores unsupported characters, and inserts `X` filler symbols for repeated or trailing letters. Decryption retains those filler symbols because it cannot reliably distinguish them from real `X` characters.

## Async performance

Run the reproducible benchmark with:

```sh
npm run benchmark:async
```

The asynchronous methods use a Node.js worker thread. This keeps the main event loop available, but a newly created worker has startup and message-transfer overhead. On Node.js v24.16.0, arm64 with 15 logical CPU cores, using a 5 MiB Caesar input and five samples, the median results were:

| Operation | Median time |
| --- | ---: |
| Synchronous completion | 253.4 ms |
| Async dispatch to worker | 0.4 ms |
| Async completion | 292.5 ms |

In every sample the event loop completed a `setImmediate` turn before the asynchronous cipher completed. Use `encryptAsync` and `decryptAsync` when main-thread responsiveness matters; use the synchronous methods for small inputs or when lowest completion latency matters.

## License

ISC © [KamilPopczyk](https://github.com/llimak)
