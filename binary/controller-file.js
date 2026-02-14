// File loading and corruption processing.
import * as Audio from 'audio';
import * as FileHandler from 'file-handler';
import * as Waterfall from 'waterfall';
import * as Corruption from 'corruption';
import * as DOM from 'dom';
import { getState, setState } from 'app-state';
import { setUiLocked, setControlsEnabled } from 'controller-ui';
import { sliderToPercentage } from 'corruption-slider';
import { handleAudioModeChange, togglePlayPause } from 'controller-playback';

export async function processDataAndReload() {
    const { originalFileData, isPlaying } = getState();
    if (!originalFileData) return;

    if (isPlaying) {
        togglePlayPause();
    }
    Audio.stop();

    let newFileData;
    if (DOM.corruptionToggle.checked) {
        setUiLocked(true, 'Corrupting file...');
        try {
            const sliderValue = parseInt(DOM.corruptionAmountSlider.value, 10);
            const amount = sliderToPercentage(sliderValue);

            const settings = {
                type: DOM.corruptionTypeSelect.value,
                amount: amount,
                seed: parseInt(DOM.corruptionSeedInput.value, 10) || 0,
            };
            const dataToCorrupt = new Uint8Array(originalFileData.buffer.slice(0));
            newFileData = await Corruption.apply(dataToCorrupt, settings);
        } catch (error) {
            console.error('Failed to apply corruption:', error);
            alert(`An error occurred during file corruption: ${error.message}`);
            newFileData = new Uint8Array(originalFileData);
        } finally {
            setUiLocked(false);
        }
    } else {
        newFileData = new Uint8Array(originalFileData);
    }

    setState({ fileData: newFileData });
    Waterfall.setData(newFileData);
    handleAudioModeChange();
}

export function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    DOM.fileNameDisplay.textContent = file.name;
    DOM.placeholderText.style.display = 'none';

    if (getState().isPlaying) {
        togglePlayPause();
    }
    Audio.stop();

    FileHandler.readFile(file)
        .then(arrayBuffer => {
            setState({
                originalFileData: new Uint8Array(arrayBuffer),
                originalFileName: file.name,
            });
            processDataAndReload();
        })
        .catch(err => {
            console.error("Error reading file:", err);
            DOM.fileNameDisplay.textContent = "Error reading file.";
            DOM.placeholderText.textContent = 'Could not load file.';
            DOM.placeholderText.style.display = 'block';
            setState({ originalFileData: null, fileData: null });
            setControlsEnabled(false);
        });
}

export function handleUrlLoad() {
    const url = DOM.urlInput ? DOM.urlInput.value.trim() : '';
    if (!url) return;

    DOM.fileNameDisplay.textContent = url;
    DOM.placeholderText.style.display = 'none';

    if (getState().isPlaying) {
        togglePlayPause();
    }
    Audio.stop();

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.arrayBuffer();
        })
        .then(arrayBuffer => {
            // Derive a pseudo file name from the URL
            let name = url.split('/').pop() || url;
            if (!name.includes('.')) {
                name = name || 'remote-file';
            }
            setState({
                originalFileData: new Uint8Array(arrayBuffer),
                originalFileName: name,
            });
            processDataAndReload();
        })
        .catch(err => {
            console.error("Error loading URL:", err);
            DOM.fileNameDisplay.textContent = "Error loading URL.";
            DOM.placeholderText.textContent = 'Could not load file from URL.';
            DOM.placeholderText.style.display = 'block';
            setState({ originalFileData: null, fileData: null });
            setControlsEnabled(false);
            alert("Failed to load file from URL. The server may not allow cross-origin access or the URL is invalid.");
        });
}