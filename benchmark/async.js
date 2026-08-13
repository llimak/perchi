const os = require("os");
const { performance } = require("perf_hooks");
const { CaesarCipher } = require("../src");

const INPUT_SIZE_BYTES = 5 * 1024 * 1024;
const SAMPLES = 5;
const input = "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG. "
  .repeat(Math.ceil(INPUT_SIZE_BYTES / 45))
  .slice(0, INPUT_SIZE_BYTES);

function median(values) {
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.floor(sorted.length / 2)];
}

async function runSample() {
  const syncStartedAt = performance.now();
  const synchronousResult = CaesarCipher.encrypt(input, 3);
  const syncMs = performance.now() - syncStartedAt;

  const asyncStartedAt = performance.now();
  const asyncResultPromise = CaesarCipher.encryptAsync(input, 3);
  const dispatchMs = performance.now() - asyncStartedAt;
  const eventLoopTurned = await Promise.race([
    asyncResultPromise.then(() => false),
    new Promise((resolve) => setImmediate(() => resolve(true))),
  ]);
  const asynchronousResult = await asyncResultPromise;
  const asyncMs = performance.now() - asyncStartedAt;

  if (synchronousResult !== asynchronousResult) {
    throw new Error("Synchronous and asynchronous results differ");
  }

  return { syncMs, dispatchMs, asyncMs, eventLoopTurned };
}

(async () => {
  const samples = [];
  for (let sampleIndex = 0; sampleIndex < SAMPLES; sampleIndex++) {
    samples.push(await runSample());
  }

  console.log(`Node: ${process.version}`);
  console.log(`CPU: ${os.cpus().length} logical cores (${os.arch()})`);
  console.log(`Input: ${INPUT_SIZE_BYTES / 1024 / 1024} MiB Caesar ciphertext`);
  console.log(`Samples: ${SAMPLES}`);
  console.table({
    "sync completion (median ms)": median(samples.map((sample) => sample.syncMs)).toFixed(1),
    "async dispatch (median ms)": median(
      samples.map((sample) => sample.dispatchMs)
    ).toFixed(1),
    "async completion (median ms)": median(
      samples.map((sample) => sample.asyncMs)
    ).toFixed(1),
    "event loop turned before async completion": samples.every(
      (sample) => sample.eventLoopTurned
    ),
  });
})();
