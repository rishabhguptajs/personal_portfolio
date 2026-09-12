"use client";
import { useEffect, useState } from "react";
import { projects, contentUpdated } from "../constants/data";
import { ProjectArt } from "./Artwork";
const filters = [
  "All",
  ...Array.from(new Set(projects.map((project) => project.type))),
];
export default function ProjectArchive() {
  useEffect(() => {
    const openTarget = () => {
      const id = window.location.hash.slice(1);
      const el = document.getElementById(id);
      if (el instanceof HTMLDetailsElement) {
        el.open = true;
        el.scrollIntoView({ block: "start" });
      }
    };
    openTarget();
    window.addEventListener("hashchange", openTarget);
    return () => window.removeEventListener("hashchange", openTarget);
  }, []);
  const [filter, setFilter] = useState("All");
  const visible = projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => filter === "All" || project.type === filter);
  return (
    <>
      <p className="eyebrow archive-updated">
        CONTENT REFRESH / {contentUpdated}
      </p>
      <div className="archive-toolbar">
        <div className="flex flex-wrap gap-2" aria-label="Filter projects">
          {filters.map((item) => (
            <button
              key={item}
              aria-pressed={filter === item}
              className="filter-button"
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <span className="eyebrow" role="status">
          {visible.length} OBJECTS FOUND
        </span>
      </div>
      <div className="archive-list">
        {visible.map(({ project, index }) => (
          <details className="archive-entry" id={project.id} key={project.name}>
            <summary>
              <span className="eyebrow">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2>{project.name}</h2>
              <span className="archive-type eyebrow">{project.type}</span>
              <span className="archive-plus" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="archive-detail">
              <ProjectArt kind={project.art} />
              <div className="flex flex-col justify-center gap-6">
                <span className="project-status">{project.status}</span>
                <p>{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span className="tech-tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-6 flex-wrap">
                  {project.github && (
                    <a
                      className="text-link"
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Source code ↗
                    </a>
                  )}
                  {!project.github && !project.live && (
                    <span className="eyebrow">
                      Private client code · Details in résumé
                    </span>
                  )}
                  {project.live && (
                    <a
                      className="text-link"
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open project ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
