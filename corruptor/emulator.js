import { els } from './dom.js';
import { AudioEngine } from './audio.js';

const SCREEN_WIDTH = 256, SCREEN_HEIGHT = 240;
const ctx = els.canvas.getContext('2d', { alpha: false });
const imageData = ctx.createImageData(SCREEN_WIDTH, SCREEN_HEIGHT);

let renderedFrames = 0;
export const getRenderedFrames = () => renderedFrames;
export const resetRenderedFrames = () => { renderedFrames = 0; };
export const getSystem = () => system;

let nes = null;
let currentROMBytes = null, currentROMName = null;
export const getCurrentROMBytes = () => currentROMBytes;
export const getCurrentROMName = () => currentROMName;
export let originalROMBytes = null, originalROMName = null;
export let isDataFile = false;

let emuWorker = null, usingWorker = false;

 // Pending promises for async state operations with the worker
let pendingSaveResolve = null;
let pendingSaveReject = null;
let pendingLoadResolve = null;
let pendingLoadReject = null;
let pendingMemoryResolve = null;
let pendingMemoryReject = null;
let running = false;
let watchdogTimer = null;
let system = 'nes'; // 'nes' | 'gb'
let gbInited = false;
let gbJoypad = { up:false, down:false, left:false, right:false, a:false, b:false, start:false, select:false };
let gbInputRAF = null;

function getGB() {
  return (window.WasmBoy && (window.WasmBoy.WasmBoy || window.WasmBoy)) || null;
}

/**
 * SNES helper: try to locate an already-loaded snesjs runtime under several
 * common global names, otherwise attempt to dynamically load the UMD build
 * from unpkg and return the loaded global.
 */
function getSNES() {
  // Quick checks for the most common global names (covers UMD/legacy builds)
  const candidates = [
    'snesjs', 'SNES', 'SnesJS', 'Snes', 'snes', 'SnesJs', 'snesJs', 'snesjs_default'
  ];

  for (const name of candidates) {
    try {
      const val = window[name];
      if (val && (typeof val === 'function' || typeof val === 'object')) return val;
    } catch (e) { /* ignore access errors */ }
  }

  // Some bundles expose under default/module.exports or as a property on an object
  try {
    if (window.default && (typeof window.default === 'object' || typeof window.default === 'function')) return window.default;
    if (window.module && window.module.exports) return window.module.exports;
  } catch (e) {}

  // Scan window for anything that looks like a SNES runtime (loadROM or Snes constructor)
  for (const k of Object.keys(window)) {
    try {
      const candidate = window[k];
      if (!candidate) continue;
      if (typeof candidate.loadROM === 'function' || (candidate.Snes && typeof candidate.Snes === 'function') || typeof candidate.Snes === 'function') {
        return candidate;
      }
      // Some builds attach default under a nested default property
      if (candidate.default && (typeof candidate.default.loadROM === 'function' || typeof candidate.default.Snes === 'function')) {
        return candidate.default;
      }
    } catch (e) {
      // ignore cross-origin or access errors
    }
  }

  return null;
}

async function ensureSNES() {
  // If a runtime is already present, return it immediately.
  let existing = getSNES();
  if (existing) return existing;

  // If a loader is already in progress, wait for it to finish and re-check.
  if (window._loadingSNES) {
    return new Promise((resolve) => {
      const check = () => {
        const s = getSNES();
        if (s) resolve(s);
        else setTimeout(check, 100);
      };
      check();
    });
  }

  window._loadingSNES = true;

  // 1) Attempt to load the UMD build by injecting a script tag (existing behavior)
  const tryScript = () => new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/snesjs@0.1.0/dist/snes.min.js';
    script.async = true;
    script.onload = () => {
      // small delay to allow the script to initialize various globals
      setTimeout(() => resolve(true), 50);
    };
    script.onerror = (e) => {
      console.error('Failed to load snesjs via script tag:', e);
      resolve(false);
    };
    document.head.appendChild(script);
  });

  // 2) Attempt an ES module dynamic import as a fallback (some bundles expose ESM)
  const tryImport = async () => {
    try {
      const mod = await import('https://unpkg.com/snesjs@0.1.0/dist/snes.min.js');
      // the module may export default or named exports
      if (mod) {
        // Attach to window so getSNES can find it
        if (mod.default) window.snesjs = mod.default;
        else Object.assign(window, mod);
        return true;
      }
    } catch (e) {
      // ignore import failures (CDN may not serve ESM)
    }
    return false;
  };

  try {
    // First try script injection
    await tryScript();

    // Re-check globals
    existing = getSNES();
    if (existing) {
      window._loadingSNES = false;
      return existing;
    }

    // Try dynamic import fallback
    const imported = await tryImport();
    if (imported) {
      existing = getSNES();
      window._loadingSNES = false;
      return existing || (window.snesjs || window.SNES || window.default || null);
    }
  } catch (e) {
    console.error('ensureSNES unexpected error:', e);
  }

  // Final attempt: scan again and return whatever we find, or null
  existing = getSNES();
  window._loadingSNES = false;
  return existing || (window.snesjs || window.SNES || window.default || null);
}

