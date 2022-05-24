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

## Usage

You can use the perchi by`import`-ing the module:

```js
import CaesarCipher from "perchi";
```

or use `require`:

```js
const { CaesarCipher } = require("perchi");
```

It returns collections of utility `classes`. Each cipher implementation has `encrypt` and `decrypt` methods which are synchronous. If you expect time consuming computation for example encrypting/decrypting long text you can use asynchronous methods: `encryptAsync` and `decryptAsync`. Some of ciphers has implemented `breakCipher` functions that break the code for example by brute-force atack. By default ciphers implementations use the following alphabet: `ABCDEFGHIJKLMNOPQRSTUVWXYZ`.

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

## License

ISC © [KamilPopczyk](https://github.com/llimak)
