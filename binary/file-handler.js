export function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            resolve(event.target.result);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsArrayBuffer(file);
    });
}

/**
 * Creates a Blob representing a WAV file from raw PCM data.
 * Supports sub-byte bit depths (1, 2, 4) by packing samples into bytes
 * using MSB-first ordering so the decoder (which reads MSB-first) matches.
 *
 * @param {Uint8Array} pcmData - The raw audio data (each input byte is treated as a sample value 0-255).
 * @param {object} params - Audio parameters.
 * @param {number} params.numChannels - Number of channels.
 * @param {number} params.sampleRate - Sample rate.
 * @param {number} params.bitDepth - Bit depth (1,2,4,8,16,24,32,64).
 * @returns {Blob} A blob that can be used to create a URL for downloading.
 */
export function createWavBlob(pcmData, params) {
    const { numChannels, sampleRate, bitDepth } = params;

    // For sub-byte depths (1,2,4) we need to pack samples into bytes.
    // For byte-aligned depths we write samples directly (after any necessary conversion).
    const bitsPerSample = bitDepth;
    const bytesPerSample = Math.max(1, Math.ceil(bitsPerSample / 8));
    const blockAlign = numChannels * bytesPerSample;
    let packedData;

    if (bitsPerSample < 8) {
        // Map each input byte (0..255) down to the smaller range (0..(2^bits -1)),
        // then pack samples MSB-first into bytes.
        const samplesPerByte = Math.floor(8 / bitsPerSample);
        const mask = (1 << bitsPerSample) - 1;

        const totalSamples = pcmData.length; // treat each input byte as one sample source
        const packedLength = Math.ceil(totalSamples / samplesPerByte);
        packedData = new Uint8Array(packedLength);

        let outIndex = 0;
        let bitPos = 8; // next free bit position in current output byte (start MSB)
        let currentByte = 0;

        for (let i = 0; i < totalSamples; i++) {
            // Reduce 8-bit sample to target bitDepth by shifting away low bits (MSB-preserving)
            const reduced = (pcmData[i] >> (8 - bitsPerSample)) & mask;

            // Place reduced sample into currentByte starting from MSB
            bitPos -= bitsPerSample;
            currentByte |= (reduced << bitPos);

            if (bitPos === 0) {
                packedData[outIndex++] = currentByte & 0xFF;
                currentByte = 0;
                bitPos = 8;
            }
        }

        // Flush remaining bits if any
        if (bitPos !== 8) {
            packedData[outIndex++] = currentByte & 0xFF;
        }

        // Trim to actual length in case of over-allocation
        if (outIndex !== packedData.length) {
            packedData = packedData.subarray(0, outIndex);
        }
    } else {
        // Byte-aligned or larger depths: for simplicity, write raw bytes as-is.
        // For 8-bit PCM we assume unsigned bytes already; for >8-bit the caller should supply properly formatted bytes.
        packedData = new Uint8Array(pcmData);
    }

    const dataSize = packedData.length;
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);

    // RIFF header
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true); // File size - 8
    writeString(view, 8, 'WAVE');

    // fmt chunk
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // Subchunk1Size for PCM
    view.setUint16(20, 1, true); // AudioFormat (1 for PCM)
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);

    // For sub-byte depths, byteRate/blockAlign still use bytesPerSample (rounded)
    const byteRate = sampleRate * blockAlign;
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);

    // data chunk
    writeString(view, 36, 'data');
    view.setUint32(40, dataSize, true);

    // Write PCM data
    const pcmDataView = new Uint8Array(buffer, 44);
    pcmDataView.set(packedData);

    return new Blob([view], { type: 'audio/wav' });
}

function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}