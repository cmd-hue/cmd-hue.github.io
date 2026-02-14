const canvas = document.getElementById('waterfall-canvas');
const ctx = canvas.getContext('2d', { alpha: false });
// Ensure we always use nearest-neighbor scaling on the main canvas
ctx.imageSmoothingEnabled = false;

export let PIXEL_SIZE = 4;
export let BYTES_PER_ROW = 128;

let data = null; // Uint8Array
let canvasWidth = 0;
let canvasHeight = 0;

// Tiled rendering state
const TILE_ROWS = 2048; // number of rows per tile (chunk)
let tiles = []; // { canvas, ctx, startRow, numRows, rendered }
let totalRows = 0;

const byteColorRGBACache = new Map(); // Cache for {r, g, b, a}

function getColorRGBAForByte(byteValue) {
    if (byteColorRGBACache.has(byteValue)) {
        return byteColorRGBACache.get(byteValue);
    }
    let r, g, b;
    if (byteValue < 64) {
        // Blue range
        r = 0; g = 0; b = 128 + byteValue * 2;
    } else if (byteValue < 128) {
        // Green range
        r = 0; g = 128 + (byteValue - 64) * 2; b = 0;
    } else if (byteValue < 192) {
        // Yellow range
        r = 128 + (byteValue - 128) * 2; g = 128 + (byteValue - 128) * 2; b = 0;
    } else {
        // Red range
        r = 128 + (byteValue - 192) * 2; g = 0; b = 0;
    }
    const rgba = { r, g, b, a: 255 };
    byteColorRGBACache.set(byteValue, rgba);
    return rgba;
}

function rebuildTiles() {
    tiles = [];
    if (!data || BYTES_PER_ROW <= 0) {
        totalRows = 0;
        return;
    }
    totalRows = Math.ceil(data.length / BYTES_PER_ROW);
    const tileCount = Math.ceil(totalRows / TILE_ROWS);

    for (let i = 0; i < tileCount; i++) {
        const startRow = i * TILE_ROWS;
        const numRows = Math.min(TILE_ROWS, totalRows - startRow);
        const tCanvas = document.createElement('canvas');
        tCanvas.width = BYTES_PER_ROW;
        tCanvas.height = numRows;
        const tCtx = tCanvas.getContext('2d', { alpha: false });

        tiles.push({
            canvas: tCanvas,
            ctx: tCtx,
            startRow,
            numRows,
            rendered: false,
        });
    }
}

function renderTile(tile) {
    if (tile.rendered || !data) return;
    const { canvas: tCanvas, ctx: tCtx, startRow, numRows } = tile;

    const width = tCanvas.width;
    const height = tCanvas.height;
    const imageData = tCtx.createImageData(width, height);
    const pixels = imageData.data;

    for (let row = 0; row < numRows; row++) {
        const dataRowIndex = startRow + row;
        const dataStartIndex = dataRowIndex * BYTES_PER_ROW;
        if (dataStartIndex >= data.length) break;

        for (let x = 0; x < BYTES_PER_ROW; x++) {
            const byteIndex = dataStartIndex + x;
            if (byteIndex >= data.length) break;

            const byteValue = data[byteIndex];
            const color = getColorRGBAForByte(byteValue);

            const pixelIndex = (row * width + x) * 4;
            pixels[pixelIndex] = color.r;
            pixels[pixelIndex + 1] = color.g;
            pixels[pixelIndex + 2] = color.b;
            pixels[pixelIndex + 3] = color.a;
        }
    }

    tCtx.putImageData(imageData, 0, 0);
    tile.rendered = true;
}

export function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;

    // Resizing a canvas resets its drawing state, so re-disable smoothing.
    ctx.imageSmoothingEnabled = false;
    
    // Adjust PIXEL_SIZE based on new width and BYTES_PER_ROW
    PIXEL_SIZE = Math.max(1, Math.floor(canvas.width / BYTES_PER_ROW));

    draw(0); // Redraw with current offset, which will be reset by caller if needed.
}

export function init() {
    window.addEventListener('resize', () => {
        resizeCanvas();
    }, false);
    resizeCanvas();
}

export function setData(binaryData) {
    data = binaryData;
    rebuildTiles();
}

export function setBytesPerRow(count) {
    BYTES_PER_ROW = count;
    rebuildTiles();
    resizeCanvas();
}

export function getDimensions() {
    if (!data || BYTES_PER_ROW <= 0) {
        return { rowsOnCanvas: 0, bytesPerCanvas: 0, totalRows: 0 };
    }
    const rowsOnCanvas = Math.ceil(canvasHeight / PIXEL_SIZE);
    const bytesPerCanvas = rowsOnCanvas * BYTES_PER_ROW;
    return { rowsOnCanvas, bytesPerCanvas, totalRows };
}

