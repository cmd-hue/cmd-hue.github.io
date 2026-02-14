// This new file contains the heavy processing logic that will run off the main thread.

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
 * Applies a specified corruption to a Uint8Array.
 * This function is designed to be run inside a Web Worker.
 * @param {Uint8Array} originalData The original, uncorrupted data.
 * @param {object} settings The corruption settings.
 * @param {string} settings.type The type of corruption ('delete', 'multiply', etc.).
 * @param {number} settings.amount The percentage of bytes to affect (0-100).
 * @param {number} settings.seed The seed for the random number generator.
 * @returns {Uint8Array} A new Uint8Array with the corruption applied.
 */
function apply(originalData, settings) {
    const { type, amount, seed } = settings;
    const corruptionChance = amount / 100;
    const totalBytes = originalData.length;
    const random = createSeededRandom(seed);

    // For all types, we work on a copy. Null Write now also modifies in-place.
    const corruptedData = new Uint8Array(originalData); // Work on a copy
    const numToCorrupt = Math.floor(totalBytes * corruptionChance);

    // Optimization: If the number of bytes to corrupt is small relative to the total size,
    // it's much faster to pick random indices than to iterate over every single byte.
    // We'll use this optimized path for corruption chances under 25%.
    const useIndexPickingStrategy = corruptionChance < 0.25 && numToCorrupt > 0;

    if (useIndexPickingStrategy) {
        // Efficiently corrupt a specific number of unique, random bytes.
        const corruptedIndices = new Set();
        // This loop is bounded by numToCorrupt, not totalBytes, making it fast for small percentages.
        // For low corruption amounts, collisions in the random index are rare.
        while (corruptedIndices.size < numToCorrupt) {
            const randomIndex = Math.floor(random() * totalBytes);
            corruptedIndices.add(randomIndex);
        }

        for (const i of corruptedIndices) {
            const byte = corruptedData[i];
            switch (type) {
                case 'null-write':
                    corruptedData[i] = 0;
                    break;
                case 'multiply':
                    // Multiply by a random factor between 2 and 5
                    corruptedData[i] = Math.min(255, byte * (2 + Math.floor(random() * 4)));
                    break;
                case 'divide':
                     // Divide by a random factor between 2 and 5
                     corruptedData[i] = Math.floor(byte / (2 + Math.floor(random() * 4)));
                    break;
                case 'shift-left':
                    // Shift left by a random amount from 1 to 4
                    corruptedData[i] = (byte << (1 + Math.floor(random() * 4))) & 255;
                    break;
                case 'shift-right':
                    // Shift right by a random amount from 1 to 4
                    corruptedData[i] = byte >> (1 + Math.floor(random() * 4));
                    break;
                case 'invert':
                    corruptedData[i] = 255 - byte;
                    break;
            }
        }
    } else if (numToCorrupt > 0) {
        // Fallback to the original method for high corruption percentages,
        // as it avoids the overhead of the Set and collision checks.
        for (let i = 0; i < totalBytes; i++) {
            if (random() < corruptionChance) {
                const byte = corruptedData[i];
                switch (type) {
                     case 'null-write':
                        corruptedData[i] = 0;
                        break;
                     case 'multiply':
                        corruptedData[i] = Math.min(255, byte * (2 + Math.floor(random() * 4)));
                        break;
                    case 'divide':
                        corruptedData[i] = Math.floor(byte / (2 + Math.floor(random() * 4)));
                        break;
                    case 'shift-left':
                        corruptedData[i] = (byte << (1 + Math.floor(random() * 4))) & 255;
                        break;
                    case 'shift-right':
                        corruptedData[i] = byte >> (1 + Math.floor(random() * 4));
                        break;
                    case 'invert':
                        corruptedData[i] = 255 - byte;
                        break;
                }
            }
        }
    }
    // If numToCorrupt is 0, we just return the copy without doing any work.

    return corruptedData;
}


// Listen for messages from the main thread
self.onmessage = (event) => {
    const { originalData, settings } = event.data;
    try {
        const corruptedData = apply(originalData, settings);
        // Post the result back, transferring ownership of the ArrayBuffer
        self.postMessage({ success: true, corruptedData }, [corruptedData.buffer]);
    } catch (error) {
        self.postMessage({ success: false, error: error.message });
    }
};