import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';



// --- Assets ---
const SOUNDS = {
    stretch: 'stretch.mp3',
    reset: 'reset.mp3'
};

const CURSORS = {
    normal: '80471_bcb8b35eae3cff0061e13f2c24c57ef4 (1).png',
    grabbing: 'costume1 (4).png'
};

// --- Custom Cursor Setup ---
const cursorEl = document.getElementById('custom-cursor');
let cursorX = 0;
let cursorY = 0;

function updateCursorPosition(x, y) {
    cursorX = x;
    cursorY = y;
    cursorEl.style.transform = `translate(${x - 16}px, ${y - 16}px)`;
    cursorEl.style.display = 'block'; // Show it once we have a position
}

function setCursorType(type) {
  return  null;
}

// Initialize cursor type
setCursorType('normal');

window.addEventListener('pointermove', (e) => {
    updateCursorPosition(e.clientX, e.clientY);
});

window.addEventListener('pointerdown', (e) => {
    updateCursorPosition(e.clientX, e.clientY);
    setCursorType('grabbing');
});

window.addEventListener('pointerup', () => {
    setCursorType('normal');
});

// Ensure cursor remains visible/updated during touch interactions
window.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
        updateCursorPosition(e.touches[0].clientX, e.touches[0].clientY);
    }
}, { passive: true });

// --- Setup ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
dirLight.position.set(5, 10, 7.5);
dirLight.castShadow = true;
scene.add(dirLight);

// Create a procedural environment map to prevent "shininess" from darkening the model
const genEnvMap = (type = 'studio') => {
    if (type === 'none') return null;

    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 128);
    
    if (type === 'studio') {
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.45, '#bbbbbb');
        gradient.addColorStop(0.5, '#444444');
        gradient.addColorStop(1, '#111111');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 128);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(60, 20, 40, 20);
        ctx.fillRect(160, 40, 30, 30);
    } else if (type === 'sunset') {
        gradient.addColorStop(0, '#ff5e00');
        gradient.addColorStop(0.5, '#ff0000');
        gradient.addColorStop(0.51, '#220000');
        gradient.addColorStop(1, '#000000');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 128);
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.arc(128, 64, 20, 0, Math.PI * 2);
        ctx.fill();
    } else if (type === 'neon') {
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, 256, 128);
        ctx.fillStyle = '#ff00ff';
        ctx.fillRect(20, 20, 10, 80);
        ctx.fillStyle = '#00ffff';
        ctx.fillRect(100, 40, 100, 10);
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(220, 10, 5, 100);
    } else if (type === 'chrome') {
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.2, '#ffffff');
        gradient.addColorStop(0.48, '#777777');
        gradient.addColorStop(0.5, '#000000');
        gradient.addColorStop(0.52, '#333333');
        gradient.addColorStop(1, '#111111');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 128);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
};

scene.environment = genEnvMap('studio');

camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.5;
controls.enableZoom = false; // We are remaking zoom entirely for smoothness

// --- State ---
let marioHead = null;
let brushRadius = 0.8;
let currentZoom = 5.0;
let targetZoom = 5.0;
let currentTool = 'stretch';
let originalVertices = new Map(); // Store original vertex positions per mesh
let originalGeometries = new Map(); // Store original geometry structures (important for shatter reset)
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let isDragging = false;
let selectedMesh = null;
let dragStartPositions = null;
let initialLocalPoint = null;
let initialMousePos = new THREE.Vector2();
let discoMode = false;
let glitchMode = false;
let waveMode = false;
let ghostMode = false;
let toonMode = false;
let xrayMode = false;
let jelloMode = false;
let pulseMode = false;
let shatterActive = false;
let twistAmount = 0;
let horrorModeActive = false;
let horrorShakeIntensity = 0;
let horrorStartTime = 0;
let classicMode = false;
let snappingMeshes = new Set();
const meshVelocities = new Map(); // Store Float32Array of velocities per mesh uuid
const shatterVelocities = new Map(); // Store velocities for shattered triangles

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const bgMusic = new Audio('Weird Al Yankovic - Albuquerque_ THE MOVIE [JE37e1eK2mY].mp3');
bgMusic.loop = true;
bgMusic.volume = 0.4;

function startMusic() {
    if (horrorModeActive) return;
    bgMusic.play().catch(() => {});
    if (audioCtx.state === 'suspended') audioCtx.resume();
}
// Persistent triggers to ensure music plays/resumes on any interaction
window.addEventListener('pointerdown', startMusic);
window.addEventListener('keydown', startMusic);
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && !horrorModeActive) bgMusic.play().catch(() => {});
});
// Try to play immediately (often blocked by browser but worth the attempt)
bgMusic.play().catch(() => {});

function playSound(name) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const sound = new Audio(SOUNDS[name]);
    sound.volume = 0.3;
    sound.play().catch(() => {});
}

// --- Colors ---
const COLORS = {
    skin: 0xffdbac,
    blue: 0x01ccff,
    black: 0x111111,
    hair: 0x4b2b10,
    white: 0xeeeeee,
    red: 0xff0000
};

// --- Model Loading ---

function processLoadedModel(object, isMario = false) {
    if (marioHead) scene.remove(marioHead);
    marioHead = object;
    originalVertices.clear();
    originalGeometries.clear();
    
    // Scale and center
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    
    // Normalize target size. Tom is often exported with huge scales or nested offsets.
    // Standardizing the max dimension to 3.5 units.
    const targetSize = 3.5;
    const scale = targetSize / maxDim;
    object.scale.set(scale, scale, scale);
    object.updateMatrixWorld();
    
    // Re-center accurately
    const newBox = new THREE.Box3().setFromObject(object);
    const newCenter = newBox.getCenter(new THREE.Vector3());
    object.position.sub(newCenter);

    // Store root initial state for full reset
    object.userData.initialPosition = object.position.clone();
    object.userData.initialRotation = object.rotation.clone();
    object.userData.initialScale = object.scale.clone();

    object.traverse((child) => {
        if (child.isMesh) {
            // Store original local transform for Pull Part tool
            child.userData.originalPosition = child.position.clone();
            child.userData.originalScale = child.scale.clone();
            child.userData.originalRotation = child.rotation.clone();

            // If the mesh is part of a complex hierarchy, we want to be able to drag it
            // Clone geometry to ensure each mesh has its own unique geometry.
            // Preserve original indexing (do NOT merge vertices) so distinct facial features
            // (eyes, mustache, etc.) remain separate and won't collapse together on reset.
            const geomClone = child.geometry.clone();
            child.geometry = geomClone;
            if (child.geometry.computeVertexNormals) child.geometry.computeVertexNormals();

            const geometry = child.geometry;
            const positions = geometry.attributes.position;
            
            // Store original data
            originalVertices.set(child.uuid, positions.array.slice());
            // Save the original geometry both in the map and directly on the mesh to ensure a stable reference
            const geomCloneSaved = child.geometry.clone();
            originalGeometries.set(child.uuid, geomCloneSaved);
            child.userData.originalGeometry = geomCloneSaved;

            const MARIO_COLORS = {
                0: 0x111111, 1: 0x111111, 2: 0x111111, 3: 0xeeeeee,
                4: 0x111111, 5: 0x01ccff, 6: 0xeeeeee, 7: 0x111111,
                8: 0x01ccff, 9: 0xff0000, 10: 0xff0000, 11: 0x4b2b10,
                12: 0xeeeeee, 13: 0xeeeeee, 14: 0x4b2b10, 15: 0xffdbac,
                16: 0xeeeeee
            };

            const applyMaterial = (mat, index) => {
                if (!mat) return new THREE.MeshStandardMaterial({ color: 0x888888 });
                
                let color = 0xffffff;
                if (isMario) {
                    color = MARIO_COLORS[index] !== undefined ? MARIO_COLORS[index] : COLORS.skin;
                } else if (mat.color) {
                    color = mat.color.getHex();
                }

                const newMat = new THREE.MeshStandardMaterial({
                    color: color,
                    roughness: 0.4,
                    metalness: 0.1,
                    flatShading: false,
                    envMapIntensity: 1.0,
                    map: (mat.map && mat.map.isTexture) ? mat.map : null,
                    transparent: !!(mat.transparent || (mat.map && mat.map.format === THREE.RGBAFormat) || (mat.opacity !== undefined && mat.opacity < 1)),
                    opacity: mat.opacity !== undefined ? mat.opacity : 1,
                    alphaTest: mat.alphaTest || 0,
                    side: THREE.DoubleSide
                });
                newMat.userData.originalColor = new THREE.Color(color);
                return newMat;
            };

            if (Array.isArray(child.material)) {
                child.material = child.material.map((mat, i) => applyMaterial(mat, i));
            } else {
                child.material = applyMaterial(child.material, 0);
            }
        }
    });

    scene.add(object);
}

const objLoader = new OBJLoader();
const gltfLoader = new GLTFLoader();

// Load initial Mario
objLoader.load('./mariohead.obj', (object) => {
    processLoadedModel(object, true);
}, undefined, (error) => {
    console.error('An error happened loading the model', error);
});

// Model Import & Selection UI
const modelFileInput = document.getElementById('model-file-input');
const modelSelect = document.getElementById('model-select');
const customModelOption = document.getElementById('custom-model-option');

document.getElementById('import-btn').addEventListener('click', () => modelFileInput.click());

modelSelect.addEventListener('change', (e) => {
    const path = e.target.value;
    if (path === 'custom') return;

    const ext = path.split('.').pop().toLowerCase();
    if (ext === 'obj') {
        objLoader.load(path, (obj) => {
            processLoadedModel(obj, path.includes('mariohead'));
        });
    } else if (ext === 'gltf' || ext === 'glb') {
        gltfLoader.load(path, (gltf) => {
            processLoadedModel(gltf.scene, false);
        });
    }
});

modelFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const ext = file.name.split('.').pop().toLowerCase();

    const onModelLoaded = (obj, isMario = false) => {
        processLoadedModel(obj, isMario);
        customModelOption.disabled = false;
        customModelOption.innerText = `Imported: ${file.name}`;
        modelSelect.value = 'custom';
        URL.revokeObjectURL(url);
    };

    if (ext === 'obj') {
        objLoader.load(url, (obj) => onModelLoaded(obj, false));
    } else if (ext === 'gltf' || ext === 'glb') {
        gltfLoader.load(url, (gltf) => onModelLoaded(gltf.scene, false));
    } else {
        alert("Unsupported file format. Please use .obj, .gltf, or .glb");
    }
});

// --- Texture Editor Logic ---

const textureModal = document.getElementById('texture-modal');
const textureList = document.getElementById('texture-list');
const noTexturesMsg = document.getElementById('no-textures-msg');
const closeTextureModal = document.getElementById('close-texture-modal');
const textureEditorBtn = document.getElementById('texture-editor-btn');
const textureUploadInput = document.getElementById('texture-upload-input');

const paintOverlay = document.getElementById('paint-overlay');
const paintCanvas = document.getElementById('tex-editor-canvas');
const paintCtx = paintCanvas.getContext('2d');
const paintColorInput = document.getElementById('tex-paint-color');
const paintSizeInput = document.getElementById('tex-paint-size');
const paintSaveBtn = document.getElementById('tex-paint-save');
const paintCancelBtn = document.getElementById('tex-paint-cancel');

let activeTexture = null;
let isPaintingOnTex = false;

function openTextureEditor() {
    textureList.innerHTML = '';
    const textures = new Set();
    const textureMap = new Map(); // texture -> material name or id

    if (marioHead && typeof marioHead.traverse === 'function') {
        marioHead.traverse(child => {
            if (child && child.isMesh && child.material) {
                const materials = Array.isArray(child.material) ? child.material : [child.material];
                materials.forEach((m, idx) => {
                    if (m && m.map) {
                        textures.add(m.map);
                        textureMap.set(m.map, `${child.name || 'Mesh'} (Mat ${idx})`);
                    }
                });
            }
        });
    }

    if (textures.size === 0) {
        noTexturesMsg.style.display = 'block';
        if (modelSelect.value === './mariohead.obj') {
            noTexturesMsg.innerText = "This model uses colors instead of textures. Use the Paint tool instead.";
        } else {
            noTexturesMsg.innerText = "No textures found in this model.";
        }
    } else {
        noTexturesMsg.style.display = 'none';
        textures.forEach(tex => {
            const item = document.createElement('div');
            item.style.cssText = `
                display: flex; align-items: center; gap: 15px; background: rgba(255,255,255,0.05);
                padding: 10px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);
            `;

            const img = document.createElement('img');
            img.src = tex.image.src || '';
            // If image is a canvas or lacks src (procedural)
            if (!img.src && tex.image instanceof HTMLCanvasElement) {
                img.src = tex.image.toDataURL();
            }
            // Flip the preview vertically because Three.js textures are often stored Y-inverted
            img.style.cssText = 'width: 60px; height: 60px; object-fit: cover; border-radius: 8px; border: 1px solid #444; transform: rotate(180deg);';

            const info = document.createElement('div');
            info.style.flexGrow = '1';
            info.innerHTML = `<div style="font-size: 11px; font-weight: bold; margin-bottom: 5px;">${textureMap.get(tex)}</div>
                              <div style="font-size: 9px; opacity: 0.6;">${tex.image.width}x${tex.image.height} px</div>`;

            const btnContainer = document.createElement('div');
            btnContainer.style.display = 'flex';
            btnContainer.style.gap = '5px';

            const editBtn = document.createElement('button');
            editBtn.className = 'btn';
            editBtn.innerText = 'Draw';
            editBtn.style.minWidth = '50px';
            editBtn.onclick = () => startTexturePaint(tex);

            const uploadBtn = document.createElement('button');
            uploadBtn.className = 'btn';
            uploadBtn.innerText = 'Replace';
            uploadBtn.style.minWidth = '50px';
            uploadBtn.onclick = () => {
                activeTexture = tex;
                textureUploadInput.click();
            };

            btnContainer.appendChild(editBtn);
            btnContainer.appendChild(uploadBtn);
            item.appendChild(img);
            item.appendChild(info);
            item.appendChild(btnContainer);
            textureList.appendChild(item);
        });
    }

    textureModal.style.display = 'flex';
}

textureEditorBtn.addEventListener('click', openTextureEditor);
closeTextureModal.addEventListener('click', () => { textureModal.style.display = 'none'; });

textureUploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file || !activeTexture) return;
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            activeTexture.image = img;
            activeTexture.needsUpdate = true;
            openTextureEditor(); // Refresh list previews
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

