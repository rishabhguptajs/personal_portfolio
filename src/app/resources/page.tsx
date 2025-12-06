"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "../context/ThemeProvider";
import ThemeToggle from "../components/ThemeToggle";

import { resources } from "../constants/data";

export default function Resources() {
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

        <h1 className="text-4xl font-bold mb-4">ai resources</h1>
        <p className="mb-8" style={{ color: "var(--text-muted)" }}>
          a curated collection of research papers and resources on AI/ML
        </p>
        <div className="section-divider mb-8" />

        <div className="space-y-4">
          {resources.map((resource, i) => (
            <div
              key={i}
              className="p-6 rounded-lg border transition-all hover:border-purple-500/30"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-color)",
              }}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2">
                    {i + 1}. {resource.title}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    <span className="font-medium">Authors:</span> {resource.authors}
                  </p>
                </div>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg border text-sm transition-all hover:border-purple-500 hover:text-accent-purple"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  Read Paper <span className="text-accent-orange">↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="h-16" />
      </div>
    </div>
  );
}
