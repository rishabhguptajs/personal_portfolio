"use client";

import React, { useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";

export default function Contact() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

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
                    className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 animate-fade-up"
                    style={{ fontFamily: "var(--font-metamorphous)" }}
                >
                    <span className="gradient-text">let's talk</span>
                </h1>
                <p className="text-sm mb-10 animate-fade-up delay-100" style={{ color: "var(--text-muted)" }}>
                    feel free to reach out for opportunities, collaborations, or just a chat.
                </p>

                <div className="grid sm:grid-cols-5 gap-10 mb-16">
                    {/* form */}
                    <form
                        action="https://formsubmit.co/rishabhgupta4523@gmail.com"
                        method="POST"
                        className="sm:col-span-3 space-y-5 animate-fade-up delay-200"
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-xs font-mono uppercase tracking-wider mb-2"
                                style={{ color: "var(--text-muted)" }}
                            >
                                your email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:border-purple-500"
                                style={{
                                    backgroundColor: "var(--bg-secondary)",
                                    borderColor: "var(--border-color)",
                                    color: "var(--text-primary)",
                                }}
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="block text-xs font-mono uppercase tracking-wider mb-2"
                                style={{ color: "var(--text-muted)" }}
                            >
                                message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                rows={6}
                                className="w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:border-purple-500 resize-none"
                                style={{
                                    backgroundColor: "var(--bg-secondary)",
                                    borderColor: "var(--border-color)",
                                    color: "var(--text-primary)",
                                }}
                                placeholder="what's on your mind?"
                            />
                        </div>

                        <button
                            type="submit"
                            className="px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105 glow-purple"
                            style={{ backgroundColor: "var(--accent-purple)", color: "#fff" }}
                        >
                            send message ↗
                        </button>
                    </form>

                    {/* quick links */}
                    <div className="sm:col-span-2 space-y-6 animate-fade-up delay-300">
                        <div>
                            <p className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
                                direct
                            </p>
                            <div className="space-y-3">
                                <a
                                    href="mailto:rishabhgupta4523@gmail.com"
                                    className="block link-underline text-sm text-accent-purple"
                                >
                                    rishabhgupta4523@gmail.com
                                </a>
                                <a
                                    href="https://cal.com/rishabhguptajs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block link-underline text-sm text-accent-purple"
                                >
                                    schedule on cal.com ↗
                                </a>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
                                socials
                            </p>
                            <div className="space-y-2">
                                {[
                                    { label: "twitter / x", href: "https://x.com/rishabhguptajs" },
                                    { label: "linkedin", href: "https://linkedin.com/in/rishabhguptajs" },
                                    { label: "github", href: "https://github.com/rishabhguptajs" },
                                    { label: "instagram", href: "https://instagram.com/daldalikeeda" },
                                ].map((s) => (
                                    <a
                                        key={s.href}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block link-underline text-sm transition-colors hover:text-accent-purple"
                                        style={{ color: "var(--text-muted)" }}
                                    >
                                        {s.label} ↗
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
                <div className="h-16" />
            </div>
        </div>
    );
}
