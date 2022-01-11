# cipher-js

<br/>

cipher-js is the implementation of ciphers like Caesar or Vigenère in JavaScript.

## Install

```
$ npm install cipher-js
```

<br/>

## Usage

You can use the cipher-js by`import`-ing the module:

```js
import cipher from "cipher-js";
```

or use `require`:

```js
const { cipher } = require("cipher-js");
```

It returns collections of utility `classes`. Each cipher implementation has `encrypt` and `decrypt` methods which are synchronous. If you expect time consuming computation for example encrypting/decrypting long text you can use asynchronous methods: `encryptAsync` and `decryptAsync`. Some of ciphers has implemented `breakCipher` functions that break the code for example by brute-force atack. By default ciphers implementations use the following alphabet: `ABCDEFGHIJKLMNOPQRSTUVWXYZ`.

Example of Caesar cipher with left shift of 3:

```js
cipher.CaesarCipher.encrypt("cipher-js is cool", -3);
// zfmebo-gp fp zlli

cipher.CaesarCipher.decrypt("zfmebo-gp fp zlli", -3);
// cipher-js is cool
```

Example of Atbash cipher with custom alphabet:

```js
const polishAlphabet = "aąbcćdeęfghijklłmnńoóprsśtuwyzźż";

cipher.AtbashCipher.encrypt("Zażółć gęślą jaźń", polishAlphabet);
// Bżaimw rśęnź ożąk

cipher.AtbashCipher.decrypt("Bżaimw rśęnź ożąk", polishAlphabet);
// Zażółć gęślą jaźń
```

## License

ISC © [KamilPopczyk](https://github.com/KamilPopczyk)
