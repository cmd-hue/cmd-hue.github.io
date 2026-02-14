/**
 * A simple seeded pseudo-random number generator (PRNG) using LCG algorithm.
 * This ensures that the same seed produces the same sequence of random numbers.
 * @param {number} seed The initial seed value.
 * @returns {function(): number} A function that returns a random number between 0 and 1.
 */
function createSeededRandom(seed) {
    // LCG parameters used by GCC
    const a = 1664525;
    const c = 1013904223;
    const m = 2**32; // 2^32

    return function() {
        seed = (a * seed + c) % m;
        return seed / m;
    };
}


/**
 * Applies corruption by offloading the work to a Web Worker.
 * @param {Uint8Array} originalData The original, uncorrupted data.
 * @param {object} settings The corruption settings.
 * @returns {Promise<Uint8Array>} A promise that resolves with the corrupted data.
 */
export function apply(originalData, settings) {
    return new Promise((resolve, reject) => {
        // Use a module worker to allow imports if needed in the future.
        const worker = new Worker('./corruption.worker.js', { type: 'module' });

        worker.onmessage = (event) => {
            if (event.data.success) {
                resolve(event.data.corruptedData);
            } else {
                reject(new Error(event.data.error || 'Corruption worker failed.'));
            }
            worker.terminate(); // Clean up the worker once done.
        };

        worker.onerror = (error) => {
            console.error('Corruption worker error:', error);
            reject(new Error(`Worker error: ${error.message}`));
            worker.terminate();
        };
        
        // Send data to the worker.
        // The ArrayBuffer of originalData is transferred, not copied, for performance.
        worker.postMessage({ originalData, settings }, [originalData.buffer]);
    });
}