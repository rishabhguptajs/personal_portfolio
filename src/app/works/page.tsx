import type { Metadata } from "next";
import ProjectArchive from "../components/ProjectArchive";
import { Asterisk, ProjectArt } from "../components/Artwork";
import { funProjects } from "../constants/data";
export const metadata: Metadata = { title: "Works — The output archive" };
export default function Works() {
  return (
    <main id="main" className="shell">
      <section className="route-hero archive-hero evidence-hero">
        <p className="eyebrow" data-reveal>
          01 / THE EVIDENCE ROOM / ORIGINAL BUILDS
        </p>
        <h1 data-reveal>
          IDEAS ARE
          <br />
          <em>cheap.</em>
          <span className="evidence-note">
            HERE’S WHAT
            <br />I DID WITH MINE. ↘
          </span>
        </h1>
        <div className="evidence-collage" aria-hidden="true">
          <div>
            <ProjectArt kind="earshot" />
          </div>
          <div>
            <ProjectArt kind="sparebar" />
          </div>
          <span>
            EXHIBIT
            <br />
            A—Z
          </span>
        </div>
        <div className="evidence-intro" data-reveal>
          <p>
            Agents that act. Tools that measure. Products that meet the real
            world. A collection of my own work, with recent builds up front.
          </p>
          <span className="eyebrow">OPEN AN ENTRY. LOOK UNDER THE HOOD. ↓</span>
        </div>
      </section>
      <ProjectArchive />
      <section className="section-space">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE SIDE QUESTS</p>
            <h2>
              Just because
              <br />
              <em>I wondered.</em>
            </h2>
          </div>
          <Asterisk className="w-24 h-24 accent" />
        </div>
        {funProjects.map((project, i) => (
          <a
            className="experiment-row"
            href={project.github}
            key={project.name}
            target="_blank"
            rel="noopener noreferrer"
            data-scroll
          >
            <span className="experiment-symbol" aria-hidden="true">
              {i === 0 ? "⇄" : "▦"}
            </span>
            <div>
              <span className="eyebrow">EXPERIMENT / 0{i + 1}</span>
              <h3>{project.name}</h3>
              <p>{project.desc}</p>
              <span className="eyebrow block mt-5">
                {project.tech.join(" / ")}
              </span>
            </div>
            <span className="text-4xl">↗</span>
          </a>
        ))}
      </section>
    </main>
  );
}