function bytesToBinaryString(bytes) {
  let out = ''; const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) out += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  return out;
}

// Detect GB ROM via Nintendo logo header pattern
function isGBROM(bytes) {
  if (!bytes || bytes.length < 0x150) return false;
  const logo = [
    0xCE,0xED,0x66,0x66,0xCC,0x0D,0x00,0x0B,0x03,0x73,0x00,0x83,0x00,0x0C,0x00,0x0D,
    0x00,0x08,0x11,0x1F,0x88,0x89,0x00,0x0E,0xDC,0xCC,0x6E,0xE6,0xDD,0xDD,0xD9,0x99,
    0xBB,0xBB,0x67,0x63,0x6E,0x0E,0xEC,0xCC,0xDD,0xDC,0x99,0x9F,0xBB,0xB9,0x33,0x3E
  ];
  for (let i = 0; i < logo.length; i++) {
    if (bytes[0x104 + i] !== logo[i]) return false;
  }
  return true;
}

function startLoop() {
  if (running) return;
  running = true;
  if (system === 'nes' && usingWorker && emuWorker) emuWorker.postMessage({ type: 'resume' });
  if (system === 'gb') { startGBInputLoop(); getGB()?.play?.(); }
}

function stopLoop() {
  running = false;
  if (usingWorker && emuWorker) emuWorker.postMessage({ type: 'pause' });
  if (system === 'gb') getGB()?.pause?.();
  stopGBInputLoop();
}

function clearWatchdog(){ if (watchdogTimer){ clearTimeout(watchdogTimer); watchdogTimer=null; } }
function armWatchdog(bytes, name){
  clearWatchdog();
  watchdogTimer = setTimeout(() => {
    els.statusText.textContent = 'Emulator stalled — restarting…';
    restartWorker(bytes, name);
  }, 3000);
}

// Ensure canvas has correct pixel size after switching systems
function applyCanvasForSystem(sys) {
  if (sys === 'gb') {
    els.canvas.width = 160; els.canvas.height = 144;
  } else {
    els.canvas.width = 256; els.canvas.height = 240;
  }
  els.wrap.dataset.system = sys; // tag wrapper for fullscreen sizing
  els.wrap.dataset.gbMode = getGBMode();
  els.canvas.style.width = '100%';
  els.canvas.style.height = 'auto';
  els.canvas.style.imageRendering = 'pixelated';
}

