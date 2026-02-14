function segmentsIntersect(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y) {
  function orient(ax, ay, bx, by, cx, cy) {
    return (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
  }

  const o1 = orient(p0x, p0y, p1x, p1y, p2x, p2y);
  const o2 = orient(p0x, p0y, p1x, p1y, p3x, p3y);
  const o3 = orient(p2x, p2y, p3x, p3y, p0x, p0y);
  const o4 = orient(p2x, p2y, p3x, p3y, p1x, p1y);

  if (o1 === 0 && o2 === 0 && o3 === 0 && o4 === 0) {
    // Collinear: check overlap by projections
    const min1x = Math.min(p0x, p1x);
    const max1x = Math.max(p0x, p1x);
    const min2x = Math.min(p2x, p3x);
    const max2x = Math.max(p2x, p3x);
    const min1y = Math.min(p0y, p1y);
    const max1y = Math.max(p0y, p1y);
    const min2y = Math.min(p2y, p3y);
    const max2y = Math.max(p2y, p3y);
    const overlapX = max1x >= min2x && max2x >= min1x;
    const overlapY = max1y >= min2y && max2y >= min1y;
    return overlapX && overlapY;
  }

  return (o1 * o2 <= 0) && (o3 * o4 <= 0);
}

export class Particle {
  // stable unique id helps reliable lookups even if arrays are mutated
  constructor(x, y, mass, color) {
    if (typeof Particle._nextId === "undefined") Particle._nextId = 1;
    this.id = Particle._nextId++;
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.mass = mass;
    this.invMass = mass > 0 ? 1 / mass : 0;
    this.color = color;
    this.pinned = false;
    this.pinX = x;
    this.pinY = y;
    this.accX = 0;
    this.accY = 0;
    this.dragged = false;
    this.dragTargetX = x;
    this.dragTargetY = y;
    // marker for sticky-floor pinning
    this.stickyPinned = false;
  }

  addForce(fx, fy) {
    this.accX += fx * this.invMass;
    this.accY += fy * this.invMass;
  }

  integrate(dt, damping) {
    if (this.pinned) {
      this.x = this.pinX;
      this.y = this.pinY;
      this.prevX = this.x;
      this.prevY = this.y;
      this.accX = 0;
      this.accY = 0;
      return;
    }

    let x = this.x;
    let y = this.y;

    let nextX = x + (x - this.prevX) * damping + this.accX * dt * dt;
    let nextY = y + (y - this.prevY) * damping + this.accY * dt * dt;

    if (this.dragged) {
      // strong constraint toward drag target
      nextX = (nextX * 0.2 + this.dragTargetX * 0.8);
      nextY = (nextY * 0.2 + this.dragTargetY * 0.8);
    }

    this.prevX = x;
    this.prevY = y;
    this.x = nextX;
    this.y = nextY;
    this.accX = 0;
    this.accY = 0;
  }
}

export class Spring {
  constructor(a, b, restLength, stiffness) {
    this.a = a;
    this.b = b;
    this.restLength = restLength;
    this.stiffness = stiffness;
  }

  satisfy() {
    const ax = this.a.x;
    const ay = this.a.y;
    const bx = this.b.x;
    const by = this.b.y;

    let dx = bx - ax;
    let dy = by - ay;
    let dist = Math.hypot(dx, dy);
    if (dist === 0) return;

    const diff = (dist - this.restLength) / dist;
    const invMassSum = this.a.invMass + this.b.invMass;
    if (invMassSum === 0) return;

    const factorA = (this.a.invMass / invMassSum) * this.stiffness;
    const factorB = (this.b.invMass / invMassSum) * this.stiffness;

    dx *= diff;
    dy *= diff;

    if (!this.a.pinned) {
      this.a.x += dx * factorA;
      this.a.y += dy * factorA;
    }
    if (!this.b.pinned) {
      this.b.x -= dx * factorB;
      this.b.y -= dy * factorB;
    }
  }
}

export class SoftBody {
  constructor() {
    this.particles = [];
    this.springs = [];
    this.gravity = 500;
    this.damping = 0.98;
    this.constraintsIterations = 6;
    this.boundsPadding = 10;
    this.pixelSize = 4;
    this.bounds = { width: 1, height: 1 };
    this.floorY = null;
    this.selfCollisionRadius = 4;

    // Hydraulic press state
    this.pressActive = false;     // whether press logic is running
    this.pressVisible = false;    // whether press affects world / is drawn
    this.pressY = 40;             // top position of the press
    this.pressThickness = 20;
    this.pressSpeed = 220;        // speed in px/s (down when direction = 1, up when -1)
    this.pressDirection = 1;      // 1 = down, -1 = up
    this.pressTimer = 0;          // seconds since activation
    this.pressDuration = 5;       // total time before deletion

    // Black hole state: list of { x, y, strength, radius }
    this.blackHoles = [];
    // Sticky floor flag: when true, particles contacting the floor become stuck until disabled
    this.stickyFloor = false;
  }

  setBounds(width, height) {
    this.bounds.width = width;
    this.bounds.height = height;
    this.floorY = height - 120; // floor line 120px from bottom (taller floor)
  }

  clear() {
    this.particles.length = 0;
    this.springs.length = 0;
  }

  addParticle(p) {
    this.particles.push(p);
  }

  addSpring(s) {
    this.springs.push(s);
  }

  step(dt) {
    const g = this.gravity;
    for (const p of this.particles) {
      p.addForce(0, g * p.mass);
      p.integrate(dt, this.damping);
    }

    // Apply black hole attraction (pull particles inward without breaking springs)
    if (this.blackHoles && this.blackHoles.length > 0) {
      for (const hole of this.blackHoles) {
        const hx = hole.x;
        const hy = hole.y;
        const radius = hole.radius || 200;
        const r2 = radius * radius;
        const strength = hole.strength || 8000;
        for (const p of this.particles) {
          const dx = p.x - hx;
          const dy = p.y - hy;
          const d2 = dx * dx + dy * dy;
          if (d2 > r2 || d2 === 0) continue;
          const d = Math.sqrt(d2);
          const falloff = 1 - (d / radius);
          const impulse = strength * falloff;
          // create inward velocity by adjusting prev positions toward the hole center
          const nx = dx / d;
          // For inward velocity we move prev opposite to explosion: prevX = x + nx * K
          p.prevX = p.x + nx * (impulse * 0.001);
          p.prevY = p.y + (dy / d) * (impulse * 0.001);
        }
      }
    }

    // Update hydraulic press motion (only when active)
    if (this.pressActive && this.floorY != null) {
      this.pressTimer += dt;
      const maxTravel = this.floorY - this.pressThickness - 10;
      const topY = 40;

      // After half the duration, move back up
      if (this.pressTimer >= this.pressDuration * 0.5) {
        this.pressDirection = -1;
      }

      this.pressY += this.pressSpeed * dt * this.pressDirection;

      // Clamp between top and bottom
      if (this.pressY > maxTravel) {
        this.pressY = maxTravel;
      }
      if (this.pressY < topY) {
        this.pressY = topY;
      }

      // After full duration, deactivate and hide
      if (this.pressTimer >= this.pressDuration) {
        this.pressActive = false;
        this.pressVisible = false;
      }
    }

    for (let i = 0; i < this.constraintsIterations; i++) {
      for (const s of this.springs) {
        s.satisfy();
      }
      this.handleBounds();
      this.resolveSelfCollisions();
    }
  }

  handleBounds() {
    const pad = this.boundsPadding;
    const w = this.bounds.width;
    const h = this.bounds.height;
    const floorY = this.floorY != null ? this.floorY : h - pad;

    for (const p of this.particles) {
      if (p.pinned) continue;

      // Side walls
      if (p.x < pad) {
        p.x = pad;
      } else if (p.x > w - pad) {
        p.x = w - pad;
      }

      // Ceiling / hydraulic press top
      const ceilingBase = pad;

      // When press is visible, it replaces the ceiling in its region
      if (this.pressVisible) {
        const activeCeiling = Math.max(ceilingBase, this.pressY);
        const ceilingLimit = activeCeiling + this.pressThickness;
        if (p.y < ceilingLimit) {
          p.y = ceilingLimit;
          p.prevY = p.y;
        }
      } else {
        // Normal ceiling with no press
        if (p.y < ceilingBase) {
          p.y = ceilingBase;
          p.prevY = p.y;
        }
      }

      // Floor handling (supports sticky floor)
      if (p.y > floorY) {
        p.y = floorY;

        // If sticky floor is enabled, pin particles that touch it and mark them as stickyPinned.
        if (this.stickyFloor) {
          p.pinned = true;
          p.stickyPinned = true;
          p.pinX = p.x;
          p.pinY = p.y;
          // keep prev positions consistent to avoid jitter
          p.prevY = p.y;
          p.prevX = p.x;
        } else {
          // Normal floor: zero out vertical velocity in Verlet terms
          p.prevY = p.y;
        }
      }
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.clearRect(0, 0, this.bounds.width, this.bounds.height);

    // Background (use configurable color if present)
    const bg = typeof this.backgroundColor === "string" ? this.backgroundColor : "#111";
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, this.bounds.width, this.bounds.height);

    // Floor (use configurable color if present)
    const floorCol = typeof this.floorColor === "string" ? this.floorColor : "#202020";
    if (this.floorY != null) {
      ctx.fillStyle = floorCol;
      ctx.fillRect(0, this.floorY, this.bounds.width, this.bounds.height - this.floorY);
    }

    // Hydraulic press (only when visible)
    if (this.pressVisible) {
      ctx.fillStyle = "#303030";
      ctx.fillRect(0, 0, this.bounds.width, this.pressY);
      ctx.fillStyle = "#606060";
      ctx.fillRect(0, this.pressY, this.bounds.width, this.pressThickness);
    }

    // Draw black holes (visual only) as dark circular spots with soft glow
    if (this.blackHoles && this.blackHoles.length > 0) {
      for (const hole of this.blackHoles) {
        const r = hole.radius || 200;
        const grad = ctx.createRadialGradient(hole.x, hole.y, 0, hole.x, hole.y, r);
        grad.addColorStop(0, "rgba(0,0,0,0.95)");
        grad.addColorStop(0.5, "rgba(0,0,0,0.7)");
        grad.addColorStop(1, "rgba(0,0,0,0.0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(hole.x, hole.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const size = this.pixelSize;
    const half = size * 0.5;

    for (const p of this.particles) {
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x - half, p.y - half, size, size);
    }
    ctx.restore();
  }

  // Enable/disable the sticky floor; when disabling, unpin only particles that were pinned by the sticky floor.
  setStickyFloor(enabled) {
    const was = !!this.stickyFloor;
    this.stickyFloor = !!enabled;
    if (!this.stickyFloor && was) {
      // unpin particles that were pinned due to sticky floor (leave user-pinned particles alone)
      for (const p of this.particles) {
        if (p.stickyPinned) {
          p.pinned = false;
          p.stickyPinned = false;
        }
      }
    }
  }

  findClosestParticle(x, y, maxDist) {
    let closest = null;
    let bestDistSq = maxDist * maxDist;
    for (const p of this.particles) {
      const dx = p.x - x;
      const dy = p.y - y;
      const d2 = dx * dx + dy * dy;
      if (d2 < bestDistSq) {
        bestDistSq = d2;
        closest = p;
      }
    }
    return closest;
  }

  // Cut springs that intersect a given segment (for slicing mode)
  sliceSegment(x1, y1, x2, y2) {
    const remaining = [];
    for (const s of this.springs) {
      const ax = s.a.x;
      const ay = s.a.y;
      const bx = s.b.x;
      const by = s.b.y;

      if (segmentsIntersect(x1, y1, x2, y2, ax, ay, bx, by)) {
        // Drop this spring (cut)
        continue;
      }
      remaining.push(s);
    }
    this.springs = remaining;
  }

  // Optimized self-collision using a simple spatial hash to avoid O(n^2) over all pairs
  resolveSelfCollisions() {
    const r = this.selfCollisionRadius;
    const r2 = r * r;
    const cellSize = r * 2;

    const grid = new Map();

    const getKey = (cx, cy) => `${cx},${cy}`;

    // Build spatial grid
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const cx = Math.floor(p.x / cellSize);
      const cy = Math.floor(p.y / cellSize);
      const key = getKey(cx, cy);
      let cell = grid.get(key);
      if (!cell) {
        cell = [];
        grid.set(key, cell);
      }
      cell.push(p);
    }

    // Check collisions within each cell and its neighbors
    const neighbors = [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
      [-1, 0],
      [0, -1],
      [-1, -1],
      [1, -1],
      [-1, 1]
    ];

    for (const [key, cellParticles] of grid.entries()) {
      const [cxStr, cyStr] = key.split(",");
      const cx = parseInt(cxStr, 10);
      const cy = parseInt(cyStr, 10);

      for (const [dxCell, dyCell] of neighbors) {
        const nxCell = cx + dxCell;
        const nyCell = cy + dyCell;
        const neighborKey = getKey(nxCell, nyCell);
        const neighborParticles = grid.get(neighborKey);
        if (!neighborParticles) continue;

        for (let i = 0; i < cellParticles.length; i++) {
          const p1 = cellParticles[i];
          if (p1.pinned) continue;

          const startJ = neighborKey === key ? i + 1 : 0;
          for (let j = startJ; j < neighborParticles.length; j++) {
            const p2 = neighborParticles[j];
            if (p2.pinned) continue;
            if (p1 === p2) continue;

            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist2 = dx * dx + dy * dy;
            if (dist2 >= r2 || dist2 === 0) continue;

            const dist = Math.sqrt(dist2);
            const overlap = r - dist;
            const nx = dx / dist;
            const ny = dy / dist;

            const invMassSum = p1.invMass + p2.invMass;
            if (invMassSum === 0) continue;

            const move1 = (p1.invMass / invMassSum) * overlap * 0.5;
            const move2 = (p2.invMass / invMassSum) * overlap * 0.5;

            p1.x -= nx * move1;
            p1.y -= ny * move1;
            p2.x += nx * move2;
            p2.y += ny * move2;
          }
        }
      }
    }
  }

  // Remove all springs without imparting velocity to particles (take apart)
  takeApart(/* strength = 3000 */) {
    // Only drop springs so pixels separate but keep their velocities/positions intact.
    this.springs.length = 0;
  }

  // Restick particles that are touching (or very close) by creating or strengthening springs between them.
  // Increased threshold so merge works even after springs were removed by takeApart.
  mergeTouching() {
    if (this.particles.length < 2) return;

    // allow a larger snapping distance so pixels that were separated slightly can restick
    const threshold = this.pixelSize * 1.6;
    const thr2 = threshold * threshold;
    const cellSize = threshold * 2;
    const grid = new Map();
    const getKey = (cx, cy) => `${cx},${cy}`;

    // Build spatial hash of particle indices
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const cx = Math.floor(p.x / cellSize);
      const cy = Math.floor(p.y / cellSize);
      const key = getKey(cx, cy);
      if (!grid.has(key)) grid.set(key, []);
      grid.get(key).push(i);
    }

    // Build a quick lookup for existing springs to avoid duplicates (use stable particle ids)
    const springSet = new Set();
    for (const s of this.springs) {
      const ida = s.a && s.a.id;
      const idb = s.b && s.b.id;
      if (typeof ida === "undefined" || typeof idb === "undefined") continue;
      const key = ida < idb ? `${ida},${idb}` : `${idb},${ida}`;
      springSet.add(key);
    }

    const newSprings = [];

    // For each particle, check nearby cells and create/strengthen springs when within threshold
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const cx = Math.floor(p.x / cellSize);
      const cy = Math.floor(p.y / cellSize);

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const key = getKey(cx + dx, cy + dy);
          const cell = grid.get(key);
          if (!cell) continue;
          for (const j of cell) {
            if (j === i) continue;
            // only consider each unordered pair once (use particle ids for pair key)
            const q = this.particles[j];
            const ida = p.id;
            const idb = q.id;
            const pairKey = ida < idb ? `${ida},${idb}` : `${idb},${ida}`;
            if (springSet.has(pairKey)) continue;

            const dxp = q.x - p.x;
            const dyp = q.y - p.y;
            const d2 = dxp * dxp + dyp * dyp;
            if (d2 <= thr2) {
              const dist = Math.sqrt(d2) || 0.0001;
              // Create a new spring to restick them, using a short rest length to pull them snug together
              const rest = Math.max(0.5, dist * 0.9);
              const stiffness = 0.9; // slightly stronger to ensure visible resticking
              newSprings.push(new Spring(p, q, rest, stiffness));
              springSet.add(pairKey);
            }
          }
        }
      }
    }

    // Append new springs to the existing spring list
    if (newSprings.length > 0) {
      this.springs.push(...newSprings);
    }
  }

  // Relax constraints immediately for a number of iterations (useful after programmatic spring changes)
  relax(iterations = 1) {
    const iters = Math.max(1, Math.floor(iterations));
    for (let i = 0; i < iters; i++) {
      for (const s of this.springs) {
        s.satisfy();
      }
      this.handleBounds();
      this.resolveSelfCollisions();
    }
  }

  // Explode around a point, applying impulse to nearby particles
  explode(x, y, force = 3000, radius = 160) {
    const r2 = radius * radius;
    for (const p of this.particles) {
      const dx = p.x - x;
      const dy = p.y - y;
      const d2 = dx * dx + dy * dy;
      if (d2 > r2) continue;
      const d = Math.sqrt(d2) || 1;
      const falloff = 1 - (d / radius);
      const impulse = force * falloff;
      // apply by modifying prev position to create velocity away from center
      const nx = dx / d;
      const ny = dy / d;
      p.prevX = p.x - nx * (impulse * 0.001);
      p.prevY = p.y - ny * (impulse * 0.001);
    }
  }

  // Add a black hole (non-destructive attractor that does not remove springs)
  addBlackHole(x, y, strength = 8000, radius = 200) {
    this.blackHoles.push({ x, y, strength, radius });
  }

  // Clear all black holes
  clearBlackHoles() {
    this.blackHoles.length = 0;
  }
}