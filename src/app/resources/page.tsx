import type { Metadata } from "next";
import { resources } from "../constants/data";
export const metadata: Metadata = { title: "Reading room" };
export default function Resources() {
  return (
    <main id="main" className="shell">
      <section className="route-hero">
        <p className="eyebrow" data-reveal>
          MARGINALIA / RESEARCH & REFERENCES
        </p>
        <h1 data-reveal>
          The reading
          <br />
          <em>room.</em>
        </h1>
        <p className="max-w-md mt-8">
          A small shelf of big ideas. Research papers on AI and machine learning
          that feed the work.
        </p>
      </section>
      <section className="pb-24">
        {resources.map((resource, i) => (
          <a
            key={resource.link}
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="resource-row"
            data-scroll
          >
            <span className="eyebrow">0{i + 1} / PAPER</span>
            <div>
              <h2>{resource.title}</h2>
              <p className="mt-4 text-sm">{resource.authors}</p>
            </div>
            <span className="text-4xl">↗</span>
          </a>
        ))}
      </section>
    </main>
  );
}
