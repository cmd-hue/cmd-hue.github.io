import { els } from './dom.js';
import { AudioEngine } from './audio.js';
import { emulator, loadROMFromFile, loadBytes, originalROMBytes, originalROMName, isDataFile, getSystem, saveState, loadState, getCurrentROMName, getMemorySnapshot, setMemoryByte } from './emulator.js';
import { corruptBytes } from './corruption.js';

function togglePause() {
  if (emulator.isRunning) {
    emulator.pause();
  } else {
    emulator.resume();
  }
}

export function corruptAndReload() {
  if (!originalROMBytes) {
    els.statusText.textContent = 'Load a ROM or supported file first';
    return;
  }
  let seed = (els.seedInput?.value || '').trim();
  const mode = (els.modeSelect?.value || 'rom');
  // Allow byte count to exceed the old 65536 hard cap; if a ROM is loaded clamp to ROM length
  let count = parseInt(els.byteCountInput?.value, 10);
  if (Number.isNaN(count) || count < 1) count = 25;
  if (typeof originalROMBytes !== 'undefined' && originalROMBytes && originalROMBytes.length) {
    // don't allow requesting more bytes than exist in the ROM; otherwise accept the requested count
    count = Math.min(count, originalROMBytes.length);
  }

  if (!seed) {
    seed = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    if (els.seedInput) els.seedInput.value = seed;
  }

  // Special handling for binary data-only files (no emulation, just corruption + download)
  if (isDataFile) {
    const src = originalROMBytes.slice();
    corruptBytes(src, seed, count);

    const baseName = (() => {
      const n = originalROMName || 'image.img';
      const m = n.match(/^(.*?)(\.[A-Za-z0-9]+)$/);
      return m ? { name: m[1], ext: m[2] } : { name: n, ext: '' };
    })();

    const downloadName = `${baseName.name} (corrupted - ${seed})${baseName.ext}`;
    const blob = new Blob([src], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = downloadName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    els.statusText.textContent = `Binary file corrupted & downloaded • seed: ${seed} • bytes: ${count}`;
    return;
  }

  if (mode === 'ram') {
    const ok = emulator.corruptRAM(seed, count);
    els.statusText.textContent = ok ? `RAM corrupted • seed: ${seed} • bytes: ${count}` : 'RAM corruption failed';
    return;
  }

  const src = originalROMBytes.slice();
  corruptBytes(src, seed, count);
  const nameWithExt = (() => {
    const n = originalROMName || 'rom.gb';
    const m = n.match(/^(.*?)(\.[A-Za-z0-9]+)$/);
    return m ? `${m[1]} (corrupted)${m[2]}` : `${n} (corrupted)`;
  })();
  loadBytes(src, nameWithExt);
  els.statusText.textContent = `ROM corrupted • seed: ${seed} • bytes: ${count}`;
}

export function downloadCorruptedROM() {
  if (!originalROMBytes) {
    els.statusText.textContent = 'Load a ROM or supported file first';
    return;
  }

  let seed = (els.seedInput?.value || '').trim();
  // Allow byte count to exceed the old 65536 hard cap; if a ROM is loaded clamp to ROM length
  let count = parseInt(els.byteCountInput?.value, 10);
  if (Number.isNaN(count) || count < 1) count = 25;
  if (typeof originalROMBytes !== 'undefined' && originalROMBytes && originalROMBytes.length) {
    count = Math.min(count, originalROMBytes.length);
  }

  if (!seed) {
    seed = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    if (els.seedInput) els.seedInput.value = seed;
  }

  const src = originalROMBytes.slice();
  corruptBytes(src, seed, count);

  const baseName = (() => {
    const n = originalROMName || (isDataFile ? 'image.img' : 'rom.gb');
    const m = n.match(/^(.*?)(\.[A-Za-z0-9]+)$/);
    return m ? { name: m[1], ext: m[2] } : { name: n, ext: '' };
  })();

  const downloadName = `${baseName.name} (corrupted - ${seed})${baseName.ext}`;
  const blob = new Blob([src], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = downloadName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);

  const kind = isDataFile ? 'binary file' : 'ROM';
  els.statusText.textContent = `Downloaded corrupted ${kind} • seed: ${seed} • bytes: ${count}`;
}

const keyMap = {
  'ArrowUp': { player: 1, button: jsnes.Controller.BUTTON_UP },
  'ArrowDown': { player: 1, button: jsnes.Controller.BUTTON_DOWN },
  'ArrowLeft': { player: 1, button: jsnes.Controller.BUTTON_LEFT },
  'ArrowRight': { player: 1, button: jsnes.Controller.BUTTON_RIGHT },
  'KeyW': { player: 1, button: jsnes.Controller.BUTTON_UP },
  'KeyS': { player: 1, button: jsnes.Controller.BUTTON_DOWN },
  'KeyA': { player: 1, button: jsnes.Controller.BUTTON_LEFT },
  'KeyD': { player: 1, button: jsnes.Controller.BUTTON_RIGHT },
  'KeyX': { player: 1, button: jsnes.Controller.BUTTON_A },
  'KeyK': { player: 1, button: jsnes.Controller.BUTTON_A },
  'KeyZ': { player: 1, button: jsnes.Controller.BUTTON_B },
  'KeyJ': { player: 1, button: jsnes.Controller.BUTTON_B },
  'Enter': { player: 1, button: jsnes.Controller.BUTTON_START },
  'ShiftRight': { player: 1, button: jsnes.Controller.BUTTON_SELECT },
};

function handleKey(e, isDown) {
  const mapping = keyMap[e.code];
  if (mapping) {
    e.preventDefault();
    emulator.button(mapping.button, isDown);
  } else if (isDown) {
    if (e.code === 'KeyP') togglePause();
    if (e.code === 'KeyR') emulator.reset();
  }
}

function buildTextPatchedBytes() {
  if (!originalROMBytes) {
    els.statusText.textContent = 'Load a file first (find & replace requires loaded data)';
    return null;
  }

  const findStrRaw = (els.findTextInput?.value || '').trim();
  const replaceStrRaw = (els.replaceTextInput?.value || '').trim();

  if (!findStrRaw) {
    els.statusText.textContent = 'Enter text to find in the ROM';
    return null;
  }

  // Special colon syntax:
  // 1) "AA:BB" -> replace every byte 0xAA in the ROM with 0xBB (quick global replace)
  // 2) "0xADDR1:0xADDR2" -> copy the byte at ROM address ADDR2 into ROM address ADDR1
  // This provides shorthand for both global single-byte swaps and address-to-address copying.
  const colonBytePair = findStrRaw.match(/^\s*0x?([0-9a-fA-F]{1,2})\s*:\s*0x?([0-9a-fA-F]{1,2})\s*$/);
  // allow pipe-separated lists for address copy syntax like "0xAAA|0xBBB:0xCCC|0xDDD"
  const colonAddrPair = findStrRaw.match(/^\s*(0x[0-9a-fA-F]{3,}(?:\|0x[0-9a-fA-F]{3,})*)\s*:\s*(0x[0-9a-fA-F]{3,}(?:\|0x[0-9a-fA-F]{3,})*)\s*$/i);
  if (colonAddrPair || colonBytePair) {
    if (!originalROMBytes) {
      els.statusText.textContent = 'Load a file first (colon replace requires loaded data)';
      return null;
    }
    const src = originalROMBytes.slice();

    if (colonAddrPair) {
      // Support copying from multiple source addresses to multiple destination addresses.
      // Left and right sides can be pipe-separated lists; we broadcast or pad values as needed.
      const leftList = colonAddrPair[1].split('|').map(s => s.trim().replace(/^0x/i, '')).filter(Boolean).map(s => parseInt(s, 16));
      const rightList = colonAddrPair[2].split('|').map(s => s.trim().replace(/^0x/i, '')).filter(Boolean).map(s => parseInt(s, 16));

      if (leftList.length === 0 || rightList.length === 0) {
        els.statusText.textContent = 'Invalid address list';
        return null;
      }

      // If both sides are single addresses and right > left, treat as a contiguous range copy:
      // copy the contiguous block starting at rightList[0] into the block starting at leftList[0]
      if (leftList.length === 1 && rightList.length === 1 && rightList[0] > leftList[0]) {
        const dstStart = leftList[0];
        const srcStart = rightList[0];
        // compute maximum length we can safely copy without exceeding ROM bounds
        const maxLen = Math.min(src.length - dstStart, src.length - srcStart);
        if (maxLen <= 0) {
          els.statusText.textContent = 'Address range out of ROM bounds';
          return null;
        }
        let wrote = 0;
        for (let i = 0; i < maxLen; i++) {
          src[dstStart + i] = src[srcStart + i];
          wrote++;
        }
        return { bytes: src, count: wrote, findStr: `${colonAddrPair[1].toUpperCase()}:${colonAddrPair[2].toUpperCase()}` };
      }

      // Validate addresses
      for (const a of [...leftList, ...rightList]) {
        if (Number.isNaN(a) || a < 0 || a >= src.length) {
          els.statusText.textContent = 'Address out of ROM range';
          return null;
        }
      }

      // If only one source provided but multiple destinations, broadcast that single source byte.
      // If multiple sources and multiple destinations with differing counts, pad the shorter list by repeating its last value.
      const maxLen = Math.max(leftList.length, rightList.length);
      const leftP = leftList.slice();
      const rightP = rightList.slice();
      while (leftP.length < maxLen) leftP.push(leftP[leftP.length - 1]);
      while (rightP.length < maxLen) rightP.push(rightP[rightP.length - 1]);

      let writes = 0;
      for (let i = 0; i < maxLen; i++) {
        const dst = leftP[i];
        const srcAddr = rightP[i];
        // copy byte from srcAddr to dst
        src[dst] = src[srcAddr];
        writes++;
      }

      return { bytes: src, count: writes, findStr: `${colonAddrPair[1].toUpperCase()}:${colonAddrPair[2].toUpperCase()}` };
    } else {
      // Legacy byte->byte global replace
      const from = parseInt(colonBytePair[1], 16) & 0xff;
      const to = parseInt(colonBytePair[2], 16) & 0xff;
      let applied = 0;
      for (let i = 0; i < src.length; i++) {
        if (src[i] === from) {
          src[i] = to;
          applied++;
        }
      }
      if (applied === 0) {
        els.statusText.textContent = `No occurrences of byte 0x${colonBytePair[1].toUpperCase()} found in ROM`;
        return null;
      }
      return { bytes: src, count: applied, findStr: `${colonBytePair[1].toUpperCase()}:${colonBytePair[2].toUpperCase()}` };
    }
  }

  // Support direct single-address or comma/pipe-separated address->byte replacements like:
  // "0x075A to FF", "0x075A:FF, 0x07A0 to 1F" or multi-mappings like "0xFF|0xEE = 0x01|0x0E"
  // Also support the case where the Find field contains pipe-separated addresses and the Replace field
  // contains the corresponding pipe-separated byte values (e.g. Find: "0xAAA|0xBBB" Replace: "0x11|0x22").
  const rawEntries = findStrRaw.split(/\s*,\s*/).map(s => s.trim()).filter(Boolean);

  // Detect entries that look like address->value mappings (left and right sides can contain '|' separated lists)
  // Allow optional 0x on any address in a pipe-separated list (e.g. "0x1A|1B|0x2C = 0xFF|0xEE")
  const mappingPattern = /^(?:0x)?([0-9a-fA-F]+(?:\|(?:0x)?[0-9a-fA-F]+)*)\s*(?:to|:|=)\s*0x?([0-9a-fA-F]{1,2}(?:\|[0-9a-fA-F]{1,2})*)$/i;

  // Case A: explicit inline mappings in the Find field like "0xAA|0xBB = 0x11|0x22"
  if (rawEntries.length && rawEntries.every(entry => mappingPattern.test(entry))) {
    const src = originalROMBytes.slice();
    let applied = 0;

    for (const entry of rawEntries) {
      const m = entry.match(mappingPattern);
      if (!m) continue;

      // left = addresses (pipe-separated), right = byte values (pipe-separated)
      const leftPart = m[1];
      const rightPart = m[2];

      const addrs = leftPart.split('|').map(a => parseInt(a, 16)).filter(a => !Number.isNaN(a));
      const vals = rightPart.split('|')
        .map(v => v.trim().replace(/^0x/i, ''))
        .map(v => parseInt(v, 16) & 0xff)
        .filter(v => !Number.isNaN(v));

      // If single value provided but multiple addresses, broadcast the value to all addresses
      if (vals.length === 1 && addrs.length > 1) {
        const v = vals[0];
        for (const addr of addrs) {
          if (addr >= 0 && addr < src.length) {
            src[addr] = v;
            applied++;
          }
        }
      } else if (vals.length > 1 && vals.length < addrs.length) {
        // If fewer values than addresses, pad by repeating the last provided value
        const padded = vals.slice();
        while (padded.length < addrs.length) padded.push(padded[padded.length - 1]);
        for (let i = 0; i < addrs.length; i++) {
          const addr = addrs[i];
          const value = padded[i];
          if (addr >= 0 && addr < src.length) {
            src[addr] = value;
            applied++;
          }
        }
      } else if (addrs.length === vals.length) {
        for (let i = 0; i < addrs.length; i++) {
          const addr = addrs[i];
          const value = vals[i];
          if (addr >= 0 && addr < src.length) {
            src[addr] = value;
            applied++;
          }
        }
      } else {
        // mismatch counts -> skip this entry
        continue;
      }
    }

    if (applied === 0) {
      els.statusText.textContent = 'No valid address->byte replacements found';
      return null;
    }
    return { bytes: src, count: applied, findStr: rawEntries.join(', ') };
  }

  // Case B: Find field lists addresses (pipe-separated) and Replace field provides matching bytes.
  // Example: Find: "0x001894|0x001893"  Replace: "0xFF|0xEE"  OR Replace: "0xFF" (broadcast)
  // Accept optional 0x prefixes for addresses in a pipe-separated list
  const addrListOnlyPattern = /^(?:0x)?([0-9a-fA-F]+(?:\|(?:0x)?[0-9a-fA-F]+)*)$/i;
  // be more permissive: allow optional 0x prefixes and optional whitespace around pipes in replace field
  const replaceBytesPattern = /^(\s*0x?[0-9a-fA-F]{1,2}\s*(?:\|\s*0x?[0-9a-fA-F]{1,2}\s*)*)$/i;
  if (rawEntries.length === 1 && addrListOnlyPattern.test(rawEntries[0]) && replaceBytesPattern.test(replaceStrRaw)) {
    const src = originalROMBytes.slice();
    const leftMatch = rawEntries[0].match(addrListOnlyPattern);
    const addrs = leftMatch[1].split('|').map(a => parseInt(a, 16)).filter(a => !Number.isNaN(a));
    // normalize replace list: strip whitespace, allow 0x prefix, split on |
    const vals = replaceStrRaw
      .split('|')
      .map(v => v.trim().replace(/^0x/i, ''))
      .map(v => parseInt(v, 16) & 0xff)
      .filter(v => !Number.isNaN(v));
    let applied = 0;

    if (vals.length === 0) {
      els.statusText.textContent = 'No valid replacement bytes provided';
      return null;
    }
    if (vals.length === 1 && addrs.length > 0) {
      // broadcast single value
      const v = vals[0];
      for (const addr of addrs) {
        if (addr >= 0 && addr < src.length) { src[addr] = v; applied++; }
      }
    } else if (vals.length > 1 && vals.length < addrs.length) {
      // pad by repeating last value so users don't get a mismatch error
      const padded = vals.slice();
      while (padded.length < addrs.length) padded.push(padded[padded.length - 1]);
      for (let i = 0; i < addrs.length; i++) {
        const addr = addrs[i];
        const value = padded[i];
        if (addr >= 0 && addr < src.length) { src[addr] = value; applied++; }
      }
    } else if (addrs.length === vals.length) {
      for (let i = 0; i < addrs.length; i++) {
        const addr = addrs[i];
        const value = vals[i];
        if (addr >= 0 && addr < src.length) { src[addr] = value; applied++; }
      }
    } else {
      els.statusText.textContent = 'Address / value count mismatch';
      return null;
    }

    if (applied === 0) {
      els.statusText.textContent = 'No valid address->byte replacements found';
      return null;
    }
    return { bytes: src, count: applied, findStr: rawEntries.join(', ') };
  }

  // Support direct single-address hex replacement like "0x075A" -> "FF" (or "E")
  const addrMatch = findStrRaw.match(/^0x([0-9a-fA-F]+)$/);
  if (addrMatch) {
    const addr = parseInt(addrMatch[1], 16);
    if (Number.isNaN(addr) || addr < 0) {
      els.statusText.textContent = 'Invalid ROM address';
      return null;
    }
    // Accept replacement as "FF", "0xFF", or single hex digit like "E"
    const byteMatch = (replaceStrRaw || '').match(/^0x?([0-9a-fA-F]{1,2})$/);
    if (!byteMatch) {
      els.statusText.textContent = 'Replacement must be a hex byte like FF or 0xFF';
      return null;
    }
    const value = parseInt(byteMatch[1], 16) & 0xff;
    const src = originalROMBytes.slice();
    // only apply if address is within ROM range
    if (!src || addr < 0 || addr >= src.length) {
      els.statusText.textContent = 'Address out of ROM range';
      return null;
    }
    src[addr] = value;
    return { bytes: src, count: 1, findStr: `0x${addr.toString(16).toUpperCase().padStart(4,'0')}` };
  }

  // Helper: parse hex byte sequences like "DE AD BE EF", "DE|AD|BE|EF", "0xDE 0xAD" or "\xDE\xAD"
  function parseHexSequence(str) {
    if (!str || !str.length) return null;
    // normalize \xHH sequences into space-separated bytes
    const backslashHex = /\\x([0-9a-fA-F]{2})/g;
    if (backslashHex.test(str)) {
      const arr = [];
      str.replace(backslashHex, (_, h) => { arr.push(parseInt(h, 16)); return ''; });
      return arr.length ? new Uint8Array(arr) : null;
    }
    // strip commas, pipes and allow 0x prefixes
    const parts = str.replace(/[,|]/g, ' ').split(/\s+/).map(s => s.trim()).filter(Boolean);
    if (parts.length === 0) return null;
    // if every part looks like a hex byte, parse them
    const maybeHex = parts.every(p => /^0x?[0-9a-fA-F]{1,2}$/.test(p));
    if (maybeHex) {
      const arr = parts.map(p => parseInt(p.replace(/^0x/i, ''), 16) & 0xff);
      return new Uint8Array(arr);
    }
    return null;
  }

  // Encode strings as ASCII bytes (fallback)
  const textToBytes = (str) => {
    // If the user provided a hex-style byte sequence, prefer that for binary patching
    const hexParsed = parseHexSequence(str);
    if (hexParsed) return hexParsed;
    const arr = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
      arr[i] = str.charCodeAt(i) & 0xFF;
    }
    return arr;
  };

  const findBytes = textToBytes(findStrRaw);
  if (!findBytes.length) {
    els.statusText.textContent = 'Find text is empty';
    return null;
  }

  let replaceBytes = textToBytes(replaceStrRaw);
  if (!replaceBytes.length) {
    // If replace text is empty, fill with spaces so length stays the same
    replaceBytes = new Uint8Array(findBytes.length);
    replaceBytes.fill(0x20);
  }

  // Ensure replacement length matches find length to avoid shifting ROM layout
  if (replaceBytes.length !== findBytes.length) {
    const resized = new Uint8Array(findBytes.length);
    const len = Math.min(findBytes.length, replaceBytes.length);
    for (let i = 0; i < len; i++) resized[i] = replaceBytes[i];
    for (let i = len; i < resized.length; i++) resized[i] = 0x20; // space padding
    replaceBytes = resized;
  }

  const src = originalROMBytes.slice();
  let count = 0;

  // Simple forward scan for all occurrences
  outer: for (let i = 0; i <= src.length - findBytes.length; i++) {
    for (let j = 0; j < findBytes.length; j++) {
      if (src[i + j] !== findBytes[j]) continue outer;
    }
    // Match found – apply replacement
    for (let j = 0; j < findBytes.length; j++) {
      src[i + j] = replaceBytes[j];
    }
    count++;
    i += findBytes.length - 1; // skip over the replaced segment
  }

  if (count === 0) {
    // If no literal text occurrences found but user provided a pipe-separated address list in the Find field
    // and the Replace field looks like bytes, try to treat it as address->byte replacements as a fallback.
    // Fallback: also accept optional 0x prefixes inside pipe-separated lists
    const addrListOnlyPatternFallback = /^(?:0x)?([0-9a-fA-F]+(?:\|(?:0x)?[0-9a-fA-F]+)*)$/i;
    const replaceBytesPatternFallback = /^(\s*0x?[0-9a-fA-F]{1,2}\s*(?:\|\s*0x?[0-9a-fA-F]{1,2}\s*)*)$/i;
    if (addrListOnlyPatternFallback.test(findStrRaw) && replaceBytesPatternFallback.test(replaceStrRaw)) {
      // reuse the address-list logic above to build a patched ROM
      const leftMatch = findStrRaw.match(addrListOnlyPatternFallback);
      const addrs = leftMatch[1].split('|').map(a => parseInt(a, 16)).filter(a => !Number.isNaN(a));
      const vals = replaceStrRaw
        .split('|')
        .map(v => v.trim().replace(/^0x/i, ''))
        .map(v => parseInt(v, 16) & 0xff)
        .filter(v => !Number.isNaN(v));
      if (vals.length === 0) {
        els.statusText.textContent = 'No valid replacement bytes provided';
        return null;
      }
      const src = originalROMBytes.slice();
      let appliedFallback = 0;
      if (vals.length === 1 && addrs.length > 0) {
        const v = vals[0];
        for (const addr of addrs) {
          if (addr >= 0 && addr < src.length) { src[addr] = v; appliedFallback++; }
        }
      } else if (vals.length > 1 && vals.length < addrs.length) {
        // pad values by repeating the last provided byte
        const padded = vals.slice();
        while (padded.length < addrs.length) padded.push(padded[padded.length - 1]);
        for (let i = 0; i < addrs.length; i++) {
          const addr = addrs[i];
          const value = padded[i];
          if (addr >= 0 && addr < src.length) { src[addr] = value; appliedFallback++; }
        }
      } else if (addrs.length === vals.length) {
        for (let i = 0; i < addrs.length; i++) {
          const addr = addrs[i];
          const value = vals[i];
          if (addr >= 0 && addr < src.length) { src[addr] = value; appliedFallback++; }
        }
      }
      if (appliedFallback === 0) {
        els.statusText.textContent = 'No valid address->byte replacements found';
        return null;
      }
      return { bytes: src, count: appliedFallback, findStr: findStrRaw };
    }

    els.statusText.textContent = `No occurrences of "${findStrRaw}" found in ROM or memory`;
    return null;
  }

  return { bytes: src, count, findStr: findStrRaw };
}