export function draw(offset, playbackOffset = -1) {
    if (canvasWidth <= 0 || canvasHeight <= 0) {
        return; // Avoid drawing on a zero-size canvas
    }
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    if (!data || BYTES_PER_ROW <= 0 || totalRows === 0) {
        return;
    }

    const startRow = Math.floor(offset);
    const rowOffsetPixels = (offset - startRow) * PIXEL_SIZE;
    const rowsOnCanvas = Math.ceil(canvasHeight / PIXEL_SIZE) + 1;

    const visibleFirstRow = Math.max(0, startRow);
    const visibleLastRow = Math.min(totalRows, startRow + rowsOnCanvas);

    // Use vertical pixel size for Y; for X clamp so we never draw wider than the canvas.
    let pixelScaleX = PIXEL_SIZE;
    if (BYTES_PER_ROW * pixelScaleX > canvasWidth) {
        pixelScaleX = canvasWidth / BYTES_PER_ROW;
    }
    const destWidth = BYTES_PER_ROW * pixelScaleX;
    const offsetX = Math.floor((canvasWidth - destWidth) / 2);
    const scaleY = PIXEL_SIZE;

    // Draw visible tiles only
    for (const tile of tiles) {
        const tileEndRow = tile.startRow + tile.numRows;
        if (tileEndRow <= visibleFirstRow || tile.startRow >= visibleLastRow) {
            continue;
        }

        // Ensure tile is rendered before drawing it
        renderTile(tile);

        const srcFirstRowInTile = Math.max(0, visibleFirstRow - tile.startRow);
        const srcLastRowInTile = Math.min(tile.numRows, visibleLastRow - tile.startRow);
        const srcRowCount = srcLastRowInTile - srcFirstRowInTile;
        if (srcRowCount <= 0) continue;

        const destY = (tile.startRow + srcFirstRowInTile - offset) * PIXEL_SIZE;
        const destHeight = srcRowCount * scaleY;

        ctx.drawImage(
            tile.canvas,
            0,
            srcFirstRowInTile,
            BYTES_PER_ROW,
            srcRowCount,
            offsetX,
            destY - rowOffsetPixels,
            destWidth,
            destHeight
        );
    }

    // Draw playback indicator line if provided
    if (playbackOffset >= 0) {
        const playbackY = (playbackOffset - offset) * PIXEL_SIZE;
        if (playbackY >= 0 && playbackY < canvasHeight) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillRect(0, playbackY, canvasWidth, 1); // A 1-pixel high white line
        }
    }
}

export function getBytesForSound(offset) {
    if (!data) return [];

    const startByteIndex = Math.floor(offset * BYTES_PER_ROW);
    const endByteIndex = startByteIndex + BYTES_PER_ROW;
    
    if (startByteIndex >= data.length) return [];

    return data.slice(startByteIndex, Math.min(endByteIndex, data.length));
}

/**
 * Export a waterfall image at a given bytes/row and scale.
 * This renders once into an offscreen canvas (not tiled) specifically for export.
 *
 * @param {object} options
 * @param {number} options.bytesPerRow - layout width in bytes/row
 * @param {number} options.scale - pixel scale factor (1 = 1px per byte horizontally & vertically)
 * @returns {HTMLCanvasElement} offscreen canvas containing the image
 */
export function exportImage({ bytesPerRow, scale }) {
    if (!data || bytesPerRow <= 0) return null;

    const exportBytesPerRow = bytesPerRow;
    const exportTotalRows = Math.ceil(data.length / exportBytesPerRow);

    // Ensure we never downscale when exporting; minimum scale is 1 for crisp pixels.
    const pxScale = Math.max(1, scale || 1);
    const width = exportBytesPerRow;
    const height = exportTotalRows;

    const offCanvas = document.createElement('canvas');
    offCanvas.width = width;
    offCanvas.height = height;
    const offCtx = offCanvas.getContext('2d', { alpha: false });

    const imageData = offCtx.createImageData(width, height);
    const pixels = imageData.data;

    for (let row = 0; row < exportTotalRows; row++) {
        const dataStartIndex = row * exportBytesPerRow;
        if (dataStartIndex >= data.length) break;

        for (let x = 0; x < exportBytesPerRow; x++) {
            const byteIndex = dataStartIndex + x;
            if (byteIndex >= data.length) break;

            const byteValue = data[byteIndex];
            const color = getColorRGBAForByte(byteValue);

            const pixelIndex = (row * width + x) * 4;
            pixels[pixelIndex] = color.r;
            pixels[pixelIndex + 1] = color.g;
            pixels[pixelIndex + 2] = color.b;
            pixels[pixelIndex + 3] = color.a;
        }
    }

    offCtx.putImageData(imageData, 0, 0);

    // If scale !== 1, create another canvas with scaling to keep file size small.
    if (pxScale !== 1) {
        const scaledCanvas = document.createElement('canvas');
        scaledCanvas.width = Math.max(1, Math.round(width * pxScale));
        scaledCanvas.height = Math.max(1, Math.round(height * pxScale));
        const sCtx = scaledCanvas.getContext('2d', { alpha: false });
        // Preserve crisp pixel corners when scaling by disabling smoothing.
        sCtx.imageSmoothingEnabled = false;
        sCtx.drawImage(offCanvas, 0, 0, scaledCanvas.width, scaledCanvas.height);
        return scaledCanvas;
    }

    return offCanvas;
}