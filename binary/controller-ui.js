// UI state management and high-level initialization.
import * as DOM from 'dom';
import * as Waterfall from 'waterfall';
import * as Audio from 'audio';
import { getState } from 'app-state';

export function setControlsEnabled(enabled) {
    const { fileData } = getState();
    const controls = [
        DOM.playPauseBtn,
        DOM.loopBtn,
        DOM.resetBtn,
        DOM.speedInput,
        DOM.speedUnit,
        DOM.volumeSlider,
        DOM.bytesPerRowSelect,
        DOM.corruptionToggle,
    ];

    controls.forEach(control => {
        control.disabled = !enabled;
    });

    DOM.downloadAudioBtn.disabled = !enabled;

    if (!enabled) {
        const corruptionSubControls = [
            DOM.corruptionTypeSelect,
            DOM.corruptionAmountSlider,
            DOM.corruptionSeedInput,
            DOM.applyCorruptionBtn,
        ];
        corruptionSubControls.forEach(c => c.disabled = true);
    } else if (DOM.corruptionToggle.checked) {
        const corruptionSubControls = [
            DOM.corruptionTypeSelect,
            DOM.corruptionAmountSlider,
            DOM.corruptionSeedInput,
            DOM.applyCorruptionBtn,
        ];
        corruptionSubControls.forEach(c => c.disabled = false);
    }
}

export function setUiLocked(locked, message = '') {
    const allControls = document.querySelectorAll('#controls button, #controls select, #controls input, #file-input');
    allControls.forEach(control => {
        control.disabled = locked;
    });

    if (locked) {
        DOM.placeholderText.textContent = message;
        DOM.placeholderText.style.display = 'block';
    } else {
        const { fileData } = getState();
        DOM.placeholderText.style.display = fileData ? 'none' : 'block';
        if (!fileData) {
            DOM.placeholderText.textContent = 'Upload a file to begin';
        }
        setControlsEnabled(!!fileData);
    }
}

export function handleBytesPerRowChange() {
    const newCount = parseInt(DOM.bytesPerRowSelect.value, 10);
    Waterfall.setBytesPerRow(newCount);

    const { totalRows } = Waterfall.getDimensions();
    const maxOffsetScrollable = Math.max(0, totalRows > 0 ? totalRows - 1 : 0);
    const { currentOffset } = getState();
    const newOffset = Math.min(maxOffsetScrollable, currentOffset);

    Waterfall.draw(newOffset);
}

export function handleWelcomeContinue() {
    DOM.welcomeOverlay.classList.add('hidden');
}

export function initialize() {
    // Seed is set in corruption controller; here we do generic setup.
    Audio.setVolume(DOM.volumeSlider.value);
    setControlsEnabled(false);
    DOM.canvasContainer.style.height = '400px';
    // Speed controls are not used in raw playback mode
    DOM.speedControlGroup.style.display = 'none';
    Waterfall.init();
    Waterfall.resizeCanvas();
}