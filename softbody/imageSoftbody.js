import { Particle, Spring } from "./physics.js";

export async function imageToSoftBody(img, softBody, options) {
  const {
    canvasWidth,
    canvasHeight,
    pixelStep = 3,
    alphaThreshold = 40,
    maxImageSize = 120
  } = options;

  softBody.clear();

  const off = document.createElement("canvas");
  const ctx = off.getContext("2d", { willReadFrequently: true });

  // Use natural dimensions when available and validate them
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;

  if (!iw || !ih || !Number.isFinite(iw) || !Number.isFinite(ih)) {
    console.warn("imageToSoftBody: invalid image dimensions", { iw, ih });
    return;
  }

  const ratio = iw / ih;
  if (!Number.isFinite(ratio) || ratio <= 0) {
    console.warn("imageToSoftBody: invalid aspect ratio", { ratio });
    return;
  }

  let targetW = Math.round(maxImageSize);
  if (!Number.isFinite(targetW) || targetW <= 0) {
    targetW = 64;
  }

  let targetH = Math.round(targetW / ratio);
  if (targetH > maxImageSize) {
    targetH = Math.round(maxImageSize);
    targetW = Math.round(targetH * ratio);
  }

  if (targetW <= 0 || targetH <= 0) {
    console.warn("imageToSoftBody: computed non-positive target size", {
      targetW,
      targetH
    });
    return;
  }

  off.width = targetW;
  off.height = targetH;
  ctx.drawImage(img, 0, 0, targetW, targetH);

  const imgData = ctx.getImageData(0, 0, targetW, targetH);
  const data = imgData.data;

  const particlesGrid = new Array(targetH);
  for (let y = 0; y < targetH; y++) {
    particlesGrid[y] = new Array(targetW).fill(null);
  }

  // Use a rounded sampling step for pixel indexing, but keep the raw pixelStep
  // value for world spacing so fractional slider values still have an effect.
  const sampleStep = Math.max(1, Math.round(pixelStep));

  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  const startX = centerX - targetW * 0.5;
  const startY = centerY - targetH * 0.5;

  const massPerParticle = 0.5;
  const particleSpacing = 4; // world spacing
  const stiffness = 0.65;

  for (let y = 0; y < targetH; y += sampleStep) {
    for (let x = 0; x < targetW; x += sampleStep) {
      const idx = (y * targetW + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      if (a < alphaThreshold) continue;

      const worldX = startX + x * (particleSpacing / pixelStep);
      const worldY = startY + y * (particleSpacing / pixelStep);

      const color = `rgba(${r},${g},${b},${a / 255})`;
      const p = new Particle(worldX, worldY, massPerParticle, color);
      softBody.addParticle(p);
      particlesGrid[y][x] = p;
    }
  }

  const neighbors = [
    [1, 0],
    [0, 1],
    [1, 1],
    [-1, 1]
  ];

  for (let y = 0; y < targetH; y += sampleStep) {
    for (let x = 0; x < targetW; x += sampleStep) {
      const p = particlesGrid[y][x];
      if (!p) continue;

      for (const [dx, dy] of neighbors) {
        const nx = x + dx * sampleStep;
        const ny = y + dy * sampleStep;
        if (nx < 0 || nx >= targetW || ny < 0 || ny >= targetH) continue;
        const np = particlesGrid[ny][nx];
        if (!np) continue;

        const rest = Math.hypot(
          (nx - x) * (particleSpacing / pixelStep),
          (ny - y) * (particleSpacing / pixelStep)
        );
        softBody.addSpring(new Spring(p, np, rest, stiffness));
      }
    }
  }


}