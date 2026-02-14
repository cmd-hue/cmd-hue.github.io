 // Audio download helpers.
import * as DOM from 'dom';
import * as FileHandler from 'file-handler';
import { getState } from 'app-state';

function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export function handleDownloadAudio() {
    const { fileData, originalFileName } = getState();

    if (!fileData) {
        alert("Load a file before exporting audio.");
        return;
    }

    try {
        const params = {
            sampleRate: parseInt(DOM.sampleRateInput.value, 10),
            bitDepth: parseInt(DOM.bitDepthSelect.value, 10),
            numChannels: parseInt(DOM.channelsSelect.value, 10),
        };
        const wavBlob = FileHandler.createWavBlob(fileData, params);

        const baseName = (originalFileName || '').split('.').slice(0, -1).join('.') || originalFileName || 'audio';
        const newFileName = `${baseName}_corrupted.wav`;

        triggerDownload(wavBlob, newFileName);
    } catch (error) {
        console.error("Error creating WAV file:", error);
        alert("Failed to create WAV file for download. Please check audio parameters.");
    }
}

