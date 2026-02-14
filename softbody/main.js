import { SoftBody, Particle, Spring } from "./physics.js";
import { imageToSoftBody } from "./imageSoftbody.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const stepInput = document.getElementById("step");
const stepNumber = document.getElementById("stepNumber");
const imageInput = document.getElementById("imageInput");
const resetBtn = document.getElementById("resetBtn");
const stepFrameBtn = document.getElementById("stepFrameBtn");
const pressBtn = document.getElementById("pressBtn");
const modeBtn = document.getElementById("modeBtn");
const pauseBtn = document.getElementById("pauseBtn");
const takeApartBtn = document.getElementById("takeApartBtn");
const mergeBtn = document.getElementById("mergeBtn");
const gravityInput = document.getElementById("gravity");
const gravityNumber = document.getElementById("gravityNumber");

const exportBtn = document.getElementById("exportBtn");
const importBtn = document.getElementById("importBtn");
const importJsonInput = document.getElementById("importJsonInput");
const stickyBtn = document.getElementById("stickyBtn");
const separateXBtn = document.getElementById("separateXBtn");
const separateYBtn = document.getElementById("separateYBtn");

 // Brush controls (now a mode: 'brush')
 const brushBtn = document.getElementById("brushBtn");
 const brushColorInput = document.getElementById("brushColor");

 // Cache the brush color as an rgba string and keep it in sync with the color input.
 // Using a cached value makes it clear that brush stamping uses the current selected color.
 let brushColorRGBA = getRGBAFromHex(brushColorInput && brushColorInput.value ? brushColorInput.value : "#ffffff");
 if (brushColorInput) {
   brushColorInput.addEventListener("input", (ev) => {
     brushColorRGBA = getRGBAFromHex(ev.target.value);
   });
 }

 // Helper: convert a hex color (#RRGGBB or #RRGGBBAA) to an rgba(...) string, robust to different inputs.
 function getRGBAFromHex(hexIn) {
   let hex = (typeof hexIn === "string" ? hexIn.trim() : "") || "#ffffff";
   if (hex[0] === "#") hex = hex.slice(1);
   // If shorthand like 'fff' expand it
   if (hex.length === 3) {
     hex = hex.split("").map(c => c + c).join("");
   }
   // If rgb provided already, return as-is
   if (/^rgba?\(/i.test(hexIn)) return hexIn;
   // Support 6 or 8 hex digits
   if (hex.length !== 6 && hex.length !== 8) {
     // fallback white
     return "rgba(255,255,255,1)";
   }
   const r = parseInt(hex.slice(0, 2), 16) || 255;
   const g = parseInt(hex.slice(2, 4), 16) || 255;
   const b = parseInt(hex.slice(4, 6), 16) || 255;
   const a = hex.length === 8 ? (parseInt(hex.slice(6, 8), 16) / 255) : 1;
   return `rgba(${r},${g},${b},${a})`;
 }

 // color controls
 const bgColorInput = document.getElementById("bgColor");
 const floorColorInput = document.getElementById("floorColor");
 const resetColorsBtn = document.getElementById("resetColorsBtn");

 // Default color values (keep in sync with index.html input defaults)
 const DEFAULT_BG = "#111111";
 const DEFAULT_FLOOR = "#202020";

 // Apply current input values to the active softBody and request a redraw
 function updateSoftBodyColors() {
   if (!softBody) return;
   softBody.backgroundColor = bgColorInput ? bgColorInput.value : DEFAULT_BG;
   softBody.floorColor = floorColorInput ? floorColorInput.value : DEFAULT_FLOOR;
   // ensure canvas is redrawn with new colors immediately
   softBody.draw(ctx);
 }

 // Listen for changes from the color pickers
 if (bgColorInput) {
   bgColorInput.addEventListener("input", () => {
     updateSoftBodyColors();
   });
 }
 if (floorColorInput) {
   floorColorInput.addEventListener("input", () => {
     updateSoftBodyColors();
   });
 }

 // Reset colors button restores defaults and updates softBody
 if (resetColorsBtn) {
   resetColorsBtn.addEventListener("click", () => {
     if (bgColorInput) bgColorInput.value = DEFAULT_BG;
     if (floorColorInput) floorColorInput.value = DEFAULT_FLOOR;
     updateSoftBodyColors();
   });
 }




let width = 0;
let height = 0;

let softBody = new SoftBody();

 // initialize softBody colors from inputs (or defaults)
 updateSoftBodyColors();

 // Collection of soft bodies drawn/updated by the main loop.
 // Initialize with the single softBody so existing code that iterates
 // over softBodies works without changing other logic.
 let softBodies = [softBody];

// Utility to keep the sticky floor button UI in sync with the active softbody
function updateStickyLabel() {
  if (!stickyBtn) return;
  const isOn = !!softBody.stickyFloor;
  stickyBtn.setAttribute("aria-pressed", isOn ? "true" : "false");
  stickyBtn.textContent = `Sticky Floor: ${isOn ? "On" : "Off"}`;
}

let currentImage = null;
let isPaused = false;
let explodeMode = false;

function updatePauseLabel() {
  if (!pauseBtn) return;
  pauseBtn.textContent = isPaused ? "Resume" : "Pause";
}
let pixelStep = parseFloat(stepInput.value);
stepNumber.value = pixelStep;

 // Interaction mode state (single mode: 'drag' | 'slice' | 'explode')
let mode = "drag";
let sliceStart = null;

 // Slice/draw helpers: show preview line while dragging slice; if user holds Shift during the drag
 // the segment becomes a persistent solid "drawn" line instead of cutting springs.
 let slicePreview = null; // { x1,y1,x2,y2, isDraw }
 const drawnLines = []; // persistent solid lines drawn by holding Shift while slicing

 // Create a collidable rigid line by sampling points along the segment and adding pinned
 // (mass=0) particles connected by stiff springs into the main softBody so other pixels
 // will collide with and be constrained by the drawn line.
 function createRigidLine({ x1, y1, x2, y2 }, sampleSpacing = 6) {
  // compute length and number of samples (include both endpoints)
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const count = Math.max(2, Math.ceil(len / sampleSpacing) + 1);
  const stepX = dx / (count - 1);
  const stepY = dy / (count - 1);

  // Use normal, movable particles and regular springs so the line behaves as a soft body
  const particleMass = 0.5;      // non-zero mass so particles are movable/collidable
  const particleColor = "rgba(255,255,255,1)";
  const stiffness = 0.65;        // regular spring stiffness (similar to image springs)

  const pts = [];
  for (let i = 0; i < count; i++) {
    const px = x1 + stepX * i;
    const py = y1 + stepY * i;
    // create a normal (movable) particle
    const p = new Particle(px, py, particleMass, particleColor);
    // mark as a drawn-collider so we can identify them later if needed
    p._drawnCollider = true;
    softBody.addParticle(p);
    pts.push(p);
  }

  // connect adjacent samples with springs typical of the softbody so the line can flex
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const rest = Math.hypot(a.x - b.x, a.y - b.y) || 1;
    softBody.addSpring(new Spring(a, b, rest, stiffness));
  }

  // small relax so the new line integrates properly into the simulation
  softBody.relax(8);
  return pts;
}

 // Create a single brush pixel (one Particle) at x,y using the chosen color.
 // Returns the created Particle.
