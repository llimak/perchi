const path = require("path");
const { Worker } = require("worker_threads");

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
    return Cipher.#runInWorker(this.name, "encrypt", [
      plainText,
      configShift,
      configAlphabet,
    ]);
  }

  static async decryptAsync(cipherText, configShift, configAlphabet) {
    return Cipher.#runInWorker(this.name, "decrypt", [
      cipherText,
      configShift,
      configAlphabet,
    ]);
  }

  static #runInWorker(cipherName, method, args) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(path.join(__dirname, "cipher-worker.js"), {
        workerData: { cipherName, method, args },
      });
      let settled = false;

      const settle = (callback, value) => {
        if (!settled) {
          settled = true;
          callback(value);
        }
      };

      worker.once("message", ({ result, error }) => {
        if (error) {
          const errorTypes = {
            Error,
            EvalError,
            RangeError,
            ReferenceError,
            SyntaxError,
            TypeError,
            URIError,
          };
          const WorkerError = errorTypes[error.name] || Error;
          const workerError = new WorkerError(error.message);
          workerError.name = error.name;
          workerError.stack = error.stack || workerError.stack;
          settle(reject, workerError);
        } else {
          settle(resolve, result);
        }
      });
      worker.once("error", (error) => settle(reject, error));
      worker.once("exit", (code) => {
        if (code !== 0) {
          settle(reject, new Error(`Cipher worker stopped with exit code ${code}`));
        }
      });
    });
  }
}

module.exports = { Cipher };