// Texture Painting Logic
function startTexturePaint(tex) {
    activeTexture = tex;
    textureModal.style.display = 'none';
    paintOverlay.style.display = 'flex';

    const sourceImg = tex.image;
    paintCanvas.width = sourceImg.width;
    paintCanvas.height = sourceImg.height;

    // Scale canvas view to fit screen nicely
    const aspect = sourceImg.width / sourceImg.height;
    if (aspect > 1) {
        paintCanvas.style.width = '90vw';
        paintCanvas.style.height = 'auto';
    } else {
        paintCanvas.style.height = '70vh';
        paintCanvas.style.width = 'auto';
    }

    paintCtx.fillStyle = 'white';
    paintCtx.fillRect(0, 0, paintCanvas.width, paintCanvas.height);
    
    // Rotate the painting context 180 degrees to match the visual orientation of the model
    paintCtx.setTransform(1, 0, 0, 1, 0, 0); // Reset
    paintCtx.translate(paintCanvas.width, paintCanvas.height);
    paintCtx.rotate(Math.PI);
    paintCtx.drawImage(sourceImg, 0, 0);

    const getPos = (e) => {
        const rect = paintCanvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const scaleX = paintCanvas.width / rect.width;
        const scaleY = paintCanvas.height / rect.height;
        return {
            // Rotate the coordinates 180 degrees to match the drawing context
            x: paintCanvas.width - ((clientX - rect.left) * scaleX),
            y: paintCanvas.height - ((clientY - rect.top) * scaleY)
        };
    };

    const paint = (e) => {
        if (!isPaintingOnTex) return;
        const pos = getPos(e);
        paintCtx.lineJoin = 'round';
        paintCtx.lineCap = 'round';
        paintCtx.strokeStyle = paintColorInput.value;
        paintCtx.lineWidth = parseInt(paintSizeInput.value) * (paintCanvas.width / 512); // proportional size
        paintCtx.lineTo(pos.x, pos.y);
        paintCtx.stroke();
    };

    const paintMoveHandler = (e) => paint(e);
    const paintUpHandler = () => { isPaintingOnTex = false; };

    window.addEventListener('pointermove', paintMoveHandler);
    window.addEventListener('pointerup', paintUpHandler);

    paintCanvas.onpointerdown = (e) => {
        isPaintingOnTex = true;
        const pos = getPos(e);
        paintCtx.beginPath();
        paintCtx.moveTo(pos.x, pos.y);
    };

    paintCanvas.ontouchstart = (e) => {
        e.preventDefault();
        isPaintingOnTex = true;
        const pos = getPos(e);
        paintCtx.beginPath();
        paintCtx.moveTo(pos.x, pos.y);
    };
    paintCanvas.ontouchmove = (e) => {
        e.preventDefault();
        paint(e);
    };
    paintCanvas.ontouchend = () => { isPaintingOnTex = false; };
}

paintSaveBtn.onclick = () => {
    if (!activeTexture) return;

    // We must rotate the canvas back before saving to the texture image
    // because Three.js expects the raw data in its original orientation
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = paintCanvas.width;
    tempCanvas.height = paintCanvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.translate(tempCanvas.width, tempCanvas.height);
    tempCtx.rotate(Math.PI);
    tempCtx.drawImage(paintCanvas, 0, 0);
    
    const newImg = new Image();
    newImg.onload = () => {
        activeTexture.image = newImg;
        activeTexture.needsUpdate = true;
        paintOverlay.style.display = 'none';
        textureModal.style.display = 'flex';
        openTextureEditor();
    };
    newImg.src = tempCanvas.toDataURL();
};

paintCancelBtn.onclick = () => {
    paintOverlay.style.display = 'none';
    textureModal.style.display = 'flex';
};

// --- Interaction Logic ---

function handleMouseDown(event) {
    // If multi-touch (e.g. pinch to zoom), allow OrbitControls to handle it and skip distortion
    if (event.touches && event.touches.length > 1) {
        isDragging = false;
        controls.enabled = true;
        return;
    }

    // Block world interaction if texture painting is active
    if (paintOverlay.style.display === 'flex') return;

    const touch = event.touches && event.touches.length > 0 ? event.touches[0] : null;
    const x = touch ? touch.clientX : event.clientX;
    const y = touch ? touch.clientY : event.clientY;
    
    mouse.x = (x / window.innerWidth) * 2 - 1;
    mouse.y = -(y / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(marioHead ? [marioHead] : [], true);
    
    if (intersects.length > 0) {
        const intersection = intersects[0];
        const mesh = intersection.object;

        if (currentTool === 'paint') {
            const picker = document.getElementById('color-picker');
            if (!picker) return;
            const colorVal = picker.value;
            const newColor = new THREE.Color(colorVal);
            
            // Check if mesh has multiple materials
            if (Array.isArray(mesh.material) && intersection.face) {
                const matIndex = intersection.face.materialIndex;
                mesh.material[matIndex].color.copy(newColor);
                mesh.material[matIndex].needsUpdate = true;
            } else if (mesh.material) {
                mesh.material.color.copy(newColor);
                mesh.material.needsUpdate = true;
            }
            playSound('stretch'); // reusing stretch sound for paint click feedback
            return; // Don't start dragging for paint tool
        }

        isDragging = true;
        controls.enabled = false;
        selectedMesh = mesh;
        initialLocalPoint = selectedMesh.worldToLocal(intersection.point.clone());
        initialMousePos.set(x, y);
        
        selectedMesh.userData.targetMaterialIndex = (intersection.face) ? intersection.face.materialIndex : undefined;
        selectedMesh.userData.dragStartObjectPos = selectedMesh.position.clone();
        dragStartPositions = selectedMesh.geometry.attributes.position.array.slice();
        
        playSound('stretch');
    }
}

function handleMouseMove(event) {
    if (!isDragging || !selectedMesh) return;
    if (!dragStartPositions) return;

    const touch = event.touches && event.touches.length > 0 ? event.touches[0] : null;
    const x = touch ? touch.clientX : event.clientX;
    const y = touch ? touch.clientY : event.clientY;

    const totalDeltaX = (x - initialMousePos.x) * 0.01;
    const totalDeltaY = -(y - initialMousePos.y) * 0.01;

    // Convert screen drag to 3D movement relative to camera
    const movement = new THREE.Vector3(totalDeltaX, totalDeltaY, 0);
    movement.applyQuaternion(camera.quaternion);

    if (currentTool === 'mesh-stretch') {
        let siblingMeshes = 0;
        if (marioHead) {
            marioHead.traverse(c => { if(c.isMesh) siblingMeshes++; });
        }

        const matIndex = selectedMesh.userData.targetMaterialIndex;
        const worldQuat = new THREE.Quaternion();
        const worldScale = new THREE.Vector3();

        if (siblingMeshes > 1) {
            selectedMesh.parent.getWorldQuaternion(worldQuat);
            const localMove = movement.clone().applyQuaternion(worldQuat.invert());
            selectedMesh.parent.getWorldScale(worldScale);
            localMove.divide(worldScale);

            const startPos = selectedMesh.userData.dragStartObjectPos || selectedMesh.userData.originalPosition;
            selectedMesh.position.copy(startPos.clone().add(localMove));
        } else {
            const posAttr = selectedMesh.geometry.attributes.position;
            const snapshot = dragStartPositions;
            
            selectedMesh.getWorldQuaternion(worldQuat);
            const localMove = movement.clone().applyQuaternion(worldQuat.invert());
            selectedMesh.getWorldScale(worldScale);
            localMove.divide(worldScale);

            const pullRadius = brushRadius * 2.5;

            const applyVertexMove = (i, factor = 1.0) => {
                const idx = selectedMesh.geometry.index ? selectedMesh.geometry.index.getX(i) : i;
                const vx = snapshot[idx * 3], vy = snapshot[idx * 3 + 1], vz = snapshot[idx * 3 + 2];
                const dist = Math.sqrt((vx - initialLocalPoint.x) ** 2 + (vy - initialLocalPoint.y) ** 2 + (vz - initialLocalPoint.z) ** 2);
                const influence = Math.max(0, 1 - (dist / pullRadius));
                const softInfluence = influence * influence * (3 - 2 * influence) * factor;

                posAttr.setXYZ(
                    idx,
                    vx + localMove.x * softInfluence,
                    vy + localMove.y * softInfluence,
                    vz + localMove.z * softInfluence
                );
            };

            if (matIndex !== undefined && Array.isArray(selectedMesh.material) && selectedMesh.geometry.groups.length > 0) {
                const groups = selectedMesh.geometry.groups;
                for (let g = 0; g < groups.length; g++) {
                    const group = groups[g];
                    if (group.materialIndex === matIndex) {
                        for (let i = group.start; i < group.start + group.count; i++) {
                            applyVertexMove(i, 1.0);
                        }
                    } else {
                        // Keep other material vertices at their snapshot position
                        for (let i = group.start; i < group.start + group.count; i++) {
                            const idx = selectedMesh.geometry.index ? selectedMesh.geometry.index.getX(i) : i;
                            posAttr.setXYZ(idx, snapshot[idx * 3], snapshot[idx * 3 + 1], snapshot[idx * 3 + 2]);
                        }
                    }
                }
            } else {
                for (let i = 0; i < posAttr.count; i++) applyVertexMove(i, 1.0);
            }
            posAttr.needsUpdate = true;
            selectedMesh.geometry.computeVertexNormals();
        }
    } else if (dragStartPositions) {
        distortMesh(selectedMesh, initialLocalPoint, movement, dragStartPositions);
    }
}

function handleMouseUp() {
    if (selectedMesh) delete selectedMesh.userData.dragStartObjectPos;
    if (isDragging && classicMode && selectedMesh) {
        snappingMeshes.add(selectedMesh);
        // Initialize velocities if not present
        if (!meshVelocities.has(selectedMesh.uuid)) {
            const count = selectedMesh.geometry.attributes.position.count * 3;
            meshVelocities.set(selectedMesh.uuid, new Float32Array(count));
        }
    }
    isDragging = false;
    controls.enabled = true;
    selectedMesh = null;
    dragStartPositions = null;
}

function distortMesh(mesh, localAnchor, worldMovement, snapshot) {
    if (!mesh || !mesh.geometry || !mesh.geometry.attributes || !mesh.geometry.attributes.position) return;

    const geometry = mesh.geometry;
    const positionAttr = geometry.attributes.position;

    // Ensure snapshot exists and is a plain array
    if (!snapshot || !(snapshot.length >= positionAttr.count * 3)) {
        // fallback to current positions
        snapshot = Array.from(positionAttr.array);
    }

    // Try to get stored original positions; fallback to snapshot if absent
    const originalPositions = originalVertices.get(mesh.uuid) || snapshot.slice();

    const worldQuat = new THREE.Quaternion();
    mesh.getWorldQuaternion(worldQuat);
    const localMovement = worldMovement.clone().applyQuaternion(worldQuat.invert());

    // Use length of drag for scale tools
    const dragMagnitude = worldMovement.length();
    const radius = brushRadius; 

    for (let i = 0; i < positionAttr.count; i++) {
        const sx = snapshot[i * 3];
        const sy = snapshot[i * 3 + 1];
        const sz = snapshot[i * 3 + 2];

        const distToAnchor = Math.sqrt(
            Math.pow(sx - localAnchor.x, 2) +
            Math.pow(sy - localAnchor.y, 2) +
            Math.pow(sz - localAnchor.z, 2)
        );

        if (distToAnchor < radius) {
            const influence = Math.pow(1 - distToAnchor / radius, 2);

            if (currentTool === 'stretch') {
                positionAttr.setXYZ(
                    i, 
                    sx + localMovement.x * influence,
                    sy + localMovement.y * influence,
                    sz + localMovement.z * influence
                );
            } else if (currentTool === 'enlarge' || currentTool === 'shrink') {
                const vx = sx - localAnchor.x;
                const vy = sy - localAnchor.y;
                const vz = sz - localAnchor.z;

                // Direction away from brush center
                const dir = new THREE.Vector3(vx, vy, vz).normalize();
                const strength = currentTool === 'enlarge' ? dragMagnitude : -dragMagnitude;

                positionAttr.setXYZ(
                    i,
                    sx + dir.x * influence * strength,
                    sy + dir.y * influence * strength,
                    sz + dir.z * influence * strength
                );
            } else if (currentTool === 'revert') {
                const ox = originalPositions[i * 3];
                const oy = originalPositions[i * 3 + 1];
                const oz = originalPositions[i * 3 + 2];

                // Revert towards original position based on drag movement "scrubbing"
                const revertStrength = Math.min(dragMagnitude * 2, 1);
                positionAttr.setXYZ(
                    i,
                    sx + (ox - sx) * influence * revertStrength,
                    sy + (oy - sy) * influence * revertStrength,
                    sz + (oz - sz) * influence * revertStrength
                );
            } else if (currentTool === 'twirl') {
                const vx = sx - localAnchor.x;
                const vy = sy - localAnchor.y;
                const vz = sz - localAnchor.z;

                // Get a rotation axis based on the camera view direction projected to local space
                const viewDir = new THREE.Vector3(0, 0, 1).applyQuaternion(camera.quaternion);
                const invWorldQuat = new THREE.Quaternion();
                mesh.getWorldQuaternion(invWorldQuat).invert();
                const localAxis = viewDir.applyQuaternion(invWorldQuat).normalize();

                // Rotation angle based on drag distance
                const angle = dragMagnitude * influence * 8; 

                const q = new THREE.Quaternion().setFromAxisAngle(localAxis, angle);
                const v = new THREE.Vector3(vx, vy, vz).applyQuaternion(q);

                positionAttr.setXYZ(
                    i,
                    localAnchor.x + v.x,
                    localAnchor.y + v.y,
                    localAnchor.z + v.z
                );
            }
        } else {
            // Keep at snapshot position if outside influence
            positionAttr.setXYZ(i, sx, sy, sz);
        }
    }

    positionAttr.needsUpdate = true;
    geometry.computeVertexNormals();
}

window.addEventListener('mousedown', handleMouseDown);
window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('mouseup', handleMouseUp);
window.addEventListener('touchstart', (e) => {
    // Block world interaction if texture painting is active
    if (paintOverlay.style.display === 'flex') return;

    // If pinch-zooming, don't trigger the brush/distorter
    if (e.touches.length > 1) {
        isDragging = false;
        controls.enabled = true;
    } else {
        handleMouseDown(e);
    }
}, { passive: false });

window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1) {
        // Continue allowing zoom/pinch
        isDragging = false;
    } else {
        handleMouseMove(e);
    }
}, { passive: false });

window.addEventListener('touchend', handleMouseUp);

// --- UI Actions ---

const homePopup = document.getElementById('home-popup');
const closePopupBtn = document.getElementById('close-popup-btn');

// Only attach the listener if the elements actually exist to avoid null errors
if (closePopupBtn) {
    closePopupBtn.addEventListener('click', () => {
        if (homePopup) homePopup.style.display = 'none';
        playSound('reset'); // Small audio feedback for closing
    });
}