function createBrushPixel(x, y, color) {
  const mass = 0.5;
  const p = new Particle(x, y, mass, color);
  softBody.addParticle(p);

  // Optionally link to nearest neighbor to keep cohesion with the softbody
  const neighbor = softBody.findClosestParticle(x, y, 80);
  if (neighbor && neighbor !== p) {
    const rest = Math.hypot(neighbor.x - p.x, neighbor.y - p.y) || 1;
    softBody.addSpring(new Spring(p, neighbor, rest, 0.6));
  }

  // Small relax so the new pixel settles into the simulation
  softBody.relax(4);
  return p;
}

function resize() {
  const dpr = window.devicePixelRatio || 1;
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  softBody.setBounds(width, height);
}
window.addEventListener("resize", resize, { passive: true });
resize();

async function loadDefaultImage() {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = "./sans4.png";

  try {
    // Modern browsers: use decode when available
    if (img.decode) {
      await img.decode();
    } else {
      // Fallback for older browsers
      await new Promise((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = (err) => reject(err);
      });
    }
  } catch (err) {
    console.error("Failed to decode default image, falling back to onload:", err);
    // Last-resort fallback: wait for onload, ignore errors
    await new Promise((resolve) => {
      img.onload = () => resolve();
      img.onerror = () => resolve();
    });
  }

  currentImage = img;
  await rebuildSoftBody();
}

