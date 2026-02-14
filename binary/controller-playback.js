// Playback, animation loop, and audio mode handling.
import * as Audio from 'audio';
import * as Waterfall from 'waterfall';
import * as DOM from 'dom';
import { getState, setState } from 'app-state';
import { setControlsEnabled } from 'controller-ui';

function resetState() {
    const { animationFrameId } = getState();
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    setState({
        isPlaying: false,
        animationFrameId: null,
        currentOffset: 0,
        lastTimestamp: 0,
    });

    DOM.playPauseBtn.textContent = 'Play';
    Waterfall.resizeCanvas();
    Waterfall.draw(0);
    Audio.stop();
}

function animate(timestamp) {
    const state = getState();
    if (!state.isPlaying) return;

    const deltaTime = timestamp - state.lastTimestamp;
    setState({ lastTimestamp: timestamp });

    let playbackOffset = -1;
    let newOffset = state.currentOffset;

    // Always drive the waterfall from raw audio playback
    const playbackTime = Audio.getPlaybackTime();
    const params = Audio.getPlaybackParams();
    if (params && params.sampleRate > 0) {
        const bytesPerSample = Math.max(1, params.bitDepth / 8);
        const bytesPerSecond = params.sampleRate * params.numChannels * bytesPerSample;
        const currentBytePosition = (playbackTime * bytesPerSecond) + (params.dataOffset || 0);
        const totalBytes = state.fileData.length;

        if (currentBytePosition >= totalBytes) {
            if (state.isLooping) {
                const audioDuration = (totalBytes - (params.dataOffset || 0)) / bytesPerSecond;
                Audio.start(audioDuration > 0 ? playbackTime % audioDuration : 0);
            } else {
                togglePlayPause();
            }
        } else {
            newOffset = currentBytePosition / Waterfall.BYTES_PER_ROW;
            playbackOffset = newOffset;
        }
    }

    setState({ currentOffset: newOffset });
    Waterfall.draw(newOffset, playbackOffset);

    if (getState().isPlaying) {
        setState({ animationFrameId: requestAnimationFrame(animate) });
    }
}

export function togglePlayPause() {
    const state = getState();
    if (!state.fileData) return;

    const newIsPlaying = !state.isPlaying;
    setState({ isPlaying: newIsPlaying });
    DOM.playPauseBtn.textContent = newIsPlaying ? 'Pause' : 'Play';

    if (newIsPlaying) {
        let startTime = 0;
        const params = Audio.getPlaybackParams();
        if (params && params.sampleRate > 0) {
            const bytesPerSample = Math.max(1, params.bitDepth / 8);
            const bytesPerSecond = params.sampleRate * params.numChannels * bytesPerSample;
            if (bytesPerSecond > 0) {
                const bytePosition = state.currentOffset * Waterfall.BYTES_PER_ROW;
                const audioBytePosition = Math.max(0, bytePosition - (params.dataOffset || 0));
                startTime = audioBytePosition / bytesPerSecond;
            }
        }
        Audio.start(startTime);
        setState({
            lastTimestamp: performance.now(),
            animationFrameId: requestAnimationFrame(animate),
        });
    } else {
        Audio.stop();
        if (state.animationFrameId) cancelAnimationFrame(state.animationFrameId);
        setState({ animationFrameId: null });
    }
}

export function handleReset() {
    setState({ currentOffset: 0, lastTimestamp: performance.now() });
    Waterfall.draw(0);
    Audio.stop();
}

export function toggleLoop() {
    const newIsLooping = !getState().isLooping;
    setState({ isLooping: newIsLooping });
    DOM.loopBtn.textContent = `Loop: ${newIsLooping ? 'On' : 'Off'}`;
}

export function updateSpeed() {
    // Value is read in animate loop
}

export function updateVolume() {
    Audio.setVolume(DOM.volumeSlider.value);
}

export function handleAudioModeChange() {
    // Always treat audio as raw PCM with user-provided parameters
    const { fileData } = getState();
    if (!fileData) return;

    const sampleRateInput = parseInt(DOM.sampleRateInput.value, 10);
    const bitDepthInput = parseInt(DOM.bitDepthSelect.value, 10);
    const numChannels = parseInt(DOM.channelsSelect.value, 10);

    const params = {
        sampleRate: Number.isFinite(sampleRateInput) && sampleRateInput > 0 ? sampleRateInput : 44100,
        // Allow user to choose sub-byte bit depths (1,2,4) as well as standard byte-aligned depths.
        bitDepth: Number.isFinite(bitDepthInput) && bitDepthInput >= 1 ? bitDepthInput : 16,
        numChannels: Number.isFinite(numChannels) && numChannels > 0 ? numChannels : 2,
    };

    const decodeResult = Audio.decodeAudioData(fileData, params);
    setControlsEnabled(true);

    if (!decodeResult.success) {
        alert("Failed to decode audio. The parameters might be incorrect.");
    } else if (decodeResult.params) {
        const newParams = decodeResult.params;
        DOM.sampleRateInput.value = newParams.sampleRate;
        DOM.bitDepthSelect.value = newParams.bitDepth;
        DOM.channelsSelect.value = newParams.numChannels;
    }
    resetState();
}