const crazyPanel = document.getElementById('crazy-panel');
document.getElementById('crazy-toggle').addEventListener('click', (e) => {
    const isVisible = crazyPanel.style.display === 'flex';
    crazyPanel.style.display = isVisible ? 'none' : 'flex';
    e.target.classList.toggle('active', !isVisible);
});

document.getElementById('reset-shape-btn').addEventListener('click', () => {
    if (!marioHead) return;
    
    snappingMeshes.clear();
    meshVelocities.clear();

    safeTraverse(marioHead, (child) => {
        if (child.userData.isOutline && child.parent) {
            child.parent.remove(child);
            return;
        }
        if (child.isMesh) {
            // Prefer restoring the geometry stored directly on the mesh (userData) to avoid any mismatch by uuid.
            const savedGeom = child.userData && child.userData.originalGeometry ? child.userData.originalGeometry : (originalGeometries.has(child.uuid) ? originalGeometries.get(child.uuid) : null);
            if (savedGeom) {
                try {
                    if (child.geometry) child.geometry.dispose();
                } catch (e) {}
                // Deep-clone geometry and all BufferAttributes (including index) so the mesh gets unique buffers
                const newGeom = new THREE.BufferGeometry();
                // Clone attributes individually to avoid sharing underlying ArrayBuffers
                for (const name in savedGeom.attributes) {
                    const attr = savedGeom.attributes[name];
                    if (!attr) continue;
                    newGeom.setAttribute(name, attr.clone());
                }
                // Clone index if present
                if (savedGeom.index) {
                    newGeom.setIndex(savedGeom.index.clone());
                }
                // Preserve groups and bounding info
                if (savedGeom.groups) newGeom.groups = savedGeom.groups.map(g => ({ ...g }));
                if (savedGeom.boundingBox) newGeom.boundingBox = savedGeom.boundingBox.clone();
                if (savedGeom.boundingSphere) newGeom.boundingSphere = savedGeom.boundingSphere.clone();
                child.geometry = newGeom;
                if (child.geometry.attributes.position) child.geometry.attributes.position.needsUpdate = true;
                if (child.geometry.computeVertexNormals) child.geometry.computeVertexNormals();
            }
            if (child.userData.originalPosition) {
                child.position.copy(child.userData.originalPosition);
                if (child.userData.posVelocity) child.userData.posVelocity.set(0, 0, 0);
            }
        }
    });
    
    shatterActive = false;
    shatterVelocities.clear();
    twistAmount = 0;
    document.getElementById('twist-slider').value = 0;
    
    playSound('reset');
});

document.getElementById('reset-btn').addEventListener('click', () => {
    if (!marioHead) return;

    // If a built-in or remote model is selected, refetch it to ensure original separate meshes/geometries are restored.
    // This avoids issues where restoring cloned geometry from stored buffers can still leave meshes merged.
    try {
        const path = (modelSelect && modelSelect.value) ? modelSelect.value : null;
        if (path && path !== 'custom') {
            const ext = path.split('.').pop().toLowerCase();
            if (ext === 'obj') {
                objLoader.load(path, (obj) => {
                    processLoadedModel(obj, path.includes('mariohead'));
                    playSound('reset');
                }, undefined, (err) => {
                    console.warn('Reset: failed to reload OBJ, falling back to in-place reset', err);
                    // fallthrough to in-place reset below
                    performInPlaceReset();
                });
                return; // model reload will handle reset
            } else if (ext === 'gltf' || ext === 'glb') {
                gltfLoader.load(path, (gltf) => {
                    processLoadedModel(gltf.scene, false);
                    playSound('reset');
                }, undefined, (err) => {
                    console.warn('Reset: failed to reload GLTF, falling back to in-place reset', err);
                    performInPlaceReset();
                });
                return;
            }
        }
    } catch (e) {
        console.warn('Reset: reload attempt failed, continuing with in-place reset', e);
    }

    // Fallback in-place reset if reload not possible (custom models, errors, etc.)
    function performInPlaceReset() {
        // 1. Reset Root Transform
        if (marioHead.userData.initialPosition) marioHead.position.copy(marioHead.userData.initialPosition);
        if (marioHead.userData.initialRotation) marioHead.rotation.copy(marioHead.userData.initialRotation);
        if (marioHead.userData.initialScale) marioHead.scale.copy(marioHead.userData.initialScale);
        marioHead.visible = true;

        // 2. Clear Physics/Transient Collections
        snappingMeshes.clear();
        meshVelocities.clear();
        shatterVelocities.clear();

        // 3. Reset Children and Materials
        safeTraverse(marioHead, (child) => {
            if (child && child.isMesh) {
                // Clean up outlines and point clouds before geometry replacement
                if (child.userData.isOutline && child.parent) {
                    child.parent.remove(child);
                    return;
                }
                if (child.userData.pts && child.userData.pts.parent) {
                    child.userData.pts.parent.remove(child.userData.pts);
                    child.userData.pts = null;
                }

                // Restore Geometry (prefer per-mesh stored originalGeometry to avoid uuid/index mismatch issues)
                const savedGeom = child.userData && child.userData.originalGeometry ? child.userData.originalGeometry : (originalGeometries.has(child.uuid) ? originalGeometries.get(child.uuid) : null);
                if (savedGeom) {
                    try {
                        if (child.geometry) child.geometry.dispose();
                    } catch (e) {}

                    // Use geometry.clone() on the stored original geometry to ensure a proper deep copy
                    // (this avoids accidentally sharing underlying ArrayBuffers between meshes)
                    let clonedGeom = null;
                    if (child.userData && child.userData.originalGeometry) {
                        clonedGeom = child.userData.originalGeometry.clone();
                    } else if (originalGeometries.has(child.uuid)) {
                        clonedGeom = originalGeometries.get(child.uuid).clone();
                    }

                    if (clonedGeom) {
                        child.geometry = clonedGeom;
                        if (child.geometry.attributes.position) child.geometry.attributes.position.needsUpdate = true;
                        if (child.geometry.computeVertexNormals) child.geometry.computeVertexNormals();
                    }
                }

                // Restore Mesh Transforms
                if (child.userData.originalPosition) {
                    child.position.copy(child.userData.originalPosition);
                    child.scale.copy(child.userData.originalScale);
                    child.rotation.copy(child.userData.originalRotation);
                    if (child.userData.posVelocity) child.userData.posVelocity.set(0, 0, 0);
                }
                
                child.visible = true;
                child.userData.isSpinning = false;

                // Reset Materials
                if (child.material) {
                    const materials = Array.isArray(child.material) ? child.material : [child.material];
                    materials.forEach(m => {
                        if (m) {
                            if (m.userData.originalColor) m.color.copy(m.userData.originalColor);
                            if (m.metalness !== undefined) m.metalness = 0.1;
                            if (m.roughness !== undefined) m.roughness = 0.4;
                            m.wireframe = false;
                            m.flatShading = false;
                            m.opacity = 1;
                            m.transparent = false;
                            m.vertexColors = false;
                            m.needsUpdate = true;
                        }
                    });
                }
            }
        });

        // 4. Reset All Logic Flags
        shatterActive = false;
        toonMode = false;
        glitchMode = false;
        waveMode = false;
        ghostMode = false;
        xrayMode = false;
        jelloMode = false;
        pulseMode = false;
        discoMode = false;
        autoSpin = false;
        gravityMode = false;
        balloonMode = false;
        floatingMode = false;
        drunkenCam = false;
        strobeMode = false;
        vertexRainbow = false;
        lowPolyPulse = false;
        twistAmount = 0;
        classicMode = false;
        deathMode = false;
        if (deathSound) {
            deathSound.pause();
            deathSound.currentTime = 0;
        }

        // Reset All Secret Modes
        dizzyMode = false;
        melterMode = false;
        elasticMode = false;
        bouncerMode = false;
        atomicMode = false;
        feverDreamMode = false;
        hologramMode = false;
        zFightMode = false;
        spiralMode = false;
        magnetMode = false;
        zeroGMode = false;
        staticMode = false;
        tornadoMode = false;
        asciiMode = false;
        glitchVtxMode = false;
        swellMode = false;
        sunLordMode = false;
        vibratoMode = false;
        chaosMode = false;
        driftVel.set(0, 0, 0);

        // 5. Restore Scene Environment/Lights
        dirLight.intensity = 1.0;
        ambientLight.intensity = 0.5;
        ambientLight.color.setHex(0xffffff);

        // 6. Update UI Elements
        const toggles = [
            ['glitch-toggle', 'Glitch: OFF'],
            ['wave-toggle', 'Wave: OFF'],
            ['disco-toggle', 'Disco: OFF'],
            ['ghost-toggle', 'Ghost: OFF'],
            ['xray-toggle', 'X-Ray: OFF'],
            ['jello-toggle', 'Jello: OFF'],
            ['pulse-toggle', 'Pulse: OFF'],
            ['wireframe-toggle', 'Wireframe: OFF'],
            ['toon-toggle', 'Toon: OFF'],
            ['classic-toggle', 'Classic Mode: OFF']
        ];
        toggles.forEach(([id, text]) => {
            const el = document.getElementById(id);
            if (el) {
                el.innerText = text;
                el.classList.remove('active');
            }
        });

        // Handle Unlocked Secret Toggles - Reset their state but don't remove them
        document.querySelectorAll('#unlocked-row .unlocked-secret-btn').forEach(btn => {
            if (btn.userData && btn.userData.toggle) {
                btn.userData.toggle(false);
            }
        });

        const shadeBtn = document.getElementById('shading-toggle-btn');
        shadeBtn.innerText = "Shading: ON";
        shadeBtn.classList.add('active');
        shadingOn = true;
        document.getElementById('metal-slider').value = 0.1;
        document.getElementById('rough-slider').value = 0.4;
        document.getElementById('twist-slider').value = 0;

        playSound('reset');
    }

    performInPlaceReset();
});

document.getElementById('size-slider').addEventListener('input', (e) => {
    brushRadius = parseFloat(e.target.value);
});

// Custom Smooth Zoom Listeners
window.addEventListener('wheel', (e) => {
    // Check if we are hovering UI - if so, don't zoom
    if (e.target.closest('#ui')) return;
    
    const delta = e.deltaY * 0.005;
    // Keep it just above 0 to prevent camera inversion errors
    targetZoom = Math.max(0.01, targetZoom + delta);
}, { passive: true });

let initialPinchDist = 0;
window.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
        initialPinchDist = Math.hypot(
            e.touches[0].pageX - e.touches[1].pageX,
            e.touches[0].pageY - e.touches[1].pageY
        );
    }
}, { passive: true });

window.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
        const dist = Math.hypot(
            e.touches[0].pageX - e.touches[1].pageX,
            e.touches[0].pageY - e.touches[1].pageY
        );
        const delta = (initialPinchDist - dist) * 0.02;
        // Keep it just above 0 to prevent camera inversion errors
        targetZoom = Math.max(0.01, targetZoom + delta);
        initialPinchDist = dist;
    }
}, { passive: true });

// Tool Selection
document.getElementById('classic-toggle').addEventListener('click', (e) => {
    classicMode = !classicMode;
    e.target.innerText = `Classic Mode: ${classicMode ? 'ON' : 'OFF'}`;
    e.target.classList.toggle('active', classicMode);
});

document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentTool = e.target.dataset.tool;
        
        // Toggle color picker visibility
        const pickerContainer = document.getElementById('color-picker-container');
        if (currentTool === 'paint') {
            pickerContainer.style.display = 'flex';
        } else {
            pickerContainer.style.display = 'none';
        }
    });
});

document.getElementById('random-btn').addEventListener('click', () => {
    if (!marioHead) return;
    marioHead.traverse((child) => {
        if (child.isMesh) {
            const materials = Array.isArray(child.material) ? child.material : [child.material];
            materials.forEach(m => {
                m.color.setHex(Math.random() * 0xffffff);
                m.needsUpdate = true;
            });
        }
    });
});

document.getElementById('metal-slider').addEventListener('input', (e) => {
    if (!marioHead) return;
    const val = parseFloat(e.target.value);
    marioHead.traverse(c => {
        if (c.isMesh) {
            const mats = Array.isArray(c.material) ? c.material : [c.material];
            mats.forEach(m => { m.metalness = val; });
        }
    });
});

document.getElementById('rough-slider').addEventListener('input', (e) => {
    if (!marioHead) return;
    const val = parseFloat(e.target.value);
    marioHead.traverse(c => {
        if (c.isMesh) {
            const mats = Array.isArray(c.material) ? c.material : [c.material];
            mats.forEach(m => { m.roughness = val; });
        }
    });
});

let wireframeOn = false;
document.getElementById('wireframe-toggle').addEventListener('click', (e) => {
    if (!marioHead) return;
    wireframeOn = !wireframeOn;
    e.target.innerText = `Wireframe: ${wireframeOn ? 'ON' : 'OFF'}`;
    e.target.classList.toggle('active', wireframeOn);
    marioHead.traverse(c => {
        if (c.isMesh) {
            const mats = Array.isArray(c.material) ? c.material : [c.material];
            mats.forEach(m => { m.wireframe = wireframeOn; });
        }
    });
});

function safeTraverse(obj, callback) {
    if (!obj) return;
    callback(obj);
    if (obj.children && obj.children.length > 0) {
        // Clone children array to avoid issues if children are added/removed during traversal
        const children = [...obj.children];
        for (let i = 0; i < children.length; i++) {
            safeTraverse(children[i], callback);
        }
    }
}

function setupTool(id, action) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', () => {
        if (!marioHead) return;
        action();
        playSound('stretch');
    });
}

function setupToggle(id, variableSetter, labelPrefix) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', (e) => {
        if (!marioHead) return;
        const val = variableSetter();
        e.target.innerText = `${labelPrefix}: ${val ? 'ON' : 'OFF'}`;
        e.target.classList.toggle('active', val);
        playSound('stretch');
    });
}

let shadingOn = true;
setupToggle('shading-toggle-btn', () => {
    shadingOn = !shadingOn;
    safeTraverse(marioHead, c => {
        if (c && c.isMesh && c.material) {
            const mats = Array.isArray(c.material) ? c.material : [c.material];
            const newMats = mats.map(m => {
                if (!m) return m;
                const props = {
                    color: m.color.clone(),
                    map: m.map,
                    transparent: m.transparent,
                    opacity: m.opacity,
                    side: m.side,
                    vertexColors: m.vertexColors,
                    wireframe: m.wireframe,
                    alphaTest: m.alphaTest,
                };
                let newM;
                if (shadingOn) {
                    newM = new THREE.MeshStandardMaterial({
                        ...props,
                        roughness: m.roughness || 0.4,
                        metalness: m.metalness || 0.1,
                    });
                } else {
                    newM = new THREE.MeshBasicMaterial(props);
                }
                newM.userData.originalColor = m.userData.originalColor;
                return newM;
            });
            c.material = Array.isArray(c.material) ? newMats : newMats[0];
        }
    });
    return shadingOn;
}, 'Shading');

