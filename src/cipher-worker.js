const { parentPort, workerData } = require("worker_threads");
const ciphers = require("./index.js");

try {
  const CipherClass = ciphers[workerData.cipherName];
  if (!CipherClass || typeof CipherClass[workerData.method] !== "function") {
    throw new TypeError(`Unsupported cipher: ${workerData.cipherName}`);
  }

  parentPort.postMessage({
    result: CipherClass[workerData.method](...workerData.args),
  });
} catch (error) {
  parentPort.postMessage({
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
  });
} finally {
  parentPort.close();
}
