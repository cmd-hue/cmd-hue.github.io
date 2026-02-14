let audioContext;
let mainGainNode;

// --- Playback State ---

let decodedAudioBuffer = null;
let playbackSourceNode = null;
let isPlaybackPaused = false;
let playbackStartTime = 0; // Time in the buffer where playback should start
let audioContextStartTime = 0; // audioContext.currentTime when playback started/resumed

// --- New State for Syncing ---
let playbackParams = null;

function initAudioContext() {
    if (!audioContext) {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            mainGainNode = audioContext.createGain();
            mainGainNode.connect(audioContext.destination);
            mainGainNode.gain.value = 0.3;

        } catch (e) {
            console.error("Web Audio API is not supported in this browser");
        }
    }
}

/**
 * Parses a WAV file to find audio parameters and data location.
 * This is a simplified parser that looks for 'fmt ' and 'data' chunks.
 * @param {DataView} dataView - The DataView of the file buffer.
 * @returns {object|null} An object with audio parameters or null if not a valid WAV.
 */
function parseWavHeader(dataView) {
    // A more robust check might be needed for malformed files, but for typical
    // WAV files, we can look for the chunks.
    if (dataView.byteLength < 44) {
        return null; // Not enough data for a standard header
    }

    // A loose check for RIFF/WAVE. Some files might not have it.
    const isRiffWave = dataView.getUint32(0, true) === 0x52494646 && // "RIFF"
                       dataView.getUint32(8, true) === 0x57415645;  // "WAVE"

    let fmtChunk = null;
    let dataChunkInfo = null;
    let foundFmt = false;
    let foundData = false;

    // Start searching for chunks. If it's a RIFF file, start after the header.
    // Otherwise, start from the beginning.
    let offset = isRiffWave ? 12 : 0;

    while (offset < dataView.byteLength - 8) {
        const chunkId = dataView.getUint32(offset, true);
        const chunkSize = dataView.getUint32(offset + 4, true);

        if (!foundFmt && chunkId === 0x666d7420) { // "fmt "
            // Only support PCM and IEEE Float
            const audioFormat = dataView.getUint16(offset + 8, true);
            if (audioFormat === 1 || audioFormat === 3) {
                 fmtChunk = {
                    numChannels: dataView.getUint16(offset + 10, true),
                    sampleRate: dataView.getUint32(offset + 12, true),
                    bitDepth: dataView.getUint16(offset + 22, true),
                    audioFormat: audioFormat,
                };
                foundFmt = true;
            }
        } else if (!foundData && chunkId === 0x64617461) { // "data"
            dataChunkInfo = {
                dataOffset: offset + 8,
                dataSize: chunkSize,
            };
            foundData = true;
        }

        if (foundFmt && foundData) {
             return { ...fmtChunk, ...dataChunkInfo };
        }
        
        // Move to the next chunk. Chunk size must be even for RIFF.
        const nextOffset = offset + 8 + chunkSize;
        // Handle alignment for RIFF chunks
        offset = (isRiffWave && chunkSize % 2 !== 0) ? nextOffset + 1 : nextOffset;
    }
    
    // Return whatever was found, even if partial.
    // If nothing was found, this will be null.
    if (fmtChunk || dataChunkInfo) {
        return { ...(fmtChunk || {}), ...(dataChunkInfo || {}) };
    }

    return null;
}

/**
 * Decodes raw PCM data into an AudioBuffer.
 * @param {Uint8Array} fileData - The raw byte data of the file.
 * @param {object} params - Decoding parameters.
 * @param {number} params.sampleRate - The sample rate.
 * @param {number} params.bitDepth - Bits per sample (8, 16, 24).
 * @param {number} params.numChannels - Number of channels (1 or 2).
 * @param {number} params.dataOffset - Byte offset to start reading sample data.
 * @returns {AudioBuffer|null} The decoded AudioBuffer or null on failure.
 */