async function applyTextPatch() {
  const mode = (els.modeSelect?.value || 'rom');

  // RAM text patch: directly modify NES memory instead of ROM
  if (mode === 'ram' && getSystem() === 'nes') {
    if (!els.findTextInput) return;

    const findStrRaw = (els.findTextInput.value || '').trim();
    const replaceStrRaw = (els.replaceTextInput?.value || '').trim();

    if (!findStrRaw) {
      els.statusText.textContent = 'Enter text to find in memory';
      return;
    }

    // Support colon-style address copy syntax similar to ROM mode:
    // - "0xAAA:0xBBB" or "0xA|0xB:0xC|0xD" -> copy bytes from right addresses to left addresses
    // - "0xSTART:0xEND" (single pair where END > START) -> copy the contiguous range [START..END] from current RAM
    const colonAddrPair = findStrRaw.match(/^\s*(0x[0-9a-fA-F]{3,}(?:\|0x[0-9a-fA-F]{3,})*)\s*:\s*(0x[0-9a-fA-F]{3,}(?:\|0x[0-9a-fA-F]{3,})*)\s*$/i);
    if (colonAddrPair) {
      try {
        const leftList = colonAddrPair[1].split('|').map(s => s.trim().replace(/^0x/i, '')).filter(Boolean).map(s => parseInt(s, 16));
        const rightList = colonAddrPair[2].split('|').map(s => s.trim().replace(/^0x/i, '')).filter(Boolean).map(s => parseInt(s, 16));

        if (leftList.length === 0 || rightList.length === 0) {
          els.statusText.textContent = 'Invalid address list';
          return;
        }

        // validate availability of memory snapshot
        const mem = await getMemorySnapshot();
        if (!mem || !mem.length) {
          els.statusText.textContent = 'Memory not available for address copy';
          return;
        }

        // If both sides are single addresses and right > left, treat as a range copy:
        // copy the contiguous block starting at rightList[0] into the block starting at leftList[0]
        if (leftList.length === 1 && rightList.length === 1 && rightList[0] > leftList[0]) {
          const dstStart = leftList[0];
          const srcStart = rightList[0];
          // compute maximum length we can safely copy without exceeding RAM
          const maxLen = Math.min(mem.length - dstStart, mem.length - srcStart);
          if (maxLen <= 0) {
            els.statusText.textContent = 'Address range out of memory bounds';
            return;
          }
          let wrote = 0;
          for (let i = 0; i < maxLen; i++) {
            const v = mem[srcStart + i] & 0xff;
            if (typeof setMemoryByte === 'function') setMemoryByte(dstStart + i, v);
            mem[dstStart + i] = v;
            wrote++;
          }
          els.statusText.textContent = `Copied ${wrote} byte${wrote === 1 ? '' : 's'} in RAM • range $${dstStart.toString(16).toUpperCase()} : $${(dstStart + maxLen - 1).toString(16).toUpperCase()} <= from $${srcStart.toString(16).toUpperCase()}`;
          return;
        }

        // Otherwise handle list-to-list copy (broadcast/pad as needed)
        for (const a of [...leftList, ...rightList]) {
          if (Number.isNaN(a) || a < 0 || a >= mem.length) {
            els.statusText.textContent = 'Address out of memory range';
            return;
          }
        }

        const maxLen = Math.max(leftList.length, rightList.length);
        const leftP = leftList.slice();
        const rightP = rightList.slice();
        while (leftP.length < maxLen) leftP.push(leftP[leftP.length - 1]);
        while (rightP.length < maxLen) rightP.push(rightP[rightP.length - 1]);

        let wrote = 0;
        for (let i = 0; i < maxLen; i++) {
          const dst = leftP[i];
          const srcAddr = rightP[i];
          const value = mem[srcAddr] & 0xff;
          if (typeof setMemoryByte === 'function') setMemoryByte(dst, value);
          // also update local snapshot for UI feedback
          mem[dst] = value;
          wrote++;
        }

        els.statusText.textContent = `Copied ${wrote} byte${wrote === 1 ? '' : 's'} in RAM • ${colonAddrPair[1].toUpperCase()}:${colonAddrPair[2].toUpperCase()}`;
      } catch (err) {
        console.error('RAM address copy failed:', err);
        els.statusText.textContent = 'RAM address copy failed';
      }
      return;
    }

    // If the user provided direct address->byte replacements, support single or comma-separated entries,
    // and allow pipe-separated multi-mappings like "0xFF|0xEE = 0x01|0x0E"
    const entries = findStrRaw.split(/\s*,\s*/).map(s => s.trim()).filter(Boolean);
    // Allow optional 0x prefixes in RAM mapping input as well
    const mappingRe = /^(?:0x)?([0-9a-fA-F]+(?:\|(?:0x)?[0-9a-fA-F]+)*)\s*(?:to|:|=)\s*0x?([0-9a-fA-F]{1,2}(?:\|[0-9a-fA-F]{1,2})*)$/i;
    if (entries.length && entries.every(e => mappingRe.test(e))) {
      let wrote = 0;
      try {
        // attempt to update live memory for each mapping entry
        for (const e of entries) {
          const m = e.match(mappingRe);
          if (!m) continue;
          const left = m[1];
          const right = m[2];
          const addrs = left.split('|').map(a => parseInt(a, 16)).filter(a => !Number.isNaN(a));
          const vals = right.split('|').map(v => parseInt(v, 16) & 0xff).filter(v => !Number.isNaN(v));

          if (vals.length === 1 && addrs.length > 0) {
            // broadcast single value to all addresses
            for (const addr of addrs) {
              if (Number.isNaN(addr) || addr < 0) continue;
              if (typeof setMemoryByte === 'function') setMemoryByte(addr, vals[0]);
              wrote++;
            }
          } else if (addrs.length === vals.length) {
            for (let i = 0; i < addrs.length; i++) {
              const addr = addrs[i];
              const value = vals[i];
              if (Number.isNaN(addr) || addr < 0) continue;
              if (typeof setMemoryByte === 'function') setMemoryByte(addr, value);
              wrote++;
            }
          } else {
            // mismatch counts -> skip
            continue;
          }
        }

        // try to refresh a snapshot and update it for UI
        try {
          const mem = await getMemorySnapshot();
          if (mem && mem.length) {
            for (const e of entries) {
              const m = e.match(mappingRe);
              if (!m) continue;
              const left = m[1]; const right = m[2];
              const addrs = left.split('|').map(a => parseInt(a, 16)).filter(a => !Number.isNaN(a));
              const vals = right.split('|').map(v => parseInt(v, 16) & 0xff).filter(v => !Number.isNaN(v));
              if (vals.length === 1) {
                for (const addr of addrs) { if (addr >=0 && addr < mem.length) mem[addr] = vals[0]; }
              } else if (addrs.length === vals.length) {
                for (let i = 0; i < addrs.length; i++) { const addr = addrs[i]; if (addr >=0 && addr < mem.length) mem[addr] = vals[i]; }
              }
            }
          }
        } catch (e) { /* ignore snapshot failures */ }

        if (wrote === 0) {
          els.statusText.textContent = 'No valid address->byte replacements found';
        } else {
          els.statusText.textContent = `Wrote ${wrote} byte${wrote === 1 ? '' : 's'} to RAM`;
        }
      } catch (err) {
        console.error('Direct memory write failed:', err);
        els.statusText.textContent = 'Direct memory write failed';
      }
      return;
    }

    // If the user provided a direct address like 0x075A, support writing a single byte:
    // Example: find = "0x075A" replace = "FF"
    const addrMatch = findStrRaw.match(/^0x([0-9a-fA-F]+)$/);
    if (addrMatch) {
      const addr = parseInt(addrMatch[1], 16);
      if (Number.isNaN(addr) || addr < 0 || addr > 0xFFFF) {
        els.statusText.textContent = 'Invalid address';
        return;
      }
      // parse replacement byte (allow "FF" or "0xFF")
      const byteMatch = (replaceStrRaw || '').match(/^0x?([0-9a-fA-F]{1,2})$/);
      if (!byteMatch) {
        els.statusText.textContent = 'Replacement must be a hex byte like FF or 0xFF';
        return;
      }
      const value = parseInt(byteMatch[1], 16) & 0xff;
      try {
        // write into live memory
        if (typeof setMemoryByte === 'function') setMemoryByte(addr, value);
        // also attempt to update a fresh memory snapshot for UI users
        try {
          const mem = await getMemorySnapshot();
          if (mem && addr < mem.length) mem[addr] = value;
        } catch (e) {
          // ignore snapshot failures; setMemoryByte is best-effort
        }
        els.statusText.textContent = `Wrote $${addr.toString(16).padStart(4,'0').toUpperCase()} = ${value.toString(16).padStart(2,'0').toUpperCase()} in RAM`;
      } catch (e) {
        console.error('Direct memory write failed:', e);
        els.statusText.textContent = 'Direct memory write failed';
      }
      return;
    }

    // Encode strings as ASCII bytes for search/replace behavior
    const findStr = findStrRaw;
    const textToBytes = (str) => {
      const arr = new Uint8Array(str.length);
      for (let i = 0; i < str.length; i++) {
        arr[i] = str.charCodeAt(i) & 0xff;
      }
      return arr;
    };

    const findBytes = textToBytes(findStr);
    if (!findBytes.length) {
      els.statusText.textContent = 'Find text is empty';
      return;
    }

    let replaceBytes = textToBytes(replaceStrRaw);
    if (!replaceBytes.length) {
      // If replace text is empty, fill with spaces so length stays the same
      replaceBytes = new Uint8Array(findBytes.length);
      replaceBytes.fill(0x20);
    }

    // Ensure replacement length matches find length
    if (replaceBytes.length !== findBytes.length) {
      const resized = new Uint8Array(findBytes.length);
      const len = Math.min(findBytes.length, replaceBytes.length);
      for (let i = 0; i < len; i++) resized[i] = replaceBytes[i];
      for (let i = len; i < resized.length; i++) resized[i] = 0x20;
      replaceBytes = resized;
    }

    try {
      const mem = await getMemorySnapshot();
      if (!mem || !mem.length) {
        els.statusText.textContent = 'Memory not available for text patch';
        return;
      }

      let count = 0;

      // Simple forward scan for all occurrences in current memory snapshot
      outer: for (let i = 0; i <= mem.length - findBytes.length; i++) {
        for (let j = 0; j < findBytes.length; j++) {
          if (mem[i + j] !== findBytes[j]) continue outer;
        }
        // Match found – apply replacement in local snapshot and live memory
        for (let j = 0; j < findBytes.length; j++) {
          const addr = i + j;
          const v = replaceBytes[j];
          mem[addr] = v;
          if (typeof setMemoryByte === 'function') {
            setMemoryByte(addr, v);
          }
        }
        count++;
        i += findBytes.length - 1;
      }

      if (count === 0) {
        els.statusText.textContent = `No occurrences of "${findStr}" found in memory`;
        return;
      }

      els.statusText.textContent = `Applied memory text patch: replaced ${count} occurrence${count === 1 ? '' : 's'} of "${findStr}" in RAM`;
    } catch (e) {
      console.error('RAM text patch failed:', e);
      els.statusText.textContent = 'RAM text patch failed';
    }

    return;
  }

  // Default: ROM text patch (existing behavior)
  const result = buildTextPatchedBytes();
  if (!result) return;
  const { bytes, count, findStr } = result;

  const nameWithExt = (() => {
    const n = originalROMName || 'rom.gb';
    const m = n.match(/^(.*?)(\.[A-Za-z0-9]+)$/);
    return m ? `${m[1]} (text patched)${m[2]}` : `${n} (text patched)`;
  })();

  loadBytes(bytes, nameWithExt);
  els.statusText.textContent = `Applied text patch: replaced ${count} occurrence${count === 1 ? '' : 's'} of "${findStr}" and reloaded ROM`;
}

