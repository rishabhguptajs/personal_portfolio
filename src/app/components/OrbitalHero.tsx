"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Link from "next/link";
import gsap from "gsap";
import Portrait from "./Portrait";
import { Asterisk } from "./Artwork";

function LooseNote({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className: string;
  label: string;
}) {
  const position = useRef({ x: 0, y: 0, startX: 0, startY: 0 });
  function start(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== "mouse") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    position.current.startX = event.clientX - position.current.x;
    position.current.startY = event.clientY - position.current.y;
  }
  function move(event: PointerEvent<HTMLButtonElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const x = Math.max(
      -70,
      Math.min(70, event.clientX - position.current.startX),
    );
    const y = Math.max(
      -55,
      Math.min(55, event.clientY - position.current.startY),
    );
    position.current.x = x;
    position.current.y = y;
    gsap.set(event.currentTarget, { x, y });
  }
  function key(event: KeyboardEvent<HTMLButtonElement>) {
    const deltas: Record<string, [number, number]> = {
      ArrowLeft: [-10, 0],
      ArrowRight: [10, 0],
      ArrowUp: [0, -10],
      ArrowDown: [0, 10],
    };
    const delta = deltas[event.key];
    if (event.key === "Escape") {
      position.current.x = 0;
      position.current.y = 0;
      gsap.set(event.currentTarget, { x: 0, y: 0 });
    }
    if (!delta) return;
    event.preventDefault();
    position.current.x = Math.max(
      -70,
      Math.min(70, position.current.x + delta[0]),
    );
    position.current.y = Math.max(
      -55,
      Math.min(55, position.current.y + delta[1]),
    );
    gsap.set(event.currentTarget, {
      x: position.current.x,
      y: position.current.y,
    });
  }
  return (
    <button
      className={`loose-note ${className}`}
      onPointerDown={start}
      onPointerMove={move}
      onKeyDown={key}
      aria-label={`${label}. Drag with a mouse or use arrow keys to move; Escape resets.`}
    >
      {children}
    </button>
  );
}

