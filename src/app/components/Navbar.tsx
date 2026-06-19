"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        { href: "/works", label: "works" },
        { href: "/about", label: "about" },
        { href: "/contact", label: "contact" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 nav-blur border-b" style={{ borderColor: "var(--border-color)" }}>
            <div className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-24 h-14 flex items-center justify-between">
                <Link href="/" className="font-mono font-bold text-base tracking-tight text-accent-purple">
                    rg.
                </Link>

                <div className="flex items-center gap-5">
                    <div className="hidden sm:flex items-center gap-5">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm transition-colors duration-200"
                                style={{
                                    color: pathname === link.href
                                        ? "var(--accent-purple)"
                                        : "var(--text-muted)",
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-mono"
                        style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
                        available
                    </div>

                    <ThemeToggle className="static p-1.5 rounded-md hover:bg-white/5" />
                </div>
            </div>
        </nav>
    );
}
