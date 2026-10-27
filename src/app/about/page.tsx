import type { Metadata } from "next";
import { technologies, languages, tools, corePrinciples } from "../constants/data";
import { ext, resume } from "../constants/site";

export const metadata: Metadata = { title: "about" };

const path = [
  {
    when: "now",
    what: "full stack dev at a startup. moved the frontend from vue to next.js and typescript, built the customer portal, an accounting sync, an invoice ocr pipeline and an ai copilot for agreements.",
  },
  {
    when: "earlier",
    what: "a few internships. docs and a whitepaper, and frontend work with redux and react flow.",
  },
  {
    when: "2024",
    what: "an ai fellowship. led five ai projects and shipped a saas on llama 3.1 with a paywall.",
  },
];

export default function About() {
  return (
    <main id="main" className="k-main k-page k-fixed">
      <h1 className="k-title">~/about</h1>
      <p className="k-lede">a small field guide to the keeda.</p>

      <div className="k-scroll" tabIndex={0} aria-label="About">
        <p>
          i&apos;m a full stack dev. most of my work is real production software: warehouse tools, customer portals and ai
          workflows. i like owning a thing end to end, from the ui down to the database.
        </p>
        <p>
          on the side i build stuff around how people and ai work together. earshot is a coding agent, toolharness checks
          agents, sparebar makes ugc, recall searches my mac and paisatrack tracks my money. i like tools that are
          actually useful, and i like knowing when the model should do the work and when plain code should.
        </p>
        <p>
          <a href={resume} {...ext}>
            my résumé ↗
          </a>
        </p>

        <h2 className="k-h2">the path so far</h2>
        <ul className="k-list k-plain">
          {path.map((s) => (
            <li key={s.when}>
              <p className="k-meta">{s.when}</p>
              <p>{s.what}</p>
            </li>
          ))}
        </ul>

        <h2 className="k-h2">small wins</h2>
        <ul className="k-list k-plain k-wins">
          <li>
            <b>8th of 250+</b> at hackjnu, jnu delhi. built a vr travel webapp in 36 hours.
          </li>
          <li>
            <b>1,000+</b> signups on a startup project i led during an ai fellowship.
          </li>
          <li>
            <b>b.tech cse</b> at kiet, 2022 to 2026.
          </li>
        </ul>

        <h2 className="k-h2">notes to self</h2>
        <ul className="k-list k-plain k-wins">
          {corePrinciples.map((p) => (
            <li key={p.id}>
              <b>{p.title}</b> {p.description}
            </li>
          ))}
        </ul>

        <h2 className="k-h2">toolbox</h2>
        <p>{technologies.map((t) => t.name).join(" / ")}</p>
        <p className="k-meta">speaks: {languages.join(" / ").toLowerCase()}</p>
        <p className="k-meta">on the desk: {tools.join(" / ").toLowerCase()}</p>
      </div>
    </main>
  );
}
