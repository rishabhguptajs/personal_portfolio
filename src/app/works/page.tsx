"use client";

import React, { useState } from "react";
import Link from "next/link";
import { projects, funProjects } from "../constants/data";
import Footer from "../components/Footer";

const ALL_TYPES = ["All", ...Array.from(new Set(projects.map((p) => p.type)))];

export default function Works() {
    const [filter, setFilter] = useState("All");

    const visible = filter === "All" ? projects : projects.filter((p) => p.type === filter);

    return (
        <div
            className="min-h-screen transition-colors duration-300"
            style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
        >
            <div className="fixed inset-0 dot-grid opacity-40 pointer-events-none" />

            <div className="relative max-w-4xl mx-auto px-6 sm:px-12 lg:px-24 pt-28 pb-16">
                {/* header */}
                <div className="flex items-center gap-4 mb-2">
                    <Link
                        href="/"
                        className="text-sm transition-colors hover:text-accent-purple"
                        style={{ color: "var(--text-muted)" }}
                    >
                        ← home
                    </Link>
                </div>

                <h1
                    className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 animate-fade-up"
                    style={{ fontFamily: "var(--font-metamorphous)" }}
                >
                    <span className="gradient-text">my works</span>
                </h1>
                <p className="text-sm mb-10 animate-fade-up delay-100" style={{ color: "var(--text-muted)" }}>
                    a collection of things i've shipped — from production systems to fun weekend hacks.
                </p>

                {/* filters */}
                <div className="flex flex-wrap gap-2 mb-10 animate-fade-up delay-200">
                    {ALL_TYPES.map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className="text-xs font-mono px-3 py-1.5 rounded-full border transition-all duration-200"
                            style={{
                                borderColor: filter === type ? "var(--accent-purple)" : "var(--border-color)",
                                color: filter === type ? "var(--accent-purple)" : "var(--text-muted)",
                                backgroundColor: filter === type ? "rgba(168,85,247,0.08)" : "transparent",
                            }}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                {/* project cards */}
                <div className="space-y-4 mb-20">
                    {visible.map((project, i) => (
                        <div
                            key={i}
                            className="p-5 rounded-xl border transition-all duration-300 hover:border-purple-500/40 gradient-border glow-purple-hover animate-fade-up"
                            style={{
                                backgroundColor: "var(--bg-secondary)",
                                borderColor: "var(--border-color)",
                                animationDelay: `${i * 60}ms`,
                            }}
                        >
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                                <div>
                                    <h3 className="font-bold text-lg">{project.name}</h3>
                                    <span
                                        className="text-xs font-mono mt-1 inline-block"
                                        style={{ color: "var(--accent-purple)" }}
                                    >
                                        {project.type}
                                    </span>
                                </div>
                                <div className="flex gap-4 flex-shrink-0">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="link-underline text-sm transition-colors hover:text-accent-purple"
                                        style={{ color: "var(--text-muted)" }}
                                    >
                                        github ↗
                                    </a>
                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="link-underline text-sm text-accent-orange"
                                        >
                                            live ↗
                                        </a>
                                    )}
                                </div>
                            </div>
                            <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                                {project.desc}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((t, j) => (
                                    <span
                                        key={j}
                                        className="text-xs font-mono px-2.5 py-1 rounded-full border"
                                        style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── FUN / SIDE PROJECTS ── */}
                <div className="mb-20">
                    <h2 className="text-sm font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                        built for fun
                    </h2>
                    <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
                        weekend experiments and curiosity-driven builds — no product goals, just vibes.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {funProjects.map((proj, i) => (
                            <a
                                key={i}
                                href={proj.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-5 rounded-xl border transition-all duration-300 hover:border-purple-500/40 gradient-border glow-purple-hover"
                                style={{
                                    backgroundColor: "var(--bg-secondary)",
                                    borderColor: "var(--border-color)",
                                }}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-2xl">{proj.emoji}</span>
                                    <h3
                                        className="font-semibold group-hover:text-accent-purple transition-colors"
                                        style={{ color: "var(--text-primary)" }}
                                    >
                                        {proj.name}
                                    </h3>
                                </div>
                                <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                                    {proj.desc}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {proj.tech.map((t, j) => (
                                        <span
                                            key={j}
                                            className="text-xs font-mono px-2.5 py-1 rounded-full border"
                                            style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                <Footer />
                <div className="h-16" />
            </div>
        </div>
    );
}