async function rebuildSoftBody() {
  if (!currentImage) return;
  await imageToSoftBody(currentImage, softBody, {
    canvasWidth: width,
    canvasHeight: height,
    pixelStep,
    alphaThreshold: 20,
    maxImageSize: 110
  });
}

stepInput.addEventListener("input", async (e) => {
  let v = parseFloat(e.target.value);
  if (isNaN(v)) v = pixelStep || 3;
  v = Math.max(1, Math.min(6, v));
  pixelStep = v;
  stepNumber.value = v;
  await rebuildSoftBody();
});

stepNumber.addEventListener("change", async (e) => {
  let v = parseFloat(e.target.value);
  if (isNaN(v)) v = pixelStep;
  v = Math.max(1, Math.min(6, v));
  pixelStep = v;
  stepNumber.value = v;
  stepInput.value = v;
  await rebuildSoftBody();
});

imageInput.addEventListener("change", async (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;
  try {
    if (img.decode) {
      await img.decode();
    } else {
      await new Promise((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = (err) => reject(err);
      });
    }
    currentImage = img;
    await rebuildSoftBody();
  } catch (err) {
    console.error("Failed to decode selected image:", err);
  } finally {
    URL.revokeObjectURL(url);
  }
});

if (resetBtn) {
  resetBtn.addEventListener("click", async () => {
    await rebuildSoftBody();
  });
}

// Pause button toggle
pauseBtn.addEventListener("click", () => {
  isPaused = !isPaused;
  updatePauseLabel();
});

// Step a single fixed frame and redraw (works even when paused)
if (stepFrameBtn) {
  stepFrameBtn.addEventListener("click", () => {
    // advance one fixed timestep and render once
    softBody.step(fixedDt);
    softBody.draw(ctx);
  });
}

 // Hydraulic press toggle
pressBtn.addEventListener("click", () => {
  // If already running, ignore extra presses
  if (softBody.pressActive) return;

  // Initialize press state
  softBody.pressY = 40;
  softBody.pressDirection = 1;
  softBody.pressTimer = 0;
  softBody.pressVisible = true;
  softBody.pressActive = true;
});

 // Take apart: remove all springs and impulse outwards
takeApartBtn.addEventListener("click", () => {
  // disable explode when user takes apart
  explodeMode = false;
  updateModeLabel();
  softBody.takeApart(3000);
});

// Merge touching pixels
mergeBtn.addEventListener("click", () => {
  // Merge particles that are touching or very close and then force a stronger immediate relaxation
  softBody.mergeTouching();
  // More iterations so new springs pull pixels together visibly even after takeApart
  softBody.relax(20);
});

 // Gravity controls
if (gravityInput && gravityNumber) {
  gravityInput.addEventListener("input", (e) => {
    const v = parseFloat(e.target.value) || 0;
    gravityNumber.value = v;
    softBody.gravity = v;
  });
  gravityNumber.addEventListener("change", (e) => {
    let v = parseFloat(e.target.value);
    if (isNaN(v)) v = softBody.gravity;
    v = Math.max(0, Math.min(2000, v));
    gravityNumber.value = v;
    gravityInput.value = v;
    softBody.gravity = v;
  });
}