export default function OrbitalHero() {
  const [gravity, setGravity] = useState(true);
  const scene = useRef<HTMLDivElement>(null);
  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.motion === "paused"
    )
      return;
    const box = event.currentTarget.getBoundingClientRect();
    gsap.to(".curiosity-object", {
      rotateY: (event.clientX - box.left - box.width / 2) * 0.025,
      rotateX: -(event.clientY - box.top - box.height / 2) * 0.025,
      duration: 1,
      ease: "power2.out",
    });
  }
  return (
    <section className={`orbital-hero ${gravity ? "" : "gravity-off"}`}>
      <div className="shell orbital-meta" data-reveal>
        <span>RISHABH GUPTA © 2026</span>
        <span>FULL STACK / AI SYSTEMS / HAPPY ACCIDENTS</span>
        <span>INDIA ↗ EVERYWHERE</span>
      </div>
      <div
        className="orbital-stage shell"
        ref={scene}
        onPointerMove={tilt}
        onPointerLeave={() =>
          gsap.to(".curiosity-object", { rotateX: 0, rotateY: 0, duration: 1 })
        }
      >
        <h1 className="orbital-name" data-reveal>
          <span>RISHABH</span>
          <span>
            GUPTA
            <span className="name-period" aria-hidden="true">
              ✳
            </span>
          </span>
        </h1>
        <div className="orbit-coordinate coordinate-left" aria-hidden="true">
          IDEAS IN ↘<br />
          ──────────────────
          <br />
          USEFUL THINGS OUT
        </div>
        <div className="curiosity-object" aria-hidden="true">
          <svg viewBox="0 0 600 600" className="orbital-sculpture">
            <defs>
              <radialGradient id="orb-fill" cx="32%" cy="28%" r="80%">
                <stop offset="0" stopColor="#536346" />
                <stop offset=".55" stopColor="#262f21" />
                <stop offset="1" stopColor="#141b12" />
              </radialGradient>
              <clipPath id="orb-clip">
                <circle cx="300" cy="300" r="183" />
              </clipPath>
              <path id="orb-label" d="M300,58 a242,242 0 1,1 -.1,0" />
            </defs>
            <g className="outer-trajectory">
              <ellipse
                cx="300"
                cy="300"
                rx="285"
                ry="100"
                fill="none"
                stroke="#e8e5d9"
                strokeWidth="2"
                transform="rotate(-32 300 300)"
              />
              <circle
                cx="541"
                cy="149"
                r="13"
                fill="#e7ed77"
                stroke="#25261f"
                strokeWidth="2"
              />
            </g>
            <circle
              cx="300"
              cy="300"
              r="184"
              fill="url(#orb-fill)"
              stroke="#dfe98b"
              strokeWidth="2"
            />
            <g
              clipPath="url(#orb-clip)"
              stroke="#dfe98b"
              fill="none"
              opacity=".75"
            >
              <g transform="rotate(-23 300 300)">
                {[28, 65, 105, 147, 182].map((r) => (
                  <ellipse
                    key={r}
                    cx="300"
                    cy="300"
                    rx={r}
                    ry="183"
                    strokeWidth="1"
                  />
                ))}
                {[-140, -95, -47, 0, 47, 95, 140].map((y, i) => (
                  <ellipse
                    key={y}
                    cx="300"
                    cy={300 + y}
                    rx={Math.sqrt(183 * 183 - y * y)}
                    ry={24 + (i % 3) * 6}
                    strokeWidth="1"
                  />
                ))}
              </g>
            </g>
            <g className="orbital-eyes" transform="rotate(-12 300 300)">
              <rect
                x="227"
                y="230"
                width="56"
                height="110"
                rx="28"
                fill="#e7ed77"
              />
              <rect
                x="302"
                y="230"
                width="56"
                height="110"
                rx="28"
                fill="#e7ed77"
              />
              <ellipse cx="262" cy="288" rx="12" ry="23" fill="#25261f" />
              <ellipse cx="337" cy="288" rx="12" ry="23" fill="#25261f" />
              <path
                d="M275 369Q310 390 337 361"
                fill="none"
                stroke="#e7ed77"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </g>
            <path
              d="M59 451C160 481 409 349 541 149"
              fill="none"
              stroke="#e8e5d9"
              strokeWidth="3"
            />
            <g className="orbital-type">
              <text
                fill="currentColor"
                fontFamily="monospace"
                fontSize="12"
                letterSpacing="4"
              >
                <textPath href="#orb-label" startOffset="4%">
                  CURIOSITY IS A RENEWABLE RESOURCE / KEEP BUILDING /{" "}
                </textPath>
              </text>
            </g>
            <g transform="translate(440 405) rotate(12)">
              <path
                d="M0 -30V30M-30 0H30M-21-21L21 21M-21 21L21-21"
                stroke="#e7ed77"
                strokeWidth="13"
              />
            </g>
          </svg>
        </div>
        <LooseNote
          className="note-build"
          label="Build things that should exist"
        >
          <span className="eyebrow">NOTE TO SELF — 001</span>
          <strong>
            BUILD THINGS
            <br />
            THAT <em>SHOULD</em>
            <br />
            EXIST.
          </strong>
          <span className="note-arrow">↗</span>
        </LooseNote>
        <LooseNote className="note-human" label="Human, probably">
          <Asterisk />
          <span>
            100% HUMAN
            <br />
            (probably.)
          </span>
        </LooseNote>
        <div className="orbital-portrait">
          <Portrait />
          <span className="portrait-caption">yes, that’s me. ↗</span>
        </div>
        <span className="orbital-handwriting">
          a little unreasonable.
          <br />
          very intentional.
        </span>
        <div className="orbit-coordinate coordinate-right" aria-hidden="true">
          FIG. 001
          <br />
          THE CURIOSITY ENGINE
          <br />
          DO NOT OVERTHINK IT.
        </div>
        <div className="gravity-control">
          <button
            onClick={() => setGravity((value) => !value)}
            aria-pressed={!gravity}
          >
            <span aria-hidden="true">{gravity ? "⊕" : "⊗"}</span> GRAVITY:{" "}
            {gravity ? "ON" : "OFF"}
          </button>
          <span role="status">
            {gravity ? "Try turning it off." : "Ideas refuse to stay put."}
          </span>
        </div>
      </div>
      <div className="orbital-bottom shell">
        <div>
          <span className="eyebrow">
            SOFTWARE ENGINEER. RELENTLESS BUILDER.
          </span>
          <p>
            I make agents that listen,
            <br />
            tools that earn their keep,
            <br />
            and systems people actually use.
          </p>
        </div>
        <Link href="/works" className="orbital-cta">
          Enter the
          <br />
          <em>work zone.</em>
          <span>↗</span>
        </Link>
        <div className="orbital-current">
          <span className="eyebrow">IN MY ORBIT RIGHT NOW</span>
          <a
            href="https://raegent.com/earshot"
            target="_blank"
            rel="noopener noreferrer"
          >
            Earshot ↗
          </a>
          <a
            href="https://sparebar.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sparebar ↗
          </a>
          <span className="eyebrow">BUILDING @ STOCKAREA</span>
        </div>
      </div>
      <div className="hero-rip" aria-hidden="true" />
    </section>
  );
}
