// Canvas drag/scroll/touch and resizer interactions.
import * as Waterfall from 'waterfall';
import * as DOM from 'dom';
import { getState, setState } from 'app-state';
import { togglePlayPause } from 'controller-playback';

function dragStart(y) {
    if (!getState().fileData) return;
    setState({ isDragging: true, lastDragY: y });
    DOM.canvas.style.cursor = 'grabbing';
    if (getState().isPlaying) togglePlayPause();
}

function dragMove(y) {
    const state = getState();
    if (!state.isDragging || !state.fileData) return;

    const deltaY = y - state.lastDragY;
    const scrollAmount = deltaY * (window.devicePixelRatio || 1);

    const { totalRows } = Waterfall.getDimensions();
    const maxOffsetScrollable = Math.max(0, totalRows > 0 ? totalRows - 1 : 0);

    let newOffset = state.currentOffset - scrollAmount / Waterfall.PIXEL_SIZE;
    newOffset = Math.max(0, Math.min(maxOffsetScrollable, newOffset));

    setState({ currentOffset: newOffset, lastDragY: y });
    Waterfall.draw(newOffset);
}

function dragEnd() {
    setState({ isDragging: false });
    DOM.canvas.style.cursor = 'grab';
}

export function handleMouseDown(event) {
    dragStart(event.clientY);
}

export function handleMouseUp() {
    dragEnd();
}

export function handleMouseMove(event) {
    dragMove(event.clientY);
}

export function handleWheel(event) {
    if (!getState().fileData) return;
    event.preventDefault();
    if (getState().isPlaying) togglePlayPause();

    const { totalRows } = Waterfall.getDimensions();
    const maxOffsetScrollable = Math.max(0, totalRows > 0 ? totalRows - 1 : 0);

    let newOffset = getState().currentOffset + event.deltaY * 0.1;
    newOffset = Math.max(0, Math.min(maxOffsetScrollable, newOffset));

    setState({ currentOffset: newOffset });
    Waterfall.draw(newOffset);
}

export function handleTouchStart(event) {
    if (event.touches.length === 1) {
        event.preventDefault();
        dragStart(event.touches[0].clientY);
    }
}

export function handleTouchMove(event) {
    if (event.touches.length === 1) {
        event.preventDefault();
        dragMove(event.touches[0].clientY);
    }
}

export function handleTouchEnd() {
    dragEnd();
}

function handleResizerMouseMove(event) {
    if (!getState().isResizing) return;
    const mainRect = DOM.canvasContainer.parentElement.getBoundingClientRect();
    const newHeight = mainRect.bottom - event.clientY - DOM.resizer.offsetHeight / 2;
    DOM.canvasContainer.style.height = `${Math.max(100, newHeight)}px`;
    Waterfall.resizeCanvas();
    Waterfall.draw(getState().currentOffset);
}

function handleResizerMouseUp() {
    setState({ isResizing: false });
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
    window.removeEventListener('mousemove', handleResizerMouseMove);
    window.removeEventListener('mouseup', handleResizerMouseUp);
}

export function handleResizerMouseDown() {
    setState({ isResizing: true });
    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', handleResizerMouseMove);
    window.addEventListener('mouseup', handleResizerMouseUp);
}