function downloadTextPatchedROM() {
  const result = buildTextPatchedBytes();
  if (!result) return;
  const { bytes, count, findStr } = result;

  const baseName = (() => {
    const n = originalROMName || 'rom.gb';
    const m = n.match(/^(.*?)(\.[A-Za-z0-9]+)$/);
    return m ? { name: m[1], ext: m[2] } : { name: n, ext: '' };
  })();

  const downloadName = `${baseName.name} (text patched)${baseName.ext}`;
  try {
    const blob = new Blob([bytes], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = downloadName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    els.statusText.textContent = `Downloaded text patched ROM • replaced ${count} occurrence${count === 1 ? '' : 's'} of "${findStr}"`;
  } catch (e) {
    console.error('Failed to download text patched ROM:', e);
    els.statusText.textContent = 'Failed to download text patched ROM';
  }
}

export function setupUI() {
  els.romInput.addEventListener('change', (e) => loadROMFromFile(e.target.files?.[0]));
  els.openRomBtn?.addEventListener('click', () => els.romInput?.click());

  ['dragenter', 'dragover'].forEach(ev => els.wrap.addEventListener(ev, (e) => {
    e.preventDefault(); e.stopPropagation(); els.dropHint.style.color = '#bbb';
  }));
  ['dragleave', 'drop'].forEach(ev => els.wrap.addEventListener(ev, (e) => {
    e.preventDefault(); e.stopPropagation(); els.dropHint.style.color = '#ddd';
  }));
  els.wrap.addEventListener('drop', (e) => {
    const file = e.dataTransfer.files?.[0];
    if (file) loadROMFromFile(file);
  });

  els.pauseBtn.addEventListener('click', togglePause);
  els.resetBtn.addEventListener('click', () => emulator.reset());

  els.fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) els.wrap.requestFullscreen?.();
    else document.exitFullscreen?.();
  });

  els.muteBtn.addEventListener('click', () => {
    const next = !AudioEngine.muted;
    AudioEngine.setMuted(next);
    els.muteBtn.setAttribute('aria-pressed', String(next));
    els.muteBtn.textContent = next ? 'Unmute' : 'Mute';
  });

  els.volume.addEventListener('input', (e) => AudioEngine.setVolume(parseFloat(e.target.value)));

  document.getElementById('seedSubmitBtn').addEventListener('click', corruptAndReload);
  els.downloadCorruptBtn?.addEventListener('click', downloadCorruptedROM);

  // ROM text patch: apply in emulator vs. download patched ROM
  els.applyTextPatchBtn?.addEventListener('click', applyTextPatch);
  els.downloadTextPatchBtn?.addEventListener('click', downloadTextPatchedROM);

  ['keydown', 'keyup'].forEach(type => els.wrap.addEventListener(type, (e) => handleKey(e, type === 'keydown')));

  els.controlsBtn?.addEventListener('click', () => els.controlsDialog?.showModal());
  els.creditsBtn?.addEventListener('click', () => els.creditsDialog?.showModal());
  document.querySelectorAll('[data-close-dialog]').forEach(btn => btn.addEventListener('click', (e) => e.target.closest('dialog')?.close()));
  els.seedRandomBtn?.addEventListener('click', () => {
    const seed = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    if (els.seedInput) els.seedInput.value = seed;
    corruptAndReload();
  });

  // GB display mode selector
  const gbMode = localStorage.getItem('gbMode') || 'mono';
  if (els.gbPaletteSelect) {
    els.gbPaletteSelect.value = gbMode;
    els.gbPaletteSelect.addEventListener('change', () => {
      const mode = els.gbPaletteSelect.value;
      localStorage.setItem('gbMode', mode);
      emulator.setGBMode(mode);
    });
  }

  setupTouchControls();
  setupResponsiveControls();
  setupRecordingControls();
  setupDisplayModeControls();

  // Save/Load state controls (.pla files)
  if (els.saveStateBtn) {
    els.saveStateBtn.addEventListener('click', () => {
      handleSaveState();
    });
  }
  if (els.loadStateBtn && els.loadStateInput) {
    els.loadStateBtn.addEventListener('click', () => {
      els.loadStateInput.click();
    });
    els.loadStateInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) handleLoadStateFile(file);
    });
  }
}

