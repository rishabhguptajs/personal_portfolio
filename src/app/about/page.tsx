"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "../context/ThemeProvider";
import { technologies, languages, tools } from "../constants/data";
import Footer from "../components/Footer";

export default function AboutMe() {
    const { theme } = useTheme();

    return (
        <div
            className="min-h-screen transition-colors duration-300"
            style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
        >
            <div className="fixed inset-0 dot-grid opacity-40 pointer-events-none" />

            <div className="relative max-w-4xl mx-auto px-6 sm:px-12 lg:px-24 pt-28 pb-16">
                <div className="flex items-center gap-4 mb-2">
                    <Link href="/" className="text-sm transition-colors hover:text-accent-purple" style={{ color: "var(--text-muted)" }}>
                        ← home
                    </Link>
                </div>

                <h1
                    className="text-4xl sm:text-5xl font-bold tracking-tight mb-10 animate-fade-up"
                    style={{ fontFamily: "var(--font-metamorphous)" }}
                >
                    <span className="gradient-text">about me</span>
                </h1>

                {/* bio */}
                <section className="mb-14 animate-fade-up delay-100">
                    <div
                        className="p-6 rounded-xl border space-y-4"
                        style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border-color)" }}
                    >
                        <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                            engineering scalable solutions.{" "}
                            <span className="text-accent-purple font-medium">full stack developer</span> with a
                            product-first approach. i don't just write code — i build systems that drive value.
                        </p>
                        <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                            deeply invested in the{" "}
                            <span className="text-accent-orange font-medium">ai-native future</span>. leveraging
                            agentic workflows to multiply output and solve complex problems. currently pursuing
                            computer science, defined by what i ship.
                        </p>
                        <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                            focused on velocity and quality. open to roles that demand high agency and technical
                            excellence.
                        </p>
                    </div>
                </section>

                {/* technologies */}
                <section className="mb-14 animate-fade-up delay-200">
                    <h2 className="text-sm font-mono uppercase tracking-widest mb-6" style={{ color: "var(--text-muted)" }}>
                        technologies
                    </h2>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                        {technologies.map((tech, i) => (
                            <div
                                key={i}
                                className="group flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 hover:border-purple-500/50 hover:bg-purple-500/5 cursor-default"
                                style={{ borderColor: "var(--border-color)" }}
                            >
                                <tech.icon
                                    className="w-8 h-8 transition-transform group-hover:scale-110"
                                    style={{ color: "var(--text-secondary)" }}
                                />
                                <span className="text-[10px] font-mono text-center leading-tight" style={{ color: "var(--text-muted)" }}>
                                    {tech.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* languages + tools side by side */}
                <section className="mb-14 grid sm:grid-cols-2 gap-8 animate-fade-up delay-300">
                    <div>
                        <h2 className="text-sm font-mono uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
                            languages
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {languages.map((lang, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1.5 rounded-full text-sm border font-mono"
                                    style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
                                >
                                    {lang}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-sm font-mono uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
                            tools
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {tools.map((tool, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1.5 rounded-full text-sm border font-mono"
                                    style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                <Footer />
                <div className="h-16" />
            </div>
        </div>
    );
}