document.getElementById('jitter-btn').addEventListener('click', () => {
    if (!marioHead) return;
    safeTraverse(marioHead, child => {
        if (child.isMesh) {
            const pos = child.geometry.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                pos.setXYZ(
                    i,
                    pos.getX(i) + (Math.random() - 0.5) * 0.05,
                    pos.getY(i) + (Math.random() - 0.5) * 0.05,
                    pos.getZ(i) + (Math.random() - 0.5) * 0.05
                );
            }
            pos.needsUpdate = true;
            child.geometry.computeVertexNormals();
        }
    });
    playSound('stretch');
});

const envSelect = document.getElementById('env-select');
const envFileInput = document.getElementById('env-file-input');
const uploadEnvBtn = document.getElementById('upload-env-btn');
const customEnvOption = document.getElementById('custom-env-option');

envSelect.addEventListener('change', (e) => {
    if (e.target.value !== 'custom') {
        scene.environment = genEnvMap(e.target.value);
    }
});

uploadEnvBtn.addEventListener('click', () => {
    envFileInput.click();
});

envFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const loader = new THREE.TextureLoader();
        loader.load(event.target.result, (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            texture.colorSpace = THREE.SRGBColorSpace;
            scene.environment = texture;
            
            // UI Feedback
            customEnvOption.disabled = false;
            envSelect.value = 'custom';
        });
    };
    reader.readAsDataURL(file);
});

// --- Background Changer Logic ---
const bgSelect = document.getElementById('bg-select');
const bgFileInput = document.getElementById('bg-file-input');

const BG_ASSETS = {
    grid: './tumblr_mhrzd8BOJ51rrftcdo1_400.png',
    blue: './BLUE.png',
    red: './RED.png',
    skin: './SKIN.png',
    black: './BLACK.png',
    white: './WHITE.png'
};

function updateBackground(url, isCustom = false) {
    document.body.style.backgroundImage = `url('${url}')`;
    const tileSize = document.getElementById('bg-size-slider').value + 'px';
    
    if (isCustom) {
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
    } else if (url.includes('tumblr_mhrzd8BOJ51rrftcdo1_400.png')) {
        document.body.style.backgroundRepeat = 'repeat';
        document.body.style.backgroundSize = tileSize;
        document.body.style.backgroundPosition = '';
    } else {
        // Solid colors or others that can repeat
        document.body.style.backgroundRepeat = 'repeat';
        document.body.style.backgroundSize = tileSize;
        document.body.style.backgroundPosition = '';
    }
}

bgSelect.addEventListener('change', (e) => {
    const val = e.target.value;
    if (val !== 'custom' && BG_ASSETS[val]) {
        updateBackground(BG_ASSETS[val]);
    }
});

document.getElementById('bg-size-slider').addEventListener('input', (e) => {
    const size = e.target.value + 'px';
    // If not a custom non-repeating background, update the size live
    if (bgSelect.value !== 'custom') {
        document.body.style.backgroundSize = size;
    }
});

const musicSelect = document.getElementById('music-select');


// Populate shared lists from database and subscribe to updates
async function populateSharedLists() {
console.log(null);
}

function updateMusicOptions(list) {
    // keep built-ins and 'none' and then append shared
    const builtIns = [
        { src: '1-02 Title Theme.mp3', name: 'Title Theme' },
        { src: 'music_water.mp3', name: 'Water Theme' },
        { src: 'music_slider.mp3', name: 'Slider Theme' },
        { src: 'Weird Al Yankovic - Albuquerque_ THE MOVIE [JE37e1eK2mY].mp3', name: 'Weird Al — Albuquerque (Default)' }
    ];
    // clear current options
    musicSelect.innerHTML = '';
    builtIns.forEach(b => {
        const opt = document.createElement('option');
        opt.value = b.src;
        opt.innerText = b.name;
        musicSelect.appendChild(opt);
    });
    // add database entries
    list.slice().reverse().forEach(item => {
        if (!item || !item.src) return;
        const opt = document.createElement('option');
        opt.value = item.src;
        opt.innerText = `${item.name || item.src} — ${item.username || 'anon'}`;
        musicSelect.appendChild(opt);
    });
    const noneOpt = document.createElement('option');
    noneOpt.value = 'none';
    noneOpt.innerText = 'None';
    musicSelect.appendChild(noneOpt);
}

function updateModelOptions(list) {
    if (!modelSelect) return;
    // keep built-in options already present; append shared model entries (avoid duplicates)
    list.slice().reverse().forEach(item => {
        if (!item || !item.url) return;
        const exists = [...modelSelect.options].some(o => o.value === item.url);
        if (exists) return;
        const opt = document.createElement('option');
        opt.value = item.url;
        opt.innerText = `${item.name || item.url} — ${item.username || 'anon'}`;
        modelSelect.appendChild(opt);
    });
}

function updateBgOptions(list) {
    if (!bgSelect) return;
    list.slice().reverse().forEach(item => {
        if (!item || !item.url) return;
        const exists = [...bgSelect.options].some(o => o.value === item.url);
        if (exists) return;
        const opt = document.createElement('option');
        opt.value = item.url;
        opt.innerText = `${item.name || item.url} — ${item.username || 'anon'}`;
        bgSelect.appendChild(opt);
    });
}


// initialize subscriptions and populate options
populateSharedLists();

// existing change listener for local playback control
musicSelect.addEventListener('change', (e) => {
    const track = e.target.value;
    if (track === 'none') {
        bgMusic.pause();
    } else {
        const wasPaused = bgMusic.paused;
        bgMusic.src = track;
        bgMusic.load();
        if (!wasPaused || horrorModeActive === false) {
            bgMusic.play().catch(() => {});
        }
    }
});



bgFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const url = event.target.result;
        updateBackground(url, true);
        customBgOption.disabled = false;
        bgSelect.value = 'custom';
    };
    reader.readAsDataURL(file);
});

document.getElementById('disco-toggle').addEventListener('click', (e) => {
    discoMode = !discoMode;
    e.target.innerText = `Disco: ${discoMode ? 'ON' : 'OFF'}`;
    e.target.classList.toggle('active', discoMode);
});

document.getElementById('melt-btn').addEventListener('click', () => {
    if (!marioHead) return;
    safeTraverse(marioHead, child => {
        if (child.isMesh) {
            const pos = child.geometry.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                const y = pos.getY(i);
                // Lower vertices melt more
                const meltFactor = Math.random() * 0.1;
                pos.setY(i, y - meltFactor);
            }
            pos.needsUpdate = true;
            child.geometry.computeVertexNormals();
        }
    });
    playSound('stretch');
});

document.getElementById('voxel-btn').addEventListener('click', () => {
    if (!marioHead) return;
    const gridSize = 0.15;
    safeTraverse(marioHead, child => {
        if (child.isMesh) {
            const pos = child.geometry.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                pos.setXYZ(
                    i,
                    Math.round(pos.getX(i) / gridSize) * gridSize,
                    Math.round(pos.getY(i) / gridSize) * gridSize,
                    Math.round(pos.getZ(i) / gridSize) * gridSize
                );
            }
            pos.needsUpdate = true;
            child.geometry.computeVertexNormals();
        }
    });
    playSound('reset');
});

document.getElementById('squash-btn').addEventListener('click', () => {
    if (!marioHead) return;
    safeTraverse(marioHead, child => {
        if (child.isMesh) {
            const pos = child.geometry.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                pos.setZ(i, pos.getZ(i) * 0.5);
            }
            pos.needsUpdate = true;
            child.geometry.computeVertexNormals();
        }
    });
    playSound('stretch');
});

document.getElementById('twist-slider').addEventListener('input', (e) => {
    if (!marioHead) return;
    const newVal = parseFloat(e.target.value);
    const delta = newVal - twistAmount;
    twistAmount = newVal;

    safeTraverse(marioHead, child => {
        if (child.isMesh) {
            const pos = child.geometry.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                const x = pos.getX(i);
                const y = pos.getY(i);
                const z = pos.getZ(i);
                
                // Twist around Y based on Y height
                const angle = delta * y;
                const cos = Math.cos(angle);
                const sin = Math.sin(angle);
                
                const nx = x * cos - z * sin;
                const nz = x * sin + z * cos;
                
                pos.setXYZ(i, nx, y, nz);
            }
            pos.needsUpdate = true;
            child.geometry.computeVertexNormals();
        }
    });
});

document.getElementById('explode-btn').addEventListener('click', () => {
    if (!marioHead) return;
    safeTraverse(marioHead, child => {
        if (child.isMesh) {
            const pos = child.geometry.attributes.position;
            const center = new THREE.Vector3();
            child.geometry.computeBoundingBox();
            child.geometry.boundingBox.getCenter(center);
            
            for (let i = 0; i < pos.count; i++) {
                const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
                const dir = v.clone().sub(center).normalize();
                v.add(dir.multiplyScalar(0.2));
                pos.setXYZ(i, v.x, v.y, v.z);
            }
            pos.needsUpdate = true;
            child.geometry.computeVertexNormals();
        }
    });
    playSound('stretch');
});

document.getElementById('glitch-toggle').addEventListener('click', (e) => {
    glitchMode = !glitchMode;
    e.target.innerText = `Glitch: ${glitchMode ? 'ON' : 'OFF'}`;
    e.target.classList.toggle('active', glitchMode);
});

document.getElementById('wave-toggle').addEventListener('click', (e) => {
    waveMode = !waveMode;
    e.target.innerText = `Wave: ${waveMode ? 'ON' : 'OFF'}`;
    e.target.classList.toggle('active', waveMode);
});

document.getElementById('shatter-btn').addEventListener('click', () => {
    if (!marioHead) return;
    shatterActive = true;
    safeTraverse(marioHead, child => {
        if (child.isMesh) {
            // Convert to non-indexed to detach all faces
            if (child.geometry.index) {
                child.geometry = child.geometry.toNonIndexed();
            }
            const pos = child.geometry.attributes.position;
            const vels = new Float32Array(pos.count * 3);
            
            // Assign random velocity to each face (3 vertices share same velocity)
            for (let i = 0; i < pos.count; i += 3) {
                const vx = (Math.random() - 0.5) * 0.15;
                const vy = (Math.random() - 0.5) * 0.15;
                const vz = (Math.random() - 0.5) * 0.15;
                vels[i * 3] = vels[(i + 1) * 3] = vels[(i + 2) * 3] = vx;
                vels[i * 3 + 1] = vels[(i + 1) * 3 + 1] = vels[(i + 2) * 3 + 1] = vy;
                vels[i * 3 + 2] = vels[(i + 1) * 3 + 2] = vels[(i + 2) * 3 + 2] = vz;
            }
            shatterVelocities.set(child.uuid, vels);
        }
    });
    playSound('reset'); // Use pop sound for shattering
});

document.getElementById('inflate-btn').addEventListener('click', () => {
    if (!marioHead) return;
    safeTraverse(marioHead, child => {
        if (child.isMesh) {
            const pos = child.geometry.attributes.position;
            const norms = child.geometry.attributes.normal;
            for (let i = 0; i < pos.count; i++) {
                pos.setXYZ(
                    i,
                    pos.getX(i) + norms.getX(i) * 0.1,
                    pos.getY(i) + norms.getY(i) * 0.1,
                    pos.getZ(i) + norms.getZ(i) * 0.1
                );
            }
            pos.needsUpdate = true;
            child.geometry.computeVertexNormals();
        }
    });
    playSound('stretch');
});

document.getElementById('vortex-btn').addEventListener('click', () => {
    if (!marioHead) return;
    safeTraverse(marioHead, child => {
        if (child.isMesh) {
            const pos = child.geometry.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                const x = pos.getX(i);
                const y = pos.getY(i);
                const z = pos.getZ(i);
                const dist = Math.sqrt(x*x + z*z);
                const angle = 0.5 * (1.0 - Math.min(dist, 2) / 2);
                const cos = Math.cos(angle);
                const sin = Math.sin(angle);
                pos.setXYZ(i, x * cos - z * sin, y, x * sin + z * cos);
            }
            pos.needsUpdate = true;
            child.geometry.computeVertexNormals();
        }
    });
    playSound('stretch');
});

document.getElementById('flatten-btn').addEventListener('click', () => {
    if (!marioHead) return;
    safeTraverse(marioHead, child => {
        if (child.isMesh) {
            const pos = child.geometry.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                pos.setZ(i, pos.getZ(i) * Math.pow(0.5, 6));
            }
            pos.needsUpdate = true;
            child.geometry.computeVertexNormals();
        }
    });
    playSound('stretch');
});

 // New Tools Event Listeners

 // Mirror meshes across the X axis: flips vertex X coordinate and corrects triangle winding/normals
function mirrorMeshes() {
    if (!marioHead) return;
    safeTraverse(marioHead, child => {
        if (!child.isMesh || !child.geometry) return;

        const geom = child.geometry;

        // Flip X coordinate for each vertex (works for both indexed and non-indexed)
        if (geom.attributes.position) {
            const pos = geom.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                pos.setX(i, -pos.getX(i));
            }
            pos.needsUpdate = true;
        }

        // If normals exist, flip their X component; otherwise compute normals after transform
        if (geom.attributes.normal) {
            const n = geom.attributes.normal;
            for (let i = 0; i < n.count; i++) {
                n.setX(i, -n.getX(i));
            }
            n.needsUpdate = true;
        } else if (geom.computeVertexNormals) {
            geom.computeVertexNormals();
        }

        // Flip UVs horizontally so textures remain properly oriented
        if (geom.attributes.uv) {
            const uv = geom.attributes.uv;
            for (let i = 0; i < uv.count; i++) {
                uv.setX(i, 1 - uv.getX(i));
            }
            uv.needsUpdate = true;
        }

        // Reverse triangle winding WITHOUT converting to non-indexed geometry.
        // For indexed geometry, swap the first and third index of each triangle.
        if (geom.index) {
            const index = geom.index;
            for (let i = 0; i < index.count; i += 3) {
                const i0 = index.getX(i);
                const i1 = index.getX(i + 1);
                const i2 = index.getX(i + 2);
                // swap i0 <-> i2
                index.setX(i, i2);
                index.setX(i + 1, i1);
                index.setX(i + 2, i0);
            }
            index.needsUpdate = true;
        } else {
            // For non-indexed geometry, reverse winding by swapping vertex triples (0<->2) per triangle
            if (geom.attributes.position) {
                const pos = geom.attributes.position;
                const normal = geom.attributes.normal;
                const uv = geom.attributes.uv;
                for (let i = 0; i < pos.count; i += 3) {
                    // swap vertex 0 and 2
                    const i0x = pos.getX(i), i0y = pos.getY(i), i0z = pos.getZ(i);
                    const i2x = pos.getX(i + 2), i2y = pos.getY(i + 2), i2z = pos.getZ(i + 2);

                    pos.setXYZ(i, i2x, i2y, i2z);
                    pos.setXYZ(i + 2, i0x, i0y, i0z);

                    if (normal) {
                        const n0x = normal.getX(i), n0y = normal.getY(i), n0z = normal.getZ(i);
                        const n2x = normal.getX(i + 2), n2y = normal.getY(i + 2), n2z = normal.getZ(i + 2);
                        normal.setXYZ(i, n2x, n2y, n2z);
                        normal.setXYZ(i + 2, n0x, n0y, n0z);
                    }

                    if (uv) {
                        const u0x = uv.getX(i), u0y = uv.getY(i);
                        const u2x = uv.getX(i + 2), u2y = uv.getY(i + 2);
                        uv.setXY(i, u2x, u2y);
                        uv.setXY(i + 2, u0x, u0y);
                    }
                }
                if (normal) normal.needsUpdate = true;
                pos.needsUpdate = true;
            }
        }

        // Recompute normals if necessary
        if (!geom.attributes.normal && geom.computeVertexNormals) geom.computeVertexNormals();

        // Ensure double sided to avoid culling artifacts
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach(m => {
            if (m) {
                m.side = THREE.DoubleSide;
                m.needsUpdate = true;
            }
        });
    });
}

