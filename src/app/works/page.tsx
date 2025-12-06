"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "../context/ThemeProvider";
import ThemeToggle from "../components/ThemeToggle";
import { projects } from "../constants/data";
import Footer from "../components/Footer";

export default function Works() {
  const { theme } = useTheme();

  return (
    <div
      className="min-h-screen px-6 sm:px-12 lg:px-24 py-12 transition-colors duration-300"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <div className="max-w-4xl mx-auto pt-8">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 transition-colors hover:text-accent-purple"
            style={{ color: "var(--text-muted)" }}
          >
            ← back to home
          </Link>
          <ThemeToggle className="static p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800" />
        </div>

        <h1 className="text-4xl font-bold mb-4">my works</h1>
        <p className="mb-8" style={{ color: "var(--text-muted)" }}>
          a collection of projects i've built over time
        </p>
        <div className="section-divider mb-8" />

        <div className="space-y-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className="p-6 rounded-lg border transition-all hover:border-purple-500/30"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-color)",
              }}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <span
                    className="text-xs px-2 py-1 rounded-full mt-2 inline-block"
                    style={{ backgroundColor: "var(--border-color)", color: "var(--text-muted)" }}
                  >
                    {project.type}
                  </span>
                </div>
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-accent-purple text-sm"
                  >
                    github <span className="text-accent-orange">↗</span>
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-accent-purple text-sm"
                    >
                      live <span className="text-accent-orange">↗</span>
                    </a>
                  )}
                </div>
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, j) => (
                  <span
                    key={j}
                    className="text-xs px-3 py-1 rounded-full border"
                    style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Footer />

        <div className="h-16" />
      </div>
    </div>
  );
}