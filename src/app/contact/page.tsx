"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "../context/ThemeProvider";
import ThemeToggle from "../components/ThemeToggle";
import Footer from "../components/Footer";

export default function Contact() {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div
      className="min-h-screen px-6 sm:px-12 lg:px-24 py-12 transition-colors duration-300"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header Row */}
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

        {/* Header */}
        <h1 className="text-4xl font-bold mb-4">contact me</h1>
        <p className="mb-8" style={{ color: "var(--text-muted)" }}>
          feel free to reach out for opportunities or just to say hi!
        </p>
        <div className="section-divider mb-8" />

        {/* Contact Form */}
        <form
          action="https://formsubmit.co/rishabhgupta4523@gmail.com"
          method="POST"
          className="max-w-lg space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-secondary)" }}
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
              className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:border-purple-500"
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
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-secondary)" }}
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
              className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:border-purple-500 resize-none"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
              placeholder="what would you like to say?"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 bg-accent-purple text-white"
          >
            send message
          </button>
        </form>

        {/* Alternative Contact */}
        <div className="mt-12">
          <p className="mb-4" style={{ color: "var(--text-muted)" }}>
            or reach me directly at:
          </p>
          <div className="space-y-2">
            <a
              href="mailto:rishabhgupta4523@gmail.com"
              className="block link-underline text-accent-purple"
            >
              rishabhgupta4523@gmail.com
            </a>
            <a
              href="https://cal.com/rishabhguptajs"
              target="_blank"
              rel="noopener noreferrer"
              className="block link-underline text-accent-purple"
            >
              schedule a meet / cal.com <span className="text-accent-orange">↗</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <Footer />

        {/* Footer spacing */}
        <div className="h-16" />
      </div>
    </div>
  );
}
