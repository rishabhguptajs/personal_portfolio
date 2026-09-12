"use client";
import { useEffect, useState } from "react";
export default function MotionToggle() {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setPaused(media.matches);
      document.documentElement.dataset.motion = media.matches
        ? "paused"
        : "running";
      window.dispatchEvent(new Event("portfolio-motion-change"));
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return (
    <button
      className="motion-toggle"
      aria-pressed={paused}
      aria-label={
        paused ? "Resume decorative motion" : "Pause decorative motion"
      }
      title={paused ? "Resume motion" : "Pause motion"}
      onClick={() => {
        const next = !paused;
        setPaused(next);
        document.documentElement.dataset.motion = next ? "paused" : "running";
        window.dispatchEvent(new Event("portfolio-motion-change"));
      }}
    >
      <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
    </button>
  );
}