function decodePcmToAudioBuffer(fileData, { sampleRate, bitDepth, numChannels, dataOffset = 0, audioFormat = 1 }) {
    if (!audioContext) initAudioContext();
    if (!audioContext) return null;

    if (sampleRate <= 0 || numChannels <= 0) return null;

    const dataView = new DataView(fileData.buffer, dataOffset);
    const byteLength = dataView.byteLength;

    // Handle sub-byte depths (1, 2, 4 bits per sample)
    if (bitDepth === 1 || bitDepth === 2 || bitDepth === 4) {
        const bitsPerSample = bitDepth;
        const samplesPerByte = Math.floor(8 / bitsPerSample);
        if (samplesPerByte <= 0) return null;

        const totalSamples = Math.floor((byteLength * samplesPerByte) / numChannels);
        if (totalSamples <= 0) return null;

        const samplesPerChannel = Math.floor(totalSamples / numChannels);
        if (samplesPerChannel <= 0) return null;

        const audioBuffer = audioContext.createBuffer(numChannels, samplesPerChannel, sampleRate);

        for (let channel = 0; channel < numChannels; channel++) {
            const channelData = audioBuffer.getChannelData(channel);
            for (let n = 0; n < samplesPerChannel; n++) {
                const globalSampleIndex = n * numChannels + channel;
                const bitIndex = globalSampleIndex * bitsPerSample;
                const byteIndex = Math.floor(bitIndex / 8);
                if (byteIndex >= byteLength) {
                    channelData[n] = 0;
                    continue;
                }
                const bitOffsetInByte = bitIndex % 8;
                // Take bits from MSB downward
                const shift = 8 - bitOffsetInByte - bitsPerSample;
                const mask = (1 << bitsPerSample) - 1;
                const byte = dataView.getUint8(byteIndex);
                const rawValue = (byte >> Math.max(0, shift)) & mask;
                const normalized = (rawValue / mask) * 2 - 1; // 0..1 -> -1..1
                channelData[n] = normalized;
            }
        }
        return audioBuffer;
    }

    // Byte-aligned sample sizes (8, 16, 24, 32, 64 bits)
    const bytesPerSample = bitDepth / 8;
    if (!Number.isFinite(bytesPerSample) || bytesPerSample <= 0) return null;

    const numSamples = Math.floor(byteLength / (numChannels * bytesPerSample));
    if (numSamples <= 0) return null;

    const audioBuffer = audioContext.createBuffer(numChannels, numSamples, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
        const channelData = audioBuffer.getChannelData(channel);
        let sampleIndex = 0;
        for (let i = channel * bytesPerSample; i < byteLength && sampleIndex < numSamples; i += numChannels * bytesPerSample) {
            let sampleValue = 0;
            try {
                if (bitDepth === 8) { // Unsigned 8-bit
                    sampleValue = (dataView.getUint8(i) / 128.0) - 1.0;
                } else if (bitDepth === 16) { // Signed 16-bit little-endian
                    sampleValue = dataView.getInt16(i, true) / 32768.0;
                } else if (bitDepth === 24) { // Signed 24-bit little-endian
                    const byte1 = dataView.getUint8(i);
                    const byte2 = dataView.getUint8(i + 1);
                    const byte3 = dataView.getUint8(i + 2);
                    let val = (byte3 << 16) | (byte2 << 8) | byte1;
                    if (val & 0x800000) val |= ~0xffffff; // Sign extend
                    sampleValue = val / 8388608.0;
                } else if (bitDepth === 32) {
                    if (audioFormat === 3) { // 32-bit IEEE Float
                        sampleValue = dataView.getFloat32(i, true);
                    } else { // 32-bit Signed Integer (PCM format 1)
                        sampleValue = dataView.getInt32(i, true) / 2147483648.0;
                    }
                } else if (bitDepth === 64) {
                    if (audioFormat === 3) { // 64-bit IEEE Float
                        sampleValue = dataView.getFloat64(i, true);
                    } else { // 64-bit Signed Integer (PCM format 1)
                        // Use BigInt math for signed int64
                        const low = dataView.getUint32(i, true);
                        const high = dataView.getInt32(i + 4, true);
                        const big = (BigInt(high) << 32n) | BigInt(low);
                        const max = 9223372036854775808n; // 2^63
                        sampleValue = Number(big) / Number(max);
                    }
                }
            } catch(e) { /* ignore out-of-range reads */ }
            channelData[sampleIndex++] = sampleValue;
        }
    }
    return audioBuffer;
}

