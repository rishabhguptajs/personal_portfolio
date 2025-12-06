"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "../context/ThemeProvider";
import ThemeToggle from "../components/ThemeToggle";
import { technologies, languages, tools } from "../constants/data";
import Footer from "../components/Footer";

export default function AboutMe() {
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

                <h1 className="text-4xl font-bold mb-4">about me</h1>
                <div className="section-divider mb-8" />

                <section className="mb-12">
                    <p className="text-lg leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                        engineering scalable solutions. <span className="text-accent-purple">full stack developer</span> with a product-first approach. i don't just write code; i build systems that drive value.
                    </p>
                    <p className="text-lg leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                        deeply invested in the ai-native future. leveraging agentic workflows to multiply output and solve complex problems. currently pursuing computer science, defined by what i ship.
                    </p>
                    <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        focused on velocity and quality. open to roles that demand high agency and technical excellence.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6">technologies i work with</h2>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-8">
                        {technologies.map((tech, i) => (
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
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">programming languages</h2>
                    <div className="flex flex-wrap gap-3">
                        {languages.map((lang, i) => (
                            <span
                                key={i}
                                className="px-4 py-2 rounded-full text-sm border"
                                style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
                            >
                                {lang}
                            </span>
                        ))}
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">tools i use</h2>
                    <div className="flex flex-wrap gap-3">
                        {tools.map((tool, i) => (
                            <span
                                key={i}
                                className="px-4 py-2 rounded-full text-sm border"
                                style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
                            >
                                {tool}
                            </span>
                        ))}
                    </div>
                </section>

                <Footer />

                <div className="h-16" />
            </div>
        </div>
    );
}