function setupTouchControls() {
  const btnForData = {
    UP: 'ArrowUp', DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft', RIGHT: 'ArrowRight',
    A: 'KeyX', B: 'KeyZ',
    START: 'Enter', SELECT: 'ShiftRight'
  };

  const bindButton = (el) => {
    const code = btnForData[el.dataset.btn]; if (!code) return;
    const activePointers = new Set();
    const dispatchKey = (type) => els.wrap.dispatchEvent(new KeyboardEvent(type, { code, bubbles: true }));
    const down = (e) => {
      e.preventDefault(); els.wrap.focus();
      activePointers.add(e.pointerId ?? -1);
      if (typeof e.pointerId === 'number' && e.type.startsWith('pointer')) { try { el.setPointerCapture(e.pointerId); } catch {} }
      el.classList.add('active'); dispatchKey('keydown'); navigator.vibrate?.(10);
    };
    const up = (e) => { e.preventDefault(); if (!activePointers.has(e.pointerId ?? -1)) return; activePointers.delete(e.pointerId ?? -1); if (activePointers.size===0){ el.classList.remove('active'); dispatchKey('keyup'); } };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('pointerleave', up);
    el.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
  };

  els.touchControls?.querySelectorAll('[data-btn]')?.forEach(bindButton);

  // remember original location to restore after fullscreen
  const anchor = document.createComment('touch-controls-anchor');
  const parent = els.touchControls.parentElement;
  parent?.insertBefore(anchor, els.touchControls.nextSibling);

  document.addEventListener('fullscreenchange', () => {
    const fs = document.fullscreenElement === els.wrap;
    if (fs) {
      els.wrap.appendChild(els.touchControls);
      els.touchControls.classList.add('in-fullscreen');
    } else {
      anchor.parentNode?.insertBefore(els.touchControls, anchor);
      els.touchControls.classList.remove('in-fullscreen');
    }
  });

  const persisted = localStorage.getItem('touchControls');
  const initialVisible = persisted ? (persisted === '1') : ('ontouchstart' in window);
  const setVisible = (v) => {
    if (!els.touchControls || !els.toggleTouchBtn) return;
    els.touchControls.hidden = !v;
    els.toggleTouchBtn.setAttribute('aria-pressed', String(v));
    els.toggleTouchBtn.textContent = v ? 'Hide On-Screen Controls' : 'Show On-Screen Controls';
    localStorage.setItem('touchControls', v ? '1' : '0');
  };
  setVisible(initialVisible);

  els.toggleTouchBtn?.addEventListener('click', () => setVisible(els.touchControls.hidden));
  els.touchControls?.addEventListener('contextmenu', (e) => e.preventDefault());
}

