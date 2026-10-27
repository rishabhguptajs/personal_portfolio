"use client";
import { useEffect, useRef } from "react";

// "daldal ka keeda": a tiny mosaic caterpillar that lives on the page.
// It is drawn on a grid of square tiles and walks only through empty space:
// every text block on the page is mapped as an obstacle and it path-finds
// around them, so it never covers (or hides under) any text.

const BODY = ["#3b7a52", "#5aa872", "#78c08b", "#9bd5a8", "#c4ebcb"];
const SPOT = "#f6cf63";
const EYE = "#2b2622";
const SHINE = "#ffffff";
const BLUSH = "#f5a3b5";
const TIP = "#f08aa0";
const SEGS = 6;
const SPACING = 3.4;
const R0 = 5;

// Space the keeda needs around its head cell (either facing), incl. antennae,
// shadow, hearts, zzz and the speech bubble.
const FX = 23;
const FY0 = -16;
const FY1 = 8;
const PAD = 1; // extra breathing room around text, in tiles
const NB = 2; // path-finding grid step, in tiles

const TEXT =
  ".k-nav, .k-foot, main h1, main h2, main h3, main p, main li, main blockquote, main pre, main figure, main summary, main form, main .k-detail, main button, main input, main textarea";

type V = { x: number; y: number };
type Mode = "wander" | "follow" | "sleep" | "flee" | "home";