export const emulator = {
  create: () => {
    try {
      emuWorker = new Worker('emuWorker.js');
      emuWorker.onmessage = (e) => {
        const { type } = e.data || {};
        if (type === 'ready') {
          usingWorker = true;
          els.statusText.textContent = 'Using Worker (jsnes)';
          if (window._pendingLoad) {
            const { bytes, name } = window._pendingLoad;
            loadBytes(bytes, name);
            window._pendingLoad = null;
          }
        } else if (type === 'frame') {
          const buf = new Uint8ClampedArray(e.data.buffer);
          imageData.data.set(buf);
          ctx.putImageData(imageData, 0, 0);
          renderedFrames++;
        } else if (type === 'audio') {
          const L = new Float32Array(e.data.left); const R = new Float32Array(e.data.right);
          for (let i = 0; i < L.length; i++) AudioEngine.enqueueSample(L[i], R[i]);
        } else if (type === 'loaded') {
          clearWatchdog();
          els.pauseBtn.disabled = false;
          els.resetBtn.disabled = false;
          AudioEngine.resume();
          els.dropHint.style.display = 'none';
          startLoop();
          els.wrap.focus();
        } else if (type === 'stateSaved') {
          // NES state successfully captured
          if (pendingSaveResolve) {
            pendingSaveResolve(e.data.state);
            pendingSaveResolve = null;
            pendingSaveReject = null;
          }
        } else if (type === 'stateLoaded') {
          // NES state successfully restored
          if (pendingLoadResolve) {
            pendingLoadResolve(true);
            pendingLoadResolve = null;
            pendingLoadReject = null;
          }
        } else if (type === 'memory') {
          if (pendingMemoryResolve && e.data && e.data.bytes) {
            const bytes = new Uint8Array(e.data.bytes);
            pendingMemoryResolve(bytes);
            pendingMemoryResolve = null;
            pendingMemoryReject = null;
          }
        } else if (type === 'error') {
          const { message, op } = e.data || {};
          console.error(message);
          els.statusText.textContent = message || 'Worker error';

          // Fail any pending state promises on error
          if (pendingSaveReject) {
            pendingSaveReject(new Error(message || 'Worker error'));
            pendingSaveResolve = null;
            pendingSaveReject = null;
          }
          if (pendingLoadReject) {
            pendingLoadReject(new Error(message || 'Worker error'));
            pendingLoadResolve = null;
            pendingLoadReject = null;
          }
          if (pendingMemoryReject) {
            pendingMemoryReject(new Error(message || 'Worker error'));
            pendingMemoryResolve = null;
            pendingMemoryReject = null;
          }

          // If the error happened while loading a ROM (e.g. unsupported mapper),
          // don't keep restarting the worker with the same bad ROM.
          if (op === 'loadROM') {
            running = false;
            els.pauseBtn.disabled = true;
            els.resetBtn.disabled = true;
            els.saveStateBtn.disabled = true;
          } else {
            restartWorker(currentROMBytes, currentROMName);
          }
        }
      };
      emuWorker.postMessage({ type: 'init' });
    } catch (e) {
      console.error("Failed to create worker", e);
      els.statusText.textContent = 'Failed to load emulator worker.';
    }
  },

  get worker() { return emuWorker; },
  get isRunning() { return running; },

  pause: () => {
    if (!running) return;
    // SNES instance may provide pause/stop
    if (system === 'snes') {
      try { window._snesInstance?.pause?.(); } catch (e) {}
      running = false;
      AudioEngine.pause();
      els.pauseBtn.textContent = 'Resume';
      els.statusText.textContent = 'Paused';
      return;
    }
    stopLoop();
    AudioEngine.pause();
    els.pauseBtn.textContent = 'Resume';
    els.statusText.textContent = 'Paused';
  },

  resume: () => {
    if (running) return;
    if (system === 'snes') {
      try { window._snesInstance?.play?.(); } catch (e) {}
      running = true;
      AudioEngine.resume();
      els.pauseBtn.textContent = 'Pause';
      els.statusText.textContent = 'Running';
      return;
    }
    if (system === 'nes') AudioEngine.resume();
    startLoop();
    els.pauseBtn.textContent = 'Pause';
    els.statusText.textContent = 'Running';
  },

  reset: () => {
    try {
      stopLoop(); AudioEngine.clear();
      if (system === 'snes') {
        try { window._snesInstance?.reset?.(); } catch (e) {}
        startLoop?.();
        els.pauseBtn.textContent = 'Pause';
        els.statusText.textContent = 'Reset';
        return;
      }
      if (system === 'gb') { 
        getGB()?.reset?.(); 
        startLoop(); 
        els.pauseBtn.textContent='Pause'; 
        els.statusText.textContent='Reset'; 
        return; 
      }
      if (usingWorker && emuWorker && currentROMBytes) {
        loadBytes(currentROMBytes, currentROMName);
        els.pauseBtn.textContent = 'Pause'; els.statusText.textContent = 'Reset';
        return;
      }
    } catch (e) { console.error(e); }
  },

  corruptRAM: (seed, count) => {
    if (usingWorker && emuWorker) {
      emuWorker.postMessage({ type: 'corruptRAM', payload: { seed, count } });
      return true;
    }
    return false;
  },
  button: (btnCode, down) => {
    if (system === 'nes') {
      emuWorker?.postMessage({ type:'button', payload:{ player:1, btn: btnCode, down } });
    } else if (system === 'gb') {
      const map = {
        [jsnes.Controller.BUTTON_UP]:'up',
        [jsnes.Controller.BUTTON_DOWN]:'down',
        [jsnes.Controller.BUTTON_LEFT]:'left',
        [jsnes.Controller.BUTTON_RIGHT]:'right',
        [jsnes.Controller.BUTTON_A]:'a',
        [jsnes.Controller.BUTTON_B]:'b',
        [jsnes.Controller.BUTTON_START]:'start',
        [jsnes.Controller.BUTTON_SELECT]:'select'
      };
      const k = map[btnCode]; if (!k) return;
      gbJoypad[k] = !!down; 
    }
  },
  setGBMode: (mode) => {
    try {
      els.wrap.dataset.gbMode = mode;
      localStorage.setItem('gbMode', mode);
      if (system === 'gb' && currentROMBytes && getGB()) {
        (async () => {
          const wasRunning = running;
          stopLoop();
          await getGB().config({ isGbcEnabled: (mode === 'gbc') });
          await getGB().loadROM(currentROMBytes);
          if (wasRunning) startLoop();
        })();
      }
    } catch (e) { console.error(e); }
  }
};

