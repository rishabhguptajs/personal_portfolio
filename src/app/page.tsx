"use client";

import React from "react";
import { useTheme } from "./context/ThemeProvider";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./components/ThemeToggle";

import { featuredProjects, experiences, technologies, corePrinciples } from "./constants/data";
import GradientPrincipleCard from "./components/GradientPrincipleCard";
import Footer from "./components/Footer";

export default function Home() {
  const { theme } = useTheme();

  const techStack = technologies.slice(0, 6);

  return (
    <div
      className="min-h-screen px-6 sm:px-12 lg:px-24 py-12 transition-colors duration-300"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <div className="fixed top-6 left-6 text-sm font-mono" style={{ color: "var(--text-muted)" }}>
        <LiveTime />
      </div>

      <ThemeToggle />
      <div className="max-w-4xl mx-auto pt-16">
        <section className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-16">
          <div className="flex-1 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2" style={{ fontFamily: 'var(--font-metamorphous)' }}>
                  rishabh gupta
                </h1>
                <p className="text-xl" style={{ color: "var(--text-secondary)" }}>
                  full stack developer
                </p>
              </div>

              <div className="relative w-24 h-24 lg:hidden flex-shrink-0">
                <div className={`absolute inset-0 blur-2xl rounded-full ${theme === 'dark' ? 'bg-purple-500/20' : ''}`} />
                <Image
                  src={theme === "dark" ? "/PROFILE_BLACK.png" : "/PROFILE_WHITE.png"}
                  alt="Rishabh Gupta"
                  width={96}
                  height={96}
                  className="relative z-10 object-contain border-2 border-white/5 rounded-full"
                  priority
                />
              </div>
            </div>

            <div
              className="section-divider pt-6 space-y-4"
              style={{ color: "var(--text-secondary)" }}
            >
              <p className="leading-relaxed">
                crafting scalable applications, components and experiences for the web with a focus on{" "}
                <span className="text-accent-purple">modern technologies</span> and{" "}
                <span className="text-accent-orange">clean architecture</span>.
              </p>
              <p className="font-medium" style={{ color: "var(--text-primary)" }}>
                always open to interesting conversations.
              </p>
            </div>

            <div className="flex flex-row items-center gap-2 pt-2">
              <span style={{ color: "var(--text-muted)" }}>hire me →</span>
              <a
                href="https://drive.google.com/file/d/1eqZ7VaZFIQEFXH99wW-X5CMGxmb6OsGn/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-accent-purple font-medium"
              >
                resume
              </a>
            </div>

            <a
              href="https://cal.com/rishabhguptajs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border rounded-md transition-all hover:bg-white/5"
              style={{ borderColor: "var(--text-muted)", fontFamily: 'Inter, sans-serif' }}
            >
              schedule a meet / cal.com <span className="text-accent-orange">↗</span>
            </a>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72">
              <div className={`absolute inset-0 blur-3xl rounded-full ${theme === 'dark' ? 'bg-purple-500/20' : ''}`} />
              <Image
                src={theme === "dark" ? "/PROFILE_BLACK.png" : "/PROFILE_WHITE.png"}
                alt="Rishabh Gupta"
                width={288}
                height={288}
                className="relative z-10 object-contain border-2 border-white/5 rounded-full"
                priority
              />
            </div>
          </div>
        </section>

        <div className="section-divider mb-12" />

        <section className="mb-16">
          <h2 className="text-lg font-medium mb-6">projects.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuredProjects.map((project, i) => (
              <div
                key={i}
                className="p-4 rounded-lg border transition-all hover:border-purple-500/30"
                style={{ borderColor: "var(--border-color)" }}
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-accent-purple inline-flex items-center gap-1 text-base font-medium"
                >
                  {project.name} <span className="text-accent-orange">↗</span>
                </a>
                <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
                  {project.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/works"
              className="link-underline inline-flex items-center gap-1"
              style={{ color: "var(--text-secondary)" }}
            >
              view all projects <span className="text-accent-orange">↗</span>
            </Link>
          </div>
        </section>

        <section className="mb-16">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span style={{ color: "var(--text-muted)" }}>technologies i build with</span>
            <span className="text-accent-purple">(hover to interact)</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-6">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="group relative p-4 rounded-lg border transition-all hover:border-purple-500/50 hover:bg-purple-500/10 cursor-pointer flex items-center justify-center aspect-square sm:aspect-auto sm:h-24"
                style={{ borderColor: "var(--border-color)" }}
              >
                <tech.icon className="w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:scale-110" style={{ color: "var(--text-secondary)" }} />
                <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 px-2 py-1 rounded backdrop-blur-sm ${theme === 'dark' ? 'bg-zinc-900 text-white border border-white/10' : 'bg-white/80 text-black border border-black/10 shadow-sm'}`}>
                  {tech.name}
                </span>
              </div>
            ))}
          </div>

          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            just a glimpse of my technical palette.
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            continuously expanding my skills and adapting to new standards.
          </p>
          <div className="mt-2">
            <span style={{ color: "var(--text-muted)" }}>view my full stack → </span>
            <Link href="/about" className="link-underline text-accent-purple">
              here
            </Link>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-lg font-medium mb-2">core principles.</h2>
          <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
            what drives my work and defines my approach to building software
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {corePrinciples.map((principle) => (
              <GradientPrincipleCard
                key={principle.id}
                id={principle.id}
                title={principle.title}
                description={principle.description}
              />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-lg font-medium mb-2">
            years of building.{" "}
            <span style={{ color: "var(--text-muted)" }}>(learning never stops)</span>
          </h2>
          <h3 className="text-base font-medium mb-6" style={{ color: "var(--text-secondary)" }}>
            professional experience
          </h3>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            delivering impact at fast-paced startups and established companies.
          </p>

          <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 space-y-10 my-8">
            {experiences.map((exp, i) => (
              <div key={i} className="relative pl-8 group">
                {/* Timeline Dot */}
                <div
                  className="absolute -left-[5px] top-8 h-2.5 w-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 transition-all duration-300 group-hover:scale-125 group-hover:bg-purple-500 group-hover:border-purple-500 ring-4 ring-white dark:ring-[#0f0f0f]"
                />

                {/* Card */}
                <div
                  className="p-6 rounded-xl border transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5 hover:-translate-y-1"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-color)"
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h4 className="text-lg font-bold tracking-tight">{exp.title}</h4>
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-1 text-sm font-medium mt-1 text-accent-purple hover:text-purple-400 transition-colors"
                      >
                        {exp.company}
                        <span className="transform transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">↗</span>
                      </a>
                    </div>
                    <span
                      className="text-xs font-mono px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50 whitespace-nowrap order-first sm:order-last w-fit mb-2 sm:mb-0"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {exp.points.map((point, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-purple-500/60" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Footer />

        <div className="h-24" />
      </div>
    </div>
  );
}

function LiveTime() {
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
}
