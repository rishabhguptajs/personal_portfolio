"use client";

import React from "react";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

export default function Footer() {
    return (
        <section className="section-divider pt-12">
            <p className="mb-4" style={{ color: "var(--text-muted)" }}>
                you can reach me at:{" "}
                <a
                    href="https://x.com/rishabhguptajs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-accent-purple"
                >
                    @rishabhguptajs
                </a>{" "}
                or{" "}
                <a
                    href="mailto:rishabhgupta4523@gmail.com"
                    className="link-underline text-accent-purple"
                >
                    rishabhgupta4523@gmail.com
                </a>
            </p>
            <p className="mb-6" style={{ color: "var(--text-muted)" }}>
                while i'm not actively looking, i'm always open to hearing about unique opportunities.
                if you have any questions or just want to say hi, feel free to contact me using the links below.
            </p>
            <p className="mb-4" style={{ color: "var(--text-muted)" }}>
                or you can find me on socials :
            </p>

            <div className="grid grid-cols-2 gap-x-12 gap-y-3 max-w-md">
                <a
                    href="https://x.com/rishabhguptajs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-2"
                >
                    <RiTwitterXFill className="w-4 h-4" />
                    twitter <span className="text-accent-orange">↗</span>
                </a>
                <a
                    href="https://linkedin.com/in/rishabhguptajs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-2"
                >
                    <FaLinkedin className="w-4 h-4 text-blue-500" />
                    linkedin <span className="text-accent-orange">↗</span>
                </a>
                <a
                    href="https://github.com/rishabhguptajs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-2"
                >
                    <FaGithub className="w-4 h-4" />
                    github <span className="text-accent-orange">↗</span>
                </a>
                <a
                    href="https://instagram.com/daldalikeeda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-2"
                >
                    <FaInstagram className="w-4 h-4 text-pink-500" />
                    instagram <span className="text-accent-orange">↗</span>
                </a>
                <a
                    href="https://cal.com/rishabhguptajs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-2"
                >
                    schedule a meet <span className="text-accent-orange">↗</span>
                </a>
                <a
                    href="https://drive.google.com/file/d/1eqZ7VaZFIQEFXH99wW-X5CMGxmb6OsGn/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-2"
                >
                    resume <span className="text-accent-orange">↗</span>
                </a>
            </div>
        </section>
    );
}