// NES-only save/load state helpers used by UI
export function saveState() {
  if (system !== 'nes' || !emuWorker || !usingWorker) {
    return Promise.reject(new Error('Save states are only supported for NES games using the worker'));
  }
  // Cancel any previous pending save
  pendingSaveResolve = null;
  pendingSaveReject = null;
  return new Promise((resolve, reject) => {
    pendingSaveResolve = resolve;
    pendingSaveReject = reject;
    try {
      emuWorker.postMessage({ type: 'saveState' });
    } catch (e) {
      pendingSaveResolve = null;
      pendingSaveReject = null;
      reject(e);
    }
  });
}

export function loadState(state) {
  if (system !== 'nes' || !emuWorker || !usingWorker) {
    return Promise.reject(new Error('Load states are only supported for NES games using the worker'));
  }
  // Cancel any previous pending load
  pendingLoadResolve = null;
  pendingLoadReject = null;
  return new Promise((resolve, reject) => {
    pendingLoadResolve = resolve;
    pendingLoadReject = reject;
    try {
      emuWorker.postMessage({ type: 'loadState', payload: { state } });
    } catch (e) {
      pendingLoadResolve = null;
      pendingLoadReject = null;
      reject(e);
    }
  });
}

 // NES memory helpers
export function getMemorySnapshot() {
  if (system !== 'nes' || !emuWorker || !usingWorker) {
    return Promise.reject(new Error('Memory view is only supported for NES games using the worker'));
  }
  pendingMemoryResolve = null;
  pendingMemoryReject = null;
  return new Promise((resolve, reject) => {
    pendingMemoryResolve = resolve;
    pendingMemoryReject = reject;
    try {
      emuWorker.postMessage({ type: 'getMemory' });
    } catch (e) {
      pendingMemoryResolve = null;
      pendingMemoryReject = null;
      reject(e);
    }
  });
}

export function setMemoryByte(addr, value) {
  if (system !== 'nes' || !emuWorker || !usingWorker) {
    return;
  }
  try {
    emuWorker.postMessage({
      type: 'setMemory',
      payload: { addr: addr >>> 0, value: value & 0xff },
    });
  } catch (e) {
    // best-effort; ignore failures
    console.error('setMemoryByte failed', e);
  }
}

function restartWorker(bytes, name){
  try { emuWorker?.terminate?.(); } catch {}
  emuWorker = null; usingWorker = false; running = false;
  // Clear any pending state operations
  pendingSaveResolve = null;
  pendingSaveReject = null;
  pendingLoadResolve = null;
  pendingLoadReject = null;
  pendingMemoryResolve = null;
  pendingMemoryReject = null;
  els.pauseBtn.disabled = true;
  els.resetBtn.disabled = true;
  els.saveStateBtn.disabled = true;
  window._pendingLoad = (bytes && name) ? { bytes: bytes.slice(), name } : window._pendingLoad;
  emulator.create();
}

