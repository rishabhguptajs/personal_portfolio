import type { ProjectArtKind } from "../constants/data";
export function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 100 100"
      fill="none"
    >
      {Array.from({ length: 8 }, (_, i) => (
        <path
          key={i}
          d="M50 5V95"
          stroke="currentColor"
          strokeWidth="12"
          transform={`rotate(${i * 22.5} 50 50)`}
        />
      ))}
    </svg>
  );
}
const labels: Record<ProjectArtKind, string> = {
  earshot: "INTENT → SCOPE → ACTION",
  sparebar: "THE TIME BETWEEN THINGS",
  paisa: "WORDS IN. NUMBERS OUT.",
  harness: "TRUST, UNDER TEST.",
  pos: "BUILT FOR THE REAL WORLD",
  vectors: "MAKE THE INVISIBLE VISIBLE",
  research: "QUESTION → SEARCH → SYNTHESISE",
  terminal: "YOUR WORDS. SHELL COMMANDS.",
  rahi: "TAKE THE SCENIC ROUTE.",
  publishing: "A PLACE FOR YOUR WORDS",
  backend: "UNDER THE SURFACE",
  pantry: "A LITTLE LESS WASTE",
};
export function ProjectArt({ kind }: { kind: ProjectArtKind }) {
  return (
    <div className={`project-art specimen-${kind}`} aria-hidden="true">
      <span className="specimen-corner">RG / SOFTWARE OBJECT</span>
      {kind === "earshot" ? (
        <>
          <div className="sound-rings">
            {[0, 1, 2, 3, 4].map((i) => (
              <i key={i} />
            ))}
          </div>
          <div className="earshot-word">
            ear<span>shot</span>
            <b>◉</b>
          </div>
          <span className="art-small-note">
            listening is
            <br />a feature.
          </span>
        </>
      ) : kind === "sparebar" ? (
        <>
          <div className="sparebar-orbit" />
          <div className="sparebar-word">
            spare
            <br />
            <em>bar.</em>
          </div>
          <span className="sparebar-sticker">
            IDLE ≠<br />
            USELESS
          </span>
        </>
      ) : kind === "paisa" ? (
        <>
          <div className="paisa-receipt">
            <span>PAISATRACK / ONE SMALL HABIT</span>
            <strong>₹</strong>
            <i>words → transactions</i>
            <div className="receipt-bars" />
          </div>
          <span className="paisa-scribble">
            make it
            <br />
            add up. ↗
          </span>
        </>
      ) : kind === "harness" ? (
        <>
          <div className="harness-grid">
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i}>
                M{i + 1}
                <b>{["↗", "{ }", "?", "↳", "↻", "✓", "→", "!"][i]}</b>
              </span>
            ))}
          </div>
          <span className="harness-word">toolharness_</span>
        </>
      ) : kind === "pos" ? (
        <>
          <div className="pos-label">
            <span>CHINA BAZAR</span>
            <strong>12</strong>
            <span>MODULES. ONE SYSTEM.</span>
          </div>
          <div className="pos-receipt">
            BILLING
            <br />
            INVENTORY
            <br />
            ACCOUNTING
            <br />
            ──────────
            <br />
            <b>OFFLINE FIRST.</b>
          </div>
        </>
      ) : kind === "vectors" ? (
        <>
          <svg viewBox="0 0 600 340">
            <g stroke="currentColor" strokeWidth=".6" opacity=".3">
              {Array.from({ length: 12 }, (_, i) => (
                <path
                  key={i}
                  d={`M${80 + i * 30} 30L${550 - i * 18} 310M30 ${40 + i * 19}L570 ${300 - i * 15}`}
                />
              ))}
            </g>
            {Array.from({ length: 56 }, (_, i) => (
              <circle
                key={i}
                cx={70 + ((i * 83) % 460)}
                cy={35 + ((i * 47) % 260)}
                r={i % 7 === 0 ? 8 : 3}
                fill={i % 3 === 0 ? "#c0472c" : "currentColor"}
              />
            ))}
          </svg>
          <b className="vector-word">[pg]</b>
        </>
      ) : (
        <>
          <div className="generic-orbits">
            <i />
            <i />
            <i />
          </div>
          <b className="generic-glyph">
            {
              {
                research: "◎",
                terminal: ">_",
                rahi: "rahi↗",
                publishing: "Aa",
                backend: "{ }",
                pantry: "⊕",
              }[kind]
            }
          </b>
        </>
      )}
      <span className="art-label">{labels[kind]}</span>
    </div>
  );
}
