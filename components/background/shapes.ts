export type Vec3 = [number, number, number];

export const rotateX = (v: Vec3, a: number): Vec3 => {
  const c = Math.cos(a);
  const s = Math.sin(a);
  const [x, y, z] = v;
  return [x, y * c - z * s, y * s + z * c];
};

export const rotateY = (v: Vec3, a: number): Vec3 => {
  const c = Math.cos(a);
  const s = Math.sin(a);
  const [x, y, z] = v;
  return [x * c + z * s, y, -x * s + z * c];
};

export const rotateZ = (v: Vec3, a: number): Vec3 => {
  const c = Math.cos(a);
  const s = Math.sin(a);
  const [x, y, z] = v;
  return [x * c - y * s, x * s + y * c, z];
};

export const rotate3 = (v: Vec3, rx: number, ry: number, rz: number): Vec3 =>
  rotateZ(rotateY(rotateX(v, rx), ry), rz);

export const project = (v: Vec3, fov = 1200): [number, number] => {
  const z = v[2] + fov;
  const k = fov / z;
  return [v[0] * k, v[1] * k];
};

// Soft side fade so objects gradually disappear as they approach the center
// column (replaces the CSS mask, which disabled GPU layer caching).
export const edgeFade = (x: number, w: number): number => {
  const p = x / w;
  if (p < 0.16) return 1;
  if (p < 0.3) return 1 - (p - 0.16) / 0.14;
  if (p <= 0.7) return 0;
  if (p < 0.84) return (p - 0.7) / 0.14;
  return 1;
};

const rand = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const LAT_LINES = 10;
const LONG_LINES = 16;
const LONG_POINTS = 40;

const buildSphereLines = (): { lats: Vec3[][]; longs: Vec3[][] } => {
  const lats: Vec3[][] = [];
  for (let i = 1; i < LAT_LINES; i++) {
    const theta = -Math.PI / 2 + (Math.PI * i) / LAT_LINES;
    const pts: Vec3[] = [];
    for (let j = 0; j <= LONG_POINTS; j++) {
      const phi = (Math.PI * 2 * j) / LONG_POINTS;
      pts.push([
        Math.cos(theta) * Math.cos(phi),
        Math.sin(theta),
        Math.cos(theta) * Math.sin(phi),
      ]);
    }
    lats.push(pts);
  }
  const longs: Vec3[][] = [];
  for (let j = 0; j < LONG_LINES; j++) {
    const phi = (Math.PI * 2 * j) / LONG_LINES;
    const pts: Vec3[] = [];
    for (let i = 0; i <= LONG_POINTS; i++) {
      const theta = -Math.PI / 2 + (Math.PI * i) / LONG_POINTS;
      pts.push([
        Math.cos(theta) * Math.cos(phi),
        Math.sin(theta),
        Math.cos(theta) * Math.sin(phi),
      ]);
    }
    longs.push(pts);
  }
  return { lats, longs };
};

const SPHERE_LINES = buildSphereLines();

export const drawWireframeSphere = (
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  rx: number,
  ry: number,
  color: string,
  alpha: number,
  lineWidth = 1
) => {
  ctx.strokeStyle = `rgba(${color},${alpha})`;
  ctx.lineWidth = lineWidth;
  const drawLine = (line: Vec3[]) => {
    ctx.beginPath();
    line.forEach((v, idx) => {
      const p = project(rotate3([v[0] * r, v[1] * r, v[2] * r], rx, ry, 0), 1200);
      if (idx === 0) ctx.moveTo(cx + p[0], cy + p[1]);
      else ctx.lineTo(cx + p[0], cy + p[1]);
    });
    ctx.stroke();
  };
  SPHERE_LINES.lats.forEach(drawLine);
  SPHERE_LINES.longs.forEach(drawLine);
};

const PHI = (1 + Math.sqrt(5)) / 2;

const buildEdges = (vs: Vec3[]): [number, number][] => {
  const out: [number, number][] = [];
  for (let i = 0; i < vs.length; i++) {
    for (let j = i + 1; j < vs.length; j++) {
      const d = Math.hypot(
        vs[i][0] - vs[j][0],
        vs[i][1] - vs[j][1],
        vs[i][2] - vs[j][2]
      );
      if (d > 1.8 && d < 2.2) out.push([i, j]);
    }
  }
  return out;
};

const ICO_VERTS: Vec3[] = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
];
const ICO_EDGES = buildEdges(ICO_VERTS);