export async function loadBytes(bytes, name) {
  isDataFile = false;
  currentROMBytes = bytes.slice(); currentROMName = name;
  const byExtGB = /\.gbc?$/i.test(name || '');
  const byHeaderGB = isGBROM(bytes);
  const isGB = byExtGB || byHeaderGB;

  // Detect SNES by extension; if a snesjs runtime is available (or can be loaded),
  // run SNES emulation, otherwise fall back to "data-only" mode for corruption/download.
  const byExtSNES = /\.(sfc|smc)$/i.test(name || '');
  if (byExtSNES) {
    // Ensure snes runtime is available (try dynamic load if necessary)
    const SNES = await ensureSNES();
    if (!SNES) {
      // No SNES engine present -> data-only
      isDataFile = true;
      originalROMBytes = bytes.slice();
      originalROMName = name;
      els.dropHint.style.display = 'none';
      els.statusText.textContent = `Loaded SNES ROM (${name}) — SNES emulation not available here; corruption only`;
      els.pauseBtn.disabled = true;
      els.resetBtn.disabled = true;
      els.saveStateBtn.disabled = true;
      return;
    }

    // SNES engine present: attempt to initialize and load ROM using snesjs
    try {
      system = 'snes';
      applyCanvasForSystem('snes');
      els.touchControls?.classList.remove('gb');
      try { getGB()?.pause?.(); } catch {}

      // instantiate or reuse SNES instance
      if (!window._snesInstance) {
        let inst = null;
        // Try a few common constructor patterns exposed by different builds
        if (typeof SNES === 'function') {
          try { inst = new SNES({ canvas: els.canvas }); } catch (e) { /* ignore */ }
        }
        if (!inst && SNES && typeof SNES.Snes === 'function') {
          try { inst = new SNES.Snes({ canvas: els.canvas }); } catch (e) { /* ignore */ }
        }
        if (!inst && typeof SNES.create === 'function') {
          try { inst = await SNES.create({ canvas: els.canvas }); } catch (e) { /* ignore */ }
        }
        // As a final fallback, allow SNES to accept just a canvas property via a plain object creator
        if (!inst && SNES && typeof SNES === 'object' && typeof SNES.init === 'function') {
          try { inst = await SNES.init({ canvas: els.canvas }); } catch (e) { /* ignore */ }
        }
        window._snesInstance = inst;
      }

      const snes = window._snesInstance;
      if (!snes || typeof snes.loadROM !== 'function') {
        els.statusText.textContent = `SNES runtime present but could not initialize emulator for ${name}`;
        // treat as data-only fallback
        isDataFile = true;
        originalROMBytes = bytes.slice();
        originalROMName = name;
        els.pauseBtn.disabled = true;
        els.resetBtn.disabled = true;
        els.saveStateBtn.disabled = true;
        return;
      }

      // snesjs commonly accepts ArrayBuffer or binary string; try both
      const maybeArrayBuffer = bytes.buffer ? bytes.buffer : new Uint8Array(bytes).buffer;
      try {
        // prefer direct ArrayBuffer if supported
        await snes.loadROM(maybeArrayBuffer);
      } catch (err) {
        // fallback to binary string
        const romStr = bytesToBinaryString(bytes);
        try {
          await snes.loadROM(romStr);
        } catch (err2) {
          console.error('SNES load failed:', err2);
          els.statusText.textContent = `SNES load failed: ${err2?.message || String(err2)}`;
          // fallback to data-only
          isDataFile = true;
          originalROMBytes = bytes.slice();
          originalROMName = name;
          els.pauseBtn.disabled = true;
          els.resetBtn.disabled = true;
          els.saveStateBtn.disabled = true;
          return;
        }
      }

      originalROMBytes = bytes.slice();
      originalROMName = name;
      els.dropHint.style.display = 'none';
      els.statusText.textContent = `Loaded SNES ROM: ${name}`;
      els.pauseBtn.disabled = false;
      els.resetBtn.disabled = false;
      // SNES save states not implemented here; disable .pla for SNES
      els.saveStateBtn.disabled = true;
      running = true;
      // start audio/play if instance provides it
      try { snes.play?.(); } catch {}
      els.wrap.focus();
      return;
    } catch (err) {
      console.error('SNES handling failed:', err);
      // If anything goes wrong, fall back to data-only behavior
      isDataFile = true;
      originalROMBytes = bytes.slice();
      originalROMName = name;
      els.dropHint.style.display = 'none';
      els.statusText.textContent = `Loaded SNES ROM (${name}) — SNES emulation not available here; corruption only`;
      els.pauseBtn.disabled = true;
      els.resetBtn.disabled = true;
      els.saveStateBtn.disabled = true;
      return;
    }
  }

  if (isGB && getGB()) {
    system = 'gb'; running = false;
    try { emuWorker?.terminate?.(); } catch {}
    usingWorker = false; emuWorker = null;
    (async () => {
      try {
        const GB = getGB();
        if (!GB) { els.statusText.textContent = 'WasmBoy not available'; return; }
        if (!gbInited) {
          await GB.config({
            isAudioEnabled: true, isGbcEnabled: (getGBMode() === 'gbc'), frameSkip: 0,
            isWasmBoyUsingWorkers: false,
            wasmUrl: 'https://unpkg.com/wasmboy@0.7.1/dist/wasmboy.wasm'
          });
          await GB.setCanvas(els.canvas);
          await GB.disableDefaultJoypad();
          gbInited = true;
        } else {
          await GB.config({
            isGbcEnabled: (getGBMode() === 'gbc'),
            isWasmBoyUsingWorkers: false,
            wasmUrl: 'https://unpkg.com/wasmboy@0.7.1/dist/wasmboy.wasm'
          });
        }
        applyCanvasForSystem('gb');
        els.touchControls?.classList.add('gb');
        await GB.loadROM(bytes);
        els.dropHint.style.display = 'none';
        els.statusText.textContent = `Loaded (Game Boy): ${name}`;
        els.pauseBtn.disabled = false; els.resetBtn.disabled = false;
        // Save states are NES-only for now
        els.saveStateBtn.disabled = true;
        // Auto-show on-screen controls for touch devices if no preference saved
        if (('ontouchstart' in window) && localStorage.getItem('touchControls') == null && els.touchControls && els.toggleTouchBtn) {
          els.touchControls.hidden = false;
          els.toggleTouchBtn.setAttribute('aria-pressed', 'true');
          els.toggleTouchBtn.textContent = 'Hide On-Screen Controls';
          localStorage.setItem('touchControls', '1');
        }
        els.wrap.focus();
        startLoop();
      } catch (err) {
        console.error('GB load failed:', err);
        let msg = '';
        if (err && typeof err === 'object' && 'text' in err && typeof err.text === 'function') {
          try { msg = await err.text(); } catch {}
        }
        els.statusText.textContent = `GB load failed: ${err?.message || msg || String(err)}`;
      }
    })();
    return;
  }
  system = 'nes';
  applyCanvasForSystem('nes');
  els.touchControls?.classList.remove('gb');
  // Ensure GB is paused when switching back to NES
  try { getGB()?.pause?.(); } catch {}
  if (emuWorker) {
    if (usingWorker) {
      const copy = bytes.slice();
      emuWorker.postMessage({ type: 'loadROM', payload: { bytes: copy.buffer } }, [copy.buffer]);
      els.dropHint.style.display = 'none';
      els.statusText.textContent = `Loaded: ${name}`;
      els.pauseBtn.disabled = false; els.resetBtn.disabled = false;
      // NES save states available when using worker
      els.saveStateBtn.disabled = false;
      AudioEngine.resume();
      running = true;
      armWatchdog(bytes.slice(), name);
    } else {
      window._pendingLoad = { bytes: bytes.slice(), name };
      els.statusText.textContent = 'Waiting for worker…';
      els.dropHint.style.display = 'none';
    }
  } else {
    // No worker (likely after GB) — recreate and queue the load
    window._pendingLoad = { bytes: bytes.slice(), name };
    els.statusText.textContent = 'Starting NES worker…';
    emulator.create();
  }
}