const mirrorBtn = document.getElementById('mirror-obj-btn');
if (mirrorBtn) {
    mirrorBtn.addEventListener('click', () => {
        if (!marioHead) return;
        // If a mesh is selected, mirror only that mesh; otherwise mirror the whole model
        if (selectedMesh) {
            // Mirror the selected mesh only
            const tempRoot = new THREE.Group();
            tempRoot.add(selectedMesh.clone());
            const original = selectedMesh;
            // operate on a temporary wrapper to reuse mirrorMeshes logic for a single mesh
            const prevHead = marioHead;
            marioHead = tempRoot;
            mirrorMeshes();
            // apply mirrored geometry back to the original mesh
            const mirrored = tempRoot.children[0];
            if (mirrored && mirrored.geometry) {
                if (original.geometry) original.geometry.dispose();
                original.geometry = mirrored.geometry.clone();
                original.geometry.attributes.position.needsUpdate = true;
                original.geometry.computeVertexNormals();
            }
            marioHead = prevHead;
        } else {
            // Mirror entire model
            mirrorMeshes();
        }
        playSound('reset');
    });
}


setupTool('thin-btn', () => { if(!marioHead) return; safeTraverse(marioHead, c => {
    if (c.isMesh) {
        const p = c.geometry.attributes.position, n = c.geometry.attributes.normal;
        for (let i = 0; i < p.count; i++) p.setXYZ(i, p.getX(i) - n.getX(i) * 0.15, p.getY(i) - n.getY(i) * 0.15, p.getZ(i) - n.getZ(i) * 0.15);
        p.needsUpdate = true;
    }
})});
setupTool('spiky-btn', () => { if(!marioHead) return; safeTraverse(marioHead, c => {
    if (c.isMesh) {
        const p = c.geometry.attributes.position, n = c.geometry.attributes.normal;
        for (let i = 0; i < p.count; i++) if (Math.random() > 0.8) {
            const s = Math.random() * 0.5;
            p.setXYZ(i, p.getX(i) + n.getX(i) * s, p.getY(i) + n.getY(i) * s, p.getZ(i) + n.getZ(i) * s);
        }
        p.needsUpdate = true;
    }
})});
setupTool('gold-btn', () => { if(!marioHead) return; safeTraverse(marioHead, c => {
    if (c.isMesh) {
        const mats = Array.isArray(c.material) ? c.material : [c.material];
        mats.forEach(m => { if(m) { m.color.setHex(0xffd700); m.metalness = 1.0; m.roughness = 0.2; } });
    }
})});
setupTool('silver-btn', () => { if(!marioHead) return; safeTraverse(marioHead, c => {
    if (c.isMesh) {
        const mats = Array.isArray(c.material) ? c.material : [c.material];
        mats.forEach(m => { if(m) { m.color.setHex(0xcccccc); m.metalness = 1.0; m.roughness = 0.1; } });
    }
})});
setupTool('statue-btn', () => { if(!marioHead) return; safeTraverse(marioHead, c => {
    if (c.isMesh) {
        const mats = Array.isArray(c.material) ? c.material : [c.material];
        mats.forEach(m => { if(m) { m.color.setHex(0x888888); m.metalness = 0.0; m.roughness = 1.0; } });
    }
})});
setupTool('slime-btn', () => { if(!marioHead) return; safeTraverse(marioHead, c => {
    if (c.isMesh) {
        const mats = Array.isArray(c.material) ? c.material : [c.material];
        mats.forEach(m => { if(m) { m.color.setHex(0x32cd32); m.metalness = 0.5; m.roughness = 0.0; } });
    }
})});
setupToggle('ghost-toggle', () => {
    ghostMode = !ghostMode;
    safeTraverse(marioHead, c => { if (c && c.isMesh && c.material) {
        const mats = Array.isArray(c.material) ? c.material : [c.material];
        mats.forEach(m => { if(m) { m.transparent = true; m.opacity = ghostMode ? 0.3 : 1.0; } });
    }});
    return ghostMode;
}, 'Ghost');

function updateToonOutlines() {
    if (!marioHead) return;
    safeTraverse(marioHead, node => {
        if (node.isMesh && !node.userData.isOutline) {
            // Remove any existing outline first using a safe method
            const toRemove = node.children.filter(c => c.userData.isOutline);
            toRemove.forEach(c => node.remove(c));

            if (toonMode) {
                const outlineMat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
                outlineMat.onBeforeCompile = (shader) => {
                    shader.vertexShader = shader.vertexShader.replace(
                        '#include <begin_vertex>',
                        `
                        vec3 transformed = vec3( position );
                        transformed += normal * 0.04;
                        `
                    );
                };
                const outlineMesh = new THREE.Mesh(node.geometry, outlineMat);
                outlineMesh.userData.isOutline = true;
                // Use the same frustum culling and matrix auto update as parent
                outlineMesh.frustumCulled = node.frustumCulled;
                node.add(outlineMesh);
            }
        }
    });
}

setupToggle('toon-toggle', () => {
    toonMode = !toonMode;
    updateToonOutlines();
    return toonMode;
}, 'Toon');
setupToggle('xray-toggle', () => {
    xrayMode = !xrayMode;
    safeTraverse(marioHead, c => { if (c && c.isMesh && c.material) {
        const mats = Array.isArray(c.material) ? c.material : [c.material];
        mats.forEach(m => { if(m) { m.wireframe = xrayMode; m.transparent = xrayMode; m.opacity = xrayMode ? 0.5 : 1.0; } });
    }});
    return xrayMode;
}, 'X-Ray');
setupTool('rainbow-btn', () => { if(!marioHead) return; safeTraverse(marioHead, c => {
    if (c.isMesh) {
        const p = c.geometry.attributes.position;
        const colors = new Float32Array(p.count * 3);
        for (let i = 0; i < p.count; i++) {
            const col = new THREE.Color().setHSL(Math.random(), 0.8, 0.5);
            colors[i * 3] = col.r; colors[i * 3 + 1] = col.g; colors[i * 3 + 2] = col.b;
        }
        c.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        const mats = Array.isArray(c.material) ? c.material : [c.material];
        mats.forEach(m => { m.vertexColors = true; m.needsUpdate = true; });
    }
})});
setupToggle('jello-toggle', () => { jelloMode = !jelloMode; return jelloMode; }, 'Jello');
setupToggle('pulse-toggle', () => { pulseMode = !pulseMode; return pulseMode; }, 'Pulse');
setupTool('blackhole-btn', () => { if(!marioHead) return; safeTraverse(marioHead, c => {
    if (c.isMesh) {
        const p = c.geometry.attributes.position;
        for (let i = 0; i < p.count; i++) {
            p.setXYZ(i, p.getX(i) * 0.7, p.getY(i) * 0.7, p.getZ(i) * 0.7);
        }
        p.needsUpdate = true;
    }
})});
setupTool('supernova-btn', () => { if(!marioHead) return; safeTraverse(marioHead, c => {
    if (c.isMesh) {
        const p = c.geometry.attributes.position;
        for (let i = 0; i < p.count; i++) {
            const v = new THREE.Vector3(p.getX(i), p.getY(i), p.getZ(i)).normalize().multiplyScalar(1.5);
            p.setXYZ(i, p.getX(i) + v.x, p.getY(i) + v.y, p.getZ(i) + v.z);
        }
        p.needsUpdate = true;
    }
})});
setupTool('taper-btn', () => { if(!marioHead) return; safeTraverse(marioHead, c => {
    if (c.isMesh) {
        const p = c.geometry.attributes.position;
        for (let i = 0; i < p.count; i++) {
            const factor = (p.getY(i) + 2) * 0.5;
            p.setXYZ(i, p.getX(i) * factor, p.getY(i), p.getZ(i) * factor);
        }
        p.needsUpdate = true;
    }
})});
setupTool('shear-btn', () => { if(!marioHead) return; safeTraverse(marioHead, c => {
    if (c.isMesh) {
        const p = c.geometry.attributes.position;
        for (let i = 0; i < p.count; i++) p.setX(i, p.getX(i) + p.getY(i) * 0.5);
        p.needsUpdate = true;
    }
})});
setupTool('helix-btn', () => { if(!marioHead) return; safeTraverse(marioHead, c => {
    if (c.isMesh) {
        const p = c.geometry.attributes.position;
        for (let i = 0; i < p.count; i++) {
            const a = p.getY(i) * 3, cos = Math.cos(a), sin = Math.sin(a);
            const x = p.getX(i), z = p.getZ(i);
            p.setXYZ(i, x * cos - z * sin, p.getY(i), x * sin + z * cos);
        }
        p.needsUpdate = true;
    }
})});
setupTool('bend-btn', () => { if(!marioHead) return; safeTraverse(marioHead, c => {
    if (c.isMesh) {
        const p = c.geometry.attributes.position;
        for (let i = 0; i < p.count; i++) {
            const bend = p.getY(i) * p.getY(i) * 0.2;
            p.setX(i, p.getX(i) + bend);
        }
        p.needsUpdate = true;
    }
})});
setupTool('squiggles-btn', () => { if(!marioHead) return; safeTraverse(marioHead, c => {
    if (c.isMesh) {
        const p = c.geometry.attributes.position;
        for (let i = 0; i < p.count; i++) {
            p.setXYZ(i, p.getX(i) + Math.sin(p.getY(i) * 10) * 0.05, p.getY(i), p.getZ(i) + Math.cos(p.getX(i) * 10) * 0.05);
        }
        p.needsUpdate = true;
    }
})});

// Squish tools: compress vertices along a single axis toward the model origin (factor 0.5 => half)
setupTool('squishx-btn', () => { if(!marioHead) return; safeTraverse(marioHead, c => {
    if (c.isMesh) {
        const p = c.geometry.attributes.position;
        const factor = 2.0; // opposite of 0.5 (expand by 2x)
        for (let i = 0; i < p.count; i++) {
            p.setX(i, p.getX(i) * factor);
        }
        p.needsUpdate = true;
        c.geometry.computeVertexNormals();
    }
})});
setupTool('squishy-btn', () => { if(!marioHead) return; safeTraverse(marioHead, c => {
    if (c.isMesh) {
        const p = c.geometry.attributes.position;
        const factor = 2.0; // opposite of 0.5 (expand by 2x)
        for (let i = 0; i < p.count; i++) {
            p.setY(i, p.getY(i) * factor);
        }
        p.needsUpdate = true;
        c.geometry.computeVertexNormals();
    }
})});
setupTool('squishz-btn', () => { if(!marioHead) return; safeTraverse(marioHead, c => {
    if (c.isMesh) {
        const p = c.geometry.attributes.position;
        const factor = 2.0; // opposite of 0.5 (expand by 2x)
        for (let i = 0; i < p.count; i++) {
            p.setZ(i, p.getZ(i) * factor);
        }
        p.needsUpdate = true;
        c.geometry.computeVertexNormals();
    }
})});

// Stretch tools: expand vertices along a single axis away from the model origin (factor >1 stretches)
setupTool('stretchx-btn', () => { if(!marioHead) return; safeTraverse(marioHead, c => {
    if (c.isMesh) {
        const p = c.geometry.attributes.position;
        const factor = 0.5; // stretch set to 0.5
        for (let i = 0; i < p.count; i++) {
            p.setX(i, p.getX(i) * factor);
        }
        p.needsUpdate = true;
        c.geometry.computeVertexNormals();
    }
})});
setupTool('stretchy-btn', () => { if(!marioHead) return; safeTraverse(marioHead, c => {
    if (c.isMesh) {
        const p = c.geometry.attributes.position;
        const factor = 0.5; // stretch set to 0.5
        for (let i = 0; i < p.count; i++) {
            p.setY(i, p.getY(i) * factor);
        }
        p.needsUpdate = true;
        c.geometry.computeVertexNormals();
    }
})});
setupTool('stretchz-btn', () => { if(!marioHead) return; safeTraverse(marioHead, c => {
    if (c.isMesh) {
        const p = c.geometry.attributes.position;
        const factor = 0.5; // stretch set to 0.5
        for (let i = 0; i < p.count; i++) {
            p.setZ(i, p.getZ(i) * factor);
        }
        p.needsUpdate = true;
        c.geometry.computeVertexNormals();
    }
})});

setupTool('snow-btn', () => { if(!marioHead) return; safeTraverse(marioHead, c => {
    if (c.isMesh) {
        const mats = Array.isArray(c.material) ? c.material : [c.material];
        mats.forEach(m => { m.color.setHex(0xffffff); m.roughness = 1; });
    }
})});

const HORROR_COLORS = [0x111111, 0x111111, 0x111111, 0x000000, 0x000000, 0x000000, 0x000000, 0x111111, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x4b2b10, 0x949494, 0x000000];
const HORROR_CHARS = ['𰻞', '', '⛤'];

const STORAGE_KEY = 'mario_distorter_unlocked_secrets';

function getUnlockedSecrets() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
}

function saveUnlockedSecret(name) {
    const unlocked = getUnlockedSecrets();
    if (!unlocked.includes(name)) {
        unlocked.push(name);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocked));
    }
}

