// Corruption controls and slider display.
import * as DOM from 'dom';
import { getState } from 'app-state';
import { processDataAndReload } from 'controller-file';
import { sliderToPercentage, formatPercentage } from 'corruption-slider';

export function handleCorruptionToggle() {
    const isEnabled = DOM.corruptionToggle.checked;
    DOM.corruptionControls.classList.toggle('corruption-controls-hidden', !isEnabled);

    const subControls = [
        DOM.corruptionTypeSelect,
        DOM.corruptionAmountSlider,
        DOM.corruptionSeedInput,
        DOM.applyCorruptionBtn,
    ];
    subControls.forEach(c => c.disabled = !isEnabled);

    if (!isEnabled && getState().originalFileData) {
        processDataAndReload();
    }
}

export function handleApplyCorruption() {
    if (getState().originalFileData && DOM.corruptionToggle.checked) {
        processDataAndReload();
    }
}

export function handleCorruptionSettingsChange() {
    // Intentionally no auto-apply; use Apply button to avoid slow updates.
}

export function handleCorruptionAmountChange() {
    const sliderValue = parseInt(DOM.corruptionAmountSlider.value, 10);
    const percentage = sliderToPercentage(sliderValue);
    DOM.corruptionAmountDisplay.textContent = formatPercentage(percentage);
}

// Seed initialization is tightly coupled to corruption, so keep it here.
(function initCorruptionDefaults() {
    if (DOM.corruptionSeedInput) {
        DOM.corruptionSeedInput.value = Math.floor(Math.random() * 10000);
    }
    if (DOM.corruptionAmountSlider) {
        handleCorruptionAmountChange();
    }
})();