export async function loadROMFromFile(file) {
  if (!file) return;
  els.statusText.textContent = `Loading ${file.name}…`;
  try {
    const buf = await file.arrayBuffer();
    const bytes = new Uint8Array(buf);
    originalROMBytes = bytes.slice();
    originalROMName = file.name;

    // Treat common non-emulated binary formats and SNES ROMs as "data files"
    const isData = /\.(com|img|flp|mp4|wav|wad|iso|sfc|smc)$/i.test(file.name);
    if (isData) {
      isDataFile = true;
      els.dropHint.style.display = 'none';
      // Provide clearer message for SNES files vs generic binary files
      if (/\.(sfc|smc)$/i.test(file.name)) {
        els.statusText.textContent = `Loaded SNES ROM (${file.name}) — SNES emulation not available here; corruption only`;
      } else {
        els.statusText.textContent = `Loaded binary file (${file.name}) — corruption only, no emulation`;
      }
      els.pauseBtn.disabled = true;
      els.resetBtn.disabled = true;
      els.saveStateBtn.disabled = true;
      els.romInput.value = '';
      return;
    }

    isDataFile = false;
    loadBytes(bytes, file.name);
    els.romInput.value = '';
  } catch (e) {
    console.error(e);
    els.statusText.textContent = 'Failed to load ROM';
  }
}