let deathMode = false;
let deathSound = null;
let autoSpin = false;
let gravityMode = false;
let balloonMode = false;
let floatingMode = false;
let drunkenCam = false;
let strobeMode = false;
let vertexRainbow = false;
let lowPolyPulse = false;
let lastSecretIndex = -1;

// New Secret State Variables
let dizzyMode = false;
let melterMode = false;
let elasticMode = false;
let bouncerMode = false;
let atomicMode = false;
let feverDreamMode = false;
let hologramMode = false;
let zFightMode = false;
let spiralMode = false;
let magnetMode = false;
let zeroGMode = false;
let staticMode = false;
let tornadoMode = false;
let asciiMode = false;
let glitchVtxMode = false;
let swellMode = false;
let sunLordMode = false;
let vibratoMode = false;
let chaosMode = false;
let driftVel = new THREE.Vector3();

function addUnlockedButton(id, label, type, callback, autoActivate = false) {
    if (document.getElementById(id)) {
        return;
    }
    
    document.getElementById('unlocked-title').style.display = 'block';
    const container = document.getElementById('unlocked-row');
    const btn = document.createElement('button');
    btn.id = id;
    btn.className = 'crazy-toggle-btn unlocked-secret-btn';
    btn.style.borderColor = '#ff00ff';
    
    if (type === 'toggle') {
        let active = false;
        btn.innerText = `${label}: OFF`;
        
        const toggleFunc = (forceVal) => {
            active = forceVal !== undefined ? forceVal : !active;
            btn.innerText = `${label}: ${active ? 'ON' : 'OFF'}`;
            btn.classList.toggle('active', active);
            callback(active);
        };
        
        btn.onclick = () => toggleFunc();
        btn.userData = { toggle: toggleFunc };
        
        if (autoActivate) toggleFunc(true);
    } else {
        btn.innerText = label;
        btn.onclick = () => {
            callback();
            btn.style.transform = 'scale(0.9)';
            setTimeout(() => btn.style.transform = 'scale(1)', 100);
        };
        if (autoActivate) callback();
    }
    
    container.appendChild(btn);
    btn.style.transform = 'scale(1.5)';
    btn.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    setTimeout(() => btn.style.transform = 'scale(1)', 500);
}

async function triggerHorrorMode() {
    if (horrorModeActive) return;
    horrorModeActive = true;
    
    // UI Scrambling Setup
    const textNodes = [];
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while(node = walk.nextNode()) {
        const parent = node.parentElement;
        if (parent && parent.tagName !== 'SCRIPT' && parent.tagName !== 'STYLE' && node.textContent.trim().length > 0) {
            textNodes.push({ node, original: node.textContent });
        }
    }

    const scrambleInterval = setInterval(() => {
        textNodes.forEach(item => {
            let scrambled = "";
            for (let i = 0; i < item.original.length; i++) {
                const char = item.original[i];
                if (/\s/.test(char)) {
                    scrambled += char;
                } else {
                    scrambled += HORROR_CHARS[Math.floor(Math.random() * HORROR_CHARS.length)];
                }
            }
            item.node.textContent = scrambled;
        });
    }, 50);

    // 1. Stuttering music
    const originalVolume = bgMusic.volume;
    const stutterInterval = setInterval(() => {
        bgMusic.volume = Math.random() > 0.5 ? originalVolume : 0;
        bgMusic.playbackRate = 0.5 + Math.random();
    }, 100);

    await new Promise(r => setTimeout(r, 2000));
    clearInterval(stutterInterval);
    bgMusic.pause();
    bgMusic.playbackRate = 1.0;
    bgMusic.volume = originalVolume;

    // 2. Cut to black
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:black; z-index:99999; pointer-events:none;';
    document.body.appendChild(overlay);

    await new Promise(r => setTimeout(r, 1500));

    // 3. Background missing
    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundColor = 'black';
    
    // 4. Mario changes and reappear
    if (marioHead) {
        marioHead.visible = false;
        safeTraverse(marioHead, child => {
            if (child.isMesh) {
                const mats = Array.isArray(child.material) ? child.material : [child.material];
                mats.forEach((m, i) => {
                    if (m) {
                        const colorVal = HORROR_COLORS[i] !== undefined ? HORROR_COLORS[i] : 0x000000;
                        m.color.setHex(colorVal);
                        m.roughness = 1.0;
                        m.metalness = 0.0;
                        m.needsUpdate = true;
                    }
                });
            }
        });
    }

    overlay.style.opacity = '0';
    await new Promise(r => setTimeout(r, 1000));
    if (marioHead) {
        marioHead.visible = true;
    }
    overlay.remove();

    // 5. Sound and screen shake
    const horrorSound = new Audio('/the sound of YOU lowkenuinely dying.wav');
    horrorSound.play();
    horrorStartTime = Date.now();
    horrorShakeIntensity = 0.1;

    // Monitor for 15 second mark
    const checkInterval = setInterval(() => {
        const elapsed = (Date.now() - horrorStartTime) / 1000;
        horrorShakeIntensity = 0.1 + (elapsed * 0.2); // Intensify shake
        
        if (elapsed >= 15) {
            clearInterval(checkInterval);
            horrorSound.pause();
            
            // 6. Cut to black again
            const finalOverlay = document.createElement('div');
            finalOverlay.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:black; z-index:99999; pointer-events:none;';
            document.body.appendChild(finalOverlay);
            
            setTimeout(() => {
                // 7. Reset to normal
                horrorModeActive = false;
                horrorShakeIntensity = 0;
                document.body.style.backgroundImage = "url('tumblr_mhrzd8BOJ51rrftcdo1_400.png')";
                document.body.style.backgroundColor = "";
                
                // Restore Text
                clearInterval(scrambleInterval);
                textNodes.forEach(item => {
                    item.node.textContent = item.original;
                });

                // Reset Camera
                targetZoom = 5.0;
                currentZoom = 5.0;
                controls.target.set(0, 0, 0);
                camera.position.set(0, 0, 5);
                controls.update();

                document.getElementById('reset-btn').click();
                bgMusic.play();
                finalOverlay.remove();
            }, 2000);
        }
    }, 100);
}

const SECRET_ACTIONS = [
    { name: 'Horror', type: 'trigger', action: triggerHorrorMode },
    { name: 'Auto Spin', type: 'toggle', action: (v) => autoSpin = v },
    { name: 'Gravity', type: 'toggle', action: (v) => gravityMode = v },
    { name: 'Balloon', type: 'toggle', action: (v) => balloonMode = v },
    { name: 'Floating', type: 'toggle', action: (v) => floatingMode = v },
    { name: 'Drunken Cam', type: 'toggle', action: (v) => drunkenCam = v },
    { name: 'Strobe', type: 'toggle', action: (v) => strobeMode = v },
    { name: 'Rainbow Vtx', type: 'toggle', action: (v) => vertexRainbow = v },
    { name: 'LP Pulse', type: 'toggle', action: (v) => lowPolyPulse = v },
    { name: 'Negative', type: 'trigger', action: () => { if(!marioHead) return; safeTraverse(marioHead, c => { if(c && c.isMesh && c.material) { const mats = Array.isArray(c.material) ? c.material : [c.material]; mats.forEach(m => { if(m) m.color.setRGB(1-m.color.r, 1-m.color.g, 1-m.color.b); }); } }); } },
    { name: 'Point Cloud', type: 'toggle', action: (v) => { if(!marioHead) return; safeTraverse(marioHead, c => { if(c && c.isMesh) { if(!c.userData.pts) { c.userData.pts = new THREE.Points(c.geometry, new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 })); if (c.parent) { c.parent.add(c.userData.pts); } else { scene.add(c.userData.pts); } } if(c.userData.pts) c.userData.pts.visible = v; c.visible = !v; } }); } },
    { name: 'Mirror', type: 'trigger', action: () => { if(!marioHead) return; marioHead.scale.x *= -1; } },
    { name: 'Flatten X', type: 'trigger', action: () => { if(!marioHead) return; safeTraverse(marioHead, c => { if(c.isMesh) { const p = c.geometry.attributes.position; for(let i=0; i<p.count; i++) p.setX(i, p.getX(i)*0.1); p.needsUpdate = true; } }); } },
    { name: 'Long Neck', type: 'trigger', action: () => { if(!marioHead) return; safeTraverse(marioHead, c => { if(c.isMesh) { const p = c.geometry.attributes.position; for(let i=0; i<p.count; i++) if(p.getY(i) > 0) p.setY(i, p.getY(i)*2); p.needsUpdate = true; } }); } },
    { name: 'Mesh Spin', type: 'toggle', action: (v) => { if(!marioHead) return; safeTraverse(marioHead, c => { if(c.isMesh) { c.userData.isSpinning = v; } }); } },
    { name: 'Wire All', type: 'toggle', action: (v) => { if (!marioHead) return; safeTraverse(marioHead, c => { if (c && c.isMesh && c.material) { const mats = Array.isArray(c.material) ? c.material : [c.material]; mats.forEach(m => { if (m) m.wireframe = v; }); } }); } },
    { name: 'Metalize', type: 'trigger', action: () => { if(!marioHead) return; safeTraverse(marioHead, c => { if(c && c.isMesh && c.material) { const mats = Array.isArray(c.material) ? c.material : [c.material]; mats.forEach(m => { if(m) { m.metalness = 1; m.roughness = 0; } }); } }); } },
    { name: 'Small Head', type: 'trigger', action: () => { if(!marioHead) return; marioHead.scale.set(0.2, 0.2, 0.2); } },
    { name: 'Giant', type: 'trigger', action: () => { if(!marioHead) return; marioHead.scale.set(10, 10, 10); } },
    { name: 'Darkness', type: 'toggle', action: (v) => { dirLight.intensity = v ? 0 : 1; ambientLight.intensity = v ? 0 : 0.5; } },
    { name: 'Night Vision', type: 'toggle', action: (v) => { ambientLight.color.setHex(v ? 0x00ff00 : 0xffffff); ambientLight.intensity = v ? 2 : 0.5; } },
    { name: 'Ghostify', type: 'trigger', action: () => { if(!marioHead) return; safeTraverse(marioHead, c => { if(c.isMesh) { const mats = Array.isArray(c.material) ? c.material : [c.material]; mats.forEach(m => { if(m) { m.transparent = true; m.opacity = 0.2; } }); } }); } },
    { name: 'X-Ray All', type: 'toggle', action: (v) => { if(!marioHead) return; safeTraverse(marioHead, c => { if(c && c.isMesh && c.material) { const mats = Array.isArray(c.material) ? c.material : [c.material]; mats.forEach(m => { if(m) { m.wireframe = v; m.transparent = v; m.opacity = v ? 0.4 : 1.0; } }); } }); } },
    { name: 'Glass Mode', type: 'trigger', action: () => { if(!marioHead) return; safeTraverse(marioHead, c => { if(c && c.isMesh && c.material) { const mats = Array.isArray(c.material) ? c.material : [c.material]; mats.forEach(m => { if(m) { m.transparent = true; m.opacity = 0.5; m.roughness = 0; m.metalness = 1; } }); } }); } },
    { name: 'Tiny Faces', type: 'trigger', action: () => { if(!marioHead) return; safeTraverse(marioHead, c => { if(c.isMesh) { if(c.geometry.index) c.geometry = c.geometry.toNonIndexed(); const p = c.geometry.attributes.position; for(let i=0; i<p.count; i+=3) { const center = new THREE.Vector3( (p.getX(i)+p.getX(i+1)+p.getX(i+2))/3, (p.getY(i)+p.getY(i+1)+p.getY(i+2))/3, (p.getZ(i)+p.getZ(i+1)+p.getZ(i+2))/3 ); for(let j=0; j<3; j++) { p.setXYZ(i+j, center.x + (p.getX(i+j)-center.x)*0.2, center.y + (p.getY(i+j)-center.y)*0.2, center.z + (p.getZ(i+j)-center.z)*0.2); } } p.needsUpdate = true; } }); } },
    { name: 'Lego Snap', type: 'trigger', action: () => { if(!marioHead) return; safeTraverse(marioHead, c => { if(c.isMesh) { const p = c.geometry.attributes.position; for(let i=0; i<p.count; i++) { p.setXYZ(i, Math.round(p.getX(i)*4)/4, Math.round(p.getY(i)*4)/4, Math.round(p.getZ(i)*4)/4); } p.needsUpdate = true; } }); } },
    { name: 'Texture Noise', type: 'trigger', action: () => { 
        if(!marioHead) return; 
        const canvas = document.createElement('canvas'); 
        canvas.width = 64; canvas.height = 64; 
        const ctx = canvas.getContext('2d'); 
        for(let i=0; i<500; i++) { 
            ctx.fillStyle = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`; 
            ctx.fillRect(Math.random()*64, Math.random()*64, 1, 1); 
        } 
        const tex = new THREE.CanvasTexture(canvas); 
        tex.repeat.set(5, 5); 
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping; 
        safeTraverse(marioHead, c => { 
            if(c.isMesh) { 
                const mats = Array.isArray(c.material) ? c.material : [c.material]; 
                mats.forEach(m => { 
                    if(m) { 
                        if (m.map && m.map.dispose && m.map !== tex) m.map.dispose();
                        m.map = tex; 
                        m.needsUpdate = true; 
                    } 
                }); 
            } 
        }); 
    } },
    { name: 'Center Pop', type: 'trigger', action: () => { if(!marioHead) return; safeTraverse(marioHead, c => { if(c.isMesh) { c.position.add(c.position.clone().normalize().multiplyScalar(2)); } }); } },
    { name: 'Death', type: 'toggle', action: (v) => { 
        deathMode = v; 
        if (v) {
            autoSpin = true;
            const autoSpinBtn = document.getElementById('unlocked-auto-spin');
            if (autoSpinBtn && autoSpinBtn.userData && autoSpinBtn.userData.toggle) autoSpinBtn.userData.toggle(true);
            if (!deathSound) { deathSound = new Audio('derangedwomanscream.wav'); deathSound.loop = true; }
            deathSound.play().catch(() => {});
        } else {
            autoSpin = false;
            const autoSpinBtn = document.getElementById('unlocked-auto-spin');
            if (autoSpinBtn && autoSpinBtn.userData && autoSpinBtn.userData.toggle) autoSpinBtn.userData.toggle(false);
            if (deathSound) { deathSound.pause(); deathSound.currentTime = 0; }
        }
    } },
    // 29 NEW SECRETS
    { name: 'Dizzy', type: 'toggle', action: (v) => dizzyMode = v },
    { name: 'Melter', type: 'toggle', action: (v) => melterMode = v },
    { name: 'Elastic', type: 'toggle', action: (v) => elasticMode = v },
    { name: 'Bouncer', type: 'toggle', action: (v) => bouncerMode = v },
    { name: 'Atomic', type: 'toggle', action: (v) => atomicMode = v },
    { name: 'Fever Dream', type: 'toggle', action: (v) => feverDreamMode = v },
    { name: 'Chrome', type: 'trigger', action: () => { if(!marioHead) return; safeTraverse(marioHead, c => { if(c.isMesh) { const mats = Array.isArray(c.material) ? c.material : [c.material]; mats.forEach(m => { if(m) { m.metalness = 1.0; m.roughness = 0.05; m.color.setHex(0xffffff); } }); } }); } },
    { name: 'Hologram', type: 'toggle', action: (v) => { hologramMode = v; if(!marioHead) return; safeTraverse(marioHead, c => { if(c.isMesh) { const mats = Array.isArray(c.material) ? c.material : [c.material]; mats.forEach(m => { if(m) { m.transparent = v; m.opacity = v ? 0.6 : 1.0; if(v) m.color.setHex(0x00ffff); } }); } }); } },
    { name: 'Blueprint', type: 'trigger', action: () => { if(!marioHead) return; safeTraverse(marioHead, c => { if(c.isMesh) { const mats = Array.isArray(c.material) ? c.material : [c.material]; mats.forEach(m => { if(m) { m.color.setHex(0x0000ff); m.wireframe = true; } }); } }); } },
    { name: 'Z-Fight', type: 'toggle', action: (v) => zFightMode = v },
    { name: 'Ant-Man', type: 'trigger', action: () => { if(marioHead) marioHead.scale.set(0.01, 0.01, 0.01); } },
    { name: 'God Mode', type: 'toggle', action: (v) => { sunLordMode = v; if(!marioHead) return; safeTraverse(marioHead, c => { if(c.isMesh) { const mats = Array.isArray(c.material) ? c.material : [c.material]; mats.forEach(m => { if(m) { if(v) m.color.setHex(0xffcc00); m.emissive = v ? new THREE.Color(0xffaa00) : new THREE.Color(0x000000); m.emissiveIntensity = v ? 2 : 0; } }); } }); } },
    { name: 'Spiral', type: 'toggle', action: (v) => spiralMode = v },
    { name: 'Magnet', type: 'toggle', action: (v) => magnetMode = v },
    { name: 'Paper Mode', type: 'trigger', action: () => { if(marioHead) marioHead.scale.z = 0.01; } },
    { name: 'Deep Fry', type: 'trigger', action: () => { if(!marioHead) return; safeTraverse(marioHead, c => { if(c.isMesh) { const mats = Array.isArray(c.material) ? c.material : [c.material]; mats.forEach(m => { if(m) { m.color.multiplyScalar(5); m.roughness = 1; } }); } }); } },
    { name: 'Zero-G', type: 'toggle', action: (v) => { zeroGMode = v; driftVel.set((Math.random()-0.5)*0.05, (Math.random()-0.5)*0.05, (Math.random()-0.5)*0.05); } },
    { name: 'Static', type: 'toggle', action: (v) => staticMode = v },
    { name: 'Big Nose', type: 'trigger', action: () => { if(!marioHead) return; safeTraverse(marioHead, c => { if(c.isMesh) { const p = c.geometry.attributes.position; for(let i=0; i<p.count; i++) { if(p.getZ(i) > 0.5 && Math.abs(p.getX(i)) < 0.5) p.setZ(i, p.getZ(i)*3); } p.needsUpdate = true; } }); } },
    { name: 'Tornado', type: 'toggle', action: (v) => tornadoMode = v },
    { name: 'ASCII', type: 'toggle', action: (v) => { asciiMode = v; if(!marioHead) return; safeTraverse(marioHead, c => { if(c.isMesh) { const mats = Array.isArray(c.material) ? c.material : [c.material]; mats.forEach(m => { if(m) { if(v) m.color.setHex(0x00ff00); m.wireframe = v; } }); } }); } },
    { name: 'Invis-Wire', type: 'toggle', action: (v) => { if(!marioHead) return; safeTraverse(marioHead, c => { if(c.isMesh) { const mats = Array.isArray(c.material) ? c.material : [c.material]; mats.forEach(m => { if(m) { m.wireframe = v; m.transparent = v; m.opacity = v ? 0.3 : 1.0; } }); } }); } },
    { name: 'Glitch-Vtx', type: 'toggle', action: (v) => glitchVtxMode = v },
    { name: 'Swell', type: 'toggle', action: (v) => swellMode = v },
    { name: 'Thick Wire', type: 'trigger', action: () => { if(!marioHead) return; safeTraverse(marioHead, c => { if(c.isMesh) { const mats = Array.isArray(c.material) ? c.material : [c.material]; mats.forEach(m => { if(m) { m.wireframe = true; m.metalness = 1; m.roughness = 0; } }); } }); } },
    { name: 'Dark Matter', type: 'trigger', action: () => { if(!marioHead) return; safeTraverse(marioHead, c => { if(c.isMesh) { const mats = Array.isArray(c.material) ? c.material : [c.material]; mats.forEach(m => { if(m) { m.color.setHex(0x000000); m.roughness = 1; m.metalness = 0; } }); } }); } },
    { name: 'Sun-Lord', type: 'toggle', action: (v) => { sunLordMode = v; ambientLight.intensity = v ? 10 : 0.5; } },
    { name: 'Vibrato', type: 'toggle', action: (v) => vibratoMode = v },
    { name: 'Chaos', type: 'toggle', action: (v) => chaosMode = v }
];

document.getElementById('secret-btn').addEventListener('click', () => {
    let index;
    const unlockedNames = getUnlockedSecrets();
    
    // Try to find a secret the user hasn't seen yet
    const availableIndices = SECRET_ACTIONS.map((_, i) => i).filter(i => !unlockedNames.includes(SECRET_ACTIONS[i].name));
    
    if (availableIndices.length > 0) {
        index = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    } else {
        // All unlocked? Just pick a random one that isn't the last one
        do {
            index = Math.floor(Math.random() * SECRET_ACTIONS.length);
        } while (index === lastSecretIndex && SECRET_ACTIONS.length > 1);
    }
    
    lastSecretIndex = index;
    const choice = SECRET_ACTIONS[index];
    
    // Save to permanent storage
    saveUnlockedSecret(choice.name);
    
    // Add to UI (but don't auto-activate)
    addUnlockedButton('unlocked-' + choice.name.replace(/\s+/g, '-').toLowerCase(), choice.name, choice.type, choice.action, false);
    
    const btn = document.getElementById('secret-btn');
    const originalText = btn.innerText;
    btn.innerText = "UNLOCKED: " + choice.name.toUpperCase();
    
    // Create a temporary "New Secret!" floating text
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed; top:20px; right:20px; background: #ff00ff; color:white; padding:10px 20px; border-radius:20px; z-index:100000; font-weight:bold; box-shadow:0 0 20px #ff00ff;';
    toast.innerText = "NEW SECRET: " + choice.name;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);

    setTimeout(() => btn.innerText = originalText, 2000);
    playSound('reset');
});

async function logModelColors() {
    console.log("%c--- MODEL COLOR LOG ---", "color: #00ccff; font-weight: bold; font-size: 14px;");
    if (!marioHead) {
        console.warn("No model loaded to log.");
        return;
    }
    const colorArray = [];
    let logText = "MODEL COLOR LOG:\n";
    let index = 0;
    marioHead.traverse(child => {
        if (child.isMesh) {
            const mats = Array.isArray(child.material) ? child.material : [child.material];
            mats.forEach((m, matIdx) => {
                const hex = m.color.getHexString();
                const cssHex = `#${hex}`;
                console.log(`%c[${index}] Mesh: ${child.name || 'mesh'} | Mat: ${matIdx} | Hex: 0x${hex}`, 
                    `background: ${cssHex}; color: ${m.color.getHSL({}).l > 0.5 ? 'black' : 'white'}; padding: 2px 5px; border-radius: 3px; font-family: monospace;`);
                colorArray.push(`0x${hex}`);
                logText += `[${index}] Mesh: ${child.name || 'mesh'} Mat: ${matIdx} Hex: 0x${hex}\n`;
                index++;
            });
        }
    });
    const arrayStr = colorArray.join(', ');
    console.log("%cArray Format:", "font-weight: bold; margin-top: 10px;");
    console.log(arrayStr);
    
    logText += "\nArray Format:\n" + arrayStr;

    try {
        await navigator.clipboard.writeText(logText);
        alert("Colors logged to console and copied to clipboard!");
    } catch (err) {
        alert("Colors logged to console (clipboard copy failed).");
    }
}

