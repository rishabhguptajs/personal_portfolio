import type { Metadata } from "next";
import Link from "next/link";
import Portrait from "../components/Portrait";
import { Asterisk } from "../components/Artwork";
import {
  technologies,
  languages,
  tools,
  corePrinciples,
} from "../constants/data";
import { resume } from "../components/Footer";
export const metadata: Metadata = {
  title: "About — The human behind the code",
};
export default function About() {
  return (
    <main id="main" className="human-page">
      <section className="shell route-hero about-hero human-hero">
        <p className="eyebrow" data-reveal>
          02 / AN INCOMPLETE FIELD GUIDE TO RISHABH
        </p>
        <div className="human-composition">
          <div data-reveal>
            <h1>
              ALWAYS
              <br />
              <em>under</em>
              <br />
              CONSTRUCTION<span>✳</span>
            </h1>
            <p className="about-intro">
              The code gets shipped.
              <br />
              The curiosity never quite feels finished.
            </p>
          </div>
          <div className="dossier-portrait" data-reveal>
            <Portrait large />
            <span className="dossier-sticker">
              ENGINEER.
              <br />
              EXPERIMENTER.
              <br />
              HUMAN.
            </span>
            <span className="dossier-margin">
              SUBJECT: RISHABH GUPTA / BASED IN INDIA
            </span>
          </div>
        </div>
      </section>
      <section className="shell section-space grid md:grid-cols-[1fr_2fr] gap-10 border-t border-current">
        <p className="eyebrow">THE SHORT VERSION</p>
        <div data-scroll>
          <h2 className="story-heading">
            Good code is a start.
            <br />
            <em>Useful is the point.</em>
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 mt-8 leading-relaxed">
            <p>
              I’m a full stack developer at Stockarea, building production tools
              across warehouse operations, customer portals, and AI-assisted
              workflows. My work runs from a drag-reorderable interface to the
              database, integrations, and decisions underneath it.
            </p>
            <p>
              Outside that, I build tools around the way people and AI work
              together: Earshot for coding, toolharness for reliability,
              Sparebar for wait time, and PaisaTrack for everyday finances. I
              care about useful systems, human control, and knowing when the
              model should hand the work back to code.
            </p>
          </div>
          <a
            href={resume}
            className="text-link inline-block mt-8"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read my résumé ↗
          </a>
        </div>
      </section>
      <section
        className="shell human-evidence"
        aria-label="Education and achievements"
      >
        <article>
          <span className="eyebrow">THE FOUNDATIONS / 2022–2026</span>
          <h2>
            Computer Science
            <br />& Engineering.
          </h2>
          <p>Bachelor’s degree · KIET Group of Institutions</p>
          <p className="eyebrow mt-5">CBSE CLASS XII · 2022 / CLASS X · 2020</p>
        </article>
        <article>
          <span className="eyebrow">THIRTY-SIX HOURS. ONE IDEA.</span>
          <strong>
            8<span>/250+</span>
          </strong>
          <p>
            Ranked 8th at HackJNU, JNU Delhi, building a VR travel webapp in 36
            hours.
          </p>
        </article>
        <article>
          <span className="eyebrow">FROM A TEAM TO A WAITLIST</span>
          <strong>
            1,000<span>+</span>
          </strong>
          <p>
            Signups for the startup project I led with a cross-functional team
            at Headstarter AI.
          </p>
        </article>
      </section>
      <section className="principles-section">
        <div className="shell">
          <p className="eyebrow mb-10">
            MY NON-NEGOTIABLES / FOUR NOTES TO SELF
          </p>
          <div className="principles">
            {corePrinciples.map((principle, i) => (
              <article key={principle.id} className="principle" data-scroll>
                <span className="eyebrow">
                  ({String(i + 1).padStart(2, "0")})
                </span>
                <span className="principle-mark" aria-hidden="true">
                  {["✳", "◎", "↗", "⊕"][i]}
                </span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="shell section-space">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE TOOLBOX</p>
            <h2>
              Different tools.
              <br />
              <em>Same intent.</em>
            </h2>
          </div>
          <Asterisk className="w-24 accent" />
        </div>
        <div className="tech-cloud">
          {technologies.map((tech) => (
            <span key={tech.name}>{tech.name}</span>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-10 mt-12">
          <div>
            <h3 className="eyebrow mb-4">LANGUAGES</h3>
            <p>{languages.join(" / ")}</p>
          </div>
          <div>
            <h3 className="eyebrow mb-4">ON MY DESK</h3>
            <p>{tools.join(" / ")}</p>
          </div>
        </div>
        <Link href="/resources" className="reading-note">
          <span>Currently feeding the curiosity.</span>
          <strong>Step into the reading room ↗</strong>
        </Link>
      </section>
    </main>
  );
}
