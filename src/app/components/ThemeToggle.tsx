"use client";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

// Pixel sun / moon. Shows what you'd switch *to*.
const SUN = ["....#....", ".#.....#.", "...###...", "..#####..", "#.#####.#", "..#####..", "...###...", ".#.....#.", "....#...."];
const MOON = ["...####..", "..##.....", ".##......", ".##......", ".##......", ".##......", ".###.....", "..#####..", "...####.."];

function Pixels({ art }: { art: string[] }) {
  return (
    <svg viewBox="0 0 9 9" width="16" height="16" shapeRendering="crispEdges" aria-hidden="true">
      {art.flatMap((row, y) =>
        row.split("").map((ch, x) => (ch === "#" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" /> : null)),
      )}
    </svg>
  );
}

type VTDocument = Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };

export default function ThemeToggle() {
  const [night, setNight] = useState(false);
  useEffect(() => setNight(document.documentElement.dataset.theme === "night"), []);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = !night;
    const apply = () => {
      document.documentElement.dataset.theme = next ? "night" : "day";
      try {
        localStorage.setItem("theme", next ? "night" : "day");
      } catch {}
      flushSync(() => setNight(next));
    };
    const doc = document as VTDocument;
    if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }
    // night (or day) spreads out from the button in a growing circle
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const vt = doc.startViewTransition(apply);
    vt.ready.then(() =>
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
        { duration: 1100, easing: "cubic-bezier(.6,0,.3,1)", pseudoElement: "::view-transition-new(root)" },
      ),
    );
  };

  return (
    <button className="k-theme" onClick={toggle} aria-label={night ? "Switch to day" : "Switch to night"} title={night ? "good morning" : "goodnight"}>
      <Pixels art={night ? SUN : MOON} />
    </button>
  );
}
