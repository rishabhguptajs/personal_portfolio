"use client";
import { useState } from "react";
import { projects, funProjects } from "../constants/data";
import { ext } from "../constants/site";

const SIDE = "side quests";
const types = Array.from(new Set(projects.map((p) => p.type)));
const filters = ["all", ...types, SIDE];

export default function WorksList() {
  const [filter, setFilter] = useState("all");
  const shown = projects.filter((p) => filter === "all" || p.type === filter);
  const showSide = filter === "all" || filter === SIDE;

  return (
    <>
      <div className="k-chips" role="group" aria-label="Filter works">
        {filters.map((f) => (
          <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      <div className="k-scroll" tabIndex={0} aria-label="Works list">
        {shown.length > 0 && (
          <ol className="k-list">
            {shown.map((p, i) => (
              <li key={p.id} id={p.id}>
                <details>
                  <summary>
                    <span className="k-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="k-row-name">{p.name}</span>
                    <span className="k-row-sum">{p.summary}</span>
                    <span className="k-tag">{p.type.toLowerCase()}</span>
                  </summary>
                  <div className="k-detail">
                    <p>{p.desc}</p>
                    <p className="k-meta">
                      {p.tech.join(" / ").toLowerCase()} · {p.status.toLowerCase()}
                    </p>
                    <p className="k-meta k-gap">
                      {p.live && (
                        <a href={p.live} {...ext}>
                          live ↗
                        </a>
                      )}
                      {p.github && (
                        <a href={p.github} {...ext}>
                          code ↗
                        </a>
                      )}
                    </p>
                  </div>
                </details>
              </li>
            ))}
          </ol>
        )}

        {showSide && (
          <>
            <h2 className="k-h2">side quests</h2>
            <p className="k-lede">stuff i built because i was curious.</p>
            <ul className="k-list k-plain">
              {funProjects.map((p) => (
                <li key={p.name}>
                  <a href={p.github} {...ext}>
                    {p.name}
                  </a>
                  <p>{p.desc}</p>
                  <p className="k-meta k-gap">
                    <span>{p.tech.join(" / ").toLowerCase()}</span>
                    {p.live && (
                      <a href={p.live} {...ext}>
                        live ↗
                      </a>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