const radius = (i: number) => (i === 0 ? R0 : [0, 3.7, 3.5, 3.2, 2.8, 2.3][i]);
const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
const HEART = [[1, 0], [3, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [1, 2], [2, 2], [3, 2], [2, 3]];
const ZED = [[0, 0], [1, 0], [2, 0], [1, 1], [0, 2], [1, 2], [2, 2]];

export default function Keeda() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const bubble = bubbleRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !bubble || !ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let T = 5;
    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      T = window.innerWidth < 640 ? 4 : 5;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    sizeCanvas();

    // ---------- obstacle map (document coordinates, in tiles) ----------
    let mc = 0;
    let mr = 0;
    let sum = new Int32Array(1);
    let nc = 0;
    let nr = 0;
    let nodeFree = new Uint8Array(0);
    let anyFree = false;

    const rectFree = (x0: number, y0: number, x1: number, y1: number) => {
      if (x0 < 0 || y0 < 0 || x1 >= mc || y1 >= mr) return false;
      const w = mc + 1;
      return sum[(y1 + 1) * w + x1 + 1] - sum[y0 * w + x1 + 1] - sum[(y1 + 1) * w + x0] + sum[y0 * w + x0] === 0;
    };
    const fits = (x: number, y: number) => {
      const hx = Math.round(x);
      const hy = Math.round(y);
      return rectFree(hx - FX, hy + FY0, hx + FX, hy + FY1);
    };

    const buildMap = () => {
      const docW = document.documentElement.clientWidth;
      const docH = Math.max(document.documentElement.scrollHeight, window.innerHeight);
      mc = Math.ceil(docW / T);
      mr = Math.ceil(docH / T);
      const blocked = new Uint8Array(mc * mr);
      document.querySelectorAll<HTMLElement>(TEXT).forEach((el) => {
        let r = el.getBoundingClientRect();
        // text inside a scrolling list only counts where the list shows it
        const box = el.closest(".k-scroll")?.getBoundingClientRect();
        if (box) {
          r = new DOMRect(
            Math.max(r.left, box.left),
            Math.max(r.top, box.top),
            Math.max(0, Math.min(r.right, box.right) - Math.max(r.left, box.left)),
            Math.max(0, Math.min(r.bottom, box.bottom) - Math.max(r.top, box.top))
          );
        }
        if (r.width === 0 || r.height === 0) return;
        const x0 = Math.max(0, Math.floor((r.left + window.scrollX) / T) - PAD);
        const y0 = Math.max(0, Math.floor((r.top + window.scrollY) / T) - PAD);
        const x1 = Math.min(mc - 1, Math.ceil((r.right + window.scrollX) / T) + PAD);
        const y1 = Math.min(mr - 1, Math.ceil((r.bottom + window.scrollY) / T) + PAD);
        for (let y = y0; y <= y1; y++) blocked.fill(1, y * mc + x0, y * mc + x1 + 1);
      });
      const w = mc + 1;
      sum = new Int32Array(w * (mr + 1));
      for (let y = 0; y < mr; y++) {
        let row = 0;
        for (let x = 0; x < mc; x++) {
          row += blocked[y * mc + x];
          sum[(y + 1) * w + x + 1] = sum[y * w + x + 1] + row;
        }
      }
      nc = Math.floor(mc / NB) + 1;
      nr = Math.floor(mr / NB) + 1;
      nodeFree = new Uint8Array(nc * nr);
      anyFree = false;
      for (let j = 0; j < nr; j++)
        for (let i = 0; i < nc; i++)
          if (fits(i * NB, j * NB)) {
            nodeFree[j * nc + i] = 1;
            anyFree = true;
          }
    };

    // ---------- path finding on the free grid ----------
    const nodeOf = (p: V) => {
      const i = Math.min(nc - 1, Math.max(0, Math.round(p.x / NB)));
      const j = Math.min(nr - 1, Math.max(0, Math.round(p.y / NB)));
      return j * nc + i;
    };
    const nodePos = (n: number): V => ({ x: (n % nc) * NB, y: Math.floor(n / nc) * NB });
    const bfs = (start: number, ignoreWalls: boolean) => {
      const parent = new Int32Array(nc * nr).fill(-2);
      const order: number[] = [start];
      parent[start] = -1;
      for (let q = 0; q < order.length; q++) {
        const n = order[q];
        const i = n % nc;
        const j = (n - i) / nc;
        for (let dy = -1; dy <= 1; dy++)
          for (let dx = -1; dx <= 1; dx++) {
            if (!dx && !dy) continue;
            const a = i + dx;
            const b = j + dy;
            if (a < 0 || b < 0 || a >= nc || b >= nr) continue;
            const m = b * nc + a;
            if (parent[m] !== -2) continue;
            if (!ignoreWalls) {
              if (!nodeFree[m]) continue;
              if (dx && dy && (!nodeFree[j * nc + a] || !nodeFree[b * nc + i])) continue;
            }
            parent[m] = n;
            order.push(m);
          }
      }
      return { parent, order };
    };
    const clearLine = (a: V, b: V) => {
      const d = Math.hypot(b.x - a.x, b.y - a.y);
      for (let s = 0; s <= d; s += 1) {
        const k = d ? s / d : 0;
        if (!fits(a.x + (b.x - a.x) * k, a.y + (b.y - a.y) * k)) return false;
      }
      return fits(b.x, b.y);
    };
    const pathTo = (parent: Int32Array, goal: number, from: V) => {
      const raw: V[] = [];
      for (let n = goal; n !== -1; n = parent[n]) raw.unshift(nodePos(n));
      // string-pull: skip waypoints we can walk straight past
      const out: V[] = [];
      let cur = from;
      let k = 0;
      while (k < raw.length) {
        let far = k;
        while (far + 1 < raw.length && clearLine(cur, raw[far + 1])) far++;
        out.push(raw[far]);
        cur = raw[far];
        k = far + 1;
      }
      return out;
    };

    // ---------- state ----------
    const segs: V[] = Array.from({ length: SEGS }, () => ({ x: -999, y: -999 }));
    const head = segs[0];
    let placed = false;
    let facing = 1;
    let speed = 0;
    let mode: Mode = "wander";
    let path: V[] = [];
    let pauseUntil = 0;
    let fleeing = false;
    let shyUntil = 0;
    let lastGreet = -1e9;
    let squishUntil = 0;
    let blinkAt = performance.now() + 3000;
    let bubbleUntil = 0;
    const pointer = { cx: 0, cy: 0, inside: false, last: performance.now() };
    const ptr = (): V => ({ x: (pointer.cx + window.scrollX) / T, y: (pointer.cy + window.scrollY) / T });
    const trail: { x: number; y: number; t: number }[] = [];
    const hearts: { x: number; y: number; t: number }[] = [];

    const say = (s: string, ms = 1500) => {
      bubble.textContent = s;
      bubbleUntil = performance.now() + ms;
    };
    const inView = (p: V) => {
      const top = window.scrollY / T;
      const vw = window.innerWidth / T;
      const vh = window.innerHeight / T;
      return p.y + FY0 >= top && p.y + FY1 <= top + vh && p.x - FX >= 0 && p.x + FX <= vw;
    };

    const hopTo = (p: V) => {
      head.x = p.x;
      head.y = p.y;
      for (let i = 1; i < SEGS; i++) segs[i] = { x: p.x - facing * i * SPACING, y: p.y };
      trail.length = 0;
      path = [];
      speed = 0;
      placed = true;
    };
    const place = () => {
      const free: number[] = [];
      for (let n = 0; n < nodeFree.length; n++) if (nodeFree[n]) free.push(n);
      if (!free.length) return;
      const visible = free.filter((n) => inView(nodePos(n)));
      hopTo(nodePos(pick(visible.length ? visible : free)));
    };

    // ---------- one small pond: water, lotus leaves, reeds. the keeda's home ----------
    const LEAF = ["#2f6b45", "#3f8a5a", "#5aa872", "#7fc48f", "#a8dcae"];
    const LOTUS = ["#f7c6d4", "#f5a3b5", "#e9849e", "#f6cf63"];
    type Leaf = { x: number; y: number; r: number; notch: number; bud: boolean; phase: number; rippleAt: number };
    type Pond = { cx: number; cy: number; rx: number; ry: number; reeds: { x: number; y: number; h: number; phase: number }[]; home: V };
    let flowers: Leaf[] = [];
    let pond: Pond | null = null;
    type Tuft = { x: number; y: number; h: number; phase: number };
    let tufts: Tuft[] = [];
    let daisies: { x: number; y: number; h: number; c: string }[] = [];
    const frog = { from: 0, to: 0, hopAt: -1e9, croakAt: 0, nextHop: 0, awakeUntil: 0 };
    const dfly = { x: 0, y: 0, flyUntil: 0, init: false };

    // ---------- night ----------
    const isNight = () => document.documentElement.dataset.theme === "night";
    let night = isNight() ? 1 : 0; // eased 0..1 so the scene visibly changes over
    let wasNight = isNight();
    let lazyAt = 0; // when the keeda gives up and goes back to bed
    let stars: { x: number; y: number; p: number; big: boolean }[] = [];
    let moon: V | null = null;
    const flies: { x: number; y: number; vx: number; vy: number; p: number }[] = [];
    const growSky = () => {
      let sd = mc * 17 + mr * 5 + location.pathname.length;
      const rnd = () => ((sd = (sd * 1103515245 + 12345) & 0x7fffffff) % 100000) / 100000;
      stars = [];
      const want = Math.min(140, Math.round((mc * mr) / 650));
      for (let i = 0; i < want * 3 && stars.length < want; i++) {
        const x = Math.floor(rnd() * mc);
        const y = Math.floor(rnd() * mr);
        if (rectFree(x - 2, y - 2, x + 2, y + 2)) stars.push({ x, y, p: rnd() * 6, big: rnd() < 0.12 });
      }
      moon = null;
      for (let y = 8; y < Math.min(mr - 8, 70) && !moon; y += 2)
        for (let x = mc - 10; x > mc * 0.55 && !moon; x -= 2)
          if (rectFree(x - 8, y - 8, x + 8, y + 8) && !(pond && Math.abs(x - pond.cx) < pond.rx + 12 && Math.abs(y - pond.cy) < pond.ry + 22))
            moon = { x, y };
      flies.length = 0;
      const homes = [...plants.map((p) => ({ x: p.x, y: p.y - 8 })), ...(pond ? [{ x: pond.cx, y: pond.cy - pond.ry - 4 }] : [])];
      for (let i = 0; i < 14 && homes.length; i++) {
        const h = homes[i % homes.length];
        const x = h.x + Math.round((rnd() - 0.5) * 16);
        const y = h.y + Math.round((rnd() - 0.5) * 10);
        if (cellFree(x, y)) flies.push({ x, y, vx: rnd() - 0.5, vy: rnd() - 0.5, p: rnd() * 6 });
      }
    };
    type Plant = { x: number; y: number; kind: number; flip: number; phase: number };
    let plants: Plant[] = [];
    // little plants, drawn bottom-up from their root (last row sits on the ground)
    const PLANT_ART = [
      // coin plant: round leaves on thin stems
      ["...ccc.....", "..ccccc.bb.", "..cccbc.bbb", "...ccc.s.b.", "bb...s.s...", "bbb..ss....", ".b.s.s.....", "....ss.....", ".....s....."],
      // two-leaf sprout
      [".bb...cc.", "bbbb.cccc", "bbbbscccc", ".bb.s.cc.", "....s....", "....s...."],
      // mushroom pair
      [".rrr.....", "rwrrr.....", "rrrwr.rr.", "..m..rwrr", "..m...m..", "..m...m.."],
      // round-leaf shrub
      ["..ccc.", ".ccbcc", "cbccbc", ".cbbc.", "..s...", "..s..."],
    ];
    const ripples: { x: number; y: number; r: number; t: number }[] = [];
    const cellFree = (x: number, y: number) => rectFree(Math.floor(x), Math.floor(y), Math.floor(x), Math.floor(y));
    const pondBox = (cx: number, cy: number, rx: number, ry: number) => rectFree(cx - rx - 9, cy - ry - 18, cx + rx + 7, cy + ry + 6);
    const inPond = (x: number, y: number) =>
      !!pond && ((x - pond.cx) / pond.rx) ** 2 + ((y - pond.cy) / pond.ry) ** 2 <= 1;
    const growPlants = () => {
      growPlantsInner();
      growSky();
    };
    const growPlantsInner = () => {
      plants = [];
      // one tidy border along the ground: even spacing, mirrored around the middle of the page
      const PITCH = 22;
      const n = Math.max(2, Math.floor((mc - 16) / PITCH));
      const kinds = [3, 0, 4, 1, 2, 5];
      const y = mr - 4;
      const nearPond = (x: number) => !!pond && Math.abs(x - pond.cx) < pond.rx + 18 && Math.abs(y - pond.cy) < pond.ry + 22;
      const ok = (x: number) => rectFree(x - 7, y - 11, x + 7, y) && !nearPond(x);
      for (let i = 0; i < Math.ceil(n / 2); i++) {
        const off = ((n - 1) / 2 - i) * PITCH;
        const xl = Math.round(mc / 2 - off);
        const xr = Math.round(mc / 2 + off);
        const kind = kinds[i % kinds.length];
        const phase = i * 1.7;
        if (ok(xl)) plants.push({ x: xl, y, kind, flip: 1, phase });
        if (xr !== xl && ok(xr)) plants.push({ x: xr, y, kind, flip: -1, phase: phase + 0.9 });
      }
    };
    const growFlowers = () => {
      if (pond && pondBox(pond.cx, pond.cy, pond.rx, pond.ry)) {
        // pond still fits; regrow plants only if the layout moved text onto one
        if (!plants.length || plants.some((pl) => !rectFree(pl.x - 7, pl.y - 11, pl.x + 7, pl.y))) growPlants();
        return;
      }
      pond = null;
      flowers = [];
      // as big as the free corner allows, so it clearly outsizes the keeda
      const tryR = [44, 40, 36, 32, 28, 24, 20, 17, 15].filter((r) => r <= Math.round((window.innerWidth / T) * 0.19));
      let rx = tryR[tryR.length - 1] ?? 15;
      for (const r of tryR) {
        let ok = false;
        const ryy = Math.round(r * 0.5);
        for (let cy = ryy + 18; cy < mr - ryy - 6 && !ok; cy += 3)
          for (let cx = r + 9; cx < mc - r - 7 && !ok; cx += 3)
            if (cy + ryy < (window.scrollY + window.innerHeight) / T && pondBox(cx, cy, r, ryy)) ok = true;
        if (ok) {
          rx = r;
          break;
        }
      }
      const ry = Math.round(rx * 0.5);
      const top = window.scrollY / T;
      const vh = window.innerHeight / T;
      let best: V | null = null;
      let bestScore = -Infinity;
      for (let cy = ry + 18; cy < mr - ry - 2; cy += 2)
        for (let cx = rx + 9; cx < mc - rx - 7; cx += 2) {
          if (!pondBox(cx, cy, rx, ry)) continue;
          // prefer: inside the first screen, towards the right, around mid-height
          const score = (cy + ry < top + vh ? 1000 : 0) + cx * 2 - Math.abs(cy - (top + vh * 0.42)) * 0.6; // tucked in the right corner
          if (score > bestScore) {
            bestScore = score;
            best = { x: cx, y: cy };
          }
        }
      if (!best) {
        growPlants();
        return;
      }
      const { x: cx, y: cy } = best;
      const layout: [number, number, number, boolean, number][] = [
        [-0.42, 0.12, 0.34, true, 2.3],
        [0.33, -0.1, 0.24, false, 0.5],
        [-0.02, -0.52, 0.14, false, 4.1],
        [0.6, 0.45, 0.16, false, 1.4],
        [0.02, 0.58, 0.12, false, 5.2],
      ];
      flowers = layout.map(([dx, dy, rr, bud, notch], i) => ({
        x: Math.round(cx + dx * rx),
        y: Math.round(cy + dy * ry),
        r: Math.max(2, Math.round(rr * rx)),
        notch,
        bud,
        phase: i * 1.3,
        rippleAt: 0,
      }));
      const big = flowers[0];
      pond = {
        cx,
        cy,
        rx,
        ry,
        reeds: [
          { x: Math.round(cx + rx * 0.72), y: Math.round(cy - ry * 0.45), h: 13, phase: 0 },
          { x: Math.round(cx + rx * 0.8), y: Math.round(cy - ry * 0.35), h: 16, phase: 1.1 },
          { x: Math.round(cx + rx * 0.88), y: Math.round(cy - ry * 0.2), h: 10, phase: 2.3 },
        ],
        home: { x: big.x + 4, y: big.y - 1 },
      };
      // grass along the bottom and left bank, with a few daisies tucked in
      tufts = [];
      daisies = [];
      let hsh = cx * 7 + cy * 13;
      const h = () => ((hsh = (hsh * 1103515245 + 12345) & 0x7fffffff) % 1000) / 1000;
      for (let a = 0.14; a <= 1.0; a += 0.085) {
        const ang = a * Math.PI;
        const x = Math.round(cx + Math.cos(ang) * (rx + 0.5));
        const y = Math.round(cy + Math.sin(ang) * (ry + 0.5));
        tufts.push({ x, y, h: 2 + Math.floor(h() * 4), phase: h() * 6 });
        if (h() < 0.22) daisies.push({ x: x + 1, y, h: 3 + Math.floor(h() * 2), c: h() < 0.5 ? "#ffffff" : "#f7c6d4" });
      }
      frog.from = frog.to = 1;
      frog.hopAt = -1e9;
      growPlants();
    };
    const dropPetal = (l: Leaf, now: number) => {
      l.rippleAt = now;
      ripples.push({ x: l.x, y: l.y, r: l.r, t: now });
    };

    const plan = (kind: "wander" | "flee" | "home") => {
      path = [];
      if (!anyFree) return;
      const s = nodeOf(head);
      if (!nodeFree[s]) {
        // text ended up under us: hop (never walk) to the nearest free spot
        const { order } = bfs(s, true);
        const goal = order.find((n) => nodeFree[n]);
        if (goal !== undefined) hopTo(nodePos(goal));
        return;
      }
      const { parent, order } = bfs(s, false);
      let goal: number | undefined;
      if (kind === "home") {
        // the free spot closest to the big lotus leaf
        const h = pond?.home;
        if (h) {
          let bestD = Infinity;
          for (const n of order) {
            const q = nodePos(n);
            const d = Math.hypot(q.x - h.x, q.y - h.y);
            if (d < bestD) {
              bestD = d;
              goal = n;
            }
          }
        }
      } else if (kind === "flee") {
        const p = ptr();
        goal = order.find((n) => {
          const q = nodePos(n);
          return Math.hypot(q.x - p.x, q.y - p.y) > 32;
        });
      } else {
        const far = order.filter((n) => {
          const q = nodePos(n);
          return Math.hypot(q.x - head.x, q.y - head.y) > 14;
        });
        const visible = far.filter((n) => inView(nodePos(n)));
        if (visible.length) goal = pick(visible);
        else if (far.length) goal = pick(far);
      }
      if (goal !== undefined) path = pathTo(parent, goal, head);
    };

    let mapTimer = 0;
    let lastPath = location.pathname;
    const refreshMap = () => {
      window.clearTimeout(mapTimer);
      mapTimer = window.setTimeout(() => {
        buildMap();
        if (location.pathname !== lastPath) {
          // new page: start fresh in view instead of wherever we were
          lastPath = location.pathname;
          flowers = [];
          pond = null;
          ripples.length = 0;
          placed = false;
        }
        growFlowers();
        if (!placed || !anyFree) {
          placed = false;
          place();
        }
        // only replan when the layout change actually got in the way
        if (!fits(head.x, head.y) || path.some((p) => !fits(p.x, p.y))) plan(fleeing ? "flee" : "wander");
      }, 80);
    };
    buildMap();
    growFlowers();
    place();
    plan("wander");

    const onResize = () => {
      sizeCanvas();
      refreshMap();
    };
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(refreshMap);
    ro.observe(document.body);
    const mo = new MutationObserver(refreshMap);
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["open"] });
    document.addEventListener("toggle", refreshMap, true);
    const onListScroll = (e: Event) => {
      if ((e.target as Element).classList?.contains("k-scroll")) refreshMap();
    };
    document.addEventListener("scroll", onListScroll, true);
    document.fonts?.ready.then(refreshMap);

    // the cursor never wakes a sleeping keeda; only a poke does (see onDown)
    const wake = (now: number) => {
      pointer.last = now;
    };
    let napUntil = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.cx = e.clientX;
      pointer.cy = e.clientY;
      pointer.inside = true;
      wake(performance.now());
    };
    const onLeave = () => (pointer.inside = false);
    const onDown = (e: PointerEvent) => {
      const now = performance.now();
      pointer.cx = e.clientX;
      pointer.cy = e.clientY;
      const p = ptr();
      const hit = placed && segs.some((s, i) => Math.hypot(s.x - p.x, s.y - p.y) < radius(i) + 3);
      wake(now);
      // a click near the pond at night stirs the frog and the dragonfly too
      if (pond && Math.abs(p.x - pond.cx) < pond.rx + 6 && Math.abs(p.y - pond.cy) < pond.ry + 16) {
        disturbFrog(now);
        dfly.flyUntil = now + 5000;
      }
      if (!hit) return;
      const wasAsleep = mode === "sleep";
      if (isNight()) lazyAt = now + 6000;
      squishUntil = now + 450;
      hearts.push({ x: head.x, y: head.y - 7, t: now });
      say(
        wasAsleep
          ? pick(["hm? it's late…", "five more minutes", "shh, sleeping", "kya hai yaar"])
          : pick(["hehe", "oye!", "tickles!", "bas bas", "eep"]),
        1800,
      );
      mode = "flee";
      fleeing = true;
      plan("flee");
    };
    const disturbFrog = (now: number) => {
      if (now > frog.awakeUntil) frog.croakAt = now + 250; // wakes with a croak
      frog.awakeUntil = now + 3500;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    document.documentElement.addEventListener("mouseleave", onLeave);

    let raf = 0;
    let prev = performance.now();
    const BIG = 1 << 16;
    const cells = new Map<number, string>();
    const put = (x: number, y: number, c: string) => {
      x = Math.floor(x);
      y = Math.floor(y);
      if (x < 0 || y < 0 || x >= BIG) return;
      cells.set(y * BIG + x, c);
      if (drawingKeeda) keedaCells.add(y * BIG + x);
    };
    const keedaCells = new Set<number>();
    // moonlight: solid colours shift toward a cool night blue
    const tintCache = new Map<string, string>();
    const tint = (c: string, q: number) => {
      if (q < 0.05 || c[0] !== "#") return c;
      const key = c + q;
      let out = tintCache.get(key);
      if (!out) {
        const n = parseInt(c.slice(1), 16);
        const m = q * 0.38;
        const ch = (v: number, to: number) => Math.round(v + (to - v) * m);
        out = `rgb(${ch((n >> 16) & 255, 26)},${ch((n >> 8) & 255, 48)},${ch(n & 255, 66)})`;
        tintCache.set(key, out);
      }
      return out;
    };
    let drawingKeeda = false;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      const t = now / 1000;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      bubble.style.opacity = "0";
      if (!placed || !anyFree) return;
      const idle = now - pointer.last;

      // ---- day / night ----
      const nightNow = isNight();
      night += ((nightNow ? 1 : 0) - night) * Math.min(1, dt * 1.4);
      if (nightNow !== wasNight) {
        wasNight = nightNow;
        if (nightNow) {
          say(pick(["*yawn*", "sleepy…", "goodnight"]), 1800);
          lazyAt = now + 1500;
          dfly.flyUntil = 0;
        } else {
          if (mode === "sleep" || mode === "home") {
            mode = "wander";
            path = [];
            pauseUntil = now + 1200;
          }
          say(pick(["good morning!", "*stretch*", "sunshine!"]), 1800);
          frog.croakAt = now + 600;
        }
      }
      const pNow = ptr();
      const cursorLive = pointer.inside && idle < 1500;
      if (nightNow && !still) {
        // nobody around: back to bed in the pond
        if ((mode === "wander" || mode === "follow") && now > lazyAt) {
          plan("home");
          mode = path.length ? "home" : "sleep";
          if (mode === "sleep") say("zzz", 1200);
        }
      }

      // ---- decide ----
      if (still) mode = "sleep";
      if (mode === "flee" && !path.length) {
        mode = "wander";
        fleeing = false;
        pauseUntil = now + 800;
      }
      if (!nightNow && mode !== "flee" && mode !== "sleep" && mode !== "home") {
        // by day it notices the cursor; at night (and on its way to bed) it ignores it
        const p = ptr();
        const near = pointer.inside && idle < 2500 ? Math.hypot(p.x - head.x, p.y - head.y) : Infinity;
        if (near < 12 && now > shyUntil) {
          shyUntil = now + 2500;
          mode = "flee";
          fleeing = true;
          say(pick(["eep", "shy hu", "personal space!"]));
          plan("flee");
        } else if (near < 30) {
          if (mode !== "follow" && now - lastGreet > 9000) {
            say(pick(["hi!", "oh, hello", "namaste", ":)"]));
            lastGreet = now;
          }
          mode = "follow";
        } else if (mode === "follow") {
          mode = "wander";
          pauseUntil = now + 600;
        }
        if (!nightNow && idle > 15000 && mode === "wander" && Math.random() < 0.004) {
          // sleepy: crawl home to the pond and nap there
          plan("home");
          mode = path.length ? "home" : "sleep";
          if (mode === "sleep") say("zzz", 1200);
          napUntil = now + 25000 + Math.random() * 20000;
        }
      }
      if (mode === "sleep" && !nightNow && !still && now > napUntil) {
        // a day nap ends by itself
        mode = "wander";
        say(pick(["*stretch*", "*yawn*", "that was a good nap"]), 1600);
        pauseUntil = now + 800;
      }
      if (!fits(head.x, head.y) && !path.length) plan("wander"); // something moved onto us

      // ---- move along the planned path ----
      let want = 0;
      if (mode === "follow") {
        facing = ptr().x > head.x ? 1 : -1;
      } else if (mode === "home" && !path.length) {
        mode = "sleep";
        say("zzz", 1200);
        napUntil = now + 25000 + Math.random() * 20000;
      } else if (mode === "wander" || mode === "flee" || mode === "home") {
        if (!path.length && now > pauseUntil && mode === "wander") {
          plan("wander");
          if (!path.length) pauseUntil = now + 3000;
        }
        if (path.length) want = mode === "flee" ? 30 : mode === "home" ? 6 : 8;
      }
      speed += (want - speed) * Math.min(1, dt * 5);
      if (path.length && speed > 0.1) {
        const wp = path[0];
        const dx = wp.x - head.x;
        const dy = wp.y - head.y;
        const d = Math.hypot(dx, dy);
        const step = Math.min(d, speed * dt);
        if (d > 0.01) {
          head.x += (dx / d) * step;
          head.y += (dy / d) * step;
          if (Math.abs(dx) > d * 0.3) facing = dx > 0 ? 1 : -1;
        }
        if (d - step < 0.3) {
          path.shift();
          if (!path.length && mode === "wander") pauseUntil = now + 1500 + Math.random() * 4000;
        }
      }

      // ---- body pose: side view, snapped to whole tiles ----
      const f = facing;
      const moving = Math.min(1, speed / 5);
      const sleeping = mode === "sleep";
      const squishing = now < squishUntil;
      const hx = Math.round(head.x);
      const hy = Math.round(head.y + (moving > 0.3 ? Math.round(Math.sin(t * 14) * 0.5) : 0));
      const centers: { x: number; y: number; r: number }[] = [{ x: hx, y: hy, r: R0 }];
      for (let i = 1; i < SEGS; i++) {
        const r = radius(i) * (squishing ? 0.85 : 1) + (sleeping && !still ? Math.sin(t * 2.2) * 0.2 : 0);
        const hump = Math.round(Math.max(0, Math.sin(t * 8 - i * 1.1)) * 2 * moving);
        const c = { x: hx - f * Math.round(i * SPACING), y: hy + Math.round(R0 - r) - hump, r };
        centers.push(c);
        segs[i].x = c.x;
        segs[i].y = c.y;
      }
      const groundY = hy + R0 + 2;
      const tail = centers[SEGS - 1];
      const lt = trail[trail.length - 1];
      if (speed > 1 && (!lt || Math.abs(lt.x - tail.x) + Math.abs(lt.y - groundY) > 4))
        trail.push({ x: tail.x, y: groundY, t: now });
      while (trail.length && now - trail[0].t > 4000) trail.shift();

      // ---- rasterise into tiles ----
      cells.clear();

      // night sky in the empty space: stars, the moon, fireflies
      if (night > 0.02) {
        for (const st of stars) {
          const a = night * (0.35 + 0.65 * Math.max(0, Math.sin(t * 1.3 + st.p)));
          put(st.x, st.y, `rgba(255,246,214,${a})`);
          if (st.big) for (const [ox, oy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) put(st.x + ox, st.y + oy, `rgba(255,246,214,${a * 0.35})`);
        }
        if (moon) {
          for (let gy = -7; gy <= 7; gy++)
            for (let gx = -7; gx <= 7; gx++) {
              const d = Math.hypot(gx, gy);
              const cut = Math.hypot(gx - 2, gy + 1.5) < 4.2; // bite out of the disc = crescent
              if (d <= 4.4 && !cut) put(moon.x + gx, moon.y + gy, `rgba(255,243,196,${night})`);
              else if (d > 4.4 && d < 6.6 && !cut) put(moon.x + gx, moon.y + gy, `rgba(255,243,196,${0.07 * night})`);
            }
        }
      }

      // a round bush behind the pond (the water paints over its base)
      if (pond) {
        const { cx, cy, rx, ry } = pond;
        const blobs: [number, number, number][] = [
          [-0.78, -0.75, 5],
          [-0.55, -0.95, 4],
          [-0.98, -0.45, 4],
        ];
        for (const [bx0, by0, br] of blobs) {
          const bx = Math.round(cx + bx0 * rx);
          const by = Math.round(cy + by0 * ry);
          for (let gy = -br; gy <= br; gy++)
            for (let gx = -br; gx <= br; gx++) {
              const dd = (gx * gx + gy * gy) / (br * br);
              if (dd > 1) continue;
              const light = (-gx - gy) / br;
              put(bx + gx, by + gy, dd > 0.75 ? LEAF[0] : light > 0.6 ? LEAF[3] : light > -0.3 ? LEAF[2] : LEAF[1]);
            }
        }
        const buds: [number, number][] = [[-0.7, -1.05], [-0.92, -0.62], [-0.5, -0.8]];
        for (const [ux, uy] of buds) put(Math.round(cx + ux * rx), Math.round(cy + uy * ry), LOTUS[1]);
      }

      // the pond: faint mosaic water with slow light streaks
      if (pond) {
        const { cx, cy, rx, ry } = pond;
        for (let gy = -ry; gy <= ry; gy++)
          for (let gx = -rx; gx <= rx; gx++) {
            const dd = (gx / rx) ** 2 + (gy / ry) ** 2;
            if (dd > 1) continue;
            const depth = 0.16 + Math.max(0, gy / ry) * 0.08;
            const wr = Math.round(92 - 50 * night), wg = Math.round(170 - 85 * night), wb = Math.round(128 - 8 * night);
            put(cx + gx, cy + gy, dd > 0.8 ? `rgba(${wr - 20},${wg - 25},${wb},${0.32 + 0.15 * night})` : `rgba(${wr},${wg},${wb},${depth + 0.12 * night})`);
          }
        if (!still)
          for (let k = 0; k < 3; k++) {
            const span = rx * 1.4;
            const sx = cx - rx * 0.7 + ((t * 1.6 + k * 11) % span);
            const sy = Math.round(cy + (k - 1) * ry * 0.45);
            for (let i = 0; i < 3; i++) if (inPond(sx + i, sy)) put(sx + i, sy, "rgba(255,255,255,0.55)");
          }
      }

      if (pond && night > 0.05) {
        // moonlight on the water
        const mx = Math.round(pond.cx + pond.rx * 0.35);
        for (let k = 0; k < 3; k++) {
          const w = 4 - k + (still ? 0 : Math.round(Math.sin(t * 2 + k) * 1));
          const y = Math.round(pond.cy - pond.ry * 0.5 + k * 2);
          for (let i = -w; i <= w; i++) if (inPond(mx + i, y)) put(mx + i, y, `rgba(255,243,196,${0.55 * night})`);
        }
      }

      // ripples spreading from the leaves, kept inside the pond
      for (let k = ripples.length - 1; k >= 0; k--) {
        const rp = ripples[k];
        const age = (now - rp.t) / 2200;
        if (age >= 1) {
          ripples.splice(k, 1);
          continue;
        }
        const rx = rp.r + 1 + age * 5;
        const ry = rx * 0.6;
        const col = `rgba(47,107,69,${0.3 * (1 - age)})`;
        const steps = Math.ceil(rx * 7);
        for (let s = 0; s < steps; s++) {
          const a = (s / steps) * Math.PI * 2;
          const x = Math.round(rp.x + Math.cos(a) * rx);
          const y = Math.round(rp.y + Math.sin(a) * ry);
          if (inPond(x, y)) put(x, y, col);
        }
      }

      // lotus leaves, drawn before the keeda so it crawls over them
      for (const l of flowers) {
        const bob = still ? 0 : Math.round(Math.sin(t * 0.9 + l.phase) * 0.6);
        const ry = l.r * 0.7;
        const cy = l.y + bob;
        for (let gy = Math.floor(-ry) - 1; gy <= Math.ceil(ry) + 1; gy++)
          for (let gx = -l.r - 1; gx <= l.r + 1; gx++) {
            const nx = gx / l.r;
            const ny = gy / ry;
            const dd = nx * nx + ny * ny;
            if (dd > 1) continue;
            // the notch: a thin wedge cut from the centre to the rim
            const ang = Math.atan2(ny, nx);
            let da = Math.abs(ang - l.notch) % (Math.PI * 2);
            if (da > Math.PI) da = Math.PI * 2 - da;
            if (da < 0.32 && dd > 0.04) continue;
            const inside = (ax: number, ay: number) => (ax / l.r) ** 2 + (ay / ry) ** 2 <= 1;
            let col: string;
            if (!inside(gx + 1, gy) || !inside(gx - 1, gy) || !inside(gx, gy + 1) || !inside(gx, gy - 1)) col = LEAF[0];
            else {
              const light = -0.4 * nx - 0.8 * ny;
              col = light > 0.6 ? LEAF[3] : light > -0.35 ? LEAF[2] : LEAF[1];
              // faint veins radiating from the centre
              const vein = Math.abs(Math.sin((ang - l.notch) * 3));
              if (vein < 0.1 && dd > 0.12 && dd < 0.75) col = LEAF[1];
            }
            put(l.x + gx, cy + gy, col);
          }
        put(l.x, cy, LEAF[0]);
        if (l.bud && night > 0.5) {
          // closed for the night
          const bx = l.x;
          const by = cy - Math.round(ry * 0.25);
          put(bx, by - 4, LOTUS[0]);
          put(bx - 1, by - 3, LOTUS[1]); put(bx, by - 3, LOTUS[0]); put(bx + 1, by - 3, LOTUS[1]);
          put(bx - 1, by - 2, LOTUS[2]); put(bx, by - 2, LOTUS[1]); put(bx + 1, by - 2, LOTUS[2]);
          put(bx, by - 1, LEAF[1]);
        } else if (l.bud) {
          // a small pink lotus sitting on the leaf
          const bx = l.x;
          const by = cy - Math.round(ry * 0.25);
          const sway = still ? 0 : Math.round(Math.sin(t * 1.4 + l.phase) * 0.5);
          put(bx + sway, by - 4, LOTUS[0]);
          put(bx - 1 + sway, by - 3, LOTUS[1]); put(bx + sway, by - 3, LOTUS[0]); put(bx + 1 + sway, by - 3, LOTUS[1]);
          put(bx - 2, by - 2, LOTUS[1]); put(bx - 1, by - 2, LOTUS[0]); put(bx, by - 2, LOTUS[3]);
          put(bx + 1, by - 2, LOTUS[0]); put(bx + 2, by - 2, LOTUS[1]);
          put(bx - 2, by - 1, LOTUS[2]); put(bx - 1, by - 1, LOTUS[1]); put(bx, by - 1, LOTUS[1]);
          put(bx + 1, by - 1, LOTUS[1]); put(bx + 2, by - 1, LOTUS[2]);
        }
        const near = Math.abs(l.x - head.x) < l.r + 10 && Math.abs(l.y - head.y) < 10;
        if (!still && near && speed > 2 && now - l.rippleAt > 1800) dropPetal(l, now);
      }
      if (!still && flowers.length && Math.random() < dt / 2.5) {
        const l = pick(flowers);
        if (now - l.rippleAt > 3000) dropPetal(l, now);
      }
      // plants growing on the page's ground (page bottom and tops of text blocks)
      for (const pl of plants) {
        const sway = still ? 0 : Math.round(Math.sin(t * 1.2 + pl.phase) * 0.7);
        const tuft = (x: number, y: number, hgt: number, ph: number) => {
          const sw = still ? 0 : Math.round(Math.sin(t * 1.5 + ph) * 0.6);
          for (let i = 0; i < hgt; i++) {
            put(x + (i === hgt - 1 ? sw : 0), y - i, i === 0 ? LEAF[1] : LEAF[2]);
            if (i < hgt - 1) {
              put(x - 1 - (i > 1 ? 1 : 0), y - i, LEAF[1]);
              put(x + 1 + (i > 1 ? 1 : 0), y - i, LEAF[3]);
            }
          }
        };
        if (pl.kind >= 4) {
          // a fern with a tuft and maybe a daisy
          const len = pl.kind === 4 ? 10 : 8;
          for (let i = 0; i < len; i++) {
            const sw = still ? 0 : Math.sin(t * 1.2 + pl.phase) * (i / len) * 1.2;
            const x = Math.round(pl.x + pl.flip * ((i * i) / (len * 1.8)) + sw);
            const y = pl.y - i;
            put(x, y, LEAF[0]);
            if (i % 2 === 1 && i < len - 1) {
              const L = Math.max(1, Math.round(Math.sin((Math.PI * i) / len) * 3));
              for (let k = 1; k <= L; k++) {
                put(x - k, y + (k > 1 ? 1 : 0), LEAF[2]);
                put(x + k, y + (k > 1 ? 1 : 0), LEAF[3]);
              }
            }
          }
          tuft(pl.x - pl.flip * 4, pl.y, 3, pl.phase + 1);
          if (pl.kind === 5) {
            const dx = pl.x + pl.flip * 5;
            for (let i = 1; i < 4; i++) put(dx, pl.y - i + 1, LEAF[1]);
            put(dx, pl.y - 4, "#ffffff"); put(dx - 1, pl.y - 3, "#ffffff"); put(dx + 1, pl.y - 3, "#ffffff"); put(dx, pl.y - 2, "#ffffff");
            put(dx, pl.y - 3, "#f6cf63");
          }
          continue;
        }
        const art = PLANT_ART[pl.kind];
        const w = art[0].length;
        art.forEach((row, ry2) => {
          const off = ry2 < art.length / 2 ? sway : 0;
          for (let rx2 = 0; rx2 < row.length; rx2++) {
            const ch = row[pl.flip > 0 ? rx2 : row.length - 1 - rx2];
            if (ch === ".") continue;
            const c =
              ch === "c" ? LEAF[3] : ch === "b" ? LEAF[2] : ch === "s" ? LEAF[1] : ch === "r" ? "#e07a6a" : ch === "w" ? "#fff7ee" : ch === "m" ? "#efe3cc" : LEAF[0];
            put(pl.x - Math.floor(w / 2) + rx2 + off, pl.y - (art.length - 1) + ry2, c);
          }
        });
        if (pl.kind !== 2) tuft(pl.x + pl.flip * (Math.floor(w / 2) + 2), pl.y, 3, pl.phase + 2);
      }

      if (pond) {
        const { cx, cy, rx, ry } = pond;
        // ferns curling out on both sides
        const fern = (x0: number, y0: number, dir: number, len: number, ph: number) => {
          for (let i = 0; i < len; i++) {
            const sway = still ? 0 : Math.sin(t * 1.2 + ph) * (i / len) * 1.2;
            const x = Math.round(x0 + dir * ((i * i) / (len * 1.6)) + sway);
            const y = y0 - i;
            put(x, y, LEAF[0]);
            if (i % 2 === 1 && i < len - 1) {
              const L = Math.max(1, Math.round(Math.sin((Math.PI * i) / len) * 3));
              for (let k = 1; k <= L; k++) {
                put(x - k, y + (k > 1 ? 1 : 0), LEAF[2]);
                put(x + k, y + (k > 1 ? 1 : 0), LEAF[3]);
              }
            }
          }
        };
        fern(cx - rx - 3, cy + 2, -1, 11, 0.4);
        fern(cx + rx + 2, cy + Math.round(ry * 0.6), 1, 9, 1.3);

        // mossy stones on the right bank
        const stone = (x: number, y: number, w: number) => {
          for (let gx = -w; gx <= w; gx++)
            for (let gy = -2; gy <= 1; gy++) {
              if ((gx / (w + 0.5)) ** 2 + ((gy + 0.5) / 2) ** 2 > 1) continue;
              put(x + gx, y + gy, gy === -2 || (gy === -1 && Math.abs(gx) < w - 1) ? LEAF[3] : gy === 1 ? "#7e877f" : "#9aa39a");
            }
        };
        stone(Math.round(cx + rx * 0.72), Math.round(cy + ry * 0.92), 3);
        stone(Math.round(cx + rx * 0.95), Math.round(cy + ry * 0.6), 2);

        // grass tufts and daisies along the bank
        for (const tf of tufts) {
          const sway = still ? 0 : Math.round(Math.sin(t * 1.5 + tf.phase) * 0.6);
          for (let i = 0; i < tf.h; i++) {
            const top = i >= tf.h - 1 ? sway : 0;
            put(tf.x + top, tf.y - i, i === 0 ? LEAF[1] : LEAF[2]);
            if (i < tf.h - 1) {
              put(tf.x - 1 - (i > 1 ? 1 : 0), tf.y - i, LEAF[1]);
              put(tf.x + 1 + (i > 1 ? 1 : 0), tf.y - i, LEAF[3]);
            }
          }
        }
        for (const d of daisies) {
          for (let i = 1; i < d.h; i++) put(d.x, d.y - i, LEAF[1]);
          const hy = d.y - d.h;
          put(d.x, hy - 1, d.c); put(d.x - 1, hy, d.c); put(d.x + 1, hy, d.c); put(d.x, hy + 1, d.c);
          put(d.x, hy, "#f6cf63");
        }

        // a frog on a leaf: croaks now and then, hops away when the keeda comes close
        const pads = flowers;
        if (pads.length > 3) {
          const padPos = (i: number) => ({ x: pads[i].x, y: pads[i].y - 2 });
          const hopT = (now - frog.hopAt) / 600;
          if (hopT >= 1) frog.from = frog.to;
          const kNear = Math.hypot(head.x - pads[frog.to].x, head.y - pads[frog.to].y) < 18;
          const cNear = cursorLive && Math.hypot(pNow.x - pads[frog.to].x, pNow.y - pads[frog.to].y) < 14;
          void cNear;
          if (night > 0.5 && kNear) disturbFrog(now);
          const frogAsleep = night > 0.5 && now > frog.awakeUntil;
          if (!still && hopT >= 1 && (kNear || (now > frog.nextHop && !frogAsleep))) {
            frog.to = [1, 3, 0, 2].filter((i) => i !== frog.from)[Math.floor(Math.random() * 3)];
            frog.hopAt = now;
            frog.nextHop = now + 15000 + Math.random() * 15000;
            if (kNear) ripples.push({ x: pads[frog.from].x, y: pads[frog.from].y, r: 2, t: now });
          }
          const A = padPos(frog.from);
          const B = padPos(frog.to);
          const k = Math.min(1, Math.max(0, hopT));
          const fx = Math.round(A.x + (B.x - A.x) * k);
          const fy = Math.round(A.y + (B.y - A.y) * k - Math.sin(k * Math.PI) * 6);
          const FROG = [".OO.OO.", "OEWOWEO", "OGGGGGO", "GBBBBBG", "OO...OO"];
          FROG.forEach((row, ry2) => {
            for (let rx2 = 0; rx2 < row.length; rx2++) {
              const ch = row[rx2];
              if (ch === ".") continue;
              let c = ch === "O" ? "#4f7a24" : ch === "E" ? EYE : ch === "W" ? "#a9d35a" : ch === "B" ? "#eef5c4" : "#a9d35a";
              if (frogAsleep && ch === "E") c = "#4f7a24"; // eyes shut
              put(fx - 3 + rx2, fy - 4 + ry2, c);
            }
          });
          if (!still && now > frog.croakAt && k >= 1 && !frogAsleep) {
            if (now > frog.croakAt + 600) frog.croakAt = now + 4000 + Math.random() * 5000;
            else for (let gx = -1; gx <= 1; gx++) { put(fx + gx, fy, "#f3e9a8"); put(fx + gx, fy + 1, "#f3e9a8"); }
          }
          if (frogAsleep && !still) {
            const ph = (t * 0.3) % 1;
            put(fx + 3 + ph * 3, fy - 6 - ph * 4, `rgba(165,227,181,${(1 - ph) * night})`);
            put(fx + 4 + ph * 3, fy - 6 - ph * 4, `rgba(165,227,181,${(1 - ph) * night})`);
          }
        }

        // a dragonfly: patrols by day, rests on a reed at night until startled
        {
          const rd = pond.reeds[1];
          const rest = { x: rd.x + 2, y: rd.y - rd.h + 2 };
          const resting = still || (night > 0.5 && now > dfly.flyUntil);
          const fly = {
            x: cx + Math.sin(t * 0.55) * rx * 0.75 + Math.sin(t * 2.1) * 2,
            y: cy - ry * 0.95 + Math.cos(t * 0.9) * ry * 0.55,
          };
          const goal = resting ? rest : fly;
          if (!dfly.init) Object.assign(dfly, goal, { init: true });
          dfly.x += (goal.x - dfly.x) * Math.min(1, dt * 2.5);
          dfly.y += (goal.y - dfly.y) * Math.min(1, dt * 2.5);
          const dir = resting ? -1 : Math.cos(t * 0.55) >= 0 ? 1 : -1;
          const x = Math.round(dfly.x);
          const y = Math.round(dfly.y);
          for (let i = 0; i < 5; i++) put(x - dir * i, y, i === 0 ? "#2f6f78" : "#3a96a3");
          const wing = "rgba(170,215,230,0.85)";
          if (resting) {
            for (const i of [1, 2, 3]) put(x - dir * i, y - 1, wing); // wings folded flat
          } else {
            const flap = Math.sin(t * 40) > 0 ? -1 : 0;
            put(x - dir * 1, y - 1 + flap, wing); put(x - dir * 2, y - 1 + flap, wing);
            put(x - dir * 1, y + 1 - flap, wing); put(x - dir * 2, y + 1 - flap, wing);
          }
        }
      }

      // reeds and cattails at the back of the pond
      if (pond)
        for (const rd of pond.reeds) {
          for (let i = 0; i < rd.h; i++) {
            const sway = still ? 0 : Math.round(Math.sin(t * 1.1 + rd.phase) * (i / rd.h) * 1.4);
            const top = i >= rd.h - 3;
            put(rd.x + sway, rd.y - i, top ? (i === rd.h - 1 ? "#a06a45" : "#8a5a3b") : LEAF[1]);
          }
          for (let i = 1; i <= 4; i++) put(rd.x - i, rd.y - i - 1, LEAF[2]);
        }

      // fireflies: drift around the plants, scatter from the cursor, never onto text
      if (night > 0.3) {
        for (const fl of flies) {
          if (!still) {
            fl.vx += (Math.random() - 0.5) * dt * 6;
            fl.vy += (Math.random() - 0.5) * dt * 6;
            if (cursorLive) {
              const dx = fl.x - pNow.x;
              const dy = fl.y - pNow.y;
              const d = Math.hypot(dx, dy);
              if (d < 16 && d > 0.1) {
                fl.vx += (dx / d) * dt * 40;
                fl.vy += (dy / d) * dt * 40;
              }
            }
            const sp = Math.hypot(fl.vx, fl.vy);
            const max = cursorLive ? 9 : 2.5;
            if (sp > max) {
              fl.vx *= max / sp;
              fl.vy *= max / sp;
            }
            const nx = fl.x + fl.vx * dt;
            const ny = fl.y + fl.vy * dt;
            if (rectFree(Math.floor(nx) - 1, Math.floor(ny) - 1, Math.floor(nx) + 1, Math.floor(ny) + 1)) {
              fl.x = nx;
              fl.y = ny;
            } else {
              fl.vx = -fl.vx;
              fl.vy = -fl.vy;
            }
          }
          const glow = night * Math.max(0, Math.sin(t * 1.7 + fl.p)) ** 2;
          if (glow < 0.05) continue;
          put(fl.x, fl.y, `rgba(255,240,140,${glow})`);
          for (const [ox, oy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) put(fl.x + ox, fl.y + oy, `rgba(255,240,140,${glow * 0.3})`);
        }
      }

      for (const p of trail) if (fits(p.x, p.y - R0 - 2)) put(p.x, p.y, `rgba(59,122,82,${0.18 * (1 - (now - p.t) / 4000)})`);
      for (let x = Math.min(hx, tail.x) - 3; x <= Math.max(hx, tail.x) + 3; x++) put(x, groundY, "rgba(43,39,34,0.06)");

      // everything from here to the face is "keeda", tracked for its outline
      keedaCells.clear();
      drawingKeeda = true;
      for (let i = 1; i < SEGS; i++) {
        const c = centers[i];
        const up = c.y < hy + Math.round(R0 - c.r) ? 1 : 0;
        const by = c.y + Math.floor(c.r) + 1 - up;
        put(c.x - 1, by, BODY[0]);
        put(c.x + 1, by, BODY[0]);
      }

      for (let i = SEGS - 1; i >= 0; i--) {
        const { x: cx, y: cy, r } = centers[i];
        const r2 = r * r + 0.3;
        const inside = (x: number, y: number) => (x - cx) ** 2 + (y - cy) ** 2 <= r2;
        const n = Math.ceil(r) + 1;
        for (let gx = cx - n; gx <= cx + n; gx++)
          for (let gy = cy - n; gy <= cy + n; gy++) {
            if (!inside(gx, gy)) continue;
            const edge = !inside(gx + 1, gy) || !inside(gx - 1, gy) || !inside(gx, gy + 1) || !inside(gx, gy - 1);
            let col: string;
            if (edge) col = BODY[0];
            else {
              const dx = ((gx - cx) / r) * f;
              const dy = (gy - cy) / r;
              const light = -0.45 * dx - 0.75 * dy;
              col = light > 0.55 ? BODY[4] : light > 0.15 ? BODY[3] : light > -0.35 ? BODY[2] : BODY[1];
              if (i > 0 && i % 2 === 1 && gy - cy === -Math.round(r) + 2 && gx === cx) col = SPOT;
            }
            put(gx, gy, col);
          }
      }

      // face, hand-placed (drawn facing right, mirrored by f)
      const P = (dx: number, dy: number, c: string) => put(hx + dx * f, hy + dy, c);
      const bob = still ? 0 : Math.round(Math.sin(t * 4) * 0.8 + moving * Math.sin(t * 16) * 0.5);
      P(0, -6, BODY[0]); P(0, -7, BODY[0]); P(-1, -8, BODY[0]);
      for (const [x, y] of [[-2, -9], [-1, -9], [-2, -10], [-1, -10]]) P(x + bob, y, TIP);
      P(3, -6, BODY[0]); P(4, -7, BODY[0]); P(4, -8, BODY[0]);
      for (const [x, y] of [[4, -9], [5, -9], [4, -10], [5, -10]]) P(x - bob, y, TIP);

      const blinking = now > blinkAt && now < blinkAt + 140;
      if (now > blinkAt + 140) blinkAt = now + 2500 + Math.random() * 3500;
      if (sleeping || blinking || squishing) {
        P(1, -1, EYE); P(2, 0, EYE); P(3, -1, EYE);
      } else {
        for (const [x, y] of [[2, -3], [1, -2], [2, -2], [3, -2], [1, -1], [2, -1], [3, -1], [2, 0]]) P(x, y, EYE);
        P(1, -2, SHINE);
        P(3, -1, "#6e655c");
      }
      P(0, 2, BLUSH); P(-1, 2, BLUSH);
      P(2, 2, EYE); P(3, 3, EYE); P(4, 2, EYE);

      drawingKeeda = false;
      // thin page-coloured outline so it stays readable on top of a leaf
      keedaCells.forEach((k) => {
        for (const d of [1, -1, BIG, -BIG]) {
          const n = k + d;
          if (!keedaCells.has(n) && cells.has(n)) cells.set(n, "HALO");
        }
      });

      if (sleeping && !still)
        for (let k = 0; k < 3; k++) {
          const ph = (t * 0.35 + k / 3) % 1;
          for (const [zx, zy] of ZED) put(hx + 7 + ph * 5 + zx, hy - 9 - ph * 5 + zy, night > 0.5 ? `rgba(220,240,225,${1 - ph})` : `rgba(110,170,130,${1 - ph})`);
        }
      for (let k = hearts.length - 1; k >= 0; k--) {
        const h = hearts[k];
        const ph = (now - h.t) / 900;
        if (ph >= 1) {
          hearts.splice(k, 1);
          continue;
        }
        for (const [x, y] of HEART) put(h.x - 2 + x, h.y - ph * 6 + y, `rgba(240,128,152,${1 - ph})`);
      }

      // ---- draw visible tiles ----
      const sx = window.scrollX;
      const sy = window.scrollY;
      const q = Math.round(night * 20) / 20;
      const halo = `rgb(${Math.round(245 + (15 - 245) * q)},${Math.round(241 + (23 - 241) * q)},${Math.round(232 + (25 - 232) * q)})`;
      cells.forEach((c, k) => {
        const px = (k % BIG) * T - sx;
        const py = Math.floor(k / BIG) * T - sy;
        if (px < -T || py < -T || px > window.innerWidth || py > window.innerHeight) return;
        ctx.fillStyle = c === "HALO" ? halo : tint(c, keedaCells.has(k) ? Math.round(q * 6) / 20 : q);
        ctx.fillRect(px + 0.5, py + 0.5, T - 1, T - 1);
      });

      if (now < bubbleUntil) {
        bubble.style.opacity = "1";
        bubble.style.transform = `translate(${(hx + 7) * T - sx}px, ${(hy - 15) * T - sy}px)`;
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(mapTimer);
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("toggle", refreshMap, true);
      document.removeEventListener("scroll", onListScroll, true);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="keeda-canvas" aria-hidden="true" />
      <span ref={bubbleRef} className="keeda-bubble" aria-hidden="true" />
    </>
  );
}