const CUBE_VERTS: Vec3[] = [
  [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
  [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
];
const CUBE_EDGES = buildEdges(CUBE_VERTS);

const TETRA_VERTS: Vec3[] = [
  [1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1],
];
const TETRA_EDGES = buildEdges(TETRA_VERTS);

export type PolyKind = "icosahedron" | "cube" | "tetrahedron";

const POLY: Record<PolyKind, { verts: Vec3[]; edges: [number, number][] }> = {
  icosahedron: { verts: ICO_VERTS, edges: ICO_EDGES },
  cube: { verts: CUBE_VERTS, edges: CUBE_EDGES },
  tetrahedron: { verts: TETRA_VERTS, edges: TETRA_EDGES },
};

export const drawPolyWireframe = (
  ctx: CanvasRenderingContext2D,
  kind: PolyKind,
  cx: number,
  cy: number,
  size: number,
  rx: number,
  ry: number,
  rz: number,
  color: string,
  alpha: number,
  lineWidth = 1
) => {
  const { verts, edges } = POLY[kind];
  const rotated = verts.map((v) =>
    rotate3([v[0] * size, v[1] * size, v[2] * size], rx, ry, rz)
  );
  const pts = rotated.map((v) => project(v, 900));
  ctx.strokeStyle = `rgba(${color},${alpha})`;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  for (const [a, b] of edges) {
    ctx.moveTo(cx + pts[a][0], cy + pts[a][1]);
    ctx.lineTo(cx + pts[b][0], cy + pts[b][1]);
  }
  ctx.stroke();
};

export const drawRing = (
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  tiltX: number,
  tiltY: number,
  color: string,
  alpha: number,
  lineWidth = 1,
  segs = 48
) => {
  ctx.strokeStyle = `rgba(${color},${alpha})`;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  for (let i = 0; i <= segs; i++) {
    const phi = (Math.PI * 2 * i) / segs;
    const v = rotate3([r * Math.cos(phi), 0, r * Math.sin(phi)], tiltX, tiltY, 0);
    const p = project(v, 1200);
    if (i === 0) ctx.moveTo(cx + p[0], cy + p[1]);
    else ctx.lineTo(cx + p[0], cy + p[1]);
  }
  ctx.stroke();
};

export const drawGridPlane = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  progress: number
) => {
  const horizon = h * 0.66;
  const vpX = w / 2;
  const breathe = 0.09 + 0.02 * Math.sin(progress * Math.PI * 2);
  const fade = (x: number) => {
    const d = Math.abs(x - vpX) / (w / 2);
    return Math.max(0, 1 - d * 1.15);
  };
  for (let i = 0; i <= 16; i++) {
    const x = (w * i) / 16;
    const a = breathe * fade(x);
    if (a < 0.004) continue;
    ctx.strokeStyle = `rgba(150,160,130,${a.toFixed(3)})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(vpX, horizon);
    ctx.lineTo(x + (x - vpX) * 0.4, h);
    ctx.stroke();
  }
  for (let i = 1; i <= 7; i++) {
    const t = i / 8;
    const y = horizon + Math.pow(t, 1.6) * (h - horizon);
    const base = breathe * (1 - t * 0.55);
    const chunks = 8;
    for (let c = 0; c < chunks; c++) {
      const x0 = (w * c) / chunks;
      const x1 = (w * (c + 1)) / chunks;
      const a = base * edgeFade((x0 + x1) / 2, w);
      if (a < 0.004) continue;
      ctx.strokeStyle = `rgba(150,160,130,${a.toFixed(3)})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x0, y);
      ctx.lineTo(x1, y);
      ctx.stroke();
    }
  }
};

export type Particle = {
  x: number;
  y: number;
  speed: number;
  dir: 1 | -1;
  size: number;
  alpha: number;
  phase: number;
};

export const makeParticles = (count: number, w: number, h: number): Particle[] => {
  const out: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const inGutter = rand(i * 13.7) < 0.75;
    const x = inGutter
      ? rand(i * 5.9) < 0.5
        ? rand(i * 3.1) * w * 0.22
        : w * 0.78 + rand(i * 7.3) * w * 0.22
      : rand(i * 9.7) * w;
    out.push({
      x,
      y: rand(i * 11.1) * h,
      speed: 60 + rand(i * 17.9) * 220,
      dir: rand(i * 23.3) > 0.5 ? 1 : -1,
      size: 1 + rand(i * 29.1) * 2.2,
      alpha: 0.1 + rand(i * 31.7) * 0.12,
      phase: rand(i * 37.3) * Math.PI * 2,
    });
  }
  return out;
};

export const drawParticles = (
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  frame: number,
  progress: number,
  w: number,
  h: number
) => {
  for (const p of particles) {
    let y = p.y + p.dir * progress * p.speed;
    y = ((y % h) + h) % h;
    const tw = 0.6 + 0.4 * Math.sin(frame * 0.03 + p.phase);
    ctx.fillStyle = `rgba(167,209,41,${(p.alpha * tw * edgeFade(p.x, w)).toFixed(3)})`;
    ctx.beginPath();
    ctx.arc(p.x, y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }
};