// --- Main Exported Functions ---

export function setMode(_mode) {
    // Kept for API compatibility; mode is ignored (always raw playback).
    stop();
    decodedAudioBuffer = null;
    playbackParams = null;
}

export function decodeAudioData(fileData, params) {
    if (!audioContext) initAudioContext();
    
    stop();
    decodedAudioBuffer = null;
    isPlaybackPaused = false;
    playbackStartTime = 0;

    // Always treat input as raw PCM using the provided parameters
    const decodeParams = {
        sampleRate: params.sampleRate,
        bitDepth: params.bitDepth,
        numChannels: params.numChannels,
        dataOffset: 0,
        dataSize: fileData.byteLength,
        audioFormat: 1,
    };

    try {
        decodedAudioBuffer = decodePcmToAudioBuffer(fileData, decodeParams);
    } catch (e) {
        console.error("Error decoding audio data with requested params:", e);
        decodedAudioBuffer = null;
    }

    // If decoding failed (this can happen with very low sample rates in some browsers),
    // try again with a safe minimum sample rate so playback still works.
    if (!decodedAudioBuffer) {
        const MIN_SAFE_SAMPLE_RATE = 3000;
        const fallbackParams = {
            ...decodeParams,
            sampleRate: Math.max(MIN_SAFE_SAMPLE_RATE, decodeParams.sampleRate || MIN_SAFE_SAMPLE_RATE),
        };
        try {
            decodedAudioBuffer = decodePcmToAudioBuffer(fileData, fallbackParams);
            if (decodedAudioBuffer) {
                // Expose the effective parameters actually used for playback
                playbackParams = fallbackParams;
                return { success: true, params: fallbackParams };
            }
        } catch (e2) {
            console.error("Error decoding audio data with fallback params:", e2);
        }
        playbackParams = null;
        return { success: false };
    }
    
    playbackParams = decodeParams;
    return { success: true, params: decodeParams };
}

export function start(startTimeInSeconds = 0) {
    if (!audioContext) {
        initAudioContext();
    }
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    
    if (decodedAudioBuffer) {
        if (playbackSourceNode) {
            try { playbackSourceNode.stop(); } catch(e) {}
        }

        playbackSourceNode = audioContext.createBufferSource();
        playbackSourceNode.buffer = decodedAudioBuffer;
        playbackSourceNode.connect(mainGainNode);
        
        // Always use the provided start time. This makes seeking via scrolling work correctly.
        playbackStartTime = Math.max(0, startTimeInSeconds);
        isPlaybackPaused = false;

        playbackSourceNode.start(0, playbackStartTime);
        // We subtract the offset from the context time to get a consistent start reference
        audioContextStartTime = audioContext.currentTime - playbackStartTime;
    }
}

export function stop() {
    if (playbackSourceNode) {
        try { playbackSourceNode.stop(); } catch(e) {}
        playbackSourceNode = null;
        // Just mark as paused. The next `start` call will determine the time.
        isPlaybackPaused = true;
    }
}

export function setVolume(volume) {
    if (mainGainNode) {
        // Use setTargetAtTime for smooth volume changes
        mainGainNode.gain.setValueAtTime(parseFloat(volume), audioContext.currentTime);
    }
}

export function updateSound(_byteData) {
    // Synth mode is disabled; keep as a no-op for compatibility.
}

// --- New functions for sync ---
export function getPlaybackTime() {
    if (!audioContext) {
        return 0;
    }
    if (isPlaybackPaused || !playbackSourceNode) {
        return playbackStartTime;
    }
    // audioContextStartTime is the reference point when play began (accounting for offsets)
    return audioContext.currentTime - audioContextStartTime;
}

export function getPlaybackParams() {
    return playbackParams;
}