function loadModelColors(input) {
    if (!marioHead) return;

    // Try to extract colors from the "Array Format" style first (0xXXXXXX, 0xYYYYYY)
    // or from the individual lines [index] ... Hex: 0xXXXXXX
    let hexCodes = [];
    
    // Pattern for 0x followed by 6 hex chars
    const hexPattern = /0x([0-9a-fA-F]{6})/g;
    let match;
    while ((match = hexPattern.exec(input)) !== null) {
        hexCodes.push(parseInt(match[1], 16));
    }

    if (hexCodes.length === 0) {
        alert("No valid color hex codes found in the input.");
        return;
    }

    let colorIdx = 0;
    marioHead.traverse(child => {
        if (child.isMesh) {
            const mats = Array.isArray(child.material) ? child.material : [child.material];
            mats.forEach((m) => {
                if (m && colorIdx < hexCodes.length) {
                    m.color.setHex(hexCodes[colorIdx]);
                    m.needsUpdate = true;
                    colorIdx++;
                }
            });
        }
    });

    playSound('reset');
    alert(`Applied ${colorIdx} colors to the model!`);
}

document.getElementById('dev-log-btn').addEventListener('click', () => {
    logModelColors();
});

document.getElementById('load-log-btn').addEventListener('click', () => {
    const input = prompt("Paste your color log or hex array here:");
    if (input) {
        loadModelColors(input);
    }
});

async function logStretchData() {
    if (!marioHead) return;
    const data = {
        model: modelSelect.value,
        meshes: []
    };

    marioHead.traverse(child => {
        if (child.isMesh) {
            const meshData = {
                n: child.name,
                p: [child.position.x, child.position.y, child.position.z],
                r: [child.rotation.x, child.rotation.y, child.rotation.z],
                s: [child.scale.x, child.scale.y, child.scale.z],
                v: Array.from(child.geometry.attributes.position.array).map(v => Math.round(v * 1000) / 1000)
            };
            data.meshes.push(meshData);
        }
    });

    try {
        const json = JSON.stringify(data);
        await navigator.clipboard.writeText(json);
        console.log("Stretch Data Logged:", data);
        alert("Stretch data (vertex positions and mesh transforms) copied to clipboard!");
    } catch (e) {
        console.error("Failed to copy stretch data:", e);
        alert("Check console for stretch data (clipboard copy failed).");
    }
}

function loadStretchData(input) {
    if (!marioHead) return;
    try {
        const data = JSON.parse(input);
        if (!data.meshes || !Array.isArray(data.meshes)) throw new Error("Invalid format");
        
        let meshIdx = 0;
        marioHead.traverse(child => {
            if (child.isMesh && meshIdx < data.meshes.length) {
                const m = data.meshes[meshIdx];
                child.position.set(m.p[0], m.p[1], m.p[2]);
                child.rotation.set(m.r[0], m.r[1], m.r[2]);
                child.scale.set(m.s[0], m.s[1], m.s[2]);
                
                if (m.v && m.v.length === child.geometry.attributes.position.array.length) {
                    child.geometry.attributes.position.array.set(m.v);
                    child.geometry.attributes.position.needsUpdate = true;
                    child.geometry.computeVertexNormals();
                }
                meshIdx++;
            }
        });
        playSound('reset');
        alert("Stretch data applied successfully!");
    } catch (e) {
        console.error("Load stretch error:", e);
        alert("Failed to load stretch data. Ensure you pasted a valid JSON string.");
    }
}

document.getElementById('log-stretch-btn').addEventListener('click', logStretchData);
document.getElementById('load-stretch-btn').addEventListener('click', () => {
    const input = prompt("Paste stretch data JSON here:");
    if (input) loadStretchData(input);
});

// Debug Helpers State
let debugHelpers = [];
let axesHelper = null;

document.getElementById('debug-reset-cam').addEventListener('click', () => {
    targetZoom = 5.0;
    controls.target.set(0, 0, 0);
    camera.position.set(0, 0, 5);
    controls.update();
});

document.getElementById('debug-helpers').addEventListener('click', (e) => {
    if (debugHelpers.length > 0) {
        debugHelpers.forEach(h => scene.remove(h));
        debugHelpers = [];
        e.target.innerText = "Show Helpers";
        e.target.classList.remove('active');
    } else {
        if (!marioHead) return;
        marioHead.traverse(child => {
            if (child.isMesh) {
                const helper = new THREE.BoxHelper(child, 0xffff00);
                scene.add(helper);
                debugHelpers.push(helper);
            }
        });
        e.target.innerText = "Hide Helpers";
        e.target.classList.add('active');
    }
});

document.getElementById('debug-axes').addEventListener('click', (e) => {
    if (axesHelper) {
        scene.remove(axesHelper);
        axesHelper = null;
        e.target.classList.remove('active');
    } else {
        axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);
        e.target.classList.add('active');
    }
});

// Initialize secrets from storage
function initStoredSecrets() {
    const unlocked = getUnlockedSecrets();
    unlocked.forEach(name => {
        const choice = SECRET_ACTIONS.find(a => a.name === name);
        if (choice) {
            addUnlockedButton('unlocked-' + choice.name.replace(/\s+/g, '-').toLowerCase(), choice.name, choice.type, choice.action, false);
        }
    });
}
initStoredSecrets();

// Make all secrets visible in the Crazy Tools (but do not auto-activate them)
function makeAllSecretsVisible() {
    SECRET_ACTIONS.forEach(choice => {
        const id = 'unlocked-' + choice.name.replace(/\s+/g, '-').toLowerCase();
        // Avoid duplicating if already present
        if (!document.getElementById(id)) {
            addUnlockedButton(id, choice.name, choice.type, choice.action, false);
        }
    });
}
makeAllSecretsVisible();