// Export pixels to JSON
if (exportBtn) {
  exportBtn.addEventListener("click", () => {
    // Serialize particles and springs (use stable ids so imports can re-link)
    const data = {
      meta: {
        exportedAt: Date.now(),
        canvasWidth: width,
        canvasHeight: height
      },
      particles: softBody.particles.map(p => ({
        id: p.id,
        x: p.x,
        y: p.y,
        prevX: p.prevX,
        prevY: p.prevY,
        mass: p.mass,
        color: p.color,
        pinned: !!p.pinned,
        pinX: p.pinX,
        pinY: p.pinY
      })),
      springs: softBody.springs.map(s => ({
        aId: s.a && s.a.id,
        bId: s.b && s.b.id,
        restLength: s.restLength,
        stiffness: s.stiffness
      }))
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `softbody-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });
}

// Import JSON file (via hidden input)
if (importBtn && importJsonInput) {
  importBtn.addEventListener("click", () => {
    importJsonInput.value = "";
    importJsonInput.click();
  });

  importJsonInput.addEventListener("change", async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!parsed || !Array.isArray(parsed.particles)) {
        console.warn("Invalid import file");
        return;
      }

      // Clear existing soft body
      softBody.clear();

      // Create a mapping from old id -> new Particle
      const idMap = new Map();
      let maxId = 0;

      for (const pd of parsed.particles) {
        const px = Number(pd.x) || 0;
        const py = Number(pd.y) || 0;
        const mass = typeof pd.mass === "number" ? pd.mass : 0.5;
        const color = typeof pd.color === "string" ? pd.color : "rgba(200,200,200,1)";
        const p = new Particle(px, py, mass, color);
        // restore prev positions if present
        if (typeof pd.prevX === "number") p.prevX = pd.prevX;
        if (typeof pd.prevY === "number") p.prevY = pd.prevY;
        if (pd.pinned) {
          p.pinned = true;
          p.pinX = typeof pd.pinX === "number" ? pd.pinX : px;
          p.pinY = typeof pd.pinY === "number" ? pd.pinY : py;
        }
        // Keep original id by mapping: we'll not overwrite Particle._nextId but store mapping
        idMap.set(pd.id, p);
        softBody.addParticle(p);
        if (typeof pd.id === "number") maxId = Math.max(maxId, pd.id);
      }

      // Recreate springs by mapping ids to new Particle instances
      if (Array.isArray(parsed.springs)) {
        for (const sd of parsed.springs) {
          const a = idMap.get(sd.aId);
          const b = idMap.get(sd.bId);
          if (a && b) {
            const rest = Number(sd.restLength) || Math.hypot(a.x - b.x, a.y - b.y) || 1;
            const stiff = typeof sd.stiffness === "number" ? sd.stiffness : 0.6;
            softBody.addSpring(new Spring(a, b, rest, stiff));
          }
        }
      }

      // Attempt to keep Particle._nextId ahead of any imported ids to avoid collisions
      if (typeof Particle._nextId === "undefined") Particle._nextId = 1;
      Particle._nextId = Math.max(Particle._nextId, maxId + 1);

      // Relax a bit so imported springs settle visibly
      softBody.relax(8);
    } catch (err) {
      console.error("Failed to import JSON:", err);
    } finally {
      importJsonInput.value = "";
    }
  });
}



// Mode toggle: Drag <-> Slice
function updateModeLabel() {
  const label = mode === "drag" ? "Mode: Drag"
               : mode === "slice" ? "Mode: Slice"
               : mode === "explode" ? "Mode: Explode"
               : mode === "blackhole" ? "Mode: Blackhole"
               : mode === "brush" ? "Mode: Brush"
               : "Mode: Eraser";
  modeBtn.textContent = label;
}

function toggleMode() {
  // cycle: drag -> slice -> explode -> blackhole -> brush -> eraser -> drag ...
  mode = mode === "drag" ? "slice"
       : mode === "slice" ? "explode"
       : mode === "explode" ? "blackhole"
       : mode === "blackhole" ? "brush"
       : mode === "brush" ? "eraser"
       : "drag";
  updateModeLabel();

  // Clear any ongoing drag / slice
  if (draggedParticle) {
    draggedParticle.dragged = false;
    draggedParticle = null;
  }
  activePointerId = null;
  sliceStart = null;
}

modeBtn.addEventListener("click", (e) => {
  // Single button cycles between Drag, Slice, and Explode
  toggleMode();
});

// Prevent default context menu on right-click so we can use it to toggle mode
canvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

 // Pointer / touch dragging
let activePointerId = null;
let draggedParticle = null;
let currentBlackHoleIndex = null; // index of transient black hole while pointer is held

// Track last known pointer position for keyboard spawn (in canvas coords)
let lastPointerX = width * 0.5;
let lastPointerY = height * 0.5;

canvas.addEventListener("pointerdown", (e) => {
  // Right-click cycles mode
  if (e.button === 2) {
    toggleMode();
    return;
  }

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Brush mode: stamp 3x3 pixels and capture the pointer to draw continuously while held
  if (mode === "brush") {
    // use cached rgba so color changes via the picker apply immediately
    const rgba = brushColorRGBA;
    createBrushPixel(x, y, rgba);
    activePointerId = e.pointerId;
    canvas.setPointerCapture(e.pointerId);
    return;
  }

  // Explode mode: create an explosion at pointer and do not capture the pointer
  if (mode === "explode") {
    softBody.explode(x, y, 51200, 160);
    return;
  }

  // Blackhole mode: create a transient black hole while pointer is held
  if (mode === "blackhole") {
    if (typeof currentBlackHoleIndex === "undefined" || currentBlackHoleIndex === null) {
      currentBlackHoleIndex = softBody.blackHoles.length;
      softBody.addBlackHole(x, y, 18000, 220);
    } else {
      const bh = softBody.blackHoles[currentBlackHoleIndex];
      if (bh) {
        bh.x = x;
        bh.y = y;
      }
    }
    activePointerId = e.pointerId;
    canvas.setPointerCapture(e.pointerId);
    return;
  }

  // Eraser mode: remove particles within the same radius as blackhole while pointer is held
  if (mode === "eraser") {
    const eraserRadius = 160;
    const r2 = eraserRadius * eraserRadius;
    softBody.particles = softBody.particles.filter((p) => {
      const dx = p.x - x;
      const dy = p.y - y;
      return (dx * dx + dy * dy) > r2;
    });
    const remainingIds = new Set(softBody.particles.map(p => p.id));
    softBody.springs = softBody.springs.filter(s => s.a && s.b && remainingIds.has(s.a.id) && remainingIds.has(s.b.id));
    activePointerId = e.pointerId;
    canvas.setPointerCapture(e.pointerId);
    return;
  }

  // For slice/drag interactions we capture the pointer and track it
  activePointerId = e.pointerId;
  canvas.setPointerCapture(e.pointerId);

  if (mode === "slice") {
    // Start a slice segment and initialize preview; if Shift is held, this becomes a draw-line action.
    sliceStart = { x, y };
    // If user starts with Shift held we mark this preview as a draw action; we also allow shift to be held/released while dragging.
    slicePreview = { x1: x, y1: y, x2: x, y2: y, isDraw: !!e.shiftKey };
    draggedParticle = null;
    return;
  }

  // Drag mode: pick closest particle
  const maxDist = 32;
  const p = softBody.findClosestParticle(x, y, maxDist);
  if (p) {
    draggedParticle = p;
    p.dragged = true;
    p.dragTargetX = x;
    p.dragTargetY = y;
  } else {
    draggedParticle = null;
  }
});

canvas.addEventListener("pointermove", (e) => {
  // Always update last known pointer position for keyboard spawns
  const rectForPos = canvas.getBoundingClientRect();
  lastPointerX = e.clientX - rectForPos.left;
  lastPointerY = e.clientY - rectForPos.top;

  if (activePointerId === null || e.pointerId !== activePointerId) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // While in brush mode and holding the pointer, continuously stamp
  if (mode === "brush" && activePointerId !== null && e.pointerId === activePointerId) {
    // use cached rgba so color changes via the picker apply immediately while drawing
    const rgba = brushColorRGBA;
    createBrushPixel(x, y, rgba);
    return;
  }

  // While holding in blackhole mode, update the transient hole position
  if (mode === "blackhole") {
    if (typeof currentBlackHoleIndex !== "undefined" && currentBlackHoleIndex !== null) {
      const bh = softBody.blackHoles[currentBlackHoleIndex];
      if (bh) {
        bh.x = x;
        bh.y = y;
      }
    }
    return;
  }

  // While holding in eraser mode, continuously erase nearby particles
  if (mode === "eraser") {
    const eraserRadius = 220;
    const r2 = eraserRadius * eraserRadius;
    softBody.particles = softBody.particles.filter((p) => {
      const dx = p.x - x;
      const dy = p.y - y;
      return (dx * dx + dy * dy) > r2;
    });
    const remainingIds = new Set(softBody.particles.map(p => p.id));
    softBody.springs = softBody.springs.filter(s => s.a && s.b && remainingIds.has(s.a.id) && remainingIds.has(s.b.id));
    return;
  }

  // In slice mode we update the preview line while dragging; holding Shift switches to draw mode
  if (mode === "slice") {
    if (sliceStart) {
      // update preview geometry and whether we're drawing or cutting based on current shiftKey
      slicePreview = {
        x1: sliceStart.x,
        y1: sliceStart.y,
        x2: x,
        y2: y,
        isDraw: !!e.shiftKey
      };
    }
    return;
  }

  if (!draggedParticle) return;

  // If paused and Ctrl is held while dragging, directly move the particle to the pointer
  // (update prev positions to avoid sudden velocity on resume).
  if (isPaused && e.ctrlKey) {
    draggedParticle.x = x;
    draggedParticle.y = y;
    draggedParticle.prevX = x;
    draggedParticle.prevY = y;
    // keep drag targets in sync for visual/state consistency
    draggedParticle.dragTargetX = x;
    draggedParticle.dragTargetY = y;
    return;
  }

  draggedParticle.dragTargetX = x;
  draggedParticle.dragTargetY = y;
});

function endPointer(e) {
  if (activePointerId === null || e.pointerId !== activePointerId) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (mode === "slice") {
    if (sliceStart && slicePreview) {
      // If preview was a draw action (Shift held), create a collidable rigid line in the softBody
      if (slicePreview.isDraw) {
        // create collidable movable particles & springs along the segment (no persistent outline)
        createRigidLine(slicePreview, 6);
      } else {
        // Perform slice along the drag segment (cut springs)
        softBody.sliceSegment(slicePreview.x1, slicePreview.y1, slicePreview.x2, slicePreview.y2);
      }
    }
    sliceStart = null;
    slicePreview = null;
  } else if (mode === "blackhole") {
    if (typeof currentBlackHoleIndex !== "undefined" && currentBlackHoleIndex !== null) {
      if (softBody.blackHoles && softBody.blackHoles.length > currentBlackHoleIndex) {
        softBody.blackHoles.splice(currentBlackHoleIndex, 1);
      } else {
        softBody.clearBlackHoles();
      }
      currentBlackHoleIndex = null;
    }
  } else if (mode === "eraser") {
    // nothing else to finalize for eraser besides releasing pointer
  } else {
    if (draggedParticle) {
      draggedParticle.dragged = false;
      draggedParticle = null;
    }
  }

  activePointerId = null;
}

canvas.addEventListener("pointerup", endPointer);
canvas.addEventListener("pointercancel", endPointer);
canvas.addEventListener("pointerout", endPointer);

  // Keyboard shortcuts: Space = pause/resume, S = step one frame, T = take apart, M = merge, B = pin, Alt+B = unpin all, Q = random color spawn, J = red spawn, E = hold-eraser
window.addEventListener("keydown", (e) => {
  // Space toggles pause (kept as shortcut, synchronized with button)
  if (e.code === "Space") {
    e.preventDefault();
    isPaused = !isPaused;
    updatePauseLabel();
    return;
  }

  // Step one frame (S)
  if (e.code === "KeyS") {
    e.preventDefault();
    // advance one fixed timestep and render once
    softBody.step(fixedDt);
    softBody.draw(ctx);
    return;
  }

  // Take apart (T)
  if (e.code === "KeyT") {
    e.preventDefault();
    // disable explode when user takes apart
    explodeMode = false;
    updateModeLabel();
    softBody.takeApart(3000);
    return;
  }

  // Merge touching pixels (M)
  if (e.code === "KeyM") {
    e.preventDefault();
    softBody.mergeTouching();
    softBody.relax(20);
    return;
  }

  // Pin/unpin currently dragged particle when pressing B while dragging (or pin the particle under the pointer if holding)
  if (e.code === "KeyB" && !e.altKey) {
    // If there's an actively dragged particle, toggle its pinned state
    if (draggedParticle) {
      e.preventDefault();
      if (draggedParticle.pinned) {
        // unlock if already pinned
        draggedParticle.pinned = false;
      } else {
        // pin and stop dragging
        draggedParticle.pinned = true;
        draggedParticle.pinX = draggedParticle.x;
        draggedParticle.pinY = draggedParticle.y;
        draggedParticle.dragged = false;
        draggedParticle = null;
      }
      return;
    }

    // If the pointer is currently held (user is dragging or holding), pin the particle under the pointer
    if (activePointerId !== null) {
      e.preventDefault();
      const spawnX = Math.max(0, Math.min(width, lastPointerX || width * 0.5));
      const spawnY = Math.max(0, Math.min(height, lastPointerY || height * 0.5));
      const p = softBody.findClosestParticle(spawnX, spawnY, 32);
      if (p) {
        p.pinned = true;
        p.pinX = p.x;
        p.pinY = p.y;
      }
      return;
    }

    // Otherwise do nothing
    return;
  }

  // Alt+B clears all pinned particles
  if (e.code === "KeyB" && e.altKey) {
    e.preventDefault();
    for (const p of softBody.particles) {
      p.pinned = false;
    }
    return;
  }

  // G: toggle pin/unpin all particles
  if (e.code === "KeyG") {
    e.preventDefault();
    // If at least one particle is unpinned, pin all; otherwise unpin all.
    let anyUnpinned = false;
    for (const p of softBody.particles) {
      if (!p.pinned) {
        anyUnpinned = true;
        break;
      }
    }
    for (const p of softBody.particles) {
      p.pinned = anyUnpinned;
      if (anyUnpinned) {
        p.pinX = p.x;
        p.pinY = p.y;
      }
    }
    return;
  }

  // H: spawn a small green pixel (particle) at last pointer position
  if (e.code === "KeyH") {
    e.preventDefault();
    // create a new green particle at last known pointer position
    const spawnX = Math.max(0, Math.min(width, lastPointerX || width * 0.5));
    const spawnY = Math.max(0, Math.min(height, lastPointerY || height * 0.5));
    // Particle constructor signature: (x, y, mass, color)
    const green = new Particle(spawnX, spawnY, 0.5, "rgba(80,220,120,1)");
    softBody.addParticle(green);
    // Optionally create a tiny spring linking to nearest particle for cohesion (soft)
    const neighbor = softBody.findClosestParticle(spawnX, spawnY, 80);
    if (neighbor && neighbor !== green) {
      const rest = Math.hypot(neighbor.x - green.x, neighbor.y - green.y) || 1;
      softBody.addSpring(new Spring(green, neighbor, rest, 0.6));
    }
    return;
  }

  // Q: spawn a pixel with a random color at last pointer position
  if (e.code === "KeyQ") {
    e.preventDefault();
    const spawnX = Math.max(0, Math.min(width, lastPointerX || width * 0.5));
    const spawnY = Math.max(0, Math.min(height, lastPointerY || height * 0.5));
    // generate random rgba color with full opacity
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const color = `rgba(${r},${g},${b},1)`;
    const p = new Particle(spawnX, spawnY, 0.5, color);
    softBody.addParticle(p);
    // soft link to nearest neighbor for cohesion
    const neighborQ = softBody.findClosestParticle(spawnX, spawnY, 80);
    if (neighborQ && neighborQ !== p) {
      const rest = Math.hypot(neighborQ.x - p.x, neighborQ.y - p.y) || 1;
      softBody.addSpring(new Spring(p, neighborQ, rest, 0.6));
    }
    return;
  }

  // J: spawn a red pixel at last pointer position
  if (e.code === "KeyJ") {
    e.preventDefault();
    const spawnX = Math.max(0, Math.min(width, lastPointerX || width * 0.5));
    const spawnY = Math.max(0, Math.min(height, lastPointerY || height * 0.5));
    const red = new Particle(spawnX, spawnY, 0.5, "rgba(220,60,60,1)");
    softBody.addParticle(red);
    const neighborJ = softBody.findClosestParticle(spawnX, spawnY, 80);
    if (neighborJ && neighborJ !== red) {
      const rest = Math.hypot(neighborJ.x - red.x, neighborJ.y - red.y) || 1;
      softBody.addSpring(new Spring(red, neighborJ, rest, 0.6));
    }
    return;
  }

  // E: hold to temporarily enter eraser mode
  if (e.code === "KeyE") {
    e.preventDefault();
    // remember previous mode so we can restore on keyup
    if (typeof window._prevModeForE === "undefined" || window._prevModeForE === null) {
      window._prevModeForE = mode;
    }
    if (mode !== "eraser") {
      // clear any current drag or slice state
      if (draggedParticle) {
        draggedParticle.dragged = false;
        draggedParticle = null;
      }
      activePointerId = null;
      sliceStart = null;

      mode = "eraser";
      updateModeLabel();

      // perform an immediate erase at last pointer position so holding E has immediate effect
      const ex = Math.max(0, Math.min(width, lastPointerX || width * 0.5));
      const ey = Math.max(0, Math.min(height, lastPointerY || height * 0.5));
      const eraserRadius = 160;
      const r2 = eraserRadius * eraserRadius;
      softBody.particles = softBody.particles.filter((p) => {
        const dx = p.x - ex;
        const dy = p.y - ey;
        return (dx * dx + dy * dy) > r2;
      });
      const remainingIds = new Set(softBody.particles.map(p => p.id));
      softBody.springs = softBody.springs.filter(s => s.a && s.b && remainingIds.has(s.a.id) && remainingIds.has(s.b.id));
    }
    return;
  }
});

window.addEventListener("keyup", (e) => {
  // Restore mode after releasing E if it had been used to temporarily switch modes
  if (e.code === "KeyE") {
    e.preventDefault();
    if (typeof window._prevModeForE !== "undefined" && window._prevModeForE !== null) {
      mode = window._prevModeForE || "drag";
      window._prevModeForE = null;
      updateModeLabel();
    }
  }
});

 // Animation loop
let lastTime = performance.now();
const fixedDt = 1 / 60;

function loop(now) {
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;

  let accumulator = dt;
  while (accumulator > 0 && !isPaused) {
    for (const sb of softBodies) {
      sb.step(fixedDt);
    }
    accumulator -= fixedDt;
  }

  // draw each softbody (they share the same canvas)
  ctx.clearRect(0, 0, width, height);
  for (const sb of softBodies) {
    if (sb.visible === false) continue;
    sb.draw(ctx);
  }

  // Draw persistent drawn lines (solid)
  if (drawnLines.length > 0) {
    ctx.save();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    for (const ln of drawnLines) {
      ctx.beginPath();
      ctx.moveTo(ln.x1, ln.y1);
      ctx.lineTo(ln.x2, ln.y2);
      ctx.stroke();
    }
    ctx.restore();
  }

  // Draw slice preview if active (dashed for cut, solid when drawing)
  if (slicePreview) {
    ctx.save();
    ctx.lineWidth = slicePreview.isDraw ? 4 : 2;
    ctx.lineCap = "round";
    if (slicePreview.isDraw) {
      ctx.strokeStyle = "rgba(255,255,255,0.95)";
    } else {
      ctx.strokeStyle = "rgba(255,220,80,0.95)";
      ctx.setLineDash([8, 6]);
    }
    ctx.beginPath();
    ctx.moveTo(slicePreview.x1, slicePreview.y1);
    ctx.lineTo(slicePreview.x2, slicePreview.y2);
    ctx.stroke();
    ctx.restore();
  }

  requestAnimationFrame(loop);
}

loadDefaultImage()
  .then(() => {
    lastTime = performance.now();
    updatePauseLabel();
    requestAnimationFrame(loop);
  })
  .catch((err) => {
    console.error("Error loading default image:", err);
    lastTime = performance.now();
    requestAnimationFrame(loop);
  });

 

  stickyBtn.addEventListener("click", () => {
    const newState = !softBody.stickyFloor;
    softBody.setStickyFloor(newState);
    updateStickyLabel();
  });



  // Separate columns: remove springs that are predominantly horizontal (connect neighboring columns)
  if (separateXBtn) {
    separateXBtn.addEventListener("click", () => {
      // keep springs where vertical component dominates or balanced; remove mostly-horizontal springs
      softBody.springs = softBody.springs.filter((s) => {
        if (!s.a || !s.b) return false;
        const dx = Math.abs(s.a.x - s.b.x);
        const dy = Math.abs(s.a.y - s.b.y);
        // if horizontal separation: dx > dy * threshold => remove
        return !(dx > dy * 0.9);
      });
      // relax a little so the result is visible
      softBody.relax(8);
    });
  }

  // Separate rows: remove springs that are predominantly vertical (connect neighboring rows)
  if (separateYBtn) {
    separateYBtn.addEventListener("click", () => {
      softBody.springs = softBody.springs.filter((s) => {
        if (!s.a || !s.b) return false;
        const dx = Math.abs(s.a.x - s.b.x);
        const dy = Math.abs(s.a.y - s.b.y);
        // if vertical separation: dy > dx * threshold => remove
        return !(dy > dx * 0.9);
      });
      softBody.relax(8);
    });
  }

  // ensure label is correct at start
  updateStickyLabel();


 

 

 