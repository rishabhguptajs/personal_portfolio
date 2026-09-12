import Link from "next/link";
import { projects, experiences } from "./constants/data";
import { Asterisk, ProjectArt } from "./components/Artwork";
import OrbitalHero from "./components/OrbitalHero";
import { resume } from "./components/Footer";
export default function Home() {
  return (
    <main id="main">
      <OrbitalHero />
      <div
        className="ticker"
        aria-label="Build with curiosity. Ship with intention."
      >
        <div aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span key={i}>
              BUILD WITH CURIOSITY <b>✳</b> SHIP WITH INTENTION <b>✳</b>{" "}
            </span>
          ))}
        </div>
      </div>
      <section className="shell section-space work-zone">
        <div className="section-heading" data-scroll>
          <div>
            <p className="eyebrow">01 / OBJECTS SENT INTO THE WORLD</p>
            <h2>
              SERIOUS WORK.
              <br />
              <em>Strange energy.</em>
            </h2>
          </div>
          <p className="max-w-xs">
            Agents, products, and systems I’ve built.
            <br />
            Recent work first. The curiosity stays.
          </p>
        </div>
        <div className="selected-work">
          {projects
            .filter((project) => project.featured)
            .map((project, i) => (
              <Link
                href={`/works#${project.id}`}
                className="work-preview group"
                key={project.name}
                data-scroll
              >
                <div className="preview-frame">
                  <ProjectArt kind={project.art} />
                  <span className="preview-arrow">↗</span>
                </div>
                <div className="flex justify-between items-start gap-4 pt-5">
                  <div>
                    <span className="eyebrow">
                      0{i + 1} / {project.type}
                    </span>
                    <h3>{project.name}</h3>
                  </div>
                  <span className="font-mono text-xs pt-1">
                    VIEW PROJECT ↗
                  </span>
                </div>
                <p>{project.summary}</p>
              </Link>
            ))}
        </div>
        <Link href="/works" className="text-link mt-12 inline-block">
          Enter the full archive{" "}
          <span>({projects.length.toString().padStart(2, "0")}) ↗</span>
        </Link>
      </section>
      <section className="manifesto">
        <div className="shell grid md:grid-cols-[1fr_2fr] gap-12">
          <div>
            <p className="eyebrow">02 / OPERATING SYSTEM</p>
            <Asterisk className="manifesto-star" />
          </div>
          <div data-scroll>
            <h2>
              Think like a user.
              <br />
              Build like an engineer.
              <br />
              <em>Stay a little restless.</em>
            </h2>
            <div className="flex flex-wrap gap-8 mt-9">
              <p className="max-w-sm">
                Modern architecture, meaningful automation, and the willingness
                to figure it out. That’s the through line in everything I build.
              </p>
              <Link className="text-link self-end" href="/about">
                Meet the human ↗
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="shell section-space">
        <div className="section-heading" data-scroll>
          <div>
            <p className="eyebrow">03 / ALONG THE WAY</p>
            <h2>
              The work
              <br />
              <em>behind the work.</em>
            </h2>
          </div>
          <a
            href={resume}
            className="text-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            The résumé ↗
          </a>
        </div>
        <div>
          {experiences.map((exp, i) => (
            <article className="experience-row" data-scroll key={exp.company}>
              <span className="eyebrow">
                0{i + 1} / {exp.period}
              </span>
              <div>
                <a
                  className="company"
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {exp.company} ↗
                </a>
                <p>{exp.title}</p>
              </div>
              <ul>
                {exp.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