// --- Render Loop ---
function animate() {
    requestAnimationFrame(animate);

    if (shatterActive && marioHead) {
        marioHead.traverse(child => {
            if (child && child.isMesh && child.geometry && child.geometry.attributes.position && shatterVelocities.has(child.uuid)) {
                const pos = child.geometry.attributes.position;
                const vels = shatterVelocities.get(child.uuid);
                for (let i = 0; i < pos.count; i++) {
                    const vi = i * 3;
                    vels[vi + 1] -= 0.005; // Gravity acceleration for shards
                    pos.setXYZ(
                        i,
                        pos.getX(i) + vels[vi],
                        pos.getY(i) + vels[vi + 1],
                        pos.getZ(i) + vels[vi + 2]
                    );
                }
                pos.needsUpdate = true;
            }
        });
    }

    if (snappingMeshes.size > 0) {
        const stiffness = 0.15;
        const damping = 0.8;
        const epsilon = 0.001;

        snappingMeshes.forEach(mesh => {
            const posAttr = mesh.geometry.attributes.position;
            const original = originalVertices.get(mesh.uuid);
            const velocities = meshVelocities.get(mesh.uuid);
            let totalDist = 0;

            // Vertex physics
            if (posAttr && original && velocities) {
                for (let i = 0; i < posAttr.count; i++) {
                    const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
                    
                    const dx = original[ix] - posAttr.array[ix];
                    const dy = original[iy] - posAttr.array[iy];
                    const dz = original[iz] - posAttr.array[iz];

                    velocities[ix] = (velocities[ix] + dx * stiffness) * damping;
                    velocities[iy] = (velocities[iy] + dy * stiffness) * damping;
                    velocities[iz] = (velocities[iz] + dz * stiffness) * damping;

                    posAttr.array[ix] += velocities[ix];
                    posAttr.array[iy] += velocities[iy];
                    posAttr.array[iz] += velocities[iz];

                    totalDist += Math.abs(dx) + Math.abs(dy) + Math.abs(dz);
                }
                posAttr.needsUpdate = true;
                mesh.geometry.computeVertexNormals();
            }

            // Mesh Object position physics (for Mesh tool)
            if (mesh.userData.originalPosition) {
                if (!mesh.userData.posVelocity) mesh.userData.posVelocity = new THREE.Vector3();
                const pv = mesh.userData.posVelocity;
                const target = mesh.userData.originalPosition;

                const dx = target.x - mesh.position.x;
                const dy = target.y - mesh.position.y;
                const dz = target.z - mesh.position.z;

                pv.x = (pv.x + dx * stiffness) * damping;
                pv.y = (pv.y + dy * stiffness) * damping;
                pv.z = (pv.z + dz * stiffness) * damping;

                mesh.position.x += pv.x;
                mesh.position.y += pv.y;
                mesh.position.z += pv.z;

                totalDist += Math.abs(dx) + Math.abs(dy) + Math.abs(dz);
            }

            // Stop snapping if movement is negligible
            const count = posAttr ? posAttr.count : 1;
            if (totalDist < epsilon * count) {
                if (posAttr && original) {
                    posAttr.array.set(original);
                    posAttr.needsUpdate = true;
                    if (velocities) velocities.fill(0);
                }
                if (mesh.userData.originalPosition) {
                    mesh.position.copy(mesh.userData.originalPosition);
                    if (mesh.userData.posVelocity) mesh.userData.posVelocity.set(0, 0, 0);
                }
                snappingMeshes.delete(mesh);
                playSound('reset');
            }
        });
    }
    
    if (discoMode && marioHead) {
        safeTraverse(marioHead, child => {
            if (child && child.isMesh && child.material) {
                const mats = Array.isArray(child.material) ? child.material : [child.material];
                mats.forEach(m => {
                    if (m && m.color) m.color.setHSL((Date.now() % 2000) / 2000, 0.8, 0.5);
                });
            }
        });
    }

    if (glitchMode && marioHead) {
        safeTraverse(marioHead, child => {
            if (child && child.isMesh && child.geometry && child.geometry.attributes.position) {
                const pos = child.geometry.attributes.position;
                for (let i = 0; i < pos.count; i++) {
                    pos.setXYZ(
                        i,
                        pos.getX(i) + (Math.random() - 0.5) * 0.02,
                        pos.getY(i) + (Math.random() - 0.5) * 0.02,
                        pos.getZ(i) + (Math.random() - 0.5) * 0.02
                    );
                }
                pos.needsUpdate = true;
            }
        });
    }

    if (waveMode && marioHead) {
        const time = Date.now() * 0.005;
        safeTraverse(marioHead, child => {
            if (child && child.isMesh && child.geometry && child.geometry.attributes.position) {
                const pos = child.geometry.attributes.position;
                for (let i = 0; i < pos.count; i++) {
                    const x = pos.getX(i);
                    pos.setY(i, pos.getY(i) + Math.sin(x * 5 + time) * 0.005);
                }
                pos.needsUpdate = true;
            }
        });
    }

    if (jelloMode && marioHead) {
        const time = Date.now() * 0.01;
        safeTraverse(marioHead, child => {
            if (child && child.isMesh && child.geometry && child.geometry.attributes.position) {
                const pos = child.geometry.attributes.position;
                for (let i = 0; i < pos.count; i++) {
                    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
                    pos.setXYZ(i, x + Math.sin(y * 8 + time) * 0.002, y + Math.cos(x * 8 + time) * 0.002, z + Math.sin(z * 8 + time) * 0.002);
                }
                pos.needsUpdate = true;
            }
        });
    }

    if (pulseMode && marioHead) {
        const scale = 1 + Math.sin(Date.now() * 0.005) * 0.2;
        marioHead.scale.set(scale, scale, scale);
    }



    // Smoothly interpolate zoom
    const zoomLerpFactor = 0.15;
    currentZoom += (targetZoom - currentZoom) * zoomLerpFactor;

    // Apply zoom by enforcing distance from target
    const cameraDir = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
    camera.position.copy(controls.target).add(cameraDir.multiplyScalar(currentZoom));

    if (horrorShakeIntensity > 0) {
        const shake = horrorShakeIntensity;
        camera.position.x += (Math.random() - 0.5) * shake;
        camera.position.y += (Math.random() - 0.5) * shake;
        camera.position.z += (Math.random() - 0.5) * shake;
    }

    if (autoSpin && marioHead) {
        marioHead.rotation.y += 0.02;
    }

    if (marioHead) {
        const time = Date.now();
        if (gravityMode && marioHead) {
            safeTraverse(marioHead, c => { if(c.isMesh) { const p = c.geometry.attributes.position; for(let i=0; i<p.count; i++) p.setY(i, p.getY(i)-0.01); p.needsUpdate = true; } });
        }
        if (balloonMode && marioHead) {
            safeTraverse(marioHead, c => { if(c.isMesh) { const p = c.geometry.attributes.position, n = c.geometry.attributes.normal; for(let i=0; i<p.count; i++) p.setXYZ(i, p.getX(i)+n.getX(i)*0.005, p.getY(i)+n.getY(i)*0.005, p.getZ(i)+n.getZ(i)*0.005); p.needsUpdate = true; } });
        }
        if (floatingMode && marioHead) {
            safeTraverse(marioHead, c => { if(c.isMesh) { c.position.y += Math.sin(time * 0.002) * 0.005; } });
        }
        if (strobeMode && marioHead) {
            marioHead.visible = Math.floor(time / 100) % 2 === 0;
        }
        if (vertexRainbow && marioHead) {
            safeTraverse(marioHead, c => { if(c && c.isMesh) { const p = c.geometry.attributes.position; let colors = c.geometry.attributes.color; if(!colors) { colors = new THREE.BufferAttribute(new Float32Array(p.count * 3), 3); c.geometry.setAttribute('color', colors); } const col = new THREE.Color().setHSL((time % 2000)/2000, 0.8, 0.5); for(let i=0; i<p.count; i++) { colors.setXYZ(i, col.r, col.g, col.b); } colors.needsUpdate = true; if (c.material) { const mats = Array.isArray(c.material) ? c.material : [c.material]; mats.forEach(m => { if(m) m.vertexColors = true; }); } } });
        }
        if (lowPolyPulse && marioHead) {
            const s = 1 + Math.sin(time * 0.01) * 0.05;
            marioHead.scale.set(marioHead.scale.x * s, marioHead.scale.y * s, marioHead.scale.z * s);
        }

        if (dizzyMode) {
            controls.target.x += Math.sin(time * 0.005) * 0.05;
            controls.target.y += Math.cos(time * 0.005) * 0.05;
        }
        if (melterMode && marioHead) {
            safeTraverse(marioHead, c => { if(c.isMesh) { const p = c.geometry.attributes.position; for(let i=0; i<p.count; i++) p.setY(i, p.getY(i) - 0.005); p.needsUpdate = true; } });
        }
        if (elasticMode && marioHead) {
            const s = 1 + Math.sin(time * 0.01) * 0.5;
            marioHead.scale.y = s;
            marioHead.scale.x = 1/s;
            marioHead.scale.z = 1/s;
        }
        if (bouncerMode && marioHead) {
            marioHead.position.y = Math.abs(Math.sin(time * 0.01)) * 2;
        }
        if (atomicMode && marioHead) {
            safeTraverse(marioHead, c => { if(c.isMesh) { const p = c.geometry.attributes.position; for(let i=0; i<p.count; i++) p.setXYZ(i, p.getX(i)+(Math.random()-0.5)*0.1, p.getY(i)+(Math.random()-0.5)*0.1, p.getZ(i)+(Math.random()-0.5)*0.1); p.needsUpdate = true; } });
        }
        if (feverDreamMode) {
            glitchMode = true; waveMode = true; discoMode = true;
        }
        if (hologramMode && marioHead) {
            safeTraverse(marioHead, c => { if(c.isMesh) { const mats = Array.isArray(c.material) ? c.material : [c.material]; mats.forEach(m => { if(m) m.opacity = 0.4 + Math.sin(time*0.02)*0.3; }); } });
        }
        if (zFightMode && marioHead) {
            marioHead.position.x += (Math.random()-0.5)*0.01;
            marioHead.position.z += (Math.random()-0.5)*0.01;
        }
        if (spiralMode && marioHead) {
            marioHead.rotation.y += 0.1;
            safeTraverse(marioHead, c => { if(c.isMesh) { const p = c.geometry.attributes.position; for(let i=0; i<p.count; i++) { const a = 0.02 * p.getY(i); const cos=Math.cos(a), sin=Math.sin(a); const x=p.getX(i), z=p.getZ(i); p.setXYZ(i, x*cos-z*sin, p.getY(i), x*sin+z*cos); } p.needsUpdate = true; } });
        }
        if (magnetMode && marioHead) {
            safeTraverse(marioHead, c => { if(c.isMesh) { const p = c.geometry.attributes.position; for(let i=0; i<p.count; i++) { const dx = -p.getX(i)*0.05, dy = -p.getY(i)*0.05, dz = -p.getZ(i)*0.05; p.setXYZ(i, p.getX(i)+dx, p.getY(i)+dy, p.getZ(i)+dz); } p.needsUpdate = true; } });
        }
        if (zeroGMode && marioHead) {
            marioHead.position.add(driftVel);
            if (Math.random() > 0.98) driftVel.add(new THREE.Vector3((Math.random()-0.5)*0.01, (Math.random()-0.5)*0.01, (Math.random()-0.5)*0.01));
        }
        if (staticMode && marioHead) {
            safeTraverse(marioHead, c => { if(c.isMesh && Math.random() > 0.8) { const mats = Array.isArray(c.material) ? c.material : [c.material]; mats.forEach(m => { if(m) m.color.setHex(Math.random()*0xffffff); }); } });
        }
        if (tornadoMode && marioHead) {
            autoSpin = true;
            safeTraverse(marioHead, c => { if(c.isMesh) { const p = c.geometry.attributes.position; for(let i=0; i<p.count; i++) { const r = Math.sqrt(p.getX(i)**2+p.getZ(i)**2); p.setY(i, p.getY(i) + r*0.05); } p.needsUpdate = true; } });
        }
        if (glitchVtxMode && marioHead) {
            safeTraverse(marioHead, c => { if(c.isMesh) { const p = c.geometry.attributes.position; const a = Math.floor(Math.random()*p.count), b = Math.floor(Math.random()*p.count); const x=p.getX(a), y=p.getY(a), z=p.getZ(a); p.setXYZ(a, p.getX(b), p.getY(b), p.getZ(b)); p.setXYZ(b, x, y, z); p.needsUpdate = true; } });
        }
        if (swellMode && marioHead) {
            const s = 1 + Math.sin(time * 0.003) * 0.3;
            marioHead.scale.set(s, s, s);
        }
        if (vibratoMode && marioHead) {
            const s = 1 + Math.sin(time * 0.1) * 0.02;
            marioHead.scale.multiplyScalar(s);
        }
        if (chaosMode && Math.random() > 0.95) {
            const randIdx = Math.floor(Math.random() * SECRET_ACTIONS.length);
            const choice = SECRET_ACTIONS[randIdx];
            if (choice.type === 'trigger') choice.action();
        }

        if (deathMode && marioHead) {
            // Non-cumulative scale flickering to avoid math errors/infinity
            if (Math.random() > 0.5) {
                const s = 1.0 + Math.random() * 1.5;
                marioHead.scale.x = (Math.random() > 0.5 ? 1 : -1) * s;
            } else {
                marioHead.scale.x = marioHead.userData.initialScale ? marioHead.userData.initialScale.x : 1;
            }

            // Throttled texture noise to prevent memory leaks and WebGL crashes
            // Lowered probability to avoid excessive shader recompilation and map swaps
            if (Math.random() > 0.99) { 
                const noise = SECRET_ACTIONS.find(a => a.name === 'Texture Noise'); 
                if (noise) noise.action(); 
            }
            
            safeTraverse(marioHead, c => {
                if (c && c.isMesh && c.geometry && c.geometry.attributes.position) {
                    const p = c.geometry.attributes.position;
                    const n = c.geometry.attributes.normal;
                    if (!n) return;
                    
                    for (let i = 0; i < p.count; i++) {
                        if (Math.random() > 0.6) { 
                            const s = (Math.random() - 0.3) * 1.8; 
                            p.setXYZ(i, p.getX(i) + n.getX(i) * s, p.getY(i) + n.getY(i) * s, p.getZ(i) + n.getZ(i) * s); 
                        }
                    }
                    p.needsUpdate = true;
                    
                    if (c.material) {
                        const mats = Array.isArray(c.material) ? c.material : [c.material];
                        mats.forEach(m => { if (m && m.color) { 
                            if (Math.random() > 0.4) m.color.setHex(Math.random() * 0xffffff); 
                            if (Math.random() > 0.8) m.color.setRGB(1 - m.color.r, 1 - m.color.g, 1 - m.color.b); 
                        } });
                    }
                }
            });
        }
        safeTraverse(marioHead, c => {
            if(c && c.isMesh && c.userData.isSpinning) {
                c.rotation.y += 0.05;
            }
        });
    }

    if (drunkenCam) {
        const time = Date.now() * 0.001;
        camera.position.x += Math.sin(time) * 0.02;
        camera.position.y += Math.cos(time * 0.8) * 0.02;
    }

    controls.update();
    renderer.render(scene, camera);
}

animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});