function setupResponsiveControls() {
  const controls = els.controlsContainer; if (!controls) return;
  const anchor = document.createComment('controls-anchor');
  controls.parentElement.insertBefore(anchor, controls);
  const BREAKPOINT = 860; // px: use pop-out menu at/under this width
  const apply = () => {
    const useMenu = window.innerWidth <= BREAKPOINT;
    if (useMenu) {
      if (controls.parentElement !== els.menuControlsSlot) els.menuControlsSlot.appendChild(controls);
      controls.classList.add('stacked'); els.menuBtn.hidden = false;
    } else {
      if (controls.parentNode !== anchor.parentNode) anchor.parentNode.insertBefore(controls, anchor.nextSibling);
      controls.classList.remove('stacked'); els.menuBtn.hidden = true; if (els.menuDialog.open) els.menuDialog.close();
    }
  };
  apply();
  let rt; const schedule = () => { clearTimeout(rt); rt = setTimeout(apply, 150); };
  addEventListener('resize', schedule); addEventListener('orientationchange', schedule);
  els.menuBtn.addEventListener('click', () => els.menuDialog.showModal());
  els.menuDialog?.addEventListener('close', () => { /* no-op */ });
}

async function handleSaveState() {
  if (getSystem() !== 'nes') {
    els.statusText.textContent = 'Save states are currently supported for NES games only';
    return;
  }
  try {
    const state = await saveState();
    if (!state) {
      els.statusText.textContent = 'Failed to capture save state';
      return;
    }
    const romName = originalROMName || getCurrentROMName() || 'unknown';
    const payload = {
      version: 1,
      system: 'nes',
      romName,
      timestamp: Date.now(),
      state,
    };
    const json = JSON.stringify(payload);
    const blob = new Blob([json], { type: 'application/json' });

    const baseNameMatch = romName.match(/^(.*?)(\.[A-Za-z0-9]+)?$/);
    const baseName = baseNameMatch ? baseNameMatch[1] || 'state' : 'state';

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${baseName}.pla`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);

    els.statusText.textContent = `Save state downloaded as ${baseName}.pla`;
  } catch (e) {
    console.error('Save state failed:', e);
    els.statusText.textContent = 'Save state failed';
  }
}

async function handleLoadStateFile(file) {
  if (!file) return;
  if (getSystem() !== 'nes') {
    els.statusText.textContent = 'Load a NES ROM first before loading a .pla save state';
    return;
  }
  try {
    const text = await file.text();
    const payload = JSON.parse(text);
    if (!payload || payload.system !== 'nes' || !payload.state) {
      els.statusText.textContent = 'Invalid or unsupported .pla save state';
      return;
    }
    await loadState(payload.state);
    els.statusText.textContent = 'Save state loaded';
  } catch (e) {
    console.error('Load state failed:', e);
    els.statusText.textContent = 'Failed to load save state';
  } finally {
    if (els.loadStateInput) {
      els.loadStateInput.value = '';
    }
  }
}

function setupRecordingControls() {
  if (!els.startClipBtn || !els.saveClipBtn || !els.uploadClipBtn) return;

  let mediaRecorder = null;
  let recordedChunks = [];
  let lastBlob = null;

  const resetState = () => {
    mediaRecorder = null;
    recordedChunks = [];
    els.startClipBtn.textContent = 'Start Clip';
    els.startClipBtn.disabled = false;
  };

  const updateButtons = () => {
    const hasClip = !!lastBlob;
    els.saveClipBtn.disabled = !hasClip;
    els.uploadClipBtn.disabled = !hasClip;
  };

  const startClip = () => {
    if (!els.canvas.captureStream) {
      els.statusText.textContent = 'Recording not supported in this browser';
      return;
    }
    try {
      const canvasStream = els.canvas.captureStream(60);
      const audioStream = AudioEngine.getMediaStream?.();
      if (!audioStream) {
        els.statusText.textContent = 'Audio stream not available for recording';
        return;
      }

      const combined = new MediaStream([
        ...canvasStream.getVideoTracks(),
        ...audioStream.getAudioTracks(),
      ]);

      const options = { mimeType: 'video/webm;codecs=vp9,opus' };
      let mr;
      try {
        mr = new MediaRecorder(combined, options);
      } catch {
        mr = new MediaRecorder(combined);
      }
      mediaRecorder = mr;
      recordedChunks = [];
      lastBlob = null;
      updateButtons();

      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) recordedChunks.push(e.data);
      };
      mr.onstop = () => {
        if (recordedChunks.length) lastBlob = new Blob(recordedChunks, { type: recordedChunks[0].type });
        updateButtons();
        els.statusText.textContent = 'Clip recorded';
      };
      mr.start();
      els.startClipBtn.textContent = 'Stop Clip';
      els.statusText.textContent = 'Recording clip…';
    } catch (e) {
      console.error(e);
      els.statusText.textContent = 'Failed to start recording';
      resetState();
    }
  };

  const stopClip = () => {
    if (!mediaRecorder) return;
    try {
      if (mediaRecorder.state !== 'inactive') mediaRecorder.stop();
    } catch (e) {
      console.error(e);
    } finally {
      resetState();
    }
  };

  els.startClipBtn.addEventListener('click', () => {
    if (!mediaRecorder || mediaRecorder.state === 'inactive') {
      startClip();
    } else {
      stopClip();
    }
  });

  els.saveClipBtn.addEventListener('click', () => {
    if (!lastBlob) {
      els.statusText.textContent = 'No recorded clip to save';
      return;
    }
    const url = URL.createObjectURL(lastBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nes-gb-corruption-clip.webm';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    els.statusText.textContent = 'Clip saved to your device';
  });

  els.uploadClipBtn.addEventListener('click', async () => {
    if (!lastBlob) {
      els.statusText.textContent = 'No recorded clip to upload';
      return;
    }
    if (!window.websim || typeof window.websim.upload !== 'function') {
      els.statusText.textContent = 'Upload not available in this environment';
      return;
    }
    try {
      els.uploadClipBtn.disabled = true;
      els.statusText.textContent = 'Uploading clip…';
      const file = new File([lastBlob], 'nes-gb-corruption-clip.webm', { type: lastBlob.type || 'video/webm' });
      const url = await window.websim.upload(file);
      els.statusText.textContent = `Clip uploaded: ${url}`;
    } catch (e) {
      console.error(e);
      els.statusText.textContent = 'Failed to upload clip';
    } finally {
      updateButtons();
    }
  });

  updateButtons();
}

function setupDisplayModeControls() {
  if (!els.displayModeBtn || !els.memoryView || !els.canvas) return;

  const memCanvas = els.memoryView;
  const ctx = memCanvas.getContext('2d', { alpha: false });

  let mode = 'screen'; // 'screen' | 'memory'
  let style = 'color'; // 'color' | 'text'
  let timer = null;
  let memBytesRam = null;   // live RAM snapshot
  let memBytesRom = null;   // original ROM bytes (if available)
  let COLS = 256; // columns per pane in current layout
  let CELL_SIZE = 1; // logical pixel size per cell
  // Once the user manually edits / drags tiles, we treat the local buffer as
  // authoritative and stop pulling fresh snapshots from the emulator.
  let memoryDirty = false;

  const applyStyleLayout = () => {
    if (style === 'color') {
      COLS = 128; // per pane for color (two panes side-by-side)
      CELL_SIZE = 1;
    } else {
      COLS = 16; // smaller columns per pane for text so hex fits
      CELL_SIZE = 12;
    }
  };

  const updateStyleButton = () => {
    if (!els.memoryStyleBtn) return;
    els.memoryStyleBtn.textContent = style === 'color' ? 'Memory: Color' : 'Memory: Text';
  };

  // Configure canvas logical size for memory grid (two panes: RAM | ROM)
  const configureCanvas = (byteCountPerPane) => {
    const maxBytes = Math.min(byteCountPerPane || 0x10000, 0x10000);
    const rows = Math.ceil(maxBytes / COLS) || 1;
    // total width holds two panes side-by-side
    memCanvas.width = COLS * CELL_SIZE * 2;
    memCanvas.height = rows * CELL_SIZE;
  };

  const drawCell = (baseX, baseY, value) => {
    if (style === 'color') {
      // Simple color mapping: hue based on high bits, brightness on value
      const hue = (value & 0xE0) * (360 / 0xE0);
      const light = 30 + (value / 255) * 40;
      const sat = 80;
      const c = (1 - Math.abs(2 * (light / 100) - 1)) * (sat / 100);
      const hp = hue / 60;
      const x = c * (1 - Math.abs((hp % 2) - 1));
      let r1 = 0, g1 = 0, b1 = 0;
      if (hp >= 0 && hp < 1) { r1 = c; g1 = x; b1 = 0; }
      else if (hp < 2) { r1 = x; g1 = c; b1 = 0; }
      else if (hp < 3) { r1 = 0; g1 = c; b1 = x; }
      else if (hp < 4) { r1 = 0; g1 = x; b1 = c; }
      else if (hp < 5) { r1 = x; g1 = 0; b1 = c; }
      else { r1 = c; g1 = 0; b1 = x; }
      const m = (light / 100) - c / 2;
      const R = Math.round((r1 + m) * 255);
      const G = Math.round((g1 + m) * 255);
      const B = Math.round((b1 + m) * 255);

      for (let py = 0; py < CELL_SIZE; py++) {
        for (let px = 0; px < CELL_SIZE; px++) {
          const xPos = baseX + px;
          const yPos = baseY + py;
          const idx = (yPos * memCanvas.width + xPos) * 4;
          ctxImageData.data[idx] = R;
          ctxImageData.data[idx + 1] = G;
          ctxImageData.data[idx + 2] = B;
          ctxImageData.data[idx + 3] = 255;
        }
      }
    } else {
      // text handled outside
    }
  };

  // We'll use a shared ImageData buffer when in color mode to paint both panes efficiently.
  let ctxImageData = null;

  const drawMemoryGrid = () => {
    // Determine max bytes per pane (cap 0x10000)
    const maxRam = memBytesRam ? Math.min(memBytesRam.length, 0x10000) : 0;
    const maxRom = memBytesRom ? Math.min(memBytesRom.length, 0x10000) : 0;
    const maxBytesPerPane = Math.max(maxRam, maxRom, 1);

    applyStyleLayout();
    configureCanvas(maxBytesPerPane);

    if (style === 'color') {
      ctxImageData = ctx.createImageData(memCanvas.width, memCanvas.height);
      ctxImageData.data.fill(0);
      // Draw RAM in left pane and ROM in right pane
      for (let addr = 0; addr < maxBytesPerPane; addr++) {
        const col = addr % COLS;
        const row = (addr / COLS) | 0;
        const baseY = row * CELL_SIZE;
        // RAM left pane
        const valRam = memBytesRam && addr < memBytesRam.length ? (memBytesRam[addr] || 0) : 0;
        const baseXram = col * CELL_SIZE;
        // ROM right pane
        const valRom = memBytesRom && addr < memBytesRom.length ? (memBytesRom[addr] || 0) : 0;
        const baseXrom = (COLS * CELL_SIZE) + (col * CELL_SIZE);

        // draw RAM cell
        (function drawVal(v, bx) {
          const hue = (v & 0xE0) * (360 / 0xE0);
          const light = 30 + (v / 255) * 40;
          const sat = 80;
          const c = (1 - Math.abs(2 * (light / 100) - 1)) * (sat / 100);
          const hp = hue / 60;
          const x = c * (1 - Math.abs((hp % 2) - 1));
          let r1 = 0, g1 = 0, b1 = 0;
          if (hp >= 0 && hp < 1) { r1 = c; g1 = x; b1 = 0; }
          else if (hp < 2) { r1 = x; g1 = c; b1 = 0; }
          else if (hp < 3) { r1 = 0; g1 = c; b1 = x; }
          else if (hp < 4) { r1 = 0; g1 = x; b1 = c; }
          else if (hp < 5) { r1 = x; g1 = 0; b1 = c; }
          else { r1 = c; g1 = 0; b1 = x; }
          const m = (light / 100) - c / 2;
          const R = Math.round((r1 + m) * 255);
          const G = Math.round((g1 + m) * 255);
          const B = Math.round((b1 + m) * 255);
          for (let py = 0; py < CELL_SIZE; py++) {
            for (let px = 0; px < CELL_SIZE; px++) {
              const xPos = bx + px;
              const yPos = baseY + py;
              const idx = (yPos * memCanvas.width + xPos) * 4;
              ctxImageData.data[idx] = R;
              ctxImageData.data[idx + 1] = G;
              ctxImageData.data[idx + 2] = B;
              ctxImageData.data[idx + 3] = 255;
            }
          }
        })(valRam, baseXram);

        // draw ROM cell
        (function drawVal(v, bx) {
          const hue = (v & 0xE0) * (360 / 0xE0);
          const light = 30 + (v / 255) * 40;
          const sat = 80;
          const c = (1 - Math.abs(2 * (light / 100) - 1)) * (sat / 100);
          const hp = hue / 60;
          const x = c * (1 - Math.abs((hp % 2) - 1));
          let r1 = 0, g1 = 0, b1 = 0;
          if (hp >= 0 && hp < 1) { r1 = c; g1 = x; b1 = 0; }
          else if (hp < 2) { r1 = x; g1 = c; b1 = 0; }
          else if (hp < 3) { r1 = 0; g1 = c; b1 = x; }
          else if (hp < 4) { r1 = 0; g1 = x; b1 = c; }
          else if (hp < 5) { r1 = x; g1 = 0; b1 = c; }
          else { r1 = c; g1 = 0; b1 = x; }
          const m = (light / 100) - c / 2;
          const R = Math.round((r1 + m) * 255);
          const G = Math.round((g1 + m) * 255);
          const B = Math.round((b1 + m) * 255);
          for (let py = 0; py < CELL_SIZE; py++) {
            for (let px = 0; px < CELL_SIZE; px++) {
              const xPos = bx + px;
              const yPos = baseY + py;
              const idx = (yPos * memCanvas.width + xPos) * 4;
              ctxImageData.data[idx] = R;
              ctxImageData.data[idx + 1] = G;
              ctxImageData.data[idx + 2] = B;
              ctxImageData.data[idx + 3] = 255;
            }
          }
        })(valRom, baseXrom);
      }
      ctx.putImageData(ctxImageData, 0, 0);
    } else {
      // Text mode: render hex bytes on two panes
      ctx.clearRect(0, 0, memCanvas.width, memCanvas.height);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, memCanvas.width, memCanvas.height);
      ctx.fillStyle = '#0f0';
      ctx.font = `${CELL_SIZE - 2}px monospace`;
      ctx.textBaseline = 'top';

      const maxBytes = Math.max(memBytesRam ? memBytesRam.length : 0, memBytesRom ? memBytesRom.length : 0);

      for (let addr = 0; addr < maxBytes; addr++) {
        const col = addr % COLS;
        const row = (addr / COLS) | 0;
        const xLeft = col * CELL_SIZE + 1;
        const y = row * CELL_SIZE + 1;
        // RAM left
        const vRam = memBytesRam && addr < memBytesRam.length ? memBytesRam[addr] : 0;
        const textRam = vRam.toString(16).padStart(2, '0').toUpperCase();
        ctx.fillText(textRam, xLeft, y);
        // ROM right (offset by COLS*CELL_SIZE)
        const xRight = (COLS * CELL_SIZE) + (col * CELL_SIZE) + 1;
        const vRom = memBytesRom && addr < memBytesRom.length ? memBytesRom[addr] : 0;
        const textRom = vRom.toString(16).padStart(2, '0').toUpperCase();
        ctx.fillText(textRom, xRight, y);
      }
    }
  };

  const refreshMemoryView = async () => {
    // While in visual-only move mode, keep the current local layout and
    // don't overwrite it with a fresh snapshot from emulator memory.
    if (isMoveMode) {
      return;
    }

    // If the user has edited memory (paint / drag), keep the local memBytes
    // and do not overwrite with new snapshots until they leave memory view.
    if (memoryDirty) {
      return;
    }

    if (getSystem() !== 'nes') {
      if (ctx) {
        ctx.clearRect(0, 0, memCanvas.width, memCanvas.height);
      }
      return;
    }
    try {
      // get RAM snapshot
      const mem = await getMemorySnapshot();
      memBytesRam = mem || new Uint8Array(0);
      // get ROM bytes from originalROMBytes if available
      memBytesRom = (typeof originalROMBytes !== 'undefined' && originalROMBytes) ? originalROMBytes.slice() : new Uint8Array(0);
      drawMemoryGrid();
    } catch (e) {
      console.error('Memory snapshot failed:', e);
    }
  };

  const setMode = (next) => {
    mode = next; // 'screen' | 'memory'

    // clear any periodic snapshot timer
    if (timer) {
      clearInterval(timer);
      timer = null;
    }

    // reset inline styles
    memCanvas.style.position = '';
    memCanvas.style.top = '';
    memCanvas.style.left = '';
    memCanvas.style.right = '';
    memCanvas.style.width = '';
    memCanvas.style.height = '';
    memCanvas.style.zIndex = '';
    memCanvas.style.borderLeft = '';
    els.canvas.style.width = '';
    els.canvas.style.height = '';

    if (mode === 'screen') {
      // show only game screen
      els.canvas.hidden = false;
      memCanvas.hidden = true;
      els.displayModeBtn.textContent = 'Memory View';
    } else {
      // memory-only view
      els.canvas.hidden = true;
      memCanvas.hidden = false;
      els.displayModeBtn.textContent = 'Screen View';

      // Fresh entry into memory view: allow snapshots again until the user edits the local buffer.
      memoryDirty = false;
      refreshMemoryView();
      timer = setInterval(refreshMemoryView, 500);
    }
  };

  const setStyle = (next) => {
    style = next;
    updateStyleButton();
    if (mode === 'memory' && (memBytesRam || memBytesRom)) {
      drawMemoryGrid();
    }
  };

  // Allow clicking / dragging on memory view to edit bytes
  let isPainting = false;
  let paintValue = null;
  let lastPaintAddr = -1;

  // Drag move mode (visual only, does NOT touch emulator memory)
  // Dragging = left mouse button down and moving the mouse.
  let isMoveMode = false;
  let moveAddr = -1;

  const coordToAddr = (evt) => {
    const rect = memCanvas.getBoundingClientRect();
    const scaleX = memCanvas.width / rect.width;
    const scaleY = memCanvas.height / rect.height;
    const x = Math.floor((evt.clientX - rect.left) * scaleX);
    const y = Math.floor((evt.clientY - rect.top) * scaleY);

    const col = Math.floor(x / CELL_SIZE);
    const row = Math.floor(y / CELL_SIZE);
    // determine which pane user clicked: left=RAM, right=ROM (we only allow editing RAM)
    const panesTotalCols = COLS * 2;
    if (col < 0 || col >= panesTotalCols) return -1;
    const paneIndex = (col >= COLS) ? 1 : 0; // 0=RAM,1=ROM
    const colInPane = (paneIndex === 0) ? col : (col - COLS);
    const addr = row * COLS + colInPane;
    // Only allow addresses within RAM length for editing interactions
    if (paneIndex === 1) return -1;
    if (addr < 0 || !memBytesRam || addr >= memBytesRam.length) return -1;
    return addr;
  };

  const applyPaintAtEvent = (evt, fromDrag = false) => {
    // Allow editing when in 'memory' or 'both' views (and only for NES)
    if ((mode !== 'memory' && mode !== 'both') || !memBytesRam || getSystem() !== 'nes') return;
    const addr = coordToAddr(evt);
    if (addr < 0) return;

    // Visual-only move mode when holding Ctrl while dragging
    if (isMoveMode) {
      if (!fromDrag) return;
      if (addr === moveAddr) return;
      const value = paintValue ?? 0;

      // Clear previous tile in both local snapshot and live emulator memory
      if (moveAddr >= 0 && moveAddr < memBytesRam.length) {
        memBytesRam[moveAddr] = 0;
        if (typeof setMemoryByte === 'function') {
          setMemoryByte(moveAddr, 0);
        }
      }

      // Move the value to the new address in both local snapshot and live emulator memory
      if (addr >= 0 && addr < memBytesRam.length) {
        const v = value & 0xff;
        memBytesRam[addr] = v;
        if (typeof setMemoryByte === 'function') {
          setMemoryByte(addr, v);
        }
      }

      moveAddr = addr;
      lastPaintAddr = addr;
      // User has edited the local buffer; keep it authoritative.
      memoryDirty = true;
      drawMemoryGrid();
      return;
    }

    if (fromDrag && paintValue === null) return;
    if (fromDrag && addr === lastPaintAddr) return;

    let value = paintValue;
    if (!fromDrag || paintValue === null) {
      const currentVal = memBytesRam[addr] || 0;
      const input = prompt(
        `Edit memory at $${addr.toString(16).padStart(4, '0')} (current: $${currentVal
          .toString(16)
          .padStart(2, '0')}).\nEnter new value in hex (00-FF):`,
        currentVal.toString(16).padStart(2, '0'),
      );
      if (!input) return;
      const cleaned = input.trim().replace(/^0x/i, '');
      const parsed = parseInt(cleaned, 16);
      if (Number.isNaN(parsed) || parsed < 0 || parsed > 0xff) {
        return;
      }
      value = parsed & 0xff;
      paintValue = value;
    }

    // Update local buffer and send to emulator
    memBytesRam[addr] = value & 0xff;
    if (typeof setMemoryByte === 'function') {
      setMemoryByte(addr, value);
    }
    lastPaintAddr = addr;
    // User has edited the local buffer; keep it authoritative.
    memoryDirty = true;
    drawMemoryGrid();
  };

  memCanvas.addEventListener('mousedown', (evt) => {
    if (evt.button !== 0) return;
    evt.preventDefault();

    const addr = coordToAddr(evt);
    // Allow interaction in both memory-only and screen+memory modes
    if (addr < 0 || !memBytesRam || (mode !== 'memory' && mode !== 'both')) return;

    isPainting = true;
    paintValue = null;
    lastPaintAddr = -1;

    // Ctrl + drag = visual-only move mode (does NOT touch emulator memory)
    // Plain drag = paint mode (does update emulator memory)
    isMoveMode = !!evt.ctrlKey;

    if (isMoveMode) {
      // Start a visual-only move of this tile
      moveAddr = addr;
      paintValue = memBytesRam[addr] || 0;
      lastPaintAddr = addr;
      drawMemoryGrid();
    } else {
      // Start painting immediately on mousedown
      applyPaintAtEvent(evt, false);
    }
  });

  memCanvas.addEventListener('mousemove', (evt) => {
    if (!isPainting) return;
    evt.preventDefault();
    applyPaintAtEvent(evt, true);
  });

  const stopPainting = () => {
    isPainting = false;
    lastPaintAddr = -1;
    isMoveMode = false;
    moveAddr = -1;
    paintValue = null;
  };

  window.addEventListener('mouseup', stopPainting);
  memCanvas.addEventListener('mouseleave', stopPainting);

  els.displayModeBtn.addEventListener('click', () => {
    // Toggle between screen and memory views
    const next = (mode === 'screen') ? 'memory' : 'screen';
    setMode(next);
  });

  if (els.memoryStyleBtn) {
    els.memoryStyleBtn.addEventListener('click', () => {
      setStyle(style === 'color' ? 'text' : 'color');
    });
    updateStyleButton();
  }

  // Save / Load memory as PNG (grayscale, 1 byte per pixel layout: COLS x rows)
  if (els.saveMemoryBtn) {
    els.saveMemoryBtn.addEventListener('click', async () => {
      try {
        // If we don't have a local snapshot, try to fetch one from the worker
        if (!memBytesRam) {
          if (getSystem() !== 'nes') {
            els.statusText.textContent = 'No memory snapshot to save';
            return;
          }
          els.statusText.textContent = 'Taking memory snapshot…';
          const snap = await getMemorySnapshot();
          if (!snap || !snap.length) {
            els.statusText.textContent = 'Failed to capture memory snapshot';
            return;
          }
          memBytesRam = snap;
        }

        const maxBytes = Math.min(memBytesRam.length, 0x10000);
        applyStyleLayout(); // ensure COLS is current
        const rows = Math.ceil(maxBytes / COLS);
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = COLS;
        exportCanvas.height = rows;
        const exportCtx = exportCanvas.getContext('2d', { alpha: false });
        const img = exportCtx.createImageData(exportCanvas.width, exportCanvas.height);
        const d = img.data;
        for (let addr = 0; addr < exportCanvas.width * exportCanvas.height; addr++) {
          const v = addr < maxBytes ? (memBytesRam[addr] || 0) : 0;
          const idx = addr * 4;
          d[idx] = v; d[idx + 1] = v; d[idx + 2] = v; d[idx + 3] = 255;
        }
        exportCtx.putImageData(img, 0, 0);
        exportCanvas.toBlob((blob) => {
          if (!blob) {
            els.statusText.textContent = 'Failed to create PNG';
            return;
          }
          const name = (originalROMName || getCurrentROMName() || 'memory').replace(/\.[^.]*$/, '');
          const a = document.createElement('a');
          const url = URL.createObjectURL(blob);
          a.href = url;
          a.download = `${name} (memory-${Date.now()}).png`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
          els.statusText.textContent = `Memory exported as PNG (${COLS}×${rows})`;
        }, 'image/png');
      } catch (err) {
        console.error('Save memory failed:', err);
        els.statusText.textContent = 'Failed to save memory PNG';
      }
    });
  }

  if (els.loadMemoryBtn && els.loadMemoryInput) {
    els.loadMemoryBtn.addEventListener('click', () => els.loadMemoryInput.click());
    els.loadMemoryInput.addEventListener('change', (e) => {
      const f = e.target.files?.[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const img = new Image();
          img.onload = async () => {
            // Draw to temp canvas and read pixels
            const tmp = document.createElement('canvas');
            tmp.width = img.width;
            tmp.height = img.height;
            const tctx = tmp.getContext('2d', { alpha: false });
            tctx.drawImage(img, 0, 0);
            const imageData = tctx.getImageData(0, 0, tmp.width, tmp.height);
            const pixels = imageData.data;
            const total = tmp.width * tmp.height;
            const newMem = new Uint8Array(Math.min(0x10000, total));
            for (let i = 0; i < newMem.length; i++) {
              const idx = i * 4;
              // grayscale -> take red channel as byte
              newMem[i] = pixels[idx];
            }
            // write bytes into emulator memory and local snapshot
            const writeCount = newMem.length;
            for (let addr = 0; addr < writeCount; addr++) {
              const v = newMem[addr] & 0xff;
              if (typeof setMemoryByte === 'function') setMemoryByte(addr, v);
            }
            // Update local memBytesRam and redraw grid
            memBytesRam = memBytesRam || new Uint8Array(0x10000);
            const copyLen = Math.min(memBytesRam.length, newMem.length);
            for (let i = 0; i < copyLen; i++) memBytesRam[i] = newMem[i];
            memoryDirty = true;
            drawMemoryGrid();
            els.statusText.textContent = `Loaded memory PNG (${tmp.width}×${tmp.height}), wrote ${writeCount} bytes`;
            // clear file input so same file can be selected again
            els.loadMemoryInput.value = '';
          };
          img.onerror = (err) => {
            els.statusText.textContent = 'Failed to load image';
            console.error('Image load error', err);
          };
          img.src = reader.result;
        } catch (err) {
          console.error('Load memory failed', err);
          els.statusText.textContent = 'Failed to load memory PNG';
        }
      };
      reader.readAsDataURL(f);
    });
  }

  // View Byte helper: supports single address or pipe-separated addresses (hex like 0x075A or decimal).
  // Prefix with "rom:" or "r:" to force reading from ROM instead of RAM.
  if (els.viewByteBtn && els.viewByteInput) {
    els.viewByteBtn.addEventListener('click', async () => {
      const rawIn = (els.viewByteInput.value || '').trim();
      if (!rawIn) {
        els.statusText.textContent = 'Enter an address (e.g. 0x075A) or prefix with "rom:0x075A" to read ROM';
        return;
      }

      // detect rom prefix explicitly (rom: or r:)
      let explicitSource = null;
      let raw = rawIn;
      const romPrefix = rawIn.match(/^\s*(?:rom:|r:)(.+)$/i);
      if (romPrefix) {
        explicitSource = 'rom';
        raw = romPrefix[1].trim();
      }

      // support multiple addresses separated by | (e.g. 0x09FB7|0x09FB8|1234)
      const parts = raw.split(/\|/).map(p => p.trim()).filter(Boolean);
      if (!parts.length) {
        els.statusText.textContent = 'Invalid address';
        return;
      }

      const parseAddr = (s) => {
        const m = s.match(/^0x([0-9a-fA-F]+)$/);
        if (m) return parseInt(m[1], 16);
        const n = parseInt(s, 10);
        return Number.isNaN(n) ? null : n;
      };

      const addrs = parts.map(parseAddr);
      if (addrs.some(a => a === null || Number.isNaN(a) || a < 0)) {
        els.statusText.textContent = 'One or more addresses are invalid';
        return;
      }

      try {
        const results = [];
        // attempt to read a RAM snapshot once (if not forcing ROM)
        let memSnapshot = null;
        if (explicitSource !== 'rom') {
          try { memSnapshot = await getMemorySnapshot(); } catch (e) { memSnapshot = null; }
        }
        const romBytes = (typeof originalROMBytes !== 'undefined' && originalROMBytes) ? originalROMBytes : null;

        for (const addr of addrs) {
          let source = 'RAM';
          let value = null;

          if (explicitSource === 'rom') {
            source = 'ROM';
          } else if (memSnapshot && addr < memSnapshot.length) {
            source = 'RAM';
          } else {
            source = 'ROM';
          }

          if (source === 'RAM') {
            value = (memSnapshot && addr < memSnapshot.length) ? (memSnapshot[addr] & 0xff) : null;
          } else {
            if (!romBytes) {
              results.push({ addr, source: 'NONE', value: null });
              continue;
            }
            if (addr >= romBytes.length) {
              results.push({ addr, source: 'ROM_OOB', value: null });
              continue;
            }
            value = romBytes[addr] & 0xff;
          }
          results.push({ addr, source, value });
        }

        // Format message
        const partsOut = results.map(r => {
          if (r.source === 'NONE') return `[${r.addr}] = (no data)`;
          if (r.source === 'ROM_OOB') return `[ROM $${r.addr.toString(16).toUpperCase()}] = (out of ROM range)`;
          const addrHex = `$${r.addr.toString(16).toUpperCase().padStart(4,'0')}`;
          const valHex = r.value !== null ? r.value.toString(16).padStart(2,'0').toUpperCase() : '??';
          return `${r.source} ${addrHex} = ${valHex}`;
        });

        els.statusText.textContent = partsOut.join(' • ');
      } catch (e) {
        console.error('View byte failed', e);
        els.statusText.textContent = 'Failed to read byte(s)';
      }
    });
  }

  // Start in screen mode with default color style
  applyStyleLayout();
  setMode('screen');
}