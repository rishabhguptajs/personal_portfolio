"use client";

import React from "react";
import { useTheme } from "./context/ThemeProvider";
import Image from "next/image";
import Link from "next/link";
import { featuredProjects, experiences, technologies } from "./constants/data";
import Footer from "./components/Footer";

export default function Home() {
    const { theme } = useTheme();
    const techRow = technologies.slice(0, 9);

    return (
        <div
            className="min-h-screen transition-colors duration-300"
            style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
        >
            {/* dot grid hero backdrop */}
            <div className="fixed inset-0 dot-grid opacity-40 pointer-events-none" />

            <div className="relative max-w-4xl mx-auto px-6 sm:px-12 lg:px-24 pt-28 pb-16">

                {/* ── HERO ── */}
                <section className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-20">
                    <div className="flex-1 space-y-7 animate-fade-up">

                        {/* status chip */}
                        <div className="flex items-center gap-2">
                            <span
                                className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border"
                                style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
                                open to work · india
                            </span>
                        </div>

                        {/* name */}
                        <div>
                            <h1
                                className="text-5xl sm:text-6xl font-bold tracking-tight leading-none mb-3"
                                style={{ fontFamily: "var(--font-metamorphous)" }}
                            >
                                <span className="gradient-text">rishabh</span>
                                <br />
                                <span style={{ color: "var(--text-primary)" }}>gupta</span>
                            </h1>
                            <p
                                className="text-lg font-mono mt-3"
                                style={{ color: "var(--text-muted)" }}
                            >
                                full stack developer · ai-native builder
                            </p>
                        </div>

                        {/* bio */}
                        <div
                            className="space-y-3 pt-1 border-t"
                            style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
                        >
                            <p className="leading-relaxed pt-5">
                                crafting scalable applications and agentic systems with a focus on{" "}
                                <span className="text-accent-purple">modern architecture</span> and{" "}
                                <span className="text-accent-orange">shipping velocity</span>.
                            </p>
                            <p style={{ color: "var(--text-muted)" }} className="text-sm">
                                currently @ stockarea · always open to interesting conversations.
                            </p>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap items-center gap-3 pt-1">
                            <a
                                href="https://cal.com/rishabhguptajs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105 glow-purple"
                                style={{ backgroundColor: "var(--accent-purple)", color: "#fff" }}
                            >
                                schedule a call ↗
                            </a>
                            <a
                                href="https://drive.google.com/file/d/1eqZ7VaZFIQEFXH99wW-X5CMGxmb6OsGn/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm border transition-all duration-200 hover:border-purple-500/50"
                                style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
                            >
                                view resume →
                            </a>
                        </div>
                    </div>

                    {/* profile image */}
                    <div className="hidden lg:block flex-shrink-0 animate-fade-in delay-300">
                        <div className="relative w-56 h-56">
                            <div
                                className={`absolute inset-0 rounded-2xl blur-3xl ${theme === "dark" ? "bg-purple-600/20" : "bg-purple-300/30"}`}
                            />
                            <div
                                className="relative w-56 h-56 rounded-2xl overflow-hidden border"
                                style={{ borderColor: "var(--border-color)" }}
                            >
                                <Image
                                    src={theme === "dark" ? "/PROFILE_BLACK.png" : "/PROFILE_WHITE.png"}
                                    alt="Rishabh Gupta"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── STATS ── */}
                <section className="mb-20 animate-fade-up delay-200">
                    <div
                        className="grid grid-cols-3 gap-px rounded-xl overflow-hidden border"
                        style={{ borderColor: "var(--border-color)" }}
                    >
                        {[
                            { value: "4+", label: "years building" },
                            { value: "10+", label: "projects shipped" },
                            { value: "3×", label: "internships" },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="flex flex-col items-center justify-center py-6 gap-1"
                                style={{ backgroundColor: "var(--bg-secondary)" }}
                            >
                                <span className="text-2xl font-bold gradient-text">{stat.value}</span>
                                <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── FEATURED PROJECTS ── */}
                <section className="mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-sm font-mono uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                            selected work
                        </h2>
                        <Link
                            href="/works"
                            className="text-sm transition-colors hover:text-accent-purple"
                            style={{ color: "var(--text-muted)" }}
                        >
                            view all ↗
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {featuredProjects.map((project, i) => (
                            <a
                                key={i}
                                href={project.live || project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-xl border transition-all duration-300 hover:border-purple-500/40 gradient-border glow-purple-hover"
                                style={{
                                    backgroundColor: "var(--bg-secondary)",
                                    borderColor: "var(--border-color)",
                                }}
                            >
                                <div className="flex items-start sm:items-center gap-4">
                                    <span
                                        className="text-xs font-mono w-6 mt-0.5 sm:mt-0 flex-shrink-0"
                                        style={{ color: "var(--text-muted)" }}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <div>
                                        <span
                                            className="font-semibold text-base group-hover:text-accent-purple transition-colors"
                                            style={{ color: "var(--text-primary)" }}
                                        >
                                            {project.name}
                                        </span>
                                        <p
                                            className="text-sm mt-1"
                                            style={{ color: "var(--text-muted)" }}
                                        >
                                            {project.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 ml-10 sm:ml-0 flex-shrink-0">
                                    <span
                                        className="text-xs px-2.5 py-1 rounded-full border font-mono"
                                        style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}
                                    >
                                        {project.tag}
                                    </span>
                                    <span className="text-accent-orange text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                        ↗
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>

                {/* ── TECH STACK ── */}
                <section className="mb-20">
                    <h2 className="text-sm font-mono uppercase tracking-widest mb-8" style={{ color: "var(--text-muted)" }}>
                        tech stack
                    </h2>
                    <div className="grid grid-cols-3 sm:grid-cols-9 gap-3">
                        {techRow.map((tech, i) => (
                            <div
                                key={i}
                                className="group flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200 hover:border-purple-500/50 hover:bg-purple-500/5 cursor-default"
                                style={{ borderColor: "var(--border-color)" }}
                            >
                                <tech.icon
                                    className="w-7 h-7 transition-transform group-hover:scale-110"
                                    style={{ color: "var(--text-secondary)" }}
                                />
                                <span className="text-[10px] font-mono text-center leading-tight" style={{ color: "var(--text-muted)" }}>
                                    {tech.name}
                                </span>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm mt-5" style={{ color: "var(--text-muted)" }}>
                        and more —{" "}
                        <Link href="/about" className="link-underline text-accent-purple">
                            full stack →
                        </Link>
                    </p>
                </section>

                {/* ── EXPERIENCE ── */}
                <section className="mb-20">
                    <h2 className="text-sm font-mono uppercase tracking-widest mb-8" style={{ color: "var(--text-muted)" }}>
                        experience
                    </h2>

                    <div className="relative border-l ml-3 space-y-8" style={{ borderColor: "var(--border-color)" }}>
                        {experiences.map((exp, i) => (
                            <div key={i} className="relative pl-8 group">
                                <div
                                    className="absolute -left-[5px] top-7 h-2.5 w-2.5 rounded-full border bg-[var(--bg-primary)] transition-all duration-300 group-hover:scale-125 group-hover:bg-purple-500 group-hover:border-purple-500 ring-4"
                                    style={{
                                        borderColor: "var(--border-color)",
                                    }}
                                />
                                <div
                                    className="p-5 rounded-xl border transition-all duration-300 hover:border-purple-500/30 hover:-translate-y-0.5 gradient-border"
                                    style={{
                                        backgroundColor: "var(--bg-secondary)",
                                        borderColor: "var(--border-color)",
                                    }}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                        <div>
                                            <h4 className="font-bold">{exp.title}</h4>
                                            <a
                                                href={exp.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-sm font-medium mt-0.5 text-accent-purple hover:text-purple-400 transition-colors"
                                            >
                                                {exp.company} <span>↗</span>
                                            </a>
                                        </div>
                                        <span
                                            className="text-xs font-mono px-2.5 py-1 rounded-md border w-fit"
                                            style={{
                                                borderColor: "var(--border-color)",
                                                backgroundColor: "var(--bg-primary)",
                                                color: "var(--text-muted)",
                                            }}
                                        >
                                            {exp.period}
                                        </span>
                                    </div>
                                    <ul className="space-y-2">
                                        {exp.points.map((point, j) => (
                                            <li
                                                key={j}
                                                className="flex items-start gap-2.5 text-sm leading-relaxed"
                                                style={{ color: "var(--text-secondary)" }}
                                            >
                                                <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-purple-500/60" />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <Footer />
                <div className="h-16" />
            </div>
        </div>
    );
}
