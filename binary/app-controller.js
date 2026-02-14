/**
 * Thin aggregation layer for controller logic.
 * Most functions were moved into smaller, focused modules.
 * Tombstones below indicate removed functions from the previous version.
 *
 * Tombstones:
 *  - removed function sliderToPercentage() {}
 *  - removed function setControlsEnabled() {}
 *  - removed function setUiLocked() {}
 *  - removed async function processDataAndReload() {}
 *  - removed function resetState() {}
 *  - removed function animate() {}
 *  - removed function dragStart() {}
 *  - removed function dragMove() {}
 *  - removed function dragEnd() {}
 */

import {
    initialize as initializeUi,
    handleBytesPerRowChange,
    handleWelcomeContinue,
} from 'controller-ui';

import {
    handleFileSelect,
    handleUrlLoad,
} from 'controller-file';

import {
    togglePlayPause,
    handleReset,
    toggleLoop,
    updateSpeed,
    updateVolume,
    handleAudioModeChange,
} from 'controller-playback';

import {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleResizerMouseDown,
} from 'controller-interaction';

import {
    handleDownloadAudio,
} from 'controller-downloads';

import {
    handleCorruptionToggle,
    handleApplyCorruption,
    handleCorruptionSettingsChange,
    handleCorruptionAmountChange,
} from 'controller-corruption';

// Re-export the public controller API expected by main.js
export {
    handleFileSelect,
    handleUrlLoad,
    togglePlayPause,
    handleReset,
    toggleLoop,
    updateSpeed,
    updateVolume,
    handleAudioModeChange,
    handleBytesPerRowChange,
    handleDownloadAudio,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleResizerMouseDown,
    handleWelcomeContinue,
    handleCorruptionToggle,
    handleApplyCorruption,
    handleCorruptionSettingsChange,
    handleCorruptionAmountChange,
};

export function initialize() {
    initializeUi();
}