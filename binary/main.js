// This file is now the main entry point. It initializes the application and wires up event listeners.
// Much of the logic previously here has been moved to `app-controller.js`, `app-state.js`, and `dom.js`.
import * as Controller from 'app-controller';
import * as DOM from 'dom';

// --- Event Listener Setup ---
function initializeEventListeners() {
    DOM.fileInput.addEventListener('change', Controller.handleFileSelect);
    if (DOM.urlLoadBtn) {
        DOM.urlLoadBtn.addEventListener('click', Controller.handleUrlLoad);
    }
    DOM.playPauseBtn.addEventListener('click', Controller.togglePlayPause);
    DOM.loopBtn.addEventListener('click', Controller.toggleLoop);
    DOM.resetBtn.addEventListener('click', Controller.handleReset);
    DOM.speedInput.addEventListener('input', Controller.updateSpeed);
    DOM.speedUnit.addEventListener('change', Controller.updateSpeed);
    DOM.bytesPerRowSelect.addEventListener('change', Controller.handleBytesPerRowChange);
    DOM.volumeSlider.addEventListener('input', Controller.updateVolume);
    DOM.downloadAudioBtn.addEventListener('click', Controller.handleDownloadAudio);

    // Audio control listeners (raw playback only)
    DOM.sampleRateInput.addEventListener('change', Controller.handleAudioModeChange);
    DOM.bitDepthSelect.addEventListener('change', Controller.handleAudioModeChange);
    DOM.channelsSelect.addEventListener('change', Controller.handleAudioModeChange);

    // Corruption listeners
    DOM.corruptionToggle.addEventListener('click', Controller.handleCorruptionToggle);
    DOM.applyCorruptionBtn.addEventListener('click', Controller.handleApplyCorruption);
    DOM.corruptionTypeSelect.addEventListener('change', Controller.handleCorruptionSettingsChange);
    DOM.corruptionAmountSlider.addEventListener('input', Controller.handleCorruptionAmountChange);
    DOM.corruptionSeedInput.addEventListener('change', Controller.handleCorruptionSettingsChange);

    // Manual scroll listeners
    DOM.canvas.addEventListener('mousedown', (e) => {
        if (e.button === 0) Controller.handleMouseDown(e);
    });
    window.addEventListener('mouseup', (e) => {
        if (e.button === 0) Controller.handleMouseUp(e);
    });
    window.addEventListener('mousemove', Controller.handleMouseMove);
    DOM.canvas.addEventListener('wheel', Controller.handleWheel, { passive: false });

    // Touch listeners
    DOM.canvas.addEventListener('touchstart', Controller.handleTouchStart, { passive: false });
    DOM.canvas.addEventListener('touchmove', Controller.handleTouchMove, { passive: false });
    DOM.canvas.addEventListener('touchend', Controller.handleTouchEnd);
    DOM.canvas.addEventListener('touchcancel', Controller.handleTouchEnd);

    // Resizer listener
    DOM.resizer.addEventListener('mousedown', Controller.handleResizerMouseDown);

    // Welcome screen listener
    DOM.welcomeContinueBtn.addEventListener('click', Controller.handleWelcomeContinue);
}

// --- Initialize Application ---
function init() {
    console.log("Initializing Binary Waterfall...");
    initializeEventListeners();
    Controller.initialize();
    console.log("Application initialized.");
}

// Start the application
init();