export async function loadROMFromURL(url, name = url.split('/').pop()) {
  els.statusText.textContent = `Loading ${name}…`;
  // Try a few fetch strategies to handle spaces, parentheses, and different server behaviors.
  const tryFetch = async (u) => {
    try {
      const res = await fetch(u);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const buf = await res.arrayBuffer();
      return new Uint8Array(buf);
    } catch (err) {
      // bubble up so caller can try another strategy
      throw err;
    }
  };

  // Build candidate URLs to try
  const candidates = [];
  // 1) sanitize single quotes
  const safeUrl = url.includes("'") ? url.replace(/'/g, '%27') : url;
  // 2) encodeURI (preserves some characters but encodes spaces)
  candidates.push(encodeURI(safeUrl));
  // 3) encodeURIComponent for the path portion (more aggressive)
  try {
    const parts = safeUrl.split('/');
    const last = parts.pop();
    parts.push(encodeURIComponent(last));
    candidates.push(parts.join('/'));
  } catch (err) { /* ignore */ }
  // 4) replace spaces explicitly with %20 as a fallback
  candidates.push(safeUrl.replace(/ /g, '%20'));

  // 5) also try using the provided name as a filename under root (useful for bundled assets)
  if (name && name !== url) {
    candidates.push(encodeURI('/' + name));
    candidates.push('/' + name.replace(/ /g, '%20'));
  }

  let bytes = null;
  let lastErr = null;
  for (const c of candidates) {
    if (!c) continue;
    try {
      bytes = await tryFetch(c);
      // success
      break;
    } catch (err) {
      lastErr = err;
      console.warn('fetch candidate failed:', c, err);
    }
  }

  if (!bytes) {
    console.error('All fetch attempts failed:', lastErr);
    els.statusText.textContent = `Failed to load ROM: ${name}`;
    return;
  }

  try {
    const urlExt = (url.match(/\.[A-Za-z0-9]+$/) || [])[0] || '';
    const normalizedName = /\.[A-Za-z0-9]+$/.test(name) ? name : (name + urlExt);
    isDataFile = false;
    originalROMBytes = bytes.slice();
    originalROMName = normalizedName;
    loadBytes(bytes, normalizedName);
  } catch (e) {
    console.error(e);
    els.statusText.textContent = `Failed to load ROM: ${name}`;
  }
}

function startGBInputLoop() {
  if (gbInputRAF) return;
  const tick = () => {
    if (system === 'gb' && running) { getGB()?.setJoypadState?.(gbJoypad); }
    gbInputRAF = requestAnimationFrame(tick);
  };
  gbInputRAF = requestAnimationFrame(tick);
}

function stopGBInputLoop() { if (gbInputRAF) { cancelAnimationFrame(gbInputRAF); gbInputRAF = null; } }

function getGBMode() { return localStorage.getItem('gbMode') || 'mono'; }