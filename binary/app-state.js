// This file manages the shared state of the application.

const state = {
    originalFileData: null, // Uint8Array from the file
    originalFileName: '',   // Keep track of the original file name
    fileData: null,         // Potentially corrupted data, used by the app
    isPlaying: false,
    isLooping: false,
    animationFrameId: null,
    currentOffset: 0,
    lastTimestamp: 0,

    // Manual interaction state
    isDragging: false,
    lastDragY: 0,
    isResizing: false,
};

export function getState() {
    return { ...state };
}

export function setState(newState) {
    Object.assign(state, newState);
}